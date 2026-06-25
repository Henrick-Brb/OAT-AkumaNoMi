import { getSession, login, cadastrar, logout } from '../models/authModel.js';

export async function authController() {
    const session = await getSession();
    const container = document.getElementById('admin-container');
    if (session) {
        location.hash = '/admin/panel';
        return;
    }

    container.innerHTML = `
    <div class="admin-box">
      <h2>Acesso Admin</h2>
      <div class="form-group"><label>E-mail</label><input id="email" type="email"></div>
      <div class="form-group"><label>Senha</label><input id="senha" type="password"></div>
      <button id="btn-login" class="btn btn-primary">Entrar</button>
      <button id="btn-cadastrar" class="btn" style="margin-left:1rem;">Cadastrar</button>
      <p id="msg-erro" style="color:red; margin-top:1rem;"></p>
    </div>
  `;

    document.getElementById('btn-login').onclick = async () => {
        try {
            await login(document.getElementById('email').value, document.getElementById('senha').value);
            location.hash = '/admin/panel';
        } catch (err) {
            document.getElementById('msg-erro').textContent = 'Erro: ' + err.message;
        }
    };

    document.getElementById('btn-cadastrar').onclick = async () => {
        try {
            await cadastrar(document.getElementById('email').value, document.getElementById('senha').value);
            alert('Cadastro realizado! Faça login.');
        } catch (err) {
            document.getElementById('msg-erro').textContent = 'Erro: ' + err.message;
        }
    };
}