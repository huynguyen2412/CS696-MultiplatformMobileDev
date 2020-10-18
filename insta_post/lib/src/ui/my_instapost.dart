import 'package:flutter/material.dart';
import 'package:insta_post/src/resources/post_form.dart';
import 'package:insta_post/src/ui/hashtag_list.dart';
import 'package:insta_post/src/ui/nickname_list.dart';

class MyInstapost extends StatelessWidget{

  _createAPost(BuildContext context) async{
    return Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => PostForm())
    );
  }

  Widget hashtagPage(BuildContext context) {
    return ListTile(
      leading: Icon(Icons.alternate_email),
      title: Text("Members' Hashtags"),
      onTap: () async{
        Navigator.pop(context);
        await Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => HashtagListViewer()
            )
        );
      }
    );
  }

  Widget nicknamePage(BuildContext context) {
    return ListTile(
      leading: Icon(Icons.person_pin_rounded),
      title: Text("Members' Nicknames"),
      onTap: () async{
        Navigator.pop(context);
        await Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => NicknameListViewer()
            )
        );
      }
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("InstaPost Homepage"),
        centerTitle: true,
      ),
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            DrawerHeader(
              child: Text(
                  "My InstaPost",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24
                  )
              ),
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor
              ),
            ),
            nicknamePage(context),//nicknames
            hashtagPage(context)//hashtag
          ],
        ),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            Text("List of Post")
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add_circle),
        onPressed: () async{
          _createAPost(context);
        },
      )
    );
  }
}
