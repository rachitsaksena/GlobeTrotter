export function getRandomDatum<T>(data: T[]): T | null {
  return data[Math.floor(Math.random() * data.length)] ?? null;
}
