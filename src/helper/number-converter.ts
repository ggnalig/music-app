export const convertNumber = (value: number) => {
  const language = 'id';

  return Intl.NumberFormat(language, {notation: "compact"}).format(value);
}