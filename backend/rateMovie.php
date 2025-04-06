<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id ?? null;
$movie_id = $data->movie_id ?? null;
$score = $data->score ?? null;

if (!$user_id || !$movie_id || !$score) {
    echo json_encode(["error" => "Missing data"]);
    exit;
}

// Check if rating exists
$stmt = $conn->prepare("SELECT id FROM ratings WHERE user_id = ? AND movie_id = ?");
$stmt->bind_param("ii", $user_id, $movie_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Update
    $update = $conn->prepare("UPDATE ratings SET score = ? WHERE user_id = ? AND movie_id = ?");
    $update->bind_param("dii", $score, $user_id, $movie_id);
    $success = $update->execute();
    echo json_encode(["success" => $success, "message" => "Rating updated"]);
    $update->close();
} else {
    // Insert
    $insert = $conn->prepare("INSERT INTO ratings (user_id, movie_id, score) VALUES (?, ?, ?)");
    $insert->bind_param("iid", $user_id, $movie_id, $score);
    $success = $insert->execute();
    echo json_encode(["success" => $success, "message" => "Rating added"]);
    $insert->close();
}

$stmt->close();
$conn->close();
