export const reactSelectStyles = {
    control: (base, { isDisabled }) => ({
        ...base,
        border: "1px solid grey",
        width: 375,
        "minHeigth": 30,
        "marginLeft": 5,
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