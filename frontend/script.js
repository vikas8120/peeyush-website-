// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        Object.assign(navLinks.style, {
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "64px",
            right: "4%",
            background: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(212,175,55,0.25)",
            padding: "14px",
            borderRadius: "18px",
            gap: "12px",
            backdropFilter: "blur(10px)"
        });
    }
});

// Authentication Status Check
async function checkAuthStatus() {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await fetch('/api/check-auth', { headers });
        const data = await response.json();
        const navLogin = document.getElementById('navLogin');
        const navLogout = document.getElementById('navLogout');

        // Reset
        if (navLogin) {
            navLogin.style.display = 'none';
            navLogin.href = '/user/login.html';
            navLogin.textContent = 'Login';
        }
        if (navLogout) navLogout.style.display = 'none';

        if (data.isLoggedIn) {
            // User is logged in
            if (navLogout) navLogout.style.display = 'inline-block';

            // Re-purpose Login link as Dashboard link
            if (navLogin) {
                navLogin.style.display = 'inline-block';
                navLogin.textContent = data.isAdmin ? 'Admin Panel' : 'My Dashboard';
                navLogin.href = data.isAdmin ? '/admin/dashboard' : '/user/dashboard.html';
            }
        } else {
            // Guest
            if (navLogin) navLogin.style.display = 'inline-block';
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
}

// Logout Handler
const navLogout = document.getElementById('navLogout');
if (navLogout) {
    navLogout.addEventListener('click', async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    });
}

// Check auth on load
checkAuthStatus();

// ===== DYNAMIC PRICING LOGIC =====
const servicePriceMap = {
    "Candid Photography": { Basic: 5000, Premium: 10000, Luxury: 20000 },
    "Cinematic Video": { Basic: 15000, Premium: 30000, Luxury: 50000 },
    "Traditional Photography": { Basic: 6000, Premium: 12000, Luxury: 22000 },
    "Prewedding Shoot": { Basic: 7000, Premium: 14000, Luxury: 24000 },
    "Reels / Short Video": { Basic: 3000, Premium: 6000, Luxury: 12000 },
    "Photo/Video Editing": { Basic: 2000, Premium: 5000, Luxury: 9000 },
    "LED Wall 8x12": { Fixed: 15000 },
    "Drone Shoot": { Fixed: 10000 },
    "Crane Video Shoot": { Fixed: 12000 },
    "Wedding Photography": { Basic: 12000, Premium: 25000, Luxury: 40000 },
    "Baby Shoot": { Basic: 3000, Premium: 6000, Luxury: 10000 },
    "Passport Photo": { Fixed: 200 },
    "Album Designing": { Basic: 5000, Premium: 9000, Luxury: 15000 }
};

// Services cards auto price update
document.querySelectorAll('.tierSelect').forEach(select => {
    select.addEventListener('change', function () {
        const option = this.options[this.selectedIndex];
        const price = option.getAttribute('data-price');
        const input = this.closest('.service-card, .serviceCard').querySelector('.servicePrice');
        if (input) {
            const formattedPrice = price ? '₹' + parseInt(price).toLocaleString() : '';
            if (input.tagName === 'INPUT') {
                input.value = formattedPrice;
            } else {
                input.textContent = formattedPrice || 'Select Tier to View Price';
                if (formattedPrice) {
                    input.classList.add('has-price');
                } else {
                    input.classList.remove('has-price');
                }
            }
        }
    });
});

// Booking form elements
const serviceEl = document.getElementById("service");
const tierEl = document.getElementById("tier");
const chargeEl = document.getElementById("charge");

function updateTierOptions() {
    const service = serviceEl.value;
    tierEl.innerHTML = `<option value="">Select Tier</option>`;
    if (!service || !servicePriceMap[service]) return;

    const tiers = servicePriceMap[service];
    Object.keys(tiers).forEach(t => {
        tierEl.innerHTML += `<option value="${t}">${t} - ₹${tiers[t].toLocaleString()}</option>`;
    });
    chargeEl.value = "";
}

function updateCharge() {
    const service = serviceEl.value;
    const tier = tierEl.value;
    if (service && tier && servicePriceMap[service]?.[tier]) {
        chargeEl.value = "₹" + servicePriceMap[service][tier].toLocaleString();
    } else {
        chargeEl.value = "";
    }
}

if (serviceEl) {
    serviceEl.addEventListener("change", () => {
        updateTierOptions();
        updateCharge();
    });
    tierEl.addEventListener("change", updateCharge);
}

