<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "cinescope");
$data = json_decode(file_get_contents("php://input"));

$email = $data->email ?? '';
$password = $data->password ?? '';

if (!$email || !$password) {
    echo json_encode(["error" => "Missing email or password"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, name, password, role FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row["password"])) {
        echo json_encode([
            "message" => "Login successful",
            "user" => [
                "id" => $row["id"],
                "name" => $row["name"],
                "role" => $row["role"]
            ]
        ]);
    } else {
        echo json_encode(["error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>