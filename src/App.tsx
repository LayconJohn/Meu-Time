import { BrowserRouter, Routes, Route  } from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import TeamDashboard from './pages/TeamDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TeamDashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
