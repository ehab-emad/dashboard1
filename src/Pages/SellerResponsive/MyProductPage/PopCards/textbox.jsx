
const styles = {
    pricesfield: {
        display: 'flex',
        height: 'auto',
        minWidth: '0',
        flexDirection: 'column',
        justifyContent: 'start',
        flexGrow: 1,
        width: '100px',
        background: 'transparent',
        paddingTop: '10px',
    },
    label: {
        color: 'var(--Text,rgb(34, 34, 37))',
        background: 'transparent',
        direction: 'rtl',
        whiteSpace: 'wrap',
        margin:"0px 2px"
    },
    inputContainer: {
        borderRadius: '16px',
        background: 'var(--BG-gray,rgb(245, 246, 245))',
        display: 'flex',
        marginTop: '8px',
        width: '100%',
        height: 'auto',
        minWidth: '0',
        maxWidth: '100%',
        flexGrow: 1,
        flexShrink: 0,
        boxSizing: 'border-box',
        gap: '16px',
        padding: '16px',
    },
    placeholder: {
        border: 'none',
        width: '100%',
        background: 'transparent',
        textAlign: 'right',
    },
};

const TextBoxField = ({ label, placeholder ,onChange}) => {


    return (
        <div style={styles.pricesfield}>
            <div style={styles.label}>{label}</div>
            <div style={styles.inputContainer}>
                <input onChange={onChange}
                
                    type="text"
                    placeholder={placeholder ||0}
                    style={styles.placeholder}
                />
            </div>
        </div>
    );
};

export default TextBoxField;