const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = document.querySelector(".card").offsetWidth;
// console.log("firstCardWidth", firstCardWidth);
const carouselChildrens = [...carousel.children];
// console.log(carouselChildrens);

let isDragging = false,
  startX,
  startScrollLeft;
//   Get the number of cards that can fit in the carousel;
let CardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// console.log("cardPerPage", CardPerView);

// Insert copy of the last few cards to the begining of the carousel for infinite scrolling
carouselChildrens
  .slice(-CardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterBegin", card.outerHTML);
  });
// Insert copy of the first few cards to the end of the carousel for infinite scrolling
carouselChildrens.slice(0, CardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn.id);
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Record the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = e.pageX;
  // Update the scrolling position of the carousel based on the cursor movement
  carousel.scroll = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
  // If carousel is at the beginning, scroll to the end;
  if (carousel.scrollLeft === 0) {
    // console.log("You've reached to the left end");
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    // console.log("You've reached to the right end");
    carousel.classList.remove("no-transition");
  }
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
