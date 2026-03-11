import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Monitor,
  Building,
  Wifi,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle2,
  User,
  GraduationCap,
} from "lucide-react"
import { mockEvents, categoryLabels, modalityLabels } from "@/lib/types"

const modalityIcons = {
  presencial: Building,
  online: Monitor,
  hibrido: Wifi,
}

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  const ModalityIcon = modalityIcons[event.modalidade]
  const vacancyPercentage = ((event.limiteVagas - event.vagasDisponiveis) / event.limiteVagas) * 100
  const isAlmostFull = vacancyPercentage >= 80

  // Mock speakers
  const speakers = [
    {
      id: "1",
      nome: "Dr. Carlos Mendes",
      cargo: "Professor Titular",
      instituicao: "UEPA",
      bio: "Doutor em Ciência da Computação com mais de 20 anos de experiência em pesquisa.",
    },
    {
      id: "2",
      nome: "Dra. Ana Paula Silva",
      cargo: "Pesquisadora",
      instituicao: "UFPA",
      bio: "Especialista em Inteligência Artificial e Machine Learning.",
    },
  ]

  // Mock program
  const program = [
    {
      id: "1",
      data: event.dataInicio,
      horarioInicio: "08:00",
      horarioFim: "09:00",
      titulo: "Credenciamento e Café de Boas-vindas",
      local: "Hall Principal",
    },
    {
      id: "2",
      data: event.dataInicio,
      horarioInicio: "09:00",
      horarioFim: "10:30",
      titulo: "Cerimônia de Abertura",
      local: "Auditório Central",
    },
    {
      id: "3",
      data: event.dataInicio,
      horarioInicio: "10:30",
      horarioFim: "12:00",
      titulo: "Palestra Magna: Inovação e Pesquisa",
      local: "Auditório Central",
    },
    {
      id: "4",
      data: event.dataInicio,
      horarioInicio: "14:00",
      horarioFim: "16:00",
      titulo: "Sessões de Apresentação de Trabalhos",
      local: "Salas 101-105",
    },
    {
      id: "5",
      data: event.dataInicio,
      horarioInicio: "16:30",
      horarioFim: "18:00",
      titulo: "Mesa Redonda: Desafios da Pesquisa Regional",
      local: "Auditório Central",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-12 lg:py-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para eventos
            </Link>

            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="secondary" className="bg-card/90 text-foreground">
                {categoryLabels[event.categoria]}
              </Badge>
              <Badge variant="outline" className="bg-card/90 text-foreground border-0 gap-1">
                <ModalityIcon className="h-3 w-3" />
                {modalityLabels[event.modalidade]}
              </Badge>
              {isAlmostFull && (
                <Badge className="bg-accent text-accent-foreground border-0">
                  Últimas vagas!
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 text-balance max-w-4xl">
              {event.nome}
            </h1>
            {event.subtitulo && (
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 max-w-3xl">
                {event.subtitulo}
              </p>
            )}

            <div className="flex flex-wrap gap-6 text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {format(event.dataInicio, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  {event.dataInicio.getTime() !== event.dataFim.getTime() && (
                    <> a {format(event.dataFim, "dd 'de' MMMM", { locale: ptBR })}</>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.horarioInicio} - {event.horarioFim}</span>
              </div>
              {event.local && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.local}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="sobre" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="sobre">Sobre</TabsTrigger>
                    <TabsTrigger value="programacao">Programação</TabsTrigger>
                    <TabsTrigger value="palestrantes">Palestrantes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sobre" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sobre o evento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {event.descricao}
                        </p>
                      </CardContent>
                    </Card>

                    {event.regrasInscricao && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Regras de inscrição</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {event.regrasInscricao}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <Card>
                      <CardHeader>
                        <CardTitle>O que você vai receber</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {[
                            "Ingresso digital com QR Code",
                            "Acesso ao material do evento",
                            "Certificado de participação",
                            "Networking com outros participantes",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-muted-foreground">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="programacao">
                    <Card>
                      <CardHeader>
                        <CardTitle>Programação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {program.map((item, index) => (
                            <div
                              key={item.id}
                              className={`flex gap-4 p-4 rounded-lg ${
                                index % 2 === 0 ? "bg-muted/50" : ""
                              }`}
                            >
                              <div className="flex-shrink-0 w-24 text-sm">
                                <div className="font-semibold text-foreground">
                                  {item.horarioInicio}
                                </div>
                                <div className="text-muted-foreground">
                                  {item.horarioFim}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-1">
                                  {item.titulo}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {item.local}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="palestrantes">
                    <div className="grid gap-4 md:grid-cols-2">
                      {speakers.map((speaker) => (
                        <Card key={speaker.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                  {speaker.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-foreground">
                                  {speaker.nome}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {speaker.cargo} - {speaker.instituicao}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {speaker.bio}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Registration Card */}
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-sm text-muted-foreground mb-1">Vagas disponíveis</div>
                        <div className="text-3xl font-bold text-foreground">
                          {event.vagasDisponiveis}
                          <span className="text-lg font-normal text-muted-foreground">
                            /{event.limiteVagas}
                          </span>
                        </div>
                        <Progress value={vacancyPercentage} className="mt-3 h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.round(vacancyPercentage)}% preenchido
                        </div>
                      </div>

                      <Link href={`/eventos/${event.id}/inscricao`}>
                        <Button className="w-full" size="lg">
                          <User className="mr-2 h-4 w-4" />
                          Inscrever-se
                        </Button>
                      </Link>

                      <p className="text-xs text-center text-muted-foreground mt-4">
                        Ao se inscrever, você concorda com os termos de participação do evento.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Share Card */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Compartilhar evento
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Organizer Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Organizado por</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">UEPA</div>
                          <div className="text-sm text-muted-foreground">
                            Universidade do Estado do Pará
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
