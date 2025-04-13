

const AddProductHeader = {

  headerWrapper: {
    paddingBottom: '8px',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '20px' ,

  },
  locationIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '20px',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  addressText: {
    alignSelf: 'stretch',
    flex: '1',
    flexBasis: '0%',
    margin: 'auto 0',
  },
  arrowIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  '@media (max-width: 991px)': {
    headerWrapper: {
      maxWidth: '100%',
    },
    addressText: {
      maxWidth: '100%',
    },
  },
};
const AddProductInfo = ({  toggleExpand, title }) => {
  return (
    <div style={AddProductHeader.headerWrapper}>
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b96d1ed5b69bb8dcca96ca72efe39f483bf3d84f91f02fd737257c912709c862?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
      alt="Location icon"
      style={AddProductHeader.locationIcon}
      onClick={toggleExpand}

    />
    <div style={AddProductHeader.addressText}>{title}</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7f47c865030644115b90609064c6e84ba0c5e5ae1e9304de217b4e435b82805?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
        alt="Navigation arrow"
        style={AddProductHeader.arrowIcon}
      />
    </div>
  );
};



export default AddProductInfo;