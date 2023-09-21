<?php

namespace App\Controllers;

require_once __DIR__ . '/../../vendor/autoload.php';

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface as Image;

class FoodController
{
    private $msg, $status;
    public  \Models\BD | null $db = null;
    private $directory = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'foodsImages';

    public function new(Request $request, Response $response)
    {
        $this->loadDB();
        $this->status = 500;
        $body = $request->getParsedBody();
        $body = json_decode($body['data'], true);
        $files = $request->getUploadedFiles();
        try {
            try {
                $data['image'] = $this->saveFile($this->directory, $files['image']);
                $ingValues =$body['ingredientsIDs'];
                foreach ($ingValues as $value) {
                    $ingredients[uniqid()]=  $value;
                }
                unset($body['ingredientsIDs']);
                $data = array_merge($data, $body);
                if ($this->db->insert_sql('foods', $data)) {
                    $foodId = $this->db->lastInsert();
                    if($this->db->insert_bulk('food_ingredient','id_food,id_ingredient',$foodId,$ingredients)){
                        $this->status = 200;
                        $this->msg = ['msg' => 'success to insert data'];
                    }else {
                        $this->status = 409;
                        $this->msg = ['msg' => 'fail to insert data'];
                    }
                } 
            } catch (Exception $e) {
                $this->msg = ['msg' => $e->getMessage()];
            }
        } catch (Exception $e) {
            $this->msg = ['msg' => $e->getMessage()];
        }

        $response->getBody()->write(json_encode($this->msg));
        return $response->withStatus($this->status);
    }
    public function get(Request $req, Response $res)
    {
        $this->loadDB();
        $this->status = 500;

        $foods  = $this->db->select_sql('foods');
        foreach ($foods as $key => $value) {
            $ingredients = $this->db->select_sql('food_ingredient',['fields'=>'id_ingredient'],['id_food' => $value['id']],true);
            foreach ($ingredients as $value) {
                $in[] = array_shift(( $this->db->select_sql('ingredients' ,['fields' => 'id,name'],['id' => $value] )));
                $foods[$key]['ingredients'] = $in;
            }
        }
        if(is_array($foods)){
            $this->status = 200;
            $this->msg = ['data' => $foods];
        } else {
            $this->status = 400;
            $this->msg = ['msg' => 'error to get data'];
        }
        $res->getBody()->write(json_encode($this->msg));
        return $res->withStatus($this->status);
    }
    public function unique(Request $request, Response $response, array $args)
    {
        $this->loadDB();

        $this->status = 500;

        try {
            $food = $this->db->select_sql('foods', ['fields' => '*'], $args)[0];
            
                $ingredients = $this->db->select_sql('food_ingredient',['fields'=>'id_ingredient'],['id_food' => $food['id']],true);
                foreach ($ingredients as $value) {
                    $in[] = array_shift(( $this->db->select_sql('ingredients' ,['fields' => 'id,name'],['id' => $value] )));
                    $food['ingredients'] = $in;
                }
            
            $this->msg['data'] = $food;

            $this->status = 200;
        } catch (Exception $e) {
            $r = 'ERROR - CHECK THE INFORMED DATA';
            $this->status = 422;
        }
        $response->getBody()->write(json_encode($this->msg));

        return $response->withStatus($this->status);
    }

    public function update(Request $request, Response $response, array $args)
    {
        $this->loadDB();
        $this->status = 500;
        $body =json_decode($request->getParsedBody()['data'],true);
        $files = $request->getUploadedFiles()['image'];
        $token = $request->getCookieParams('token')['token'];
        $decoded = \Models\JWTProvider::decode_token($token);
        $ingredientsIDs = $body['ingredientsIDs'];
        unset($body['ingredientsIDs']);

        
        if($decoded->privileges === 10) {
            try {
                $id = $args['id'];
                if(isset($files))
                {
                    $img = $this->saveFile($this->directory, $files);
                    if( $this->deleteOldFile($id)){
    
                        $body["image"] =$img;
                        print_r($body);
                        try {
                            if( $this->db->delete('food_ingredient',['id_food'=>$id])){
                                if($this->db->insert_bulk('food_ingredient','id_food,id_ingredient',$id,$ingredientsIDs)){
                                    if ($this->db->update_sql('foods', $body, $id)) {
                                        $this->status=200;
                                        $this->msg = ['success' => true];
                                    } 
                                    else
                                    {
                                        $this->status=400;
                                        $this->msg = ['success' => false];
                                    }

                            }}
                        } catch (Exception $e) {
                            $this->status=400;
                            $this->msg = ['msg' => 'update fail | ERROR:   ' .json_encode($e->getTrace()) .'       '. $e->getMessage()];
                        }
                    }
                }
                else
                {
                    try 
                    {
                       if( $this->db->delete('food_ingredient',['id_food'=>$id])){
                        if($this->db->insert_bulk('food_ingredient','id_food,id_ingredient',$id,$ingredientsIDs))

                           if ($this->db->update_sql('foods', $body, $id)) 
                           {
                               $this->status=200;
                               $this->msg = ['success' => true];
                           } 
                           else
                           {
                               $this->status=400;
                               $this->msg = ['success' => false];
                           }
                       }
                    } 
                    catch (Exception $e) 
                    {
                        $this->status=400;
                        $this->msg = ['msg' => 'update fail | ERROR:   ' .json_encode($e->getTrace()) .'       '. $e->getMessage()];
                    }
                }

            } catch (Exception $e) {
                $this->msg['msg'] = 'ERROR - '.$e->getMessage();
                $this->status = 422;
            }
        }
        else{
            $this->status= 403;
            $this->msg['msg'] = 'only the admin can make updates to this object';
        }
            

        $response->getBody()->write(json_encode($this->msg));

        return $response->withStatus($this->status);
    }



    private function saveFile(string $directory, Image $uplFile)
    {
        $extension = pathinfo($uplFile->getClientFilename(), PATHINFO_EXTENSION);
        $basename = uniqid();
        $filename = $basename . '.' . $extension;
        $pathTo = $directory . DIRECTORY_SEPARATOR . $filename;
        try {
            $uplFile->moveTo($pathTo);
            //code...
        } catch (\Throwable $th) {
            throw $th;
        }
        $pathTo = 'http://localhost:4000/foodsImages/' . $filename;
        // print_r($pathTo)


        return $pathTo;
    }

    private function deleteOldFile(int $id)
    {
        $url = $this->db->select_sql('foods', ['fields' => 'image'], ['id' => $id])[0]['image'];
        $path = parse_url($url, PHP_URL_PATH);
        $path = '.' . $path;

        try {
            if (unlink($path)) return true;
            return false;
        } catch (Exception $e) {
            return false;
        }
    }

    private function loadDB()
    {
        if ($this->db == null) {
            $this->db = \Models\BD::getInstance();
        }
    }
}
