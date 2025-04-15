import { useEffect, useState, useMemo } from 'react';
import TopProductFilter from './TopProductFilter';
import SearchBar from './SearchBar';
import ProductListingFilter from './ProductListingFilter';
import RequestDetails from './RequestDetails';
import LabelHeader from './LabelHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSellerOrders,
  getSellerCancelledOrders,
  ClosedOrders,
  getNewOrders
} from '../../../store/reducers/sellerOrdersReducer';



const groupStyle = {
  background: 'white',
  padding: '16px',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};


const SellerMyProductsPage = () => {


  const sellerid = localStorage.getItem('sellerId');

  
  const dispatch = useDispatch();
  const { seller_orders, seller_CancelledOrders, all_closedorders } = useSelector(
    (state) => state.seller_orders
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    topFilter: 'كل الطلبات', // Active top-level filter
    secondaryFilter: 'الكل', // Active secondary filter
    topFilterOptions: [
      // { text: 'سجل الطلبات', isActive: false },
      { text: 'كل الطلبات', isActive: true },
    ],
    secondaryFilterOptions: {
      'سجل الطلبات': [
       
        { text: 'الكل', isActive: true },
      ],
      'كل الطلبات': [
        { text: 'الطلبات النشطة', isActive: false },
        { text: 'الطلبات الجديدة', isActive: false },
        { text: 'الطلبات الملغاة', isActive: false },
        { text: 'الطلبات المنتهية', isActive: false },
        { text: 'الطلبات المرفوضه', isActive: false },
        { text: 'الكل', isActive: true },
      ],
    },
  });

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getSellerOrders(sellerid));
    dispatch(getSellerCancelledOrders(sellerid));
    dispatch(ClosedOrders(sellerid));
    dispatch(getNewOrders(sellerid));

  }, [dispatch]);

  // Handle top-level filter click
  const handleTopFilterClick = (index) => {
    const updatedTopFilters = filters.topFilterOptions.map((filter, i) => ({
      ...filter,
      isActive: i === index,
    }));

    const selectedTopFilter = updatedTopFilters[index].text;
    const resetSecondaryFilters = filters.secondaryFilterOptions[selectedTopFilter];

    setFilters((prev) => ({
      ...prev,
      topFilter: selectedTopFilter,
      topFilterOptions: updatedTopFilters,
      secondaryFilter: 'الكل', // Reset secondary filter
      secondaryFilterOptions: {
        ...prev.secondaryFilterOptions,
        [selectedTopFilter]: resetSecondaryFilters,
      },
    }));
  };

  // Handle secondary filter click
  const handleSecondaryFilterClick = (index) => {
    const updatedSecondaryFilters = filters.secondaryFilterOptions[filters.topFilter].map(
      (filter, i) => ({
        ...filter,
        isActive: i === index,
      })
    );

    setFilters((prev) => ({
      ...prev,
      secondaryFilter: updatedSecondaryFilters[index].text,
      secondaryFilterOptions: {
        ...prev.secondaryFilterOptions,
        [prev.topFilter]: updatedSecondaryFilters,
      },
    }));
  };

  const filteredData = useMemo(() => {
    let data = [];
    switch (filters.topFilter) {
      case 'سجل الطلبات':
        data = [...seller_CancelledOrders, ...all_closedorders];
        break;
      case 'كل الطلبات':
        data = seller_orders;
        break;
      default:
        data = [];
    }

    // Apply secondary filter
    switch (filters.secondaryFilter) {
      case 'الطلبات الملغاة':
        data = data.filter((order) => order.status === 'cancelled');
        break;
      case 'الطلبات المنتهية':
        data = data.filter((order) => order.status === 'closed');
        break;
      case 'الطلبات النشطة':
        data = data.filter((order) => order.status === 'approved');
        break;
        case 'الطلبات المرفوضه':
          data = data.filter((order) => order.status === 'rejected');
          break;
      case 'الطلبات الجديدة':
        data = data.filter((order) => order.status === 'pending');
        break;
      default:
        break;
    }

    if (searchQuery) {
      data = data.filter((order) =>
        order.customername.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return data;
  }, [
    filters.topFilter,
    filters.secondaryFilter,
    searchQuery,
    seller_orders,
    seller_CancelledOrders,
    all_closedorders,
  ]);

  return (
    <>
      <TopProductFilter
        handleFilterTypeClick={handleTopFilterClick}
        FilterType={filters.topFilterOptions}
      />
      <div style={groupStyle}>
        <ProductListingFilter
          handlebuttonclick={handleSecondaryFilterClick}
          filterbuttons={filters.secondaryFilterOptions[filters.topFilter]}
          title="قائمة المنتجات"
        />
        <SearchBar setSearch={setSearchQuery} />
        <LabelHeader  />
      {filteredData.length?
        <RequestDetails
        filteredData={filteredData}
      />:<div>لا يوجد طلبات حاليا</div>}
      </div>
    </>
  );
};

export default SellerMyProductsPage;