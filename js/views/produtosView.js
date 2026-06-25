export function produtosView() {
  return `
        <section class="produtos-container">
            <h2>Todas as Frutas</h2>

            <div class="busca-container">
                <input 
                    type="text" 
                    id="busca" 
                    placeholder="🔍 Buscar por nome..."
                    class="input-busca"
                >
            </div>

            <div id="lista-frutas" class="card-grid">
                Carregando...
            </div>
        </section>
    `;
}