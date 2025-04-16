import { firestore,auth } from '../../firebaseConfig'; 
import { collection, getDocs,getDoc,addDoc, deleteDoc ,query, orderBy,  where,doc, updateDoc, arrayUnion } from 'firebase/firestore';
import axios from 'axios'; 
import {  browserLocalPersistence,signInWithEmailAndPassword,setPersistence} from 'firebase/auth';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid"; // مكتبة لتوليد ID فريد

const CLOUDINARY_CLOUD_NAME = 'dbztvm0io'; 
const CLOUDINARY_UPLOAD_PRESET = 'trent_images'; 

export const uploadProfileImage = async (file, sellerId) => {
    try {
      // Convert the file to a base64 string
      const formData = new FormData();
    formData.append('file', file); // Append the file directly
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dbztvm0io/image/upload`,
      formData
    );

  
      const imageUrl = response.data.secure_url;
      
  
      // Save the image URL to Firestore in the sellers collection
      const sellerRef = doc(firestore, 'sellers', sellerId);
      await updateDoc(sellerRef, {
        profileimage: imageUrl, // Add the URL to the personalImages array
      });
  
    
      return imageUrl; // Return the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
 
export const uploadIdImages = async (file, side,sellerid) => {
 
      try {
        // Upload the file to Cloudinary
        const formData = new FormData();
        formData.append('file', file); // Append the file directly
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
  
        const imageUrl = response.data.secure_url; // Get the Cloudinary URL
  
        // Save the image URL to Firestore
        const sellerRef = doc(firestore, 'sellers', sellerid); // Reference the seller document
        await updateDoc(sellerRef, {
          [`idimages.${side}`]: imageUrl, // Update the idImages object with the new URL
        });
  
      
        return imageUrl;

      } catch (error) {
        console.error(`Error uploading ${side} image:`, error);
        alert(`Failed to upload ${side} image. Please try again.`);
      }
    }
export const uploadImages = async (file) => {
 
        try {
          // Upload the file to loudinary
          const formData = new FormData();
          formData.append('file', file); // Append the file directly
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
    
          const imageUrl = response.data.secure_url; // Get the Cloudinary URL
    
 
          return imageUrl;
  
        } catch (error) {
          console.error(`Error uploading  image:`, error);
          alert(`Failed to upload  image. Please try again.`);
        }
      }
     
  
export const updateSellerStatus = async (sellerid) => {
        try {
          // Reference the seller document
          const sellerRef = doc(firestore, 'sellers', sellerid);
      
          // Fetch the current document
          const sellerDoc = await getDoc(sellerRef);
      
          if (sellerDoc.exists()) {
            // Get the current status (default to false if the field doesn't exist)
            const currentStatus = sellerDoc.data().active || false;
          
      
            // Toggle the status
            const newStatus = !currentStatus;
            if(newStatus===true){
                toast.success("تم  تفعيل الحساب")
              }
              else{
                toast.success("تم الغاء تفعيل الحساب")
              }
            // Update the status field
            await updateDoc(sellerRef, {
              active: newStatus, // Set the new status
            });
           
         
            return newStatus; // Return the new status for further use
          } else {
            throw new Error('Seller document not found');
          }
        } catch (error) {
          console.error('Error updating seller status:', error);
          throw error; // Re-throw the error to handle it in the calling code
        }
};

export const addSellerAddress = async (sellerId, newAddress) => {
  try {
      const sellerRef = doc(firestore, "sellers", sellerId);
      const sellerSnap = await getDoc(sellerRef);

      if (!sellerSnap.exists()) {
          console.error("البائع غير موجود");
          return;
      }

      let existingAddresses = sellerSnap.data().address || [];

      // لو العنوان الجديد هو الـ default، نشيل default من كل العناوين التانية
      if (newAddress.default) {
          existingAddresses = existingAddresses.map((item) => ({
              ...item,
              default: false
          }));
      }

      // إنشاء ID فريد وإضافة العنوان الجديد
      const newAddressWithId = { id: uuidv4(), ...newAddress };

      // تحديث قائمة العناوين بإضافة العنوان الجديد
      const updatedAddresses = [...existingAddresses, newAddressWithId];

      await updateDoc(sellerRef, { address: updatedAddresses });

      toast.success("تمت إضافة العنوان بنجاح");
  } catch (error) {
      console.error("حدث خطأ أثناء الإضافة:", error);
  }
};

export const deleteSellerAddress = async (sellerid, id) => {
    try {
      const sellerRef = doc(firestore, "sellers", sellerid);
      const sellerSnap = await getDoc(sellerRef);
  
      if (!sellerSnap.exists()) {
        console.error("البائع غير موجود");
        return;
      }
  
      const sellerData = sellerSnap.data();
      const updatedAddresses = sellerData.address.filter(
        (item) => item.id !== id
      );
  
      await updateDoc(sellerRef, { address: updatedAddresses });
  
      toast.success('تم الحذف بنجاح');
    } catch (error) {
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };
  export const updateSellerAddress = async (sellerId, addressId, newAddressData) => {
    try {
        const sellerRef = doc(firestore, "sellers", sellerId);
        const sellerSnap = await getDoc(sellerRef);

        if (!sellerSnap.exists()) {
            console.error("البائع غير موجود");
            return;
        }

        const sellerData = sellerSnap.data();
        
        // لو العنوان الجديد هيتحط كـ default، نشيل default من كل العناوين التانية
        let updatedAddresses = sellerData.address.map((item) => {
            if (item.id === addressId) {
                return { ...item, ...newAddressData }; // تعديل العنوان المختار
            } else if (newAddressData.default) {
                return { ...item, default: false }; // إزالة الـ default من العناوين الأخرى
            }
            return item;
        });

        await updateDoc(sellerRef, { address: updatedAddresses });

        toast.success("تم التعديل بنجاح");
    } catch (error) {
        console.error("حدث خطأ أثناء التعديل:", error);
    }
};

export const addProducts = async ( productData) => {
    try {
 

        const docRef = await addDoc(collection(firestore, 'products'), productData);

        // Add the document ID to the productData object
        const productDataWithId = {
            ...productData, // Spread existing product data
            id: docRef.id, // Add the document ID as a property
        };

        // Update the document to include the ID (optional)
        await updateDoc(docRef, {
            id: docRef.id, // Add the ID to the Firestore document
        });
     
        return productDataWithId; // Return the product data with the ID
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};



export const deleteProductFromDB = async (DeletProductId, userId) => {
    try {
      // Reference the document directly using its ID
      const productDocRef = doc(firestore, 'products', DeletProductId);
  
      // Fetch the document to ensure it belongs to the correct user
      const productDoc = await getDoc(productDocRef);
  
      if (!productDoc.exists()) {
        console.log('No matching product found.');
        throw new Error('No matching product found.');
      }
  
      // Check if the product belongs to the correct user
      if (productDoc.data().sellerid !== userId) {
        console.log('You do not have permission to delete this product.');
        throw new Error('You do not have permission to delete this product.');
      }
  
      // Delete the document
      await deleteDoc(productDocRef);
      console.log('Product deleted successfully:', DeletProductId);
  
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

export const getSellerNotifications = async (sellerid) => {

    try {
        const sellerNotificationsQuery = query(
            collection(firestore, 'sellernotifications'),
            where('sellerid', '==', sellerid),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc')
        );
        const sellerNotificationsSnapshot = await getDocs(sellerNotificationsQuery);
        const sellerNotifications = sellerNotificationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return sellerNotifications;
    } catch (error) {
        console.error('Error fetching seller notifications:', error);
        throw error;
    }
};

export const getOrders = async (userId, role) => {
    try {
        let ordersQuery;

        if (role === 'seller') {
            // Fetch orders for a seller
            ordersQuery = query(
                collection(firestore, 'orders'),
                where('sellerId', '==', userId),
                orderBy('createdAt', 'desc')
            );
        } else if (role === 'customer') {
            // Fetch orders for a customer
            ordersQuery = query(
                collection(firestore, 'orders'),
                where('customerId', '==', userId),
                orderBy('createdAt', 'desc')
            );
        } else {
            throw new Error('Invalid role specified. Use "seller" or "customer".');
        }

        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getTickets = async (userid) => {

    try {
        const ticketsQuery = query(
            collection(firestore, 'tickets'),
            where('userid', '==', userid),
            orderBy('createdAt', 'desc')

        );
        const ticketsSnapshot = await getDocs(ticketsQuery);
        const tickets = ticketsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return tickets;
    } catch (error) {
        console.error('Error fetching pending products:', error);
        throw error;
    }

};

export const createTicket = async ( ticketData) => {
    try {
        const docRef = await addDoc(collection(firestore, 'tickets'), ticketData);

        // Add the document ID to the productData object
        const ticketDataWithId = {
            ...ticketData, // Spread existing product data
            ticketid: docRef.id, // Add the document ID as a property
        };

        // Update the document to include the ID (optional)
        await updateDoc(docRef, {
            ticketid: docRef.id, // Add the ID to the Firestore document
        });
        return ticketDataWithId; 
        // Add a new document to the 'tickets' collection
     // Return the ID of the newly created ticket
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};


export const updateeticket = async (id, sellerData) => {
    try {
       
        // Query to find the specific order
        const setcustomersQuery = query(
            collection(firestore, 'tickets'),
            where('ticketid', '==', id),
            // where('status', '==', 'pending')
        );

        const setcustomerSnapshot = await getDocs(setcustomersQuery);
        const rentedcustomer = setcustomerSnapshot.docs.map(doc => ({
            id: doc.ticketid,
            ...doc.data(),
        }));

        // Find the specific order by orderid
        const customerToUpdate = rentedcustomer.find(order => order.ticketid === id);

        if (customerToUpdate) {
            // Update the order status
     
            const orderRef = doc(firestore, 'tickets', customerToUpdate.ticketid);
            await updateDoc(orderRef, {
               ...sellerData
            });

            // console.log(`customer ${id} status updated to ${employeeData}`);
            return { success: true, message: `customer status updated to ${sellerData}` };
        } else {
           
            return { success: false, message: `Order ${id} not found or not active` };
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
  
  };

export async function appendChatToTicket(ticketid, newChatMessages) {
    try {
      const ticketRef = doc(firestore, "tickets", ticketid);
  
      // تحديث Firestore بإضافة التعليق الجديد
      await updateDoc(ticketRef, {
        chat: arrayUnion(newChatMessages),
      });
  
      // جلب البيانات المحدثة من Firestore بعد التحديث
      const updatedDoc = await getDoc(ticketRef);
      if (!updatedDoc.exists()) {
        throw new Error("Failed to fetch updated ticket data.");
      }
  
      console.log("✅ Chat messages appended successfully!");
      return updatedDoc.data(); // إرجاع البيانات المحدثة
    } catch (error) {
      console.error("❌ Error appending chat messages:", error);
      throw error; // رمي الخطأ ليتم التعامل معه في الـ thunk
    }
  }

export const getTransactions = async (sellerid) => {

    try {
        const TransactionsQuery = query(
            collection(firestore, 'transactions'),
            where('sellerid', '==', sellerid),
            orderBy('createdAt', 'desc')
    

        );
        const transactionsSnapshot = await getDocs(TransactionsQuery);
        const transactions = transactionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return transactions;
    } catch (error) {
        console.error('Error fetching pending products:', error);
        throw error;
    }

};

export const getPendingProducts = async (sellerid) => {
    try {
        const pendingProductsQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('status', '==', 'pending'),
            // where('published','==',false),
            orderBy('createdAt', 'desc')

        );
        const pendingProductsSnapshot = await getDocs(pendingProductsQuery);
        const pendingProducts = pendingProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return pendingProducts;
    } catch (error) {
        console.error('Error fetching pending products:', error);
        throw error;
    }
};

export const getConfirmedProducts = async (sellerid) => {
    try {
        const confirmedProductsQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('status', '==', 'approved'),
            where('published','==',false),
            orderBy('createdAt', 'desc')

        );
        const confirmedProductsSnapshot = await getDocs(confirmedProductsQuery);
        const confirmedProducts = confirmedProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return confirmedProducts;
    } catch (error) {
        console.error('Error fetching confirmed products:', error);
        throw error;
    }
};

export const getRejectedProducts = async (sellerid) => {
    try {
        const rejectedProductsQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('status', '==', 'rejected'),
            where('published','==',false),
            orderBy('createdAt', 'desc')

        );
        const rejectedProductsSnapshot = await getDocs(rejectedProductsQuery);
        const rejectedProducts = rejectedProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return rejectedProducts;
    } catch (error) {
        console.error('Error fetching rejected products:', error);
        throw error;
    }
};

export const getDraftProducts = async (sellerid) => {
    try {
        const draftProductsQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('status', '==', 'draft'),
            where('published','==',false),
            orderBy('createdAt', 'desc')
        );
        const draftProductsSnapshot = await getDocs(draftProductsQuery);
        const draftProducts = draftProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return draftProducts;
    } catch (error) {
        console.error('Error fetching rejected products:', error);
        throw error;
    }
};


export const getSellerById = async (sellerid) => {
    try {
  
      const sellerQuery = query(
        collection(firestore, 'sellers'),
        where('id', '==', sellerid)
      );
  
      const ordersSnapshot = await getDocs(sellerQuery); 
  
      const newordersadmin = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (newordersadmin.length > 0) {
        return newordersadmin[0];  
      } else {
        return null;  }
    } catch (error) {
      console.error('Error fetching seller:', error);
      throw error; 
    }
  };



  export const getSellerByIdProduct = async (sellerid,productid) => {
    try {
     
  
      const sellerQuery = query(
        collection(firestore, 'orders'),
        where('sellerid', '==', sellerid),
        where('productid', '==', productid)
      );
  
      const ordersSnapshot = await getDocs(sellerQuery); 
  
      const newordersadmin = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (newordersadmin.length > 0) {
        return newordersadmin[0]; 
      } else {
        return null;  
      }
    } catch (error) {
      console.error('Error fetching seller:', error);
      throw error;  
    }
  };





export const getProductById = async (sellerid,productid) => {
    try {
     
        const sellerQuery = query(
            collection(firestore, 'products'),
            where('id', '==', productid), // البحث باستخدام ID
            where('sellerid', '==', sellerid) // البحث باستخدام ID
        );
        const ordersSnapshot = await getDocs(sellerQuery);
        const newordersadmin = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        return newordersadmin[0];
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};

export const getPublichedProductsFalse = async (sellerid) => {
    try {
        const rejectedProductsQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('published', '==', false),
            orderBy('createdAt', 'desc')
        );
        const rejectedProductsSnapshot = await getDocs(rejectedProductsQuery);
        const rejectedProducts = rejectedProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return rejectedProducts;
    } catch (error) {
        console.error('Error fetching rejected products:', error);
        throw error;
    }
};

export const getPublichedProductsTrue = async (sellerid) => {
    try {
        const publishedTrueQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('published', '==', true),
            where('status', '==', 'approved'),
            orderBy('createdAt', 'desc')
        );
        const publishedTrueSnapshot = await getDocs(publishedTrueQuery);
        const publishedTrue = publishedTrueSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return publishedTrue;
    } catch (error) {
        console.error('Error fetching rejected products:', error);
        throw error;
    }
};

export const getPublichedRentedTrue = async (sellerid) => {
    try {
        const rentedPublishedTrueQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            orderBy('createdAt', 'desc'),
            where('published', '==', true),
            where('rented', '==', true),
            where('status', '==', 'approved')
        );
        const rentedPublishedSnapshot = await getDocs(rentedPublishedTrueQuery);
        const rentedPublishedTrue = rentedPublishedSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return rentedPublishedTrue;
    } catch (error) {
        console.error('Error fetching rejected products:', error);
        throw error;
    }
};


export const getPublichedRentedFalse = async (sellerid) => {
    try {
        const publishedRenteFalsedQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            where('published', '==', true),
            where('rented', '==', false),
            where('status', '==', 'approved'),

            orderBy('createdAt', 'desc')
        );
        const publishedRentedFalseQSnapshot = await getDocs(publishedRenteFalsedQuery);
        const publishedRentedFalse = publishedRentedFalseQSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return publishedRentedFalse;
    } catch (error) {
        console.error('Error fetching rejected products:', error);
        throw error;
    }
};


 
export const getOrdersBySellerId = async (sellerid) => {
    try {
        const ordersQuery = query(
            collection(firestore, 'orders'),
            where('sellerid', '==', sellerid),
            orderBy('createdAt', 'desc') // Order by createdAt in descending order

        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return orders;
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};


export const getOrdersCancelled = async () => {
    try {
        const ordersQuery = query(
            collection(firestore, 'orders'),
            where('sellerid', '==', 'zTC4dLSjCIS2I3YAl9QTJUkro0p2'),
            where('status','==', 'cancelled') ,
            orderBy('createdAt', 'desc') // Order by createdAt in descending order

            // Order by createdAt in descending order

        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const cancelledorders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return cancelledorders;
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};

export const getOrdersClosed = async () => {
    try {
        const ordersQuery = query(
            collection(firestore, 'orders'),
            where('sellerid', '==', 'zTC4dLSjCIS2I3YAl9QTJUkro0p2'),
            where('status','==', 'closed') ,
            orderBy('createdAt', 'desc') // Order by createdAt in descending order

            // Order by createdAt in descending order

        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const closedorders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return closedorders;
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};


export const getOrdersNew = async (sellerid) => {
    try {
        const ordersQuery = query(
            collection(firestore, 'orders'),
            where('sellerid', '==', sellerid),
            where('status','==', 'pending') ,
             orderBy('createdAt', 'desc') // Order by createdAt in descending order

            // Order by createdAt in descending order

        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const neworders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return neworders;
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};

export const getOrdersRented = async (sellerid) => {
    try {
        const rentedordersQuery = query(
            collection(firestore, 'orders'),
            where('sellerid', '==', sellerid),
            where('status','==', 'approved') ,
            orderBy('createdAt', 'desc') // Order by createdAt in descending order

            // Order by createdAt in descending order

        );
        const rentedordersSnapshot = await getDocs(rentedordersQuery);
        const rentedorders = rentedordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return rentedorders;
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};
export const getproductRented = async (sellerid) => {
    try {
        const rentedordersQuery = query(
            collection(firestore, 'products'),
            where('sellerid', '==', sellerid),
            // where('published','==', true) ,
            where('rented','==', true) ,
            // orderBy('createdAt', 'desc') // Order by createdAt in descending order

            // Order by createdAt in descending order

        );
        const rentedordersSnapshot = await getDocs(rentedordersQuery);
        const rentedorders = rentedordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return rentedorders;
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};

export const setOrdersStatus = async (sellerid, orderid, newStatus) => {
   
    try {
        // إنشاء استعلام للبحث عن الطلب في مجموعة orders
        const ordersRef = collection(firestore, 'orders');
        const q = query(ordersRef, where('sellerid', '==', sellerid), where('id', '==', orderid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`Order ${orderid} not found or unauthorized`);
            return { success: false, message: `Order ${orderid} not found or unauthorized` };
        }

        // الحصول على المستند وتحديث حالته
        const orderDoc = querySnapshot.docs[0].ref; // الوصول إلى المرجع الخاص بالمستند
        await updateDoc(orderDoc, { status: newStatus });

        console.log(`Order ${orderid} status updated to ${newStatus}`);
        return { success: true, message: `Order status updated to ${newStatus}` };
        
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};
export const setProductPublished = async (sellerid, productid, newStatuss) => {
 
    try {
        // إنشاء استعلام للبحث عن الطلب في مجموعة orders
        const ordersRef = collection(firestore, 'products');
        const q = query(ordersRef, where('sellerid', '==', sellerid), where('id', '==', productid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`Order ${productid} not found or unauthorized`);
            return { success: false, message: `Order ${productid} not found or unauthorized` };
        }

        // الحصول على المستند وتحديث حالته
        const orderDoc = querySnapshot.docs[0].ref; // الوصول إلى المرجع الخاص بالمستند
        const docSnap = querySnapshot.docs[0];
 
        const currentData = docSnap.data();

        await updateDoc(orderDoc, { published: newStatuss.published,rented:newStatuss.rented?newStatuss.rented:currentData.rented  , status:newStatuss.statuss? newStatuss.statuss: statuss});

        console.log(`Order ${productid} status updated to ${newStatuss}`);
        return { success: true, message: `Order status updated to ${newStatuss}` };
        
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};


export const updateSellerDetails = async ({sellerid, sellerData}) => {
 
    try {
      // Reference the seller document by its ID
      const sellerRef = doc(firestore, 'sellers', sellerid);
  
      // Update the document with the new details
      await updateDoc(sellerRef, {
        ...sellerData, // Spread the sellerData object to update multiple fields
        updatedAt: new Date().toISOString(), // Add a timestamp for the update
      });
  
      console.log('Seller details updated successfully!');
      return true; // Indicate success
    } catch (error) {
      console.error('Error updating seller details:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };

export const authenticateUser = async (email, password, rememberMe = false) => {

    try {
      // Always use local persistence
      await setPersistence(auth, browserLocalPersistence);
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
     
      return {
        success: true,
        userId: userCredential.user.uid
      };
  
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  
  
    };
export const verifyPhoneOTP = async (confirmationResult, otp) => {
        try {
          const fullOtp = otp.join('').replace(/\D/g, '');
          if (fullOtp.length !== 6) {
            throw new Error('Invalid OTP length');
          }
      
          const userCredential = await confirmationResult.confirm(fullOtp);
          const user = userCredential.user;
          const idToken = await user.getIdToken();
      
          return { 
            success: true, 
            userId: user.uid 
          };
      
        } catch (error) {
          console.error('OTP verification failed:', error);
          return { 
            success: false, 
            error: error.message 
          };
        }
      };
      ////////////////////////////////////////////////////////////////////fuctions for customer
      export const getcustomerById = async (customerrId) => {
        try {
      
            const sellerQuery = query(
                collection(firestore, 'customer'),
                where('id', '==', customerrId) // البحث باستخدام ID
            );
            const ordersSnapshot = await getDocs(sellerQuery);
            const newordersadmin = ordersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
      
            return newordersadmin[0];
        } catch (error) {
            console.error('Error fetching pending sellers:', error);
            throw error;
        }
    };

      export const getOrdersNewCustomer = async (customerid) => {
        try {
            const ordersQuery = query(
                collection(firestore, 'orders'),
                where('customerid', '==', customerid),
                where('status','==', 'pending') ,
                 orderBy('createdAt', 'desc') // Order by createdAt in descending order
    
                // Order by createdAt in descending order
    
            );
            const ordersSnapshot = await getDocs(ordersQuery);
            const neworders = ordersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            return neworders;
        } catch (error) {
            console.error('Error fetching pending sellers:', error);
            throw error;
        }
    };
    
      
export const getCustomerNotifications = async (customerid) => {

    try {
        const customerNotificationsQuery = query(
            collection(firestore, 'customernotifications'),
            where('customerid', '==', customerid),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc')
          );
        const customerNotificationsSnapshot = await getDocs(customerNotificationsQuery);
        const customerNotifications = customerNotificationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return customerNotifications;
    } catch (error) {
        console.error('Error fetching customer notifications:', error);
        throw error;
    }
};


export const getOrdersByCustomerId = async (customerid) => {
    try {
        const ordersQuery = query(
            collection(firestore, 'orders'),
            where('customerid', '==', customerid),
            orderBy('createdAt', 'desc') // Order by createdAt in descending order

        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return orders;
    } catch (error) {
        console.error('Error fetching pending customer:', error);
        throw error;
    }
};
export const getTransactionsCustomer = async (customerid) => {

    try {
        const TransactionsQuery = query(
            collection(firestore, 'transactions'),
            where('customerid', '==', customerid),
            orderBy('createdAt', 'desc')
    

        );
        const transactionsSnapshot = await getDocs(TransactionsQuery);
        const transactions = transactionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return transactions;
    } catch (error) {
        console.error('Error fetching pending products:', error);
        throw error;
    }

};
export const getProductByIdCustomer = async (productid) => {
    try {
     
        const sellerQuery = query(
            collection(firestore, 'products'),
            where('id', '==', productid), // البحث باستخدام ID
        );
        const ordersSnapshot = await getDocs(sellerQuery);
        const newordersadmin = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
       
        return newordersadmin[0];
    } catch (error) {
        console.error('Error fetching pending sellers:', error);
        throw error;
    }
};export const deleteorderbycustomer = async (customerid,id) => {

    try {
        console.log("deleted")
        const productQuery = query(
            collection(firestore, "orders"),
            where("customerid", "==", customerid),
            where("status", "==", "pending")

        );

        // جلب البيانات بناءً على الاستعلام
        const productSnapshot = await getDocs(productQuery);
        const products = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        const productsellerToDelete = products.find(seller => seller.id === id);

        if (productsellerToDelete) {
            // حذف المستند من Firestore
            const productRef = doc(firestore, "orders", productsellerToDelete.id);
            await deleteDoc(productRef);

            console.log(`products ${customerid} has been deleted successfully.`);
            return { success: true, message: `products ${customerid} deleted successfully.` };
        } else {
            console.log(`products ${customerid} not found.`);
            return { success: false, message: `products ${customerid} not found.` };
        }
    } catch (error) {
        console.error("Error deleting seller:", error);
        return { success: false, message: "Failed to delete seller." };
    }
}; export const uploadProfileImageCustomer = async (file, customerId) => {
    try {
      // Convert the file to a base64 string
      const formData = new FormData();
    formData.append('file', file); // Append the file directly
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dbztvm0io/image/upload`,
      formData
    );

  
      const imageUrl = response.data.secure_url;
      console.log( 'image upload succss',imageUrl )
  
      // Save the image URL to Firestore in the sellers collection
      const sellerRef = doc(firestore, 'customer', customerId);
      await updateDoc(sellerRef, {
        profileimage: imageUrl, // Add the URL to the personalImages array
      });
  
      console.log('Image uploaded and URL saved to Firestore:', imageUrl);
      return imageUrl; // Return the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
export const updateCustomerDetails = async (customerid, customerData) => {
  try {
    // تصفية البيانات علشان تبعت بس اللي ليه قيمة
    const filteredData = {};
    for (const key in customerData) {
      if (customerData[key]) {
        filteredData[key] = customerData[key];
      }
    }

    // مرجع الوثيقة
    const sellerRef = doc(firestore, 'customer', customerid);

    // تحديث البيانات المُفلترة + وقت التعديل
    await updateDoc(sellerRef, {
      ...filteredData,
      updatedAt: new Date().toISOString(),
    });

    console.log('تم تحديث بيانات العميل بنجاح!');
    return true;
  } catch (error) {
    console.error('خطأ أثناء تحديث بيانات العميل:', error);
    throw error;
  }
};
  export const uploadIdImagesCustomer = async (file, side,customerid) => {
 
    try {
      // Upload the file to Cloudinary
      const formData = new FormData();
      formData.append('file', file); // Append the file directly
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url; // Get the Cloudinary URL

      // Save the image URL to Firestore
      const sellerRef = doc(firestore, 'customer', customerid); // Reference the seller document
      await updateDoc(sellerRef, {
        [`idimages.${side}`]: imageUrl, // Update the idImages object with the new URL
      });

      console.log(`${side} image uploaded and URL saved to Firestore:`, imageUrl);
      return imageUrl;

    } catch (error) {
      console.error(`Error uploading ${side} image:`, error);
      alert(`Failed to upload ${side} image. Please try again.`);
    }
  }
  export const updateCustomerStatus = async (customerid) => {
    try {
      // Reference the seller document
      const sellerRef = doc(firestore, 'customer', customerid);
  
      // Fetch the current document
      const sellerDoc = await getDoc(sellerRef);
  
      if (sellerDoc.exists()) {
        // Get the current status (default to false if the field doesn't exist)
        const currentStatus = sellerDoc.data().active || false;
        console.log ('current status is',currentStatus)
  
        // Toggle the status
        const newStatus = !currentStatus;
        if(newStatus===true){
            toast.success("تم  تفعيل الحساب")
          }
          else{
            toast.success("تم الغاء تفعيل الحساب")
          }
        // Update the status field
        await updateDoc(sellerRef, {
          active: newStatus, // Set the new status
        });
       
        console.log(`Seller status toggled to "${newStatus}" for sellerId:`, customerid);
        return newStatus; // Return the new status for further use
      } else {
        throw new Error('Seller document not found');
      }
    } catch (error) {
      console.error('Error updating seller status:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
};
export const deleteCustomerAddress = async (customerid, id) => {
    try {
      const sellerRef = doc(firestore, "customer", customerid);
      const sellerSnap = await getDoc(sellerRef);
  
      if (!sellerSnap.exists()) {
        console.error("البائع غير موجود");
        return;
      }
  
      const sellerData = sellerSnap.data();
      const updatedAddresses = sellerData.address.filter(
        (item) => item.id !== id
      );
  
      await updateDoc(sellerRef, { address: updatedAddresses });
  
      toast.success('تم الحذف بنجاح');
    } catch (error) {
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };
  export const addCustomerAddress = async (customerid, newAddress) => {
    try {
        const sellerRef = doc(firestore, "customer", customerid);
        const sellerSnap = await getDoc(sellerRef);
  
        if (!sellerSnap.exists()) {
            console.error("البائع غير موجود");
            return;
        }
  
        let existingAddresses = sellerSnap.data().address || [];
  
        // لو العنوان الجديد هو الـ default، نشيل default من كل العناوين التانية
        if (newAddress.default) {
            existingAddresses = existingAddresses.map((item) => ({
                ...item,
                default: false
            }));
        }
  
        // إنشاء ID فريد وإضافة العنوان الجديد
        const newAddressWithId = { id: uuidv4(), ...newAddress };
  
        // تحديث قائمة العناوين بإضافة العنوان الجديد
        const updatedAddresses = [...existingAddresses, newAddressWithId];
  
        await updateDoc(sellerRef, { address: updatedAddresses });
  
        toast.success("تمت إضافة العنوان بنجاح");
    } catch (error) {
        console.error("حدث خطأ أثناء الإضافة:", error);
    }
  };
  export const updateCustomerAddress = async (customerid, addressId, newAddressData) => {
    try {
        const sellerRef = doc(firestore, "customer", customerid);
        const sellerSnap = await getDoc(sellerRef);

        if (!sellerSnap.exists()) {
            console.error("البائع غير موجود");
            return;
        }

        const sellerData = sellerSnap.data();
        
        // لو العنوان الجديد هيتحط كـ default، نشيل default من كل العناوين التانية
        let updatedAddresses = sellerData.address.map((item) => {
            if (item.id === addressId) {
                return { ...item, ...newAddressData }; // تعديل العنوان المختار
            } else if (newAddressData.default) {
                return { ...item, default: false }; // إزالة الـ default من العناوين الأخرى
            }
            return item;
        });

        await updateDoc(sellerRef, { address: updatedAddresses });

        toast.success("تم التعديل بنجاح");
    } catch (error) {
        console.error("حدث خطأ أثناء التعديل:", error);
    }
};
