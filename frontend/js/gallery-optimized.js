import galleryItems from '../data/galleryItems.js';

// State
let filter = "wedding";
let swiperInstance = null;

// DOM Elements
const galleryGrid = document.querySelector('.gallery-slider');
const sliderWrapper = document.getElementById('slider-wrapper');
const tabs = document.querySelectorAll('.gallery-tabs button');

// Function to render the Grid
function renderGrid() {
    if (!galleryGrid) return;

    const filteredItems = filter === "all"
        ? galleryItems.filter(i => i.active)
        : galleryItems.filter(i => i.active && i.category === filter);

    galleryGrid.innerHTML = filteredItems.map(item => `
        <div class="gallery-item" data-category="${item.category}">
            <div class="flip-inner">
                <div class="flip-front">
                    ${item.type === "image"
            ? `<img src="${item.src}" alt="gallery" loading="lazy">`
            : `<video src="${item.src}" controls muted loop playsinline preload="metadata"></video>`
        }
                </div>
                <div class="flip-back">
                    <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to render the Slider
function renderSlider() {
    if (!sliderWrapper) return;

    const filteredItems = filter === "all"
        ? galleryItems.filter(i => i.active)
        : galleryItems.filter(i => i.active && i.category === filter);

    // React code slice logic: .filter(type image).slice(0, 4)
    const sliderItems = filteredItems.filter(i => i.type === "image").slice(0, 4);

    // Destroy existing slider if it exists to properly re-init
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }

    sliderWrapper.innerHTML = sliderItems.map(item => `
        <div class="swiper-slide">
            <img src="${item.src}" class="swiper-lazy" alt="slider">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </div>
    `).join('');

    // Re-init Swiper
    swiperInstance = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true, // Loop might act weird with few slides, but keeping matching config
        effect: "fade",
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        lazy: true // Enable lazy loading module
    });
}

// Event Listeners for Tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update Filter
        // The buttons inside .gallery-tabs generally don't have data-category in the React snippet, 
        // they rely on the text content or index. However, keeping data-category is safer for Vanilla JS.
        // We will assume the HTML will have data-category on the buttons.
        filter = tab.getAttribute('data-category') || tab.innerText.toLowerCase();

        // Update Active Class
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Re-render
        renderGrid();
        renderSlider(); // Optional: Re-render slider based on filter if desired, React code does filter slider items too.
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // renderGrid(); // Disabled to allow static gallery
    renderSlider();
});
