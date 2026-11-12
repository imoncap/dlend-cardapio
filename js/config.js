/* =====================================================================
   CONFIGURAÇÃO DO CARDÁPIO
   Tudo que aparece na página vem daqui. Para outro cliente, troque só
   este arquivo e a logo em img/logo.png.
   ===================================================================== */

const CONFIG = {
  nome: "D'Lend",
  whatsapp: "5528999302517",          // código do país + DDD + número, só dígitos
  telefone: "(28) 99930-2517",        // como aparece na página
  preco: 30,                          // preço único das pizzas, em reais
  retirada: true,                     // false remove a opção "Retirar no local"
  entrega: false,                     // true volta a habilitar a entrega (usa a lista "regioes" abaixo)
  enderecoRetirada: "Rua José Costa - Iriri, Anchieta - ES, 29230-000",               // ex.: "Rua tal, 123, Bairro" (aparece em "Retirada")
  mapa: "https://maps.app.goo.gl/detNM4fmNbod6d5B6?g_st=ac",   // link do Google Maps ("" esconde o botão)

  regioes: [
    { nome: "Iriri",   taxa: 3 },
    { nome: "Inhaúma", taxa: 5 },
    { nome: "Piúma",   taxa: 5 }
  ],

  horario: {
    texto: "Quarta a domingo, das 18h às 23h",  // texto exibido
    dias: [3, 4, 5, 6, 0],                           // 0 = domingo, 1 = segunda ... 6 = sábado
    abre: 18,                                  // hora de abertura
    fecha: 23                                  // hora de fechamento
  },

  pagamentos: [
    { nome: "Pix",               tipo: "pix" },
    { nome: "Cartão de crédito", tipo: "cartao" },
    { nome: "Cartão de débito",  tipo: "cartao" },
    { nome: "Dinheiro",          tipo: "dinheiro" }
  ],

  pix: {
    chave: "28999302517",                    // chave Pix que o cliente copia
    tipo: "Telefone",
    nome: "Maria da Penha de Abreu Souza",   // nome do recebedor
    banco: "Mercado Pago IP Ltda"
  }
};

/* CONFIRMAR as descrições com o dono antes de publicar. */
const SABORES = [
  { id: "calabresa",       nome: "Calabresa",           tipo: "salgada", desc: "Molho, mussarela, calabresa e orégano" },
  { id: "calabresa-ace",   nome: "Calabresa Acebolada", tipo: "salgada", desc: "Molho, mussarela, calabresa, cebola e orégano" },
  { id: "portuguesa",      nome: "Portuguesa",          tipo: "salgada", desc: "Molho, mussarela, ovo, presunto, tomate, cebola e orégano" },
  { id: "frango",          nome: "Frango",              tipo: "salgada", desc: "Molho, mussarela, frango desfiado e orégano" },
  { id: "frango-catupiry", nome: "Frango com catupiry", tipo: "salgada", desc: "Molho, mussarela, frango desfiado, catupiry e orégano" },
  { id: "baiana",          nome: "Baiana",              tipo: "salgada", desc: "Molho, mussarela, ovo, calabresa, pimenta e orégano" },
  { id: "presunto",        nome: "Presunto",            tipo: "salgada", desc: "Molho, mussarela, presunto e orégano" },
  { id: "marguerita",      nome: "Marguerita",          tipo: "salgada", desc: "Molho, mussarela, manjericão, tomate e orégano" },
  { id: "alho-oleo",       nome: "Alho & Óleo",         tipo: "salgada", desc: "Molho, mussarela, alho, azeite e orégano" },
  { id: "mussarela",       nome: "Mussarela",           tipo: "salgada", desc: "Molho, mussarela e orégano" },
  { id: "milho",           nome: "Milho",               tipo: "salgada", desc: "Molho, mussarela, milho e orégano" },
  { id: "milho-catupiry",  nome: "Milho com catupiry",  tipo: "salgada", desc: "Molho, mussarela, milho, catupiry e orégano" },
  { id: "goiabada",        nome: "Goiabada com canela", tipo: "doce",    desc: "Mussarela, goiabada e canela" },
  { id: "banana",          nome: "Banana com canela",   tipo: "doce",    desc: "Mussarela, banana e canela" },
  { id: "goiaba",          nome: "Suco de goiaba 500ml",   tipo: "suco", preco: 6,    desc: "Suco natural da fruta congelada (não é polpa)" },
  { id: "manga",          nome: "Suco de manga 500ml",   tipo: "suco", preco: 6,    desc: "Suco natural da fruta congelada (não é polpa)" },
  { id: "abacaxi",          nome: "Suco de abacaxi 500ml",   tipo: "suco", preco: 6,    desc: "Suco natural da fruta congelada (não é polpa)" },

];
