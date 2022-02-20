class Validator {
    #errors = {};

    make(data, rules) {
        for(const key in rules) {
            const fieldRules = rules[key];

            fieldRules.forEach(role => {
                let checkRole;

                if(this.checkAdditionalParameter(role)) {
                    let [attr, parameter] = role.split('|');
                    checkRole = this[attr](data[key], +parameter);
                }
                else {
                    checkRole = this[role](data[key]);
                }


                if (!checkRole.status) {
                    this.#errors[key] = checkRole.errorMessage;
                }
            });

        }
    }

    checkAdditionalParameter(value) {
        return /\|/.test(value);
    }

    fails() {
        return (Object.values(this.#errors).length === 0) ? { status: true } : { status: false, messages: this.#errors };
    }

    require(value) {
        return !value ? { status: false, errorMessage: "Заполните поле!" } : { status: true };
    }

    minLength (value, minLength) {
        return (value.length < minLength) ? { status: false, errorMessage: `Поле должно содержать не меньше ${minLength} символов` } : { status: true };
    }

    maxLength (value, maxLength) {
        return (value.length > maxLength) ? { status: false, errorMessage: `Поле должно содержать не больше ${maxLength} символов` } : { status: true };
    }
    
    number(value) {
        let regex = /^\d+$/;
        return !(regex.test(value)) ? { status: false, errorMessage: "Поле должно содержать число" } : { status: true };
    }

    email(value) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
        return !(regex.test(value)) ? { status: false, errorMessage: "Не валидный email" } : { status: true };
    }
}

export default Validator;