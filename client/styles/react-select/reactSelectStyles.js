export const reactSelectStyles = {
    control: (base, { isDisabled }) => ({
        ...base,
        border: "1px solid grey",
        width: 375,
        "min-heigth": 30,
        "margin-left": 5,
        "backgroundColor": 'white',
        // This line disable the blue border
        boxShadow: 'none',
        "&:hover": {
            borderColor: "grey"
        }
    }),
    singleValue: (styles, { isDisabled }) => {
        return {
            ...styles,
            color: 'black',
        };
    },
};