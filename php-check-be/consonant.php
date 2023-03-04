<?php
header('Access-Control-Allow-Origin: *');

$consonant_input = $_POST['consonant_input'];

$index = check_first_consonants($consonant_input);
$changed_consonants = substr($consonant_input, $index) . substr($consonant_input, 0, $index) . "ay";

echo json_encode($changed_consonants);

function check_vowel($char) {
    return in_array(strtolower($char), ['a', 'e', 'i', 'o', 'u']);
}

function check_first_consonants($string) {
    $length = strlen($string);
    for ($i = 0; $i < $length; $i++) {
        if (check_vowel($string[$i])) {
            return $i;
        }
    }
    return $length;
}
?>