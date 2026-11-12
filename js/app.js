/* =====================================================================
   Lógica da página: carrinho, validação e mensagem do WhatsApp.
   Os dados vêm de config.js (CONFIG e SABORES).
   ===================================================================== */

const MAX_POR_SABOR = 20;
const NOMES_DIA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const qtd = {};
SABORES.forEach(s => qtd[s.id] = 0);

const $ = id => document.getElementById(id);
const moeda = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* ---------- Lista de sabores ---------- */
function htmlFaixa(s) {
  return `<li class="faixa" id="f-${s.id}">
    <div class="faixa-txt">
      <span class="faixa-nome">${s.nome}</span>
      <span class="faixa-desc">${s.desc}</span>
    </div>
    <div class="passo" role="group" aria-label="Quantidade de ${s.nome}">
      <button type="button" data-acao="menos" data-id="${s.id}" aria-label="Tirar uma ${s.nome}" disabled>−</button>
      <output class="qtd" id="q-${s.id}">0</output>
      <button type="button" data-acao="mais" data-id="${s.id}" aria-label="Adicionar uma ${s.nome}">+</button>
    </div>
  </li>`;
}

function montarSabores() {
  const grupos = [["salgada", "Salgadas"], ["doce", "Doces"]];
  $("sabores").innerHTML = grupos.map(([tipo, titulo]) => {
    const itens = SABORES.filter(s => s.tipo === tipo);
    if (!itens.length) return "";
    return `<h3>${titulo}</h3><ul class="faixas">${itens.map(htmlFaixa).join("")}</ul>`;
  }).join("");
}

/* ---------- Região / entrega ---------- */
function montarRegioes() {
  let opcoes = `<option value="">Escolha a região</option>`;
  CONFIG.regioes.forEach((r, i) => {
    opcoes += `<option value="r${i}">${r.nome} (entrega ${moeda(r.taxa)})</option>`;
  });
  if (CONFIG.retirada) opcoes += `<option value="retirada">Retirar no local (sem taxa)</option>`;
  $("regiao").innerHTML = opcoes;
}

function entregaSelecionada() {
  const v = $("regiao").value;
  if (!v) return null;
  if (v === "retirada") return { rotulo: "Retirada no local", taxa: 0, retirada: true };
  const r = CONFIG.regioes[parseInt(v.slice(1), 10)];
  return { rotulo: r.nome, taxa: r.taxa, retirada: false };
}

/* ---------- Pagamento ---------- */
function montarPagamentos() {
  $("pagamento").innerHTML = `<option value="">Escolha a forma de pagamento</option>` +
    CONFIG.pagamentos.map((p, i) => `<option value="${i}">${p.nome}</option>`).join("");
  $("pix-chave-txt").textContent = CONFIG.pix.chave;
  $("pix-dados").textContent =
    `Chave Pix (${CONFIG.pix.tipo.toLowerCase()}). Recebedor: ${CONFIG.pix.nome}, ${CONFIG.pix.banco}.`;
}

function pagamentoSelecionado() {
  const v = $("pagamento").value;
  return v === "" ? null : CONFIG.pagamentos[parseInt(v, 10)];
}

/* ---------- Totais e atualização da tela ---------- */
function totalPizzas() {
  return SABORES.reduce((n, s) => n + qtd[s.id], 0);
}

