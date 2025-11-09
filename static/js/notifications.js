[file name]: static/js/notifications.js
[file content begin]
// Romantic notifications system
function startRomanticNotifications() {
    const notifications = [
        "Aap meri duniya hain 💗",
        "Har din aapke bina adhoora lagta hai 🌙",
        "Aapki yaadon ne mere dil ko ghar bana liya hai 🏠",
        "Meri khushiyon ka raaz sirf aap hain 🤫",
        "Aapki muskurahat meri sabse khoobsurat tasveer hai 📸",
        "Har pal aapke saath bitana chahta hoon ⏳",
        "Aap ho to sab kuch hai, aap na ho to kuch bhi nahi ❤️",
        "Pyaar ek aisi feeling hai jo shabdon mein bayaan nahi ho sakti 💫"
    ];
    
    function showRandomNotification() {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        showRomanticNotification(randomNotification);
        
        // Schedule next notification between 30-60 seconds
        const nextTime = Math.random() * 30000 + 30000;
        setTimeout(showRandomNotification, nextTime);
    }
    
    // Start first notification after 10 seconds
    setTimeout(showRandomNotification, 10000);
}

function showRomanticNotification(message) {
    const container = document.getElementById('romanticNotifications');
    const notification = document.createElement('div');
    notification.className = 'romantic-notification';
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 100],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuad',
            complete: function() {
                notification.remove();
            }
        });
    }, 5000);
}
[file content end]