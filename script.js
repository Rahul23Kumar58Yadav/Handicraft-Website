var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector(".logo");
    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = 0.5;
      }
      logo.style.opacity = 0.5;
    });
  }
});
nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector(".logo");
    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = 1;
      }
      logo.style.opacity = 1;
    });
  }
});

const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup h5"),
  loginHeader = document.querySelector(".login h5");
loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

const Popup = document.querySelector(".popups");
const BtnCloseModal = document.querySelector(".btn-close");
const BtnsOpenModals = document.querySelectorAll(".btn-show");
const open = function (e) {
  e.preventDefault();
  Popup.classList.remove("hiddens");
};
const close = function () {
  Popup.classList.add("hiddens");
};
BtnsOpenModals.forEach((btn) => btn.addEventListener("click", open));
BtnCloseModal.addEventListener("click", close);

//// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/*===========ScrollView=========*/
const animate = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: "2500",
  delay: "400",
});

animate.reveal(".nav");
animate.reveal(".home-text", { origin: "left" });
animate.reveal(".home-img", { origin: "bottom" });
animate.reveal(".review-content", { origin: "left" });
animate.reveal(".contact-container", { origin: "bottom" });
animate.reveal(".footer-container", { origin: "bottom" });

animate.reveal(".feature-box, .card,.product-box", { interval: 100 });
/*======= Products=========*/
const linkProducts = document.querySelectorAll(".filter-item");
function activeProduct() {
  linkProducts.forEach((I) => I.classList.remove("active-filter"));
  this.classList.add("active-filter");
}
linkProducts.forEach((I) => I.addEventListener("click", activeProduct));

let mixProduct = mixitup(".products", {
  selectors: {
    target: ".product-box",
  },
  animation: {
    duration: 300,
  },
});

//Contact Form in PHP
const form = document.querySelector("form"),
  statusTxt = form.querySelector(".button-area span");
form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.response;
      if (
        response.indexOf("required") != -1 ||
        response.indexOf("valid") != -1 ||
        response.indexOf("failed") != -1
      ) {
        statusTxt.style.color = "red";
      } else {
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  };
  let formData = new FormData(form);
  xhr.send(formData);
};
