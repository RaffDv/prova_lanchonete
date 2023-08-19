<?php
header("Access-Control-Allow-Origin: localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");

// imports

require __DIR__ . '/../vendor/autoload.php';

require_once __DIR__.'/../app/Models/cred.php';
require_once __DIR__.'/../app/Models/DB.php';

use App\Controllers\UserController;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});

$app->group('/api', function (RouteCollectorProxy $api)
{
    $api->group('/user', function (RouteCollectorProxy $user)
    {
        $user->get('/',[UserController::class, 'get']);
        $user->get('/{id}',[UserController::class, 'unique']);
        $user->post('/new',[UserController::class,'new']);
        $user->post('/update',[UserController::class,'update']);
        $user->post('/login',[UserController::class,'login']);
    });

});

$app->run();
