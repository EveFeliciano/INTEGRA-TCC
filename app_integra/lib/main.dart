import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'avaliacao_visita_page.dart'; // se salvar em outro arquivo

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Avaliação Visita Técnica',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color.fromARGB(255, 88, 43, 105),
        colorScheme: ColorScheme.fromSwatch().copyWith(
          secondary: CupertinoColors.systemYellow,
        ),
        fontFamily: 'BarlowRegular',
      ),
      home: const LoginPage(), // <-- Aqui está a tela inicial!
    );
  }
}
