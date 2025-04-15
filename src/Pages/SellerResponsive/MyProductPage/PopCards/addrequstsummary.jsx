import  { useEffect } from 'react';

import '../../../../App.css'
import TitleAddProductRequest from './Titleaddress';
import TextBoxField from './textbox';
import RenterInfoAdmin from './sellerinfo';
import { useDispatch, useSelector } from 'react-redux';
import { ChangepublishedStatus, ConfirmedProducts, DraftProducts, PendingProducts, PublishedFalse, PublishedRentedFalse, PublishedRentedTrue, PublishedTrue, RejectedProducts } from '../../../../store/reducers/sellerProductsReducer';
import { toast } from 'react-toastify';
const backgroundstyles = {

  container :{

    display: 'flex',
    zIndex: '100',

    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Expo Arabic, sans-serif',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
}
const styles = {
    mainContainer: {
        display: 'flex',
        gap: "8px",
        flexDirection: 'column',
        height: 'auto',
        overflow : 'hidden',
        width: '80%', // Full width of the parent
        backgroundColor: '#e0e0e0', // Main background color
        padding: '10px', // Optional padding
        flexShrink: 0, // Prevent shrinking in flex container
        borderRadius: "30px",
        // top: '50%',          // Position at the vertical center
        left: '50%',         // Position at the horizontal center
        position: 'absolute',
        transform: 'translate(-50%, -50%)', // Adjust position to center
        minWidth: '0', // Ensure no minimum width constraints
        maxWidth: '100%', // Ensure it doesn't exceed parent width
        boxSizing: 'border-box', // Include padding and borders in width calculations

    },
    buttonscontainer: {
      borderRadius: '24px',
      background: 'var(--White, #fff)',
      display: 'flex',
      flexDirection:"reverseColumn",gap:"8px",
      // width: 'auto', // Full width of the parent
      // Ensure minWidth accounts for parent's padding
      width: '90%', // Prevent exceeding parent width
      height: 'auto',
      overflow: 'hidden',
      padding: '16px',
      justifyContent: 'center',
    
  
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
      // margin: '0 10px',
      padding: '12px 24px',
      border: 'none',
      width:"100%",
      cursor: 'pointer',
    },
    rejectButton: {
      background: 'var(--error-shade, #fae4e4)',
      color: 'rgba(214, 27, 27, 1)',

    },
    approveButton: {
      background: 'var(--Blue, #27989e)',
      color: 'rgba(255, 255, 255, 1)',
      boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',

    },
    container: {
        display: 'flex',
        //backgroundColor:" #767676",
        height: '100%',
        overflow : 'hidden',
        padding: '0 20px',
        flexWrap:"wrap",
// flexDirection:"col"
        width: '100%', // Full width of the parent
        flexShrink: 0, // Prevent shrinking in flex container  
        minWidth: '0', // Ensure no minimum width constraints
        maxWidth: '100%', // Ensure it doesn't exceed parent width
        flexGrow: 1, // Allow it to grow and fill available space
        boxSizing: 'border-box', // Include padding and borders in width calculations
        gap: "24px"

    },
    container1: {
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor:" #777777",
        padding: "8px",
        width: '100%', // Set to 100% to take full width of the parent
      height: '10%', // Allow height to adjust based on content
      minWidth: '0', // Ensure no minimum width constraints
      maxWidth: '100%', // Ensure it doesn't exceed parent width
      flexGrow: 1, // Allow it to grow and fill available space
      flexShrink: 0, // Prevent shrinking if there's enough space
      boxSizing: 'border-box', // Include padding and borders in width calculations
    },
    left: {
        // width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevents overflow
        justifyContent: "start",
        alignItems: " center",
        height: 'auto', // Allow height to adjust based on content
        flexShrink: 0, // Prevent shrinking if there's enough space
        boxSizing: 'border-box', // Include padding and borders in width
        gap: "16px"

    },
    right: {

        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden', // Prevents overflow
        justifyContent: "start",
        alignItems: " center",
        height: '100%', // Allow height to adjust based on content
        flexShrink: 0, // Prevent shrinking if there's enough space
        boxSizing: 'border-box', // Include padding and borders in width
        gap: "16px",


    },

    header: {
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "stretch",
      borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
      display: "flex",
      color: "var(--Text, #252422)",
      textAlign: "right",
      flexWrap: "wrap",
      font: "600 24px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif"
    },
    icon: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "32px",
      alignSelf: "stretch",
      margin: "auto 0",
      cursor: " pointer",
    },
    orderTitle: {
      alignSelf: "stretch",
      flex: 1,
      flexBasis: "0%",
      margin: "auto 0"
    },
    headetop: {
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "stretch",
      borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
      display: "flex",
      color: "var(--Text, #252422)",
      textAlign: "right",
      flexWrap: "wrap",
      font: "600 24px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif"
    },
    icontop: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "32px",
      alignSelf: "stretch",
      margin: "auto 0",
      cursor: " pointer",
    },


};
const ProductDetailsStyles = {
  container: {
    display: 'flex',
    width: 'auto', // Set to 100% to take full width of the parent
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    flexGrow: 1, // Allow it to grow and fill available space
    flexShrink: 0, // Prevent shrinking if there's enough space
    boxSizing: 'border-box', // Include padding and borders in width calculations
    flexDirection: 'column',
    alignItems: 'end',
    font: '14px/1 Expo Arabic, sans-serif',
    background : 'white',
    overflow : 'hidden'
  },
  topSection: {
    display: 'flex',
    width: '100%',
    alignItems: 'start',
    gap: '16px',
    justifyContent: 'end',
    flexWrap: 'wrap',
  },
  pricescontianer: {
    display: 'flex',
    width: '100%',
    alignItems: 'start',
    gap: '8px',
    justifyContent: 'end',
    flexWrap: 'nowrap',
  },
  field: {
    display: 'flex',
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    flexDirection: 'column',
    justifyContent: 'start',
    flexGrow: 1,
    width: '200px',
    background: 'transparent',
    paddingTop : '10px'
  },
  pricesfield: {
    display: 'flex',
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    flexDirection: 'column',
    justifyContent: 'start',
    flexGrow: 1,
    width: '100px',
    background: 'transparent',
    paddingTop : '10px'
  },
  label: {
    color: 'var(--Text,rgb(34, 34, 37))',
    background : 'transparent',
    direction: "rtl",
    whiteSpace: "nowrap"
    

  },
  inputContainer: {

    borderRadius: '16px',
    background: 'var(--BG-gray,rgb(245, 246, 245))',
    display: 'flex',
    marginTop: '8px',
    width: '100%', // Set to 100% to take full width of the parent
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    maxWidth: '100%', // Ensure it doesn't exceed parent width
    flexGrow: 1, // Allow it to grow and fill available space
    flexShrink: 0, // Prevent shrinking if there's enough space
    boxSizing: 'border-box', // Include padding and borders in width calculations
    gap: '16px',
    padding: '16px',
  },
  icon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '14px',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  descriptionSection: {
    display: 'flex',
    marginTop: '16px',
    width: '100%',
    height: "60%",

    flexDirection: 'column',
  },
  descriptionInput: {
    borderRadius: '16px',
    background: 'var(--BG-gray,rgb(245, 246, 245))',
    marginTop: '8px',
    minHeight: '100px',
     // Set to 100% to take full width of the parent
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    maxWidth: 'auto', // Ensure it doesn't exceed parent width
    flexGrow: 1, // Allow it to grow and fill available space
    flexShrink: 0, // Prevent shrinking if there's enough space
    boxSizing: 'border-box', // Include padding and borders in width calculations
    gap: '8px',
    color: 'var(--Cool, #8d8883)',
    textAlign: 'right',
    direction : 'rtl'
  },
  featuresSection: {
    display: 'flex',
    marginTop: '16px',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  featuresGrid: {
    display: 'flex',
    marginTop: '8px',
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    alignItems: 'start',
    gap: '16px',
    color: 'var(--Cool,rgb(255, 255, 255))',
    justifyContent: 'end',
    flexWrap: 'wrap',
  },
  featureBox: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--BG-gray,rgb(245, 246, 245))',
    minWidth: '0px',
    gap: '8px',
    flexGrow: 1,
    width: '200px',
    padding: '16px',
    
  },
  placeholder: {
    border: 'none', 
    width: '100%', // Set to 100% to take full width of the parent
    background : 'transparent',
    textAlign:'right'

  }
};
const AddProductHeader = {
  container: {
    borderRadius: '24px',
    background: 'var(--White, #fff)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    width: '100%', // Set to 100% to take full width of the parent
    height: '100%', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    maxWidth: '100%', // Ensure it doesn't exceed parent width
    flexGrow: 1, // Allow it to grow and fill available space
    flexShrink: 0, // Prevent shrinking if there's enough space
    boxSizing: 'border-box', // Include padding and borders in width calculations
    flexDirection: 'column',
    overflow: 'hidden',
    color: 'var(--Text, #252422)',
    textAlign: 'right',
    justifyContent: 'center',
    alignItems : 'cemter',
    padding: '8px',
  },
  containerprices: {
    borderRadius: '24px',
    background: 'var(--White, #fff)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    width: '100%', // Set to 100% to take full width of the parent
    height: 'auto', // Allow height to adjust based on content
    minWidth: '0', // Ensure no minimum width constraints
    maxWidth: '100%', // Ensure it doesn't exceed parent width
    boxSizing: 'border-box', // Include padding and borders in width calculations
    flexDirection: 'column',
    overflow: 'hidden',
    color: 'var(--Text, #252422)',
    textAlign: 'right',
    justifyContent: 'center',
    alignItems : 'cemter',
    padding: '8px',
  },
  headerWrapper: {
    paddingBottom: '8px',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    gap: '8px',
    flexWrap: 'wrap',
  },
  locationIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '20px',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  addressText: {
    alignSelf: 'stretch',
    flex: '1',
    flexBasis: '0%',
    margin: 'auto 0',
  },
  arrowIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  '@media (max-width: 991px)': {
    headerWrapper: {
      maxWidth: '100%',
    },
    addressText: {
      maxWidth: '100%',
    },
  },
};
const uploadImageStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "auto",
    alignSelf: 'stretch',
    borderRadius: '24px',
    background: 'var(--BG-gray,rgb(252, 252, 252))',
    display: 'flex',
    overflow: 'hidden',
    gap: " 10px",
    '@media (max-width: 991px)': {
      padding: '0 20px',
    },
  },
  image: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '50px',
    margin: '5px',
  },
  uploadInput: {
    display: 'none',
  },
  uploadButton: {
    cursor: 'pointer',
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50', // Example color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: " var(--BG-gray,rgb(233, 233, 233)"
  },
};
// 


