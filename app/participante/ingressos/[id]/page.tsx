"use client"

import { use } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  Share2,
  User,
  Building,
  GraduationCap,
} from "lucide-react"
import { mockEvents, mockRegistrations, mockUsers, registrationStatusLabels, categoryLabels } from "@/lib/types"

interface TicketPageProps {
  params: Promise<{ id: string }>
}

export default function TicketPage({ params }: TicketPageProps) {
  const { id } = use(params)
  
  const registration = mockRegistrations.find((r) => r.id === id)
  const event = registration ? mockEvents.find((e) => e.id === registration.eventoId) : null
  const user = mockUsers.find((u) => u.id === "2") // Current user

  if (!registration || !event) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Ingresso não encontrado</h1>
        <p className="text-muted-foreground mb-4">O ingresso que você procura não existe.</p>
        <Link href="/participante/ingressos">
          <Button>Voltar para ingressos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/participante/ingressos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para ingressos
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Ingresso Digital
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Ticket Card */}
      <Card className="max-w-2xl mx-auto overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-6 text-primary-foreground">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-6 w-6" />
              <span className="font-semibold">UEPA Eventos</span>
            </div>
            <Badge variant="secondary" className="bg-card/90 text-foreground mb-3">
              {categoryLabels[event.categoria]}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{event.nome}</h2>
            {event.subtitulo && (
              <p className="text-primary-foreground/80 text-sm">{event.subtitulo}</p>
            )}
          </div>

          {/* Event Details */}
          <div className="p-6 border-b border-dashed border-border">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Data</div>
                    <div className="font-medium text-foreground">
                      {format(event.dataInicio, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Horário</div>
                    <div className="font-medium text-foreground">
                      {event.horarioInicio} - {event.horarioFim}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {event.local && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Local</div>
                      <div className="font-medium text-foreground">{event.local}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Participant Info */}
          <div className="p-6 border-b border-dashed border-border bg-muted/30">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados do Participante
            </h3>
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <div className="text-muted-foreground">Nome</div>
                <div className="font-medium text-foreground">{user?.nome}</div>
              </div>
              <div>
                <div className="text-muted-foreground">E-mail</div>
                <div className="font-medium text-foreground">{user?.email}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Categoria</div>
                <div className="font-medium text-foreground">{registration.categoriaParticipacao}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Status</div>
                <Badge
                  variant={registration.status === "confirmada" ? "default" : "secondary"}
                  className={registration.status === "confirmada" ? "bg-primary" : ""}
                >
                  {registrationStatusLabels[registration.status]}
                </Badge>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-6 flex flex-col items-center">
            <div className="w-48 h-48 bg-card rounded-xl border-2 border-primary/20 flex items-center justify-center mb-4 shadow-lg">
              <QrCode className="h-32 w-32 text-primary" />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-2">
              Apresente este QR Code na entrada do evento
            </p>
            <code className="text-xs bg-muted px-3 py-1 rounded-md text-muted-foreground font-mono">
              {registration.qrCode}
            </code>
          </div>

          {/* Footer */}
          <div className="p-4 bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">
              Este ingresso é pessoal e intransferível. Mantenha-o em local seguro.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
