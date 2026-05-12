const cfg = document.body.dataset;
let formatoAtivo = 'feed';

const art = cfg.art || '';
const niche = cfg.niche || 'arte promocional';
const preview = cfg.preview || 'preview.jpg';
const downloadName = cfg.download || `${art}-referencia.jpg`;

function esc(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function val(id) {
  const el = document.getElementById(id);
  const value = el ? el.value.trim() : '';
  return value || 'não informado';
}

document.body.innerHTML = `
  <div id="loader"><div class="loader-card"><div class="loader-dot"></div></div></div>

  <div class="topbar">
    <a class="btn-back" href="../">← Voltar</a>
    <div class="badge">⭐ ARTE FÁCIL PRO DELIVERY</div>
  </div>

  <div class="content">
    <h1>Arte #${esc(art)} — ${esc(niche)}</h1>
    <p class="sub">Preencha somente os dados básicos. O visual será mantido conforme a imagem de referência.</p>

    <img class="arte" src="${esc(preview)}" alt="Arte ${esc(art)}">

    <button class="btn-download" onclick="baixarImagem()">⬇️ Baixar imagem de referência</button>

    <div class="divider"></div>

    <div class="section-title">📐 Formato da arte</div>
    <div class="formato-row">
      <div class="formato-btn active" id="fmt-feed" onclick="selecionarFormato('feed')">
        <strong>Feed</strong>1080 × 1440
      </div>
      <div class="formato-btn" id="fmt-story" onclick="selecionarFormato('story')">
        <strong>Story</strong>1080 × 1920
      </div>
    </div>

    <div class="divider"></div>

    <div class="section-title">📝 Dados básicos</div>

    <label>Nome do estabelecimento</label>
    <input id="marca" placeholder="Ex: Nome da loja">

    <label>Título principal</label>
    <input id="titulo" placeholder="Ex: Combo especial">

    <label>Oferta</label>
    <input id="oferta" placeholder="Ex: Promoção do dia / Leve 2, pague 1">

    <label>Preço</label>
    <input id="preco" placeholder="Ex: R$ 29,90">

    <label>WhatsApp</label>
    <input id="whats" placeholder="Ex: (11) 99999-9999">

    <label>Instagram ou endereço</label>
    <input id="contato" placeholder="Ex: @sualoja ou Rua Exemplo, 123">

    <label>Logomarca</label>
    <select id="logo">
      <option>Vou enviar minha logomarca</option>
      <option>Criar uma logomarca simples</option>
      <option>Não usar logomarca</option>
    </select>

    <label>Foto do produto</label>
    <select id="produto">
      <option>Usar a imagem da referência</option>
      <option>Vou enviar foto do produto</option>
      <option>Gerar produto parecido com a referência</option>
    </select>

    <label>Outras informações</label>
    <textarea id="info" placeholder="Use somente se precisar incluir algo extra. Ex: entrega grátis, horário, bairro, forma de pagamento."></textarea>

    <button class="btn-gerar" onclick="confirmar()">⚡ GERAR PROMPT</button>

    <div class="result-box" id="confirmacao">
      <div class="section-title">✅ Confirme</div>
      <div class="confirm-box" id="resumo"></div>
      <div class="btn-row">
        <button class="btn-voltar2" onclick="voltar()">Editar</button>
        <button class="btn-confirmar" onclick="gerar()">Confirmar</button>
      </div>
    </div>

    <div class="result-box" id="result">
      <div class="section-title">📋 Prompt personalizado</div>
      <textarea class="prompt-area" id="prompt-output" readonly></textarea>
      <button class="btn-copiar" id="btn-copy" onclick="copiar()">📋 Copiar Prompt</button>
      <button class="btn-download" onclick="baixarImagem()" style="margin-top:10px">⬇️ Baixar imagem de referência</button>

      <div class="section-title" style="margin-top:20px">🔗 Abra o gerador e cole o prompt:</div>
      <div class="links">
        <a class="link-btn" target="_blank" href="https://chat.openai.com/">🤖 ChatGPT</a>
        <a class="link-btn" target="_blank" href="https://gemini.google.com/">🧠 Gemini</a>
      </div>
    </div>

    <div class="step-by-step">
      <h2>Como usar</h2>
      <ol>
        <li>Preencha os dados básicos.</li>
        <li>Gere o prompt.</li>
        <li>Copie o prompt e baixe a imagem.</li>
        <li>Abra ChatGPT ou Gemini.</li>
        <li>Envie imagem + prompt.</li>
      </ol>
    </div>

    <div class="footer">
      🎨 Arte Fácil Pro Delivery<br>
      <a href="https://instagram.com/artefacilpro" target="_blank">@artefacilpro</a>
    </div>
  </div>
`;

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 450);
});

