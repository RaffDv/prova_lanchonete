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
                  if($value['id_food']){
                    $foods[] = ['orderID' => $value['id'],'value'=>$value['value'],'food'=>$this->db->select_sql('foods',['fields'=>'*'],['id'=>$value['id_food']])[0]];
    
                  }
                  if($value['id_drink']){
                    $drinks[] =['orderID'=>$value['id'],'value'=>$value['value'],'drink'=> $this->db->select_sql('drinks',['fields'=>'*'],['id'=>$value['id_drink']])[0]];
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

   
   

    private function loadDB()
    {
        if($this->db == null){
            $this->db = \Models\BD::getInstance();
        }
    }

}