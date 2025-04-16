import  { useEffect,useState } from 'react';
import AddProductInfo from './AddProductInfo';
import ImageUploader from './ImageUploader';
import { useSelector, useDispatch } from 'react-redux';
import { AddingProducts, getSeller } from '../../../store/reducers/sellerProductsReducer';
import { Timestamp } from "firebase/firestore"; 
import { toast } from 'react-toastify';


const iconimg = 'https://cdn.builder.io/api/v1/image/assets/TEMP/b96d1ed5b69bb8dcca96ca72efe39f483bf3d84f91f02fd737257c912709c862?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e';


const addingProductPageStyles = {
  container: {
      display: 'flex' , 
      width: '100%',
      alignItems: 'flex-start', 

  },
  gotoproductpagebtn: {
    alignSelf: 'end',
    borderRadius: '50px',
    border: '1px solid var(--Blue, #26969c)',
    marginTop: '8px',
    marginBottom: '8px',
    color: 'var(--Blue, #26969c)',
    fontWeight: '400',
    padding: '12px 20px',
    background: 'white',
    cursor: 'pointer',

  },
  left: {
      backgroundColor: '#f0f0f0', // Green
      padding: '4px',
      display: 'flex', // Ensure it's a flex container
      flexDirection: 'column', // Adjust direction as needed
      flex: '1', // Allows the left div to expand
      overflowY: 'auto', // Allows scrolling if content overflows


  },
  right: {
      flex: '0 0 30%', // 30% width
      backgroundColor: '#f0f0f0', // Red
      padding: '8px',
      display: 'flex', // Ensure it's a flex container
      flexDirection: 'column', // Adjust direction as needed
      height: '530px', // Fixed height for the right div
      justifyContent : 'center',
      alignItems: 'center'
  }
};


