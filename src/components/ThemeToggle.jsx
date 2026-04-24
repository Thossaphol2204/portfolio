import { useTranslation } from 'react-i18next';

function ThemeToggle({ theme, onChangeTheme }) {
  const { t } = useTranslation();

  return (
    <div className="theme-toggle" role="group" aria-label="Theme switcher">
      <span className="theme-icon" aria-hidden="true">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <button
        type="button"
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => onChangeTheme('dark')}
        aria-label={t('theme.switchToDark')}
      >
        {t('theme.dark')}
      </button>
      <button
        type="button"
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => onChangeTheme('light')}
        aria-label={t('theme.switchToLight')}
      >
        {t('theme.light')}
      </button>
    </div>
  );
}

export default ThemeToggle;
