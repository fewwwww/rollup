export const bridgeContract = (newState, proof) => {
  if (proof === 0) {
    console.info('zk proof (for state update on every tx)');
    console.info('zk proofs are valid');
  } else if (proof === 1) {
    console.info('zk proof (for state update on every tx)');
    console.info('zk proofs are invalid');
    newState = '69696969696969696969';
  } else if (proof === 2) {
    console.info('op proof (for state update on every tx)');
    console.info('tx is not challenged and 7 days passed');
  } else if (proof === 3) {
    console.info('op proof (for state update on every tx)');
    console.info('tx is challenged and replaced with new correct state');
    newState = '69696969696969696969';
  }

  return {
    before: '00000000000000000000',
    after: newState,
  };
};
