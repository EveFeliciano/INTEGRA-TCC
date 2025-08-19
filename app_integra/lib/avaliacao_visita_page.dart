import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

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
      home: const LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController senhaController = TextEditingController();

  bool _isLoading = false;

  void _login() {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    // Simula login - aqui você pode integrar backend real depois
    Future.delayed(const Duration(seconds: 1), () {
      setState(() => _isLoading = false);
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const AvaliacaoVisitaPage()),
      );
    });
  }

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) return 'Por favor, insira seu e-mail.';
    if (!value.contains('@')) return 'E-mail inválido.';
    if (!value.endsWith('@etec.sp.gov.br'))
      return 'Use seu e-mail @etec.sp.gov.br.';
    return null;
  }

  String? _validateSenha(String? value) {
    if (value == null || value.isEmpty) return 'Por favor, insira sua senha.';
    if (value.length < 4) return 'Senha muito curta.';
    return null;
  }

  @override
  void dispose() {
    emailController.dispose();
    senhaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 88, 43, 105),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 40),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 16,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            padding: const EdgeInsets.all(32),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Logo (coloque seu asset no caminho correto)
                  Image.asset('assets/logo.png', width: 96, height: 96),
                  const SizedBox(height: 24),

                  const Text(
                    'Login do Aluno',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Color.fromARGB(255, 88, 43, 105),
                    ),
                  ),
                  const SizedBox(height: 32),

                  TextFormField(
                    controller: emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: const InputDecoration(
                      labelText: 'E-mail @etec.sp.gov.br',
                      prefixIcon: Icon(Icons.email),
                      border: OutlineInputBorder(),
                    ),
                    validator: _validateEmail,
                  ),
                  const SizedBox(height: 24),

                  TextFormField(
                    controller: senhaController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Senha',
                      prefixIcon: Icon(Icons.lock),
                      border: OutlineInputBorder(),
                    ),
                    validator: _validateSenha,
                  ),
                  const SizedBox(height: 32),

                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _isLoading ? null : _login,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color.fromARGB(255, 88, 43, 105),
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      child: _isLoading
                          ? const SizedBox(
                              height: 24,
                              width: 24,
                              child: CircularProgressIndicator(
                                color: CupertinoColors.systemYellow,
                                strokeWidth: 3,
                              ),
                            )
                          : const Text(
                              'Entrar',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: CupertinoColors.systemYellow,
                              ),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// A partir daqui a tela AvaliacaoVisitaPage igual ao código anterior, coloquei abaixo:

class Avaliacao {
  int notaOrganizacao;
  int notaConteudo;
  int notaInteracao;
  String comentario;

  Avaliacao({
    this.notaOrganizacao = 0,
    this.notaConteudo = 0,
    this.notaInteracao = 0,
    this.comentario = '',
  });
}

class AvaliacaoVisitaPage extends StatefulWidget {
  const AvaliacaoVisitaPage({super.key});

  @override
  State<AvaliacaoVisitaPage> createState() => _AvaliacaoVisitaPageState();
}

class _AvaliacaoVisitaPageState extends State<AvaliacaoVisitaPage> {
  int _currentIndex = 0;

  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  final Map<DateTime, List<String>> _events = {
    DateTime.utc(2025, 8, 20): ['Visita Técnica ETEC A'],
    DateTime.utc(2025, 8, 25): ['Palestra INTEGRA'],
    DateTime.utc(2025, 9, 1): ['Evento de Integração'],
  };

  final Map<String, Avaliacao> _avaliacoes = {};

  String? _selectedEvent;

  final TextEditingController comentarioController = TextEditingController();

  List<String> _getEventsForDay(DateTime day) {
    return _events[DateTime.utc(day.year, day.month, day.day)] ?? [];
  }

