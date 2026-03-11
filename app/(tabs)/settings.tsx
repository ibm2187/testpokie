import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocale, SupportedLocale } from "../../src/context/LocaleContext";
import { colors, fontSizes, fontWeights, spacing, iconSizes } from "../../src/theme";
import i18n from "../../src/i18n";

const LANGUAGES: { code: SupportedLocale; nativeName: string; translationKey: string }[] = [
  { code: "en", nativeName: "English", translationKey: "settings.english" },
  { code: "fr", nativeName: "Français", translationKey: "settings.french" },
  { code: "es", nativeName: "Español", translationKey: "settings.spanish" },
];

export default function SettingsScreen() {
  const { locale, setLocale } = useLocale();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{i18n.t("settings.language")}</Text>
      <View style={styles.card}>
        {LANGUAGES.map((lang, index) => {
          const isSelected = locale === lang.code;
          const isLast = index === LANGUAGES.length - 1;

          return (
            <Pressable
              key={lang.code}
              style={({ pressed }) => [
                styles.row,
                !isLast && styles.rowBorder,
                pressed && styles.rowPressed,
              ]}
              onPress={() => setLocale(lang.code)}
            >
              <View style={styles.labelContainer}>
                <Text style={styles.nativeName}>{lang.nativeName}</Text>
                <Text style={styles.translatedName}>{i18n.t(lang.translationKey)}</Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark" size={iconSizes.md} color={colors.primary} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    paddingTop: spacing.xxl,
  },
  sectionHeader: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: spacing.lg,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.statTrack,
  },
  rowPressed: {
    backgroundColor: colors.backgroundSecondary,
  },
  labelContainer: {
    flex: 1,
  },
  nativeName: {
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  translatedName: {
    fontSize: fontSizes.body,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
});
