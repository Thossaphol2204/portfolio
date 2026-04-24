import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ProjectPage from './pages/ProjectPage';
import CertificatePage from './pages/CertificatePage';
import './App.css';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="resume" element={<ResumePage />} />
                        <Route path="project" element={<ProjectPage />} />
                        <Route path="certificate" element={<CertificatePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
