export enum ColorsEnum {
  primary = "#1d3557",
  secondary = "#457b9d",
  accent = "#a8dadc",
  neutral = "#f1faee",

  info = "#2094f3",
  success = "#009485",
  warning = "#ff9900",
  error = "#ff5724",

  light = "#f1faee",
  dark = "#1d3557",
}

type Color = keyof typeof ColorsEnum;

export enum Currencies {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  CAD = "CAD",
}

type Currency = keyof typeof Currencies;

type WithAction =
  | { to: string; onClick?: never }
  | { to?: never; onClick: () => void }
  | { to?: never; onClick?: never };
