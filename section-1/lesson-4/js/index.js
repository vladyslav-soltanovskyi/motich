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

    yellow(e) {
        const container = e.currentTarget;
        const text = container.children[1].textContent;
        container.lastElementChild.textContent = text;
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

    blue(e) {
        const container = e.currentTarget;
        container.firstElementChild.hidden = true;
    }

    purple(e) {
        const container = e.currentTarget;
        const firstElement = container.firstElementChild; 
        
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
