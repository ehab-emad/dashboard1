
import  {  useMemo, useState,useEffect } from 'react';
import RejectOrderPopCard from './PopCards/RejectOrderPopCard';
import { PublishedRentedTrue,PublishedTrue,PublishedFalse,PublishedRentedFalse ,DraftProducts, ConfirmedProducts, PendingProducts, RejectedProducts } from '../../../store/reducers/sellerProductsReducer';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProductFromDB} from '../../../store/reducers/firebasefunctions'
import AddRequestSummary from './PopCards/addrequstsummary';


const maindiv = {
  requestsContainer: {
    alignSelf: 'stretch',
    borderRadius: '24px',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: 'Expo Arabic, sans-serif',
    justifyContent: 'start',
    padding: '16px',
   
  },
  header: {
    borderColor: 'rgba(0, 47, 54, 0.08)',
    borderBottomWidth: '1px',
    display: 'flex',
    width: '100%',
    paddingBottom: '8px',
    alignItems: 'center',
    gap: '40px 100px',
    fontWeight: 400,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  viewAllButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px',
    background: '#f6f5f5',
    display: 'flex',
    gap: '4px',
    overflow: 'hidden',
    fontSize: '14px',
    color: '#8d8883',
    lineHeight: 1,
    margin: 'auto 0',
    padding: '8px 16px 8px 12px',
    border: 'none',
    cursor: 'pointer',
  },
  viewAllIcon: {
    width: '14px',
    height: '14px',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    color: '#252422',
    textAlign: 'right',
  },
  titleIcon: {
    width: '24px',
    height: '24px',
  },
  productCard: {
      justifyContent: "end",
      alignItems: "center",
      borderRadius: "16px",
      border: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
      background: "var(--White, #fff)",
      display: "flex",
      marginTop: "16px",
      width: 'auto',
      minWidth: 'calc(100% - 32px)',
      maxWidth: '100%',
      padding: '16px',
      
      gap : '8px'
  },
  actionButtons: {
    display: 'flex',
    // minWidth: '240px',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: 1,
  },
  reviewButton: {
    borderRadius: '50px',
    border: '1px solid #27989e',
    color: '#26969c',
    padding: '12px 24px',
    background: 'transparent',
    cursor: 'pointer',
  },
  approveButton: {
    borderRadius: '50px',
    background: '#27989e',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  productInfo: {
    display: 'flex',
    minWidth: '240px',
    flexDirection: 'column',
    alignItems: 'end',
    textAlign: 'right',
    justifyContent: 'center',
    flex: 1,
  },
  timeAgo: {
    fontSize: '12px',
    color: '#8d8883',
    fontWeight: 400,
  },
  productName: {
    color: '#09262a',
    fontSize: '16px',
    fontWeight: 500,
    marginTop: '8px',
  },
  productImage: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
  },
};
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
    display: "flex",
    // text-align: right;
    justifyContent: 'center',
    width : '20%',
    background: 'transparent',
    textAlign: ' center'
  },
  filterItemnull: {
    display: "flex",
    // text-align: right;
    justifyContent: 'center',
    width : '52%',
    background: 'transparent',
    textAlign: ' center'
  },
  filterItem_news: {
    // display: "block",
    // text-align: right;
    // width : '20%',
  },
  filterimage: {
    width : '7%',
    background: 'transparent',
    textAlign: ' center'
  },
  orderNumber: {
    padding: '0 4px'
  }
};

