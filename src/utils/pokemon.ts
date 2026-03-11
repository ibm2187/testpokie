const OFFICIAL_ARTWORK_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export function extractIdFromUrl(url: string): number {
  const segments = url.replace(/\/$/, "").split("/");
  return parseInt(segments[segments.length - 1], 10);
}

export function getOfficialArtworkUrl(id: number): string {
  return `${OFFICIAL_ARTWORK_BASE}/${id}.png`;
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

export function formatHeight(decimeters: number): string {
  const meters = decimeters / 10;
  return `${meters.toFixed(1)} m`;
}

export function formatWeight(hectograms: number): string {
  const kg = hectograms / 10;
  return `${kg.toFixed(1)} kg`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatStatName(name: string): string {
  const map: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP.ATK",
    "special-defense": "SP.DEF",
    speed: "SPD",
  };
  return map[name] ?? name.toUpperCase();
}
