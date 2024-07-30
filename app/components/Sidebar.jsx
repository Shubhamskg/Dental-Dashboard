import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaUserMd, FaTooth, FaCalendarAlt, FaChartBar, FaCog } from 'react-icons/fa';
import styles from '../styles/Sidebar.module.css';

const menuItems = [
  { name: 'Dashboard', icon: FaHome, path: '/' },
  { name: 'Dentists', icon: FaUserMd, path: '/dashboard/dentists' },
  { name: 'Treatments', icon: FaTooth, path: '/dashboard/treatments' },
  { name: 'Clinics', icon: FaCalendarAlt, path: '/dashboard/clinics' },
  { name: 'Reports', icon: FaChartBar, path: '/dashboard/reports' },
  { name: 'Settings', icon: FaCog, path: '/dashboard/settings' },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        Dental Advisor
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link href={item.path} key={item.name}
            
              className={`${styles.navItem} ${activeItem === item.name ? styles.active : ''}`}
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon className={styles.icon} />
              <span>{item.name}</span>
            
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;