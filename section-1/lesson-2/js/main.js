function Season(timeOfYear = "Зима") {
    this.year = (new Date()).getFullYear();
    this.months = 12;
    this.timeOfYear = timeOfYear;
}

Season.prototype.showPeriod = function() {
    new Modal({
        message: `${this.timeOfYear} - прекрасное время года!`
    });
}

let season = new Season();


season.showPeriod();
season.showPeriod();
season.showPeriod();
season.showPeriod();