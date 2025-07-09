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
            // Simulate API call (replace with actual API endpoint)
            const longUrl = await mockUnshortenUrl(shortUrl);
            
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

// Mock API function (replace with actual API call)
async function mockUnshortenUrl(shortUrl) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check localStorage for demo purposes
    const urlData = localStorage.getItem(shortUrl);
    if (urlData) {
        const data = JSON.parse(urlData);
        return data.longUrl;
    }
    
    // If not found in localStorage, simulate a real unshorten
    // In production, this would be an API call to your backend
    if (shortUrl.includes('urlshort.ly')) {
        throw new Error('Short URL not found');
    }
    
    // For demo purposes, return a mock long URL
    return 'https://example.com/this-is-a-very-long-url-that-was-shortened-for-convenience';
}