import { useTranslation } from 'react-i18next';
import { CURRENT_EVENT } from '../theme/eventTheme';

function ThemeToggle({ theme, onChangeTheme }) {
  const { t } = useTranslation();
  const eventId = CURRENT_EVENT.id;

  const icon = theme === eventId ? CURRENT_EVENT.icon : theme === 'dark' ? '🌙' : '☀️';

  return (
    <div className="theme-toggle" role="group" aria-label="Theme switcher">
      <span className="theme-icon" aria-hidden="true">
        {icon}
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
      <button
        type="button"
        className={`theme-btn event ${theme === eventId ? 'active' : ''}`}
        onClick={() => onChangeTheme(eventId)}
        aria-label={t('theme.switchToEvent')}
      >
        {t('theme.event')}
      </button>
    </div>
  );
}

export default ThemeToggle;
