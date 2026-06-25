import { listarFrutas } from '../models/frutaModel.js';

export async function produtosController() {
    const frutas = await listarFrutas();
    const inputBusca = document.getElementById('busca');
    const container = document.getElementById('lista-frutas');

    function render(busca = '') {
        const filtradas = busca ? frutas.filter(f => f.nome.toLowerCase().includes(busca.toLowerCase())) : frutas;
        container.innerHTML = filtradas.map(f => cardFruta(f)).join('');
    }

    inputBusca.addEventListener('input', e => render(e.target.value));
    render();
}

function cardFruta(f) {
    return `
    <div class="card">
      <img src="${f.imagem || 'https://via.placeholder.com/300x150?text=Akuma+no+Mi'}" alt="${f.nome}">
      <div class="info">
        <h3>${f.nome}</h3>
        <p class="tipo">${f.tipo}</p>
        <p class="preco">💲 ${f.preco_berries} Berries</p>
      </div>
    </div>`;
}