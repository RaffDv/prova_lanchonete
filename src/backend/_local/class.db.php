<?php
class BD
{
    private string $host,$user,$pass,$database;
    private mysqli $conx;

    /**
     * @return self
    */

    public function __construct(string $host,$user,$pass,$database) {
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->database = $database;

       try 
       {
        $this->conx = new mysqli($this->host,$this->user,$this->pass,$this->database);
       }
       catch (Exception $e) 
       { 
        die('DB conx refused | err ->  '.$e->getMessage());
       }
    }


    // ###################################################################################
    // public methods - public methods - public methods - public methods - public methods
    // ###################################################################################

    public function insert_sql(string $table,string $fields, string $values, string $filter = '')
    {
        try {
            if ($filter !== '')
            {
                $values = $this->mount_values($values);
                $sql = "INSERT INTO {$table}{$fields} VALUES {$values} WHERE 1=1 AND {$filter}";
                echo $sql;
                $this->conx->query($sql);
            }
            else
            {
                $values = $this->mount_values($values);
                $sql = "INSERT INTO {$table}({$fields}) VALUES {$values} ";
                echo $sql;
                echo "<br/>";
                $this->conx->query($sql);
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
       


    }


    public function select_sql(string $table,string $values = '*',string $filter ='')
    {
        try {
            if ($filter !== '')
            {
                // $values = $this->mount_values($values);
                $sql = "SELECT {$values} from {$table} WHERE 1=1 AND {$filter}";
                $this->conx->query($sql);
    
            }
            else
            {
                // $values = $this->mount_values($values);
                $sql = "SELECT {$values} from {$table}";
               $this->conx->query($sql);
            }
            
        } catch (Exception $e) {
            echo $e->getMessage();
        }
       
        
    }


    // ###################################################################################
    // private methods - private methods - private methods - private methods - private methods
    // ###################################################################################

    private function mount_values(string $values)
    {
        $nv='';
        $arr = explode(',',$values);

        foreach ($arr as $value) {
            $nv .= "{$value}".',';
        }

        $nv = rtrim($nv,",");
        echo "<br/>";
        echo "formated values:   ";
        echo $nv;
        echo "<br/>";

        return $nv;
    }


    
}