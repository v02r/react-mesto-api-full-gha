import React, {useState} from "react";

const Login = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            return;
        }
        onLogin({email, password});
    };

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h1 className="auth__title">Вход</h1>
                <input
                    id="email"
                    name="email"
                    className="auth__input"
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    id="password"
                    name="password"
                    className="auth__input"
                    type="password"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button className="auth__button">Войти</button>
            </form>
        </div>
    );
};

export default Login;
