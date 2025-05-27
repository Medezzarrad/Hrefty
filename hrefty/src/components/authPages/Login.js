import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div>
            <h2>Connexion</h2>
            {auth.error && <p style={{ color: 'red' }}>{auth.error.message}</p>}
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={handleSubmit}>Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
