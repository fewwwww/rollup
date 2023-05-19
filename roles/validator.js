export const validator = (transactions) => {
  // ok this is computation for single state transition
  const transactionsComputed = transactions.map((transaction) => {
    // do some computation
    // remove "0x" prefix of each transaction
    return transaction.slice(2, transaction.length);
  });

  return {
    beforeState: '00000000000000000000',
    // add all transactions to beforeState with "0x" prefix of each transaction
    afterState: transactionsComputed.reduce(
      (acc, transaction) => acc + transaction,
      '',
    ),
  };
};
