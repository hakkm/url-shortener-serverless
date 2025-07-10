// URL statistics functionality
import { utils } from './main.js';

export function initializeStats() {
    const form = document.getElementById('stats-form');
    const statsUrlInput = document.getElementById('stats-url');
    const resultDiv = document.getElementById('stats-result');
    const totalClicksDisplay = document.getElementById('total-clicks');
    const lastAccessedDisplay = document.getElementById('last-accessed');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const url = statsUrlInput.value.trim();

        if (!utils.isValidUrl(url)) {
            utils.showNotification('Please enter a valid URL', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Getting Stats...</span>';
        submitButton.disabled = true;

        try {
            // Call the real API
            const stats = await getStats(url);

            // Display results
            totalClicksDisplay.textContent = stats.clicks.toLocaleString();
            lastAccessedDisplay.textContent = stats.lastAccessed
                ? new Date(stats.lastAccessed).toLocaleString()
                : 'Never';

            // Show result
            resultDiv.classList.remove('hidden');

            // Clear form
            statsUrlInput.value = '';

            utils.showNotification('Stats retrieved successfully!', 'success');

        } catch (error) {
            console.error('Error getting stats:', error);
            utils.showNotification('Failed to get stats. Please check the URL and try again.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Reinitialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    });
}

// Real API function to get URL statistics
async function getStats(url) {
    const apiUrl = 'https://short.aws.khabir-hakim.tech/stats';
    const params = new URLSearchParams({ url: url });

    const response = await fetch(`${apiUrl}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('URL not found');
        } else if (response.status === 400) {
            throw new Error('Invalid URL format');
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    }

    const data = await response.json();

    if (!data.clickCount && data.clickCount !== 0) {
        throw new Error('No stats data found in response');
    }

    return {
        clicks: data.clickCount || 0,
        lastAccessed: data.lastAccessed ? new Date(data.lastAccessed).toISOString() : null
    };
}
