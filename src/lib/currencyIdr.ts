export const formatIDR = (num: string) => {
  const n = Number(num);
  if (isNaN(n)) return num;
  return new Intl.NumberFormat("id-ID").format(n);
};
