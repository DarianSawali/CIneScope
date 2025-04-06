<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$user_id = $_GET['user_id'] ?? 0;
$movie_id = $_GET['movie_id'] ?? 0;

if (!$user_id || !$movie_id) {
    echo json_encode(["error" => "Missing user or movie ID"]);
    exit;
}

$stmt = $conn->prepare("SELECT score FROM ratings WHERE user_id = ? AND movie_id = ?");
$stmt->bind_param("ii", $user_id, $movie_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["score" => $row['score']]);
} else {
    echo json_encode(["score" => null]);
}

$stmt->close();
$conn->close();
