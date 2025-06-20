"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Calendar, LogOut, Mail, Phone, Plus, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados simulados
const empresas = [
  {
    id: 1,
    nome: "TechSolutions",
    setor: "Tecnologia",
    contato: "contato@techsolutions.com",
    telefone: "(11) 9999-8888",
    endereco: "São Paulo, SP",
    disponibilidade: "Segunda a Sexta, 14h às 17h",
  },
  {
    id: 2,
    nome: "Inovação Digital",
    setor: "Marketing Digital",
    contato: "contato@inovacaodigital.com",
    telefone: "(11) 9999-7777",
    endereco: "São Paulo, SP",
    disponibilidade: "Terças e Quintas, 9h às 12h",
  },
  {
    id: 3,
    nome: "Construtech",
    setor: "Construção Civil",
    contato: "contato@construtech.com",
    telefone: "(11) 9999-6666",
    endereco: "São Paulo, SP",
    disponibilidade: "Quartas, 13h às 16h",
  },
]

const palestrantes = [
  {
    id: 1,
    nome: "Ana Silva",
    area: "Inteligência Artificial",
    contato: "ana.silva@palestrante.com",
    telefone: "(11) 9999-5555",
    disponibilidade: "Segundas e Quartas, 19h às 21h",
    bio: "Especialista em IA com mais de 10 anos de experiência no mercado.",
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    area: "Empreendedorismo",
    contato: "carlos.mendes@palestrante.com",
    telefone: "(11) 9999-4444",
    disponibilidade: "Terças e Quintas, 18h às 20h",
    bio: "Empreendedor serial com 3 startups de sucesso.",
  },
  {
    id: 3,
    nome: "Mariana Costa",
    area: "Design UX/UI",
    contato: "mariana.costa@palestrante.com",
    telefone: "(11) 9999-3333",
    disponibilidade: "Sextas, 14h às 18h",
    bio: "Designer com experiência em grandes empresas de tecnologia.",
  },
]

const eventosAgendados = [
  {
    id: 1,
    titulo: "Visita Técnica - TechSolutions",
    tipo: "Visita Técnica",
    data: new Date(2025, 4, 20),
    horario: "14:00 - 16:00",
    local: "São Paulo, SP",
    empresa: "TechSolutions",
  },
  {
    id: 2,
    titulo: "Palestra: Inteligência Artificial",
    tipo: "Palestra",
    data: new Date(2025, 4, 22),
    horario: "19:00 - 21:00",
    local: "Online",
    palestrante: "Ana Silva",
  },
]

