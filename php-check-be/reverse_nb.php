<?php

$string_input = $_GET['string_input'];

//regular expression for digits
$digit_check = "/\d/";
$digits = array();
$index = array();
$string_array = str_split($string_input);

//check if a character is a digit, if yes will push it to the array
//also pushing the indexes for time complexity
for ($i = 0; $i < count($string_array); $i++) {
    if (preg_match($digit_check, $string_array[$i])) {
        array_push($digits, $string_array[$i]);
        array_push($index, $i);
    }
}

//put the last number of the array where we found the first one
for ($i = 0; $i < count($index); $i++) {
    $string_array[$index[$i]] = array_pop($digits);
}

//retransform the array to a string
$string_output = implode("", $string_array);

$response = array('string_output' => $string_output);
echo json_encode($response);
?>