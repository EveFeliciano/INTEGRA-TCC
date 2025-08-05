import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: const [
            HeaderSection(),
            BannerSection(),
            SobreSection()
          ],
        ),
      ),
    );
  }
}

class HeaderSection extends StatelessWidget {
  const HeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Image.asset('assets/logo.png', height: 50),
          Row(
            children: [
              _navLink("Sobre Nós"),
              _navLink("Empresas"),
              _navLink("Palestras"),
              _navLink("Contato"),
            ],
          ),
          Row(
            children: [
              _button("Login", Colors.blue),
              const SizedBox(width: 8),
              _button("Cadastre-se", Colors.grey),
            ],
          ),
        ],
      ),
    );
  }

  Widget _navLink(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Text(text, style: const TextStyle(fontWeight: FontWeight.bold)),
    );
  }

  Widget _button(String label, Color color) {
    return ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(backgroundColor: color),
      child: Text(label),
    );
  }
}

class BannerSection extends StatelessWidget {
  const BannerSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color.fromARGB(255, 88, 43, 105),
      padding: const EdgeInsets.all(32),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("Conectando ETECs, Empresas e Palestrantes",
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                const Text(
                  "Uma plataforma inovadora que integra estudantes técnicos com o mercado de trabalho...",
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    ElevatedButton(
                      onPressed: () {},
                      child: const Text("Acessar Plataforma"),
                      style: ButtonStyle(
                        backgroundColor: WidgetStatePropertyAll(Color.fromARGB(255, 245, 158, 11))
                      ),
                    ),
                    const SizedBox(width: 10),
                    OutlinedButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Text("Saiba Mais"),
                          SizedBox(width: 4),
                          Icon(Icons.arrow_forward),
                        ],
                      ),
                    )
                  ],
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class SobreSection extends StatelessWidget {
  const SobreSection({super.key});

  @override
  Widget build(BuildContext context) {
    final cards = [
      ("Estudantes", Icons.people, "Acesso a visitas técnicas, palestras e oportunidades..."),
      ("Empresas", Icons.apartment, "Conexão com talentos em formação e divulgação da marca..."),
      ("Palestrantes", Icons.school, "Compartilhamento de conhecimento e experiência..."),
    ];

    return Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        children: [
          const Text("Sobre Nós", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const Text(
            "O INTEGRA é uma iniciativa que visa aproximar os estudantes das ETECs do mercado de trabalho...",
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: cards.map((data) => _card(data)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _card((String, IconData, String) data) {
    return Card(
      elevation: 3,
      child: Container(
        padding: const EdgeInsets.all(16),
        width: 200,
        child: Column(
          children: [
            Icon(data.$2, size: 40),
            const SizedBox(height: 8),
            Text(data.$1, style: const TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(data.$3, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
