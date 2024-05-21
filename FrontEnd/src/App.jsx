import Routage from './page/Routage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAdmin from './admin/LoginAdmin';
import AdminDashboard from './admin/CreateAdmin';


function App() {
  return (
    <>
      <Routage />
      <Router>
            <Routes>
                <Route path="/login" element={<LoginAdmin />} />
                <Route path="/admins" element={<AdminDashboard />} />
            </Routes>
        </Router>
      
    </>
  );
}

export default App;