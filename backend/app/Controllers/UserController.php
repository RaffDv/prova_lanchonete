<?php
namespace App\Controllers;

require_once __DIR__.'/../../vendor/autoload.php';

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController{
    private $msg,$status;
    public  \Models\BD $db;

    public function get(Request $request, Response $response){
        
        $this->loadDB();
        
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
            $r =json_encode( $this->db->select_sql('users',['fields'=>'*'],$args));
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
        $this->status = 500;
        $values = $request->getParsedBody();
        $values = json_decode($values['data'],true);
        $data = $this->db->insert_sql('users',['fields'=>'name,email,pass'],$values);
        if($data)
        {
            $this->status = 200;
            $this->msg = ['msg' => 'sucess to insert in DB'];
            
        }
        else
        {
            $this->status = 409;
            $this->msg = ['msg' => 'fail to insert in DB'];
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
            $this->msg= 'sucess to update';
            $this->status = 200;
        }
        else
        {

            $this->msg= 'fail to update';
            $this->status = 422;
        }
        $response->getBody()->write($this->msg);
        return $response->withStatus($this->status);
    }

    public function login(Request $request, Response $response, array $args) {
        $this->loadDB();


        $this->status=500;
        $data = $request->getParsedBody();
        $data = json_decode($data['data'],true);

        try {
            $r =$this->db->select_sql('users',['fields' => 'name,email'],$data);
            $jwt = \Models\JWTProvider::encode_token($r[0]);
            $jwt = ['token' => $jwt];
            $this->status = 200;
            $this->msg = json_encode($jwt);
        } catch (\Throwable $th) {
            $this->status = 422;
            $this->msg = 'Unprocessble data';
        }
        
        $response->getBody()->write($this->msg);
        return $response->withStatus($this->status);
    }


    private function loadDB()
    {
        $this->db = \Models\BD::getInstance();
    }

}