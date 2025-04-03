<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once('db.php');

$title = $_GET['title'] ?? '';
$genre = $_GET['genre'] ?? '';
$language = $_GET['language'] ?? '';

$sql = "SELECT id, title, genre, movies.language 
                FROM movies
                WHERE 1=1";
$params = [];
$types = "";

if (!empty($title)) {
  $sql .= " AND title LIKE ?";
  $params[] = "%$title%";
  $types .= "s";
}

if (!empty($genre)) {
  $sql .= " AND genre LIKE ?";
  $params[] = "%$genre%";
  $types .= "s";
}

if (!empty($language)) {
  $sql .= " AND language LIKE ?";
  $params[] = "%$language%";
  $types .= "s";
}

$stmt = $conn->prepare($sql);
if ($params) {
  $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$movies = [];
while ($row = $result->fetch_assoc()) {
  $movies[] = $row;
}

echo json_encode($movies);

$stmt->close();
$conn->close();
?>