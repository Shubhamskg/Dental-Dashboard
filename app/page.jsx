"use client"
import React from 'react';
import Layout from './components/Layout';
import { FaUserFriends, FaCalendarCheck, FaTooth, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './App.module.css';

// Dummy data for charts
const appointmentData = [
  { name: 'Mon', appointments: 12 },
  { name: 'Tue', appointments: 19 },
  { name: 'Wed', appointments: 15 },
  { name: 'Thu', appointments: 17 },
  { name: 'Fri', appointments: 14 },
  { name: 'Sat', appointments: 8 },
  { name: 'Sun', appointments: 3 },
];

const treatmentData = [
  { name: 'Cleaning', value: 400 },
  { name: 'Fillings', value: 300 },
  { name: 'Root Canal', value: 100 },
  { name: 'Extractions', value: 200 },
  { name: 'Implants', value: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const App = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Dental Advisor Dashboard</h1>
        
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <FaUserFriends className={styles.icon} />
            <div className={styles.metricContent}>
              <h2>Total Patients</h2>
              <p>1,234</p>
            </div>
          </div>
          <div className={styles.metricCard}>
            <FaCalendarCheck className={styles.icon} />
            <div className={styles.metricContent}>
              <h2>Appointments Today</h2>
              <p>42</p>
            </div>
          </div>
          <div className={styles.metricCard}>
            <FaTooth className={styles.icon} />
            <div className={styles.metricContent}>
              <h2>Treatments This Month</h2>
              <p>287</p>
            </div>
          </div>
          <div className={styles.metricCard}>
            <FaChartLine className={styles.icon} />
            <div className={styles.metricContent}>
              <h2>Revenue This Month</h2>
              <p>$52,500</p>
            </div>
          </div>
        </div>

        <div className={styles.chartsContainer}>
          <div className={styles.chartCard}>
            <h2>Weekly Appointments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartCard}>
            <h2>Treatment Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={treatmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {treatmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.actionCards}>
          <div className={styles.actionCard}>
            <h2>Quick Actions</h2>
            <button className={styles.actionButton}>Schedule Appointment</button>
            <button className={styles.actionButton}>Add New Patient</button>
            <button className={styles.actionButton}>View Treatment Plans</button>
          </div>
          <div className={styles.actionCard}>
            <h2>Recent Notifications</h2>
            <ul className={styles.notificationList}>
              <li>Dr. Johnson added a new treatment plan</li>
              <li>5 appointments scheduled for tomorrow</li>
              <li>Monthly revenue report is ready</li>
              <li>New patient feedback received</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;