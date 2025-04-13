
const styles = {
  div: {
    borderRadius: "24px",
    background: "var(--White, #fff)",
    backgroundColor: "var(--White, #fff)",
    display: "flex",
    width: 'auto',
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Expo Arabic, sans-serif",
    justifyContent: "start",
    padding: "16px"
  },
  div2: {
    paddingBottom: "8px",
    justifyContent: "end",
    alignItems: "center",
    borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
    display: "flex",
    width: "auto",
    gap: "8px",
    fontSize: "18px",
    color: "var(--Text, #252422)",
    fontWeight: "400",
    textAlign: "right",
    flexWrap: "wrap"
  },
  productDetails: {
    alignSelf: "stretch",
    margin: "auto 0"
  },
  img: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "24px",
    alignSelf: "stretch",
    margin: "auto 0"
  },
  carDetails: {
    justifyContent: "end",
    alignItems: "center",
    borderRadius: "24px",
    border: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
    background: "var(--White, #fff)",
    backgroundColor: "var(--White, #fff)",
    display: "flex",
    marginTop: "16px",
    width: "auto",
    gap: "24px",
    overflow: "hidden",
    flexWrap: "wrap",
    padding: "8px"
  },
  button: {
    alignSelf: "stretch",
    borderRadius: "50px",
    border: "1px solid var(--Blue, #26969c)",
    gap: "8px",
    fontSize: "14px",
    color: "var(--Blue, #26969c)",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: "1",
    margin: "auto 0",
    padding: "12px 24px",
    cursor: "pointer",
    backgroundColor: "transparent"
  },
  div3: {
    alignSelf: "stretch",
    display: "flex",
    minWidth: "240px",
    alignItems: "center",
    gap: "8px",
    textAlign: "right",
    justifyContent: "end",
    flex: 1,
    flexBasis: "48px",
    margin: "auto 0"
  },
  div4: {
    alignSelf: "stretch",
    display: "flex",
    minWidth: "240px",
    flexDirection: "column",
    justifyContent: "start",
    flex: 1,
    flexBasis: "0%",
    margin: "auto 0"
  },
  category: {
    color: "var(--Blue, #26969c)",
    fontSize: "12px",
    fontWeight: "500"
  },
  productName: {
    color: "var(--Dark, #09262a)",
    fontSize: "18px",
    fontWeight: "600",
    marginTop: "8px"
  },
  img2: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "64px",
    borderRadius: "14px",
    alignSelf: "stretch",
    margin: "auto 0"
  }
};

const productData = {
  title: "تفاصيل المنتج",
  category: "كاتيجوري",
  productName: "اسم المنتج بالكامل يوضح هنا ويمكن ان يمتد الى سطرين ثم ...",
  buttonText: "الذهاب لصفحة المنتج",
  headerIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f7d7b864774f693383a1b0e506b21c301250e36bae294a0799d6a966aed2e70d?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818",
  productImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/95545b7f00e81ffa01fd6fd9c7f6fa8f332c4123f8fa0cae8fc27a821887ccf1?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818"
};

function ProductDetails({orderData}) {
  return (
    <div style={styles.div}>
      <div style={styles.div2}>
        <div style={styles.productDetails}>{productData.title}</div>
        <img
          loading="lazy"
          src={productData.headerIcon}
          style={styles.img}
          alt=""
        />
      </div>
      <div style={styles.carDetails}>
        <button style={styles.button}>{productData.buttonText}</button>
        <div style={styles.div3}>
          <div style={styles.div4}>
            <div style={styles.category}>{orderData.category ||"empty"}</div>
            <div style={styles.productName}>{orderData.name ||"empty"}</div>
          </div>
          <img
            loading="lazy"
            src={orderData.img || "https://cdn.builder.io/api/v1/image/assets/TEMP/95545b7f00e81ffa01fd6fd9c7f6fa8f332c4123f8fa0cae8fc27a821887ccf1?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818"}
            style={styles.img2}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;