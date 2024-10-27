interface ResetForgotPasswordProps {
  confirmationUrl: string;
}

const ResetForgotPassword: React.FC<ResetForgotPasswordProps> = ({ confirmationUrl }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reset Your Password</h1>
      </div>
      <div style={styles.content}>
        <p style={styles.message}>
          It looks like you requested a password reset. Click the button below to reset your password.
        </p>
        <a href={confirmationUrl} style={styles.button}>Reset Password</a>
      </div>
      <footer style={styles.footer}>
        <p>If you didn`&apos;`t request a password reset, please ignore this email.</p>
        <p>Best regards,<br />The Support Team</p>
      </footer>
    </div>
  );
};

// Styles with keyframes and animations inline
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    background: '#f8f9fa',
    textAlign: 'center' as const,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
    padding: '20px',
    borderRadius: '10px 10px 0 0',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  title: {
    color: 'white',
    fontSize: '24px',
    margin: 0,
  },
  content: {
    padding: '20px',
  },
  message: {
    fontSize: '16px',
    margin: '20px 0',
    color: '#555',
  },
  button: {
    display: 'inline-block',
    padding: '10px 25px',
    color: '#fff',
    background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
    animation: 'pulse 2s infinite',
  },
  footer: {
    fontSize: '12px',
    color: '#888',
    marginTop: '20px',
    lineHeight: '1.5',
  },
};

// CSS keyframes for animations
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

export default ResetForgotPassword;
