import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import FloatingMascot from './FloatingMascot';
import './Layout.css';

function Layout() {
    const THEME_STORAGE_KEY = 'app_theme';
    const location = useLocation();
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme === 'dark' ? 'dark' : 'light';
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const handleChangeTheme = (nextTheme) => {
        setTheme(nextTheme);
    };

    const navItems = [
        { to: '/', label: t('nav.home'), match: (p) => p === '/' },
        { to: '/resume', label: t('nav.resume'), match: (p) => p.startsWith('/resume') },
        { to: '/project', label: t('nav.project'), match: (p) => p.startsWith('/project') },
        { to: '/certificate', label: t('nav.certificate'), match: (p) => p.startsWith('/certificate') },
    ];

    return (
        <div className="layout">
            <FloatingMascot />
            <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-gradient-border"></div>
                <div className="container header-container">
                    <Link to="/" className="logo">
                        <span className="logo-text">Port ThossapholMP</span>
                    </Link>

                    <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
                        {navItems.map((item) => (
                            <Link key={item.to} to={item.to} className={`nav-link ${item.match(location.pathname) ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                                <span>{item.label}</span>
                                <div className="nav-indicator"></div>
                            </Link>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <ThemeToggle theme={theme} onChangeTheme={handleChangeTheme} />
                        <LanguageToggle />
                        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                            <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
                                <span></span><span></span><span></span>
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="main-body">
                <main className="main-content-wrapper">
                    <Outlet />
                </main>
            </div>

            <footer className="main-footer">
                <div className="container">
                    <div className="footer-content single-row">
                        <div className="footer-brand">
                            <h3>{t('footer.brandTitle')}</h3>
                            <p>{t('footer.tagline')}</p>
                        </div>
                        <div className="footer-links horizontal">
                            <Link to="/">{t('nav.home')}</Link>
                            <Link to="/resume">{t('nav.resume')}</Link>
                            <Link to="/project">{t('nav.project')}</Link>
                            <Link to="/certificate">{t('nav.certificate')}</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
