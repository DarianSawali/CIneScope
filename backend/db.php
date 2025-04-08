<?php
$servername = "db5017620320.hosting-data.io";
$username = "dbu3462376";
$password = "cinescopedb123";
$database = "dbs14101647";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
