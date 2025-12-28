/**
 * Theme Toggle with SVG Icons
 * Toggles between light and dark mode with sun/moon icons
 */
(function() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const html = document.documentElement;
    const sunIcon = toggle.querySelector('.sun-icon');
    const moonIcon = toggle.querySelector('.moon-icon');
    const labelLight = toggle.querySelector('.toggle-label-light');
    const labelDark = toggle.querySelector('.toggle-label-dark');

    // Get current theme
    function getTheme() {
        return localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    // Update icon and label visibility based on current theme
    // Show sun + "Light" in dark mode (to switch to light)
    // Show moon + "Dark" in light mode (to switch to dark)
    function updateIcon(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            if (labelLight) labelLight.style.display = '';
            if (labelDark) labelDark.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            if (labelLight) labelLight.style.display = 'none';
            if (labelDark) labelDark.style.display = '';
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
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
