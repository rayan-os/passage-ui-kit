export function ThemeScript() {
  // Runs before React hydration to avoid theme flash.
  const code = `
(() => {
  try {
    const stored = localStorage.getItem('theme'); // 'light' | 'dark' | 'system'
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light');
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch {}
})();`

  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

