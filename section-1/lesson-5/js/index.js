import { routes } from "./routes.js";
import { show } from "./utils/animation.js";

window.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector('.app');
    let currentRoute;
    window.addEventListener('hashchange', renderPage)

    function renderPage() {
        let { hash } = window.location;
        const { component, title } = routes.find(route => hash === route.path || route.path === "*" );
        document.title = title;
        currentRoute?.remove();
        app.appendChild(component);
        show({
            box: component,
            enter_active: 'enter-active-component',
            enter: 'enter-component'
        });
        currentRoute = component;
    }
    renderPage();
});
