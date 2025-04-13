import {  useState, useCallback, useMemo } from 'react';
import TopProductFilter from './TopProductFilter';
import SearchBar from './SearchBar';
import ProductListingFilter from './ProductListingFilter';
import ProductInfo from './ProductInfo';
import LabelHeader from './LabelHeader';
import styled from "styled-components";

const MyProductsHeader = [
  { label: 'الصورة', className: 'image' },
  { label: 'بيانات المنتج', className: 'productData' },
  { label: 'التصنيف', className: 'category' },
  { label: 'حالة المنتج', className: 'productStatus' },
  { label: 'الماركة', className: 'brand' },
  { label: 'السعر', className: 'price' },
  { label: 'الخصم', className: 'discount' },
  { label: 'إجراءات', className: 'actions' },
];

const Group = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 1027px) and (max-width: 1041px) {
    padding: 16px 8px;
  }
`;

const CustomerMyProductsPage = () => {

  const [ProductsSearch, setProductsSearch] = useState('');
  const [MyProductsopFilter, setMyProductsopFilter] = useState([
    { text: 'المنتجات المعلقة', isActive: false },
    { text: 'المنتجات المنشورة', isActive: true },
  ]);
  const [activeTop, setActiveTop] = useState('المنتجات المنشورة');
  const [activeFilterText, setActiveFilterText] = useState('الكل');

  const SecondaryFilter = useMemo(() => {
    return activeTop === 'المنتجات المعلقة'
      ? [
          { text: 'بانتظار الموافقة', isActive: false },
          { text: 'المسودة', isActive: false },
          { text: 'الكل', isActive: true },
        ]
      : [
          { text: 'متاحة للتأجير', isActive: false },
          { text: 'مستأجرة', isActive: false },
          { text: 'الكل', isActive: true },
        ];
  }, [activeTop]);


  const handleTopFilterClick = useCallback((index) => {
    const updatedButtons = MyProductsopFilter.map((button, i) => ({
      ...button,
      isActive: i === index,
    }));
    setMyProductsopFilter(updatedButtons);
    setActiveTop(updatedButtons[index].text);
    setActiveFilterText('الكل'); 
  }, [MyProductsopFilter]);

  const handleSecondaryFilterClick = useCallback((text) => {
    setActiveFilterText(text);
  }, []);



  return (
    <>
      <TopProductFilter
        handleFilterTypeClick={handleTopFilterClick}
        FilterType={MyProductsopFilter}
      />
      <Group>
          <ProductListingFilter
          handlebuttonclick={handleSecondaryFilterClick}
          chossen={activeFilterText}
          title="قائمة المنتجات"
          filters={SecondaryFilter} 
        />
        <SearchBar setSearch={setProductsSearch} />
        <LabelHeader Data={MyProductsHeader} />
        <ProductInfo
          activeFilterText={activeFilterText}
          activeTop={activeTop}
          ProductsSearch={ProductsSearch}
        />
      </Group>
    </>
  );
};

export default CustomerMyProductsPage;