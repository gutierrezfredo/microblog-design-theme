// 3D tilt effect for hero avatar with light reflection
(function() {
    const avatar = document.querySelector('.hero-avatar img');
    if (!avatar) return;

    const container = avatar.parentElement;

    // Add perspective to container
    container.style.perspective = '800px';
    container.style.position = 'relative';

    // Create shine overlay element
    const shine = document.createElement('div');
    shine.className = 'avatar-shine';
    container.appendChild(shine);

    // Make it clickable - link to about page
    avatar.addEventListener('click', function() {
        window.location.href = '/about/';
    });

    container.addEventListener('mousemove', function(e) {
        const rect = avatar.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on mouse position (25 degrees max)
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 25;
        const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 25;

        avatar.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Calculate shine position (opposite to tilt for realistic light)
        const shineX = ((e.clientX - rect.left) / rect.width) * 100;
        const shineY = ((e.clientY - rect.top) / rect.height) * 100;
        
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)`;
        shine.style.opacity = '1';
    });

    container.addEventListener('mouseleave', function() {
        avatar.style.transform = 'scale(1) rotateX(0) rotateY(0)';
        shine.style.opacity = '0';
    });

    container.addEventListener('mouseenter', function() {
        avatar.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
        shine.style.transition = 'opacity 0.3s ease';
    });
})();