function atualizar() {
  const n = totalPizzas();
  const subtotal = n * CONFIG.preco;
  const entrega = entregaSelecionada();
  const total = subtotal + (entrega ? entrega.taxa : 0);

  SABORES.forEach(s => {
    $("q-" + s.id).textContent = qtd[s.id];
    $("f-" + s.id).classList.toggle("on", qtd[s.id] > 0);
    const menos = document.querySelector(`button[data-acao="menos"][data-id="${s.id}"]`);
    const mais = document.querySelector(`button[data-acao="mais"][data-id="${s.id}"]`);
    menos.disabled = qtd[s.id] === 0;
    mais.disabled = qtd[s.id] >= MAX_POR_SABOR;
  });

  $("vazio").hidden = n > 0;
  $("resumo").hidden = n === 0;
  $("barra").hidden = n === 0;

  $("itens").innerHTML = SABORES.filter(s => qtd[s.id] > 0)
    .map(s => `<li><span>${qtd[s.id]}x ${s.nome}</span><span>${moeda(qtd[s.id] * CONFIG.preco)}</span></li>`)
    .join("");

  $("v-pizzas").textContent = moeda(subtotal);
  $("v-entrega").textContent = entrega ? (entrega.taxa ? moeda(entrega.taxa) : "Grátis") : "Escolha a região";
  $("v-total").textContent = moeda(total);

  $("b-qtd").textContent = n === 1 ? "1 pizza" : n + " pizzas";
  $("b-total").textContent = moeda(total);

  const pg = pagamentoSelecionado();
  $("grupo-endereco").hidden = !!(entrega && entrega.retirada);
  $("grupo-troco").hidden = !(pg && pg.tipo === "dinheiro");
  $("caixa-pix").hidden = !(pg && pg.tipo === "pix");
  $("pix-valor").textContent = entrega ? moeda(total) : "escolha a região para ver o valor";
}

document.addEventListener("click", e => {
  const b = e.target.closest("button[data-acao]");
  if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.acao === "mais" && qtd[id] < MAX_POR_SABOR) qtd[id]++;
  if (b.dataset.acao === "menos" && qtd[id] > 0) qtd[id]--;
  $("erro").hidden = true;
  atualizar();
});

["regiao", "pagamento"].forEach(id =>
  $(id).addEventListener("change", () => { $("erro").hidden = true; atualizar(); })
);

$("copiar-pix").addEventListener("click", async () => {
  const btn = $("copiar-pix");
  try {
    await navigator.clipboard.writeText(CONFIG.pix.chave);
  } catch (e) {
    const t = document.createElement("textarea");
    t.value = CONFIG.pix.chave;
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); } catch (_) {}
    t.remove();
  }
  btn.textContent = "Copiado!";
  setTimeout(() => { btn.textContent = "Copiar chave"; }, 2000);
});

/* ---------- Mensagem do WhatsApp ---------- */
function lerTroco(total) {
  const txt = $("troco").value.trim();
  if (!txt) return { ok: true, valor: null };
  const n = parseFloat(txt.replace(/[^\d,.]/g, "").replace(",", "."));
  if (!isFinite(n) || n <= 0) return { ok: false, msg: "Digite o valor do troco só com números. Ex.: 50" };
  if (n < total) return { ok: false, msg: "O valor para o troco precisa ser maior que o total do pedido." };
  return { ok: true, valor: n };
}

function montarMensagem(entrega, pg, troco) {
  const n = totalPizzas();
  const subtotal = n * CONFIG.preco;
  const linhas = SABORES.filter(s => qtd[s.id] > 0).map(s => `• ${qtd[s.id]}x ${s.nome}`);
  const obs = $("obs").value.trim();

  const partes = [
    `Olá! Quero fazer um pedido 🍕`,
    ``,
    ...linhas,
    ``,
    `Pizzas: ${moeda(subtotal)}`,
    entrega.retirada ? `Retirada no local` : `Entrega (${entrega.rotulo}): ${moeda(entrega.taxa)}`,
    `Total: ${moeda(subtotal + entrega.taxa)}`,
    ``,
    `Nome: ${$("nome").value.trim()}`
  ];

  if (!entrega.retirada) {
    const ref = $("ref").value.trim();
    partes.push(`Endereço: ${$("rua").value.trim()}, ${$("bairro").value.trim()}${ref ? ` (ref.: ${ref})` : ""}`);
  }

  let pagamento = `Pagamento: ${pg.nome}`;
  if (pg.tipo === "dinheiro") pagamento += troco.valor ? ` (troco para ${moeda(troco.valor)})` : ` (sem troco)`;
  if (pg.tipo === "pix") pagamento += ` (vou enviar o comprovante aqui)`;
  partes.push(pagamento);

  if (obs) partes.push(``, `Obs.: ${obs}`);
  return partes.join("\n");
}

