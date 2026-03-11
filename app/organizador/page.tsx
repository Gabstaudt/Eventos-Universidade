import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  UserCheck,
  Award,
  ArrowRight,
  CalendarPlus,
  TrendingUp,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockEvents, statusLabels } from "@/lib/types"

export default function OrganizerDashboard() {
  // Filter events for this organizer
  const myEvents = mockEvents.filter((e) => e.organizadorPrincipalId === "1")
  const publishedEvents = myEvents.filter((e) => e.status === "publicado")
  const totalParticipants = myEvents.reduce((acc, e) => acc + (e.limiteVagas - e.vagasDisponiveis), 0)

  const stats = [
    {
      label: "Eventos criados",
      value: myEvents.length,
      change: "+2 este mês",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Eventos publicados",
      value: publishedEvents.length,
      change: "3 ativos",
      icon: Eye,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Total de inscritos",
      value: totalParticipants,
      change: "+45 esta semana",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Certificados emitidos",
      value: 156,
      change: "98% entregues",
      icon: Award,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Visão geral dos seus eventos e atividades
          </p>
        </div>
        <Link href="/organizador/eventos/novo">
          <Button className="gap-2">
            <CalendarPlus className="h-4 w-4" />
            Criar evento
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Events */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Meus Eventos</CardTitle>
              <CardDescription>Eventos que você está organizando</CardDescription>
            </div>
            <Link href="/organizador/eventos">
              <Button variant="ghost" size="sm" className="gap-2">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myEvents.slice(0, 4).map((event) => {
                const occupancyRate = ((event.limiteVagas - event.vagasDisponiveis) / event.limiteVagas) * 100
                return (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={event.status === "publicado" ? "default" : "secondary"}
                          className={event.status === "publicado" ? "bg-primary" : ""}
                        >
                          {statusLabels[event.status]}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {event.nome}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(event.dataInicio, "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.limiteVagas - event.vagasDisponiveis}/{event.limiteVagas} inscritos
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="text-xs text-muted-foreground mb-1">
                          {Math.round(occupancyRate)}% preenchido
                        </div>
                        <Progress value={occupancyRate} className="h-2" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/eventos/${event.id}`}>Visualizar</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/organizador/eventos/${event.id}`}>Editar</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/organizador/eventos/${event.id}/participantes`}>
                              Participantes
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/organizador/eventos/${event.id}/certificados`}>
                              Certificados
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações nos seus eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Nova inscrição",
                  description: "João Pedro se inscreveu no Congresso de IC",
                  time: "Há 5 minutos",
                  icon: UserCheck,
                },
                {
                  action: "Certificado emitido",
                  description: "15 certificados foram emitidos",
                  time: "Há 2 horas",
                  icon: Award,
                },
                {
                  action: "Evento publicado",
                  description: "Workshop de Dev Web está publicado",
                  time: "Há 1 dia",
                  icon: Eye,
                },
                {
                  action: "Organizador convidado",
                  description: "Ana Lima foi adicionada à equipe",
                  time: "Há 2 dias",
                  icon: Users,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funções principais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Link href="/organizador/eventos/novo">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <CalendarPlus className="h-4 w-4 text-primary" />
                  Criar novo evento
                </Button>
              </Link>
              <Link href="/organizador/participantes">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Users className="h-4 w-4 text-primary" />
                  Gerenciar participantes
                </Button>
              </Link>
              <Link href="/organizador/certificados">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Award className="h-4 w-4 text-primary" />
                  Emitir certificados
                </Button>
              </Link>
              <Link href="/organizador/checkin">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <UserCheck className="h-4 w-4 text-primary" />
                  Realizar check-in
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
