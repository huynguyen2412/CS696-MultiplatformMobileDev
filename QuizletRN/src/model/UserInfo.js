class UserInfo{

  constructor(firstName, lastName, nickName, age){
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;
    this.age = age;
  }

  updateUserInfo(info){
    this.firstName = info.firstName;
    this.lastName = info.lastName;
    this.nickName = info.nickName;
    this.age = info.age.toString();
  }

}

export default UserInfo;