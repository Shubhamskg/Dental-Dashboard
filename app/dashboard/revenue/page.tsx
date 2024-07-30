"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './Revenue.module.css';

// Dummy data for revenue over time
const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
];

// Dummy data for revenue by department
const departmentData = [
  { name: 'General Dentistry', value: 35000 },
  { name: 'Orthodontics', value: 25000 },
  { name: 'Periodontics', value: 18000 },
  { name: 'Endodontics', value: 15000 },
  { name: 'Oral Surgery', value: 12000 },
];

// Dummy data for top procedures
const procedureData = [
  { name: 'Dental Cleaning', revenue: 15000 },
  { name: 'Tooth Extraction', revenue: 12000 },
  { name: 'Root Canal', revenue: 10000 },
  { name: 'Dental Implants', revenue: 20000 },
  { name: 'Braces', revenue: 18000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Revenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Calculate total revenue
    const total = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    setTotalRevenue(total);
  }, []);

  return (
    <div className={styles.revenue}>
      <h1>Revenue Dashboard</h1>
      
      <div className={styles.overviewCard}>
        <h2>Total Revenue</h2>
        <p className={styles.totalRevenue}>${totalRevenue.toLocaleString()}</p>
      </div>

      <div className={styles.chartContainer}>
        <h2>Revenue Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartContainer}>
          <h2>Revenue by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartContainer}>
          <h2>Top Procedures by Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={procedureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2>Revenue Breakdown</h2>
        <table className={styles.revenueTable}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item) => (
              <tr key={item.month}>
                <td>{item.month}</td>
                <td>${item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;