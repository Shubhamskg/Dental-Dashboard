// import { deleteUser } from "../../../app/lib/actions";
// import { fetchUsers } from "../../../app/lib/data";
// import Pagination from "../../../app/ui/dashboard/pagination/pagination";
// import Search from "../../../app/ui/dashboard/search/search";
// import styles from "../../../app/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import Link from "next/link";

// const UsersPage = async ({ searchParams }) => {
//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const { count, users } = await fetchUsers(q, page);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder="Search for a user..." />
//         <Link href="/dashboard/dentists/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image
//                     src={user.img || "/noavatar.png"}
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.userImage}
//                   />
//                   {user.username}
//                 </div>
//               </td>
//               <td>{user.email}</td>
//               <td>{user.createdAt?.toString().slice(4, 16)}</td>
//               <td>{user.isAdmin ? "Admin" : "Client"}</td>
//               <td>{user.isActive ? "active" : "passive"}</td>
//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/dashboard/dentists/${user.id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>
//                       View
//                     </button>
//                   </Link>
//                   <form action={deleteUser}>
//                     <input type="hidden" name="id" value={(user.id)} />
//                     <button className={`${styles.button} ${styles.delete}`}>
//                       Delete
//                     </button>
//                   </form>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination count={count} />
//     </div>
//   );
// };

// export default UsersPage;
"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './Dentists.module.css';

// Dummy data for dentists
const dummyDentists = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "General Dentistry",
    patients: 450,
    rating: 4.8,
    yearsOfExperience: 12,
    availability: 85
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Orthodontics",
    patients: 380,
    rating: 4.9,
    yearsOfExperience: 15,
    availability: 75
  },
  {
    id: 3,
    name: "Dr. Sarah Martinez",
    specialty: "Pediatric Dentistry",
    patients: 320,
    rating: 4.7,
    yearsOfExperience: 8,
    availability: 90
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Periodontics",
    patients: 290,
    rating: 4.6,
    yearsOfExperience: 10,
    availability: 80
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Endodontics",
    patients: 310,
    rating: 4.8,
    yearsOfExperience: 14,
    availability: 70
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dentists = () => {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [specialtyData, setSpecialtyData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setDentists(dummyDentists);
    setSelectedDentist(dummyDentists[0]);

    // Prepare data for specialty distribution chart
    const specialtyCounts = dummyDentists.reduce((acc, dentist) => {
      acc[dentist.specialty] = (acc[dentist.specialty] || 0) + 1;
      return acc;
    }, {});
    setSpecialtyData(Object.entries(specialtyCounts).map(([name, value]) => ({ name, value })));
  }, []);

  const handleDentistSelect = (dentist) => {
    setSelectedDentist(dentist);
  };

  return (
    <div className={styles.dentists}>
      <h1>Our Dentists</h1>
      
      <div className={styles.dentistsContainer}>
        <div className={styles.dentistsList}>
          {dentists.map((dentist) => (
            <div
              key={dentist.id}
              className={`${styles.dentistCard} ${selectedDentist && selectedDentist.id === dentist.id ? styles.selected : ''}`}
              onClick={() => handleDentistSelect(dentist)}
            >
              <h2>{dentist.name}</h2>
              <p>{dentist.specialty}</p>
              <div className={styles.dentistMetrics}>
                <span>Patients: {dentist.patients}</span>
                <span>Rating: {dentist.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.dentistDetails}>
          {selectedDentist && (
            <>
              <h2>{selectedDentist.name}</h2>
              <p><strong>Specialty:</strong> {selectedDentist.specialty}</p>
              <p><strong>Patients:</strong> {selectedDentist.patients}</p>
              <p><strong>Rating:</strong> {selectedDentist.rating}/5</p>
              <p><strong>Years of Experience:</strong> {selectedDentist.yearsOfExperience}</p>
              <p><strong>Availability:</strong> {selectedDentist.availability}%</p>

              <div className={styles.chartContainer}>
                <h3>Dentist Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Patients', value: selectedDentist.patients },
                    { name: 'Rating', value: selectedDentist.rating * 20 }, // Scaling rating to 100
                    { name: 'Experience', value: selectedDentist.yearsOfExperience },
                    { name: 'Availability', value: selectedDentist.availability }
                  ]}>
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
          )}
        </div>
      </div>

      <div className={styles.overviewSection}>
        <h2>Dentist Overview</h2>
        <div className={styles.overviewCharts}>
          <div className={styles.chartWrapper}>
            <h3>Specialty Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specialtyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {specialtyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartWrapper}>
            <h3>Patient Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dentists}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dentists;
