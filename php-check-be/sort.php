<?php
header('Access-Control-Allow-Origin: *');

$input = $_GET['numbers'];
$numbers = explode(',', $input);
$numbers = array_map('intval', $numbers);

function selection_sort($arr) {
    $n = count($arr);
    for($i = 0; $i < $n-1; $i++) {
        $min_idx = $i;
        for($j = $i+1; $j < $n; $j++) {
            if($arr[$j] < $arr[$min_idx]) {
                $min_idx = $j;
            }
        }

        $temp = $arr[$i];
        $arr[$i] = $arr[$min_idx];
        $arr[$min_idx] = $temp;
    }
    return $arr;
}

$sorted_numbers = selection_sort($numbers);

echo json_encode($sorted_numbers);
?>