export const colors = {
  // Brand
  primary: "#E53935",
  primaryLight: "#FF6F60",

  // Text
  textPrimary: "#333333",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textOnPrimary: "#FFFFFF",
  textOnDark: "#FFFFFF",

  // Backgrounds
  background: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  backgroundTertiary: "#F0F0F0",

  // Surface (cards, elevated elements)
  surface: "#FFFFFF",
  surfaceShadow: "#000000",

  // Interactive
  favorite: "#E53935",
  favoriteInactive: "#999999",

  // Stat bar
  statHigh: "#4CAF50",
  statMedium: "#FFC107",
  statLow: "#F44336",
  statTrack: "#E0E0E0",

  // Feedback
  error: "#E53935",

  // Misc
  transparent: "transparent",
  typeDefault: "#777777",
  badgeFallback: "#777777",
} as const;

export const fontSizes = {
  xs: 11,
  sm: 12,
  body: 14,
  bodyLarge: 15,
  subtitle: 16,
  title: 17,
  sectionTitle: 18,
  heading: 20,
  displaySmall: 28,
  displayLarge: 48,
} as const;

export const fontWeights = {
  regular: "400" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  pill: 16,
  round: 10,
} as const;

export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  section: 32,
  screen: 40,
} as const;

export const iconSizes = {
  sm: 18,
  md: 24,
  lg: 32,
  xl: 56,
  emptyState: 48,
} as const;

export const imageSizes = {
  listThumbnail: 64,
  detailHero: 200,
} as const;
