<?php
$arquivo = 'mensagens.json';
$mensagens = [];

if (file_exists($arquivo)) {
    $conteudo = file_get_contents($arquivo);
    $json = json_decode($conteudo, true);
    if (is_array($json)) {
        $mensagens = $json;
    }
}
header('Content-Type: application/json');
echo json_encode($mensagens);
?>
