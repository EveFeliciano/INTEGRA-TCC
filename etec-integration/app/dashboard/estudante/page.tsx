"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, ChevronLeft, ChevronRight, LogOut, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"

// Dados simulados de eventos
const events = [
  {
    id: 1,
    title: "Visita Técnica - Empresa de Software",
    date: new Date(2025, 4, 20), // 20 de maio de 2025
    type: "Visita Técnica",
    location: "São Paulo, SP",
    description:
      "Visita à empresa de desenvolvimento de software para conhecer o ambiente de trabalho e as tecnologias utilizadas.",
  },
  {
    id: 2,
    title: "Palestra: Inteligência Artificial",
    date: new Date(2025, 4, 22), // 22 de maio de 2025
    type: "Palestra",
    location: "Online",
    description: "Palestra sobre os avanços da Inteligência Artificial e suas aplicações no mercado de trabalho.",
  },
  {
    id: 3,
    title: "Workshop de Design Thinking",
    date: new Date(2025, 4, 25), // 25 de maio de 2025
    type: "Workshop",
    location: "ETEC Central",
    description: "Workshop prático sobre metodologia de Design Thinking aplicada a projetos de tecnologia.",
  },
]

export default function EstudanteDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [rating, setRating] = useState<number>(0)

  // Função para verificar se um dia tem eventos
  const hasEventOnDay = (day: Date) => {
    return events.some(
      (event) =>
        day.getDate() === event.date.getDate() &&
        day.getMonth() === event.date.getMonth() &&
        day.getFullYear() === event.date.getFullYear(),
    )
  }

  // Função para obter eventos do dia selecionado
  const getEventsForSelectedDay = () => {
    if (!date) return []

    return events.filter(
      (event) =>
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear(),
    )
  }

  // Eventos do dia selecionado
  const selectedDayEvents = getEventsForSelectedDay()

  // Função para abrir o diálogo de avaliação
  const openRatingDialog = (event: any) => {
    setSelectedEvent(event)
    setRating(0) // Reset rating
  }

  // Função para submeter a avaliação
  const submitRating = () => {
    // Aqui seria implementada a lógica para salvar a avaliação
    console.log(`Evento ${selectedEvent?.id} avaliado com ${rating} estrelas`)
    setSelectedEvent(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/estudante" className="flex items-center gap-2">
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
              <span className="text-sm font-medium">Estudante ETEC</span>
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
            <h1 className="text-2xl font-bold text-[#582b69]">Olá, Estudante!</h1>
            <p className="text-gray-500">
              Bem-vindo ao seu painel de controle. Aqui você pode visualizar e avaliar visitas técnicas e palestras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Calendário de Eventos</CardTitle>
                <CardDescription>Visualize as visitas técnicas e palestras programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={ptBR}
                      className="border rounded-md"
                      modifiers={{
                        hasEvent: (date) => hasEventOnDay(date),
                      }}
                      modifiersClassNames={{
                        hasEvent: "bg-purple-100 font-bold text-[#582b69]",
                      }}
                      components={{
                        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                        IconRight: () => <ChevronRight className="h-4 w-4" />,
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-[#582b69]">
                      {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                    </h3>

                    {selectedDayEvents.length > 0 ? (
                      <div className="space-y-3">
                        {selectedDayEvents.map((event) => (
                          <div key={event.id} className="border rounded-md p-3 bg-white">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-500">
                                  {event.type} • {event.location}
                                </p>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#582b69] border-purple-200"
                                    onClick={() => openRatingDialog(event)}
                                  >
                                    Avaliar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Avaliar Evento</DialogTitle>
                                    <DialogDescription>
                                      Como você avalia sua experiência neste evento?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <h3 className="font-medium mb-2">{selectedEvent?.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{selectedEvent?.description}</p>

                                    <div className="flex justify-center space-x-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          type="button"
                                          onClick={() => setRating(star)}
                                          className="focus:outline-none"
                                        >
                                          <Star
                                            className={cn(
                                              "h-8 w-8",
                                              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                                            )}
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      onClick={submitRating}
                                      className="bg-[#582b69] hover:bg-purple-800"
                                      disabled={rating === 0}
                                    >
                                      Enviar Avaliação
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-gray-50">
                        <CalendarIcon className="h-10 w-10 text-gray-300 mb-2" />
                        <p className="text-gray-500">Nenhum evento nesta data</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Eventos programados para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div key={event.id} className="border-b pb-3 last:border-0">
                        <p className="text-sm text-[#582b69] font-medium">
                          {format(event.date, "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {event.type} • {event.location}
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Todos os Eventos
                </Button>
              </CardFooter>
            </Card>
          </div>
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
