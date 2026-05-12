const d=document.body.dataset;let formato='feed';
const art=d.art||'',niche=d.niche||'arte promocional',preview=d.preview||'preview.jpg',download=d.download||(art+'-referencia.jpg');
function V(id){const e=document.getElementById(id);return e&&e.value.trim()?e.value.trim():'nao informado'}
function E(s){return String(s||'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
document.body.innerHTML='<div class="topbar"><a class="btn-back" href="../">Voltar</a><div class="badge">ARTE FACIL PRO DELIVERY</div></div><div class="content"><h1>Arte #'+E(art)+' - '+E(niche)+'</h1><p class="sub">Preencha somente os dados basicos. O visual sera mantido conforme a imagem de referencia.</p><img class="arte" src="'+E(preview)+'"><button class="btn-download" onclick="baixarImagem()">Baixar imagem de referencia</button><div class="divider"></div><div class="section-title">Formato da arte</div><div class="formato-row"><div class="formato-btn active" id="fmt-feed" onclick="selecionarFormato(\'feed\')"><strong>Feed</strong>1080 x 1440</div><div class="formato-btn" id="fmt-story" onclick="selecionarFormato(\'story\')"><strong>Story</strong>1080 x 1920</div></div><div class="divider"></div><div class="section-title">Dados basicos</div><label>Nome do estabelecimento</label><input id="marca" placeholder="Ex: Nome da loja"><label>Titulo principal</label><input id="titulo" placeholder="Ex: Combo especial"><label>Oferta</label><input id="oferta" placeholder="Ex: Promocao do dia / Leve 2, pague 1"><label>Preco</label><input id="preco" placeholder="Ex: R$ 29,90"><label>WhatsApp</label><input id="whats" placeholder="Ex: (11) 99999-9999"><label>Instagram ou endereco</label><input id="contato" placeholder="Ex: @sualoja ou Rua Exemplo, 123"><label>Logomarca</label><select id="logo"><option>Vou enviar minha logomarca</option><option>Criar uma logomarca simples</option><option>Nao usar logomarca</option></select><label>Foto do produto</label><select id="produto"><option>Usar a imagem da referencia</option><option>Vou enviar foto do produto</option><option>Gerar produto parecido com a referencia</option></select><label>Outras informacoes</label><textarea id="info" placeholder="Use somente se precisar incluir algo extra."></textarea><button class="btn-gerar" onclick="gerar()">GERAR PROMPT</button><div class="result-box" id="result"><div class="section-title">Prompt personalizado</div><textarea class="prompt-area" id="prompt-output" readonly></textarea><button class="btn-copiar" id="btn-copy" onclick="copiar()">Copiar Prompt</button><button class="btn-download" onclick="baixarImagem()" style="margin-top:10px">Baixar imagem de referencia</button><div class="links"><a class="link-btn" target="_blank" href="https://chat.openai.com/">ChatGPT</a><a class="link-btn" target="_blank" href="https://gemini.google.com/">Gemini</a></div></div><div class="step-by-step"><h2>Como usar</h2><ol><li>Preencha os dados basicos.</li><li>Gere o prompt.</li><li>Copie o prompt e baixe a imagem.</li><li>Envie imagem + prompt no gerador.</li></ol></div><div class="footer">Arte Facil Pro Delivery<br><a href="https://instagram.com/artefacilpro" target="_blank">@artefacilpro</a></div></div>';
function selecionarFormato(f){formato=f;document.querySelectorAll('.formato-btn').forEach(e=>e.classList.remove('active'));document.getElementById('fmt-'+f).classList.add('active')}
function baixarImagem(){const a=document.createElement('a');a.href=preview;a.download=download;a.click()}
function gerar(){const dim=formato==='feed'?'1080x1440':'1080x1920';const p=`Use a imagem de referencia como base principal.

Crie uma arte profissional para ${niche} no formato ${dim}, mantendo fielmente o mesmo estilo visual da referencia: composicao, enquadramento, cores, iluminacao, textura, hierarquia dos textos, tipografia, disposicao dos blocos, elementos graficos e clima geral da peca.

Substitua somente as informacoes editaveis:
Nome do estabelecimento: ${V('marca')}.
Titulo principal: ${V('titulo')}.
Oferta: ${V('oferta')}.
Preco: ${V('preco')}.
WhatsApp: ${V('whats')}.
Instagram ou endereco: ${V('contato')}.
Logomarca: ${V('logo')}.
Foto do produto: ${V('produto')}.
Outras informacoes: ${V('info')}.

Nao solicite textos extras e nao invente informacoes. Se algum dado nao for informado, mantenha o espaco discreto ou adapte sem poluir a arte.

Mantenha aparencia de flyer profissional, natural, moderna e comercial. Preserve boa margem de seguranca nas laterais, espacamento equilibrado entre blocos, leitura clara e visual sem poluicao. Nao usar padroes artificiais de IA, nao exagerar em filtros e nao alterar o estilo principal da imagem de referencia.

Antes de gerar, revise ortografia, ajuste telefone/WhatsApp para formato legivel, confirme os dados com o cliente e pergunte se deseja alguma alteracao. Depois mantenha o padrao visual da referencia e nao invente informacoes nao fornecidas.`;document.getElementById('prompt-output').value=p;document.getElementById('result').style.display='block'}
function copiar(){const t=document.getElementById('prompt-output');t.select();document.execCommand('copy');const b=document.getElementById('btn-copy');b.innerText='Copiado';setTimeout(()=>b.innerText='Copiar Prompt',1500)}
