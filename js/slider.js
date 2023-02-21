'use strict';
/*
    Слайдер из функционала
*/

const leftArrow = document.querySelector('.js-left-arrow'),
    rightArrow = document.querySelector('.js-right-arrow'),
    iconsRow = document.querySelector('.js-icons-row'),
    iconCount = iconsRow.children.length;



const iconMargin = parseInt(window.getComputedStyle(iconsRow.querySelector('.f-icon')).marginRight);
const iconSize = iconsRow.querySelector('.f-icon').offsetWidth;

const shiftStep = iconSize + iconMargin;

let currentIconNumber = 0

let rowShift = 0;



leftArrow.addEventListener('click', event => {
    event.preventDefault();
    rowShift -= shiftStep;
    currentIconNumber++;
    if (currentIconNumber > iconCount - Math.round(iconsRow.offsetWidth / shiftStep)) {
        rowShift = 0;
        currentIconNumber = 0;
    }

    console.log(currentIconNumber)
    iconsRow.style.left = rowShift + 'px';
});

rightArrow.addEventListener('click', event => {
    event.preventDefault();
    rowShift += shiftStep;
    currentIconNumber--;
    if (currentIconNumber < 0) {
        rowShift = 0;
        currentIconNumber = 0;
    }
    console.log(rowShift)
    iconsRow.style.left = rowShift + 'px';
});


/*
    Конец слайдера
*/

/*
    Слайдер в интро
*/

const slider = document.querySelector('.js-slider');

const
    sliderImage = slider.querySelector('.image'),
    sliderItems = slider.querySelectorAll('.js-item'),
    time = 5000;
let
    progressWidth = 0,
    selectedElement = getSelectedElement().element,
    selectedIndex = getSelectedElement().i,
    progressBar = selectedElement.querySelector('.progress-bar');

const intervalId = setInterval(() => {
    if(progressWidth>100){
        progressWidth=0;
        progressBar.style.width='0px';

        switchItem(selectedElement,selectedIndex);

        selectedElement = getSelectedElement().element;
        selectedIndex = getSelectedElement().i;
        progressBar = selectedElement.querySelector('.progress-bar');
    }else{
        progressWidth++;
        progressBar.style.width=progressWidth+'%';
    }
}, time / 100);

sliderItems.forEach(item=>{
    item.addEventListener('click',event=>{
        clearInterval(intervalId);
        const el = getSelectedElement().element;

        el.classList.remove('js-selected');
        el.querySelector('.progress-bar').style.width='0px';

        item.classList.add('js-selected');
        sliderImage.style.backgroundImage = 'url(img/intro/'+item.dataset.img+')';
    })
})


function getSelectedElement() {
    let element,
        i,
        j = 0;

    sliderItems.forEach(item => {
        if (item.classList.contains('js-selected')) {
            element = item;
            i = j;
        }
        j++;
    });

    return {
        element,
        i
    };
}

function switchItem(element, i) {
    element.classList.remove('js-selected');
    let newElement;
    if (i != sliderItems.length - 1) {
        newElement = sliderItems[i + 1];
    } else {
        newElement = sliderItems[0];
    }
    newElement.classList.add('js-selected');
    let img = newElement.dataset.img;
    sliderImage.style.backgroundImage = 'url(img/intro/'+img+')';
}






