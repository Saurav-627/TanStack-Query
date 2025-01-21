import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">ReactQuery</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/trad">FetchOld</NavLink>
          </li>
          <li>
            <NavLink to="/rq">FetchRQ</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create Post</NavLink>
          </li>
          <li>
            <NavLink to="/infinite">Infinite</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
