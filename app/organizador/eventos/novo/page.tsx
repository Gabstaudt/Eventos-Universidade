"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Save,
  Eye,
  Calendar,
  MapPin,
  Image,
  Users,
  FileText,
  Settings,
  CheckCircle2,
} from "lucide-react"
import { categoryLabels, modalityLabels, type EventCategory, type EventModality } from "@/lib/types"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export default function CreateEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("info")

  const [formData, setFormData] = useState({
    nome: "",
    subtitulo: "",
    descricao: "",
    categoria: "" as EventCategory | "",
    modalidade: "" as EventModality | "",
    dataInicio: "",
    dataFim: "",
    horarioInicio: "",
    horarioFim: "",
    local: "",
    linkExterno: "",
    limiteVagas: "",
    regrasInscricao: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    router.push("/organizador/eventos")
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isBasicInfoComplete = formData.nome && formData.descricao && formData.categoria
  const isDateTimeComplete = formData.dataInicio && formData.horarioInicio
  const isLocationComplete = formData.modalidade && (formData.modalidade === "online" ? formData.linkExterno : formData.local)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link
            href="/organizador/eventos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para eventos
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Criar Novo Evento
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={loading}>
            <Eye className="mr-2 h-4 w-4" />
            Pré-visualizar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Spinner className="mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar evento
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={isBasicInfoComplete ? "default" : "outline"} className={isBasicInfoComplete ? "bg-primary" : ""}>
          <CheckCircle2 className={`mr-1 h-3 w-3 ${isBasicInfoComplete ? "" : "opacity-50"}`} />
          Informações básicas
        </Badge>
        <Badge variant={isDateTimeComplete ? "default" : "outline"} className={isDateTimeComplete ? "bg-primary" : ""}>
          <CheckCircle2 className={`mr-1 h-3 w-3 ${isDateTimeComplete ? "" : "opacity-50"}`} />
          Data e horário
        </Badge>
        <Badge variant={isLocationComplete ? "default" : "outline"} className={isLocationComplete ? "bg-primary" : ""}>
          <CheckCircle2 className={`mr-1 h-3 w-3 ${isLocationComplete ? "" : "opacity-50"}`} />
          Local/Modalidade
        </Badge>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="info" className="gap-2">
              <FileText className="h-4 w-4" />
              Informações
            </TabsTrigger>
            <TabsTrigger value="datetime" className="gap-2">
              <Calendar className="h-4 w-4" />
              Data e Horário
            </TabsTrigger>
            <TabsTrigger value="location" className="gap-2">
              <MapPin className="h-4 w-4" />
              Local
            </TabsTrigger>
            <TabsTrigger value="registration" className="gap-2">
              <Users className="h-4 w-4" />
              Inscrições
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Evento</CardTitle>
                <CardDescription>
                  Preencha as informações básicas do seu evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="nome">Nome do evento *</FieldLabel>
                    <Input
                      id="nome"
                      placeholder="Ex: VII Congresso de Iniciação Científica"
                      value={formData.nome}
                      onChange={(e) => updateFormData("nome", e.target.value)}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="subtitulo">Subtítulo (opcional)</FieldLabel>
                    <Input
                      id="subtitulo"
                      placeholder="Ex: Ciência, Tecnologia e Inovação para o Desenvolvimento Regional"
                      value={formData.subtitulo}
                      onChange={(e) => updateFormData("subtitulo", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="descricao">Descrição *</FieldLabel>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva o evento, seus objetivos, público-alvo e o que os participantes podem esperar..."
                      rows={6}
                      value={formData.descricao}
                      onChange={(e) => updateFormData("descricao", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Mínimo de 100 caracteres recomendado
                    </p>
                  </Field>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="categoria">Categoria *</FieldLabel>
                      <Select
                        value={formData.categoria}
                        onValueChange={(value) => updateFormData("categoria", value)}
                      >
                        <SelectTrigger id="categoria">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="modalidade">Modalidade *</FieldLabel>
                      <Select
                        value={formData.modalidade}
                        onValueChange={(value) => updateFormData("modalidade", value)}
                      >
                        <SelectTrigger id="modalidade">
                          <SelectValue placeholder="Selecione a modalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(modalityLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel>Imagem de capa</FieldLabel>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Arraste uma imagem ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG ou WEBP. Máximo 5MB. Recomendado: 1200x630px
                      </p>
                    </div>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datetime">
            <Card>
              <CardHeader>
                <CardTitle>Data e Horário</CardTitle>
                <CardDescription>
                  Defina quando o evento irá acontecer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="dataInicio">Data de início *</FieldLabel>
                      <Input
                        id="dataInicio"
                        type="date"
                        value={formData.dataInicio}
                        onChange={(e) => updateFormData("dataInicio", e.target.value)}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="dataFim">Data de término *</FieldLabel>
                      <Input
                        id="dataFim"
                        type="date"
                        value={formData.dataFim}
                        onChange={(e) => updateFormData("dataFim", e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Para eventos de um dia, use a mesma data
                      </p>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="horarioInicio">Horário de início *</FieldLabel>
                      <Input
                        id="horarioInicio"
                        type="time"
                        value={formData.horarioInicio}
                        onChange={(e) => updateFormData("horarioInicio", e.target.value)}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="horarioFim">Horário de término *</FieldLabel>
                      <Input
                        id="horarioFim"
                        type="time"
                        value={formData.horarioFim}
                        onChange={(e) => updateFormData("horarioFim", e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Local do Evento</CardTitle>
                <CardDescription>
                  Onde o evento será realizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  {(formData.modalidade === "presencial" || formData.modalidade === "hibrido") && (
                    <Field>
                      <FieldLabel htmlFor="local">Endereço / Local *</FieldLabel>
                      <Input
                        id="local"
                        placeholder="Ex: Centro de Ciências Sociais e Educação - CCSE/UEPA"
                        value={formData.local}
                        onChange={(e) => updateFormData("local", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Informe o endereço completo ou nome do local
                      </p>
                    </Field>
                  )}

                  {(formData.modalidade === "online" || formData.modalidade === "hibrido") && (
                    <Field>
                      <FieldLabel htmlFor="linkExterno">Link da transmissão</FieldLabel>
                      <Input
                        id="linkExterno"
                        type="url"
                        placeholder="https://meet.google.com/..."
                        value={formData.linkExterno}
                        onChange={(e) => updateFormData("linkExterno", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Link do Google Meet, Zoom, YouTube ou outra plataforma
                      </p>
                    </Field>
                  )}

                  {!formData.modalidade && (
                    <div className="p-8 text-center bg-muted/50 rounded-lg border border-dashed border-border">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Selecione a modalidade do evento na aba "Informações" para configurar o local
                      </p>
                    </div>
                  )}
                </FieldGroup>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Inscrição</CardTitle>
                <CardDescription>
                  Defina as regras e limites de inscrição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="limiteVagas">Limite de vagas *</FieldLabel>
                    <Input
                      id="limiteVagas"
                      type="number"
                      min="1"
                      placeholder="Ex: 100"
                      value={formData.limiteVagas}
                      onChange={(e) => updateFormData("limiteVagas", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Número máximo de participantes
                    </p>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="regrasInscricao">Regras de inscrição (opcional)</FieldLabel>
                    <Textarea
                      id="regrasInscricao"
                      placeholder="Ex: Inscrições abertas para estudantes de graduação e pós-graduação. Necessário apresentar documento institucional no dia do evento."
                      rows={4}
                      value={formData.regrasInscricao}
                      onChange={(e) => updateFormData("regrasInscricao", e.target.value)}
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
          <Link href="/organizador/eventos">
            <Button variant="ghost">Cancelar</Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              Salvar como rascunho
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Publicando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publicar evento
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
