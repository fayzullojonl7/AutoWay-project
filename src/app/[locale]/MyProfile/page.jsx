"use client";

import React, { useState } from "react";

const FakeProfilePage = () => {
  const [user, setUser] = useState({
    name: "Fayzullo Kholnazarov",
    username: "@fayzullo18",
    email: "fayzullo@example.com",
    phone: "+992 90 123 45 67",
    location: "Dushanbe, Tajikistan",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Люблю машины, программирование и новые технологии.",
  });

  const [editMode, setEditMode] = useState(false);

  const [posts] = useState([
    {
      id: 1,
      title: "Моя BMW M4",
      image:
        "https://i.pinimg.com/1200x/fb/b3/ef/fbb3efbd9700c76531151aaab3bd0ef7.jpg",
    },
    {
      id: 2,
      title: "Tesla Model S",
      image:
        "https://i.pinimg.com/1200x/0c/a4/a9/0ca4a99c516a9cd6cb596735f169adfb.jpg",
    },
    {
      id: 3,
      title: "Audi RS7",
      image:
        "https://i.pinimg.com/1200x/03/c2/31/03c23143ad1b2f70543b9d9b61538b25.jpg",
    },
  ]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Профиль обновлён (фейк 😎)");
    setEditMode(false);
  };

  return (
    <div className="min-h-screen px-[20px]  pb-10 mt-[100px]">
      {/* Profile Card */}
      <div className="bg-white dark:bg-[#ffffff2b] shadow-lg rounded-2xl max-w-3xl mx-auto p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="flex-1 w-full">
          {!editMode ? (
            <>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.username}</p>
              <p className="mt-2">{user.bio}</p>
              <p className="mt-2 text-gray-500">📍 {user.location}</p>
              <p className="text-gray-500">✉ {user.email}</p>
              <p className="text-gray-500">📞 {user.phone}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Редактировать
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="Имя"
              />
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="Имя пользователя"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="Телефон"
              />
              <input
                type="text"
                name="location"
                value={user.location}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="Локация"
              />
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                placeholder="Биография"
              />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex-1"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-1"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-3xl mx-auto mt-10">
        <h3 className="text-2xl font-bold mb-4">Мои автомобили</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-[#ffffff2b] rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold">{post.title}</h4>
                <p className="text-gray-500 text-sm">Описание автомобиля</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FakeProfilePage;
