// import "../style/flaticon.css"

window.toggleMenu = function (e) {
  e.preventDefault();
  let nav = document.querySelector('.__menu');
  let bars = document.querySelector('.hamburger');
  let close = document.querySelector('.close');

  if(nav.style.display === "") {
    nav.style.display = "block";
    bars.style.display = "none";
    close.style.display = "block";
  } else {
    nav.style.display = "";
    bars.style.display = "block";
    close.style.display = "none";
  }
}

window.stickNavbar = function() {
  let navbar = document.getElementById("navbar");
  let sticky = navbar.offsetTop;

  if (window.pageYOffset > sticky) {
  navbar.classList.add("sticky");
  navbar.classList.remove("__col-offset-2");
  } else {
  navbar.classList.remove("sticky");
  }
};

let menu = document.querySelector('.hamburger');
menu.addEventListener('click', toggleMenu);

let close = document.querySelector('.close');
close.addEventListener('click', toggleMenu);

let menufilter = document.querySelectorAll('.hamburger')[0];
let imgfilter = document.querySelectorAll('.hamburger')[1];

menufilter.addEventListener('click', menufilter);
menufilter.addEventListener('click', imgfilter);

window.addEventListener('scroll',stickNavbar);
window.addEventListener('load',showSlides);

let carousel = document.querySelector('#carousel-control');
let slideIndex = 1;

window.currentSlide = function(e)  {
  let dotNav = carousel.querySelectorAll('li');

  for(let i=0; i<dotNav.length; i++) {
    if(e.target === dotNav[i]) {
      showSlides(slideIndex = i+1);
      break;
    }
  }
}

carousel.addEventListener('click', currentSlide);

function showSlides(n) {
  let i;
  let slideParent = document.getElementById('reviewParent')
  let slides = slideParent.getElementsByClassName("mySlides");
  let dots = slideParent.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
