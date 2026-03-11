import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from "./en";
import fr from "./fr";
import es from "./es";

const i18n = new I18n({ en, fr, es });

i18n.defaultLocale = "en";
i18n.enableFallback = true;

// Set locale from device settings
const deviceLocale = getLocales()[0]?.languageCode ?? "en";
i18n.locale = deviceLocale;

export default i18n;
