<?php
namespace App\Controllers;
require_once __DIR__.'/../../vendor/autoload.php';

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController{
    private $msg,$status;
    public  \Models\BD | null $db = null;

    public function get(Request $request, Response $response){
        
        $this->loadDB();
        $header = $request->getHeaders();
        print_r($header);
    
        
        $filter = $request->getQueryParams();
        $data = $this->db->select_sql('users', ['fields' => '*'], $filter);
        $parsedData = json_encode($data);
        $response->getBody()->write($parsedData);
        
        return $response->withStatus(200);
    }
    
    public function unique(Request $request, Response $response,array $args) 
    {
        $this->loadDB();
        
        $this->status=500;
        try {
            $r =json_encode( ['data' => $this->db->select_sql('users',['fields'=>'*'],$args)]);
            $this->status = 200;
        } catch (Exception $e) {
            $r = 'ERROR - CHECK THE INFORMED DATA';
            $this->status = 422;
        }
        $response->getBody()->write($r);
        
        return $response->withStatus($this->status);
    }

    public function new(Request $request, Response $response, array $args) {
        $this->loadDB();
        $this->status = 200;
        $values = $request->getParsedBody();
        $acc = json_decode($values['account'],true);
        $add = json_decode($values['address'],true);
        $values = array_merge($acc,$add);
        $data = $this->db->insert_sql('users',$values);
        if($data)
        {
            $this->status = 200;
            $this->msg = ['success' => true];
            
        }
        else
        {
            $this->status = 409;
            $this->msg = ['success' => false];
        }
        $response->getBody()->write(json_encode($this->msg));
        return $response->withStatus($this->status);
    }

    public function update(Request $request, Response $response, array $args)
    {
        $this->loadDB();
        
        $this->status=500;
        $data = $request->getParsedBody();
        
        $token = $data['token'];
        $values = json_decode($data['data'],true);
        
        $r = $this->db->update_sql('users',$token,$values);
        if($r)
        {
            $this->msg= ['msg'=>'sucess to update'];
            $this->status = 200;
        }
        else
        {

            $this->msg= ['msg'=>'fail to update'];
            $this->status = 422;
        }
        $response->getBody()->write(json_encode($this->msg));
        return $response->withStatus($this->status);
    }

    public function login(Request $request, Response $response, array $args) {
        $this->loadDB();


        $this->status=500;
        $body = $request->getParsedBody();
        $data = json_decode($body['data'],true);
        try {
            
            $r =$this->db->select_sql('users',['fields' => 'user,email,privileges'],$data);
            $jwt = \Models\JWTProvider::encode_token($r[0]);
            $jwt = ['token' => $jwt];
            $this->status = 200;
            $this->msg = json_encode(['msg'=>'success to generate token']);
        } catch (Exception $e) {
            $this->status = 422;
            $this->msg = 'Error:    '.$e->getMessage();
        }
        $response = $response->withHeader('Authorization', "Bearer {$jwt['token']}");
        
        $response->getBody()->write($this->msg);
        return $response->withStatus($this->status);
    }
    public function address(Request $request, Response $response, array $args) {
        $this->loadDB();
        $this->status=500;
        $token = $request->getCookieParams()['token'];
        $values = \Models\JWTProvider::decode_token($token);
        try {
            $r = $this->db->select_sql('users',['fields' => 'country,city,state,district,street,num'],['email'=>$values->email]);
            $this->msg = ['data' => $r[0]];
            $this->status = 200;
        } catch (Exception $e) {
            $this->msg = ['msg' => $e->getMessage()];
        }
        $response->getBody()->write(json_encode($this->msg));
        return $response;
    }


    private function loadDB()
    {
        if($this->db == null){
            $this->db = \Models\BD::getInstance();
        }
    }

}