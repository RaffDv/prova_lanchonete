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

            $r = $this->safeQuery($sql, $filter,2);
            
            if($r){
                return $r;
            }
            return false;
        } catch (Exception $e) {
            echo "ERROR   " . $e->getMessage();
        }
    }

    public function update_sql(string $table,$token,$data=[],$itemID)
    {
        $decoded =  \Models\JWTProvider::decode_token($token);
        $filter = ["email" =>$decoded->email];
       
        $privs = $this->select_sql('users', ['fields' => 'privileges'],$filter )[0]['privileges'];
        if( $privs == 10){
            try {
                $sql = "UPDATE {$table}";
    
                if (!empty($data)) {
                    $whereConditions = [];
                    foreach ($data as $field => $value) {
                        $whereConditions[] = " $field = :$field";
                    }
                    $sql .=" SET".implode(",", $whereConditions);
                }
    
                $sql .= " WHERE id = {$itemID}";
                $r = $this->safeQuery($sql,$data);
                if($r) return true;
                return false;
            } catch (PDOException $e) {
                echo "ERROR   " . $e->getMessage();
    
            }

        }
        else{
            echo $privs;
        }
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
           return null;
        }
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

