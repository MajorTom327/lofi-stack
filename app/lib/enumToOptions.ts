export type SelectOption = {
  value: string;
  label: string;
};

export const enumToOption = (e: Record<string, any>): SelectOption[] => {
  return Object.keys(e).map((key) => ({
    value: e[key],
    label: key,
  }));
};

export default enumToOption;
