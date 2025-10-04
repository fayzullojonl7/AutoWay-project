"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AddPage = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Cars"); // сразу для машин
  const [step, setStep] = useState(1);

  // Авто
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [gearBox, setGearBox] = useState("");
  const [drive, setDrive] = useState("");
  const [power, setPower] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [turbo, setTurbo] = useState(false);
  const [cardCover, setCardCover] = useState("");
  const [description, setDescription] = useState("");

  // Car images
  const imageParts = [
    "Передняя часть",
    "Задняя часть",
    "Левый бок",
    "Правый бок",
    "Салон",
    "Мотор",
  ];
  const [carImages, setCarImages] = useState(Array(imageParts.length).fill(""));
  const [showInput, setShowInput] = useState(
    Array(imageParts.length).fill(false)
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/data");
        setData(res.data.categories || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleImageChange = (index, url) => {
    const newImages = [...carImages];
    newImages[index] = url;
    setCarImages(newImages);

    const newShowInput = [...showInput];
    newShowInput[index] = false;
    setShowInput(newShowInput);
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const newData = [...data];
      const cat = newData.find((c) => c.name === "Cars");

      const vehicleName = `${brandName} ${modelName}`;

      let carBrand = cat.brands.find((b) => b.brand === brandName);
      if (!carBrand) {
        carBrand = { brandId: Date.now(), brand: brandName, models: [] };
        cat.brands.push(carBrand);
      }

      let carModel = carBrand.models.find((m) => m.name === modelName);
      if (!carModel) {
        carModel = {
          id: Date.now(),
          name: modelName,
          prevImg: cardCover,
          vehicles: [],
        };
        carBrand.models.push(carModel);
      }

      carModel.vehicles.push({
        id: Date.now(),
        name: vehicleName,
        year,
        fuelType,
        gearBox,
        drive,
        power,
        turbo,
        mileage,
        price,
        cardCover,
        carImages,
        description,
      });

      await axios.put("http://localhost:3000/data", { categories: newData });
      setData(newData);
      alert("Машина добавлена!");
      resetForm();
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setBrandName("");
    setModelName("");
    setYear("");
    setFuelType("");
    setGearBox("");
    setDrive("");
    setPower("");
    setMileage("");
    setPrice("");
    setTurbo(false);
    setCardCover("");
    setCarImages(Array(imageParts.length).fill(""));
    setShowInput(Array(imageParts.length).fill(false));
    setDescription("");
  };

  return (
    <div className="min-h-screen px-[20px]">
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="motionDiv1 md:min-h-screen pt-[60px] flex  items-center justify-center  mx-auto"
          >
            <div className="forBlur2 flex items-center justify-between w-[70%] rounded-[30px] min-h-[600px] bg-white dark:bg-[#ffffff34] overflow-hidden">
              <div>
                <img
                  src="/images/AddPage/slide1.png"
                  alt=""
                  className="h-[600px]"
                />
              </div>
              <div className="flex flex-col items-center px-[50px]">
                <h2 className="text-3xl mb-6">Выбор бренда и модели</h2>
                <select
                  value={brandName}
                  onChange={(e) => {
                    setBrandName(e.target.value);
                    setModelName("");
                  }}
                  className="w-[300px] p-2 border rounded mb-2"
                >
                  <option value="">Выберите бренд</option>
                  {data
                    .find((c) => c.name === "Cars")
                    ?.brands.map((b) => (
                      <option key={b.brandId} value={b.brand}>
                        {b.brand}
                      </option>
                    ))}
                </select>

                <select
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  disabled={!brandName}
                  className=" w-[300px] p-2 border rounded mb-2 "
                >
                  <option value="">Выберите модель</option>
                  {brandName &&
                    data
                      .find((c) => c.name === "Cars")
                      ?.brands.find((b) => b.brand === brandName)
                      ?.models.map((m) => (
                        <option key={m.id} value={m.name}>
                          <div>{m.name}</div>
                        </option>
                      ))}
                </select>

                <button
                  onClick={() => setStep(2)}
                  disabled={!brandName || !modelName}
                  className="mt-4 bg-blue-600 text-white p-3 rounded"
                >
                  Далее
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="motionDiv1 min-h-screen pt-[60px] flex  items-center justify-center  mx-auto"
          >
            <div className="forBlur2 w-[70%] rounded-[30px] min-h-[600px] bg-white dark:bg-[#ffffff34] p-6">
              <h2 className="text-3xl mb-6 ">Шаг 2: Характеристики</h2>

              <input
                type="text"
                placeholder="Мощность"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-[300px] p-2 border rounded mb-2 "
              />
              <select
                value={drive}
                onChange={(e) => setDrive(e.target.value)}
                className="w-[300px]  p-2 border rounded mb-2"
              >
                <option value="">Привод</option>
                <option value="AWD">Полный (AWD)</option>
                <option value="FWD">Передний (FWD)</option>
                <option value="RWD">Задний (RWD)</option>
              </select>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-[300px]  p-2 border rounded mb-2"
              >
                <option value="">Топливо</option>
                <option value="Бензин">Бензин</option>
                <option value="Дизель">Дизель</option>
                <option value="Электро">Электро</option>
              </select>
              <select
                value={gearBox}
                onChange={(e) => setGearBox(e.target.value)}
                className="w-[300px]  p-2 border rounded mb-2"
              >
                <option value="">Коробка передач</option>
                <option value="AT">Автомат</option>
                <option value="MT">Механика</option>
              </select>

              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={turbo}
                  onChange={(e) => setTurbo(e.target.checked)}
                  id="turbo"
                />
                <label htmlFor="turbo" className="">
                  Турбо
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-500  p-3 rounded"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 p-3 rounded"
                >
                  Далее
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="motionDiv1 min-h-screen pt-[60px] flex  items-center justify-center  mx-auto"
          >
            <div className="forBlur2 w-[70%] rounded-[30px] min-h-[600px] bg-white dark:bg-[#ffffff34] p-6">
              <h2 className="text-3xl mb-6">Шаг 3: Фото</h2>
              <input
                type="text"
                placeholder="Ссылка на обложку"
                value={cardCover}
                onChange={(e) => setCardCover(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex flex-wrap gap-4">
                {imageParts.map((label, idx) => (
                  <div key={idx} className="relative w-[100px] h-[100px] mb-2">
                    {carImages[idx] ? (
                      <>
                        <img
                          src={carImages[idx]}
                          alt={label}
                          className="w-full h-full object-cover rounded"
                        />

                        <div
                          className="absolute top-0 left-0 w-full h-full bg-[#0000004f] bg-opacity-50 flex items-center justify-center rounded cursor-pointer"
                          onClick={() => {
                            const newShowInput = [...showInput];
                            newShowInput[idx] = true;
                            setShowInput(newShowInput);
                          }}
                        >
                          <div className=" text-sm flex flex-col items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                            <p>Change</p>
                          </div>
                        </div>
                      </>
                    ) : showInput[idx] ? (
                      <input
                        type="text"
                        placeholder={`Ссылка на ${label}`}
                        className="w-full h-full p-2 border rounded"
                        onBlur={(e) => handleImageChange(idx, e.target.value)}
                      />
                    ) : (
                      <button
                        onClick={() => {
                          const newShowInput = [...showInput];
                          newShowInput[idx] = true;
                          setShowInput(newShowInput);
                        }}
                        className="w-full h-full border-2 border-dashed bg-blue-500 text-white rounded"
                      >
                        {label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-500 text-white p-3 rounded"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="bg-blue-600 text-white p-3 rounded"
                >
                  Далее
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="motionDiv1 min-h-screen pt-[60px] flex  items-center justify-center  mx-auto"
          >
            <div className="forBlur2 w-[70%] rounded-[30px] min-h-[600px] bg-white dark:bg-[#ffffff34] p-6">
              <h2 className="text-3xl mb-6">Шаг 4: Данные</h2>
              <input
                type="text"
                placeholder="Год выпуска"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Пробег"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setStep(3)}
                  className="bg-gray-500  p-3 rounded"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="bg-blue-600  p-3 rounded"
                >
                  Далее
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="motionDiv1 min-h-screen pt-[60px] flex  items-center justify-center  mx-auto"
          >
            <div className="forBlur2 w-[70%] rounded-[30px] min-h-[600px] bg-white dark:bg-[#ffffff34] p-6">
              <h2 className="text-3xl mb-6">Шаг 5: Подтверждение</h2>
              <button
                className="bg-[#5252ff] p-3 rounded"
                onClick={handleAdd}
                disabled={isLoading}
              >
                {isLoading ? "Добавление..." : "Добавить"}
              </button>
              <button
                onClick={() => setStep(4)}
                className="mt-4 bg-gray-500  p-3 rounded"
              >
                Назад
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddPage;
