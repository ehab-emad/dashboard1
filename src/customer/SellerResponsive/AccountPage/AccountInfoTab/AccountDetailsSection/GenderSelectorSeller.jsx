

const GenderSelectorSeller = ({ selectedGender, onGenderSelect }) => {
    const styles = {
      wrapper: {
        display: 'flex',
        width: '100%', // Set to 100% to take full width of the parent
        justifyContent: 'end',
        flexWrap: 'nowrap',
        gap: '8px'
      },
      option: (isSelected) => ({
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        border: isSelected ? '1px solid var(--Blue, #26969c)' : 'none',
        background: isSelected ? 'var(--very-light, #f2fbfa)' : 'var(--BG-gray, #f6f5f5)',
        display: 'flex',
        Width: '100%',
        gap: '8px',
        color: isSelected ? 'var(--Blue, #26969c)' : 'var(--Cool, #8d8883)',
        fontWeight: isSelected ? '600' : '400',
        height: 'auto',
        flex: 1,
        padding: '12px',
        cursor: 'pointer',
      }),
      icon: {
        width: '20px',
      }
    };
  
    
  
    return (
      <div style={styles.wrapper}>
        <div
          style={styles.option(selectedGender === 'female')}
          onClick={() => onGenderSelect('female')}
          role="button"
          tabIndex={0}
        >
          <span>أنثى</span>
          <img 
            src={selectedGender === 'female' 
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/79c245ad0b49e15b8a28f60a382cdfdbc64528c6d390abafbd8468b70fc6a13b?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6" 
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/776389d335541ff17409e81497a228ddcc301b346478cea4f7b080450c5e756d?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"} 
              alt="" 
              style={styles.icon} 
              />     
      </div>
        <div
          style={styles.option(selectedGender === 'male')}
          onClick={() => onGenderSelect('male')}
          role="button"
          tabIndex={0}
        >
          <span>ذكر</span>
          
          <img   src={selectedGender === 'male' 
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/79c245ad0b49e15b8a28f60a382cdfdbc64528c6d390abafbd8468b70fc6a13b?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6" 
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/776389d335541ff17409e81497a228ddcc301b346478cea4f7b080450c5e756d?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"} 
              alt="" 
              style={styles.icon} 
              />     
        </div>
      </div>
    );
  };
  export default GenderSelectorSeller;
