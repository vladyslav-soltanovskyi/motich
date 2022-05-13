class User {
    static country = "Ukraine"; // Если шла речь про статические своства класса то надеюсь правильно понял
    static colorSkin = "White"; // а если шла речь про свойства со статическими значениями то есть своства обьекта лишь для чтения то добавил соответсвующий код на строке 8-9 в комментариях
    
    constructor(name = "Вася", surname = "Пупкин", birthday = "1997-12-07", _salary = 6000) {
        Object.assign(this, { name, surname, birthday, _salary });
        
        // Object.defineProperty(this, 'country', { value: "Ukraine" });
        // Object.defineProperty(this, 'colorSkin', { value: "White" });
    }

    getFullName() {
        return `${this.name} ${this.surname}`;
    }

    getAge() {
        return (new Date()).getFullYear() - (new Date(this.birthday)).getFullYear();
    }

    set salary(value) {
        if (Number.isFinite(+value)) {
            this._salary = Math.max(value, this._salary);
        }
    }

    get salary() {
        return this._salary;
    }
}

const user = new User

console.log(user.getAge());

/*
Также я добавил еще один маленький класс по паттерну проектирования билдер если я его правильно истолкавал
я посчитал что создавать при помощи его гораздо легче пользователей, по крайней мере проще изменять конкретные дэфолтные данные

И тогда можно будет убрать у аргументов в конструкторе класса User их дэфолтные значения)
*/

class UserBuilder {
    name = "Вася";
    surname = "Пупкин";
    birthday = "1997-12-07";
    salary = 6000;

    static create() {
        return new UserBuilder;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setSurname(surname) {
        this.surname = surname;
        return this;
    }

    setBirthday(birthday) {
        this.birthday = birthday;
        return this;
    }

    setSalary(salary) {
        this.salary = salary;
        return this;
    }

    getUser() {
        return new User(this.name, this.surname, this.birthday, this.salary);
    }
}

const user1 = UserBuilder
                .create()
                .setBirthday("2002-09-03")
                .setSalary(12000)
                .setSurname("Ветер")
                .setName("Аня")
                .getUser();