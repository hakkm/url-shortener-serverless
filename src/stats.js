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
            // Simulate API call (replace with actual API endpoint)
            const stats = await mockGetStats(url);
            
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

// Mock API function (replace with actual API call)
async function mockGetStats(url) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Check localStorage for demo purposes
    const urlData = localStorage.getItem(url);
    if (urlData) {
        const data = JSON.parse(urlData);
        return {
            clicks: data.clicks,
            lastAccessed: data.lastAccessed
        };
    }
    
    // If not found in localStorage, simulate some stats
    // In production, this would be an API call to your backend
    const mockStats = {
        clicks: Math.floor(Math.random() * 1000) + 1,
        lastAccessed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    return mockStats;
}