// render default random background color
renderColor(randomHEXColorGenerator);

//HEX genreator

function randomHEXColorGenerator() {
    const colorIndex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", 'c', "d", "e", "f"];

    let randomHEX = '#';
    let counter = 0;

    for (let i = 0; counter < 6; i++) {
        counter++;
        const randomIndex = Math.floor(Math.random() * 16);
        randomHEX = randomHEX + colorIndex[randomIndex];
    }

    return randomHEX;

}

//RGB genreator

function randomRGBColorGenerator() {

    let randomRGB = [];
    let counter = 0;

    for (let i = 0; counter < 3; i++) {
        counter++;
        const randomNumber = Math.round(Math.random() * 254);
        ;
        // randomRGB += randomNumber + ", ";
        randomRGB.push(randomNumber.toString());
    }
    randomRGB = `rgb(${randomRGB[0]}, ${randomRGB[1]}, ${randomRGB[2]})`;
    console.log(randomRGB);
    return randomRGB;

}

// HSL generator
function randomHSLColorGenerator() {
    // hsl(0, 100%, 50%)
    const randomNumberHue = Math.round(Math.random() * 359);
    const randomNumberSaturation = Math.round(Math.random() * 99);
    const randomNumberLightness = Math.round(Math.random() * 99);

    const randomHSL = `hsl(${randomNumberHue}, ${randomNumberSaturation}%, ${randomNumberLightness}%)`;
    console.log(randomHSL);
    return randomHSL;

}


//render color DOM

function renderColor(cb) {
    if (typeof cb == "function") {
        const color = cb();
        const colorDisplayer = document.getElementById('color-displayer');
        const colorTextDisplayer = document.getElementById('random-color-text');
        colorDisplayer.style.backgroundColor = color;
        // colorTextDisplayer.style.color = color;
        colorTextDisplayer.textContent = color;

    }
    else { throw new Error("Argument is not a function"); }
}

//color value btn 

//select color value
let randomGeneratorFunctionValue = "";

const colorValueBtn = document.querySelectorAll('[data-color]');
colorValueBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const colorValue = e.currentTarget.getAttribute('data-color');
        randomGeneratorFunctionValue = colorValue;
        // btn selection effect
        colorValueBtn.forEach(btn => {
            btn.classList.remove('btn-selected');
        });
        e.currentTarget.classList.add('btn-selected');
    });

});

// add random generator to btn 
const randomGeneratorBtn = document.querySelector('.random-generator-btn');

randomGeneratorBtn.addEventListener("click", () => {
    const functions = {
        hex: randomHEXColorGenerator,
        rgb: randomRGBColorGenerator,
        hsl: randomHSLColorGenerator,
    };

    renderColor(functions[randomGeneratorFunctionValue] || randomHEXColorGenerator);

});


//clipboard copy
const copyTextBtn = document.querySelector('#copy-clipboard-icon');
copyTextBtn.addEventListener('click', () => {
    if (navigator.clipboard) {
        const copyTextarea = document.querySelector('#random-color-text').textContent;

        navigator.clipboard.writeText(copyTextarea).then(function (re) { console.log("copied to clipboard"); }, function (err) { console.log('error'); });
    } else {
        console.log("Browser do not support Clipboard API");
    }
});

