import React, { useState } from 'react';
import Papa from 'papaparse';

const Upload = (props) => {
    const [file, setFile] = useState(null);

    // Handle file input change
    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            // Validate file type
            if (uploadedFile.type !== 'text/csv') {
                alert('Please upload a valid CSV file.');
                setFile(null);
                return;
            }
            setFile(uploadedFile);
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        if (!file) {
            alert('Please upload a CSV file first.');
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (result) => {
                const parsedData = result.data;

                try {
                    const response = await fetch('http://localhost:5000/api/products/upload', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(parsedData),
                    });

                    if (response.ok) {
                        const resData = await response.json();
                        props.showToast('Response:' + resData.count + ' ' + resData.message);
                    } else {
                        const errorData = await response.json();
                        props.showToast('Error uploading data: ' + errorData.error);
                    }
                } catch (error) {
                    props.showToast('Failed to upload CSV data. ' + error)
                }
            },
            error: (error) => {
                props.showToast('Error parsing CSV:' + error);
            },
        });
    };


    return (
        <div style={styles.container}>
            <h2>{'Upload CSV'}</h2>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.button}>
                {'Submit'}
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    input: {
        margin: '10px 0',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    output: {
        marginTop: '20px',
        textAlign: 'left',
        fontSize: '14px',
        whiteSpace: 'pre-wrap',
    },
};

export default Upload;
