import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import MainView from "./components/MainView";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <MainView />
      <Footer />
    </div>
  );
}

export default App;
