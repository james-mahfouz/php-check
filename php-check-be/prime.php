<?php
header('Access-Control-Allow-Origin: *');

$year_of_birth = $_POST['year_of_birth'];
$age = date("Y") - $year_of_birth;

$is_prime = is_prime($age);
$is_even = is_even($age);

$response = array(
    'age' => $age,
    'is_prime' => $is_prime,
    'is_even' => $is_even
);

echo json_encode($response);


function is_prime($age_input) {
    $is_prime = true;
    for ($i = 2; $i <= $age_input / 2; $i++) {
        if ($age_input % $i == 0) {
            $is_prime = false;
            break;
        }
    }
    return $is_prime;
}

function is_even($age_input) {
    return ($age_input % 2 == 0);
}

?>