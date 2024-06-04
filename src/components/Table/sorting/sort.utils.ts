export const sortStrings = (a: string, b: string) => {
  const aNum = parseFloat(a);
  const bNum = parseFloat(b);

  if (!isNaN(aNum) && !isNaN(bNum)) {
    return aNum - bNum;
  }

  return a.localeCompare(b);
};

export const sortNumbers = (a: number, b: number) => a - b;

export function sortBy(type: 'number'): typeof sortNumbers;
export function sortBy(type: 'string'): typeof sortStrings;
export function sortBy(type: 'string' | 'number') {
  switch (type) {
    case 'number':
      return sortNumbers;
    case 'string':
      return sortStrings;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unsupported sort type: ${type}`);
  }
}
