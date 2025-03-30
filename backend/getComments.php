<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "cinescope");
$movieId = $_GET['movie_id'] ?? null;

if (!$movieId) {
    echo json_encode(["error" => "Missing movie_id"]);
    exit;
}

$sql = "SELECT comments.id, comments.content, comments.created_at, users.name AS user_name
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.movie_id = ?
        ORDER BY comments.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $movieId);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
$conn->close();
?>
