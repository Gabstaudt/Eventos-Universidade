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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building2, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const instituicoes = [
  "Universidade do Estado do Pará (UEPA)",
  "Universidade Federal do Pará (UFPA)",
  "Instituto Federal do Pará (IFPA)",
  "Universidade da Amazônia (UNAMA)",
  "Centro Universitário do Estado do Pará (CESUPA)",
  "Escola Superior Madre Celeste (ESMAC)",
  "Faculdade Ideal (FACI)",
  "Outra instituição"
]

const cursos = [
  "Administração",
  "Biomedicina",
  "Ciência da Computação",
  "Ciências Biológicas",
  "Ciências Contábeis",
  "Direito",
  "Educação Física",
  "Enfermagem",
  "Engenharia Ambiental",
  "Engenharia Civil",
  "Engenharia de Computação",
  "Engenharia de Produção",
  "Engenharia de Software",
  "Fisioterapia",
  "Geografia",
  "História",
  "Letras",
  "Matemática",
  "Medicina",
  "Nutrição",
  "Odontologia",
  "Pedagogia",
  "Psicologia",
  "Serviço Social",
  "Outro"
]

export default function CadastroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("participante")
  const [step, setStep] = useState(1)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    instituicao: "",
    curso: "",
    matricula: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome completo é obrigatório"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório"
    }
    
    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.instituicao) {
      newErrors.instituicao = "Instituição é obrigatória"
    }
    
    if (activeTab === "participante" && !formData.curso) {
      newErrors.curso = "Curso é obrigatório"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos de uso"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep3()) return
    
    setIsLoading(true)
    
    // Simula cadastro
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setRegistrationComplete(true)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col">
        <header className="p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o início</span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-0 shadow-xl text-center">
            <CardContent className="pt-10 pb-10">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Cadastro realizado!</h2>
              <p className="text-muted-foreground mb-6">
                Sua conta foi criada com sucesso. Você receberá um e-mail de confirmação em breve.
              </p>
              
              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/login">Fazer login</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Explorar eventos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
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
        <div className="w-full max-w-lg">
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

          {/* Card de Cadastro */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Criar nova conta</CardTitle>
              <CardDescription>
                Preencha seus dados para se cadastrar
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              {/* Progress steps */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      s === step 
                        ? "bg-primary text-primary-foreground" 
                        : s < step 
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    )}>
                      {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={cn(
                        "w-12 h-1 rounded",
                        s < step ? "bg-green-500" : "bg-muted"
                      )} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center text-sm text-muted-foreground mb-6">
                {step === 1 && "Dados pessoais"}
                {step === 2 && "Dados acadêmicos"}
                {step === 3 && "Senha e confirmação"}
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="participante" disabled={step > 1}>Participante</TabsTrigger>
                  <TabsTrigger value="organizador" disabled={step > 1}>Organizador</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Dados pessoais */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="nome"
                            placeholder="Seu nome completo"
                            className={cn("pl-10", errors.nome && "border-destructive")}
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          />
                        </div>
                        {errors.nome && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.nome}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={activeTab === "organizador" ? "seu@uepa.br" : "seu@email.com"}
                            className={cn("pl-10", errors.email && "border-destructive")}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="telefone"
                              placeholder="(91) 99999-9999"
                              className={cn("pl-10", errors.telefone && "border-destructive")}
                              value={formData.telefone}
                              onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                              maxLength={15}
                            />
                          </div>
                          {errors.telefone && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.telefone}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input
                            id="cpf"
                            placeholder="000.000.000-00"
                            className={cn(errors.cpf && "border-destructive")}
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                            maxLength={14}
                          />
                          {errors.cpf && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.cpf}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <Button type="button" className="w-full" size="lg" onClick={handleNextStep}>
                        Continuar
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Dados acadêmicos */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="instituicao">Instituição</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                          <Select
                            value={formData.instituicao}
                            onValueChange={(value) => setFormData({ ...formData, instituicao: value })}
                          >
                            <SelectTrigger className={cn("pl-10", errors.instituicao && "border-destructive")}>
                              <SelectValue placeholder="Selecione sua instituição" />
                            </SelectTrigger>
                            <SelectContent>
                              {instituicoes.map((inst) => (
                                <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.instituicao && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.instituicao}
                          </p>
                        )}
                      </div>
                      
                      {activeTab === "participante" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="curso">Curso</Label>
                            <Select
                              value={formData.curso}
                              onValueChange={(value) => setFormData({ ...formData, curso: value })}
                            >
                              <SelectTrigger className={cn(errors.curso && "border-destructive")}>
                                <SelectValue placeholder="Selecione seu curso" />
                              </SelectTrigger>
                              <SelectContent>
                                {cursos.map((curso) => (
                                  <SelectItem key={curso} value={curso}>{curso}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.curso && (
                              <p className="text-sm text-destructive flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {errors.curso}
                              </p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="matricula">Matrícula (opcional)</Label>
                            <Input
                              id="matricula"
                              placeholder="Número da matrícula"
                              value={formData.matricula}
                              onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                            />
                          </div>
                        </>
                      )}
                      
                      {activeTab === "organizador" && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Nota:</strong> Organizadores precisam de um e-mail institucional (@uepa.br) 
                            e passarão por uma verificação antes de terem acesso à criação de eventos.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" size="lg" onClick={handlePrevStep}>
                          Voltar
                        </Button>
                        <Button type="button" className="flex-1" size="lg" onClick={handleNextStep}>
                          Continuar
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Senha */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 6 caracteres"
                            className={cn("pl-10 pr-10", errors.password && "border-destructive")}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.password}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Digite a senha novamente"
                            className={cn("pl-10 pr-10", errors.confirmPassword && "border-destructive")}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                          className="mt-1"
                        />
                        <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer leading-relaxed">
                          Li e aceito os{" "}
                          <Link href="/termos" className="text-primary hover:underline">
                            Termos de Uso
                          </Link>
                          {" "}e a{" "}
                          <Link href="/privacidade" className="text-primary hover:underline">
                            Política de Privacidade
                          </Link>
                        </Label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.acceptTerms}
                        </p>
                      )}
                      
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" size="lg" onClick={handlePrevStep}>
                          Voltar
                        </Button>
                        <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                          {isLoading ? "Criando conta..." : "Criar conta"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pt-2">
              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Fazer login
                </Link>
              </p>
            </CardFooter>
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
