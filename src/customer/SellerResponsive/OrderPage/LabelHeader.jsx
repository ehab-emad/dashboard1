import '../../../App.css'
const styles = {
  ordersfilter: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    gap: "16px",
    color: "var(--Paragraph, #736e67)",
    textAlign: "right",
    flexWrap: "nowrap",
    padding: "8px 16px",
    font: "400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif"
  },
  img: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "20px",
    margin: "auto 0",
    opacity: 0 // Make the image fully transparent

  },
  تاريخالتعديل: {
    width: "20%",
    textAlign: "center",

  },
  مدةالتأجير: {
    width: "20%",
    textAlign: "center",

  },
  المبلغالمدفوع: {
    width: "20%",

    textAlign: "center",

  },
  حالةالطلب: {
    width: "20%",

    textAlign: "center",

  },
  اسمالعميل: {
    width: "20%",

    textAlign: "center",
  },
  بياناتالطلب: {
    width: "20%",

    textAlign: "right",
  },
  رقمالطلب: {
    width: "20%",

    textAlign: "center"

  }
};

function LabelHeader() {
  return (
    <div style={styles.ordersfilter} className="hide">

      <div style={styles.تاريخالتعديل}> تاريخ التغيير</div>
      <div style={styles.مدةالتأجير}>مدة التأجير</div>

      <div style={styles.المبلغالمدفوع}> المبلغ المدفوع</div>
      <div style={styles.حالةالطلب}>  حالة الطلب</div>
      <div style={styles.اسمالعميل}>  اسم العميل</div>
      <div style={styles.بياناتالطلب}>  بيانات الطلب</div>
      <div style={styles.رقمالطلب}>         رقم الطلب</div>
    </div>
  );
}

export default LabelHeader;