import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
   
    getcustomerById,
    getProductByIdCustomer,
   

} from './firebasefunctions'; // Adjust the import path
import { toast } from "react-toastify";

export const getCustomer = createAsyncThunk(
    'product/getCustomer',
    async (customerid, { rejectWithValue }) => {
        try {
         
            const customerdata = await getcustomerById(customerid);
            return { customerdata }; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const productbyIdCustomer = createAsyncThunk(
    'products/productbyIdCustomer',
    async ({productid}, { rejectWithValue }) => {
        try {
         
            const productby_Id = await getProductByIdCustomer(productid);
            return { productby_Id }; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const initialState = {
    customerdata:[],
    productby_Id:[],
    sellerid:null,
    loading: false,
    error: null,
    success: false,
};


export const customerPrdouctsReducer = createSlice({
    name: 'customerproducts',
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
       
            .addCase(getCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customerdata = action.payload.customerdata; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(getCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
            .addCase(productbyIdCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Handle the fulfilled state when the product is added successfully
            .addCase(productbyIdCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productby_Id = action.payload.productby_Id; // Store as a single object
            })
            // Handle the rejected state if there's an error
            .addCase(productbyIdCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use action.payload instead of action.error.message
                state.success = false;
            })
                    
    
        }
    
});

// Export actions
export const { resetSuccess, setSellerId } = customerPrdouctsReducer.actions;

// Export the reducer
export default customerPrdouctsReducer.reducer;