const stylesProductCard = {
  productCard: {
    // justifyContent: 'center',
    alignItems: 'center',
    //  overflowX:"scroll",
    alignSelf: 'stretch',
    borderRadius: '16px',
    border: '1px solid rgba(0, 47, 54, 0.08)',
    background: '#fff',
    // display: 'flex',
    gap: '7px',
    flexWrap: 'nowrap',
    padding: '16px',
    width: '100%', // Set to 100% to take full width of the parent
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    maxWidth: '100%', // Ensure it doesn't exceed parent width
    flexGrow: 1, // Allow it to grow and fill available space
    flexShrink: 0, // Prevent shrinking if there's enough space
    boxSizing: 'border-box', // Include padding and borders in width calculations

  },

  actionIconsWrapper: {
    display: 'flex',
    alignItems: 'center',
    // gap: '8px',
    justifyContent: 'center',
    margin: 'auto 0'
    

  },
  actionIcon: {
    border: 'none',
    background: 'none',
    // width:"31px",
    padding: 0,
    cursor: 'pointer',
    

  },
  emptyproductCard: {

    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    gap: "16px"
    

  },

  metaText: {
    color: '#252422',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    width: '72px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
    
  },
  discountText: {
    color: '#252422',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifyContent: 'center',
    width: '72px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
      
    },
  brandText: {
    color: '#252422',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    width: '72px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',

  },
  categoryText: {
    color: '#252422',
    whiteSpace: 'wrap',
    textAlign: 'center',
    width: '72px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',

  },
  statusWrapper: {
    display: 'flex',
    color: '#252422',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',

    width: '124px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
    background: 'transparent'

  },
  statusInner: {
    display: "flex", // Add display flex to enable flex properties
    justifyContent: "center",
    alignItems: "start",
    borderRadius: "8px",
    flexGrow: 0, // Allow it to grow and fill available space
    flexShrink: 0, // Prevent shrinking if there's enough space

    background: "var(--BG-gray, #f6f5f5)",
    gap: "8px",
    padding: "8px",
  },
  statusIcon: {

    width: "16px",


  },
  productInfo: {
    display: "flex",
    background:" transparent",
    minWidth: "240px",
    flexDirection: "column",
    fontFamily: "Expo Arabic, sans-serif",
    justifyContent: "center",
    flex: "1",
    flexBasis: "0%",
    margin: "auto 0",
   // background: "#808080",

  },
  productType: {
    alignSelf: "end",
    borderRadius: "50px",
    background: "var(--l, linear-gradient(90deg, #27989e 0%, #09262a 100%))",
    boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
    backgroundColor: "var(--l, linear-gradient(90deg, #27989e 0%, #09262a 100%))",
    gap: "4px",
    overflow: "hidden",
    fontSize: "12px",
    color: "var(--White, #fff)",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: "1",
    padding: "6px 12px"
    
  },
  productTitle: {
    // minWidth: '240px',
    color: '#252422',
    textAlign: 'right',
    flex: 1,
    margin: 'auto 0',
    font: '600 13px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
    
    
    

  },
  productImage: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '40px',
    margin: 'auto 0',
    borderRadius: '8px',
  },


  addproductbtn : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    margin: 'auto 0',
    padding: '8px',
    whiteSpace: 'nowrap',
    backgroundColor: '#26969c' ,
    color: '#ffffff',
    fontWeight:  '600' ,
    width: '120px',
    border: `2px solid '#26969c' `, // Add border color


  }
}

const buttonicons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a018ae7937d6d185fad3e4fbc52126915e1bfab173c381ce3dfe10ac789692a6?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7", alt: "Action icon 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4695040147401da41f00f52899fdfd5825278c60913a8899966e5de7d9aec12?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7", alt: "Action icon 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e04c31c79f45c76dec6d01be8496b624d4da5f44d141e54dd02bd999c76bcd1a?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7", alt: "Action icon 3" }
];








export default function ProductInfo({activeFilterText,activeTop, setCurrentPage, ProductsSearch} ) {
  
   const toggleProductNew = (productId) => {
    setOpenProductsnew((prev) => ({
          ...prev,
          [productId]: !prev[productId], // Toggle the clicked product
        }));
      };
      const [openProductsnew, setOpenProductsnew] = useState({});
  const dispatch = useDispatch();
  const { published_rentedtrue,published_rentedfalse,published_false ,products_confirmed, products_draft, products_pending, products_rejected } = useSelector((state) => state.seller_products);
  const sellerid = localStorage.getItem('sellerId');


    useEffect(() => {
      dispatch(DraftProducts(sellerid));
      dispatch(PublishedTrue(sellerid));
      dispatch(PublishedFalse(sellerid));
      dispatch(PublishedRentedFalse(sellerid));
      dispatch(ConfirmedProducts(sellerid));
      dispatch(PendingProducts(sellerid));
      dispatch(RejectedProducts(sellerid));
      dispatch(PublishedRentedTrue(sellerid));

    }, [dispatch]);
  
const [openProducts, setOpenProducts] = useState({});
const toggleProduct = (productId) => {
    setOpenProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle the clicked product
    }));
  };
const [DeletProduct, setDeletProduct] = useState(false);
const [DeletProductId, setDeletProductId] = useState();


