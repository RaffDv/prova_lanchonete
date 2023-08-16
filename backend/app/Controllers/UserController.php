<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController{

    
    public function get(Request $request, Response $response){
        $data = $GLOBALS['db']->select_sql('users', ['fields' => 'name,email'], ['id' => 7]);

        

        print_r($data);
        // $parsedData = json_encode($data);
        // $response->getBody()->write($parsedData);
        
        return $response->withStatus(200);
    }
    
    public function unique(Request $request, Response $response,array $args) {
        
        return $response;
    }


}