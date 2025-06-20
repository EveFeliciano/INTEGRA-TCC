"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, LogOut, Search, Trash, User, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados simulados
const estudantes = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@etec.sp.gov.br",
    etec: "ETEC São Paulo",
    curso: "Desenvolvimento de Sistemas",
  },
  {
    id: 2,
    nome: "Bruno Santos",
    email: "bruno.santos@etec.sp.gov.br",
    etec: "ETEC São Paulo",
    curso: "Redes de Computadores",
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    email: "carla.oliveira@etec.sp.gov.br",
    etec: "ETEC Guarulhos",
    curso: "Administração",
  },
  {
    id: 4,
    nome: "Daniel Pereira",
    email: "daniel.pereira@etec.sp.gov.br",
    etec: "ETEC Osasco",
    curso: "Desenvolvimento de Sistemas",
  },
  { id: 5, nome: "Eduarda Lima", email: "eduarda.lima@etec.sp.gov.br", etec: "ETEC São Paulo", curso: "Marketing" },
]

const coordenadores = [
  {
    id: 1,
    nome: "Fernando Costa",
    email: "fernando.costa@etec.sp.gov.br",
    etec: "ETEC São Paulo",
    departamento: "Tecnologia da Informação",
  },
  {
    id: 2,
    nome: "Gabriela Martins",
    email: "gabriela.martins@etec.sp.gov.br",
    etec: "ETEC Guarulhos",
    departamento: "Gestão e Negócios",
  },
  {
    id: 3,
    nome: "Henrique Alves",
    email: "henrique.alves@etec.sp.gov.br",
    etec: "ETEC Osasco",
    departamento: "Tecnologia da Informação",
  },
]

