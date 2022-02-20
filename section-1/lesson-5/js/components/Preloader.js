export default function Preloader() {
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML = '<div class="lds-dual-ring"></div>';
    return preloader;
}