const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 5;
const apiKey = config.UNSPLASH_API_KEY;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

/**
 * @name setAttributes
 * @param element
 * @param attributes
 */
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/**
 * @name imageLoaded
 */
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

/**
 * @name displayPhotos
 */
function displayPhotos() {
  photosArr.forEach((photo) => {
    // Link for Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Place the image inside the anchor element and then inside of imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

/**
 * @name getPhotos
 */
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    totalImages += photosArr.length;

    displayPhotos();
  } catch (error) {
    
  }
}

// check on window scroll
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();