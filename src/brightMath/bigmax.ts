export default function bigMax(maxValue: bigint, ...args: bigint[]): bigint
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