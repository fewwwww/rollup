import { userTransaction } from './user.js';
import { sequencer } from './sequencer.js';
import { daContract } from './da.js';
import { validator } from './validator.js';
import { bridgeContract } from './bridge.js';

// 1. User Submit Transaction to Rollup Sequencer
let transactions = [];
for (let i = 0; i < 10; i++) {
  const newTransaction = userTransaction();
  transactions.push(newTransaction);
}
console.info('[CREATE 10 TRANSACTIONS]');
console.log('mempool (so-called): ', transactions);
console.log();

// 2. Rollup Sequencer Batch Transactions
// Just inclusion of transactions, no execution.
// Usually Sequencer is trusted for including transactions and give confirmation
// to user that transaction will be included in the batch.
// Then Wallet will tell you the transaction is good.
const sequencedTransactions = sequencer(transactions);
console.info('[SEQUENCED TRANSACTIONS]');
console.log('sequencer: ', sequencedTransactions);
console.log();

// 3. Rollup Sequencer Submit Batch to L1 DA Contract
// Transactions are now finalized, and transactions themselves are not revertable.
const da = daContract(sequencedTransactions);
console.info('[BATCH ARRIVED TO DA CONTRACT]');
console.log('da before: ', da.before);
console.log('da after : ', da.after);
console.log();

// 4. Rollup Validator Read Batch from L1 DA Contract or Sequencer directly
// Can be faster then step 3.
// Transactions are now executed and state is updated on L2.
// randomly choose 0 or 1, very fair dice
const readWay = Math.floor(Math.random() * 2);
console.info('[TRANSACTIONS FOR VALIDATOR]');
let transactionsRead;
if (readWay === 0) {
  console.info('read from sequencer (faster, but more trusted)');
  transactionsRead = sequencedTransactions;
} else {
  console.info('read from da (slower, but safer)');
  transactionsRead = da.after;
}
console.log('transactions: ', transactionsRead);
console.log();

// 5. Rollup Validator Execute Batch Transactions
const validatorState = validator(transactionsRead);
console.info('[UPDATE VALIDATOR STATE]');
console.log('validator before: ', validatorState.beforeState);
console.log('validator after : ', validatorState.afterState);
console.log();

// 6. Rollup Validator Submit New State to L1 Bridge Contract
// New State need to be with some kind of proof! (zk or optimistic)
// If proof is valid, L1 Bridge Contract will update the state on L1, and withdraw.
// If proof is invalid or tx is challenged, L1 Bridge Contract will replace the
// state with the correct state. Transactions are not reverted, but state
// is reverted to the correct state.
const proof = Math.floor(Math.random() * 4);
console.info('[NEW STATE AND PROOF SUBMITTED TO BRIDGE]');
const bridge = bridgeContract(validatorState.afterState, proof);
console.log('bridge before: ', bridge.before);
console.log('bridge after : ', bridge.after);
console.log();
