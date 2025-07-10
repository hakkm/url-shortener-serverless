// URL unshortening functionality
import { utils } from './main.js';

export function initializeUnshorten() {
    const form = document.getElementById('unshorten-form');
    const shortUrlInput = document.getElementById('short-url');
    const resultDiv = document.getElementById('unshorten-result');
    const longUrlDisplay = document.getElementById('long-url-display');
    const copyButton = document.getElementById('copy-long-url');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const shortUrl = shortUrlInput.value.trim();

        if (!utils.isValidUrl(shortUrl)) {
            utils.showNotification('Please enter a valid URL', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Unshortening...</span>';
        submitButton.disabled = true;

        try {
            // Call the real API
            const longUrl = await unshortenUrl(shortUrl);

            // Display result
            longUrlDisplay.textContent = longUrl;

            // Show result
            resultDiv.classList.remove('hidden');

            // Add copy functionality
            copyButton.addEventListener('click', () => {
                utils.copyToClipboard(longUrl);
            });

            // Clear form
            shortUrlInput.value = '';

            utils.showNotification('URL unshortened successfully!', 'success');

        } catch (error) {
            console.error('Error unshortening URL:', error);
            utils.showNotification('Failed to unshorten URL. Please check the URL and try again.', 'error');
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

// Real API function to unshorten URLs
async function unshortenUrl(shortUrl) {
    const apiUrl = 'https://short.aws.khabir-hakim.tech/unshorten';
    const params = new URLSearchParams({ url: shortUrl });

    const response = await fetch(`${apiUrl}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Short URL not found');
        } else if (response.status === 400) {
            throw new Error('Invalid URL format');
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    }

    const data = await response.json();

    if (!data.longUrl) {
        throw new Error('No long URL found in response');
    }

    return data.longUrl;
}
