<?php
//db.inc.php
$db_host = "http://m.edumedia.ca";
$db_user = "mad9022";
$db_password = "mad9022";
$db_name = "w15_final";

try{
    $pdo = new PDO('mysql:host='.$db_host.';dbname='.$db_name, $db_user, $db_password);}
catch(PDOException  $err ){
    echo "Database connection problem: " . $err->getMessage();
    exit();		//page should stop running if you fail to connect to the database
}
?>