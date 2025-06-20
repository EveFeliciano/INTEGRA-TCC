import Link from "next/link"
import { ArrowRight, Calendar, Users, Building, Presentation, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#582b69] flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl text-[#582b69]">ETEC Connect</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/#sobre" className="text-[#582b69] hover:text-purple-500 font-medium">
              Sobre Nós
            </Link>
            <Link href="/#empresas" className="text-[#582b69] hover:text-purple-500 font-medium">
              Empresas
            </Link>
            <Link href="/#palestras" className="text-[#582b69] hover:text-purple-500 font-medium">
              Palestras
            </Link>
            <Link href="/#contato" className="text-[#582b69] hover:text-purple-500 font-medium">
              Contato
            </Link>
          </nav>

          <div>
            <Button asChild className="bg-[#582b69] hover:bg-purple-800 text-white">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Banner */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#582b69] to-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Conectando ETECs, Empresas e Palestrantes
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Uma plataforma inovadora que integra estudantes técnicos com o mercado de trabalho através de visitas
                  técnicas e palestras.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-[#582b69] font-semibold">
                    <Link href="/login">Acessar Plataforma</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#582b69]"
                  >
                    <Link href="/#sobre">
                      Saiba Mais <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-[500px] h-[300px] bg-purple-800 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-4">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-[#582b69]" />
                      </div>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Building className="h-8 w-8 text-[#582b69]" />
                      </div>
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Presentation className="h-8 w-8 text-[#582b69]" />
                      </div>
                    </div>
                    <p className="text-white font-medium">Imagem Ilustrativa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre Nós */}
        <section id="sobre" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#582b69]">
                  Sobre Nós
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  O ETEC Connect é uma iniciativa que visa aproximar os estudantes das Escolas Técnicas Estaduais
                  (ETECs) do mercado de trabalho, proporcionando experiências práticas através de visitas técnicas e
                  palestras com profissionais e empresas de destaque.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 border border-purple-200 p-6 rounded-lg bg-white shadow-sm">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-[#582b69]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#582b69]">Estudantes</h3>
                  <p className="text-gray-500 text-center">
                    Acesso a visitas técnicas, palestras e oportunidades de estágio e emprego.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border border-purple-200 p-6 rounded-lg bg-white shadow-sm">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Building className="h-6 w-6 text-[#582b69]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#582b69]">Empresas</h3>
                  <p className="text-gray-500 text-center">
                    Conexão com talentos em formação e divulgação da marca para futuros profissionais.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border border-purple-200 p-6 rounded-lg bg-white shadow-sm">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Presentation className="h-6 w-6 text-[#582b69]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#582b69]">Palestrantes</h3>
                  <p className="text-gray-500 text-center">
                    Compartilhamento de conhecimento e experiência com a próxima geração de profissionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empresas Parceiras */}
        <section id="empresas" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#582b69]">
                  Empresas Parceiras
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conheça algumas das empresas que já fazem parte do nosso ecossistema.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500 font-medium">Logo {i}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-[#582b69] hover:bg-purple-800 text-white">Seja um Parceiro</Button>
            </div>
          </div>
        </section>

        {/* Próximas Palestras */}
        <section id="palestras" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#582b69]">
                  Próximas Palestras e Visitas
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Confira os próximos eventos disponíveis para os estudantes das ETECs.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    title: "Visita à Empresa de Tecnologia",
                    date: "15/06/2025",
                    type: "Visita Técnica",
                    icon: Building,
                  },
                  {
                    title: "Palestra: Mercado de Trabalho em TI",
                    date: "22/06/2025",
                    type: "Palestra",
                    icon: Presentation,
                  },
                  {
                    title: "Workshop de Desenvolvimento Web",
                    date: "30/06/2025",
                    type: "Workshop",
                    icon: Calendar,
                  },
                ].map((event, i) => (
                  <div
                    key={i}
                    className="flex flex-col space-y-3 border border-purple-200 p-6 rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-purple-100">
                        <event.icon className="h-5 w-5 text-[#582b69]" />
                      </div>
                      <span className="text-sm font-medium text-[#582b69]">{event.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#582b69]">{event.title}</h3>
                    <p className="text-gray-500">Data: {event.date}</p>
                    <Button variant="outline" className="mt-2 border-purple-300 text-[#582b69] hover:bg-purple-50">
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-[#582b69] hover:bg-purple-800 text-white">
                <Link href="/login">Ver Todos os Eventos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#582b69]">Entre em Contato</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed">
                  Tem alguma dúvida ou sugestão? Entre em contato conosco. Estamos sempre à disposição para ajudar.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#582b69]" />
                    <span>contato@etecconnect.com.br</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#582b69]" />
                    <span>(11) 9999-9999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#582b69]" />
                    <span>São Paulo, SP</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#582b69]"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#582b69]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#582b69]"
                  >
                    Assunto
                  </label>
                  <input
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#582b69]"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>
                <Button className="w-full bg-[#582b69] hover:bg-purple-800 text-white">Enviar Mensagem</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#582b69] to-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Faça Parte dessa Conexão
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Estudantes, empresas e palestrantes: junte-se a nós e transforme o futuro da educação técnica.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-[#582b69] font-semibold">
                  <Link href="/login">Acessar Plataforma</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#582b69]"
                >
                  <Link href="/#contato">Entre em Contato</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-[#582b69] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-yellow-400 font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-lg">ETEC Connect</span>
              </div>
              <p className="text-sm text-gray-300">
                Conectando estudantes, empresas e palestrantes para um futuro melhor.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-yellow-400">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#sobre" className="hover:underline">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/#empresas" className="hover:underline">
                    Empresas
                  </Link>
                </li>
                <li>
                  <Link href="/#palestras" className="hover:underline">
                    Palestras
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-yellow-400">Contato</h3>
              <ul className="space-y-2 text-sm">
                <li>contato@etecconnect.com.br</li>
                <li>(11) 9999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-yellow-400">Redes Sociais</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-yellow-400">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-yellow-400">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-yellow-400">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-purple-800 pt-6 text-center text-sm">
            <p>© 2025 ETEC Connect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
