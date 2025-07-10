// URL shortening functionality
import { utils } from './main.js';

export function initializeShorten() {
    const form = document.getElementById('shorten-form');
    const longUrlInput = document.getElementById('long-url');
    const resultDiv = document.getElementById('shorten-result');
    const shortUrlDisplay = document.getElementById('short-url-display');
    const copyButton = document.getElementById('copy-short-url');
    const qrCodeDiv = document.getElementById('qr-code');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const longUrl = longUrlInput.value.trim();

        if (!utils.isValidUrl(longUrl)) {
            utils.showNotification('Please enter a valid URL', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Shortening...</span>';
        submitButton.disabled = true;

        try {
            // Call the real API
            const shortUrl = await shortenUrl(longUrl);

            // Display result
            shortUrlDisplay.textContent = shortUrl;

            // Generate QR code
            const qrCodeUrl = utils.generateQRCode(shortUrl);
            qrCodeDiv.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code" class="w-full h-full rounded">`;

            // Show result
            resultDiv.classList.remove('hidden');

            // Add copy functionality
            copyButton.addEventListener('click', () => {
                utils.copyToClipboard(shortUrl);
            });

            // Clear form
            longUrlInput.value = '';

            utils.showNotification('URL shortened successfully!', 'success');

        } catch (error) {
            console.error('Error shorteninga URL:', error);
            utils.showNotification('Failed to shorten URL. Please try again.', 'error');
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

// Real API function to shorten URLs
async function shortenUrl(longUrl) {
    const apiUrl = 'https://short.aws.khabir-hakim.tech/shorten';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: longUrl }),
    });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('Invalid URL format');
        } else if (response.status === 500) {
            throw new Error('Server error occurred');
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    }

    const data = await response.json();

    if (!data.shortUrl) {
        throw new Error('No short URL found in response');
    }

    return data.shortUrl;
}
