
import {  useState } from 'react';

const searchStyle = {
    searchContainer: {
      justifyContent: 'end',
      width: '100%', // Set to 100% to take full width of the parent
      height: 'auto', // Allow height to adjust based on content
      minWidth: '0', // Ensure no minimum width constraints
      maxWidth: '100%', // Ensure it doesn't exceed parent width
      flexGrow: 1, // Allow it to grow and fill available space
      flexShrink: 0, // Prevent shrinking if there's enough space
      boxSizing: 'border-box', // Include padding and borders in width calculations
      alignItems: 'center',
      borderRadius: '50px',
      background: 'var(--BG-gray, #f6f5f5)',
      backgroundColor: 'var(--BG-gray, #f6f5f5)',
      display: 'flex',
      color: 'rgba(141, 136, 131, 0.5)',
      flexWrap: 'nowrap',
      padding: '10px',
      font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
      marginBottom: '10px'
    },
    searchText: {
      background: 'transparent', // Make background transparent
      border: 'none', // Remove border
      outline: 'none' ,// Remove outline on focus
      width: '100%', // Ensure full width
      direction: 'rtl', // Set text direction to right-to-left






    },
    searchIcon: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '20px',
      alignSelf: 'stretch',
      margin: 'auto 0'
    }
  };


const SearchBar = ({ setSearch }) => {
  console.log('searchbar')
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = () => {
    setSearch(searchTerm);

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    <div className="search-container" style={searchStyle.searchContainer} role="search">
      <input
        type="search"
        id="searchInput"
        style={searchStyle.searchText}
        placeholder= "البحث حسب اسم العميل"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} // Add key press event
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbc630ea672164372f195d03c976c97b18a6d66b5f9ba9e04e89b65d1a74f7e?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
        style={searchStyle.searchIcon}
        alt=""
        role="presentation"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;