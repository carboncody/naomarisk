export const sortStrings = (a: string, b: string) => a.localeCompare(b);
export const sortNumbers = (a: number, b: number) => a - b;

export function sortBy(type: 'number'): typeof sortNumbers;
export function sortBy(type: 'string'): typeof sortStrings;
export function sortBy(type: 'string' | 'number') {
  switch (type) {
    case 'number':
      return sortNumbers;
    case 'string':
      return sortStrings;
  }
}