const AddProductHeader = {
container: {
  borderRadius: '24px',
  background: 'var(--White, #fff)',
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
  display: 'flex',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
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

const addNewAddressStyles = {
container: {
  display: 'flex',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexDirection: 'column',
  justifyContent: 'end',


},
formWrapper: {
  display: 'flex',
  wwidth: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
  alignItems: 'start',
  gap: '50px',
  justifyContent: 'end',
  background : 'transparent',
  flexWrap: 'wrap',

},

inputContainer: {
  display: 'flex',
  width: '80px', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
  flexDirection: 'column',
  justifyContent: 'end',
  background: 'transparent',


},
label: {
  color: 'var(--Black, #020202)',
},
input: {
  borderRadius: '16px',
  background: 'var(--BG-gray, #f6f5f5)',
  display: 'flex',
  marginTop: '12px',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
  color: 'rgba(25, 23, 21, 0.5)',
  fontWeight: '300',
  textAlign: 'right',
  padding: '16px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none'
},
cityContainer: {
  display: 'flex',
  width: '300px', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexDirection: 'column',
  justifyContent: 'end',
  background : 'transparent',
  boxSizing: 'border-box', 


},
citySelect: {
  justifyContent: 'space-between',

  borderRadius: '16px',
  background: 'var(--BG-gray, #f6f5f5)',
  display: 'flex',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  boxSizing: 'border-box', 

  color: 'rgba(25, 23, 21, 0.5)',
  fontWeight: '300',
  textAlign: 'right',
  padding: '16px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  marginTop: '8px'
},
cityIcon: {
  aspectRatio: '1',
  objectFit: 'contain',
  objectPosition: 'center',
  width: '16px',
  alignSelf: 'stretch',
  margin: 'auto 0',
},
cityText: {
  alignSelf: 'stretch',
  margin: 'auto 0',
},
submitButton: {
  alignSelf: 'end',
  borderRadius: '50px',
  border: '1px solid var(--Blue, #26969c)',
  marginTop: '16px',
  color: 'var(--Blue, #26969c)',
  fontWeight: '400',
  padding: '12px 20px',
  background: 'transparent',
  cursor: 'pointer',
},
};

const ProductDetailsStyles = {
container: {
  display: 'flex',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
  flexDirection: 'column',
  alignItems: 'end',
  font: '14px/1 Expo Arabic, sans-serif',
  background : 'tranparent',
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
field: {
  display: 'flex',
  height: 'auto', 
  minWidth: '0', 
  flexDirection: 'column',
  justifyContent: 'start',
  flexGrow: 1,
  width: '300px',
  background: 'transparent',
  paddingTop : '10px'
},
label: {
  color: 'var(--Text,rgb(34, 34, 37))',
  background : 'transparent',
  

},
inputContainer: {

  borderRadius: '16px',
  background: 'var(--BG-gray,rgb(245, 246, 245))',
  display: 'flex',
  marginTop: '8px',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
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

  flexDirection: 'column',
},
descriptionInput: {
  borderRadius: '16px',
  background: 'var(--BG-gray,rgb(245, 246, 245))',
  marginTop: '8px',
  minHeight: '140px',
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  boxSizing: 'border-box', 
  gap: '8px',
  color: 'var(--Cool, #8d8883)',
  padding: '16px 16px 104px',
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
  height: 'auto', 
  minWidth: '0', 
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
  width: '253px',
  padding: '16px',
},
placeholder: {
  direction: 'rtl' , 
  border: 'none', 
  outline: 'none', 
  flex: 1,
  width: '100%', 
  height: 'auto', 
  minWidth: '0', 
  maxWidth: '100%', 
  flexGrow: 1, 
  flexShrink: 0, 
  background : 'transparent'

}
};

const InsuranceDiscount = {

Main : {
 display: 'flex',
 width: '100%',
 alignItems: 'start',
 gap: '16px',
 justifyContent: 'end',
 flexWrap: 'wrap',
     
},

Field: {

 display: 'flex',
 height: 'auto', 
 minWidth: '0', 
 flexDirection: 'column',
 justifyContent: 'start',
 flexGrow: 1,
 width: '150px',
 background: 'transparent',
 paddingTop : '10px'
},

 InputContainer :{
   borderRadius: '16px',
   background: 'var(--BG-gray,rgb(245, 246, 245))',
   display: 'flex',
   marginTop: '8px',
   height: 'auto', 
   minWidth: '0', 
   maxWidth: '100%', 
   flexGrow: 1, 
   flexShrink: 0, 
   boxSizing: 'border-box', 
   gap: '16px',


 }
}


const PricingOffering = {

Main : {
 display: 'flex',
 width: '100%',
 alignItems: 'start',
 gap: '16px',
 justifyContent: 'end',
 flexWrap: 'wrap',
     
},

Field: {

 display: 'flex',
 height: 'auto', 
 minWidth: '0', 
 flexDirection: 'column',
 justifyContent: 'start',
 flexGrow: 1,
 width: '150px',
 background: 'transparent',
 paddingTop : '10px'
},

 InputContainer :{
   borderRadius: '16px',
   background: 'var(--BG-gray,rgb(245, 246, 245))',
   display: 'flex',
   marginTop: '8px',
   height: 'auto', 
   minWidth: '0', 
   maxWidth: '100%', 
   flexGrow: 1, 
   flexShrink: 0, 
   boxSizing: 'border-box', 
   gap: '16px',


 }
}

const insuranceStyle = {
formContainer: {
  display: 'flex',
  alignItems: 'end',
  width: '100%', 
  height: 'auto', // Allow height to adjust based on content
  minWidth: '0', // Ensure no minimum width constraints
  maxWidth: '100%', // Ensure it doesn't exceed parent width
  flexGrow: 1, // Allow it to grow and fill available space
  flexShrink: 0, // Prevent shrinking if there's enough space
  flexWrap: 'wrap',

  
 },

 
fieldContainer: {
  display: 'flex',
  minWidth: 'px',
  flexDirection: 'column',
  whiteSpace: 'nowrap',
  justifyContent: 'start',
  flexGrow: 1,
  width: '212px',
  background: 'blue',
  paddingTop : '10px'

},
fieldLabel: {
  color: 'var(--Text, #252422)',
  fontWeight: 400
},
insuranceInput: {
  borderRadius: '16px',
  background: 'var(--BG-gray, #f6f5f5)',
  marginTop: '8px',
  width: '85%',
  color: 'var(--Cool, #8d8883)',
  fontWeight: 300,
  border: 'none',
  textAlign : 'right',
  padding: '16px'
}
};

const productPricingStyle = {
pricingContainer: {
  display: 'flex',
  width: '100%', // Set to 100% to take full width of the parent
  height: 'auto', // Allow height to adjust based on content
  minWidth: '0', // Ensure no minimum width constraints
  maxWidth: '100%', // Ensure it doesn't exceed parent width
  flexGrow: 1, // Allow it to grow and fill available space
  flexShrink: 0, // Prevent shrinking if there's enough space
  boxSizing: 'border-box', // Include padding and borders in width calculations
  flexDirection: 'column',
  background: 'transparent',
  paddingTop: '10px',
  paddingBottom: '10px'

 
},
inputRow: {
  display: 'flex',
  alignItems: 'start',
  gap: '16px',
  justifyContent: 'start',
  background: 'transparent'
},
inputGroup: {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  background: 'transparent',
  width: '100%'

},
inputLabel: {
  color: 'var(--Text, #252422)',
  
},
inputField: {
  borderRadius: '16px',
  background: 'var(--BG-gray, #f6f5f5)',
  marginTop: '8px',
  width: '100%', // Set to 100% to take full width of the parent
  height: 'auto', // Allow height to adjust based on content
  minWidth: '0', // Ensure no minimum width constraints
  maxWidth: '100%', // Ensure it doesn't exceed parent width
  flexGrow: 1, // Allow it to grow and fill available space
  flexShrink: 0, // Prevent shrinking if there's enough space
  boxSizing: 'border-box', // Include padding and borders in width calculations
  padding: '16px',
  color: 'var(--Cool, #8d8883)',
  direction: 'rtl',
  border: 'none'
},
offersSection: {
  display: 'flex',
  marginTop: '16px',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'start',
},
offersTitle: {
  color: 'var(--Text, #252422)',
  fontSize: '16px',
},
};
const addProductAction = {
container: {
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '16px',
  background: 'var(--White, #fff)',
  display: 'flex',
  gap: '40px 100px',
  flexWrap: 'wrap',
  padding: '16px',
},
buttonGroup: {
  alignSelf: 'stretch',
  display: 'flex',
  minWidth: '240px',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  textAlign: 'center',
  lineHeight: '1',
  justifyContent: 'start',
  margin: 'auto 0',
},
button: {
  alignSelf: 'stretch',
  borderRadius: '50px',
  gap: '8px',
  margin: 'auto 0',
  padding: '12px 24px',
  width: 'auto',
},
buttonPrimary: {
  background: 'var(--Blue, #27989e)',
  color: '#ffffff',
  fontWeight: '600',
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
},
buttonSecondary: {
  background: 'var(--BG-gray, #f6f5f5)',
  color: 'var(--Paragraph, #736e67)',
},
selectionInfo: {
  alignSelf: 'stretch',
  display: 'flex',
  minWidth: '240px',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
  textAlign: 'right',
  justifyContent: 'end',
  width: '334px',
  margin: 'auto 0',
},
selectedCount: {
  color: 'var(--Blue, #26969c)',
  alignSelf: 'stretch',
  margin: 'auto 0',
},
selectionText: {
  color: 'var(--Text, #252422)',
  fontWeight: 400,
  alignSelf: 'stretch',
  margin: 'auto 0',
},
selectionIcon: {
  aspectRatio: '1',
  objectFit: 'contain',
  objectPosition: 'center',
  width: '20px',
  alignSelf: 'stretch',
  margin: 'auto 0',
}
};

const uploadImageStyles = {
container: {
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '24px',
  background: 'var(--BG-gray, #f6f5f5)',
  display: 'flex',
  maxWidth: '648px',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: '65px 80px',
  '@media (max-width: 991px)': {
    padding: '0 20px',
  },
},
image: {
  aspectRatio: '1',
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
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
},
};

const cities = [
  'الرياض',
  'المدينة',
  'الدمام',
   'القصيم',
  'مكة',
   'جدة',
  'الخبر',
];

const categories = [
  { value: 'tools', text: 'أدوات ومعدات' },
  { value: 'furniture', text: 'اثاث ومفروشات' },
  { value: 'vehicles', text: 'سيارات ومركبات' },
  { value: 'home_appliances', text: 'اجهزة منزلية' },
  { value: 'electronics', text: 'الكترونيات' },
];

const fields = [
  {
    label: "مبلغ التأمين المطلوب",
    placeholder: "مبلغ التأمين المطلوب"
  },
  {
    label: "نسبة الخصم",
    placeholder: "نسبة الخصم"
  },
  {
    label: "سعر المنتج لليوم الواحد",
    placeholder: "سعر المنتج لليوم الواحد"
  }
];

const offering = [
  {
    label: " سعر المنتج لـ14 يوم ",
    placeholder: "  سعر المنتج لـ14 يوم"
  },
  {
    label: "سعر المنتج لـ7 أيام",
    placeholder: "سعر المنتج لـ7 أيام"
  },
  {
    label: "سعر المنتج لـ5 أيام",
    placeholder: "سعر المنتج لـ5 أيام"
  }
];
const AddProduct = () => {

const {sellerdata}=useSelector((state)=>state.seller_products)
  const getFirebaseTimestamp = () => {
    const currentDate = new Date();

    return Timestamp.fromDate(currentDate);
};
  const dispatch = useDispatch();

  const {Product_added  } = useSelector((state) => state.seller_products);


  // State Variables
  const [title, setTitle] = useState('');
  const [productDetails, setProductDetails] = useState({
    brand: '',
    productName: '',
    category: '',
    description: '',
    features: ['', '', ''],
  });
  const [cityproduct, setCityproduct] = useState('');
  const [NewAddress, setNewAddress] = useState('');
  const [city, setCity] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [CityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [ProductDetailsExpanded, setProductDetailsExpanded] = useState(false);
  const [ProductPriceExpanded, setProductPriceExpanded] = useState(false);
  const [ProductPictureeExpanded, setProductPictureeExpanded] = useState(false);
  const [ProductAddressExpanded, setProductAddressExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [insuranceInput, setInsurance] = useState({});
  const [offeringeInput, setOffering] = useState({});

  const sellerid = localStorage.getItem('sellerId');

    const handleInputChange = (field) => (event) => {
      const { value } = event.target;
  
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    };
  
    const handleAddressChange = (event) => {
      setNewAddress(event.target.value);
    };
  
    const handleFeatureChange = (index) => (event) => {
      const { value } = event.target;
      const newFeatures = [...productDetails.features];
      newFeatures[index] = value;
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        features: newFeatures,
      }));
    };
  
    const handleCitySelectaddress = (selectedCity) => {
      setCity(selectedCity);
      setIsCityDropdownOpen(false);
    };
  
    const handleCitySelectProduct = (selectedCity) => {
      setCityproduct(selectedCity);
      setCityDropdownOpen(false);
    };
  

    const insuranceFieldChange = (label) => (event) => {
      setInsurance({
        ...insuranceInput,
        [label]: event.target.value,
      });
    };
  
    const offeringFieldChange = (label) => (event) => {
      setOffering({
        ...offeringeInput,
        [label]: event.target.value,
      });
    };
  
   const handleSubmit = (e,status) => {
    e.preventDefault();

   
    const productData = {
    
      rented: false, 
      published: true,
      brand: productDetails.brand,
      category: productDetails.category,
      address : {
        city : city,  
        address : NewAddress,

      }
      ,
      feedback:[
        {
          name:"name",
comment:"comment",
rating:0
        }
      ]
,
      offerdata: [
        {
          days : 14,
          price : parseInt(offeringeInput[" سعر المنتج لـ14 يوم "] || 0)
        }, 
        {
        price : parseInt(offeringeInput["سعر المنتج لـ5 أيام"] || 0),
        days : 5
        },
        {
        days : 7,
        price: parseInt(offeringeInput["سعر المنتج لـ7 أيام"] || 0),
      }
      ],
      description: productDetails.description,
      discount: parseInt(insuranceInput["نسبة الخصم"] || 0), 
      eventtags: [],
      images: images,  
      features:productDetails.features,
      img: images[0] || "", 
      insurancefee: parseFloat(insuranceInput["مبلغ التأمين المطلوب"] || 0),  
      name: productDetails.productName,
      oldprice: parseInt(insuranceInput["سعر المنتج لليوم الواحد"] || 0), 
      price: parseInt(insuranceInput["سعر المنتج لليوم الواحد"] || 0), 
      rating: 5, 
      sellerid:sellerid,
      shipping: 0,
      shopName: "", 
      status: status.status, 
      subcategory: productDetails.category, 
      createdAt : getFirebaseTimestamp()
    };


    if(sellerdata.status==="approved"){
    if(productDetails.brand.length && productDetails.category.length && city.length && NewAddress.length && images.length && productDetails.description.length && productDetails.productName.length && productDetails.category.length && productDetails.features.length )
    { 
     
   
        if(status.status==="pending")
          {  toast.success("تم اضافه منتج جديد")}
           else{
             toast.success("تم اضافه المنتج للمسودة")
       
          
         
        }
        dispatch(AddingProducts(productData))
        setProductDetails({
          brand: '',
          productName: '',
          category: '',
          description: '',
          features: ['', '', ''],
        })
        setNewAddress('')
        setInsurance({})
        setOffering({})
        setCity('')
        setImages('')
    }
      else{
     return    toast.info("يجب مليئ كل المدخلات ")
     
      }}
      else{
        toast.error('لا يمكنك النشر حاليا')
      }

    
  
  }

  
  const handleAddProduct = (action) => {
    if (action === "نشر المنتج") {
      handleSubmit({ preventDefault: () => {} },{ status: "pending"}); // Simulate form submission
 
    } else if (action === "حفظ كمسودة") {
      // Handle saving as draft (if needed)
      handleSubmit({ preventDefault: () => {} },{ status: "draft"}); 
  

    }
  };
  
    useEffect(() => {
dispatch(getSeller(sellerid))
    }, []); // Runs when 'uploaded' changes
  

  const toggleExpandproductdetails = () => {
    setProductDetailsExpanded(!ProductDetailsExpanded);
  };

  const toggleExpandproductprice = () => {
    setProductPriceExpanded(!ProductPriceExpanded);
  };

  const toggleExpandproductpicture = () => {
    setProductPictureeExpanded(!ProductPictureeExpanded);
  };

  const toggleExpandproductaddress = () => {
    setProductAddressExpanded(!ProductAddressExpanded);
  };


  const productFields = [
    {
      label: 'الماركة',
      value: productDetails.brand,
      onChange: handleInputChange('brand'),
      placeholder: 'الماركة',
    },
    {
      label: 'اسم المنتج',
      value: productDetails.productName,
      onChange: handleInputChange('productName'),
      placeholder: 'اسم المنتج',
    },
    {
      label: 'التصنيف',
      value: productDetails.category,
      onChange: handleInputChange('category'),
      placeholder: 'التصنيف',
      type: 'dropdown',
      options: categories,
    },
  ];





  const handleGoToProductPage = () => {
    window.location.href = "https://trent.sa";
};


  return (
        <div>  
               <button
                    type="button" 
                    style={addingProductPageStyles.gotoproductpagebtn}
                    onClick={handleGoToProductPage}
                >
                     إلى صفحة المنتج
                </button>
    
                  <div style={addingProductPageStyles.container}>
      
    
                      <div style={addingProductPageStyles.left}>
                     
                          <div style={AddProductHeader.container}>
                             
                              <AddProductInfo link={iconimg} toggleExpand={toggleExpandproductdetails} title={title} />
                         
                              <div style={{ ...AddProductHeader.extendedContent, ...(ProductDetailsExpanded ? AddProductHeader.visible : AddProductHeader.hidden),}}>
                              
                                  {ProductDetailsExpanded && (
                                    <div >
                                                             
                                      <div style={ProductDetailsStyles.container}>
                                        <div style={ProductDetailsStyles.topSection}>
                                        {productFields.map((field, index) => (
                                              <div key={index} style={ProductDetailsStyles.field}>
                                                <div style={ProductDetailsStyles.label}>{field.label}</div>
                                                <div style={ProductDetailsStyles.inputContainer}>
                                                  {field.type === 'dropdown' ? (
                                                    <select
                                                      value={field.value}
                                                      onChange={field.onChange}
                                                      style={ProductDetailsStyles.placeholder}
                                                    >
                                                      <option value="" disabled>
                                                        {field.placeholder}
                                                      </option>
                                                      {field.options.map((option, idx) => (
                                                        <option key={idx} value={option.value}>
                                                          {option.text}
                                                        </option>
                                                      ))}
                                                    </select>
                                                  ) : (
                                                    <input
                                                      type="text"
                                                      value={field.value}
                                                      onChange={field.onChange}
                                                      placeholder={field.placeholder}
                                                      style={ProductDetailsStyles.placeholder}
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                         
                                           
                                        </div>
                                  
                                        <div style={ProductDetailsStyles.descriptionSection}>
                                          <div style={ProductDetailsStyles.label}>وصف المنتج</div>
                                          <textarea
                                            style={ProductDetailsStyles.descriptionInput}
                                            value={productDetails.description}
                                            onChange={handleInputChange('description')}
                                            placeholder="وصف المنتج"
                                            
                                          />
                                        </div>
                                  
                                        <div style={ProductDetailsStyles.featuresSection}>
                                          <div style={ProductDetailsStyles.label}>مميزات المنتج</div>
                                          <div style={ProductDetailsStyles.featuresGrid}>
                                            {productDetails.features.map((feature, index) => (
                                              <div key={index} style={ProductDetailsStyles.featureBox}>
                                                <input
                                                  type="text"
                                                  value={feature}
                                                  onChange={handleFeatureChange(index)}
                                                  placeholder={`ميزة ${index + 1}`}
                                                  style={ ProductDetailsStyles.placeholder }
                                                  />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                  
                                      </div>
                                  
                                    </div>
                                  )}
                              </div>
                              <AddProductInfo link={iconimg} toggleExpand={toggleExpandproductpicture} title={title} />
                              <div style={{ ...AddProductHeader.extendedContent, ...(ProductPictureeExpanded ? AddProductHeader.visible : AddProductHeader.hidden),}}>
                              
                                  {ProductPictureeExpanded && (
                                    <>
                                
                                      <div style={uploadImageStyles.container}>
                                        
                                      <ImageUploader setImages={setImages} setUploaded={setUploaded}/>
                                         
                                      </div>
                                    </>
                                  )}
                              </div>
                       
                              <AddProductInfo link={iconimg} toggleExpand={toggleExpandproductprice} title={title} />
    
                              <div style={{ ...AddProductHeader.extendedContent, ...(ProductPriceExpanded ? AddProductHeader.visible : AddProductHeader.hidden),}}>
                              
                              {ProductPriceExpanded && (
                                <>       
                                 <div style={productPricingStyle.pricingContainer}>
                                    
                                      <div style={InsuranceDiscount.Main}>
                                          {fields.map((field, index) => (
                                            
    
                                          <div key={index} style={InsuranceDiscount.Field}>  
                                                <label htmlFor={field.label.replace(/\s+/g, '-').toLowerCase()} style={insuranceStyle.fieldLabel}>
                                                {field.label}
                                              </label>
    
                                            <div  style={InsuranceDiscount.InputContainer}>
                                        
                                              <input 
                                                  type="text"
                                                  id={field.label.replace(/\s+/g, '-').toLowerCase()}
                                                  className="insuranceinput"
                                                  placeholder={field.placeholder}
                                                  aria-label={field.label}
                                                  value={insuranceInput[field.label]} // Use the updated state variable
                                                  onChange={insuranceFieldChange(field.label)} // Use the updated change handler
                                                  style={insuranceStyle.insuranceInput} // Apply styles directly
                                              />
                                            </div>
                                            </div>
                                          
                                          ))}
                                      </div> 
                                      <div style={{ color: 'var(--Text, #252422)',fontSize: '16px',fontWeight: '400',marginTop: '16px'}}> العروض</div>
                                      <div style={PricingOffering.Main}>
                                          {offering.map((field, index) => (
                                            
    
                                          <div key={index} style={PricingOffering.Field}>  
                                                <label htmlFor={field.label.replace(/\s+/g, '-').toLowerCase()} style={insuranceStyle.fieldLabel}>
                                                {field.label}
                                              </label>
    
                                            <div  style={PricingOffering.InputContainer}>
                                        
                                              <input 
                                                type="text"
                                                id={field.label.replace(/\s+/g, '-').toLowerCase()}
                                                className="insuranceinput"
                                                placeholder={field.placeholder}
                                                aria-label={field.label}
                                                value={insuranceInput[field.label]} // Use the updated state variable
                                                onChange={offeringFieldChange(field.label)} // Use the updated change handler
                                                style={insuranceStyle.insuranceInput} // Apply styles directly
                                              />
                                            </div>
                                            </div>
                                          
                                          ))}
                                      </div> 
                           
                           
                                 </div>
                          
                                                     
                                </>
                              )}
                              </div>
                              <AddProductInfo link={iconimg} toggleExpand={toggleExpandproductaddress} title={title} />
    
                              <div style={{ ...AddProductHeader.extendedContent, ...(ProductAddressExpanded ? AddProductHeader.visible : AddProductHeader.hidden),}}>
                              
                              {ProductAddressExpanded && (
    
                                <>
                                <form onSubmit={handleSubmit} style={addNewAddressStyles.container}>
                                        <div style={addNewAddressStyles.formWrapper}>
    
                                            <div style={addNewAddressStyles.cityContainer}>
                                              <label htmlFor="NewAddress" >العنوان</label>
                                              <div style={addNewAddressStyles.citySelect}>
                                               
                                                    <input
                                                      type="text"
                                                      id="NewAddress"
                                                      value={NewAddress}
                                                      onChange={handleAddressChange}
                                                      placeholder="أدخل عنوانك " // Placeholder text
                                                      aria-expanded={false} // Placeholder for aria attribute
                                                      aria-haspopup="listbox" // Placeholder for aria attribute
                                                      style={{ 
                                                        border: 'none', 
                                                        outline: 'none', 
                                                        flex: 1, 
                                                        fontSize: '16px', // Ensuring consistency in font size
                                                        background : 'transparent',
                                                        direction: 'rtl'
                                                      }} 
                                                    />
                                               </div>
                                            
                                            </div>
                                            <div style={addNewAddressStyles.cityContainer}>
                                              <label htmlFor="citySelect" >المدينة</label>
                                              <button
                                                type="button"
                                                id="citySelect"
                                                style={addNewAddressStyles.citySelect}
                                                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                                aria-expanded={isCityDropdownOpen}
                                                aria-haspopup="listbox"
                                              >
                                                <img
                                                  loading="lazy"
                                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aeaf6d114702cb386041551703c295479e256f50df59d10982e98b8d2373dd?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
                                                  style={addNewAddressStyles.cityIcon}
                                                  alt=""
                                                />
                                                <span style={addNewAddressStyles.cityText}>
                                                  {city || 'اختر المدينة'}
                                                </span>
                                              </button>
                                                {isCityDropdownOpen && (
                                                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                    {cities.map((cityOption) => (
                                                      <li key={cityOption}       
                                                      style={{
                                                        background: 'white',
                                                        
                                                      }}>
                                                        <button
                                                          type="button"
                                                          style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: 'var(--Blue, #26969c)',
                                                            cursor: 'pointer',
                                                            textAlign: 'right',
                                                            width: '100%',
                                                          }}
                                                          onClick={() => handleCitySelectaddress(cityOption)}
                                                        >
                                                          {cityOption}
                                                        </button>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                )}
                                            </div>
                                        </div>
                                     
                                </form>
                                </>
                              )}
                              </div>
                              
                          
                          </div>
                      </div>
                  </div>
                  <div style={addProductAction.container}>
                      <div style={addProductAction.buttonGroup}>
                        <button
                          style={{ ...addProductAction.button, ...addProductAction.buttonSecondary }}
                          onClick={() => handleAddProduct("حفظ كمسودة")}
                          tabIndex="0"
                        >
                          حفظ كمسودة
                        </button>
                        <button
                          style={{ ...addProductAction.button, ...addProductAction.buttonPrimary }}
                          onClick={() => handleAddProduct("نشر المنتج")}
                          tabIndex="0"
                        >
                          نشر المنتج
                        </button>
                      </div>
               
                  </div>
              </div>
  
  );
};

export default AddProduct;