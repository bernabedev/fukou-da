import { readFileSync } from "fs";
import path from "path";

export default function loadAnimes() {
  const filePath = path.join(process.cwd(), "src", "app", "data", "animes.json");
  const animes = JSON.parse(readFileSync(filePath, "utf8"));
  return animes;
}
