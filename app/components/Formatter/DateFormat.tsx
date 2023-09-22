import React from "react";

import dateToString from "~/lib/formatter/dateToString";

type Props = {
  value: Date | string | object;
};

export const DateFormat: React.FC<Props> = ({ value }) => {
  return <>{dateToString(value)}</>;
};

DateFormat.defaultProps = {};

export default DateFormat;
