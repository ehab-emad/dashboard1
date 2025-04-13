import styled from 'styled-components';
import '../../../App.css'
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
  filterItems: {
    width : '34%',

    background: 'transparent',
    textAlign: ' center'
  }, filterItem: {
    width : '20%',
    background: 'transparent',
    textAlign: ' center',
    fontSize:"15px",
    color:"#736e67"
  },
  orderNumber: {
    padding: '0 4px'
  }
};
const ProductsFilter = styled.div`
  // display: flex;
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
  
export default function LabelHeader() {
  console.log('lableheader')
  return (
   <>
    <ProductsFilter className='hide'>
    <div style={styles.filterItems}>  إجراءات </div>
    <div style={styles.filterItem}>الخصم</div>
    <div style={styles.filterItem}>السعر </div>
    <div style={styles.filterItem}>الماركة </div>
    <div style={styles.filterItem}>  حالة المنتج</div>
    <div style={styles.filterItem}> التصنيف</div>
    <div style={styles.filterItem}>  بيانات المنتج</div>
    <div style={styles.filterItem}> الصورة</div>
  </ProductsFilter>
    
    </>
  );
}