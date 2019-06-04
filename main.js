// Declaring variables
const main = document.querySelector('.main');
const mainLoader = document.querySelector('.main-loader');
// Defining colors
const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

// Setting a position for any element based on the main block
const getRandomPosition = (element) => {
    const randomX = Math.random() * (main.offsetHeight - element.clientHeight);
    const randomY = Math.random() * (main.offsetWidth - element.clientWidth);
    return [randomX, randomY];
}

// Setting a color
const setColor = () => {
    return colors[Math.floor(Math.random() * 8) + 1];
}

// Setting a position and a background color 
// for the first loader at loading time
window.onload = () => {
    // position
    const xy = getRandomPosition(mainLoader);
    mainLoader.style.top = xy[0] + 'px';
    mainLoader.style.left = xy[1] + 'px';

    // background color
    mainLoader.style.backgroundColor = setColor();

    // adding loader class
    mainLoader.classList.add('loader');

}

// Click event on any square
const triggerSquareSplitting = (element) => {
    element.addEventListener('click', () => {
        createNewChildSquare(element);
        if(crazyModeOn){
            // resetting the crazy mode
            intervalOn = false;
            clearInterval(interval);
            toggleInterval();
        }
        // removing the selected element from the DOM
        main.removeChild(element);
    })
}

// Trigger the square splitting
mainLoader.click = triggerSquareSplitting(mainLoader);

// creating the new loaders
let miniLoadersCreated;
let mainLoaderHidden = false;
const createNewChildSquare = (element) => {
    const parentWidth = element.getBoundingClientRect().width;
    // creating 4 new squares
    const squareNumber = 4;
    let miniLoaders = [];
    for (i = 0; i < squareNumber; i++) {
        // creating the new square
        miniLoaders[i] = document.createElement('div');
        //adding styles
        miniLoaders[i].style.position = 'absolute';
        miniLoaders[i].style.width = (parentWidth / 4) + 'px';
        miniLoaders[i].style.height = (parentWidth / 4) + 'px';
        miniLoaders[i].style.backgroundColor = setColor();
        miniLoaders[i].style.transition = '.4s';
        // adding class
        miniLoaders[i].classList.add('loader');
        // adding the element to the DOM
        main.appendChild(miniLoaders[i]);
        // setting a click listener to the element
        miniLoaders[i].addEventListener('click', triggerSquareSplitting(miniLoaders[i]))
    }
    // setting a rambom position to each new square
    miniLoaders.map(miniLoader => {
        const xy = getRandomPosition(miniLoader);
        miniLoader.style.top = xy[0] + 'px';
        miniLoader.style.left = xy[1] + 'px';
    })

    miniLoadersCreated = true;
    mainLoaderHidden = true;
}

// Crazy mode
let intervalOn = false;
let crazyModeOn = false;
let interval;
function crazyMode(element) {
    const xy = getRandomPosition(element);
    element.style.top = xy[0] + 'px';
    element.style.left = xy[1] + 'px';
}

// Toggling the crazy mode
function toggleInterval() {
    let loaderList = document.querySelectorAll('.loader');
    if (!intervalOn) {
        interval = setInterval(() => {
            if (!mainLoaderHidden) {
                crazyMode(mainLoader);
            } else if (miniLoadersCreated) {
                loaderList.forEach(loader => {
                    crazyMode(loader)
                })
            }
        }, 2000);
        crazyModeOn = true;
    } else {
        if (!mainLoaderHidden) {
            clearInterval(interval)
        } else if (miniLoadersCreated) {
            clearInterval(interval)
        }
        crazyModeOn = false;
    }

    intervalOn = !intervalOn;
}

// Firing the toggle on crazy mode
main.ondblclick = toggleInterval;
