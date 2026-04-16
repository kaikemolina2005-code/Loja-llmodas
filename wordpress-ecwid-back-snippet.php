<?php
/**
 * Barra "← Continuar comprando" nas páginas /store/ do Ecwid
 *
 * Como aplicar (escolha uma opção):
 *
 * OPÇÃO A — functions.php do tema:
 *   Cole este código inteiro no arquivo functions.php do seu tema ativo
 *   (WordPress Admin → Aparência → Editor de Temas → functions.php)
 *
 * OPÇÃO B — Plugin WPCode (recomendado, sem risco):
 *   1. Instale o plugin "WPCode – Insert Headers and Footers"
 *   2. Vá em: Code Snippets → Add Snippet → PHP Snippet
 *   3. Cole apenas a function + add_action abaixo
 *   4. Configure para executar em "Site Wide" e salve
 *
 * OPÇÃO C — Plugin "Insert Headers and Footers":
 *   Cole o bloco <HTML> final (sem PHP) no campo Footer de todo o site,
 *   e a condição JS já filtra apenas URLs /store/
 */

function llmodas_ecwid_back_button() {
    // Só injeta nas páginas que contêm /store/ na URL
    if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/store' ) !== false ) {
        ?>
        <div id="ecwid-back" style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            background:#000;
            color:#fff;
            text-align:center;
            padding:12px;
            z-index:99999;
            font-weight:600;
            cursor:pointer;
            font-family:sans-serif;
            font-size:14px;
            letter-spacing:0.04em;
        ">
            ← Continuar comprando
        </div>
        <!-- Compensa o espaço ocupado pela barra fixa -->
        <div style="height:44px;"></div>
        <script>
        document.getElementById('ecwid-back').addEventListener('click', function() {
            window.location.href = 'https://llmodas.shop/ai-site2/';
        });
        </script>
        <?php
    }
}
add_action( 'wp_footer', 'llmodas_ecwid_back_button' );
