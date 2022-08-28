export function boundValue (value: bigint, maxValue: bigint): bigint {
    const lowerBounded = 0n > value ? 0n : value;
    const upperBounded = maxValue < lowerBounded ? maxValue : lowerBounded;
    return upperBounded;
  }

export function bigMax(maxValue: bigint, ...args: bigint[]): bigint
{
  let max = 0n;
  for (let i = 0; i < args.length; i++)
  {
      const arg = args[i];
      if (arg > max)
      {
          max = arg;
      }
  }
  return max;
}

export function bigMin(maxValue: bigint, ...args: bigint[]): bigint
{
  let min = 0n;
  for (let i = 0; i < args.length; i++)
  {
      const arg = args[i];
      if (arg < min)
      {
          min = arg;
      }
  }
  return min;
}

export function fractionToScaledBigInt(percent: number, maxValue: bigint): bigint
{
  return BigInt(percent) * maxValue;
}

export function scaledBigIntToFraction(value: bigint, maxValue: bigint): number
{
  return Number(value) / Number(maxValue);
}