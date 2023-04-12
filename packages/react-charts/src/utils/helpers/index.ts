export function isEmpty(value : string | object | number | undefined | null) {
  return value === undefined ||
          value === null ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0);
}
