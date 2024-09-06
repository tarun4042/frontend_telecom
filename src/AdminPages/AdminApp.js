import { Outlet, Link } from "react-router-dom";

function AdminApp(){
  return (
    <>
      <nav class="navbar">
        <ul class="nav-links">
          <li>
            <Link to="/admin/services">Our Services</Link>
          </li>
          <li>
            <Link to="/admin/requests">Requests</Link>
          </li>
          <li>
            <Link to="/admin/validation">Requests Validation</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      </>
  );
};

export default AdminApp;
