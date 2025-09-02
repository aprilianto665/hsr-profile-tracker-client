import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { HomePage, ProfileDetail } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:uid" element={<ProfileDetail />} />
      </Routes>
    </Router>
  );
}

export default App;