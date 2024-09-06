import Services from '../UserPages/Services';
import './Styling_Components/App.css';
import { Outlet, Link } from "react-router-dom";

function App(){
  return (
    // <>
    //   <nav class="navbar">
    //     <ul class="nav-links">
    //       <li>
    //         <Link to="/home">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/login">Login</Link>
    //       </li>
    //       <li>

    //       </li>
    //     </ul>
    //   </nav>

    //   <Outlet />
    //   </>
    
      <Router>
          <Routes>
              <Route path="/user-home" element={<Services />} />
              
          </Routes>
      </Router>
  );
};

export default App;
