class Buttons {
    constructor(elem) {
      this._elem = elem;
      elem.addEventListener('click', this.onClick.bind(this))
    }

    red() {
        document.body.style.background = "red";
    }

    orange(e) {
        const target = e.target;
        target.previousElementSibling.style.color = "orange";
        target.nextElementSibling.style.color = "orange";
    }

    yellow() {
        const text = this._elem.children[1].textContent;
        this._elem.lastElementChild.textContent = text;
    }

    green() {
        const hiddenImage = document.querySelector('img[hidden]');
        hiddenImage.hidden = false;
    }

    skyblue(e) {
        const target = e.target;
        const cloneButton = target.cloneNode(true);
        target.after(cloneButton);
    }

    blue() {
        this._elem.firstElementChild.hidden = true;
    }

    purple() {
        const firstElement = this._elem.firstElementChild; 
        
        if(firstElement.hidden) {
            firstElement.hidden = false;
            return;
        }
        alert('Кнопка есть')
    }


    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action](event);
      }
    }
  }

  new Buttons(document.querySelector(".actions"));
