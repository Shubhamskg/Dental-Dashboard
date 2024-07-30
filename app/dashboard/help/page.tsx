"use client"

import React, { useState } from 'react';
import styles from './Help.module.css';

const faqs = [
  {
    question: "How do I schedule an appointment?",
    answer: "You can schedule an appointment by calling our office or using the online booking system on our website."
  },
  {
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans. Please contact our office for specific information about your insurance coverage."
  },
  {
    question: "How often should I visit the dentist?",
    answer: "We recommend visiting the dentist for a check-up and cleaning every six months, or as advised by your dentist based on your individual needs."
  },
  {
    question: "What should I do in case of a dental emergency?",
    answer: "In case of a dental emergency, please contact our office immediately. We offer emergency dental services and will provide guidance on what to do next."
  }
];

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
    alert('Your message has been sent. We will get back to you soon!');
  };

  return (
    <div className={styles.help}>
      <h1>Help Center</h1>
      
      <section className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <h3 
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className={styles.faqQuestion}
            >
              {faq.question}
              <span className={styles.expandIcon}>{expandedFaq === index ? '−' : '+'}</span>
            </h3>
            {expandedFaq === index && <p className={styles.faqAnswer}>{faq.answer}</p>}
          </div>
        ))}
      </section>

      <section className={styles.contact}>
        <h2>Contact Us</h2>
        <p>If you couldn't find the answer to your question, please feel free to contact us directly.</p>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Help;