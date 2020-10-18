import 'package:flutter/cupertino.dart';
import 'package:insta_post/src/models/user_info.dart';
import 'package:provider/provider.dart';

class UserStateModel extends ChangeNotifier{
  bool isSignIn = false;
  UserInfoPODO userInfo;

  void setUserInfo(UserInfoPODO userInfoModel) => userInfo = userInfoModel;
  UserInfoPODO getUserInfo() => userInfo;

  void toggleLoginState(){
    isSignIn = !isSignIn;
    notifyListeners();
  }
}