type WithAction =
  | { to: string; onClick?: never }
  | { to?: never; onClick: () => void }
  | { to?: never; onClick?: never };

export enum Currencies {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  CAD = "CAD",
}

type Currency = keyof typeof Currencies;
