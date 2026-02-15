import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DemoPage from './pages/DemoPage';
import DocumentationPage from './pages/DocumentationPage';
import DocDetailPage from './pages/DocDetailPage';
import CheckInsPage from './features/checkins/pages/CheckInsPage';
import NewCheckInPage from './features/checkins/pages/NewCheckInPage';
import HistoryPage from './features/checkins/pages/HistoryPage';
import WeeklySummaryPage from './features/checkins/pages/WeeklySummaryPage';
import SettingsPage from './features/checkins/pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/documentation/:slug" element={<DocDetailPage />} />
            <Route path="/checkins" element={<CheckInsPage />} />
            <Route path="/checkins/new" element={<NewCheckInPage />} />
            <Route path="/checkins/history" element={<HistoryPage />} />
            <Route path="/checkins/weekly" element={<WeeklySummaryPage />} />
            <Route path="/checkins/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
