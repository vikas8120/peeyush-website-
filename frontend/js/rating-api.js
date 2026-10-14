const API_BASE_URL = '/api/rating';

const RatingAPI = {
    // Submit a new rating
    async submitRating(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting rating:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Get all approved ratings
    async getApprovedRatings(service = 'all') {
        try {
            const response = await fetch(`${API_BASE_URL}/approved?service=${service}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching approved ratings:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Get all pending ratings (Admin only)
    async getPendingRatings() {
        try {
            const response = await fetch(`${API_BASE_URL}/pending`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching pending ratings:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Approve a rating (Admin only)
    async approveRating(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/approve/${id}`, {
                method: 'PUT',
            });
            return await response.json();
        } catch (error) {
            console.error('Error approving rating:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Delete a rating (Admin only)
    async deleteRating(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting rating:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Get rating statistics
    async getStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return { success: false, message: 'Network error' };
        }
    }
};

window.RatingAPI = RatingAPI;
