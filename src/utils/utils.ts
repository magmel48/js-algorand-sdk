import JSONbigWithoutConfig from 'json-bigint';

const JSONbig = JSONbigWithoutConfig({ useNativeBigInt: true, strict: true });

interface JSONOptions {
  intDecoding: 'default' | 'safe' | 'mixed' | 'bigint';
}

/**
 * Parse JSON with additional options.
 * @param str The JSON string to parse.
 * @param options Parsing options.
 * @param options.intDecoding Configure how integers in
 *   this request's JSON response will be decoded.
 *
 *   The options are:
 *   * "default": All integers will be decoded as Numbers, meaning any values greater than
 *     Number.MAX_SAFE_INTEGER will lose precision.
 *   * "safe": All integers will be decoded as Numbers, but if any values are greater than
 *     Number.MAX_SAFE_INTEGER an error will be thrown.
 *   * "mixed": Integers will be decoded as Numbers if they are less than or equal to
 *     Number.MAX_SAFE_INTEGER, otherwise they will be decoded as BigInts.
 *   * "bigint": All integers will be decoded as BigInts.
 *
 *   Defaults to "default" if not included.
 */
export function parseJSON(str: string, options?: JSONOptions) {
  const intDecoding =
    options && options.intDecoding ? options.intDecoding : 'default';
  const parsed = JSONbig.parse(str, (_, value) => {
    if (
      value != null &&
      typeof value === 'object' &&
      Object.getPrototypeOf(value) == null
    ) {
      // for some reason the Objects returned by JSONbig.parse have a null prototype, so we
      // need to fix that.
      Object.setPrototypeOf(value, Object.prototype);
    }

    if (typeof value === 'bigint') {
      if (
        intDecoding === 'bigint' ||
        (intDecoding === 'mixed' && value > Number.MAX_SAFE_INTEGER)
      ) {
        return value;
      }

      // JSONbig.parse converts number to BigInts if they are >= 10**15. This is smaller than
      // Number.MAX_SAFE_INTEGER, so we can convert some BigInts back to normal numbers.
      if (intDecoding === 'default' || intDecoding === 'mixed') {
        return Number(value);
      }

      throw new Error(
        `Integer exceeds maximum safe integer: ${value.toString()}. Try parsing with a different intDecoding option.`
      );
    }

    if (typeof value === 'number') {
      if (intDecoding === 'bigint' && Number.isInteger(value)) {
        return BigInt(value);
      }
    }

    return value;
  });
  return parsed;
}

/**
 * ArrayEqual takes two arrays and return true if equal, false otherwise
 */
export function arrayEqual(a: ArrayLike<any>, b: ArrayLike<any>) {
  if (a.length !== b.length) {
    return false;
  }
  return Array.from(a).every((val, i) => val === b[i]);
}

/**
 * ConcatArrays takes two array and returns a joint array of both
 * @param a
 * @param b
 * @returns [a,b]
 */
export function concatArrays(a: ArrayLike<any>, b: ArrayLike<any>) {
  const c = new Uint8Array(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
}

/**
 * Remove undefined properties from an object
 * @param obj An object, preferably one with some undefined properties
 * @returns A copy of the object with undefined properties removed
 */
export function removeUndefinedProperties(
  obj: Record<string | number | symbol, any>
) {
  const mutableCopy = { ...obj };
  Object.keys(mutableCopy).forEach((key) => {
    if (typeof mutableCopy[key] === 'undefined') delete mutableCopy[key];
  });
  return mutableCopy;
}
