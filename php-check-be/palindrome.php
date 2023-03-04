<?php
header("Access-Control-Allow-Origin: *");

$string = $_GET['string'];


function palindrome_helper($string, $begin, $end) {

    if ($string[$begin] != $string[$end]) {
        return false;
    } else if (strlen($string) == 1) {
        return true;
    } else if ($begin > $end) {
        return true;
    } else {
        return palindrome_helper($string, $begin + 1, $end - 1);
    }
}

function palindrome($string) {
    return palindrome_helper($string, 0, strlen($string) - 1);
}

$is_palindrome = palindrome($string);

echo json_encode($is_palindrome);

?>