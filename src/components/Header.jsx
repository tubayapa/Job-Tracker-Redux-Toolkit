import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        {" "}
        <h2>Job Tracker</h2>
      </Link>

      <nav>
        <NavLink to={"/"}>Job List</NavLink>
        <NavLink to={"/add"}>Add a Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
