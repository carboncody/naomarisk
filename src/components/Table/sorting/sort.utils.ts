export const sortStrings = (a: string, b: string) => a.localeCompare(b);
export const sortNumbers = (a: number, b: number) => a - b;
export const sortDates = (a: Date, b: Date) => a.getTime() - b.getTime();

export function sortBy(type: 'number'): typeof sortNumbers;
export function sortBy(type: 'string'): typeof sortStrings;
export function sortBy(type: 'date'): typeof sortDates;
export function sortBy(type: 'string' | 'number' | 'date') {
  switch (type) {
    case 'number':
      return sortNumbers;
    case 'string':
      return sortStrings;
    case 'date':
      return sortDates;
  }
}
