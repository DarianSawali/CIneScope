<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id ?? null;
$movie_id = $data->movie_id ?? null;

if (!$user_id || !$movie_id) {
    echo json_encode(["success" => false, "message" => "Missing user_id or movie_id"]);
    exit;
}

// Check if already bookmarked
$check = $conn->prepare("SELECT * FROM lists WHERE user_id = ? AND movie_id = ?");
$check->bind_param("ii", $user_id, $movie_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Already bookmarked"]);
    exit;
}

// Insert bookmark
$stmt = $conn->prepare("INSERT INTO lists (user_id, movie_id) VALUES (?, ?)");
$stmt->bind_param("ii", $user_id, $movie_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Movie bookmarked"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to bookmark"]);
}

$conn->close();
?>
