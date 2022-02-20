export default function PageNotFound() {
    const pageNotFound = document.createElement('div');
    pageNotFound.classList.add('screen');
    pageNotFound.textContent = "Странца не найдена"
    return pageNotFound;
}