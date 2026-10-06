import { useEffect, useLayoutEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';

import './App.css';
import './index.css';

import LandingPage from './components/landingpage';
import LoginForm from './components/loginPageNew';
import SignupForm from './components/signupPageNew';
import Dashboard from './components/dashboardNew';
import TripsDashboard from './components/tripDashboardNew';
import TripDashboard from './components/tirpdashboard';
import PayHistory from './components/payHistory';
import IntroPage from './components/intropage';
import TripSuggestion from './components/tripSuggestion';
import GroupDashboard from './components/groupDashboard';
import IndiTripDashboard from './components/indiTripDashboard';
import "@fontsource/lexend-deca";
import History from './components/paymentistoryNew';
import Members from './components/membersNew';
import Suggestions from './components/debtSuggestionNew';
import IndiSuggetion from './components/test';
import { TripsProvider } from './contexts/TripsContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AboutUs from './components/aboutUs';
import HelpPage from './components/HelpPage';

function AppRedirector({ setIsReady }) {
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');

    // wait until hydration is complete
    setTimeout(() => {
      if (location.pathname === '/') {
        if (token) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/intro', { replace: true });
        }
      }
      setIsReady(true);
    }, 50); // slight delay ensures full mount
  }, [location, navigate, setIsReady]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tripsDashboard" element={<TripsDashboard />} />
      <Route path="/groupDashboard" element={<GroupDashboard />} />
      <Route path="/trip" element={<TripDashboard />} />
      <Route path="/history" element={<PayHistory />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/tripSuggestion" element={<TripSuggestion />} />
      <Route path="/indiTripDashboard" element={<IndiTripDashboard />} />
      <Route path="/test" element={<IndiSuggetion />} />
      <Route path='/payHistory' element={<History />} />
      <Route path='/members' element={<Members />} />
      <Route path='/suggestions' element={<Suggestions />} />
      <Route path='/aboutUs' element={<AboutUs />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  );
}

function MainApp() {
  const [isReady, setIsReady] = useState(false);

  return (
    <Router>
      <AppRedirector setIsReady={setIsReady} />
      {isReady ? (
        <UserProvider>
          <TripsProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </TripsProvider>
        </UserProvider>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 text-sm">Loading app...</p>
        </div>
      )}
    </Router>
  );
}

export default MainApp;