const empresas = [
  { id: 1, nome: "TechSolutions", email: "contato@techsolutions.com", setor: "Tecnologia", cidade: "São Paulo" },
  {
    id: 2,
    nome: "Inovação Digital",
    email: "contato@inovacaodigital.com",
    setor: "Marketing Digital",
    cidade: "São Paulo",
  },
  { id: 3, nome: "Construtech", email: "contato@construtech.com", setor: "Construção Civil", cidade: "São Paulo" },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    tipo: "",
    etec: "",
    curso: "",
    departamento: "",
    empresa: "",
    setor: "",
  })

  // Filtrar usuários com base no termo de busca
  const filteredEstudantes = estudantes.filter(
    (estudante) =>
      estudante.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudante.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCoordenadores = coordenadores.filter(
    (coordenador) =>
      coordenador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordenador.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEmpresas = empresas.filter(
    (empresa) =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para adicionar novo usuário
  const adicionarUsuario = () => {
    // Aqui seria implementada a lógica para salvar o usuário
    console.log("Novo usuário:", novoUsuario)

    // Resetar formulário
    setNovoUsuario({
      nome: "",
      email: "",
      tipo: "",
      etec: "",
      curso: "",
      departamento: "",
      empresa: "",
      setor: "",
    })
  }

  // Função para remover usuário
  const removerUsuario = (id: number, tipo: string) => {
    // Aqui seria implementada a lógica para remover o usuário
    console.log(`Remover ${tipo} com ID:`, id)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/administrador" className="flex items-center gap-2">
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
              <span className="text-sm font-medium">Administrador</span>
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
              <h1 className="text-2xl font-bold text-[#582b69]">Painel do Administrador</h1>
              <p className="text-gray-500">Gerencie usuários, ETECs e configurações do sistema.</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#582b69] hover:bg-purple-800">
                  <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                  <DialogDescription>Preencha os detalhes para adicionar um novo usuário ao sistema.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={novoUsuario.nome}
                      onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={novoUsuario.email}
                      onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Usuário</Label>
                    <Select onValueChange={(value) => setNovoUsuario({ ...novoUsuario, tipo: value })}>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estudante">Estudante</SelectItem>
                        <SelectItem value="coordenador">Coordenador</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                        <SelectItem value="administrador">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(novoUsuario.tipo === "estudante" || novoUsuario.tipo === "coordenador") && (
                    <div className="space-y-2">
                      <Label htmlFor="etec">ETEC</Label>
                      <Select onValueChange={(value) => setNovoUsuario({ ...novoUsuario, etec: value })}>
                        <SelectTrigger id="etec">
                          <SelectValue placeholder="Selecione a ETEC" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ETEC São Paulo">ETEC São Paulo</SelectItem>
                          <SelectItem value="ETEC Guarulhos">ETEC Guarulhos</SelectItem>
                          <SelectItem value="ETEC Osasco">ETEC Osasco</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {novoUsuario.tipo === "estudante" && (
                    <div className="space-y-2">
                      <Label htmlFor="curso">Curso</Label>
                      <Select onValueChange={(value) => setNovoUsuario({ ...novoUsuario, curso: value })}>
                        <SelectTrigger id="curso">
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Desenvolvimento de Sistemas">Desenvolvimento de Sistemas</SelectItem>
                          <SelectItem value="Redes de Computadores">Redes de Computadores</SelectItem>
                          <SelectItem value="Administração">Administração</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {novoUsuario.tipo === "coordenador" && (
                    <div className="space-y-2">
                      <Label htmlFor="departamento">Departamento</Label>
                      <Select onValueChange={(value) => setNovoUsuario({ ...novoUsuario, departamento: value })}>
                        <SelectTrigger id="departamento">
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tecnologia da Informação">Tecnologia da Informação</SelectItem>
                          <SelectItem value="Gestão e Negócios">Gestão e Negócios</SelectItem>
                          <SelectItem value="Comunicação">Comunicação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {novoUsuario.tipo === "empresa" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="empresa">Nome da Empresa</Label>
                        <Input
                          id="empresa"
                          value={novoUsuario.empresa}
                          onChange={(e) => setNovoUsuario({ ...novoUsuario, empresa: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="setor">Setor</Label>
                        <Input
                          id="setor"
                          value={novoUsuario.setor}
                          onChange={(e) => setNovoUsuario({ ...novoUsuario, setor: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={adicionarUsuario} className="bg-[#582b69] hover:bg-purple-800">
                    Adicionar Usuário
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar usuários..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="estudantes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="estudantes">
                <Users className="mr-2 h-4 w-4" /> Estudantes
              </TabsTrigger>
              <TabsTrigger value="coordenadores">
                <User className="mr-2 h-4 w-4" /> Coordenadores
              </TabsTrigger>
              <TabsTrigger value="empresas">
                <Building className="mr-2 h-4 w-4" /> Empresas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="estudantes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estudantes</CardTitle>
                  <CardDescription>Gerenciar estudantes cadastrados no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>ETEC</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEstudantes.map((estudante) => (
                        <TableRow key={estudante.id}>
                          <TableCell className="font-medium">{estudante.nome}</TableCell>
                          <TableCell>{estudante.email}</TableCell>
                          <TableCell>{estudante.etec}</TableCell>
                          <TableCell>{estudante.curso}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removerUsuario(estudante.id, "estudante")}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coordenadores" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Coordenadores</CardTitle>
                  <CardDescription>Gerenciar coordenadores cadastrados no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>ETEC</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCoordenadores.map((coordenador) => (
                        <TableRow key={coordenador.id}>
                          <TableCell className="font-medium">{coordenador.nome}</TableCell>
                          <TableCell>{coordenador.email}</TableCell>
                          <TableCell>{coordenador.etec}</TableCell>
                          <TableCell>{coordenador.departamento}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removerUsuario(coordenador.id, "coordenador")}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="empresas" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Empresas</CardTitle>
                  <CardDescription>Gerenciar empresas cadastradas no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Setor</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmpresas.map((empresa) => (
                        <TableRow key={empresa.id}>
                          <TableCell className="font-medium">{empresa.nome}</TableCell>
                          <TableCell>{empresa.email}</TableCell>
                          <TableCell>{empresa.setor}</TableCell>
                          <TableCell>{empresa.cidade}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removerUsuario(empresa.id, "empresa")}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
