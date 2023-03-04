<?php
header('Access-Control-Allow-Origin: *');

$email = $_POST['email'];
$password = $_POST['password'];
  
$valid_email = filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$valid_email) {

    $response = array('success' => false, 'message' => 'Invalid email format');
    echo json_encode($response);
    exit();
}
  
$password_regex = '/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/';
$valid_password = preg_match($password_regex, $password);
if (!$valid_password) {
    $response = array('success' => false, 'message' => 'Password does not meet requirements');
    echo json_encode($response);
    exit();
}

$response = array('success' => true, 'message' => 'Email and password are valid');
echo json_encode($response);

?>