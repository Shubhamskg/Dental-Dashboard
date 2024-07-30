"use client"
import React, { useState, useEffect } from 'react';
import styles from './Teams.module.css';

// Dummy data for teams
const dummyTeams = [
  {
    id: 1,
    name: "Orthodontics Team",
    leader: "Dr. Sarah Johnson",
    members: ["Dr. Michael Lee", "Dr. Emily Chen", "Nurse Jessica Brown"],
    patients: 150,
    specialty: "Orthodontics",
    description: "Specializing in correcting misaligned teeth and jaws."
  },
  {
    id: 2,
    name: "Pediatric Dentistry Team",
    leader: "Dr. David Wilson",
    members: ["Dr. Rachel Green", "Dr. Thomas Anderson", "Nurse Lisa Taylor"],
    patients: 200,
    specialty: "Pediatric Dentistry",
    description: "Focused on providing dental care for children and adolescents."
  },
  {
    id: 3,
    name: "Periodontics Team",
    leader: "Dr. Amanda Martinez",
    members: ["Dr. Robert Clark", "Dr. Sophia Kim", "Nurse Daniel White"],
    patients: 100,
    specialty: "Periodontics",
    description: "Experts in treating gum diseases and maintaining gum health."
  },
  {
    id: 4,
    name: "General Dentistry Team",
    leader: "Dr. John Smith",
    members: ["Dr. Laura Davis", "Dr. Kevin Brown", "Nurse Michelle Johnson"],
    patients: 250,
    specialty: "General Dentistry",
    description: "Providing comprehensive dental care for patients of all ages."
  }
];

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setTeams(dummyTeams);
  }, []);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className={styles.teams}>
      <h1>Dental Teams</h1>
      <div className={styles.teamContainer}>
        <div className={styles.teamList}>
          {teams.map((team) => (
            <div
              key={team.id}
              className={`${styles.teamCard} ${selectedTeam && selectedTeam.id === team.id ? styles.selected : ''}`}
              onClick={() => handleTeamClick(team)}
            >
              <h2>{team.name}</h2>
              <p><strong>Leader:</strong> {team.leader}</p>
              <p><strong>Patients:</strong> {team.patients}</p>
              <p><strong>Specialty:</strong> {team.specialty}</p>
            </div>
          ))}
        </div>
        {selectedTeam && (
          <div className={styles.teamDetails}>
            <h2>{selectedTeam.name}</h2>
            <p><strong>Leader:</strong> {selectedTeam.leader}</p>
            <p><strong>Specialty:</strong> {selectedTeam.specialty}</p>
            <p><strong>Patients:</strong> {selectedTeam.patients}</p>
            <p><strong>Description:</strong> {selectedTeam.description}</p>
            <h3>Team Members:</h3>
            <ul>
              {selectedTeam.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;