import { DateTime } from "luxon";
import { P, match } from "ts-pattern";

export const cleanDate = (
  date: Date | string | object | undefined | null
): Date | null => {
  const value = match(date)
    .with(P.string, (date: string) => {
      return DateTime.fromISO(date);
    })
    .with(P.instanceOf(Date), (date: Date) => {
      return DateTime.fromJSDate(date);
    })
    .otherwise(() => {
      return DateTime.fromObject(date as object);
    });

  if (value.isValid) {
    return value.toJSDate();
  }
  return null;
};

export const dateToString = (date: Date | string | object): string => {
  const cleanDate = match(date)
    .with(P.string, (date: string) => {
      return DateTime.fromISO(date);
    })
    .with(P.instanceOf(Date), (date: Date) => {
      return DateTime.fromJSDate(date);
    })
    .otherwise(() => {
      return DateTime.fromObject(date as object);
    });

  if (cleanDate.isValid) {
    return cleanDate.toLocaleString(DateTime.DATE_MED);
  }
  return "N/A";
};

export default dateToString;
