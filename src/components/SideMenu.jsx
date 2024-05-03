// SideMenu.jsx
// components/SideMenu.jsx
import './SideMenu.css';

const SideMenu = () => {
  return (
    <nav className="side-menu">
      <h2>
        <a href="/Home">Home Page</a>
      </h2>
      <h2>Game Select</h2>
      <ul>
        <li>
          <a href="/Game?q=hello">Hello World</a>
        </li>
        <li>
          <a href="/Game?q=nestest">Nes Test</a>
        </li>
        <li>
          <a href="/Game?q=mguard">Mguard -Shooting-</a>
        </li>
        <li>
          <a href="/Game?q=bad_apple_2_5">Bad Apple v2.5</a>
        </li>
        {/* Add more game titles */}
      </ul>
    </nav>
  );
};

export default SideMenu;
