export interface Style {
  height?: string;
}

export type OptionType<L = string, V = string> = {
  label: L;
  value: V;
};
