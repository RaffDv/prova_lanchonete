<?php
require_once __DIR__.  '/_local/config.php';

$values = '("rafael","oMaisGostosoReiDelas2023@gmail.com","senhaDificiu","rua teste, n123, sao paulo");';
$fields = 'name,email,pass,address';
$conx->insert_sql('users',$fields,$values);
$conx->select_sql('users');