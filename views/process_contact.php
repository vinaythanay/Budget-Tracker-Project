<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["action"]) && $_POST["action"] === "process_contact") 
  
{
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Define a file to store form submissions (e.g., submissions.txt)
    $file = "submissions.txt";
    
    // Prepare the data
    $data = "Name: $name\nEmail: $email\nMessage: $message\n\n";
    
    // Append the data to the file
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
    
    echo "Your message has been saved!";
}
?>
