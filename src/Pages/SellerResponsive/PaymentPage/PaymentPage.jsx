
import BankAccounts from './BankAccounts';
import PaymentSummary from './PaymentSummary';
import Transactions from './Transactions';

const PaymentPage = () => {
  return (
    <>
      <PaymentSummary />
      <BankAccounts />
      <Transactions />
    </>
  );
};

export default PaymentPage;