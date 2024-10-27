
interface VerificationEmailProps {
  confirmationUrl: string;
}

const VerificationEmail: React.FC< Readonly <VerificationEmailProps>> = ({ confirmationUrl }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to 2FA-AUTH!</h1>
      </div>
      <div style={styles.content}>
        <p style={styles.message}>Please confirm your email to get started:</p>
        <a href={confirmationUrl} style={styles.button}>Verify Email</a>
      </div>
      <footer style={styles.footer}>
        <p>If you didn’t request this email, you can safely ignore it.</p>
        <p>Best regards,<br/>The 2FA-AUTH Team</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    background: '#f4f4f9',
    textAlign: "center" as const,
  },
  header: {
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    padding: '20px',
    borderRadius: '10px 10px 0 0',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  title: {
    color: 'white',
    fontSize: '24px',
  },
  content: {
    padding: '20px',
  },
  message: {
    fontSize: '16px',
    margin: '20px 0',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    color: 'white',
    background: 'linear-gradient(45deg, #764ba2, #667eea)',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'background 0.3s ease',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
    animation: 'pulse 2s infinite',
  },
  footer: {
    fontSize: '12px',
    color: '#666',
    marginTop: '20px',
  },
};

export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;


export default VerificationEmail;
