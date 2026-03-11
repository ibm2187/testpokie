import { useState, useEffect, useCallback } from "react";
import { fetchPokemonDetail } from "../api/pokemon";
import { PokemonDetail } from "../types/pokemon";

export function usePokemonDetail(id: number) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPokemonDetail(id);
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Pokemon");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { pokemon, loading, error, retry: load };
}
