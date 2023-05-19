export const sequencer = (transactions) => {
  // randomly select some transactions based on random number for start and end index
  const selectedTransactions = transactions.slice(0, 5);

  // randomly sort transactions
  const sortedTransactions = selectedTransactions.sort(
    () => Math.random() - 0.5,
  );

  // return sorted transactions
  return sortedTransactions;
};
