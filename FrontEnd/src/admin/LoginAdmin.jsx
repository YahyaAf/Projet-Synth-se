import React, { useState } from 'react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    mot_de_passe: password
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const token = data.token;
            // Store the token in local storage or context for future authenticated requests
            console.log('Login successful. Token:', token);
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLogin;