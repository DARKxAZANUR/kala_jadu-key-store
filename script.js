// Create floating particles
function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    let selectedDuration = 1;
    const durationButtons = document.querySelectorAll('.duration-btn');
    const generateBtn = document.getElementById('generateBtn');
    const keyDisplay = document.getElementById('keyDisplay');
    const statusMessage = document.getElementById('statusMessage');
    
    // Set active duration button
    durationButtons.forEach(button => {
        button.addEventListener('click', function() {
            durationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedDuration = parseInt(this.getAttribute('data-duration'));
            
            // Clear previous key and status
            keyDisplay.textContent = 'Click Generate to get key';
            statusMessage.textContent = '';
            statusMessage.style.background = '';
        });
    });
    
    // Generate key
    generateBtn.addEventListener('click', function() {
        generateBtn.disabled = true;
        statusMessage.textContent = '🚀 Generating your key...';
        statusMessage.style.background = 'rgba(255, 204, 0, 0.3)';
        
        // Simulate API call
        setTimeout(() => {
            const keys = {
                1: ['1DAY-ABCDE-FGHIJ-KLMNO', '1DAY-PQRST-UVWXY-Z1234', '1DAY-56789-ABCDE-FGHIJ'],
                30: ['30DAY-WXYZ1-23456-789AB', '30DAY-CDEFG-HIJKL-MNOPQ', '30DAY-RSTUV-WXYZA-BCDEF'],
                60: ['60DAY-HIJKL-MNOPQ-RSTUV', '60DAY-WXYZA-BCDEF-GHIJK', '60DAY-LMNOP-QRSTU-VWXYZ']
            };
            
            if (keys[selectedDuration] && keys[selectedDuration].length > 0) {
                const key = keys[selectedDuration][0];
                keyDisplay.textContent = key;
                statusMessage.textContent = `✅ ${selectedDuration} day key generated successfully!`;
                statusMessage.style.background = 'rgba(0, 255, 153, 0.3)';
                
                // Simulate key deletion
                setTimeout(() => {
                    statusMessage.textContent = `🗑️ Key has been removed from database`;
                    statusMessage.style.background = 'rgba(255, 0, 0, 0.3)';
                }, 2000);
            } else {
                keyDisplay.textContent = 'NO KEYS AVAILABLE';
                statusMessage.textContent = '❌ No keys available for this duration';
                statusMessage.style.background = 'rgba(255, 0, 0, 0.3)';
            }
            
            generateBtn.disabled = false;
        }, 1500);
    });
});