window.selecionarFormato = function selecionarFormato(formato) {
  formatoAtivo = formato;
  document.querySelectorAll('.formato-btn').forEach((el) => el.classList.remove('active'));
  const selected = document.getElementById(`fmt-${formato}`);
  if (selected) selected.classList.add('active');
};

window.baixarImagem = function baixarImagem() {
  const link = document.createElement('a');
  link.href = preview;
  link.download = downloadName;
  link.click();
};

window.confirmar = function confirmar() {
  const resumo = [
    `<span>Estabelecimento:</span> ${esc(val('marca'))}`,
    `<span>Título principal:</span> ${esc(val('titulo'))}`,
    `<span>Oferta:</span> ${esc(val('oferta'))}`,
    `<span>Preço:</span> ${esc(val('preco'))}`,
    `<span>WhatsApp:</span> ${esc(val('whats'))}`,
    `<span>Instagram/Endereço:</span> ${esc(val('contato'))}`,
    `<span>Logomarca:</span> ${esc(val('logo'))}`,
    `<span>Produto:</span> ${esc(val('produto'))}`
  ].join('<br>');

  document.getElementById('resumo').innerHTML = resumo;
  document.getElementById('confirmacao').style.display = 'block';
};

window.voltar = function voltar() {
  document.getElementById('confirmacao').style.display = 'none';
};

window.gerar = function gerar() {
  const dimensao = formatoAtivo === 'feed' ? '1080x1440' : '1080x1920';

  const prompt = [
    'Use a imagem de referência como base principal.',
    '',
    `Crie uma arte profissional para ${niche} no formato ${dimensao}, mantendo fielmente o mesmo estilo visual da referência: composição, enquadramento, cores, iluminação, textura, hierarquia dos textos, tipografia, disposição dos blocos, elementos gráficos e clima geral da peça.`,
    '',
    'Substitua somente as informações editáveis pelos dados abaixo:',
    `Nome do estabelecimento: ${val('marca')}.`,
    `Título principal: ${val('titulo')}.`,
    `Oferta: ${val('oferta')}.`,
    `Preço: ${val('preco')}.`,
    `WhatsApp: ${val('whats')}.`,
    `Instagram ou endereço: ${val('contato')}.`,
    `Logomarca: ${val('logo')}. Se o cliente enviar a logomarca, use a logomarca enviada sem inventar outra. Se escolher criar, crie uma marca simples, profissional e coerente com o nome informado.`,
    `Foto do produto: ${val('produto')}. Se o cliente enviar foto do produto, use a foto enviada como referência principal do produto. Se não enviar, mantenha ou gere um produto natural e coerente com a referência.`,
    `Outras informações: ${val('info')}.`,
    '',
    'Não solicite textos extras e não invente informações. Se algum dado não for informado, mantenha o espaço discreto ou adapte sem poluir a arte.',
    '',
    'Mantenha aparência de flyer profissional, natural, moderna e comercial. Preserve boa margem de segurança nas laterais, espaçamento equilibrado entre blocos, leitura clara e visual sem poluição. Não usar padrões artificiais de IA, não exagerar em filtros e não alterar o estilo principal da imagem de referência.',
    '',
    'Antes de gerar, revise ortografia, ajuste telefone/WhatsApp para formato legível, confirme os dados com o cliente e pergunte se deseja alguma alteração. Depois mantenha o padrão visual da referência e não invente informações não fornecidas.'
  ].join('\n');

  document.getElementById('prompt-output').value = prompt;
  document.getElementById('result').style.display = 'block';
  document.getElementById('confirmacao').style.display = 'none';
};

window.copiar = function copiar() {
  const textarea = document.getElementById('prompt-output');
  textarea.select();
  document.execCommand('copy');

  const button = document.getElementById('btn-copy');
  button.innerText = '✅ Copiado';
  setTimeout(() => {
    button.innerText = '📋 Copiar Prompt';
  }, 1500);
};
