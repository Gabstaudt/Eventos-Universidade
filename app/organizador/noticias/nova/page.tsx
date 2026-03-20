"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, Newspaper, Save, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CreateNewsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    resumo: "",
    conteudo: "",
    eventoRelacionado: "",
    imagemCapa: "",
    autor: "Maria Silva Santos",
    destaque: true,
  })

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setLoading(false)
    router.push("/organizador/noticias")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/organizador/noticias"
            className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para notícias
          </Link>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Criar notícia
          </h1>
          <p className="mt-1 text-muted-foreground">
            Publique comunicados institucionais, novidades de eventos e avisos de programação.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button">
            <Eye className="mr-2 h-4 w-4" />
            Pré-visualizar
          </Button>
          <Button form="news-form" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Publicar notícia
              </>
            )}
          </Button>
        </div>
      </div>

      <form
        id="news-form"
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo principal</CardTitle>
            <CardDescription>
              Estruture o texto da notícia com título, resumo e conteúdo completo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="titulo">Título da notícia</FieldLabel>
                <Input
                  id="titulo"
                  placeholder="Ex: UEPA lança novo calendário de eventos do semestre"
                  value={formData.titulo}
                  onChange={(event) => updateFormData("titulo", event.target.value)}
                  required
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="categoria">Categoria editorial</FieldLabel>
                  <Input
                    id="categoria"
                    placeholder="Institucional, Pesquisa, Eventos..."
                    value={formData.categoria}
                    onChange={(event) => updateFormData("categoria", event.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="eventoRelacionado">Evento relacionado</FieldLabel>
                  <Input
                    id="eventoRelacionado"
                    placeholder="Opcional: nome do evento vinculado"
                    value={formData.eventoRelacionado}
                    onChange={(event) => updateFormData("eventoRelacionado", event.target.value)}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="resumo">Resumo</FieldLabel>
                <Textarea
                  id="resumo"
                  rows={4}
                  placeholder="Escreva um resumo curto para listagens e destaques."
                  value={formData.resumo}
                  onChange={(event) => updateFormData("resumo", event.target.value)}
                  required
                />
                <FieldDescription>
                  Esse texto aparece no módulo público de notícias e em cards de destaque.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="conteudo">Conteúdo completo</FieldLabel>
                <Textarea
                  id="conteudo"
                  rows={12}
                  placeholder="Desenvolva a notícia com contexto, informações de serviço e próximos passos."
                  value={formData.conteudo}
                  onChange={(event) => updateFormData("conteudo", event.target.value)}
                  required
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publicação</CardTitle>
              <CardDescription>
                Controle visibilidade, autoria e materiais de apoio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="imagemCapa">Imagem de capa</FieldLabel>
                  <Input
                    id="imagemCapa"
                    placeholder="/public/noticias/capa-semestre.jpg"
                    value={formData.imagemCapa}
                    onChange={(event) => updateFormData("imagemCapa", event.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="autor">Autor responsável</FieldLabel>
                  <Input
                    id="autor"
                    value={formData.autor}
                    onChange={(event) => updateFormData("autor", event.target.value)}
                  />
                </Field>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
                  <Checkbox
                    id="destaque"
                    checked={formData.destaque}
                    onCheckedChange={(checked) => updateFormData("destaque", checked === true)}
                  />
                  <div className="space-y-1">
                    <label htmlFor="destaque" className="text-sm font-medium text-foreground">
                      Marcar como notícia em destaque
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Notícias em destaque recebem prioridade na home e na página pública.
                    </p>
                  </div>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Boas práticas editoriais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Use um título direto com informação principal logo no início.</p>
              <p>Prefira resumo com até 2 frases para manter boa leitura nos cards.</p>
              <p>Inclua datas, locais e links de apoio sempre que a notícia for operacional.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-primary" />
                Fluxo de publicação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Redija o conteúdo com foco em serviço e clareza.</p>
              <p>2. Destaque somente publicações estratégicas.</p>
              <p>3. Revise antes de publicar no portal.</p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
