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

  regioes: [
    { nome: "Iriri",   taxa: 3 },
    { nome: "Inhaúma", taxa: 5 },
    { nome: "Piúma",   taxa: 5 }
  ],

  horario: {
    texto: "Sexta a domingo, das 19h às 23h",  // texto exibido
    dias: [5, 6, 0],                           // 0 = domingo, 1 = segunda ... 6 = sábado
    abre: 19,                                  // hora de abertura
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
  { id: "calabresa",       nome: "Calabresa",           tipo: "salgada", desc: "Calabresa fatiada" },
  { id: "calabresa-ace",   nome: "Calabresa Acebolada", tipo: "salgada", desc: "Calabresa fatiada e cebola" },
  { id: "portuguesa",      nome: "Portuguesa",          tipo: "salgada", desc: "Presunto, ovo, cebola e azeitona" },
  { id: "frango-catupiry", nome: "Frango com catupiry", tipo: "salgada", desc: "Frango desfiado e catupiry" },
  { id: "baiana",          nome: "Baiana",              tipo: "salgada", desc: "Calabresa moída, pimenta e cebola" },
  { id: "presunto",        nome: "Presunto",            tipo: "salgada", desc: "Presunto e muçarela" },
  { id: "frango",          nome: "Frango",              tipo: "salgada", desc: "Frango desfiado" },
  { id: "margherita",      nome: "Margherita",          tipo: "salgada", desc: "Muçarela, tomate e manjericão" },
  { id: "alho-oleo",       nome: "Alho & Óleo",         tipo: "salgada", desc: "Alho dourado no azeite" },
  { id: "mussarela",       nome: "Mussarela",           tipo: "salgada", desc: "Queijo muçarela" },
  { id: "milho",           nome: "Milho",               tipo: "salgada", desc: "Milho e muçarela" },
  { id: "milho-catupiry",  nome: "Milho com catupiry",  tipo: "salgada", desc: "Milho e catupiry" },
  { id: "goiabada",        nome: "Goiabada com canela", tipo: "doce",    desc: "Goiabada e canela" },
  { id: "banana",          nome: "Banana com canela",   tipo: "doce",    desc: "Banana e canela" }
];
