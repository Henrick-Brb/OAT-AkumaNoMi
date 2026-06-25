import { listarFrutas } from '../models/frutaModel.js';

export async function homeController() {
    try {
        const frutas = await listarFrutas();
        const grid = document.getElementById('destaques');
        const destaques = frutas.slice(0, 3);
        grid.innerHTML = destaques.map(f => cardFruta(f)).join('');
    } catch (e) {
        document.getElementById('destaques').innerHTML = '<p>Erro ao carregar.</p>';
    }
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