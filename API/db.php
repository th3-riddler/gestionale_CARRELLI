<?php
$hostname = "127.0.0.1";
$username = "redux";
$password = "robiola";
$dbname = "gestionale_aule_innovative";

$conn = new mysqli($hostname, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
