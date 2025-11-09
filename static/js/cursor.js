[file name]: static/js/cursor.js
[file content begin]
// Custom cursor with heart trail
function initializeCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const trail = document.getElementById('cursorTrail');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create heart trail
        if (Math.random() > 0.7) {
            createHeartTrail(e.clientX, e.clientY);
        }
    });
    
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    function createHeartTrail(x, y) {
        const heart = document.createElement('div');
        heart.className = 'cursor-trail-heart';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.innerHTML = '💖';
        
        document.body.appendChild(heart);
        
        anime({
            targets: heart,
            translateY: [0, -30],
            translateX: [0, (Math.random() - 0.5) * 20],
            scale: [1, 0.5],
            opacity: [0.7, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            complete: function() {
                heart.remove();
            }
        });
    }
    
    // Cursor effects on interactive elements
    document.querySelectorAll('button, a, .nav-link, .letter-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            anime({
                targets: cursor,
                scale: 1.5,
                background: 'radial-gradient(circle, #ff8e8e, #ff6b6b)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            anime({
                targets: cursor,
                scale: 1,
                background: 'radial-gradient(circle, #ff6b6b, #ff8e8e)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    animateCursor();
}
[file content end]