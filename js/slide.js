/* SlideShow */

const myslide = document.querySelectorAll('.myslide'),
square = document.querySelectorAll('.control span');
const myslideCliente = document.querySelectorAll('.myslideCliente'),
square2 = document.querySelectorAll('.bar-comentario span')
const slideProduto = document.querySelector('.thumbnail a')
let counter = 1;
let counter2 = 1;
slidefun(counter, counter2);


let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	counter2 += 1;
	slidefun(counter, counter2);

}
function plusSlides(n) {
	counter += n;
	counter2 += n;
	slidefun(counter, counter2);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	counter2 = n;
	slidefun(counter, counter2);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {

	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
		myslideCliente[i].style.display = "none";
	}
	for(i = 0;i<square.length;i++) {
		square[i].className = square[i].className.replace(' active', '');
		square2[i].className = square2[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   counter2 = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   counter2 = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	square[counter - 1].className += " active";
	myslideCliente[counter2 - 1].style.display = "block";
	square2[counter2 - 1].className += " active";
}

/* SLIDE PRODUTOS */

let slider = document.getElementById("slider");
let buttonRight = document.getElementById("slide-right");
let buttonLeft = document.getElementById("slide-left");

buttonLeft.addEventListener("click", () => {
	slider.scrollLeft -= 300;
});

buttonRight.addEventListener("click", () => {
	slider.scrollLeft += 300;
});