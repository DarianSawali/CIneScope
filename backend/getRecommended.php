<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$genres = $_GET['genres'] ?? '';

if (!$genres) {
  echo json_encode([]);
  exit;
}

$genre = explode(',', $genres);

$sql = "SELECT * FROM movies WHERE ";
$conditions = array_map(fn($g) => "genre LIKE ?", $genre); // genre conditions
$sql .= implode(" OR ", $conditions);
$sql .= " LIMIT 6"; // only 6 movies

$stmt = $conn->prepare($sql);

$types = str_repeat("s", count($genre));
$params = array_map(fn($g) => "%$g%", $genre);
$stmt->bind_param($types, ...$params);

$stmt->execute();
$result = $stmt->get_result();

$movies = [];
while ($row = $result->fetch_assoc()) {
  $movies[] = $row;
}

echo json_encode($movies);
