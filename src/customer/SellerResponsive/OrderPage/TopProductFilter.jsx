


const PendingButtonsStyle = {
    container: {
      paddingBottom: '8px',
      justifyContent: 'end',
      alignItems: 'center',
      alignSelf: 'stretch',
      display: 'flex',
      fontFamily: 'Expo Arabic, sans-serif',
      flexWrap: 'wrap',
      width: 'auto',
      maxWidth: '100%',
      background: 'transparent'
    },
    filterContainer: {
      justifyContent: 'right',
      alignItems: 'center',
      background: 'transparent',
      alignSelf: 'stretch',
      display: 'flex',
      gap: '8px',
      overflow: 'hidden',
      fontSize: '14px',
  
    },

    button: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50px',
      alignSelf: 'stretch',
      margin: 'auto 0',
      padding: '8px',
      whiteSpace: 'nowrap',
      backgroundColor: isActive ? '#26969c' : 'white',
      color: isActive ? '#ffffff' : '#8d8883',
      fontWeight: isActive ? '600' : '400',
      outline: 'none'
    }),
  };


const TopProductFilter = ({ handleFilterTypeClick, FilterType  }) => {
  return (

    <div style={PendingButtonsStyle.container}>
    <div style={PendingButtonsStyle.filterContainer}>
      {FilterType.map((buttonData, index) => (
        <button
          key={index}
          style={PendingButtonsStyle.button(buttonData.isActive)} // Use isActive from buttonData
          onClick={() => handleFilterTypeClick(index)} // Only pass index to handleButtonClick
          role="button"
          tabIndex={0}
          aria-pressed={buttonData.isActive}
        >
          {buttonData.text}
        </button>
      ))}
    </div>
  </div>

  );
};

export default TopProductFilter;