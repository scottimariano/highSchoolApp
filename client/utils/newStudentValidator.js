export function validateInput(input) {
    let errors = { hasErrors: false };
    if (!input.name) {
        errors.name = 'required field';
        errors.hasErrors = true;
    } else {
        if (!/^[a-zA-Z ]+$/g.test(input.name)) {
            errors.name = `Can't contains numbers or special characters`;
            errors.hasErrors = true;
        }
    }

    if (!input.lastName) {
        errors.lastName = 'required field';
        errors.hasErrors = true;
    } else {
        if (!/^[a-zA-Z ]+$/g.test(input.lastName)) {
            errors.lastName = `Can't contains numbers or special characters`;
            errors.hasErrors = true;
        }
    }

    if (!input.age) {
        errors.age = 'required field';
        errors.hasErrors = true;
    } else {
        if (input.age < 1) {
            errors.age = `Should be a positive integer`;
            errors.hasErrors = true;
        }
    }
    return errors;
}
