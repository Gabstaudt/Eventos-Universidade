"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("participante")
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simula autenticação
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redireciona baseado no tipo de usuário
    if (activeTab === "organizador") {
      router.push("/organizador")
    } else {
      router.push("/participante")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
      {/* Header simples */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o início</span>
        </Link>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="bg-primary rounded-xl p-2.5 group-hover:bg-primary/90 transition-colors">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-foreground block">UEPA Eventos</span>
                <span className="text-sm text-muted-foreground">Universidade do Estado do Pará</span>
              </div>
            </Link>
          </div>

          {/* Card de Login */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
              <CardDescription>
                Acesse sua área de participante ou organizador
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="participante">Participante</TabsTrigger>
                  <TabsTrigger value="organizador">Organizador</TabsTrigger>
                </TabsList>
                
                <TabsContent value="participante">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-participante">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-participante"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-participante">Senha</Label>
                        <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-participante"
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-participante"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      />
                      <Label htmlFor="remember-participante" className="text-sm font-normal cursor-pointer">
                        Manter conectado
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar como Participante"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="organizador">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-organizador">E-mail institucional</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-organizador"
                          type="email"
                          placeholder="seu@uepa.br"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-organizador">Senha</Label>
                        <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-organizador"
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-organizador"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      />
                      <Label htmlFor="remember-organizador" className="text-sm font-normal cursor-pointer">
                        Manter conectado
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar como Organizador"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pt-2">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-primary font-medium hover:underline">
                  Cadastre-se gratuitamente
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Credenciais de teste */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Credenciais de teste:</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Participante:</span> participante@teste.com / 123456</p>
                <p><span className="text-muted-foreground">Organizador:</span> organizador@uepa.br / 123456</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 UEPA Eventos. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
