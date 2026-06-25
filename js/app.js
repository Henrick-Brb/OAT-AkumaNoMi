import Router from './router.js';
import { homeView } from './views/homeView.js';
import { produtosView } from './views/produtosView.js';
import { sobreView } from './views/sobreView.js';
import { contatoView } from './views/contatoView.js';
import { adminView } from './views/adminView.js';
import { homeController } from './controllers/homeController.js';
import { produtosController } from './controllers/produtosController.js';
import { authController } from './controllers/authController.js';
import { adminController } from './controllers/adminController.js';

new Router({
    '/': { view: homeView, controller: homeController },
    '/produtos': { view: produtosView, controller: produtosController },
    '/sobre': { view: sobreView },
    '/contato': { view: contatoView },
    '/admin': { view: adminView, controller: authController },
    '/admin/panel': { view: adminView, controller: adminController }  // será redirecionado após login
});