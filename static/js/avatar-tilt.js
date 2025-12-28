// 3D tilt effect for hero avatar
(function() {
    const avatar = document.querySelector('.hero-avatar img');
    if (!avatar) return;

    const container = avatar.parentElement;

    // Add perspective to container
    container.style.perspective = '800px';

    // Make it clickable - link to about page
    avatar.addEventListener('click', function() {
        window.location.href = '/about/';
    });

    avatar.addEventListener('mousemove', function(e) {
        const rect = avatar.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on mouse position (25 degrees max)
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 25;
        const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 25;

        avatar.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    avatar.addEventListener('mouseleave', function() {
        avatar.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });

    avatar.addEventListener('mouseenter', function() {
        avatar.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
    });
})();
