<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "cinescope");
$data = json_decode(file_get_contents("php://input"));

$userId = $data->user_id ?? null;
$movieId = $data->movie_id ?? null;
$content = $data->content ?? null;

if (!$userId || !$movieId || !$content) {
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO comments (user_id, movie_id, content) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $userId, $movieId, $content);

if ($stmt->execute()) {
    echo json_encode(["message" => "Comment added"]);
} else {
    echo json_encode(["error" => "Failed to add comment"]);
}

$conn->close();
?>