  Widget _buildStarRating(int nota, Function(int) onTap) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(5, (index) {
        return IconButton(
          icon: Icon(
            index < nota ? Icons.star : Icons.star_border,
            color: Colors.amber,
            size: 32,
          ),
          onPressed: () => onTap(index + 1),
          splashRadius: 20,
          padding: EdgeInsets.zero,
        );
      }),
    );
  }

  void _enviarAvaliacao() {
    if (_selectedEvent == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Por favor, selecione um evento para avaliar.'),
        ),
      );
      return;
    }

    final avaliacaoAtual = _avaliacoes[_selectedEvent!] ?? Avaliacao();

    if (avaliacaoAtual.notaOrganizacao == 0 ||
        avaliacaoAtual.notaConteudo == 0 ||
        avaliacaoAtual.notaInteracao == 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, avalie todos os itens.')),
      );
      return;
    }

    avaliacaoAtual.comentario = comentarioController.text;
    _avaliacoes[_selectedEvent!] = avaliacaoAtual;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Avaliação Enviada'),
        content: Text(
          'Obrigado pela sua avaliação!\n\n'
          'Evento: $_selectedEvent\n'
          'Organização: ${avaliacaoAtual.notaOrganizacao}\n'
          'Conteúdo: ${avaliacaoAtual.notaConteudo}\n'
          'Interação: ${avaliacaoAtual.notaInteracao}\n'
          'Comentário: ${avaliacaoAtual.comentario.isEmpty ? "Nenhum" : avaliacaoAtual.comentario}',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Fechar'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    comentarioController.dispose();
    super.dispose();
  }

  Widget _buildEventosTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Próximos Eventos Agendados:',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 16),

        TableCalendar<String>(
          firstDay: DateTime.utc(2023, 1, 1),
          lastDay: DateTime.utc(2030, 12, 31),
          focusedDay: _focusedDay,
          selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
          eventLoader: _getEventsForDay,
          calendarStyle: const CalendarStyle(
            todayDecoration: BoxDecoration(
              color: Color.fromARGB(255, 245, 158, 11),
              shape: BoxShape.circle,
            ),
            selectedDecoration: BoxDecoration(
              color: Color.fromARGB(255, 88, 43, 105),
              shape: BoxShape.circle,
            ),
            markerDecoration: BoxDecoration(
              color: Colors.red,
              shape: BoxShape.circle,
            ),
          ),
          onDaySelected: (selectedDay, focusedDay) {
            setState(() {
              _selectedDay = selectedDay;
              _focusedDay = focusedDay;
              _selectedEvent = null;
              comentarioController.clear();
            });
          },
          headerStyle: const HeaderStyle(
            formatButtonVisible: false,
            titleCentered: true,
          ),
        ),

        const SizedBox(height: 16),

        Expanded(
          child: _selectedDay == null
              ? const Center(
                  child: Text('Selecione um dia para ver os eventos.'),
                )
              : _getEventsForDay(_selectedDay!).isEmpty
              ? const Center(child: Text('Nenhum evento neste dia.'))
              : ListView.builder(
                  itemCount: _getEventsForDay(_selectedDay!).length,
                  itemBuilder: (context, index) {
                    final evento = _getEventsForDay(_selectedDay!)[index];
                    return ListTile(
                      title: Text(evento),
                      trailing: _avaliacoes.containsKey(evento)
                          ? const Icon(Icons.check_circle, color: Colors.green)
                          : null,
                      onTap: () {
                        setState(() {
                          _selectedEvent = evento;
                          final avaliacao = _avaliacoes[evento] ?? Avaliacao();
                          comentarioController.text = avaliacao.comentario;
                        });
                      },
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildAvaliacaoTab() {
    if (_selectedEvent == null) {
      return const Center(
        child: Text(
          'Selecione um evento na aba Eventos para avaliar.',
          style: TextStyle(fontSize: 18),
          textAlign: TextAlign.center,
        ),
      );
    }

    final avaliacaoAtual = _avaliacoes[_selectedEvent!] ?? Avaliacao();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Avaliação para: $_selectedEvent',
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),

          const Text('Organização da visita:', style: TextStyle(fontSize: 16)),
          _buildStarRating(avaliacaoAtual.notaOrganizacao, (nota) {
            setState(() {
              avaliacaoAtual.notaOrganizacao = nota;
              _avaliacoes[_selectedEvent!] = avaliacaoAtual;
            });
          }),
          const SizedBox(height: 16),

          const Text('Conteúdo apresentado:', style: TextStyle(fontSize: 16)),
          _buildStarRating(avaliacaoAtual.notaConteudo, (nota) {
            setState(() {
              avaliacaoAtual.notaConteudo = nota;
              _avaliacoes[_selectedEvent!] = avaliacaoAtual;
            });
          }),
          const SizedBox(height: 16),

          const Text(
            'Interação com palestrantes:',
            style: TextStyle(fontSize: 16),
          ),
          _buildStarRating(avaliacaoAtual.notaInteracao, (nota) {
            setState(() {
              avaliacaoAtual.notaInteracao = nota;
              _avaliacoes[_selectedEvent!] = avaliacaoAtual;
            });
          }),
          const SizedBox(height: 24),

          const Text('Comentário:', style: TextStyle(fontSize: 16)),
          const SizedBox(height: 8),
          TextField(
            controller: comentarioController,
            maxLines: 4,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              hintText: 'Escreva aqui seus comentários sobre a visita...',
            ),
            onChanged: (value) {
              avaliacaoAtual.comentario = value;
              _avaliacoes[_selectedEvent!] = avaliacaoAtual;
            },
          ),
          const SizedBox(height: 32),

          Center(
            child: ElevatedButton(
              onPressed: _enviarAvaliacao,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 88, 43, 105),
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 14,
                ),
              ),
              child: const Text(
                'Enviar Avaliação',
                style: TextStyle(
                  fontSize: 18,
                  color: CupertinoColors.systemYellow,
                  fontFamily: 'BarlowRegular',
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tabs = [_buildEventosTab(), _buildAvaliacaoTab()];

    return Scaffold(
      appBar: AppBar(
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Image.asset('assets/logo.png', width: 48, height: 48),
        ),
        title: const Text(
          'Avaliação Visita Técnica',
          style: TextStyle(
            color: CupertinoColors.systemYellow,
            fontFamily: 'BarlowRegular',
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: const Color.fromARGB(255, 88, 43, 105),
      ),
      body: tabs[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color.fromARGB(255, 88, 43, 105),
        selectedItemColor: CupertinoColors.systemYellow,
        unselectedItemColor: Colors.white70,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() => _currentIndex = index);
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.event), label: 'Eventos'),
          BottomNavigationBarItem(
            icon: Icon(Icons.rate_review),
            label: 'Avaliação',
          ),
        ],
      ),
    );
  }
}
