import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from './pages/Login';
import SelectTeam from "./pages/SelectTeam";
import TeamDashboard from './pages/TeamDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TeamDashboard />} />
        <Route path="/select-team" element={<SelectTeam />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
