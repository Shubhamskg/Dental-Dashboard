"use client"

import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    language: 'en',
    fontSize: 'medium',
    autoLogout: 30,
  });

  useEffect(() => {
    // Load settings from localStorage or API when component mounts
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      
      <div className={styles.settingGroup}>
        <h2>Preferences</h2>
        
        <div className={styles.settingItem}>
          <label htmlFor="notifications">
            Enable Notifications
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.settingItem}>
          <label htmlFor="darkMode">
            Dark Mode
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.settingItem}>
          <label htmlFor="language">
            Language
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label htmlFor="fontSize">
            Font Size
            <select
              id="fontSize"
              name="fontSize"
              value={settings.fontSize}
              onChange={handleChange}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.settingGroup}>
        <h2>Security</h2>
        
        <div className={styles.settingItem}>
          <label htmlFor="autoLogout">
            Auto Logout (minutes)
            <input
              type="number"
              id="autoLogout"
              name="autoLogout"
              min="5"
              max="60"
              value={settings.autoLogout}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <button className={styles.saveButton} onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;