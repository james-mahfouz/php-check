<?php
header('Access-Control-Allow-Origin: *');

function sum_even_digits($ip_address) {
    $sum = 0;
    for ($i = 0; $i < strlen($ip_address); $i++) {
        $digit = intval($ip_address[$i]);
        if ($digit % 2 == 0) {
            $sum += $digit;
        }
    }
    return $sum;
}

$ip_address = $_SERVER['REMOTE_ADDR'];
$even_sum = sum_even_digits($ip_address);

echo "IP address: " . $ip_address . "<br>";
echo "Sum of even digits: " . $even_sum;


?>