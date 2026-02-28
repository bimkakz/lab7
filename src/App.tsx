import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';


const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));


function Loading() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div className="spinner"></div>
      <p>Loading page...</p>
    </div>
  );
}


function ErrorFallback() {
  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
      <h2>Something went wrong</h2>
      <p>Could not load the page. Please check your internet connection.</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <BrowserRouter>
        
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/settings" style={{ marginRight: "10px" }}>Settings</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<h1>Welcome to Home Page</h1>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;