import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;