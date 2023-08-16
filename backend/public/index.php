<?php
header("Access-Control-Allow-Origin: {$_SERVER['REMOTE_HOST']}");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");

// imports

require __DIR__ . '/../vendor/autoload.php';

require_once __DIR__ .'/../app/models/cred.php';
require_once __DIR__ . '/../app/models/DB.php';

use App\models\BD;
use App\Controllers\UserController;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$conx = new BD(DB_HOST, DB_USER, DB_PASS, DATABASE);
$GLOBALS['db'] = $conx;



$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});

$app->get('/api/users',[UserController::class, 'get']);
$app->get('/api/users/{id}',[UserController::class,'unique']);

$app->run();
