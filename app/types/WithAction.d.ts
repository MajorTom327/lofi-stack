type WithAction =
  | { to: string; onClick?: never }
  | { to?: never; onClick: () => void };
