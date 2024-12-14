import React, { useState, useEffect } from "react";
import Search from "./Search";

const InventoryTable = (props) => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editedRecord, setEditedRecord] = useState({});


    const fetchRecords = async (method = 'GET', reqBody = '') => {
        try {
            const options = {
                method,
                headers: { 'Content-Type': 'application/json' },
            }
            if (method === 'POST') {
                options.body = JSON.stringify(reqBody)
            }
            const response = await fetch("http://localhost:5000/api/products", {
                ...options
            });
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data);
        } catch (error) {
            props.showToast("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleEdit = (id) => {
        setEditRowId(id);
        const recordToEdit = records.find((record) => record._id === id);
        setEditedRecord({ ...recordToEdit });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedRecord((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${editRowId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedRecord),
            });

            if (response.ok) {
                const updatedRecord = await response.json();
                setEditRowId(null)
                props.showToast("Successfully Updated - " + updatedRecord['SKU'] + ' ' + updatedRecord['Product Name']);
                fetchRecords();
            } else {
                props.showToast("Failed to save changes.");
            }
        } catch (error) {
            props.showToast("Error saving changes:", error);
        }
    };

    const handleCancel = () => {
        setEditRowId(null);
        setEditedRecord({});
    };

    return (
        <div>
            <h1>Store Inventory Management</h1>
            <Search {...props} setRecords={setFilteredRecords} fetchRecords={fetchRecords} />
            <table border="1" cellPadding="10" style={{ width: '80vw' }}>
                <thead>
                    <tr>
                        <th>Store ID</th>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record) => (
                        <tr key={record._id}>
                            {editRowId === record._id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            id="storeId"
                                            name="Store ID"
                                            value={editedRecord['Store ID'] || ""}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="sku"
                                            name="SKU"
                                            value={editedRecord['SKU'] || ""}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            id="productName"
                                            name="Product Name"
                                            value={editedRecord['Product Name'] || ""}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            id="price"
                                            name="Price"
                                            value={editedRecord['Price'] || ""}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            id="date"
                                            name="Date"
                                            value={editedRecord['Date'] ? editedRecord['Date'].split("T")[0] : ""}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{record['Store ID']}</td>
                                    <td>{record['SKU']}</td>
                                    <td>{record['Product Name']}</td>
                                    <td>{record['Price']}</td>
                                    <td>{new Date(record['Date']).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(record._id)}>Edit</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