const filteredProducts = useMemo(() => {
  let filtered = [];

  if (activeTop === 'المنتجات المنشورة') {
    if (activeFilterText === 'الكل') {
      filtered = [...published_rentedtrue, ...published_rentedfalse];
    } else if (activeFilterText === 'مستأجرة') {
      filtered = published_rentedtrue;
    } else if (activeFilterText === 'متاحة للتأجير') {
      filtered = published_rentedfalse;
    }
  } else if (activeTop === 'المنتجات المعلقة') {
    if (activeFilterText === 'الكل') {
      const allProducts = [
        ...products_draft,
     ...products_pending,
        ...published_false,
      ].sort((a, b) => b.createdAt - a.createdAt);
      filtered = allProducts;
    } else if (activeFilterText === 'بانتظار الموافقة') {
      const allProducts = [
        ...products_pending,
     
        ...products_rejected,
      ].sort((a, b) => b.createdAt - a.createdAt);
      filtered = allProducts;
    } else if (activeFilterText === 'المسودة') {
      const allProducts = [
        ...products_draft,
     
        ...published_false,
      ].sort((a, b) => b.createdAt - a.createdAt);
      filtered = allProducts;
    }
  }

  // Apply the search filter by email
  if (ProductsSearch) {
    filtered = filtered.filter(product =>
      product.sellername.toLowerCase().includes(ProductsSearch.toLowerCase())
    );
  }

  return filtered;
}, [
  activeFilterText,
  activeTop,
  published_rentedtrue,
  published_rentedfalse,
  published_false,
  products_pending,
  products_draft,
  ProductsSearch,
  products_confirmed,
  products_rejected

]);


const handleIconClick = (index, id) => {
    // Define your functions for each icon click
    switch (index) {
        case 0:

        setDeletProduct(true); // Toggle state
        setDeletProductId(id);
      
            break;
        case 1:
          toggleProductNew(id)

        
            break;
        case 2:
          
            break;
        default:
            break;
    }
};



