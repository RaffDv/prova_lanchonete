<?php


require __DIR__ . '/../vendor/autoload.php';

require_once __DIR__.'/../app/Models/cred.php';
require_once __DIR__.'/../app/Models/DB.php';

use App\Controllers\UserController;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

$app = AppFactory::create();


$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
    ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    ->withHeader('Access-Control-Allow-Credentials', 'true')
    ->withHeader('Access-Control-Expose-Headers','Authorization')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
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
