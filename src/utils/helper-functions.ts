export function fixRounding(value: number, precision: number): number {
  var power = Math.pow(10, precision);
  return Math.round(value * power) / power;
}

export const discoundPrice = (
  price: number,
  discountPercentage: number
): string => {
  const disPrice = price * ((100 - discountPercentage) / 100);

  return fixRounding(disPrice, 2).toString();
};
