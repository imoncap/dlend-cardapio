# D'Lend: cardápio digital

Cardápio e pedidos online para uma pizzaria de bairro que atende por delivery, feito como projeto piloto. O cliente escolhe os sabores no celular, informa nome, endereço e forma de pagamento, e o WhatsApp da pizzaria abre com o pedido já montado. O fluxo de atendimento continua o mesmo, só que sem pedidos incompletos.

## O que faz

- Lista de sabores com quantidade, total e taxa de entrega por região
- Formulário de nome, endereço, forma de pagamento e troco
- Pagamento por Pix com chave para copiar e aviso de confirmação por comprovante
- Indicador de "aberto agora" ou "fechado" conforme o horário de funcionamento
- Mensagem do pedido gerada para o WhatsApp (link `wa.me`)
- Layout pensado primeiro para celular

## Tecnologias

HTML, CSS e JavaScript puros, sem frameworks e sem backend. Hospedagem estática no GitHub Pages.

## Estrutura

```
index.html       estrutura da página
css/style.css    visual
js/config.js     dados do negócio: sabores, preço, horário, taxas, Pix
js/app.js        lógica: carrinho, validação e mensagem do WhatsApp
img/logo.png     logo
```

## Como adaptar para outro negócio

Edite `js/config.js` (nome, WhatsApp, sabores, preço, regiões, horário, pagamentos) e troque `img/logo.png`. As cores ficam no começo do `css/style.css`.

## Como rodar

Abra o `index.html` no navegador. Não há nada para instalar.

## Observação

O pedido é enviado pelo próprio WhatsApp do cliente. A página não guarda nenhum dado.
