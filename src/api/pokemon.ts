import { PokemonListResponse, PokemonDetail } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }
  return response.json();
}

export async function fetchPokemonDetail(
  id: number
): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon #${id}: ${response.status}`);
  }
  return response.json();
}
