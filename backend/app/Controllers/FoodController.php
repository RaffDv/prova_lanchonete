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
                $data = array_merge($data, $body);
                $r = $this->db->insert_sql('foods', $data);
                if ($r) {
                    $this->status = 200;
                    $this->msg = ['msg' => 'success to insert data'];
                } else {
                    $this->status = 409;
                    $this->msg = ['msg' => 'fail to insert data'];
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

        $r  = $this->db->select_sql('foods');
        if ($r) {
            $this->status = 200;
            $this->msg = ['data' => $r];
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
            $this->msg = json_encode(['data' => $this->db->select_sql('foods', ['fields' => '*'], $args)[0]]);

            $this->status = 200;
        } catch (Exception $e) {
            $r = 'ERROR - CHECK THE INFORMED DATA';
            $this->status = 422;
        }
        $response->getBody()->write($this->msg);

        return $response->withStatus($this->status);
    }

    public function update(Request $request, Response $response, array $args)
    {
        $this->loadDB();
        $this->status = 500;
        $body = $request->getParsedBody();
        $files = $request->getUploadedFiles()['image'];
        $token = $request->getCookieParams('token')['token'];
        // $body = json_decode($body,true);

        try {
            $id = $this->db->select_sql('foods', ['fields' => 'id'], $args)[0]['id'];
            if ($this->deleteOldFile($id)) {
                $img = $this->saveFile($this->directory, $files);
                $body['image'] = $img;
                try {
                    if ($this->db->update_sql('foods', $token, $body, $id)) {
                        $this->msg = ['msg' => 'success update'];
                    } else {

                        $this->msg = ['msg' => 'somenthing error'];
                    }
                } catch (Exception $e) {
                    $this->msg = ['msg' => 'update fail | ERROR:   ' . $e->getMessage()];
                }
            }

            $this->status = 200;
        } catch (Exception $e) {
            $this->msg['msg'] = 'ERROR - CHECK THE INFORMED DATA';
            $this->status = 422;
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
        $uplFile->moveTo($pathTo);
        $pathTo = 'http://localhost:4000/foodsImages/' . $filename;


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
