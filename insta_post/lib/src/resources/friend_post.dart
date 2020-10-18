import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:insta_post/src/models/user_info.dart';
import 'package:insta_post/src/models/user_post.dart';
import 'package:insta_post/src/models/user_state_model.dart';
import 'package:insta_post/src/models/user_state_model.dart';
import 'package:insta_post/src/resources/comment_view.dart';
import 'package:insta_post/src/resources/image_viewer.dart';
import 'package:insta_post/src/resources/rating_post.dart';
import 'package:provider/provider.dart';

class FriendPost extends StatefulWidget{
  final UserPostPODO userPostInfo;
  final String nickname;
  final String _urlAuthority = "bismarck.sdsu.edu";
  final String _path = "/api/instapost-upload/";
  final String listNameKey = "ids";

  FriendPost({this.userPostInfo, this.nickname});

  @override
  _FriendPost createState() => _FriendPost();
}

class _FriendPost extends State<FriendPost>{
  final String urlAuthority = "bismarck.sdsu.edu";
  final _headersParams = {
    HttpHeaders.contentTypeHeader : "application/json"
  };
  TextEditingController _commentController = TextEditingController();
  Future<String> resBody;
  bool _isErrorExist = false;
  String _errorMessage = "";
  int _ratingScore = 0;

  @override
  void initState(){
    super.initState();
  }

  Future<String> _postAComment(int postId) async{
    final commentPath = "/api/instapost-upload/comment";
    final Map<String, dynamic> queryParams = {
      "email": Provider.of<UserStateModel>(context, listen: false).userInfo.email,
      "password": Provider.of<UserStateModel>(context, listen: false).userInfo.password,
      "comment": _commentController.text,
      "post-id": postId
    };
    final uri = Uri.https(urlAuthority, commentPath);
    final response = await http.post(uri,
      headers: _headersParams,
      body: jsonEncode(queryParams)
    );

    if(response.statusCode != 200){
      throw Exception("Failed to send the comment\n"
          "Error ${response.statusCode}\n"
          "${response.body.toString()}");
    }
    return response.body;
  }

  Future<String> _submitRate(int postId, int rating) async{
    final commentPath = "/api/instapost-upload/rating";
    final Map<String, dynamic> queryParams = {
      "email": Provider.of<UserStateModel>(context, listen: false).userInfo.email,
      "password": Provider.of<UserStateModel>(context, listen: false).userInfo.password,
      "rating" : rating,
      "post-id": postId
    };
    final uri = Uri.https(urlAuthority, commentPath);
    final response = await http.post(uri,
      headers: _headersParams,
      body: jsonEncode(queryParams)
    );

    if(response.statusCode != 200){
      throw Exception("Failed to submit the rating\n"
          "Error ${response.statusCode}\n"
          "${response.body.toString()}");
    }
    return response.body;
  }

  //the information get from "post" object of post-id
  Widget friendPost(UserPostPODO userPostInfo, BuildContext context){
    // final Map<String, dynamic> temp = {
    //   "post": {
    //     "comments": ["AAAAA", "BBBBB", "CCCCC","AAAAA", "BBBBB", "CCCCC","AAAAA", "BBBBB", "CCCCC","AAAAA", "BBBBB", "CCCCC", "EEEEE"],
    //     "ratings-count": 0,
    //     "ratings-average": -1,
    //     "id": 1915,
    //     "hashtags": [
    //       "#fe",
    //       "#rr",
    //       "#ar",
    //       "#ii"
    //     ],
    //     "image": 1915,
    //     "text": "new car blah blah "
    //   },
    // };
    // final postInfo = UserPostPODO.fromJson(temp['post']);
    return SingleChildScrollView(
      child: Container(
        padding: EdgeInsets.all(20.0),
        decoration: BoxDecoration(
            border: Border.all(
                color: Colors.black38,
                width: 2
            )
        ),
        child: Column(
          children: <Widget>[
            (userPostInfo.imageId != -1 ?
            ImageViewer(userPostInfo.imageId) : Text("")
            ),//image
            Container(
              child: Text(
                  userPostInfo.text +
                      userPostInfo.hashtags.fold("", (prev, val) => prev + val).toString()
              ),
            ),//tweetpost
            Container(
              child: CommentView(userPostInfo.comments),
            ),
            Container(
              child: RatingPost(
                  userPostInfo.id,
                  userPostInfo.ratingsAverage < 0 ?
                    "0" : userPostInfo.ratingsAverage.toStringAsFixed(2).toString(),
                  (int rate) => _ratingScore = rate
              ),
            ),//rating
            Container(
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.black26,
                  ),
                  borderRadius: BorderRadius.circular(12)
              ),
              child: TextField(
                controller: _commentController,
                autofocus: false,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    focusedBorder: InputBorder.none
                ),
              ),
            ),
            Container(
              child: Text(
                _isErrorExist ? _errorMessage : ""
              ),
            ),
            ElevatedButton(
              child: Icon(Icons.comment),
              onPressed: () async{
                final postId = widget.userPostInfo.id;
                final submitStatus = await _submitPost(postId, _ratingScore, context);

                if(submitStatus){
                  _commentController.clear();
                }
              },
            )
          ],
        ),
      ),
    );
  }


  Future<bool> _submitPost(int postId, int rating, BuildContext context) async{
    final commentResBody = await _postAComment(postId);
    final commentJson = jsonDecode(commentResBody);
    final ratingResBody = await _submitRate(postId, rating);
    final ratingJson = jsonDecode(ratingResBody);

    if(commentJson['result'] == 'fail'){
      final snackBar = SnackBar(content: Text(
        "Failed to send the comment\n"),
        duration: new Duration(seconds: 3),
      );
      Scaffold.of(context).showSnackBar(snackBar);
      return false;
    }

    if(ratingJson['result'] == 'fail'){
      final snackBar = SnackBar(content: Text(
          "Failed to submit the rate.\n"),
        duration: new Duration(seconds: 3),
      );
      Scaffold.of(context).showSnackBar(snackBar);
      return false;
    }

    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("test"),
      ),
      body: Builder(
        builder: (context) => friendPost(widget.userPostInfo, context)
      )
    );
  }
}