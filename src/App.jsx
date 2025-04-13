import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreenTest from './Pages/SellerResponsive/LoginScreenTest';
import SellerDashboard from './Pages/SellerResponsive/Dashboard/SellerDashboard'; 
import Customerdashboard from './customer/SellerResponsive/Dashboard/CustomerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Routes>
          <Route path="/" element={<LoginScreenTest />} />
          
          {/* Additional routes */}
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/customer" element={<Customerdashboard />} /> {/* Add your components */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;