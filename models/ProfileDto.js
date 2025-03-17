class ProfileDto {
  constructor({ id, user_id, phone, surname, name, patronymic, address, created, updated, login, email }) {
    this.profileId = Number(id) ?? undefined;
    this.userId =  Number(user_id) ?? undefined;
    this.phone = phone ?? undefined;
    this.surname = surname ?? undefined;
    this.name = name ?? undefined;
    this.patronymic = patronymic ?? undefined;
    this.address = address ?? undefined;
    this.created = created ?? undefined;
    this.updated = updated ?? undefined;
    this.login = login ?? undefined;
    this.email = email ?? undefined;
  }

  // Геттеры
  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
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
    this.id = Number(value);
  }

  setEmail(value) {
    this.email = value;
  }

  setUserId(value) {
    this.userId = Number(value);
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
      login: '${this.login}',
      email: '${this.email}'
    }`;
  }
}

module.exports = ProfileDto;

