// import Image from "next/image";
// import Link from "next/link";
// import styles from "../../../app/ui/dashboard/products/products.module.css";
// import Search from "../../../app/ui/dashboard/search/search";
// import Pagination from "../../../app/ui/dashboard/pagination/pagination";
// import { fetchProducts } from "../../../app/lib/data";
// import { deleteProduct } from "../../../app/lib/actions";

// const ProductsPage = async ({ searchParams }) => {
//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const { count, products } = await fetchProducts(q, page);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder="Search for a product..." />
//         <Link href="/dashboard/treatments/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Title</td>
//             <td>Description</td>
//             <td>Price</td>
//             <td>Created At</td>
//             <td>Stock</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <div className={styles.product}>
//                   <Image
//                     src={product.img || "/noproduct.jpg"}
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.productImage}
//                   />
//                   {product.title}
//                 </div>
//               </td>
//               <td>{product.desc}</td>
//               <td>${product.price}</td>
//               <td>{product.createdAt?.toString().slice(4, 16)}</td>
//               <td>{product.stock}</td>
//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/dashboard/treatments/${product.id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>
//                       View
//                     </button>
//                   </Link>
//                   <form action={deleteProduct}>
//                     <input type="hidden" name="id" value={product.id} />
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

// export default ProductsPage;
"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import styles from './Treatments.module.css';

// Dummy data for treatments
const dummyTreatments = [
  { 
    id: 1, 
    name: "Dental Cleaning", 
    description: "Professional cleaning of teeth to remove plaque and tartar.",
    averageDuration: 60,
    averageCost: 150,
    popularity: 35,
    successRate: 99,
    painLevel: 1,
    recoveryTime: 0
  },
  { 
    id: 2, 
    name: "Tooth Filling", 
    description: "Filling cavities to restore the function and integrity of missing tooth structure.",
    averageDuration: 45,
    averageCost: 200,
    popularity: 25,
    successRate: 95,
    painLevel: 2,
    recoveryTime: 1
  },
  { 
    id: 3, 
    name: "Root Canal", 
    description: "Treatment of the infected pulp of a tooth to eliminate infection and protect from future microbial invasion.",
    averageDuration: 90,
    averageCost: 1000,
    popularity: 15,
    successRate: 90,
    painLevel: 3,
    recoveryTime: 3
  },
  { 
    id: 4, 
    name: "Tooth Extraction", 
    description: "Removal of a tooth from its socket in the bone.",
    averageDuration: 30,
    averageCost: 250,
    popularity: 10,
    successRate: 98,
    painLevel: 4,
    recoveryTime: 5
  },
  { 
    id: 5, 
    name: "Dental Implants", 
    description: "Surgical component that interfaces with the bone of the jaw to support a dental prosthesis.",
    averageDuration: 120,
    averageCost: 3000,
    popularity: 15,
    successRate: 95,
    painLevel: 3,
    recoveryTime: 14
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setTreatments(dummyTreatments);
    setSelectedTreatment(dummyTreatments[0]);
  }, []);

  useEffect(() => {
    if (selectedTreatment) {
      setComparisonData([
        { subject: 'Cost', A: selectedTreatment.averageCost, fullMark: 3000 },
        { subject: 'Duration', A: selectedTreatment.averageDuration, fullMark: 120 },
        { subject: 'Popularity', A: selectedTreatment.popularity, fullMark: 100 },
        { subject: 'Success Rate', A: selectedTreatment.successRate, fullMark: 100 },
        { subject: 'Pain Level', A: selectedTreatment.painLevel, fullMark: 5 },
        { subject: 'Recovery (days)', A: selectedTreatment.recoveryTime, fullMark: 14 },
      ]);
    }
  }, [selectedTreatment]);

  const handleTreatmentSelect = (treatment) => {
    setSelectedTreatment(treatment);
  };

  return (
    <div className={styles.treatments}>
      <h1>Dental Treatments</h1>
      
      <div className={styles.treatmentsContainer}>
        <div className={styles.sidebar}>
          <h2>Treatment List</h2>
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className={`${styles.treatmentItem} ${selectedTreatment && selectedTreatment.id === treatment.id ? styles.selected : ''}`}
              onClick={() => handleTreatmentSelect(treatment)}
            >
              {treatment.name}
            </div>
          ))}
        </div>
        
        <div className={styles.mainContent}>
          {selectedTreatment && (
            <>
              <div className={styles.treatmentHeader}>
                <h2>{selectedTreatment.name}</h2>
                <p>{selectedTreatment.description}</p>
              </div>
              
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h3>Average Duration</h3>
                  <p>{selectedTreatment.averageDuration} minutes</p>
                </div>
                <div className={styles.metricCard}>
                  <h3>Average Cost</h3>
                  <p>${selectedTreatment.averageCost}</p>
                </div>
                <div className={styles.metricCard}>
                  <h3>Popularity</h3>
                  <p>{selectedTreatment.popularity}%</p>
                </div>
                <div className={styles.metricCard}>
                  <h3>Success Rate</h3>
                  <p>{selectedTreatment.successRate}%</p>
                </div>
              </div>

              <div className={styles.chartsContainer}>
                <div className={styles.chartWrapper}>
                  <h3>Treatment Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={comparisonData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                      <Radar name={selectedTreatment.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className={styles.chartWrapper}>
                  <h3>Popularity Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={treatments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="popularity"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {treatments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Treatments;