<?php
$arquivo = 'mensagens.txt';
if (file_exists($arquivo)) {
    echo file_get_contents($arquivo);
} else {
    echo '';
}
?>
