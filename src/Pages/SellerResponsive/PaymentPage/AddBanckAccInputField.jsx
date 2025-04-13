
export function AddBanckAccInputField({ label, id, value, onChange, withIcon = false, type = "text" }) {


  const styles = {
    container: {
      display: "flex",
      width: "auto",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: withIcon ? 0 : "16px"
    },
    label: {
      color: "var(--Text, #252422)",
      lineHeight: 1,
      alignSelf: "end"
    },
    inputWrapper: {
      justifyContent: withIcon ? "space-between" : "stretch",
      alignItems: "center",
      borderRadius: withIcon ? "16px" : "8px",
      background: "var(--BG-gray, #f6f5f5)",
      display: "flex",
      marginTop: "8px",
      width: "auto",
      gap: withIcon ? "40px 100px" : "10px",
      color: "var(--Paragraph, #736e67)",
      textAlign: "right",
      padding: "16px"
    },
    icon: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "16px",
      alignSelf: "stretch",
      margin: "auto 0"
    },
    input: {
      background: "transparent",
      border: "none",
      color: "var(--Paragraph, #736e67)",
      textAlign: "right",
      width: "100%",
      outline: "none"
    }
  };

  const inputStyle = {
    appearance: type === 'number' ? 'none' : 'auto',
    MozAppearance: type === 'number' ? 'textfield' : 'auto',
  };
  const bankOptions = [
    { value: "bank1", label: "Bank 1" },
    { value: "bank2", label: "Bank 2" },
    { value: "bank3", label: "Bank 3" },
  ];

  return (
    <div style={styles.container}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <div style={styles.inputWrapper}>
      {withIcon ? (
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(id, e.target.value)} // Send selected bank back to parent
            style={styles.input}
          >
            <option value="" disabled>{`Select a bank`}</option>
            {bankOptions.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            style={{ ...styles.input, ...inputStyle }} // Apply the input style
            placeholder={label}
          />
        )}
      </div>
    </div>
  );
}