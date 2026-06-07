import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import MissionBanner from "./components/MissionBanner";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        {/* <ImpactSection />
        <MissionBanner /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
