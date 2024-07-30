import React from 'react';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.search}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <FaBell />
          <span className={styles.notificationBadge}>3</span>
        </button>
        <button className={styles.iconButton}>
          <FaUserCircle />
        </button>
        <span className={styles.userName}>Dr. Smith</span>
      </div>
    </div>
  );
};

export default Navbar;