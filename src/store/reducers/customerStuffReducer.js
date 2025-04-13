import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { getCustomerNotifications, getTickets, getTransactionsCustomer } from "./firebasefunctions";




//////////////////////////////fuctions for customer
export const CustomerNotifications = createAsyncThunk(
    'notification/CustomerNotifications',
    async (customerid, { rejectWithValue }) => {
        try {
            const customer_notification = await getCustomerNotifications(customerid); // Call the actual function with sellerId
          
            return {customer_notification}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching seller notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);
export const CustomerTransactions = createAsyncThunk(
    'seller/CustomerTransactions',
    async (customerid, { rejectWithValue }) => {
        try {
            const customer_transactions = await getTransactionsCustomer(customerid); // Call the actual function with sellerId
           
            return {customer_transactions}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching seller notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const GetAllTicketsCustomer = createAsyncThunk(
    'tickets/GetAllTicketsCustomer',
    async (userid, { rejectWithValue }) => {
        try {
            const customer_tickets = await getTickets(userid); // Call the actual function with sellerId
          
            return {customer_tickets}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching customer notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);

// Initial state
const initialState = {
    customer_tickets:[],
   
    customer_notification:[],
    customer_transactions:[],
    loading: false,
    error: null,
    success: false,
};


export const customerStuffReducer = createSlice({
    name: 'stuff',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(CustomerNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(CustomerNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customer_notification = action.payload.customer_notification; // Correctly store orders
            })
            .addCase(CustomerNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(GetAllTicketsCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GetAllTicketsCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customer_tickets = action.payload.customer_tickets; // Correctly store orders
            })
            .addCase(GetAllTicketsCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(CustomerTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(CustomerTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customer_transactions = action.payload.customer_transactions; // Correctly store orders
            })
            .addCase(CustomerTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
          
 
 
 
       
  
                    
    
        }
    
});

// Export actions
export const { resetSuccess } = customerStuffReducer.actions;

// Export the reducer
export default customerStuffReducer.reducer;