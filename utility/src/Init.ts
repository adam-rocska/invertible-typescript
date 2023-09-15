export type Init<Tuple extends any[]> =
  Tuple extends [...infer Init, any]
  ? Init
  : [];
