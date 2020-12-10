class UserInfo{

  getUserInfo(info){
    let user = new UserInfo();
    user.firstName = info.firstName;
    user.lastName = info.lastName;
    user.email = info.email;
    return user;
  }
}

export default UserInfo;