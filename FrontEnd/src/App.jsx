import User from './admin/User';
import Routage from './page/Routage';
import Produit from './admin/Produit';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginAdmin from './admin/LoginAdmin';
import AdminDashboard from './admin/CreateAdmin';


function App() {
  return (
    <>
      {/* <Produit/> */}
      {/* <Routage /> */}
      {/* <User /> */}
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