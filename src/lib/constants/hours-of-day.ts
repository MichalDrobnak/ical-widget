export const START_HOUR = 7;
export const END_HOUR = 20;
export const HOURS = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => i + START_HOUR,
);
