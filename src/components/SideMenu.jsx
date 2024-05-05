// components/SideMenu.jsx
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  return (
    <nav className="side-menu">
      <h2>
        <Link to="/Home">Home Page</Link>
      </h2>
      <h2>Game Select</h2>
      <ul>
        <li>
          <Link to="/Game?q=hello">Hello World</Link>
        </li>
        <li>
          <Link to="/Game?q=nestest">Nes Test</Link>
        </li>
        <li>
          <Link to="/Game?q=mguard">Mguard -Shooting-</Link>
        </li>
        <li>
          <Link to="/Game?q=bad_apple_2_5">Bad Apple v2.5</Link>
        </li>
        {/* Add more game titles */}
      </ul>
    </nav>
  );
};

export default SideMenu;
