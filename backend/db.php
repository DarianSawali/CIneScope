<?php
$servername = "sql101.infinityfree.com";
$username = "if0_38696933";
$password = "iat459webapp";
$database = "if0_38696933_cinescope";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
