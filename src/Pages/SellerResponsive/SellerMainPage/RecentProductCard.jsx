import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {  customerbyId, orderByIdProduct, productbyId } from "../../../store/reducers/sellerProductsReducer";
import Editpublished from "../MyProductPage/PopCards/productrented";

const styles = {
  productsCard: {
    justifyContent: 'flex-end', // Align items to the end (right)
    borderRadius: '16px', // Rounded corners
    border: '1px solid var(--line-separator, rgba(0, 47, 54, 0.08))', // Border styling
    background: 'var(--White, #fff)', // Background color
    display: 'flex', // Enable flexbox layout
    gap : '10px',
    marginTop: '16px', // Space above the card
    width: 'auto', // Full width of the parent
    minWidth: 'calc(100% - 32px)', // Ensure minWidth accounts for parent's padding
    maxWidth: '100%', // Prevent exceeding parent width
    flexWrap: 'wrap', // Allow wrapping of items
    padding: '8px 8px 8px 16px', // Padding inside the card
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
    flexShrink: 0, // Prevent shrinking in flex container
  },
  actionImg: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '32px',
    margin: 'auto 0'
  },
  label: {
    color: 'var(--Paragraph, #736e67)',
    fontSize: '12px',
    fontWeight: '400'
  },
  valueContainer: {
    display: 'flex',
    marginTop: '8px',
    alignItems: 'center',
    gap: '2px',
    fontSize: '14px',
    color: 'var(--Text, #252422)',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    justifyContent: 'end'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    justifyContent: 'end',
    flexWrap: 'wrap',
    flex: 1,
    margin: 'auto 0'
  },
  infoContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    flexBasis: '0%',
    margin: 'auto 0'
  },
  status: {
    justifyContent: 'end',
    alignItems: 'center',
    borderRadius: '8px',
    background: 'var(--very-light, #f2fbfa)',
    backgroundColor: 'var(--very-light, #f2fbfa)',
    alignSelf: 'end',
    display: 'flex',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--Blue, #26969c)',
    textAlign: 'center',
    padding: '8px'
  },
  statusImg: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '16px',
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  productName: {
    color: 'var(--Dark, #09262a)',
    textAlign: 'right',
    fontSize: '16px',
    marginTop: '8px'
  },
  actionButtons: {
    display: 'flex',
    minWidth: '240px',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '1',
    justifyContent: 'start',
    margin: '0 10px',
    background: '#ffffff'

  },  
  actionButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    gap: '8px',
    fontWeight: '500',
    margin: '0 10px',
    padding: '12px 24px',
    border: 'none',
    height:"50px",
    width:"123px",
    cursor: 'pointer',
  },
  rejectButton: {
    background: 'var(--error-shade, #fae4e4)',
    color: 'rgba(214, 27, 27, 1)',
 whiteSpace:"nowrap"
  },
  approveButton: {
    background: 'var(--Blue, #27989e)',
    color: 'rgba(255, 255, 255, 1)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
    whiteSpace:"nowrap"

  },
};

const ProductImage = styled.img`
  aspect-ratio: 1;
  object-fit:contain;
  object-position: center;
  width: 64px;
  border-radius: 18px;
  align-self: stretch;
  margin: auto 0;
`

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 10%;
  padding: 0 4px;
  @media (max-width : 668px) {
      display : none;
  }
`
const RecentProductCard = ({ productdata, productid }) => {
  const { productby_Id, customerby_Id } = useSelector((state) => state.seller_products);
  const sellerid = localStorage.getItem('sellerId');
  const [openProducts, setOpenProducts] = useState({});
  const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();

  // Toggle function for the product
  const toggleProduct = (productId) => {
    setOpenProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle the clicked product
    }));
  };
  const refetchProductData = async () => {
    try {
      const response = await dispatch(productbyId({ sellerid, productid }));
      setOrderData(response.payload.productby_Id);
    } catch (error) {
      console.error("Error refetching data:", error);
    }
  };
  
  const onReviewClick = (Order) => {
    toggleProduct(Order.customerid); // Toggle the state
    // setActiveOrder(Order.id)
  };

  // Fetch product orders when productid changes
  useEffect(() => {
    dispatch(customerbyId(productdata.customerid))

    const fetchOrders = async () => {
      try {
        // Dispatch action to fetch product data by productid
        const response = await dispatch(productbyId({ sellerid, productid }));
        setOrderData(response.payload.productby_Id); // Store the fetched data for this product
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (productid) {
      fetchOrders(); // Fetch the data when productid changes
    }
    
    // Fetch customer data for the product

   

  }, [productid, dispatch, sellerid, productdata.customerid]); // Dependency array to run the effect only when productid or customerid changes

  return (
    <div style={styles.productsCard}>
      {console.log("orderBy_IdProduct", customerby_Id)}

      <div>
        {orderData.published ? (
          <button
            style={{ ...styles.actionButton, ...styles.rejectButton }}
            tabIndex="0"
            role="button"
            onClick={() => toggleProduct(productdata.customerid)}
          >
            إلغاء النشر
          </button>
        ) : (
          <button
            style={{ ...styles.actionButton, ...styles.approveButton }}
            tabIndex="0"
            role="button"
            onClick={() => toggleProduct(productdata.customerid)}
          >
            تفعيل النشر
          </button>
        )}
      </div>

      <Price>
        <div style={styles.label}>المبلغ المدفوع</div>
        <div style={styles.valueContainer}>
          <div>ر.س</div>
          <div>{productdata ? productdata.price : "empty"}</div>
        </div>
      </Price>

      <Price>
        <div style={styles.label}>مدة التأجير</div>
        <div style={styles.valueContainer}>
          <div>ايام</div>
          <div>{productdata ? productdata.duration : "empty"}</div>
        </div>
      </Price>

      <Price>
        <div style={styles.label}>اسم المستأجر</div>
        <div style={styles.valueContainer}>
          {customerby_Id ? productdata.customername : "empty"}
        </div>
      </Price>

      <div style={styles.info}>
        <div style={styles.infoContainer}>
          <div style={styles.productName}>{productby_Id.productname}</div>
        </div>

        <ProductImage
          loading="lazy"
          src={productby_Id.img || "https://cdn.builder.io/api/v1/image/assets/TEMP/80629cbe88e05e51bc90c1bb3b2858c0690e6cb7d40d292e4b417507a0e600f2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"}
          alt="Product"
        />

        {openProducts[productdata.customerid] && <Editpublished onSuccess={refetchProductData} id={productdata} onReviewClick={onReviewClick} order={productdata} productby_Id={orderData} />}
      </div>
    </div>
  );
};

export default RecentProductCard;
