import sellerProductsReducer from './reducers/sellerProductsReducer'; // Fixed the typo
import customerProductsReducer from './reducers/customerProductReducer'; // Fixed the typo
import sellerOrdersReducer from './reducers/sellerOrdersReducer';
import customerOrdersReducer from './reducers/CustomerOrderreducer';
import sellerStuffReducer  from './reducers/sellerStuffReducer';
import customerStuffReducer  from './reducers/customerStuffReducer';

const rootReducer = {
    seller_products: sellerProductsReducer,
    seller_orders: sellerOrdersReducer,
    seller_stuff: sellerStuffReducer,
    customer_stuff: customerStuffReducer,
    customer_products: customerProductsReducer,
    customer_orders: customerOrdersReducer,

};

export default rootReducer;