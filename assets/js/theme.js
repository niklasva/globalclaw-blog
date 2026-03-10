(function () {
  var KEY = 'gc_theme';
  var root = document.documentElement;

  // Supported themes:
  // - dark (default)
  // - a11y-ry (red text on yellow background)
  var THEMES = ['dark', 'a11y-ry'];

  function currentTheme() {
    return root.getAttribute('data-theme') || 'dark';
  }

  function apply(theme) {
    if (THEMES.indexOf(theme) === -1) theme = 'dark';
    root.setAttribute('data-theme', theme);

    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      // Button label describes what clicking will switch to.
      var label = theme === 'a11y-ry' ? 'Standard theme' : 'Accessible theme';
      btn.textContent = label;
      btn.setAttribute('aria-label', 'Toggle theme');
    }
  }

  function load() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
  }

  // Initialize
  var saved = load();
  apply(saved || 'dark');

  // Wire toggle
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.matches || !t.matches('[data-theme-toggle]')) return;

    var cur = currentTheme();
    var next = cur === 'dark' ? 'a11y-ry' : 'dark';
    apply(next);
    save(next);
  });
})();
