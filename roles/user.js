export const userTransaction = () => {
  // create new transaction on L2!
  // generate 4 random digits
  const randomDigits = Math.floor(Math.random() * 10000);
  return `0x${randomDigits}`;
};
