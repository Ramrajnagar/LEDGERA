import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, MapPin, User, Hash } from 'lucide-react';
import './OrderPage.css';

export default function OrderPage() {
    const { createOrder, loading } = useApp();
    const [formData, setFormData] = useState({
        order_id: `ORD-${Date.now()}`,
        product: '',
        quantity: 1,
        destination: '',
        customer_name: ''
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        try {
            const response = await createOrder(formData);
            setResult(response);

            // Reset form
            setFormData({
                order_id: `ORD-${Date.now()}`,
                product: '',
                quantity: 1,
                destination: '',
                customer_name: ''
            });
        } catch (err) {
            setError(err.message || 'Failed to create order');
        }
    };

    return (
        <div className="order-page-container">
            <h1 className="gradient-text">Create New Order</h1>

            <div className="order-layout">
                <div className="order-form-section card">
                    <h2>Order Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <Hash size={18} />
                                Order ID
                            </label>
                            <input
                                type="text"
                                name="order_id"
                                value={formData.order_id}
                                onChange={handleChange}
                                className="input"
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Package size={18} />
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g., Electronics, Furniture, Clothing"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Package size={18} />
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="input"
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <MapPin size={18} />
                                Destination
                            </label>
                            <input
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g., New York, London, Tokyo"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <User size={18} />
                                Customer Name
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleChange}
                                className="input"
                                placeholder="Enter customer name"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Create Order'}
                        </button>
                    </form>

                    {error && (
                        <div className="message error-message">
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {result && (
                    <div className="order-result-section card">
                        <h2>Order Result</h2>
                        <div className="result-content">
                            <div className="result-item">
                                <strong>Status:</strong>
                                <span className={`status-badge ${result.status}`}>
                                    {result.status}
                                </span>
                            </div>
                            <div className="result-item">
                                <strong>Order ID:</strong>
                                <span>{result.order_id}</span>
                            </div>
                            <div className="result-item">
                                <strong>Message:</strong>
                                <span>{result.message}</span>
                            </div>
                            {result.trust_score && (
                                <div className="result-item">
                                    <strong>Trust Score:</strong>
                                    <span className="trust-score-value">{result.trust_score}</span>
                                </div>
                            )}
                            {result.workflow_result && (
                                <div className="result-item full-width">
                                    <strong>Workflow Result:</strong>
                                    <pre className="workflow-output">{result.workflow_result}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
