<?php
require_once "db.php";

$csvFile = fopen("./data/cleaned_imdb_2024.csv", "r");
fgetcsv($csvFile); 

$stmt = $conn->prepare("INSERT INTO movies (title, cast, language, imdb_url, genre, overview, release_date, runtime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssi", $title, $cast, $language, $imdb_url, $genre, $overview, $release_date, $runtime);

while (($row = fgetcsv($csvFile)) !== FALSE) {
    $imdb_url = $row[0];
    $title = $row[1]; 
    $genre = $row[2];  
    $overview = $row[3]; 
    $cast = $row[4];  
    $language = $row[5]; 
    $release_date = date('Y-m-d', strtotime($row[7]));
    $runtime = (int)$row[14]; 

    $stmt->execute();
}

// Close connections
$stmt->close();
$conn->close();
fclose($csvFile);

echo "CSV imported successfully!";
?>
