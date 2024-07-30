"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Clinics.module.css';

// Dummy data for clinics
const dummyClinics = [
  { 
    id: 1, 
    name: "Downtown Dental Center", 
    address: "123 Main St, Downtown, City", 
    phone: "(555) 123-4567",
    staff: 15,
    patients: 2500,
    revenue: 750000,
    rating: 4.8
  },
  { 
    id: 2, 
    name: "Suburban Smiles", 
    address: "456 Oak Ave, Suburbia, City", 
    phone: "(555) 987-6543",
    staff: 10,
    patients: 1800,
    revenue: 550000,
    rating: 4.6
  },
  { 
    id: 3, 
    name: "Eastside Orthodontics", 
    address: "789 Elm St, Eastside, City", 
    phone: "(555) 246-8135",
    staff: 8,
    patients: 1200,
    revenue: 600000,
    rating: 4.7
  },
  { 
    id: 4, 
    name: "Westend Family Dentistry", 
    address: "321 Pine Rd, Westend, City", 
    phone: "(555) 369-2580",
    staff: 12,
    patients: 2200,
    revenue: 680000,
    rating: 4.5
  }
];

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setClinics(dummyClinics);
  }, []);

  useEffect(() => {
    if (selectedClinic) {
      // Prepare data for the chart
      setChartData([
        { name: 'Patients', value: selectedClinic.patients },
        { name: 'Revenue ($K)', value: selectedClinic.revenue / 1000 },
        { name: 'Staff', value: selectedClinic.staff }
      ]);
    }
  }, [selectedClinic]);

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
  };

  return (
    <div className={styles.clinics}>
      <h1>Dental Clinics</h1>
      
      <div className={styles.clinicsContainer}>
        <div className={styles.clinicsList}>
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className={`${styles.clinicCard} ${selectedClinic && selectedClinic.id === clinic.id ? styles.selected : ''}`}
              onClick={() => handleClinicSelect(clinic)}
            >
              <h2>{clinic.name}</h2>
              <p><strong>Address:</strong> {clinic.address}</p>
              <p><strong>Phone:</strong> {clinic.phone}</p>
              <p><strong>Rating:</strong> {clinic.rating} / 5</p>
            </div>
          ))}
        </div>
        
        <div className={styles.clinicDetails}>
          {selectedClinic ? (
            <>
              <h2>{selectedClinic.name}</h2>
              <p><strong>Address:</strong> {selectedClinic.address}</p>
              <p><strong>Phone:</strong> {selectedClinic.phone}</p>
              <p><strong>Staff:</strong> {selectedClinic.staff}</p>
              <p><strong>Patients:</strong> {selectedClinic.patients}</p>
              <p><strong>Revenue:</strong> ${selectedClinic.revenue.toLocaleString()}</p>
              <p><strong>Rating:</strong> {selectedClinic.rating} / 5</p>

              <div className={styles.chartContainer}>
                <h3>Clinic Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p>Select a clinic to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clinics;