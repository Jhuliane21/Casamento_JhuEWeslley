<?php
$arquivo = 'mensagens.txt';
if (is_writable($arquivo)) {
    echo 'mensagens.txt tem permissão de escrita.';
} else {
    echo 'mensagens.txt NÃO tem permissão de escrita.';
}
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome']);
    $mensagem = trim($_POST['mensagem']);
    if ($nome && $mensagem) {
        $linha = $nome . '|' . $mensagem . "\n";
        $arquivo = 'mensagens.txt';
        $resultado = file_put_contents($arquivo, $linha, FILE_APPEND);
        if ($resultado === false) {
            echo json_encode(['success' => false, 'error' => 'Não foi possível salvar a mensagem. Verifique permissões do arquivo/pasta.']);
        } else {
            echo json_encode(['success' => true]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    }
    exit;
}
echo json_encode(['success' => false, 'error' => 'Método inválido']);
exit;
?>
