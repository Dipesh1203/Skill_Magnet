import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { getImageUrl } from "../utils";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.title} to="/home">
        Skill Magnet
      </NavLink>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt=""
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <NavLink to="/user/signUp">Register Now</NavLink>
          </li>
          <li>
            <NavLink to="/user/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/getintouch">Get in Touch</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
