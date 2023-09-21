<?php
namespace Models;

require __DIR__ .'/../../vendor/autoload.php';

require_once __DIR__.'/cred.php';

use Exception;
use PDO;
use PDOException;

class BD
{
    private static ?self $instance = null; // Singleton instance
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



    public function insert_sql(string $table, array $values=[])
    {
        try {
            $sql = "INSERT INTO {$table} ";
            if (!empty($values)) {
                $whereConditions = [];
                foreach ($values as $field => $value) {
                    $whereConditions[] = "$field";
                }
                $sql .= '(' . implode(",", $whereConditions) . ') VALUES ';
            }

    
            if (!empty($values)) {
                $whereConditions = [];
                foreach ($values as $field => $value) {
                    $whereConditions[] = ":$field";
                }
                $sql .= '(' . implode(",", $whereConditions) . ')';
            }

            $r = $this->safeQuery($sql, $values);
            if($r){
                return true;
            }
            return false;
        } catch (Exception $e) {
            echo "ERROR   " . $e->getMessage();
        }
       


    }
    
    public function insert_bulk(string $table, string $fields, int $itemID, array $ingredientsIDs)
    {
        try {
            $sql = "INSERT INTO {$table} ({$fields}) VALUES ";
            if (!empty($ingredientsIDs)) {
                foreach ($ingredientsIDs as $key => $value) {
                    $values[] = "({$itemID}, :{$key})";
                }
                $sql .= implode(", ", $values);
                $r = $this->safeQuery($sql, $ingredientsIDs);
                if ($r) {
                    return true;
                }
            }
            return false;
        } catch (Exception $e) {
            echo "ERROR: " . $e->getMessage();
            echo PHP_EOL;
        }
    }


    public function select_sql(string $table, $fields = ["fields" => "*"], $filter = [],bool $fetchRows = false)
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
            $type =2;
            if($fetchRows){
                $type = 3;
            }
            $r = $this->safeQuery($sql, $filter,$type);
            if(is_array($r)){
                return $r;
            }
            return false;
        } catch (Exception $e) {
            echo "ERROR   " . $e->getMessage();
        }
    }

    public function update_sql(string $table,$data=[],$itemID = 0,bool $bulk = false,array $dataBulk = [])
    {
       
            try {
                $sql = "UPDATE {$table}";
    
                if (!empty($data)) {
                    $whereConditions = [];
                    foreach ($data as $field => $value) {
                        $whereConditions[] = " $field = :$field";
                    }
                    $sql .=" SET".implode(",", $whereConditions);
                }

                if($bulk){
                    if (!empty($dataBulk)) {
                        $whereConditions = [];
                        foreach ($dataBulk as $field => $value) {
                            $whereConditions[] = " $field = :$field";
                        }
                        $sql .=" WHERE".implode(",", $whereConditions);
                    }
                    $data = array_merge($data,$dataBulk);
                }
                else
                {
                    $sql .= " WHERE id = {$itemID}";

                }
                $r = $this->safeQuery($sql,$data);
                if($r) return true;
                return false;
            } catch (PDOException $e) {
                echo "ERROR   " . $e->getMessage();
    
            }

        
        return false;
    }
    public function delete (string $table,array $field_value=[])
    {
        $sql = "DELETE FROM {$table} ";
        if (!empty($field_value)) {
            $whereConditions = [];
            foreach ($field_value as $field => $value) {
                $whereConditions[] = " $field = :$field";
            }
            $sql .=" WHERE".implode(",", $whereConditions);
        }
        $r = $this->safeQuery($sql,$field_value);
        if($r) return true;
        return false;

    }


    // ########################################################################################
    // private methods - private methods - private methods - private methods - private methods
    // ########################################################################################

   
    private function safeQuery($sql, $data = [],$type=1)
    {
        try 
        {
            if ($s = $this->conx->prepare($sql)) {
                $s->setFetchMode(PDO::FETCH_ASSOC);
                if ($s->execute($data)) {
                    switch ($type) {
                        case 1:
                            return $s;
                        
                        case 2:
                            return $s->fetchAll();
                        
                        case 3: 
                            
                            $result = [];
                            while ($row = $s->fetch()) {
                                $result[] = array_shift($row);
                                
                            }
                            return $result;
                        default:
                            return $s->fetchAll();
                            break;
                    }

                }
            }
    
            return false;
        } 
        catch (PDOException $e) 
        {
            echo $e->getMessage() . PHP_EOL;

           return null;
        }
    }

    public function lastInsert() {
        return $this->conx->lastInsertId();

    }


    // ########################################################################################
    // private methods - private methods - private methods - private methods - private methods
    // ########################################################################################
    
    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self(DB_HOST,DB_USER,DB_PASS,DATABASE);
        }
        return self::$instance;
    }
    
}

