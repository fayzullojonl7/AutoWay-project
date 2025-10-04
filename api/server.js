import path from "path";
import fs from "fs";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data/db.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Если хочешь, чтобы маршрут /cars работал
    if (req.url === "/cars") {
      res.status(200).json(data.cars);
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load JSON" });
  }
}
