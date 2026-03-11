import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Ticket,
  Award,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { mockEvents, mockRegistrations, registrationStatusLabels } from "@/lib/types"

export default function ParticipantDashboard() {
  // Get user's registered events
  const userRegistrations = mockRegistrations.map((reg) => ({
    ...reg,
    evento: mockEvents.find((e) => e.id === reg.eventoId),
  }))

  const upcomingEvents = userRegistrations.filter(
    (reg) => reg.evento && new Date(reg.evento.dataInicio) >= new Date()
  )

  const stats = [
    {
      label: "Eventos inscritos",
      value: userRegistrations.length,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Ingressos ativos",
      value: userRegistrations.filter((r) => r.status === "confirmada").length,
      icon: Ticket,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Certificados",
      value: 2,
      icon: Award,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Olá, João Pedro!
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo à sua área de participante. Aqui você encontra seus eventos, ingressos e certificados.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Próximos eventos</CardTitle>
            <CardDescription>Eventos em que você está inscrito</CardDescription>
          </div>
          <Link href="/participante/eventos">
            <Button variant="ghost" size="sm" className="gap-2">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((reg) => (
                <div
                  key={reg.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={reg.status === "confirmada" ? "default" : "secondary"}
                        className={reg.status === "confirmada" ? "bg-primary" : ""}
                      >
                        {registrationStatusLabels[reg.status]}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {reg.evento?.nome}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {reg.evento && format(reg.evento.dataInicio, "dd 'de' MMM", { locale: ptBR })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {reg.evento?.horarioInicio}
                      </div>
                      {reg.evento?.local && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {reg.evento.local}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/participante/ingressos/${reg.id}`}>
                      <Button variant="outline" size="sm">
                        <Ticket className="h-4 w-4 mr-2" />
                        Ver ingresso
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Nenhum evento próximo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Você ainda não está inscrito em nenhum evento futuro.
              </p>
              <Link href="/">
                <Button>Explorar eventos</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:border-primary/30 transition-colors">
          <CardContent className="p-6">
            <Link href="/participante/ingressos" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Ticket className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Meus Ingressos</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse seus ingressos com QR Code para check-in
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/30 transition-colors">
          <CardContent className="p-6">
            <Link href="/participante/certificados" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Certificados</h3>
                <p className="text-sm text-muted-foreground">
                  Baixe seus certificados de participação
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
