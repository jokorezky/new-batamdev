export function cleanInput(input: any): any {
  if (Array.isArray(input)) {
    return input.map((item) => cleanInput(item));
  } else if (typeof input === 'object' && input !== null) {
    const { __typename, ...rest } = input;
    return Object.keys(rest).reduce((acc, key) => {
      acc[key] = cleanInput(rest[key]);
      return acc;
    }, {} as any);
  }
  return input;
}
