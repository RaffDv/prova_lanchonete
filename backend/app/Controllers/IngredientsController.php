<?php

namespace App\Controllers;

require_once __DIR__ . '/../../vendor/autoload.php';

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\UploadedFileInterface as Image;

class IngredientsController
{
    private $msg, $status;
    public  \Models\BD | null $db = null;

    public function new(Request $request, Response $response)
    {
        $this->loadDB();
        $this->status = 500;
        $body = $request->getParsedBody();
        $body = json_decode($body['data'], true);


        try {
            try {
                
                $r = $this->db->insert_sql('ingredients', $body);
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

        $r  = $this->db->select_sql('ingredients');
        if(is_array($r)){
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
            $this->msg = json_encode(['data' => $this->db->select_sql('ingredients', ['fields' => '*'], $args)[0]]);

            $this->status = 200;
        } catch (Exception $e) {
            $r = 'ERROR - CHECK THE INFORMED DATA';
            $this->status = 422;
        }
        $response->getBody()->write($this->msg);

        return $response->withStatus($this->status);
    }
    //nao testado
    public function update(Request $request, Response $response, array $args)
    {
        $this->loadDB();
        $this->status = 200;
        $body =json_decode($request->getParsedBody()['data'],true);
        $token = $request->getCookieParams('token')['token'];
        $decoded = \Models\JWTProvider::decode_token($token);
        if($decoded->privileges === 10) {
            try {
                    try 
                    {
                        if ($this->db->update_sql('ingredients', $body, $args['id'])) {
                            $this->status=200;
                            $this->msg = ['success' => true];
                        } 
                        else
                        {
                            $this->status=400;
                            $this->msg = ['success' => false];
                        }
                    } 
                    catch (Exception $e) 
                    {
                        $this->status=400;
                        $this->msg = ['msg' => 'update fail | ERROR:   ' .json_encode($e->getTrace()) .'       '. $e->getMessage()];
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


    private function loadDB()
    {
        if ($this->db == null) {
            $this->db = \Models\BD::getInstance();
        }
    }
}
