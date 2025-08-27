import React, { useState } from "react";
import "./Authentication.scss";
import { FcGoogle } from "react-icons/fc";
import AuthContext, { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const { register, signIn, signInWithGoogle } = useAuth(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  function resetState() {
    setEmail("");
    setPassword("");
    nav("/");
  }
  async function handleRegister() {
    if (!email || !password) {
      alert("Введите email и пароль");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Введите корректный email");
      return;
    }
    try {
      await register(email, password);
      resetState();
    } catch (err) {
      console.error(err.message);
      alert("Ошибка регистрации: " + err.message);
    }
  }

  async function handleSingIn() {
    if (!email || !password) {
      alert("Введите email и пароль");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Введите корректный email");
      return;
    }
    try {
      await signIn(email, password);
      resetState();
    } catch (err) {
      console.error(err.message);
      alert("Ошибка входа: " + err.message);
    }
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Добро пожаловать</h2>
        <div className="auth__form">
          <input
            type="email"
            placeholder="Email"
            className="auth__input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth__input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="auth__btn auth__btn--login" onClick={handleSingIn}>
            Войти
          </button>
          <button
            className="auth__btn auth__btn--register"
            onClick={handleRegister}
          >
            Регистрация
          </button>
          <button
            className="auth__btn auth__btn--google"
            onClick={() => {
              signInWithGoogle();
              nav("/");
            }}
          >
            <FcGoogle size={20} />
            <span>Войти через Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
