import TransactionCard from './TransactionCard';
import  { useEffect, useMemo } from 'react';import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { CustomerTransactions } from '../../../store/reducers/customerStuffReducer';





const styles = {
  transactions: {
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--Text, #252422)',
    textAlign: 'right',
    justifyContent: 'start',
    padding: '16px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif'
  },
  header: {
    paddingBottom: '8px',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    gap: '8px',
    fontSize: '18px',
    fontWeight: '500',
    flexWrap: 'wrap'
  },
  headerTitle: {
    alignSelf: 'stretch',
    flex: '1',
    flexBasis: '0%',
    margin: 'auto 0'
  },
  headerIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  filterItem: {
    width : '20%',
    background: 'transparent',
    textAlign: ' center'
  },
  orderNumber: {
    padding: '0 4px'
  }
};
const ProductsFilter = styled.div`
  display: flex;
  justify-content: flex-end; /* 'end' should be 'flex-end' */
  border-radius: 16px;
  border: 1px solid transparent;
  background: var(--White, #fff);
  margin-top: 16px;
  width: auto;
  gap: 24px;
  text-align: center;
  flex-wrap: nowrap;
  padding: 8px 16px;
      @media (max-width : 640px) {
        display : none
      }
  `


const Transactions = () => {

  const dispatch = useDispatch();
const customerid = localStorage.getItem('customerId');

  const { customer_transactions } = useSelector((state) => state.customer_stuff);



  const transactionData = useMemo(() => {

    
    return customer_transactions || []; // Fallback to an empty array if customer_transactions is undefined
  }, [customer_transactions]);  
  console.log('transation are ', customer_transactions)


  useEffect(() => {

    dispatch(CustomerTransactions(customerid));
  }, [dispatch]);


  return (
    <div style={styles.transactions}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>التحويلات المالية</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3573a782d885886caa0514c5cdafccc783b5ef9fec963877184bc7d0aeee87b?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
          style={styles.headerIcon}
          alt="Financial transfers icon"
        />
      </div>
      
      <ProductsFilter >
        <div style={styles.filterItem}>تاريخ الإنشاء</div>
        <div style={styles.filterItem}>المبلغ</div>
        <div style={styles.filterItem}>حالة المعاملة</div>
        <div style={styles.filterItem}>اسم المالك</div>
        <div style={styles.filterItem}>اسم المستأجر</div>
        <div style={styles.filterItem}>رقم العملية</div>
      </ProductsFilter>

      {transactionData.map(transaction => (
        <TransactionCard
          key={transaction.id}
          {...transaction}
        />
      ))}
    </div>
  );
};

export default Transactions;