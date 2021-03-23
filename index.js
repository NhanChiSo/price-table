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
    next = document.querySelector(".next"),
    pre = document.querySelector(".prev"),
    pagenum = 0,
    move = false; // trạng thái ko chuyển động

  var slideNext = function () {
    if (move == true) {
      return false;
    }
    move = true;

    let status2ani = 0; // trạng thái 2 animation
    let currSlide = slides[pagenum];
    let currPage = page[pagenum];

    pagenum = pagenum < slides.length - 1 ? pagenum + 1 : 0;

    let nextSlide = slides[pagenum];

    //slide
    currSlide.classList.remove("active");
    currSlide.classList.add("out-next");
    nextSlide.classList.add("active", "in-next");

    // pagination
    page[pagenum].classList.add("active");
    currPage.classList.remove("active");

    // animation
    currSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("out-next");
      status2ani++;
      if (status2ani == 2) {
        move = false; // đã chuyển động xong
      }
    });
    nextSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("in-next");
      status2ani++;
      if (status2ani == 2) {
        move = false; //đã chuyển động xong
      }
    });
  };

  var slidePre = function () {
    if (move == true) {
      return false;
    }
    move = true;
    let status2ani = 0;
    let currSlide = slides[pagenum];
    let currPage = page[pagenum];

    pagenum = pagenum > 0 ? pagenum - 1 : slides.length - 1;

    var preSlide = slides[pagenum];

    // slide
    currSlide.classList.remove("active");
    currSlide.classList.add("out-pre");
    preSlide.classList.add("active", "in-pre");

    // pagination
    page[pagenum].classList.add("active");
    currPage.classList.remove("active");

    //animation
    currSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("out-pre");
      status2ani++;
      if (status2ani == 2) {
        move = false;
      }
    });
    preSlide.addEventListener("webkitAnimationEnd", function () {
      this.classList.remove("in-pre");
      status2ani++;
      if (status2ani == 2) {
        move = false;
      }
    });
  };

  next.addEventListener("click", slideNext);
  pre.addEventListener("click", slidePre);

  // ---------------  keyboard -----------------
  window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight") {
      return slideNext();
    } else if (event.key == "ArrowLeft") {
      return slidePre();
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

      pagenum = i;
    });
  }
});