const deleteProduct = async () => {
  
    deleteProductFromDB(DeletProductId, sellerid);

    // Refetch products after deletion
    dispatch(DraftProducts(sellerid));
    dispatch(PublishedTrue(sellerid));
    dispatch(PublishedFalse(sellerid));
    dispatch(PublishedRentedFalse(sellerid));
    dispatch(ConfirmedProducts(sellerid));
    dispatch(PendingProducts(sellerid));
    dispatch(RejectedProducts(sellerid));
    dispatch(PublishedRentedTrue(sellerid));

    // Close the delete confirmation popup
   setDeletProduct(false);

};


  return (

    
    <div style={maindiv.requestsContainer}>
    
    {filteredProducts.length > 0 ? filteredProducts.map((product, productIndex) => (
     <div  key = {productIndex}>
        
        {openProductsnew[product.id] &&  (
            <AddRequestSummary product={product} setReviewProduct={toggleProductNew}/>
          )  }
{DeletProduct ? (
        <RejectOrderPopCard deleteProduct={deleteProduct} product={product} setDeletProduct={setDeletProduct} type='delete'/>
      ) : null}

      <div key = {productIndex} style={stylesProductCard.productCard} className='hide'>
    
      {/* {openProductsnew[product.id] &&  (
            <AddRequestSummary product={product} setReviewProduct={toggleProductNew}/>
          )  } */}
    
     <div style={styles.filterItem}>
    

       {buttonicons.map((icon, index) => (
         <img
           key={index}
           loading="lazy"
           src={icon.src}
           alt={icon.alt}
           style={stylesProductCard.actionIcon}
           onClick={() => handleIconClick(index,product.id)}
         />

       ))}

     </div> 
     
     <div style={styles.filterItem}>{product.discount || 'empty'}</div>
     <div style={styles.filterItem}>{product.price ||'empty'}</div>
     <div style={styles.filterItem}>{product.brand || 'empty'}</div>
     <div style={styles.filterItem}>
       <div >
        {
            
        
        product.published && product.rented===false ?
        
   <div style={{width:"100%"}}>
    <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_-_%D9%85%D8%AA%D8%A7%D8%AD_%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1_mym7te.png' alt=' available'/>
    </div>
   :product.published && product.rented===true ?
   <div style={{width:"100%"}}>
    <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_-_%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC_%D9%85%D8%A4%D8%AC%D8%B1_lprfyi.png' alt='not available'/>
    </div>:product.status==="draft" ?
            <div style={{width:"100%"}}>
            <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_-_%D9%85%D8%A7%D9%84%D9%83_-_%D9%85%D8%B3%D9%88%D8%AF%D8%A9_lh7ojh.png' alt=' available'/>
            </div>
            
            : 
            product.status==="rejected" ?
            <div style={{width:"100%"}}>
            <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1744557538/trent_images/Orders_status_snz8b9.png ' alt=' available'/>
            </div>:<div style={{width:"100%"}}>
    <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D9%85%D9%86%D8%AA%D8%AC_-_%D9%85%D8%A7%D9%84%D9%83_-_%D8%BA%D9%8A%D8%B1_%D9%85%D9%86%D8%B4%D9%88%D8%B1_bou7gr.png' alt='not available'/>
    </div>
          
        }
    
   
         
       </div>
     </div>
     <div style={styles.filterItem}>{product.category || 'empty'}</div>
     <div style={styles.filterItem}>
       <div style={stylesProductCard.filterItem}>{product.name || "empty"}</div>
     </div>
     <img
       loading="lazy"
       src={product.img || "https://cdn.builder.io/api/v1/image/assets/TEMP/80629cbe88e05e51bc90c1bb3b2858c0690e6cb7d40d292e4b417507a0e600f2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"}
       alt="Product image"
       style={styles.filterimage}
     />
  
   </div>
   <div key = {product.id}  className='smallproductcardcover'>
  <div className='smallproductcard'>
  <img src={'https://cdn.builder.io/api/v1/image/assets/TEMP/b96d1ed5b69bb8dcca96ca72efe39f483bf3d84f91f02fd737257c912709c862?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e'} onClick={() => toggleProduct(product.id)} style={{width : '20px' , height : '20px', transform:  "rotate(180deg)" }}/>


<div  style={{gap:"8px",display:"flex",margin:"0 3px"}} className={maindiv.actionButtons}>
{buttonicons.map((icon, index) => (
<img
key={index}
loading="lazy"
src={icon.src}
className='imgWidth'
alt={icon.alt}
style={stylesProductCard.actionIcon}
onClick={() => handleIconClick(index,product.id)}
/>
))}

</div>
<div  style={{width:"127px"}}>
        {
            
        
        product.published && product.rented===false ?
        
   <div style={{width:"100%"}}>
    <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_-_%D9%85%D8%AA%D8%A7%D8%AD_%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1_mym7te.png' alt=' available'/>
    </div>
   :product.published && product.rented===true ?
   <div style={{width:"100%"}}>
    <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_-_%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC_%D9%85%D8%A4%D8%AC%D8%B1_lprfyi.png' alt='not available'/>
    </div>:product.status==="draft" ?
            <div style={{width:"100%"}}>
            <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_-_%D9%85%D8%A7%D9%84%D9%83_-_%D9%85%D8%B3%D9%88%D8%AF%D8%A9_lh7ojh.png' alt=' available'/>
            </div>
            
            : <div style={{width:"100%"}}>
    <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D9%85%D9%86%D8%AA%D8%AC_-_%D9%85%D8%A7%D9%84%D9%83_-_%D8%BA%D9%8A%D8%B1_%D9%85%D9%86%D8%B4%D9%88%D8%B1_bou7gr.png' alt='not available'/>
    </div>
          
        }
    
   
         
       </div>

   
<div className='hide'  style={stylesProductCard.productTitle}>{product.name || "empty"}


</div>


  <div style={{width:"20%"}} >
<img
loading="lazy"
src={product.img || "https://cdn.builder.io/api/v1/image/assets/TEMP/80629cbe88e05e51bc90c1bb3b2858c0690e6cb7d40d292e4b417507a0e600f2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"}
alt="Product image"
style={stylesProductCard.productImage}
/></div>

  </div>
{
openProducts[product.id]  && 
<div style={{display : 'flex' , flexDirection : 'column',  gap: '10px',position:"relative"}} className='line'>
<div style={{display : 'flex' , flexDirection : 'row-reverse' , justifyContent : 'space-between',margin:"10px 0"}}>
<p style={{direction : 'rtl' , fontSize : '15px' ,fontWeight:"700", margin : '5px 0px',display:"flex",alignItems:"center"}}><span style = {{color : '#736E67'}}> الخصم  </span>:{product.discount || "empty"} <div style={styles.filterItemnull}>
      
     </div></p>
<p style={{direction : 'rtl' , fontSize : '15px' ,fontWeight:"700", margin : '5px 0px',display:"flex",alignItems:"center"}}><span style = {{color : '#736E67'}}>السعر  </span> :{product.price || "empty"}</p>
</div>
<div style={{display : 'flex' , flexDirection : 'row-reverse' ,    gap: '10px', justifyContent : 'space-between'}}>
<p style={{ fontSize : '15px' ,fontWeight:"700", margin : '0px',direction : 'rtl',display:"flex" }}> <span style = {{color : '#736E67'}}> الماركة </span>:{product.brand || "empty"}</p>
<p style={{direction : 'rtl' , fontSize : '15px' ,fontWeight:"700", margin : '0px',display:"flex",gap:"1px"}}><span style = {{color : '#736E67'}}>التصنيف  </span>:{product.category || "empty"}</p>
</div>
</div>
 
}
 </div></div>
    )) : (
      <div style={stylesProductCard.emptyproductCard}>
        <span>   لا يوجد لديك اي منتجات حاليا</span>
  

        </div>
    )}
       
        
    
  </div>
  )
}
