<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "cinescope");

$id = $_GET['id'] ?? null;

if (!$id) {
  echo json_encode(["error" => "Missing movie ID"]);
  exit;
}

$stmt = $conn->prepare("SELECT * FROM movies WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$movie = $result->fetch_assoc();
echo json_encode($movie);

$conn->close();
?>