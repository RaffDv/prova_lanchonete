<?php
namespace Models;
require_once __DIR__.'/../../vendor/autoload.php';
require_once __DIR__.'/cred.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTProvider 
{
    private static $key = JWT_KEY;

    public static function encode_token( array $data){
        $payload = [
            'exp'=> strtotime('+5days')
        ];
        $payload = array_merge($payload,$data);
        $jwt = JWT::encode($payload, self::$key, 'HS256');
        return $jwt;

    }

    public static function decode_token($token) {
        
        $decoded = JWT::decode($token, new Key(self::$key, 'HS256'));
        return $decoded;
    }

}