const AddRequestSummary = ({product,setReviewProduct}) => {
    const { published_rentedtrue,published_rentedfalse,published_false ,products_confirmed, products_draft, products_pending, products_rejected } = useSelector((state) => state.seller_products);
  
useEffect(()=>{

},[product,published_rentedtrue,published_rentedfalse,published_false ,products_confirmed, products_draft, products_pending, products_rejected ])
  const dispatch=useDispatch()
  const sellerid = localStorage.getItem('sellerId');
 // Replace with dynamic user ID
  const handleapproved =async (product)=> {
      // const newStatus=false
      const productid=product.id
    if(product.published===true){
       const newStatuss={published: false,statuss:product.status}
       
      
   dispatch(ChangepublishedStatus({ sellerid, productid, newStatuss }));
   toast.success("تم الغاء النشر")
   setReviewProduct(product.id)

 
    }
    else{
      const newStatuss={published: true,statuss:product.status}

      dispatch(ChangepublishedStatus({sellerid,productid,newStatuss}))
     setReviewProduct(product.id)
     toast.success("تم  النشر")
   
    }
  await  dispatch(DraftProducts(sellerid));
  await  dispatch(PublishedTrue(sellerid));
  await  dispatch(PublishedFalse(sellerid));
  await  dispatch(PublishedRentedFalse(sellerid));
  await   dispatch(ConfirmedProducts(sellerid));
  await   dispatch(PendingProducts(sellerid));
  await  dispatch(RejectedProducts(sellerid));
  await   dispatch(PublishedRentedTrue(sellerid));
    };


  
  return (
    <div
    style={backgroundstyles.container}
    role="dialog"
    className='overflowstatus'
    aria-labelledby="dialog-title"
    aria-modal="true"
  >
    <div style={styles.mainContainer} className='topstate1'>

        <div style={styles.headetop}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1479ad6ccf24ef7ae351d02c2a94be35ccbf27bd1b93d744fba097d06561feba?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
                style={styles.icontop}
                alt="Order details icon"
                onClick={()=>  setReviewProduct(product.id)}
              />
              <div style={styles.orderTitle}>بيانات المنتج</div>
        </div>
         
        <div style={styles.container} className='flexReverse'>
              <div style={styles.left} className='details'>
              <div style={AddProductHeader.containerprices}>

              <TitleAddProductRequest title={"السعر"}/>
              <div style={ProductDetailsStyles.container}>
                  <div style={ProductDetailsStyles.topSection}>
                    <div style={ProductDetailsStyles.pricescontianer}>
                    <TextBoxField 
                      label="مبلغ التأمين  " 
                      placeholder={product.insurancefee} 
                  />
                     <TextBoxField 
                      label="نسبة الخصم " 
                      placeholder={product.discount}  
                  />
                     <TextBoxField 
                      label="سعر المنتج  " 
                      placeholder={product.price} 
                  />
            
                       
                    </div>
                    <TitleAddProductRequest title={"العروض"}/>

                    <div style={ProductDetailsStyles.pricescontianer}>
                      {
                        product.offerdata.map((i)=>(<>
                        
                        <TextBoxField 
                      label={`سعر المنتج لـ${i.days||"empty"} يوم `}   
                       placeholder={i.price||"empty"} 
                  />
                        
                        
                        </>))
                      }
                   
                 




                    </div>
                    
                                              
                  </div>
          
              </div>
              </div>
              {
                product &&  <RenterInfoAdmin Order={product}  />
              }
            
                <div style={styles.buttonscontainer} className='buttonscontainer'>



{
  product.published?
  <button 
  style={{ ...styles.actionButton, ...styles.rejectButton }}
  tabIndex="0"
  role="button"
  onClick={()=>handleapproved(product)}
>
 إلغاء النشر
</button>:
  <button 
  style={{ ...styles.actionButton, ...styles.approveButton }}
  tabIndex="0"
  role="button"
  onClick={()=>handleapproved(product)}
>
تفعيل النشر
</button>
}



                     
                          
                </div> 
            
                

              
          
              </div>
              <div style={styles.right}>

                    <div style={AddProductHeader.container}>

                      <TitleAddProductRequest title={"العنوان"}/>
                      <div style={ProductDetailsStyles.container}>
                              <div style={ProductDetailsStyles.topSection}>
                                  <div style={ProductDetailsStyles.pricescontianer}>
                                  <TextBoxField 
                                        label="الماركة" 
                                        placeholder={product.brand }

                                    />
                                         <TextBoxField 
                                        label="اسم المنتج" 
                                        placeholder={product.name }
                                    />
                                    
                                   </div>
                                   <div style={ProductDetailsStyles.pricescontianer}>
                               
                                   <TextBoxField 
                                        label="المدينة" 
                                        placeholder=  {product.address? (product.address.city || "empty"):"null"}
                                    />
                                         <TextBoxField 
                                        label="التصنيف" 
                                        placeholder= {product.category }
                                    />
                                    
                                   </div>
                                    
                                    
                                                    
                              </div>
                                            
                              <div style={ProductDetailsStyles.descriptionSection}>
                                                    <div style={ProductDetailsStyles.label}>وصف المنتج</div>
                                                    <textarea
                                                      style={ProductDetailsStyles.descriptionInput}
                                                      placeholder= {product.description || 'empty'}
                                                      
                                                    />
                              </div>{
                              }
                                            
                              <div style={ProductDetailsStyles.featuresSection}>
                                                    <div style={ProductDetailsStyles.label}>مميزات المنتج</div>
                                                    
                                                    <div style={ProductDetailsStyles.featuresGrid}>
                                                   { product.features?  
                                                  
                                                    (product.features.map((feature, index) => (
                                                        <div key={index} style={ProductDetailsStyles.featureBox}>
                                                          <input
                                                            type="text"
                                                            defaultValue={feature || 'empty'}
                                                            placeholder={`ميزة ${index + 1}`}
                                                            style={ ProductDetailsStyles.placeholder }
                                                            />
                                                        </div>
                                                      ))):<>
                                                          <div  style={ProductDetailsStyles.featureBox}>
                                                          <input
                                                            type="text"
                                                            defaultValue={ 'empty'}
                                                            placeholder={`ميزة `}
                                                            style={ ProductDetailsStyles.placeholder }
                                                            />
                                                        </div>
                                                        <div  style={ProductDetailsStyles.featureBox}>
                                                          <input
                                                            type="text"
                                                            defaultValue={ 'empty'}
                                                            placeholder={`ميزة `}
                                                            style={ ProductDetailsStyles.placeholder }
                                                            />
                                                        </div>
                                                        <div  style={ProductDetailsStyles.featureBox}>
                                                          <input
                                                            type="text"
                                                            defaultValue={ 'empty'}
                                                            placeholder={`ميزة `}
                                                            style={ ProductDetailsStyles.placeholder }
                                                            />
                                                        </div>
                                                        
                                                        
                                                        
                                                        
                                                        </>}
                                                    </div>
                              </div>

                                            
                      </div>

                    </div>
                    <div style={AddProductHeader.container}>

                          <TitleAddProductRequest title={"الصور"}/>
                          <div style={uploadImageStyles.container}>
                                         
   {product.images.length?  
   (product.images.map((img, index) => (
  <div key={index} >
     <img
                                        loading="lazy"
                                        src={img || "https://cdn.builder.io/api/v1/image/assets/TEMP/2674550b4959452a94907f0724e4cc69073cf7055b6f41793d6b528376975ab2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"}
                                        style={uploadImageStyles.image}
                                        alt="Default Placeholder"
                                      />  
  </div>
))):  <> <div style={uploadImageStyles.imageContainer}>
<img
  loading="lazy"
  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2674550b4959452a94907f0724e4cc69073cf7055b6f41793d6b528376975ab2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
  style={uploadImageStyles.image}
  alt="Default Placeholder"
/>                         
</div>
   <div style={uploadImageStyles.imageContainer}>
   <img
     loading="lazy"
     src="https://cdn.builder.io/api/v1/image/assets/TEMP/2674550b4959452a94907f0724e4cc69073cf7055b6f41793d6b528376975ab2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
     style={uploadImageStyles.image}
     alt="Default Placeholder"
   />                         
</div>
<div style={uploadImageStyles.imageContainer}>
   <img
     loading="lazy"
     src="https://cdn.builder.io/api/v1/image/assets/TEMP/2674550b4959452a94907f0724e4cc69073cf7055b6f41793d6b528376975ab2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
     style={uploadImageStyles.image}
     alt="Default Placeholder"
   />                         
</div></>
   }                             

                                
                               
                             
                          </div>
                    </div>                                   
    
              </div>

        </div>
    
    </div>
    </div>
  );
};

export default AddRequestSummary;