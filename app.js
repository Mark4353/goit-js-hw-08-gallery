
const gallery = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".lightbox");
const modalImage = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");

const galleryMarkup = gallery
  .map(
    ({ preview, original, description }) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class=" gallery__image" src="${preview}" data-source="${original}" alt="${description}"/> 
            </a> 
            </li>`
  )
  .join("");

galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {

  event.preventDefault();

  const target =event.target;
  if (target.nodeName !== "IMG") return;
  openModal (target.dataset.source,target.alt);

}
function openModal(src, alt) {
  modal.classList.add("is-open");
  modalImage.src = src;
  modalImage.alt = alt;

  currentIndex = gallery.findIndex((item) => item.original === src);
  window.addEventListener("keydown", onKeyPress);
}

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("is-open");
  modalImage.src = "";
  modalImage.alt = "";

  window.removeEventListener("keydown", onKeyPress);
}

let currentIndex = 0;

function onKeyPress(event) {
  if (event.code === "Escape") {
    closeModal();
  } else if (event.code === "ArrowRight") {
    nextImage();
  } else if (event.code === "ArrowLeft") {
    prevImage();
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % gallery.length;
  updateModalImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
  updateModalImage();
}

function updateModalImage() {
  modalImage.src = gallery[currentIndex].original;
  modalImage.alt = gallery[currentIndex].description;
}
