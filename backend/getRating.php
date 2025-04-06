<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$movie_id = $_GET["movie_id"] ?? null;

if (!$movie_id) {
    echo json_encode(["error" => "Movie ID required"]);
    exit;
}

$sql = "SELECT AVG(score) as avg_rating, COUNT(*) as total FROM ratings WHERE movie_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $movie_id);
$stmt->execute();

$result = $stmt->get_result();

$ratings = [];
while ($row = $result->fetch_assoc()) {
    $ratings[] = $row;
  }

echo json_encode($ratings);
