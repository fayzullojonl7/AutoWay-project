"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = "https://687775f6dba809d901ef7773.mockapi.io/users";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("Введите имя пользователя и пароль!");
      return;
    }

    try {
      const allUsers = await axios.get(BASE_URL);
      const existingUser = allUsers.data.find((u) => u.username === username);

      if (existingUser) {
        setMessage("Пользователь уже существует!");
        return;
      }
      await axios.post(BASE_URL, { username, password });
      setMessage("Регистрация успешна! Можно войти.");
      setUsername("");
      setPassword("");
      router.push("/login");
    } catch (err) {
      console.error(err);
      setMessage("Ошибка регистрации");
    }
  };

  return (
    <div className="pt-[150px]">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 block"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 block"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Зарегистрироваться
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
