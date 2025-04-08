<?php
// movie list for home page

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$sql = "SELECT id, title, genre, release_date FROM movies ORDER BY release_date DESC LIMIT 20";
$result = $conn->query($sql);

$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
?>