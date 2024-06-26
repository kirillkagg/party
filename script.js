function addOption() {
    const container = document.getElementById('optionsContainer');
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';

    optionDiv.innerHTML = `
        <input type="text" class="componentName" placeholder="Название">
        <input type="number" class="componentPercentage" placeholder="%" min="0" max="100">
        <button class="removeOption" onclick="removeOption(this)">Удалить</button>
    `;

    container.appendChild(optionDiv);
}

function removeOption(button) {
    const optionDiv = button.parentElement;
    optionDiv.remove();
}

function calculate() {
    const vodkaVolume = document.getElementById('vodkaVolumeInput').value;
    if (vodkaVolume <= 0) {
        alert('Введите корректное количество водки!');
        return;
    }

    const options = document.getElementsByClassName('option');
    const percentages = [];
    let totalPercentage = 0;

    for (let option of options) {
        const percentage = option.getElementsByClassName('componentPercentage')[0].value;
        if (percentage <= 0 || percentage > 100) {
            alert('Введите корректные проценты!');
            return;
        }
        percentages.push(percentage);
        totalPercentage += parseFloat(percentage);
    }

    if (totalPercentage != 70) {
        alert('Сумма процентов других компонентов должна быть равна 70!');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const vodkaPercentage = 30;
    const totalVolume = vodkaVolume / (vodkaPercentage / 100);

    const vodkaResult = document.createElement('p');
    vodkaResult.innerText = `Водка: ${vodkaVolume} мл (${vodkaPercentage}%)`;

    resultDiv.appendChild(vodkaResult);

    for (let i = 0; i < options.length; i++) {
        const componentName = options[i].getElementsByClassName('componentName')[0].value || 'Компонент';
        const percentage = percentages[i];
        const componentVolume = (totalVolume * percentage) / 100;

        const componentResult = document.createElement('p');
        componentResult.innerText = `${componentName}: ${componentVolume.toFixed(2)} мл (${percentage}%)`;

        resultDiv.appendChild(componentResult);
    }

    const totalVolumeResult = document.createElement('p');
    totalVolumeResult.innerText = `Общий объем: ${totalVolume.toFixed(2)} мл`;

    resultDiv.appendChild(totalVolumeResult);
}
