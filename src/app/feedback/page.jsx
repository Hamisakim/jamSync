'use client'
import React, { useState } from 'react';

export default function FeedbackForm() {
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      rating: e.target.rating.value,
      recommendation: e.target.recommendation.value,
      feedback: e.target.feedback.value,
    };

    console.log('Form Data Submitted:', formData);

    // Simulate a response message
    setResponseMessage('Thank you for your feedback!');
    e.target.reset(); // Reset the form
  };

  return (
    <div style={styles.container} className='mx-auto w-full text-white'>
      <h1>Feedback Form</h1>
      <form id="feedbackForm" onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name" style={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          required
          style={styles.input}
        />

        <label htmlFor="email" style={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          required
          style={styles.input}
        />

        <label htmlFor="rating" style={styles.label}>
          Rating:
        </label>
        <select id="rating" name="rating" required style={styles.select}>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>

        <label htmlFor="recommendation" style={styles.label}>
          Would you recommend this app to your friend:
        </label>
        <select
          id="recommendation"
          name="recommendation"
          required
          style={styles.select}
        >
          <option value="yes">Definitely Yes</option>
          <option value="probably">Probably</option>
          <option value="perhaps">Perhaps</option>
          <option value="no">Absolutely No</option>
        </select>

        <label htmlFor="feedback" style={styles.label}>
          Your Feedback:
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows="5"
          placeholder="What do you think we need to improve..."
          required
          style={styles.textarea}
        ></textarea>

        <button type="submit" style={styles.button}>
          Submit Feedback
        </button>
      </form>

      {responseMessage && (
        <p style={styles.responseMessage}>{responseMessage}</p>
      )}
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  input: {
    width: '100%',
    margin: '10px 0',
    padding: '8px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  select: {
    width: '100%',
    margin: '10px 0',
    padding: '8px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    margin: '10px 0',
    padding: '8px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '5px',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  responseMessage: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};
