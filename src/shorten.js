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
            // Simulate API call (replace with actual API endpoint)
            const shortUrl = await mockShortenUrl(longUrl);
            
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
            console.error('Error shortening URL:', error);
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

// Mock API function (replace with actual API call)
async function mockShortenUrl(longUrl) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock short URL
    const shortId = Math.random().toString(36).substring(2, 8);
    const shortUrl = `https://urlshort.ly/${shortId}`;
    
    // Store in localStorage for demo purposes
    const urlData = {
        shortUrl,
        longUrl,
        clicks: 0,
        createdAt: new Date().toISOString(),
        lastAccessed: null
    };
    
    localStorage.setItem(shortUrl, JSON.stringify(urlData));
    
    return shortUrl;
}