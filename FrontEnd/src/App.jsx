import Routage from './page/Routage';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAdmin from './admin/LoginAdmin';
import AdminDashboard from './admin/CreateAdmin';
=======
import Produit from './admin/Produit';
import AdminLogin from './admin/LoginAdmin';
import AdminManagement from './admin/CreateAdmin';
import Dashbord from './admin/Dashbord';


>>>>>>> 1e485aa56ecf9f0f17679771db3d2c32205215bd


function App() {
  return (
    <>
<<<<<<< HEAD
      <Routage />
      <Router>
            <Routes>
                <Route path="/login" element={<LoginAdmin />} />
                <Route path="/admins" element={<AdminDashboard />} />
            </Routes>
        </Router>
      
=======
      {/* <Produit/> */}
      {/* <AdminManagement /> */}
      {/* <User /> */}
      {/* <Dashbord /> */}
      <Routage />
     
>>>>>>> 1e485aa56ecf9f0f17679771db3d2c32205215bd
    </>
  );
}

export default App;