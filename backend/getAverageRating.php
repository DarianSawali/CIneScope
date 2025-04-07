<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$movie_id = $_GET['movie_id'] ?? 0;

if (!$movie_id) {
    echo json_encode(["error" => "Missing movie ID"]);
    exit;
}

$stmt = $conn->prepare("SELECT AVG(score) AS average, COUNT(*) AS count FROM ratings WHERE movie_id = ?");
$stmt->bind_param("i", $movie_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "average" => round((float)$row['average'], 1),
        "count" => (int)$row['count']
    ]);
} else {
    echo json_encode(["average" => null, "count" => 0]);
}

$stmt->close();
$conn->close();
