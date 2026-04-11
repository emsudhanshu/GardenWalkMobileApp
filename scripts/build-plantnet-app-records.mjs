import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../src/data");
const speciesNamesPath = path.join(dataDir, "plantnet300K_species_names.json");
const outputPath = path.join(dataDir, "plantnetAppRecords.json");

const STATIC_PLANT_IMAGE =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80";

const speciesNames = JSON.parse(fs.readFileSync(speciesNamesPath, "utf8"));

function formatSpeciesName(rawName) {
  return rawName
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const records = Object.entries(speciesNames)
  .sort(([, speciesNameA], [, speciesNameB]) => speciesNameA.localeCompare(speciesNameB))
  .map(([speciesId, rawSpeciesName], index) => {
    return {
      id: index + 1,
      speciesId,
      speciesName: formatSpeciesName(rawSpeciesName),
      detectedAt: new Date(2026, 3, 10 - (index % 12), 8 + (index % 8), 15).toISOString(),
      latitude: 40.7128 + (index % 20) * 0.01,
      longitude: -74.006 + (index % 18) * 0.012,
      image: STATIC_PLANT_IMAGE,
      notes: `PlantNet species entry for ${formatSpeciesName(rawSpeciesName)}.`,
    };
  });

fs.writeFileSync(outputPath, `${JSON.stringify(records, null, 2)}\n`);

console.log(`Wrote ${records.length} species records to ${outputPath}`);