function mostrarErro(msg, campo) {
  $("erro").textContent = msg;
  $("erro").hidden = false;
  if (campo) $(campo).focus();
}

$("enviar").addEventListener("click", () => {
  const entrega = entregaSelecionada();
  const pg = pagamentoSelecionado();

  if (!$("nome").value.trim()) return mostrarErro("Digite seu nome para continuar.", "nome");
  if (!entrega) return mostrarErro("Escolha a região de entrega ou retirada para continuar.", "regiao");
  if (!entrega.retirada) {
    if (!$("rua").value.trim()) return mostrarErro("Preencha a rua e o número para a entrega.", "rua");
    if (!$("bairro").value.trim()) return mostrarErro("Preencha o bairro para a entrega.", "bairro");
  }
  if (!pg) return mostrarErro("Escolha a forma de pagamento.", "pagamento");

  const total = totalPizzas() * CONFIG.preco + entrega.taxa;
  const troco = pg.tipo === "dinheiro" ? lerTroco(total) : { ok: true, valor: null };
  if (!troco.ok) return mostrarErro(troco.msg, "troco");

  $("erro").hidden = true;
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(montarMensagem(entrega, pg, troco))}`;
  window.open(url, "_blank", "noopener");
});

/* ---------- Horário de funcionamento ---------- */
function agoraSP() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", hourCycle: "h23"
  }).formatToParts(new Date());
  const sem = partes.find(p => p.type === "weekday").value;
  const hora = parseInt(partes.find(p => p.type === "hour").value, 10);
  const dia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[sem];
  return { dia, hora };
}

function situacao() {
  const { dia, hora } = agoraSP();
  const H = CONFIG.horario;
  if (H.dias.includes(dia) && hora >= H.abre && hora < H.fecha) {
    return { aberto: true, texto: `Aberto agora, até ${H.fecha}h` };
  }
  for (let i = 0; i <= 7; i++) {
    const d = (dia + i) % 7;
    if (H.dias.includes(d) && (i > 0 || hora < H.abre)) {
      const quando = i === 0 ? "hoje" : i === 1 ? "amanhã" : NOMES_DIA[d];
      return { aberto: false, texto: `Fechado agora, abre ${quando} às ${H.abre}h` };
    }
  }
  return { aberto: false, texto: "Fechado agora" };
}

function atualizarStatus() {
  const s = situacao();
  const el = $("status");
  el.textContent = s.texto;
  el.classList.toggle("aberto", s.aberto);
  el.classList.toggle("fechado", !s.aberto);
  $("aviso-fechado").hidden = s.aberto;
}

/* ---------- Informações e rodapé ---------- */
function montarInfos() {
  const taxas = CONFIG.regioes.map(r => `${r.nome}: ${moeda(r.taxa)}`).join("<br>");
  const areas = CONFIG.regioes.map(r => r.nome).join(", ");
  $("infos").innerHTML = `
    <div><dt>Horário</dt><dd>${CONFIG.horario.texto}</dd></div>
    <div><dt>Áreas atendidas</dt><dd>${areas}</dd></div>
    <div><dt>Taxa de entrega</dt><dd>${taxas}</dd></div>
    <div><dt>Formas de pagamento</dt><dd>${CONFIG.pagamentos.map(p => p.nome).join(", ")}</dd></div>`;
  const tel = $("rodape-tel");
  tel.textContent = CONFIG.telefone;
  tel.href = `https://wa.me/${CONFIG.whatsapp}`;
}

/* ---------- Início ---------- */
$("preco-topo").textContent = moeda(CONFIG.preco);
montarSabores();
montarRegioes();
montarPagamentos();
montarInfos();
atualizar();
atualizarStatus();
setInterval(atualizarStatus, 60000);
