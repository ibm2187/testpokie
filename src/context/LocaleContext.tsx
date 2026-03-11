import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "../i18n";

const STORAGE_KEY = "@pokedex_locale";
const SUPPORTED_LOCALES = ["en", "fr", "es"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

interface LocaleState {
  locale: SupportedLocale;
  loaded: boolean;
}

type LocaleAction =
  | { type: "LOAD"; payload: SupportedLocale }
  | { type: "SET_LOCALE"; payload: SupportedLocale };

interface LocaleContextValue {
  locale: SupportedLocale;
  loaded: boolean;
  setLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getDeviceLocale(): SupportedLocale {
  const deviceLang = getLocales()[0]?.languageCode ?? "en";
  if (SUPPORTED_LOCALES.includes(deviceLang as SupportedLocale)) {
    return deviceLang as SupportedLocale;
  }
  return "en";
}

function localeReducer(state: LocaleState, action: LocaleAction): LocaleState {
  switch (action.type) {
    case "LOAD":
      i18n.locale = action.payload;
      return { locale: action.payload, loaded: true };
    case "SET_LOCALE":
      i18n.locale = action.payload;
      return { ...state, locale: action.payload };
    default:
      return state;
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(localeReducer, {
    locale: "en",
    loaded: false,
  });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved && SUPPORTED_LOCALES.includes(saved as SupportedLocale)) {
          dispatch({ type: "LOAD", payload: saved as SupportedLocale });
        } else {
          dispatch({ type: "LOAD", payload: getDeviceLocale() });
        }
      })
      .catch(() => {
        dispatch({ type: "LOAD", payload: getDeviceLocale() });
      });
  }, []);

  const setLocale = useCallback((locale: SupportedLocale) => {
    dispatch({ type: "SET_LOCALE", payload: locale });
    AsyncStorage.setItem(STORAGE_KEY, locale).catch(console.error);
  }, []);

  const value = useMemo(
    () => ({ locale: state.locale, loaded: state.loaded, setLocale }),
    [state.locale, state.loaded, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
