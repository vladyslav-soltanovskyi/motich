import Dashboard from "./pages/Dashboard.js";
import Preview from "./pages/Preview.js";
import PageNotFound from "./pages/PageNotFound.js";

export const routes = [
    {
        path: '',
        component: Preview(),
        title: "Страница превью"
    },
    {
        path: "#dashboard",
        component: Dashboard(),
        title: "Главная страница"
    },
    {
        path: "*",
        component: PageNotFound(),
        title: "Странца не найдена"
    }
]