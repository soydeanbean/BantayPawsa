import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from '@/components/layout/AppShell';
import Home from '@/pages/Home';
import Pets from '@/pages/Pets';
import PetProfile from '@/pages/PetProfile';
import RegisterPet from '@/pages/RegisterPet';
import QRScanner from '@/pages/QRScanner';
import ReportStray from '@/pages/ReportStray';
import MapPage from '@/pages/MapPage';
import Profile from '@/pages/Profile';
import Community from '@/pages/Community';
import AuthProvider from '@/contexts/AuthProvider';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-white/20">404</h1>
      <p className="text-white/60 mt-4">Page not found</p>
      <a href="/" className="mt-6 text-emerald-400 hover:text-emerald-300 transition-colors">
        Go home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:id" element={<PetProfile />} />
            <Route path="/register" element={<RegisterPet />} />
            <Route path="/scanner" element={<QRScanner />} />
            <Route path="/report" element={<ReportStray />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}