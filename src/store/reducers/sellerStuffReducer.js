import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 

    getSellerNotifications,// Import the new function
    getTickets,
    getTransactions,

    appendChatToTicket,
    getCustomerNotifications,
    updateSellerDetails,
    

} from './firebasefunctions'; // Adjust the import path
import { toast } from "react-toastify";



export const addcommentAdmin = createAsyncThunk(
    "order/addcommentAdmin",
    async ({ ticketid, newChatMessages }, { rejectWithValue }) => {
      try {
        const updatedTicket = await appendChatToTicket(ticketid, newChatMessages);
  
        if (!updatedTicket) {
          throw new Error("Firestore update failed, no data returned.");
        }
  
      
        toast.success("تم اضافه تعليق جديد")
        return updatedTicket; // إرجاع البيانات الجديدة إلى Redux
      } catch (error) {
        console.error("❌ Error adding comment:", error);
        return rejectWithValue(error.message || "Failed to add comment");
      }
    }
  );
export const SellerTransactions = createAsyncThunk(
    'seller/SellerTransactions',
    async (sellerid, { rejectWithValue }) => {
        try {
            const seller_transactions = await getTransactions(sellerid); // Call the actual function with sellerId
           
            return {seller_transactions}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching seller notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const updateinfoseller = createAsyncThunk(
    'seller/updateinfoseller',
    async ({sellerid,sellerData}, { rejectWithValue }) => {
        try {
            const sellerinfo = await updateSellerDetails({sellerid,sellerData}); // Call the actual function with sellerId
           
            return {sellerinfo}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching seller notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);
export const SellerNotifications = createAsyncThunk(
    'notification/SellerNotifications',
    async (sellerid1, { rejectWithValue }) => {
           const sellerid=localStorage.getItem("sellerId")
            try {
            const seller_notification = await getSellerNotifications(sellerid); // Call the actual function with sellerId
            return {seller_notification}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching seller notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const GetAllTickets = createAsyncThunk(
    'tickets/GetAllTickets',
    async (userid, { rejectWithValue }) => {
        try {
            const seller_tickets = await getTickets(userid); // Call the actual function with sellerId
           
            return {seller_tickets}; // Return the data as seller_notification
        } catch (error) {
            console.error('Error fetching seller notifications:', error);
            return rejectWithValue(error.message);
        }
    }
);
//////////////////////////////fuctions for customer



// Initial state
const initialState = {

    seller_notification:[], 
    seller_tickets:[], 
    sellerinfo:[],
    seller_transactions:[],
    updatedTicket:[],
    loading: false,
    error: null,
    success: false,
};


export const sellerStuffReducer = createSlice({
    name: 'stuff',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SellerNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(SellerNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.seller_notification = action.payload.seller_notification; // Correctly store orders
            })
            .addCase(SellerNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(updateinfoseller.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateinfoseller.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.sellerinfo = action.payload.sellerinfo; // Correctly store orders
            })
            .addCase(updateinfoseller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
           
           
            .addCase(GetAllTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GetAllTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.seller_tickets = action.payload.seller_tickets; // Correctly store orders
            })
            .addCase(GetAllTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(SellerTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(SellerTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.seller_transactions = action.payload.seller_transactions; // Correctly store orders
            })
            .addCase(SellerTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(addcommentAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addcommentAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.updatedTicket = action.payload.updatedTicket; // Correctly store orders
            })
            .addCase(addcommentAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
 
 
 
       
  
                    
    
        }
    
});

// Export actions
export const { resetSuccess } = sellerStuffReducer.actions;

// Export the reducer
export default sellerStuffReducer.reducer;