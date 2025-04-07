const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === "C") {
            display.value = "";
        } else if (button.innerText === "←") {
            display.value = display.value.slice(0, -1);
        } else if (button.innerText === "=") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        } else {
            display.value += button.innerText;
        }
    });
});