export default function CoordenadorDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmpresa, setSelectedEmpresa] = useState<any>(null)
  const [selectedPalestrante, setSelectedPalestrante] = useState<any>(null)
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")

  // Filtrar empresas e palestrantes com base no termo de busca
  const filteredEmpresas = empresas.filter((empresa) => empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredPalestrantes = palestrantes.filter((palestrante) =>
    palestrante.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para agendar evento
  const agendarEvento = () => {
    // Aqui seria implementada a lógica para salvar o evento
    console.log("Evento agendado:", {
      titulo: eventTitle,
      data: eventDate,
      horario: eventTime,
      descricao: eventDescription,
      empresa: selectedEmpresa,
      palestrante: selectedPalestrante,
    })

    // Resetar formulário
    setEventTitle("")
    setEventDate("")
    setEventTime("")
    setEventDescription("")
    setSelectedEmpresa(null)
    setSelectedPalestrante(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/coordenador" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#582b69] flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-lg text-[#582b69]">ETEC Connect</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-4 w-4 text-[#582b69]" />
              </div>
              <span className="text-sm font-medium">Coordenador ETEC</span>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sair</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold text-[#582b69]">Painel do Coordenador</h1>
            <p className="text-gray-500">Gerencie empresas, palestrantes e agende visitas técnicas e palestras.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar empresas ou palestrantes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#582b69] hover:bg-purple-800">
                  <Plus className="mr-2 h-4 w-4" /> Agendar Evento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Agendar Novo Evento</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes para agendar uma visita técnica ou palestra.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Título do Evento</Label>
                    <Input
                      id="event-title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Ex: Visita Técnica - Empresa X"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Data</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-time">Horário</Label>
                      <Input
                        id="event-time"
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Descrição</Label>
                    <Textarea
                      id="event-description"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Descreva o evento..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={agendarEvento} className="bg-[#582b69] hover:bg-purple-800">
                    Confirmar Agendamento
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="empresas" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="empresas">Empresas</TabsTrigger>
              <TabsTrigger value="palestrantes">Palestrantes</TabsTrigger>
              <TabsTrigger value="agendados">Eventos Agendados</TabsTrigger>
            </TabsList>

            <TabsContent value="empresas" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmpresas.map((empresa) => (
                  <Card key={empresa.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{empresa.nome}</CardTitle>
                      <CardDescription>{empresa.setor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{empresa.contato}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{empresa.telefone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{empresa.endereco}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{empresa.disponibilidade}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-[#582b69] text-[#582b69] hover:bg-purple-50"
                            onClick={() => setSelectedEmpresa(empresa)}
                          >
                            Agendar Visita
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Agendar Visita Técnica</DialogTitle>
                            <DialogDescription>
                              Preencha os detalhes para agendar uma visita à {selectedEmpresa?.nome}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="visit-title">Título da Visita</Label>
                              <Input
                                id="visit-title"
                                defaultValue={`Visita Técnica - ${selectedEmpresa?.nome}`}
                                onChange={(e) => setEventTitle(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="visit-date">Data</Label>
                                <Input id="visit-date" type="date" onChange={(e) => setEventDate(e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="visit-time">Horário</Label>
                                <Input id="visit-time" type="time" onChange={(e) => setEventTime(e.target.value)} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="visit-description">Descrição</Label>
                              <Textarea
                                id="visit-description"
                                placeholder="Descreva a visita técnica..."
                                onChange={(e) => setEventDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={agendarEvento} className="bg-[#582b69] hover:bg-purple-800">
                              Confirmar Agendamento
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="palestrantes" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPalestrantes.map((palestrante) => (
                  <Card key={palestrante.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{palestrante.nome}</CardTitle>
                      <CardDescription>{palestrante.area}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-gray-500">{palestrante.bio}</p>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{palestrante.contato}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{palestrante.telefone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-[#582b69] mt-0.5" />
                        <span>{palestrante.disponibilidade}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-[#582b69] text-[#582b69] hover:bg-purple-50"
                            onClick={() => setSelectedPalestrante(palestrante)}
                          >
                            Agendar Palestra
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Agendar Palestra</DialogTitle>
                            <DialogDescription>
                              Preencha os detalhes para agendar uma palestra com {selectedPalestrante?.nome}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="lecture-title">Título da Palestra</Label>
                              <Input
                                id="lecture-title"
                                defaultValue={`Palestra: ${selectedPalestrante?.area}`}
                                onChange={(e) => setEventTitle(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="lecture-date">Data</Label>
                                <Input id="lecture-date" type="date" onChange={(e) => setEventDate(e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lecture-time">Horário</Label>
                                <Input id="lecture-time" type="time" onChange={(e) => setEventTime(e.target.value)} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lecture-description">Descrição</Label>
                              <Textarea
                                id="lecture-description"
                                placeholder="Descreva a palestra..."
                                onChange={(e) => setEventDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={agendarEvento} className="bg-[#582b69] hover:bg-purple-800">
                              Confirmar Agendamento
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="agendados" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eventos Agendados</CardTitle>
                  <CardDescription>Visitas técnicas e palestras confirmadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {eventosAgendados.map((evento) => (
                      <div key={evento.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-[#582b69]">{evento.titulo}</h3>
                            <p className="text-sm text-gray-500">
                              {format(evento.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} • {evento.horario}
                            </p>
                          </div>
                          <div className="bg-purple-100 text-[#582b69] text-xs font-medium px-2.5 py-0.5 rounded">
                            {evento.tipo}
                          </div>
                        </div>
                        <div className="text-sm">
                          <p>Local: {evento.local}</p>
                          {evento.empresa && <p>Empresa: {evento.empresa}</p>}
                          {evento.palestrante && <p>Palestrante: {evento.palestrante}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2025 ETEC Connect. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-[#582b69]">
              Termos de Uso
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-[#582b69]">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-[#582b69]">
              Suporte
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
