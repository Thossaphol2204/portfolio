import { useTranslation } from 'react-i18next';

function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const setLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-toggle" role="group" aria-label="Language switcher">
      <span className="language-icon" aria-hidden="true">
        🌐
      </span>
      <button
        type="button"
        className={`language-btn ${i18n.language === 'th' ? 'active' : ''}`}
        onClick={() => setLanguage('th')}
      >
        {t('language.th')}
      </button>
      <button
        type="button"
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        {t('language.en')}
      </button>
    </div>
  );
}

export default LanguageToggle;
