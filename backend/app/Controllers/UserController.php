<?php
namespace App\Controllers;


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController{
    public function index(Request $request, Response $response){
        $data = $request->getParsedBody();
        $parsedData = json_encode($data);
        $response->getBody()->write($parsedData);
        return $response->withStatus(200);
    }


}