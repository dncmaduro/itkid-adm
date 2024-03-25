export function convert(source: any, target: any) {
  if (source) {
    Object.keys(source).forEach((key) => {
      target[key] = source[key];
    });
  }
}
