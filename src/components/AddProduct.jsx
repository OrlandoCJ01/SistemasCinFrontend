import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, number, price };

        try {
            await axios.post('http://localhost:8080/api/products', newProduct);
            alert('Product added successfully');
        } catch (err) {
            console.error(err);
            alert('Error adding product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Product Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <input
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
