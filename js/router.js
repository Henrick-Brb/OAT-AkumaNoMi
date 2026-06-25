export default class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('hashchange', () => this.resolve());
        window.addEventListener('load', () => this.resolve());
    }
    resolve() {
        const hash = location.hash.slice(1) || '/';
        const route = this.routes[hash] || this.routes['/'];
        document.getElementById('app').innerHTML = route.view();
        if (route.controller) route.controller();
    }
}