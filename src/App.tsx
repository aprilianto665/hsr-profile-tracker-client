import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { HomePage, ProfileDetail } from "./components";
import { Footer } from "./components/atoms";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:uid" element={<ProfileDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;