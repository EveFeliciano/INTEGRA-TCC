"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [userType, setUserType] = useState("estudante")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria implementada a lógica de autenticação

    // Redirecionamento baseado no tipo de usuário
    if (userType === "estudante") {
      window.location.href = "/dashboard/estudante"
    } else if (userType === "coordenador") {
      window.location.href = "/dashboard/coordenador"
    } else if (userType === "administrador") {
      window.location.href = "/dashboard/administrador"
    } else if (userType === "empresa") {
      window.location.href = "/dashboard/empresa"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center text-[#582b69] hover:text-purple-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-[#582b69]">Acesso à Plataforma</CardTitle>
              <CardDescription className="text-center">Escolha seu perfil de acesso e faça login</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="estudante" className="w-full" onValueChange={setUserType}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="estudante">Estudante</TabsTrigger>
                  <TabsTrigger value="coordenador">Coordenador</TabsTrigger>
                  <TabsTrigger value="administrador">Admin</TabsTrigger>
                  <TabsTrigger value="empresa">Empresa</TabsTrigger>
                </TabsList>

                <TabsContent value="estudante">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-estudante">Email Institucional</Label>
                      <Input
                        id="email-estudante"
                        type="email"
                        placeholder="seu.nome@etec.sp.gov.br"
                        required
                        pattern=".+@etec\.sp\.gov\.br$"
                        title="Por favor, use seu email institucional (@etec.sp.gov.br)"
                      />
                      <p className="text-xs text-gray-500">Use seu email com domínio etec.sp.gov.br</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-estudante">Senha</Label>
                      <Input id="password-estudante" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#582b69] hover:bg-purple-800">
                      Entrar
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="coordenador">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-coordenador">Email Institucional</Label>
                      <Input
                        id="email-coordenador"
                        type="email"
                        placeholder="coordenador@etec.sp.gov.br"
                        required
                        pattern=".+@etec\.sp\.gov\.br$"
                        title="Por favor, use seu email institucional (@etec.sp.gov.br)"
                      />
                      <p className="text-xs text-gray-500">Use seu email com domínio etec.sp.gov.br</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-coordenador">Senha</Label>
                      <Input id="password-coordenador" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#582b69] hover:bg-purple-800">
                      Entrar
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="administrador">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-admin">Email</Label>
                      <Input id="email-admin" type="email" placeholder="admin@exemplo.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-admin">Senha</Label>
                      <Input id="password-admin" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#582b69] hover:bg-purple-800">
                      Entrar
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="empresa">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-empresa">Email</Label>
                      <Input id="email-empresa" type="email" placeholder="contato@empresa.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-empresa">Senha</Label>
                      <Input id="password-empresa" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#582b69] hover:bg-purple-800">
                      Entrar
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-500">
                Esqueceu sua senha?{" "}
                <Link href="#" className="text-[#582b69] hover:underline">
                  Recuperar
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
