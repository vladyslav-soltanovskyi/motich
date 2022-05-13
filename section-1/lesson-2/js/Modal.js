class Modal {

    constructor({ message = '', container = '.container-messages', duration = 3000, showProgressBar = true }) {
        Object.assign(this, { message, duration, showProgressBar });
        
        this.container = document.querySelector(container);
        this.boxMessage = this.createMessage();
        this.show();
    }

    hide() {
        if (this.boxMessage === null) {
            return;
        }

        if (this.showProgressBar) {
            cancelAnimationFrame(this.timer);
            this.progressLine = null;
        }

        this.boxMessage.remove();
        this.boxMessage = null;
    }

    closeModalAfterDuration() {
        if (this.showProgressBar) {
            this.progressAnimate();
        }

        this.timeOut = setTimeout(() => {
            this.hide();
        }, this.duration);
    }

    cancelCloseModal() {
        clearTimeout(this.timeOut);
        cancelAnimationFrame(this.timer);

        if(this.showProgressBar) {
            this.progressLine.style.width = 0;
        }
    }

    show() {
        this.container.append(this.boxMessage);
        this.closeModalAfterDuration();
    }

    progressAnimate() {
        this.animate({
            duration: this.duration,
            timing(timeFraction) {
                return timeFraction;
            },
            draw: (progress) => {
	        	this.progressLine.style.width = `${progress * 100}%`;
        	}
        });
    }

    animate({timing, draw, duration}) {
        let that = this;
        let start = performance.now();
      
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            
            if (timeFraction > 1) {
                timeFraction = 1;
            }
        
            let progress = timing(timeFraction);
        
            draw(progress);
            
            if (timeFraction < 1) {
                that.timer = requestAnimationFrame(animate);
            }
      
        });
    }

    createMessage() {
        const boxMessage = document.createElement('div');
        boxMessage.classList.add('message');

        boxMessage.innerHTML = `
            <div class="message-content">
                <p>${this.message}</p>
            </div>`;

        boxMessage.addEventListener('mouseenter', () => this.cancelCloseModal());
        boxMessage.addEventListener('mouseleave', () => this.closeModalAfterDuration())
        
        const btnClose = document.createElement('div');
        btnClose.classList.add('btn-close');
        
        btnClose.addEventListener('click', () => this.hide());
        boxMessage.append(btnClose);

        if(this.showProgressBar) {
            const progress = document.createElement('div');
            progress.classList.add('progress');
            
            const progressLine = document.createElement('div');
            progressLine.classList.add('progress-line');
            this.progressLine = progressLine;
            
            progress.append(this.progressLine);

            boxMessage.append(progress);
        }

        return boxMessage;
    }
}