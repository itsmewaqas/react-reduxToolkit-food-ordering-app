function validateInfo({ values }) {
    let errors = {};

    if (values.name !== null) {
        if (!values.name) {
            errors.name = "please inter your name";
        } else if (values.name.length < 6) {
            errors.name = "name need to be 6 characters or more'";
        }
    }

    if (values.email !== null) {
        if (!values.email) {
            errors.email = "Please enter your email address.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please enter a valid email address.";
        }
    }

    if (values.cell !== null) {
        if (!values.cell) {
            errors.cell = "Please enter your cell number.";
        } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.cell)) {
            errors.cell = "Please enter a valid cell number.";
        }
    }

    if (values.password !== null) {
        if (!values.password) {
            errors.password = "Please enter your password.";
        } else if (values.password.length < 6) {
            errors.password = "Password needs to be 6 characters or more.";
        }
    }

    if (values.confirmPassword !== null) {
        if (!values.confirmPassword) {
            errors.confirmPassword = "Please enter your confirmPassword.";
        } else if (values.confirmPassword.length < 6) {
            errors.confirmPassword = "confirm password needs to be 6 characters or more.";
        }
    }

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "your passwords does not match.";
    }

    if (values.address !== null) {
        if (!values.address) {
            errors.address = "Please enter your address.";
        }
    }

    if (values.gender !== null) {
        if (!values.gender) {
            errors.gender = "Please select your gender.";
        }
    }

    if (values.usertype !== null) {
        if (!values.usertype) {
            errors.usertype = "Please select user type.";
        }
    }

    if (values.education !== undefined && values.education.length === 0) {
        errors.education = "Please select your education.";
    }

    return errors;
}

export default validateInfo;