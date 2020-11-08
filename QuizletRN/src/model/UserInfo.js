class UserInfo{

  constructor(firstName, lastName, nickName, email){
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;
    this.email = email;
  }

  updateUserInfo(info){
    this.firstName = info.firstName;
    this.lastName = info.lastName;
    this.nickName = info.nickName;
    this.email = info.email
  }

}

export default UserInfo;