// ✅ WhatsApp submission
// ✅ Backend Booking Submission
const whatsForm = document.getElementById('whatsForm');
if (whatsForm) {
    whatsForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const address = document.getElementById('address').value.trim();
        const service = serviceEl.value;
        const tier = tierEl.value;
        const date = document.getElementById('bookingDate').value;
        const charge = chargeEl.value;
        const phoneInput = document.getElementById('userPhone').value.trim();

        if (!name || !email || !phoneInput || !address || !service || !tier || !date || !charge) {
            alert('Please fill all required fields!');
            return;
        }

        const formData = {
            name,
            email,
            address,
            service,
            tier,
            date,
            price: charge,
            phone: phoneInput
        };

        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                alert(`Booking Confirmed! Ref: ${result.bookingRef}\nCheck your email.`);
                
                // Formulate WhatsApp message and redirect
                const messageText = `Hello! I want to book a shoot:\n\nName: ${name}\nAddress: ${address}\nService: ${service}\nTier: ${tier}\nDate: ${date}\nCharge: ${charge}\nBooking Ref: ${result.bookingRef}`;
                const phone = "919669036747";
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;
                window.open(url, "_blank");

                whatsForm.reset();
                chargeEl.value = '';
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}

// ✅ Email Submission Logic
const sendEmailBtn = document.getElementById("sendEmailBtn");
if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", function () {
        let name = document.getElementById('name').value.trim();
        let address = document.getElementById('address').value.trim();
        let service = serviceEl.value;
        let tier = tierEl.value;
        let date = document.getElementById('bookingDate').value;
        let charge = chargeEl.value;

        if (!name || !address || !service || !tier || !date || !charge) {
            alert("Please fill all booking details first!");
            return;
        }

        let studioEmail = "gunjandigitalstudio@gmail.com"; // Updated to user's new email
        let subject = `Booking Request - ${service} (${tier})`;
        let body =
            `Hello Gunjan Digital Studio,

I want to book a service.

Name: ${name}
Address: ${address}
Service: ${service}
Tier: ${tier}
Booking Date: ${date}
Charge: ${charge}

Thanks`;

        window.location.href = `mailto:${studioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Testimonials auto slide
let slideIdx = 0;
const slider = document.getElementById('testimonialSlide');
if (slider) {
    function showNextSlide() {
        slideIdx++;
        if (slideIdx >= slider.children.length) slideIdx = 0;
        slider.style.transform = `translateX(-${slideIdx * 100}%)`;
    }
    setInterval(showNextSlide, 4000);
}

// Autopopulate contact form on "Book Now" click
document.querySelectorAll('.book-addon, .heroBookingBtn, .btn-gold[href="#booking"], .btn-outline[href="#booking"]').forEach(btn => {
    btn.addEventListener('click', function () {
        // Try to get service from data-service or from the parent modal's title
        let service = this.dataset.service;
        if (!service && this.closest('.feature-modal-box')) {
            service = document.getElementById('featureTitle').textContent;
        }

        if (service && serviceEl) {
            serviceEl.value = service;
            updateTierOptions();

            // Auto-select "Fixed" tier if it's the only option (for add-ons)
            const tiers = servicePriceMap[service];
            if (tiers && Object.keys(tiers).length === 1 && Object.keys(tiers)[0] === 'Fixed') {
                tierEl.value = 'Fixed';
                updateCharge();
            }
        }
    });
});

// Global Modal Logic
const serviceModal = document.getElementById("serviceModal");
const statsModal = document.getElementById("statsModal");
const featureModal = document.getElementById("featureModal");

document.querySelectorAll(".service-card, .stat-click, .feature-click").forEach(el => {
    el.addEventListener("click", (e) => {
        // Prevent modal if clicking inside a select or input
        if (e.target.closest('select, input')) return;

        const targetModal = el.classList.contains("service-card") ? serviceModal :
            el.classList.contains("stat-click") ? statsModal : featureModal;

        if (targetModal) {
            const titleEl = targetModal.querySelector("h3");
            const descEl = targetModal.querySelector("p");
            if (titleEl) titleEl.textContent = el.dataset.title || el.querySelector('h3')?.textContent;
            if (descEl) descEl.textContent = el.dataset.desc || el.querySelector('p')?.textContent;
            targetModal.style.display = "flex";
        }
    });
});

document.querySelectorAll(".service-close, .stats-close, .feature-close").forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".service-modal, .stats-modal, .feature-modal");
        if (modal) modal.style.display = "none";
    });
});

window.addEventListener("click", (e) => {
    [serviceModal, statsModal, featureModal].forEach(m => {
        if (e.target === m) m.style.display = "none";
    });
});

function openBooking(serviceName) {
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    const serviceEl = document.getElementById("service");
    serviceEl.value = serviceName;
    updateTierOptions();  // tier + price update
}

function selectPackage(serviceName, tierName) {
    const bookingSec = document.getElementById("booking");
    if (bookingSec) bookingSec.scrollIntoView({ behavior: "smooth" });
    
    const serviceEl = document.getElementById("service");
    const tierEl = document.getElementById("tier");
    if (serviceEl) {
        serviceEl.value = serviceName;
        updateTierOptions();
        if (tierEl) {
            tierEl.value = tierName;
            updateCharge();
        }
    }
}

// Init
if (serviceEl) updateTierOptions();

// Navbar Scroll Styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});
