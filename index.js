// menu collapse
let menuBtn = document.querySelector(".menu_btn"),
  menu = document.querySelector(".header_top .nav_menu");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("close");
  menu.classList.toggle("open");
});

// slide
document.addEventListener("DOMContentLoaded", function () {
  let page = document.querySelectorAll(".dot"),
    slides = document.querySelectorAll(".slide_item"),
    slideNextBtn = document.querySelector(".next"),
    slidePrevBtn = document.querySelector(".prev"),
    pageNum = 0,
    isSlideMoving = false; // trạng thái ko chuyển động

  function handleSlideNext() {
    if (isSlideMoving == true) {
      return false;
    }
    isSlideMoving = true;

    let countAnimation = 0; // trạng thái 2 animation
    let currSlide = slides[pageNum];
    let currPage = page[pageNum];

    pageNum = pageNum < slides.length - 1 ? pageNum + 1 : 0;

    let nextSlide = slides[pageNum];

    //slide
    currSlide.classList.remove("active");
    currSlide.classList.add("out-next");
    nextSlide.classList.add("active", "in-next");

    // pagination
    page[pageNum].classList.add("active");
    currPage.classList.remove("active");

    // animation
    currSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("out-next");
      countAnimation++;
      isSlideMoving = countAnimation == 2 ? false : true;
    });
    nextSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("in-next");
      countAnimation++;
      isSlideMoving = countAnimation == 2 ? false : true;
    });
  }

  function handleSlidePrev() {
    if (isSlideMoving == true) {
      return false;
    }
    isSlideMoving = true;
    let countAnimation = 0;
    let currSlide = slides[pageNum];
    let currPage = page[pageNum];

    pageNum = pageNum > 0 ? pageNum - 1 : slides.length - 1;

    let preSlide = slides[pageNum];

    // slide
    currSlide.classList.remove("active");
    currSlide.classList.add("out-pre");
    preSlide.classList.add("active", "in-pre");

    // pagination
    page[pageNum].classList.add("active");
    currPage.classList.remove("active");

    //animation
    currSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("out-pre");
      countAnimation++;
      isSlideMoving = countAnimation == 2 ? false : true;
    });
    preSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("in-pre");
      countAnimation++;
      isSlideMoving = countAnimation == 2 ? false : true;
    });
  }

  slideNextBtn.addEventListener("click", handleSlideNext);
  slidePrevBtn.addEventListener("click", handleSlidePrev);

  // ---------------  keyboard -----------------
  window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
      return handleSlideNext();
    } else if (event.key == "ArrowLeft") {
      return handleSlidePrev();
    }
  });

  // pagination
  for (let i = 0; i < page.length; i++) {
    page[i].addEventListener("click", function () {
      for (let i = 0; i < page.length; i++) {
        page[i].classList.remove("active");
        slides[i].classList.remove("active");
      }
      this.classList.add("active");
      slides[i].classList.add("active");

      pageNum = i;
    });
  }
});
