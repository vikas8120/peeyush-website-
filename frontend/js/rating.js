/**
 * Vanilla JS Rating Component
 * Converts React Rating component to pure JavaScript
 */

class Rating {
    constructor(container, options = {}) {
        this.container = container;
        this.rating = 0;
        this.onRate = options.onRate || (() => { });
        this.service = options.service || 'wedding';
        this.onSubmit = options.onSubmit || null;

        this.render();
        this.attachEvents();
    }

    render() {
        this.container.innerHTML = `
      <div class="rating-box">
        <h3>Rate Our Work</h3>
        <div class="stars">
          ${[1, 2, 3, 4, 5].map(num => `
            <span class="star" data-rating="${num}">★</span>
          `).join('')}
        </div>
        <p class="rating-value">0/5</p>
        
        <div class="review-form">
          <textarea id="review-message" placeholder="Write your experience..." class="review-textarea"></textarea>
          <button id="submit-review" class="btn btn-gold">
            Submit Review
          </button>
        </div>
      </div>
    `;

        this.stars = this.container.querySelectorAll('.star');
        this.ratingValue = this.container.querySelector('.rating-value');
        this.submitBtn = this.container.querySelector('#submit-review');
        this.messageInput = this.container.querySelector('#review-message');
    }

    attachEvents() {
        this.stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.getAttribute('data-rating'));
                this.setRating(rating);
            });

            star.addEventListener('mouseenter', (e) => {
                const rating = parseInt(e.target.getAttribute('data-rating'));
                this.highlightStars(rating);
            });
        });

        this.container.querySelector('.stars').addEventListener('mouseleave', () => {
            this.highlightStars(this.rating);
        });

        this.submitBtn.addEventListener('click', () => this.submitReview());
    }

    highlightStars(rating) {
        this.stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    setRating(rating) {
        this.rating = rating;
        this.highlightStars(rating);
        this.ratingValue.textContent = `${rating}/5`;
        this.onRate(rating);
    }

    async submitReview() {
        if (!this.rating) {
            alert("Please give a rating ⭐");
            return;
        }

        const message = this.messageInput.value.trim();

        this.submitBtn.disabled = true;
        this.submitBtn.textContent = "Submitting...";

        try {
            const body = {
                rating: this.rating,
                message,
                service: this.service
            };

            const res = await fetch("/api/rating/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (data.success) {
                alert("Thanks for your feedback ⭐. Your review is pending approval.");
                this.resetForm();
            } else {
                alert("Error: " + data.message);
                this.submitBtn.disabled = false;
                this.submitBtn.textContent = "Submit Review";
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Please try again.");
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = "Submit Review";
        }
    }

    resetForm() {
        this.rating = 0;
        this.highlightStars(0);
        this.ratingValue.textContent = "0/5";
        this.messageInput.value = "";
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = "Submit Review";
    }

    getRating() {
        return this.rating;
    }
}

/**
 * AverageRating Component
 * Displays the average rating in a clean format
 */
class AverageRating {
    constructor(container, avg) {
        this.container = container;
        this.avg = avg;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div class="avg-rating">
        <span class="gold">${this.avg}</span>/5 ⭐
      </div>
    `;
    }

    update(avg) {
        this.avg = avg;
        this.render();
    }
}

/**
 * StarDisplay Component
 * Displays rating as stars with score and review count
 * Format: ★★★★☆ 4.8 (126 Reviews)
 */
class StarDisplay {
    constructor(container, rating, reviewCount) {
        this.container = container;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.render();
    }

    getStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '☆';
        stars += '☆'.repeat(emptyStars - (hasHalfStar ? 0 : 0));

        return stars;
    }

    render() {
        const stars = this.getStars(this.rating);
        this.container.innerHTML = `
            <div class="star-display">
                <span class="stars">${stars}</span>
                <span class="rating-score">${this.rating}</span>
                <span class="review-count">(${this.reviewCount} Reviews)</span>
            </div>
        `;
    }

    update(rating, reviewCount) {
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.render();
    }
}

// Export for use in other scripts
window.Rating = Rating;
window.AverageRating = AverageRating;
window.StarDisplay = StarDisplay;
