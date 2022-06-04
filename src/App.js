import "./App.css";

//components
import Banner from "./Components/Banner/Banner";
import Header from "./Components/Header/Header";
import HeroSection from "./Components/HeroSection/HeroSection";

function App() {
  return (
    <div className="App">
      <Banner></Banner>
      <Header></Header>
      <HeroSection></HeroSection>
    </div>
  );
}

export default App;
