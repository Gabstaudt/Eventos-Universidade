"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Lock,
} from "lucide-react"
import { mockEvents, categoryLabels } from "@/lib/types"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

interface RegistrationPageProps {
  params: Promise<{ id: string }>
}

export default function RegistrationPage({ params }: RegistrationPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const event = mockEvents.find((e) => e.id === id)

  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    instituicao: "",
    curso: "",
    semestre: "",
    categoriaParticipacao: "",
    senha: "",
    confirmarSenha: "",
    aceitaTermos: false,
  })

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <PublicHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Evento não encontrado</h1>
            <p className="text-muted-foreground mb-4">O evento que você procura não existe.</p>
            <Link href="/">
              <Button>Voltar para eventos</Button>
            </Link>
          </div>
        </main>
        <PublicFooter />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setStep("success")
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <PublicHeader />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="container mx-auto px-4 max-w-lg">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Inscrição realizada com sucesso!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Sua conta foi criada e você está inscrito no evento. Acesse sua área para ver seu ingresso.
                </p>
                <div className="p-4 bg-muted/50 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Inscrito em:</p>
                  <p className="font-semibold text-foreground">{event.nome}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/participante">
                    <Button className="w-full">
                      Ver meu ingresso
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Explorar mais eventos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <PublicFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link
            href={`/eventos/${event.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o evento
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Formulário de Inscrição</CardTitle>
                  <CardDescription>
                    Preencha seus dados para se inscrever no evento. Uma conta será criada automaticamente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Data */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Dados Pessoais
                      </h3>
                      <FieldGroup>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="nome">Nome completo *</FieldLabel>
                            <Input
                              id="nome"
                              placeholder="Seu nome completo"
                              value={formData.nome}
                              onChange={(e) => updateFormData("nome", e.target.value)}
                              required
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                            <Input
                              id="cpf"
                              placeholder="000.000.000-00"
                              value={formData.cpf}
                              onChange={(e) => updateFormData("cpf", e.target.value)}
                            />
                          </Field>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="email">E-mail *</FieldLabel>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={(e) => updateFormData("email", e.target.value)}
                                required
                              />
                            </div>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="telefone"
                                type="tel"
                                placeholder="(91) 99999-9999"
                                className="pl-10"
                                value={formData.telefone}
                                onChange={(e) => updateFormData("telefone", e.target.value)}
                              />
                            </div>
                          </Field>
                        </div>
                      </FieldGroup>
                    </div>

                    {/* Academic Data */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        Dados Acadêmicos
                      </h3>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="instituicao">Instituição</FieldLabel>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="instituicao"
                              placeholder="Nome da instituição"
                              className="pl-10"
                              value={formData.instituicao}
                              onChange={(e) => updateFormData("instituicao", e.target.value)}
                            />
                          </div>
                        </Field>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="curso">Curso</FieldLabel>
                            <Input
                              id="curso"
                              placeholder="Nome do curso"
                              value={formData.curso}
                              onChange={(e) => updateFormData("curso", e.target.value)}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="semestre">Semestre</FieldLabel>
                            <Select
                              value={formData.semestre}
                              onValueChange={(value) => updateFormData("semestre", value)}
                            >
                              <SelectTrigger id="semestre">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                                  <SelectItem key={s} value={`${s}º`}>
                                    {s}º Semestre
                                  </SelectItem>
                                ))}
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>
                        </div>
                        <Field>
                          <FieldLabel htmlFor="categoria">Categoria de participação *</FieldLabel>
                          <Select
                            value={formData.categoriaParticipacao}
                            onValueChange={(value) => updateFormData("categoriaParticipacao", value)}
                            required
                          >
                            <SelectTrigger id="categoria">
                              <SelectValue placeholder="Selecione sua categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="estudante">Estudante de graduação</SelectItem>
                              <SelectItem value="pos">Estudante de pós-graduação</SelectItem>
                              <SelectItem value="professor">Professor/Pesquisador</SelectItem>
                              <SelectItem value="profissional">Profissional</SelectItem>
                              <SelectItem value="comunidade">Comunidade externa</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </FieldGroup>
                    </div>

                    {/* Account Data */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Dados da Conta
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Defina uma senha para acessar sua área de participante e gerenciar suas inscrições.
                      </p>
                      <FieldGroup>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="senha">Senha *</FieldLabel>
                            <Input
                              id="senha"
                              type="password"
                              placeholder="Mínimo 8 caracteres"
                              value={formData.senha}
                              onChange={(e) => updateFormData("senha", e.target.value)}
                              required
                              minLength={8}
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="confirmarSenha">Confirmar senha *</FieldLabel>
                            <Input
                              id="confirmarSenha"
                              type="password"
                              placeholder="Repita a senha"
                              value={formData.confirmarSenha}
                              onChange={(e) => updateFormData("confirmarSenha", e.target.value)}
                              required
                            />
                          </Field>
                        </div>
                      </FieldGroup>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <Checkbox
                        id="termos"
                        checked={formData.aceitaTermos}
                        onCheckedChange={(checked) => updateFormData("aceitaTermos", checked as boolean)}
                        required
                      />
                      <label htmlFor="termos" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        Li e aceito os{" "}
                        <Link href="/termos" className="text-primary hover:underline">
                          termos de uso
                        </Link>{" "}
                        e a{" "}
                        <Link href="/privacidade" className="text-primary hover:underline">
                          política de privacidade
                        </Link>
                        . Autorizo o uso dos meus dados para fins de inscrição e comunicação sobre o evento.
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading || !formData.aceitaTermos}>
                      {loading ? (
                        <>
                          <Spinner className="mr-2" />
                          Processando inscrição...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Confirmar inscrição
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Event Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Resumo da inscrição</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {categoryLabels[event.categoria]}
                      </Badge>
                      <h3 className="font-semibold text-foreground">{event.nome}</h3>
                      {event.subtitulo && (
                        <p className="text-sm text-muted-foreground mt-1">{event.subtitulo}</p>
                      )}
                    </div>

                    <hr className="border-border" />

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {format(event.dataInicio, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.horarioInicio} - {event.horarioFim}</span>
                      </div>
                      {event.local && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.local}</span>
                        </div>
                      )}
                    </div>

                    <hr className="border-border" />

                    <div className="p-3 bg-primary/5 rounded-lg">
                      <div className="text-sm font-medium text-foreground mb-1">Gratuito</div>
                      <div className="text-xs text-muted-foreground">
                        Inscrição sem custos para todos os participantes
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p className="mb-2">Ao se inscrever você receberá:</p>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          Ingresso digital com QR Code
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          Acesso à área do participante
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          Certificado de participação
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
