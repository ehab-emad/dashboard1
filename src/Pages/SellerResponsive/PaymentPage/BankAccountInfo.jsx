import  { useState } from 'react';
import BankAccountCard from "./BankAccountCard";
import styled from "styled-components";

const styles = {
  noAccounts: {
    borderRadius: "16px",
    border: "1px solid rgba(0, 47, 54, 0.08)",
    alignSelf: "end",
    marginTop: "16px",
    width: '100%', // Set to 100% to take full width of the parent
      height: 'auto', // Allow height to adjust based on content
      minWidth: '0', // Ensure no minimum width constraints
      maxWidth: '100%', // Ensure it doesn't exceed parent width
      flexGrow: 1, // Allow it to grow and fill available space
      flexShrink: 0, // Prevent shrinking if there's enough space
      boxSizing: 'border-box', // Include padding and borders in width calculations    fontSize: "14px",
    color: "#8c8b8a",
    fontWeight: "400",
    textAlign: "center",
    padding: "40px 16px",
  },
 
  
};

const initialAccounts = [
  {
    id: 1,
    name: "",
    accountNumber: "",
    iban: "",
    bankName: "",
    isDefault: false,
    bankLogos: [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f1469b0f22e70369fa233b28496d34b005f30861aad9efb3bb42ce99d9a0891e?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818",
    ],
  },
  {
    id: 2,
    name: " ",
    accountNumber: "",
    iban: "", 
    bankName: "",
    isDefault: true,
    bankLogos: [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a527181db772276fe91c3c33e3afba576b3dae80a69faba9699448725fa467d8?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818",
    ],
  }
];
const AccountsContainer = styled.div`
display: flex;
align-items: center;
gap: 24px;
justify-content: flex-end; /* 'end' in CSS should be 'flex-end' */
@media (max-width : 740px) {
  flex-direction : column
}
`

function BankAccountInfo() {



  const [accounts, setAccounts] = useState(initialAccounts);

  const toggleDefaultState = () => {
    setAccounts((prevAccounts) => 
      prevAccounts.map((account) => ({
        ...account,
        isDefault: !account.isDefault, // Toggle the isDefault state of both accounts
      }))
    );
  };
  return (
    <AccountsContainer >
        {accounts.length > 0 ? (
          accounts.map(account => (
            <BankAccountCard key={account.id} account={account} toggleDefaultState={toggleDefaultState} />
          ))
        ) : (
          <div style={styles.noAccounts}>
            لا يوجد لديك اي حسابات حاليا
          </div>
        )}
    </AccountsContainer>
  );
}

export default BankAccountInfo;