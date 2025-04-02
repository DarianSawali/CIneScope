<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode(["error" => "Only POST requests allowed"]);
  exit;
}

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? '';
$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (!$name || !$email || !$password) {
  echo json_encode(["error" => "Missing required fields"]);
  exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashed);

if ($stmt->execute()) {
  $user_id = $stmt->insert_id;
  echo json_encode([
    "success" => true,
    "message" => "Signup successful",
    "user" => [
      "id" => $user_id,
      "name" => $name
    ]
  ]);
} else {
  echo json_encode(["error" => "Signup failed: " . $stmt->error]);
}
