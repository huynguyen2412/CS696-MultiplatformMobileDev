import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class LoadingModal {
  BuildContext _context;

  void show() => Navigator.push(
    _context,
    MaterialPageRoute(
        builder: (context) => ScreenLoader())
  );

  void hide() => Navigator.pop(_context);
}


class ScreenLoader extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return Container(
      decoration: BoxDecoration(
        color: Color.fromRGBO(128, 128, 128, 0.7)
      ),
      child: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}

