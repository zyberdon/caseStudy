import React from 'react';

const LandingPage = () => {
    return (
        <main style={styles.container}>
            <h2 style={styles.heading}>{'Welcome to Store Inventory Management'}</h2>
            <button style={styles.button} onClick={() => alert('Redirecting to Dashboard...')}>
                {'Get Started'}
            </button>
        </main>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '28px',
        color: '#333',
    },
    paragraph: {
        fontSize: '18px',
        color: '#666',
        margin: '20px 0',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default LandingPage;
