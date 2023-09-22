import React from "react";

import { percentToString } from "~/lib/formatter/percentToString";

type Props = {
  value: number;
};

export const PercentFormat: React.FC<Props> = ({ value }) => {
  return <>{percentToString(value)}</>;
};

PercentFormat.defaultProps = {};

export default PercentFormat;
