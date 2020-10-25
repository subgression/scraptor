<?php
    $res = new \stdClass();
    $ch = NULL;
    $content = NULL;

    if (!isset($_GET['url'])) {
        $res->res = "0";
        $res->msg = "No url parameter found!";
        $res->content = $content;
        echo json_encode($res);
        return;
    }

    if ($content = @file_get_contents($_GET['url'])) {
        $res->res = "2";
        $res->msg = "Everything ok";
        $res->content = $content;
        echo json_encode($res);
    }   
    else {
        $res->res = "1";
        $res->msg = "cURL error!";
        $res->content = $content;
        echo json_encode($res);
        return;
    }
?>