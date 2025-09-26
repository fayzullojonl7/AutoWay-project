"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = "https://687775f6dba809d901ef7773.mockapi.io/users";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}?username=${username}&password=${password}`
      );
      if (res.data.length > 0) {
        setMessage("Успешный вход! 🚀");
        router.push("/");
      } else {
        setMessage("Неверные данные");
      }
    } catch (err) {
      console.error(err);
      setMessage("Ошибка входа");
    }
  };

  return (
    <div className="pt-[150px]">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2"
      >
        Войти
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
