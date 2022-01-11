let totalArea = 0;
let i = 1;

while(i <= 2) {
    let width = +prompt(`Введите ширину ${i} комнаты в метрах`);
    let length = +prompt(`Введите длину ${i} комнаты в метрах`);

    if (isNaN(width) || isNaN(length) || width <= 0 || length <= 0) {
        alert('Можно вводить только лишь положительные цифры. Введите заново даные заново');
        continue;
    }

    totalArea += (width * length);
    i++;
}

alert(`Общая площадь 2 комнат: ${totalArea}м^2`)