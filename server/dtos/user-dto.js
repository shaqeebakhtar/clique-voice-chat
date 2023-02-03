class UserDto {
  id;
  updatedAt;
  phone;
  activated;

  constructor(user) {
    this.id = user._id;
    this.updatedAt = user.updatedAt;
    this.phone = user.phone;
    this.activated = user.activated;
  }
}

module.exports = UserDto;
