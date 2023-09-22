import React from "react";
import type { Currency } from "~/types/refs";

import { moneyToString } from "~/lib/formatter/moneyToString";

type Props = {
  value: number;
  currency?: Currency;
};

export const MoneyFormat: React.FC<Props> = ({ value, currency }) => {
  return <>{moneyToString(value, { currency })}</>;
};

MoneyFormat.defaultProps = {};

export default MoneyFormat;
