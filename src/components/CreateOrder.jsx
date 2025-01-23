import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateOrder = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [units, setUnits] = useState(1);
    const [bonus, setBonus] = useState(0);
    const [promo, setPromo] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Cargar productos
        axios.get('http://localhost:8080/api/products')
            .then((response) => setProducts(response.data));
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setTotalPrice(selectedProduct.price * (units + bonus + promo));
        }
    }, [selectedProduct, units, bonus, promo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            product: { id: selectedProduct.id },
            units,
            bonus,
            promo,
        };

        try {
            await axios.post('http://localhost:8080/api/orders', order);
            alert('Order created successfully');
        } catch (err) {
            console.error(err);
            alert('Error creating order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => setSelectedProduct(JSON.parse(e.target.value))}>
                <option>Select Product</option>
                {products.map((product) => (
                    <option key={product.id} value={JSON.stringify(product)}>
                        {product.name} - {product.price} USD
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
            />
            <input
                type="number"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
            />
            <input
                type="number"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
            />
            <p>Total Price: {totalPrice}</p>
            <button type="submit">Create Order</button>
        </form>
    );
};

export default CreateOrder;
