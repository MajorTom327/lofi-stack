import zod from "zod";
import { Currencies } from "~/types/refs";

const optionSchema = zod.object({
  currency: zod.nativeEnum(Currencies).optional().default(Currencies.USD),
  minimumFractionDigits: zod.number().optional().default(2),
  maximumFractionDigits: zod.number().optional().default(2),
});

export const moneyToString = (value: number, options?: Object): string => {
  let cleanOptions = optionSchema.parse(options ?? {});

  return value.toLocaleString(undefined, {
    style: "currency",
    currency: cleanOptions.currency,
    minimumFractionDigits: cleanOptions.minimumFractionDigits,
    maximumFractionDigits: cleanOptions.maximumFractionDigits,
  });
};

export default moneyToString;
