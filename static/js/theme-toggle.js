/**
 * Theme Toggle with Moon Animation
 * Toggles between light and dark mode with animated moon phases
 */
(function() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const html = document.documentElement;
    const icon = toggle.querySelector('.toggle-icon');
    let isAnimating = false;

    // Moon phase emojis for animation
    const toDark = ['🌒', '🌓', '🌔', '🌕'];
    const toLight = ['🌔', '🌓', '🌒', '🌑'];

    // Get current theme
    function getTheme() {
        return localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    // Update icon based on current theme
    function updateIcon(theme) {
        icon.textContent = theme === 'dark' ? '🌕' : '🌑';
    }

    // Animate moon phases
    function animateMoon(phases, callback) {
        if (isAnimating) return;
        isAnimating = true;

        let i = 0;
        const interval = setInterval(() => {
            icon.textContent = phases[i];
            i++;
            if (i >= phases.length) {
                clearInterval(interval);
                isAnimating = false;
                if (callback) callback();
            }
        }, 80);
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const phases = newTheme === 'dark' ? toDark : toLight;

        animateMoon(phases, () => {
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize
    updateIcon(getTheme());
    toggle.addEventListener('click', toggleTheme);

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
        }
    });
})();
