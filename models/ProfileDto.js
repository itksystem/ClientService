class ProfileDto {
  constructor({ id, user_id, phone, surname, name, patronymic, address, created, updated, login }) {
    this.profileId = id;
    this.userId = user_id;
    this.phone = phone;
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.address = address;
    this.created = created;
    this.updated = updated;
    this.login = login;
  }

  // Геттеры
  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getPhone() {
    return this.phone;
  }

  getSurname() {
    return this.surname;
  }

  getName() {
    return this.name;
  }

  getPatronymic() {
    return this.patronymic;
  }

  getAddress() {
    return this.address;
  }

  getCreated() {
    return this.created;
  }

  getUpdated() {
    return this.updated;
  }

  getLogin() {
    return this.login;
  }

  // Сеттеры
  setId(value) {
    this.id = value;
  }

  setUserId(value) {
    this.userId = value;
  }

  setPhone(value) {
    this.phone = value;
  }

  setSurname(value) {
    this.surname = value;
  }

  setName(value) {
    this.name = value;
  }

  setPatronymic(value) {
    this.patronymic = value;
  }

  setAddress(value) {
    this.address = value;
  }

  setCreated(value) {
    this.created = value;
  }

  setUpdated(value) {
    this.updated = value;
  }

  setLogin(value) {
    this.login = value;
  }

  // Метод для преобразования объекта в строку
  toString() {
    return `ProfileDto {
      id: ${this.id},
      userId: ${this.userId},
      phone: '${this.phone}',
      surname: '${this.surname}',
      name: '${this.name}',
      patronymic: '${this.patronymic}',
      address: '${this.address}',
      created: '${this.created}',
      updated: '${this.updated}',
      login: '${this.login}'
    }`;
  }
}

module.exports = ProfileDto;

