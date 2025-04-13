import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    getPendingProducts, 
    getConfirmedProducts , 
    getRejectedProducts,
    getPublichedProductsTrue,
    getPublichedProductsFalse,
    getDraftProducts ,
    addProducts,
    getPublichedRentedTrue,// Import the new function
    getPublichedRentedFalse,
    getSellerById,
    setProductPublished,
    getcustomerById,
    getProductById,
    getSellerByIdProduct,
    updateeticket,
    updateSellerDetails,
    // Import the new function


} from './firebasefunctions'; // Adjust the import path
import { toast } from "react-toastify";



export const getSeller = createAsyncThunk(
    'products/getSeller',
    async (sellerid, { rejectWithValue }) => {
        try {
         
            const sellerdata = await getSellerById(sellerid);
            return { sellerdata }; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const Updateseller = createAsyncThunk(
    'order/Updateseller',
    async ({ id,  sellerData }, { rejectWithValue }) => {
        try {
            const newDataSeller = await updateSellerDetails(id,sellerData);
          
            if(sellerData.active===true){
            toast.success("تم تفعيل الحساب ")

            }
             else if(sellerData.active===false){
                toast.warn("تم إلغاء تفعيل  الحساب ")
    
                }
            else{
                toast.warn("تم الغاء تفعيل هذا المالك ")
            }
           

            return newDataSeller; // Return the data directly
        } catch (error) {
            console.error('Error changing order status:', error);
            return rejectWithValue(error.message || 'Failed to change order status');
        }
    }
);

export const newstateActive = createAsyncThunk(
    "order/newstateActive",
    async ({ ticketid, sellerData }, { rejectWithValue }) => {
      try {
        const updatedTicket1 = await updateeticket(ticketid, sellerData);
  
        if (!updatedTicket1) {
          throw new Error("Firestore update failed, no data returned.");
        }
  
        if(sellerData.active===true)
        toast.success("تم فتح التذكره ")
    else{
        toast.success("تم غلق التذكره ")

    }
        return updatedTicket1; // إرجاع البيانات الجديدة إلى Redux
      } catch (error) {
        return rejectWithValue(error.message || "Failed to add comment");
      }
    }
  );


export const orderByIdProduct = createAsyncThunk(
    'products/orderByIdProductss',
    async ({sellerid, productid},{ rejectWithValue }) => {

        try {
            const orderBy_IdProduct = await getSellerByIdProduct(sellerid,productid);
            return { orderBy_IdProduct }; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const ChangepublishedStatus = createAsyncThunk(
    'order/ChangepublishedStatus',
    async ({ sellerid, productid, newStatuss }, { rejectWithValue }) => {
        try {
            const published_status = await setProductPublished(sellerid, productid, newStatuss);
            return published_status;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to change order status');
        }
    }
);

export const productbyId = createAsyncThunk(
    'products/productbyId',
    async ({sellerid,productid}, { rejectWithValue }) => {
        try {
            const productby_Id = await getProductById(sellerid,productid);
            return { productby_Id }; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const customerbyId = createAsyncThunk(
    'products/customerbyId',
    async (customerid, { rejectWithValue }) => {

        try {
            const customerby_Id = await getcustomerById(customerid);
            return { customerby_Id }; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const AddingProducts = createAsyncThunk(
    'product/add_Products',
    async (productData, { fulfillWithValue, rejectWithValue }) => { // Accept productData as an argument
        try {
            const Product_added = await addProducts(productData); // Pass productData to addProducts
          
           
          

            return fulfillWithValue({ Product_added }); // Wrap products in an object
        } catch (error) {
            console.log(error); // Log the error directly
            return rejectWithValue(error.message); // Pass the error message to the rejected action
        }
    }
);

export const PublishedRentedTrue = createAsyncThunk(
    'products/PublishedRentedTrue',
    async (sellerid,{ rejectWithValue }) => {
        try {
            const published_rentedtrue = await getPublichedRentedTrue(sellerid);
          
            return { published_rentedtrue }; // Return the data directly
        } catch (error) {
            console.error('Error published rented ture prducts:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const PublishedRentedFalse = createAsyncThunk(
    'products/PublishedRentedFalse',
    async (sellerid,{ rejectWithValue }) => {
        try {
            const published_rentedfalse = await getPublichedRentedFalse(sellerid);
         
            return { published_rentedfalse }; // Return the data directly
        } catch (error) {
            console.error('Error published rented false prducts:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const PublishedTrue = createAsyncThunk(
    'products/PublishedTrue',
    async (sellerid,{ rejectWithValue }) => {
        try {
            const published_true = await getPublichedProductsTrue(sellerid);
         
            return { published_true }; // Return the data directly
        } catch (error) {
            console.error('Error published true:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const PublishedFalse = createAsyncThunk(
    'products/PublishedFalse',
    async (sellerid,{ rejectWithValue }) => {
        try {
            const published_false = await getPublichedProductsFalse(sellerid);
           
            return { published_false }; // Return the data directly
        } catch (error) {
            console.error('Error published false:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const DraftProducts = createAsyncThunk(
    'order/DraftProducts',
    async (sellerid, { rejectWithValue }) => {
        try {
            const products_draft = await getDraftProducts(sellerid); // Call the actual function with sellerId
           
            return { products_draft }; // Return the data directly
        } catch (error) {
            console.error('Error fetching new orders:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const ConfirmedProducts = createAsyncThunk(
    'products/ConfirmedProducts',
    async (sellerid, { rejectWithValue }) => {
        try {
            const products_confirmed = await getConfirmedProducts(sellerid);
         
            return { products_confirmed }; // Return the data directly
        } catch (error) {
            console.error('Error confiremd prducts:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const PendingProducts = createAsyncThunk(
    'products/PendingProducts',
    async (sellerid, { rejectWithValue }) => {
        try {
            const products_pending = await getPendingProducts(sellerid); // Use the imported function
           
            return { products_pending }; // Return the data directly
        } catch (error) {
            console.error('Error pending prducts:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const RejectedProducts = createAsyncThunk(
    'products/RejectedProducts',
    async (sellerid, { rejectWithValue }) => {
        try {
            const products_rejected = await getRejectedProducts(sellerid); // Use the imported function
          
            return { products_rejected }; // Return the data directly
        } catch (error) {
            console.error('Error fetching rejected products:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const AddProducts = createAsyncThunk(
    'product/AddProducts',
    async (productData, { fulfillWithValue, rejectWithValue }) => { // Accept productData as an argument
        try {
            const addedProduct = await addProducts(productData); // Pass productData to addProducts
          
            return fulfillWithValue({ addedProduct }); // Wrap products in an object
        } catch (error) {
            console.log(error); // Log the error directly
            return rejectWithValue(error.message); // Pass the error message to the rejected action
        }
    }
);

const initialState = {
    products: [], // Array to store user's products
    published_true: [], // Array to store seller's orders
    published_false: [], // Array to store seller's orders
    products_rejected: [], // Array to store cancelled orders
    products_confirmed: [], // Array to store closed orders
    products_pending: [], // Array to store closed orders
    products_draft: [], // Array to store closed orders
    products_added:[],
    published_rentedtrue:[],
    published_rentedfalse:[],
    orderBy_IdProduct:[],
    productby_Id:[],
    newDataSeller:[],
    sellerdata:[],
    published_status:[],
    Product_added:[],
    customerby_Id:[],
    updatedTicket1:[],
    sellerid:null,
    loading: false,
    error: null,
    success: false,
};


export const sellerPrdouctsReducer = createSlice({
    name: 'sellerproducts',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
        setSellerId: (state, action) => {
            state.sellerid = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(productbyId.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(productbyId.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.productby_Id = action.payload.productby_Id; // Correctly store orders
        })
        .addCase(productbyId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase(Updateseller.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(Updateseller.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.newDataSeller = action.payload.newDataSeller; // Correctly store orders
        })
        .addCase(Updateseller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase(orderByIdProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(orderByIdProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.orderBy_IdProduct = action.payload.orderBy_IdProduct; // Correctly store orders
        })
        .addCase(orderByIdProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase(ChangepublishedStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(ChangepublishedStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.published_status = action.payload.published_status; // Correctly store orders
        })
        .addCase(ChangepublishedStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase(customerbyId.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(customerbyId.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.customerby_Id = action.payload.customerby_Id;
             // Correctly store orders
        })
        .addCase(customerbyId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase(getSeller.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(getSeller.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.sellerdata = action.payload.sellerdata; // Correctly store orders
        })
        .addCase(getSeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
            .addCase(PublishedTrue.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(PublishedTrue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.published_true = action.payload.published_true; // Correctly store orders
            })
            .addCase(PublishedTrue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(PublishedFalse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(PublishedFalse.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.published_false = action.payload.published_false; // Correctly store orders
            })
            .addCase(PublishedFalse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(DraftProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DraftProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products_draft = action.payload.products_draft; // Update the cancelled orders
            })
            .addCase(DraftProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

             // Handle getOrdersClosed lifecycle
             .addCase(ConfirmedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ConfirmedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products_confirmed = action.payload.products_confirmed; 
            })
            .addCase(ConfirmedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(newstateActive.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(newstateActive.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.updatedTicket1 = action.payload.updatedTicket1; // Correctly store orders
            })
            .addCase(newstateActive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
             .addCase(RejectedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(RejectedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products_rejected = action.payload.products_rejected; // Update the new orders
            })
            .addCase(RejectedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddingProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(AddingProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products_added = action.payload.products_added; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(AddingProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
            .addCase(PendingProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(PendingProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products_pending = action.payload.products_pending; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(PendingProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
            .addCase(PublishedRentedTrue.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(PublishedRentedTrue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.published_rentedtrue = action.payload.published_rentedtrue; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(PublishedRentedTrue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
            .addCase(PublishedRentedFalse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(PublishedRentedFalse.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.published_rentedfalse = action.payload.published_rentedfalse; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(PublishedRentedFalse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
            .addCase(AddProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(AddProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.product_added = action.payload.product_added; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(AddProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
                    
    
        }
    
});

// Export actions
export const { resetSuccess, setSellerId } = sellerPrdouctsReducer.actions;

// Export the reducer
export default sellerPrdouctsReducer.reducer;