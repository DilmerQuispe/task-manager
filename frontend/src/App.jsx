import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
//import Dashboard from "./pages/Dashboard";
function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
//        <Route path="/dashboard" element={<Dashboard />} />

export default App;