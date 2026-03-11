import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritePokemon } from "../types/pokemon";

const STORAGE_KEY = "@pokedex_favorites";

interface FavoritesState {
  favorites: FavoritePokemon[];
  loaded: boolean;
}

type FavoritesAction =
  | { type: "LOAD"; payload: FavoritePokemon[] }
  | { type: "ADD"; payload: FavoritePokemon }
  | { type: "REMOVE"; payload: number };

interface FavoritesContextValue {
  favorites: FavoritePokemon[];
  loaded: boolean;
  addFavorite: (pokemon: FavoritePokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case "LOAD":
      return { favorites: action.payload, loaded: true };
    case "ADD":
      if (state.favorites.some((f) => f.id === action.payload.id)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.payload),
      };
    default:
      return state;
  }
}

function persistFavorites(favorites: FavoritePokemon[]): void {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(
    console.error
  );
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: [],
    loaded: false,
  });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        const parsed: FavoritePokemon[] = data ? JSON.parse(data) : [];
        dispatch({ type: "LOAD", payload: parsed });
      })
      .catch(() => {
        dispatch({ type: "LOAD", payload: [] });
      });
  }, []);

  const addFavorite = useCallback(
    (pokemon: FavoritePokemon) => {
      dispatch({ type: "ADD", payload: pokemon });
      persistFavorites([...state.favorites, pokemon]);
    },
    [state.favorites]
  );

  const removeFavorite = useCallback(
    (id: number) => {
      dispatch({ type: "REMOVE", payload: id });
      persistFavorites(state.favorites.filter((f) => f.id !== id));
    },
    [state.favorites]
  );

  const isFavorite = useCallback(
    (id: number) => state.favorites.some((f) => f.id === id),
    [state.favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        loaded: state.loaded,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
