export interface SelectOption {
  value: unknown;
  label: string;
}

export const enumToOption = (e: Record<string, unknown>): SelectOption[] => {
  return Object.keys(e).map((key) => ({
    value: e[key],
    label: key,
  }));
};

export default enumToOption;
