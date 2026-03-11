import { useState, useCallback, useEffect } from "react";
import { fetchPokemonList } from "../api/pokemon";
import { PokemonListItem } from "../types/pokemon";
import { extractIdFromUrl } from "../utils/pokemon";

export interface PokemonListEntry {
  id: number;
  name: string;
}

const PAGE_SIZE = 20;
const MAX_ITEMS = 80;

export function usePokemonList() {
  const [pokemon, setPokemon] = useState<PokemonListEntry[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (pageOffset: number, isInitial: boolean) => {
    if (isInitial) setLoading(true);
    else setLoadingMore(true);
    setError(null);

    try {
      const data = await fetchPokemonList(pageOffset, PAGE_SIZE);
      setTotalCount(data.count);

      const entries: PokemonListEntry[] = data.results.map(
        (item: PokemonListItem) => ({
          id: extractIdFromUrl(item.url),
          name: item.name,
        })
      );

      setPokemon((prev) => (isInitial ? entries : [...prev, ...entries]));
      setOffset(pageOffset + PAGE_SIZE);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Pokemon");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(0, true);
  }, [loadPage]);

  const reachedLimit = pokemon.length >= MAX_ITEMS;

  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && offset < totalCount && !reachedLimit) {
      loadPage(offset, false);
    }
  }, [loadingMore, loading, offset, totalCount, reachedLimit, loadPage]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const data = await fetchPokemonList(0, PAGE_SIZE);
      setTotalCount(data.count);
      const entries: PokemonListEntry[] = data.results.map(
        (item: PokemonListItem) => ({
          id: extractIdFromUrl(item.url),
          name: item.name,
        })
      );
      setPokemon(entries);
      setOffset(PAGE_SIZE);
    } catch (err) {
      setPokemon([]);
      setOffset(0);
      setTotalCount(0);
      setError(err instanceof Error ? err.message : "Failed to load Pokemon");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const retry = useCallback(() => {
    setPokemon([]);
    setOffset(0);
    loadPage(0, true);
  }, [loadPage]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    pokemon,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMore: offset < totalCount && !reachedLimit,
    reachedLimit,
    loadMore,
    refresh,
    retry,
    clearError,
  };
}
