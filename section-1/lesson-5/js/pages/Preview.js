export default function Preview() {
  const screen = document.createElement("div");
  screen.classList.add("screen", "preview");

  screen.innerHTML = `
        <div class="circle"></div>
        <div class="title">NOTES MOTICH</div>
        <div class="boy"></div>
        <div class="girl"></div>
        <div class="btn-container">
            <a href="#dashboard">
                <button class="btn full-width white">Поехали</button>
            </a>
        </div>`;
    
    // const btn = screen.querySelector('.btn');

    // btn.addEventListener('click', () => {
    //     location.hash = 'dashboard';
    // });

    return screen;
}