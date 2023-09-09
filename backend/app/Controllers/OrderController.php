<?php
namespace App\Controllers;
require_once __DIR__.'/../../vendor/autoload.php';

use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class OrderController{
    private $msg,$status;
    public  \Models\BD | null $db = null;

    public function unique(Request $request, Response $response,) 
    {
        $this->loadDB();
        $this->status=500;
        $userEmail = $request->getQueryParams();
        if(isset($userEmail)){
            try {
                $id = $this->db->select_sql('users',['fields'=>'id'],$userEmail);
                $r = $this->db->select_sql('orders',['fields'=>'*'],$id);
                $foods =[];
                $drinks =[];
                foreach ($r as $value) {
                  if($value['id_food'] && !$value['isPaid']){
                    $food =$this->db->select_sql('foods',['fields'=>'*'],['id'=>$value['id_food']])[0];
                    $foods[] = ['orderID' => $value['id'],'value'=>$value['value'],'food'=>$food];
                  }
                  if($value['id_drink'] && !$value['isPaid']){
                    $drink = $this->db->select_sql('drinks',['fields'=>'*'],['id'=>$value['id_drink']])[0];
                    $drinks[] =['orderID'=>$value['id'],'value'=>$value['value'],'drink'=>$drink];
                  }
                }
                $this->msg['data']['foods'] = $foods;
                $this->msg['data']['drinks'] = $drinks;
    
                $this->status = 200;
            } catch (Exception $e) {
                $r = 'ERROR - CHECK THE INFORMED DATA';
                $this->status = 422;
            }
            $response->getBody()->write(json_encode($this->msg));
            
            return $response->withStatus($this->status);
        }
    }

    public function new(Request $request, Response $response, array $args) {
        $this->loadDB();
        $this->status = 500;

        $data =json_decode($request->getParsedBody()['data'],true);
        $id_user = $this->db->select_sql('users',['fields'=>'id'],['email' => $data['user_email']])[0]['id'];
        unset($data['user_email']);
        $data['id_user'] = $id_user;
        try {
          $data = $this->db->insert_sql('orders',$data);
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
        } catch (Exception $e) {
          $this->msg = ['ERROR' => "M.ORD.202309090049 - ERROR IN DATA PROVIDED --- {$e->getMessage()}"];
          $this->status=422;
        }
        $response->getBody()->write(json_encode($this->msg));
        return $response->withStatus($this->status);
    }

    public function update(Request $request, Response $response, array $args)
    {
        $this->loadDB();
        
        $this->status=500;
        $data = $request->getParsedBody();
        
        $values = json_decode($data['data'],true);

        
       try {
        $r = $this->db->update_sql('orders',$values,$args['id']);
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
       } catch (Exception $e) {
        $this->msg['msg'] = "ERROR | {$e->getMessage()}";
        $this->status=400;
       }
        $response->getBody()->write(json_encode($this->msg));
        return $response->withStatus($this->status);
    }

    public function delete(Request $req, Response $res, array $args) {
        $this->loadDB();
        $this->status=500;
        try {
            if($this->db->delete('orders',$args)){
                $this->status=200;
                $this->msg['success'] = true;
            }
            else{
                $this->status=400;
                $this->msg['success'] = false;
            }


        } catch (Exception $e) {
            $this->status=422;
            $this->msg['ERROR'] = 'M.OR202309091136 - '.$e->getMessage();
        }
        $res->getBody()->write(json_encode($this->msg));
        return $res->withStatus($this->status);
    }

    public function clear(Request $req, Response $res, array $args) {
        $this->loadDB();
        $this->status = 500;
        $data =json_decode($req->getParsedBody()['data'],true);
        $id_user = $this->db->select_sql('users',['fields'=>'id'],['email' => $data])[0]['id'];
        $data = ['isPaid' => '1'];
        try {
            if($this->db->update_sql('orders',$data,0,true,['id_user' => $id_user])){
                $this->status=200;
                $this->msg['success'] = true;
            }
            else {
                $this->status=400;
                $this->msg['success'] = false;
            }
        }catch (Exception $e) {
            $this->status=422;
            $this->msg['ERROR'] = 'M.OR202309091437 - '.$e->getMessage();
        }

        

        $res->getBody()->write(json_encode($this->msg));
        return $res->withStatus($this->status);
    }

   
   

    private function loadDB()
    {
        if($this->db == null){
            $this->db = \Models\BD::getInstance();
        }
    }

}