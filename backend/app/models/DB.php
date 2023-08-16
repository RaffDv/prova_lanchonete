<?php
namespace App\models;

require __DIR__ .'/../../vendor/autoload.php';
use Exception;
use PDO;
use PDOException;

class BD
{
    private string $host,$user,$pass,$database;
    private PDO $conx;

    /**
     * @return self
    */

    public function __construct(string $host,$user,$pass,$database) {
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->database = $database;

        try {
            $this->conx = new PDO("mysql:host={$this->host};dbname={$this->database};charset=utf8",$this->user,$this->pass);
            $this->conx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conx->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->conx->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);;
            
        } catch (PDOException $e) {
            die("DB conx error -> {$e->getMessage()}");
        }
        
    }


    // ###################################################################################
    // public methods - public methods - public methods - public methods - public methods
    // ###################################################################################



    public function insert_sql(string $table,string $fields, $values, string $filter = '')
    {
        try {
            if ($filter !== '')
            {
    
                $sql = "INSERT INTO {$table}{$fields} VALUES {$values} WHERE 1=1 AND {$filter}";
                echo $sql;
                $this->conx->query($sql);
            }
            else
            {
    
                $sql = "INSERT INTO {$table}({$fields}) VALUES :values ";
                $this->safeQuery($this->conx,$sql,$values);
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
       


    }

    public function select_sql(string $table, $fields = ["fields" => "*"], $filter = [])
    {
        try {
            $sql = "SELECT {$fields['fields']} from {$table}";
    
            if (!empty($filter)) {
                $whereConditions = [];
                foreach ($filter as $field => $value) {
                    $whereConditions[] = "$field = :$field";
                }
                $sql .= " WHERE " . implode(" AND ", $whereConditions);
            }
    
            $t = $this->safeQuery($sql, $filter);
            return $t;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
    


    // ###################################################################################
    // private methods - private methods - private methods - private methods - private methods
    // ###################################################################################

   
    private function safeQuery($sql, $data = [])
    {
        try 
        {
            if ($s = $this->conx->prepare($sql)) {
                $s->setFetchMode(PDO::FETCH_ASSOC);
                
                if ($s->execute($data)) {
                    return $s->fetchAll();
                }
            }
    
            return false;
        } 
        catch (PDOException $e) 
        {
            throw new Exception($e->getMessage());
        }
    }
    
}

