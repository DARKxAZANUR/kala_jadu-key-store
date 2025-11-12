// Background particles code same rahega...

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    let selectedDuration = 1;
    const durationButtons = document.querySelectorAll('.duration-btn');
    const generateBtn = document.getElementById('generateBtn');
    const keyDisplay = document.getElementById('keyDisplay');
    const statusMessage = document.getElementById('statusMessage');
    
    // Update key counts on page load
    updateKeyCounts();
    
    // Set active duration button
    durationButtons.forEach(button => {
        button.addEventListener('click', function() {
            durationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedDuration = parseInt(this.getAttribute('data-duration'));
            
            keyDisplay.textContent = 'Click Generate to get key';
            statusMessage.textContent = '';
            statusMessage.style.background = '';
            
            updateKeyCount(selectedDuration);
        });
    });
    
    // Generate key
    generateBtn.addEventListener('click', function() {
        generateBtn.disabled = true;
        statusMessage.textContent = 'Getting key from server...';
        statusMessage.style.background = 'rgba(255, 204, 0, 0.3)';
        
        // Vercel API call
        getKeyFromAPI(selectedDuration)
            .then(result => {
                if (result.success) {
                    keyDisplay.textContent = result.key;
                    statusMessage.textContent = `✅ ${selectedDuration} day key generated successfully!`;
                    statusMessage.style.background = 'rgba(0, 255, 153, 0.3)';
                    
                    updateKeyCount(selectedDuration);
                    
                    setTimeout(() => {
                        statusMessage.textContent = `🗑️ Key has been removed from database`;
                        statusMessage.style.background = 'rgba(255, 0, 0, 0.3)';
                    }, 2000);
                } else {
                    keyDisplay.textContent = 'No keys available';
                    statusMessage.textContent = `❌ ${result.message}`;
                    statusMessage.style.background = 'rgba(255, 0, 0, 0.3)';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                keyDisplay.textContent = 'Error loading key';
                statusMessage.textContent = '❌ Error connecting to server';
                statusMessage.style.background = 'rgba(255, 0, 0, 0.3)';
            })
            .finally(() => {
                generateBtn.disabled = false;
            });
    });
});

// Vercel API call
async function getKeyFromAPI(duration) {
    const response = await fetch('/api/get-key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            duration: duration
        })
    });
    
    return await response.json();
}

// Check keys count
async function updateKeyCount(duration) {
    try {
        const response = await fetch('/api/check-keys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                duration: duration
            })
        });
        
        const data = await response.json();
        const button = document.querySelector(`[data-duration="${duration}"]`);
        
        if (button) {
            const originalText = duration === 1 ? '1 Day' : `${duration} Days`;
            button.textContent = `${originalText} (${data.available} available)`;
        }
    } catch (error) {
        console.error('Error updating key count:', error);
    }
}

async function updateKeyCounts() {
    [1, 30, 60].forEach(duration => {
        updateKeyCount(duration);
    });
}

// Background particles function same rahega...