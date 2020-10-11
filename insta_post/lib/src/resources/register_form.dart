import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:insta_post/src/models/input_field.dart';
import 'package:http/http.dart' as http;
import 'package:insta_post/src/models/loading_modal.dart';
import 'package:insta_post/src/models/user_info.dart';

class RegisterForm extends StatefulWidget {
  RegisterForm({Key infoKey, this.title}) : super(key: infoKey);

  final String title;

  @override
  _RegisterForm createState() => _RegisterForm();
}

class _RegisterForm extends State<RegisterForm> {
  final _formKey = GlobalKey<FormState>();
  final fNameController = TextEditingController();
  final lNameController = TextEditingController();
  final emailController = TextEditingController();
  final nicknameController = TextEditingController();
  final passwordController = TextEditingController();
  String _emailCheckState = "";
  String _nicknameCheckState = "";
  final _urlAuthority = 'bismarck.sdsu.edu';

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    emailController.dispose();
    nicknameController.dispose();
    super.dispose();
  }

  String _validationTextOnly(String textInput, String textFieldName) {
    String _validRegex = r"^[a-z A-Z \t \']*$";
    if (textInput.isEmpty) return "Please enter your $textFieldName";

    RegExp regExp = new RegExp(_validRegex);
    if (regExp.hasMatch(textInput)) return null;

    return "$textFieldName not valid";
  }

  String _validationPassword(String passwordInput){
    if(passwordInput.isEmpty) return "Please enter your password.";
    if(passwordInput.length < 3) return "Pasword at least 3 characters.";
    return null;
  }

  Future<String> _validationEmail(String emailText) async{
    String _validRegex = r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp _regExp = RegExp(_validRegex);
    final _path = '/api/instapost-query/email-exists';
    final Map<String, String> queryParams = {
      'email' : emailText
    };

    //sync validation
    if(emailText.isEmpty) return "Please enter your email.";
    if(!_regExp.hasMatch(emailText)) return "Not a valid email.";

    //async validation
    final _uri = Uri.https(_urlAuthority, _path, queryParams);
    final response = await http.get(_uri,
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );
    if(response.statusCode == 200){
      Map<String,dynamic> _resBody = jsonDecode(response.body);
      return _resBody['result'] ?  "Email already in use." : null;
    }
    else
      throw Exception("Failed to validate Email from server");
  }

  Future<String> _validateNickName(String nickNameText) async{
    final _path = '/api/instapost-query/nickname-exists';
    final Map<String, String> queryParams = {
      'nickname' : nickNameText
    };

    //sync validation
    if(nickNameText.isEmpty) return "Please enter your nickname.";

    //async validation
    final _uri = Uri.https(_urlAuthority, _path, queryParams);
    final response = await http.get(_uri,
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json'
        }
    );
    if(response.statusCode == 200){
      Map<String,dynamic> _resBody = jsonDecode(response.body);
      return _resBody['result'] ?  "Nickname already taken." : null;
    }
    else
      throw Exception("Failed to validate Nickname from server");
  }

  Future<String> _sendRequestToCreateUser(UserInfoPODO userInfoPODO) async{
    final _path = "/api/instapost-upload/newuser";
    final _uri = Uri.https(_urlAuthority, _path);
    final response = await http.post(_uri,
      headers: {
        HttpHeaders.contentTypeHeader : "application/json"
      },
      body: jsonEncode(<String,String>{
        "firstname": userInfoPODO.firstName,
        "lastname": userInfoPODO.lastName,
        "nickname": userInfoPODO.nickname,
        "email": userInfoPODO.email,
        "password": userInfoPODO.password
      })
    );

    if(response.statusCode == 200){
      return "Member has created.";
    }
    else{
      final res = jsonDecode(response.body);
      return ("${res['result']} create a member. ${res['errors']}");
    }
  }

  //Display form information
  Widget listInfoTextField(GlobalKey<FormState> formKey) {
    return Form(
        key: formKey,
        autovalidateMode: AutovalidateMode.disabled,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            InputField(
              labelTextField: 'FirstName',
              obscureText: false,
              keyboardTextField: TextInputType.name,
              controller: fNameController,
              validator: (value) => _validationTextOnly(value, "First Name")
            ),
            InputField(
              labelTextField: 'LastName',
              obscureText: false,
              keyboardTextField: TextInputType.name,
              controller: lNameController,
              validator: (value) => _validationTextOnly(value, "Last Name")
            ),
            InputField(
              labelTextField: 'NickName',
              obscureText: false,
              keyboardTextField: TextInputType.name,
              validator: (value) => _nicknameCheckState,
              controller: nicknameController
            ),
            InputField(
              labelTextField: 'Email',
              obscureText: false,
              keyboardTextField: TextInputType.name,
              controller: emailController,
              validator: (value) => _emailCheckState,
            ),
            InputField(
              labelTextField: 'Password',
              obscureText: true,
              keyboardTextField: TextInputType.name,
              controller: passwordController,
              validator: (value) => _validationPassword(value),
            ),
            Center(
              child: RaisedButton(
                onPressed: () async{
                  final getEmailState = await _validationEmail(emailController.text);
                  final getNickNameState = await _validateNickName(nicknameController.text);
                  _emailCheckState = getEmailState;
                  _nicknameCheckState = getNickNameState;

                  //navigate back to landing page if successful
                  if(formKey.currentState.validate()){
                    final response = await _sendRequestToCreateUser(
                      UserInfoPODO(
                        firstName: fNameController.text,
                        lastName: lNameController.text,
                        nickname: nicknameController.text,
                        email: emailController.text,
                        password: passwordController.text
                      )
                    );

                    print("$response");
                  }
                },
                child:
                    const Text('Register', style: TextStyle(fontSize: 20)),
                color: Theme.of(context).primaryColor,
              ),
            ),
          ],
        )
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          listInfoTextField(_formKey)
        ],
      ),
    );
  }
}



