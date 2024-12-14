import React, { useState, useEffect } from "react";

const Search = (props) => {
    const [filters, setFilters] = useState({
        'Store ID': "",
        'SKU': "",
        'Product Name': "",
        'Price': "",
        'Date': "",
    });

    const handleFilterChange = (event) => {
        let { name, value } = event.target;
        if (name === 'Date') {
            value = new Date(value)
        }
        const f = { ...filters, [name]: value }
        setFilters((prev) => ({ ...prev, [name]: value }));

        for (let key in f) {
            if (f[key] === "") {
                delete f[key];
            }
        }
        props.fetchRecords('POST', f)
    };

    return (
        <div>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    name="Store ID"
                    placeholder="Search by Store ID"
                    value={filters.storeId}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="SKU"
                    placeholder="Search by SKU"
                    value={filters.sku}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="Product Name"
                    placeholder="Search by Product Name"
                    value={filters.productName}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="Price"
                    placeholder="Search by Price"
                    value={filters.price}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="Date"
                    placeholder="From Date"
                    value={filters.date}
                    onChange={handleFilterChange}
                />
            </div>
            <div>
                <button onClick={() => {
                    const emptyF = {
                        'Store ID': "",
                        'SKU': "",
                        'Product Name': "",
                        'Price': "",
                        'Date': "",
                    }

                    setFilters(emptyF)
                    props.fetchRecords({ method: 'GET' })
                }
                }>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Search;
