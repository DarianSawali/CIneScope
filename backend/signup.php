<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "cinescope");
$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$email = $data->email ?? '';
$password = $data->password ?? '';

if (!$name || !$email || !$password) {
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["message" => "Signup successful"]);
} else {
    echo json_encode(["error" => "Email already in use"]);
}

$conn->close();
?>