// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lightbox Logic
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const src = element.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Video Popup Logic
function openVideoPopup() {
    document.getElementById('videoPopup').style.display = 'flex';
}

function closeVideoPopup() {
    document.getElementById('videoPopup').style.display = 'none';
}

// Portfolio Filtering
function filterItems(type, btn) {
    // Buttons
    document.querySelectorAll('.filter button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Items
    document.querySelectorAll('.portfolioItem').forEach(item => {
        if (type === 'all' || item.getAttribute('data-type') === type) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Rating Logic
function setRating(starCount) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < starCount) {
            star.style.color = 'gold';
        } else {
            star.style.color = '#fff';
        }
    });
    document.getElementById('rateText').innerText = starCount + "/5 Rated!";
}


/* ===== WHATSAPP BOOKING LOGIC ===== */
// Auto-update price based on tier
document.getElementById("tier").addEventListener("change", function () {
    let selected = this.options[this.selectedIndex];
    let price = selected.getAttribute("data-price");
    document.getElementById("charge").value = price ? "₹" + price : "";
});

// WhatsApp form submit
document.getElementById("whatsForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let service = document.getElementById("service").value;
    let tier = document.getElementById("tier").value;
    let date = document.getElementById("bookingDate").value;
    let charge = document.getElementById("charge").value;

    if (!name || !address || !service || !tier || !date || !charge) {
        alert("Please fill all fields!");
        return;
    }

    let message = `Hello! I want to book a shoot:\n\nName: ${name}\nAddress: ${address}\nService: ${service}\nTier: ${tier}\nDate: ${date}\nCharge: ${charge}`;

    // WhatsApp number (Using real studio number)
    let phone = "919669036747";
    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});

/* ===== SERVICE CARD TIER LOGIC ===== */
document.querySelectorAll('.tierSelect').forEach(select => {
    select.addEventListener('change', function () {
        let selected = this.options[this.selectedIndex];
        let price = selected.getAttribute('data-price');
        // Find the sibling input with class .servicePrice
        let priceInput = this.parentElement.querySelector('.servicePrice');
        if (priceInput) {
            priceInput.value = price ? "₹" + Number(price).toLocaleString() : "";
        }
    });
});
