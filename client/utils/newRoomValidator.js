export function validateInput(input) {
    let errors = { hasErrors: false };
    if (!input.name) {
        errors.name = 'required field';
        errors.hasErrors = true;
    } else {
        if (!/^[a-zA-Z ]+$/g.test(input.title)) {
            errors.name = `Can't contains numbers or special characters`;
            errors.hasErrors = true;
        }
    }

    if (!input.teacher) {
        errors.teacher = 'required field';
        errors.hasErrors = true;
    } else {
        if (!/^[a-zA-Z ]+$/g.test(input.title)) {
            errors.teacher = `Can't contains numbers or special characters`;
            errors.hasErrors = true;
        }
    }
    return errors;
}
