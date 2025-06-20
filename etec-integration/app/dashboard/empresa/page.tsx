"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Edit, LogOut, Plus, Trash, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados simulados
const disponibilidades = [
  {
    id: 1,
    titulo: "Visita Técnica - Departamento de Desenvolvimento",
    tipo: "Visita Técnica",
    descricao:
      "Visita ao departamento de desenvolvimento de software para conhecer o ambiente de trabalho e as tecnologias utilizadas.",
    disponibilidade: "Segundas e Quartas, 14h às 17h",
    vagas: 20,
  },
  {
    id: 2,
    titulo: "Palestra sobre Mercado de Trabalho em TI",
    tipo: "Palestra",
    descricao: "Palestra sobre as oportunidades e desafios do mercado de trabalho em Tecnologia da Informação.",
    disponibilidade: "Terças e Quintas, 19h às 21h",
    vagas: 50,
  },
]

const eventosAgendados = [
  {
    id: 1,
    titulo: "Visita Técnica - Departamento de Desenvolvimento",
    tipo: "Visita Técnica",
    data: new Date(2025, 4, 20),
    horario: "14:00 - 16:00",
    etec: "ETEC São Paulo",
    participantes: 15,
  },
]

export default function EmpresaDashboard() {
  const [novaDisponibilidade, setNovaDisponibilidade] = useState({
    titulo: "",
    tipo: "",
    descricao: "",
    disponibilidade: "",
    vagas: "",
  })

  // Função para adicionar nova disponibilidade
  const adicionarDisponibilidade = () => {
    // Aqui seria implementada a lógica para salvar a disponibilidade
    console.log("Nova disponibilidade:", novaDisponibilidade)

    // Resetar formulário
    setNovaDisponibilidade({
      titulo: "",
      tipo: "",
      descricao: "",
      disponibilidade: "",
      vagas: "",
    })
  }

  // Função para excluir disponibilidade
  const excluirDisponibilidade = (id: number) => {
    // Aqui seria implementada a lógica para excluir a disponibilidade
    console.log("Excluir disponibilidade:", id)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/empresa" className="flex items-center gap-2">
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
              <span className="text-sm font-medium">TechSolutions</span>
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#582b69]">Painel da Empresa</h1>
              <p className="text-gray-500">Gerencie suas disponibilidades para visitas técnicas e palestras.</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#582b69] hover:bg-purple-800">
                  <Plus className="mr-2 h-4 w-4" /> Nova Disponibilidade
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Disponibilidade</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes para oferecer uma visita técnica ou palestra para as ETECs.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      value={novaDisponibilidade.titulo}
                      onChange={(e) => setNovaDisponibilidade({ ...novaDisponibilidade, titulo: e.target.value })}
                      placeholder="Ex: Visita ao Departamento de TI"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select onValueChange={(value) => setNovaDisponibilidade({ ...novaDisponibilidade, tipo: value })}>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Visita Técnica">Visita Técnica</SelectItem>
                        <SelectItem value="Palestra">Palestra</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={novaDisponibilidade.descricao}
                      onChange={(e) => setNovaDisponibilidade({ ...novaDisponibilidade, descricao: e.target.value })}
                      placeholder="Descreva a atividade..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disponibilidade">Disponibilidade</Label>
                    <Input
                      id="disponibilidade"
                      value={novaDisponibilidade.disponibilidade}
                      onChange={(e) =>
                        setNovaDisponibilidade({ ...novaDisponibilidade, disponibilidade: e.target.value })
                      }
                      placeholder="Ex: Segundas e Quartas, 14h às 17h"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vagas">Número de Vagas</Label>
                    <Input
                      id="vagas"
                      type="number"
                      value={novaDisponibilidade.vagas}
                      onChange={(e) => setNovaDisponibilidade({ ...novaDisponibilidade, vagas: e.target.value })}
                      placeholder="Ex: 20"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={adicionarDisponibilidade} className="bg-[#582b69] hover:bg-purple-800">
                    Adicionar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Disponibilidades</CardTitle>
                <CardDescription>Visitas técnicas e palestras disponíveis para agendamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {disponibilidades.map((disponibilidade) => (
                    <div key={disponibilidade.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-[#582b69]">{disponibilidade.titulo}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{disponibilidade.tipo}</span>
                            <span>•</span>
                            <span>{disponibilidade.vagas} vagas</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => excluirDisponibilidade(disponibilidade.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{disponibilidade.descricao}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-[#582b69]" />
                        <span>{disponibilidade.disponibilidade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                        <p>ETEC: {evento.etec}</p>
                        <p>Participantes: {evento.participantes}</p>
                      </div>
                    </div>
                  ))}

                  {eventosAgendados.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Calendar className="h-12 w-12 text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">Nenhum evento agendado</h3>
                      <p className="text-gray-500 mt-1">
                        Quando coordenadores agendarem eventos com sua empresa, eles aparecerão aqui.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
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
