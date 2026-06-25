import { getSession, logout } from '../models/authModel.js';
import { listarFrutas, salvarFruta, excluirFruta } from '../models/frutaModel.js';

let frutaEditando = null;

export async function adminController() {
    const session = await getSession();
    if (!session) {
        location.hash = '/admin';
        return;
    }

    const container = document.getElementById('admin-container');
    container.innerHTML = `
        <h2>Painel Administrativo</h2>
        <button id="btn-logout" class="btn btn-danger" style="float:right;">Sair</button>
        <button id="btn-novo" class="btn btn-primary">+ Nova Fruta</button>
        <table id="tabela-frutas">
            <thead><tr><th>Nome</th><th>Tipo</th><th>Preço</th><th>Ações</th></tr></thead>
            <tbody></tbody>
        </table>
        <div id="form-edicao" style="display:none; margin-top:1rem; background:#112d42; padding:1rem; border-radius:12px;">
            <h3 id="form-titulo">Nova Fruta</h3>
            <div class="form-group"><label>Nome</label><input id="fruta-nome"></div>
            <div class="form-group"><label>Tipo</label><select id="fruta-tipo"><option>Paramecia</option><option>Zoan</option><option>Logia</option></select></div>
            <div class="form-group"><label>Descrição</label><textarea id="fruta-desc"></textarea></div>
            <div class="form-group"><label>Preço (Berries)</label><input id="fruta-preco" type="number"></div>
            <div class="form-group"><label>URL da Imagem</label><input id="fruta-img"></div>
            <button id="btn-salvar" class="btn btn-primary">Salvar</button>
            <button id="btn-cancelar" class="btn">Cancelar</button>
        </div>
     `;

    document.getElementById('btn-logout').onclick = async () => {
        await logout();
        location.hash = '/admin';
    };

    await carregarTabela();

    document.getElementById('btn-novo').onclick = () => abrirFormulario();
    document.getElementById('btn-cancelar').onclick = () => {
        document.getElementById('form-edicao').style.display = 'none';
    };
    document.getElementById('btn-salvar').onclick = salvar;
}

async function carregarTabela() {
    const frutas = await listarFrutas();
    const tbody = document.querySelector('#tabela-frutas tbody');
    tbody.innerHTML = frutas.map(f => `
    <tr>
      <td>${f.nome}</td><td>${f.tipo}</td><td>${f.preco_berries}</td>
      <td>
        <button class="btn editar" data-id="${f.id}">Editar</button>
        <button class="btn btn-danger excluir" data-id="${f.id}">Excluir</button>
      </td>
    </tr>
  `).join('');

    document.querySelectorAll('.editar').forEach(b => b.onclick = () => abrirFormulario(b.dataset.id));
    document.querySelectorAll('.excluir').forEach(b => b.onclick = () => {
        if (confirm('Excluir fruta?')) {
            excluirFruta(b.dataset.id).then(carregarTabela);
        }
    });
}

async function abrirFormulario(id = null) {
    const form = document.getElementById('form-edicao');
    form.style.display = 'block';
    if (id) {
        const frutas = await listarFrutas();
        const fruta = frutas.find(f => f.id == id);
        if (!fruta) return;
        frutaEditando = fruta.id;
        document.getElementById('form-titulo').textContent = 'Editar Fruta';
        document.getElementById('fruta-nome').value = fruta.nome;
        document.getElementById('fruta-tipo').value = fruta.tipo;
        document.getElementById('fruta-desc').value = fruta.descricao || '';
        document.getElementById('fruta-preco').value = fruta.preco_berries;
        document.getElementById('fruta-img').value = fruta.imagem || '';
    } else {
        frutaEditando = null;
        document.getElementById('form-titulo').textContent = 'Nova Fruta';
        ['fruta-nome', 'fruta-desc', 'fruta-preco', 'fruta-img'].forEach(id => document.getElementById(id).value = '');
    }
}

async function salvar() {
    const dados = {
        nome: document.getElementById('fruta-nome').value,
        tipo: document.getElementById('fruta-tipo').value,
        descricao: document.getElementById('fruta-desc').value,
        preco_berries: parseInt(document.getElementById('fruta-preco').value) || 0,
        imagem: document.getElementById('fruta-img').value
    };
    await salvarFruta(dados, frutaEditando);
    document.getElementById('form-edicao').style.display = 'none';
    carregarTabela();
}