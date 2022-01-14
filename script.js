const displayed = document.querySelector("p");
const buttons = document.querySelectorAll("button");
let equation = [];
let newEquation = "";
let solutionPart ="";

function updateScroll() {
    displayed.scrollLeft = displayed.scrollWidth;
};

const add = function(a, b) {
    return parseFloat(a) + parseFloat(b);
};

const subtract = function(a, b) {
    return a - b;
};

const divide = function(a, b) {
    if (parseFloat(b) === 0) {
        return "Don't you dare.";
    } else {
    return a / b;
    };
};

const multiply = function(a, b) {
    return a * b;
};

const solve = function(equation) {
    let arrayedEquation = equation.split(" ")
    if (((arrayedEquation.length % 2) !== 0)) {
        for (i=1; (arrayedEquation.length - i) > 1; i+2) {
            if (arrayedEquation[1] === "+") {
                solutionPart = add(arrayedEquation[0], arrayedEquation[2]);
                arrayedEquation.splice(0,3,solutionPart);
            } else if (arrayedEquation[1] === "-") {
                solutionPart = subtract(arrayedEquation[0], arrayedEquation[2]);
                arrayedEquation.splice(0,3,solutionPart);   
            } else if (arrayedEquation[1] === "÷") {
                solutionPart = divide(arrayedEquation[0], arrayedEquation[2]);
                arrayedEquation.splice(0,3,solutionPart);
            } else if (arrayedEquation[1] === "×") {
                solutionPart = multiply(arrayedEquation[0], arrayedEquation[2]);
                arrayedEquation.splice(0,3,solutionPart);
            }; 
        };
        return arrayedEquation[0];
    }
    return equation 
};

buttons.forEach(function(e) {
    if ((e.getAttribute("class") === "number") | (e.getAttribute("class") === "operator")) {
        e.addEventListener('click', () => {
        equation.push(e.getAttribute("id"));
        let newEquation = equation.join("");
        displayed.textContent = newEquation;
        updateScroll();
        
    });
    } else if (e.getAttribute("class") === "solve") {
        e.addEventListener('click', () => {
            newEquation = displayed.textContent;
            displayed.textContent = solve(newEquation)
            equation = [displayed.textContent];
        });
    } else if (e.getAttribute("class") === "clear") {
        e.addEventListener('click', () => {
        equation = [];
        newEquation = "";
        displayed.textContent = newEquation;
        });
    } else if (e.getAttribute("class") === "backspace") {
        e.addEventListener('click', () => {
            if (equation[0] !== undefined) {
                equation = displayed.textContent.split("");
                equation.splice(-1);
                newEquation = equation.join("");
                displayed.textContent = newEquation;
            } else return;

        })
    } else if (e.getAttribute("class") === ".") {
        e.addEventListener('click', () => {
            equation.push(e.getAttribute("id"));
            let newEquation = equation.join("");
            displayed.textContent = newEquation;
        })
    }
});