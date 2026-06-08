import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import MissionBanner from "./components/MissionBanner";
import AboutPage from "./components/AboutPage";
import DonatePage from "./components/DonatePage";
import CampaignsPage from "./components/CampaignsPage";
import "./App.css";

function Home() {
  return (
    <>
      <Hero />
      <ImpactSection />
      <MissionBanner />
      {/* <Footer /> */}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/"       element={<Home />} />
           <Route path="/about" element={<AboutPage />} />
           <Route path="/donate" element={<DonatePage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
           {/* Add more routes as needed */}
           <Route path="*" element={<Home />} /> {/* Fallback to Home for unknown routes */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}