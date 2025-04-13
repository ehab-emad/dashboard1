import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { deleteorderbycustomer, getOrdersByCustomerId, getOrdersNewCustomer } from "./firebasefunctions";


/////////////////////////////////fuctions for customer
export const getCustomerOrders = createAsyncThunk(
    'order/getCustomerOrders',
    async (customerId, { rejectWithValue }) => {
        try {
            const customerorders = await getOrdersByCustomerId(customerId);
          
            return { customerorders }; // Return the data directly
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const DeleteorderbyCustomer = createAsyncThunk(
    'order/DeleteorderbyCustomer',
    async ({customerid,id}, { rejectWithValue }) => {
        try {
         
            const delete_order = await deleteorderbycustomer(customerid,id);
            toast.warn("تم حذف هذا المنتج بنجاح")

            return delete_order; // Return the data directly
        } catch (error) 
        {
            console.error('Error changing prducts status:', error);
            return rejectWithValue(error.message || 'Failed to change order status');
        }
    
    }
);
export const getNewOrdersCustomer = createAsyncThunk(
    'order/getNewOrdersCustomer',
    async (customerid, { rejectWithValue }) => {
        try {
            const new_orders = await getOrdersNewCustomer(customerid); // Call the actual function with sellerId
           
            return { new_orders }; // Return the data directly
        } catch (error) {
            console.error('Error fetching new orders:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Initial state
const initialState = {
   
    loading: false,
    error: null,
    new_orders:[],
    delete_order:[],
    customerorders:[],
    success: false,
};


export const customerOrdersReducer = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
              .addCase(getCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getCustomerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customerorders = action.payload.customerorders; // Correctly store orders
            })
            .addCase(getCustomerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            }) 
            .addCase(DeleteorderbyCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(DeleteorderbyCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.delete_order = action.payload.delete_order; // Correctly store orders
            })
            .addCase(DeleteorderbyCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            }) 
            
            
            .addCase(getNewOrdersCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getNewOrdersCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.new_orders = action.payload.new_orders; // Correctly store orders
            })
            .addCase(getNewOrdersCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
          

       

    
        }
    
});

// Export actions
export const { resetSuccess } = customerOrdersReducer.actions;

// Export the reducer
export default customerOrdersReducer.reducer;