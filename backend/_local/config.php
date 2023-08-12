<?php
require_once __DIR__ . '/cred.php';
require_once __DIR__ . '/class.db.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");


$conx = new BD(DB_HOST,DB_USER,DB_PASS,DATABASE);