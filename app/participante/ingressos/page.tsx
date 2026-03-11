import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  Eye,
} from "lucide-react"
import { mockEvents, mockRegistrations, registrationStatusLabels } from "@/lib/types"

export default function TicketsPage() {
  const userRegistrations = mockRegistrations.map((reg) => ({
    ...reg,
    evento: mockEvents.find((e) => e.id === reg.eventoId),
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Meus Ingressos
        </h1>
        <p className="text-muted-foreground mt-1">
          Seus ingressos digitais com QR Code para check-in nos eventos
        </p>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {userRegistrations.map((reg) => (
          <Card key={reg.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Event Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant={reg.status === "confirmada" ? "default" : "secondary"}
                      className={reg.status === "confirmada" ? "bg-primary" : ""}
                    >
                      {registrationStatusLabels[reg.status]}
                    </Badge>
                    <Badge variant="outline">{reg.categoriaParticipacao}</Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {reg.evento?.nome}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {reg.evento && format(reg.evento.dataInicio, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {reg.evento?.horarioInicio} - {reg.evento?.horarioFim}
                    </div>
                    {reg.evento?.local && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {reg.evento.local}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Código:</span> {reg.qrCode}
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="lg:w-64 p-6 bg-muted/30 border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-card rounded-lg border-2 border-dashed border-border flex items-center justify-center mb-4">
                    <QrCode className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mb-4">
                    Apresente este QR Code na entrada do evento
                  </p>
                  <div className="flex gap-2 w-full">
                    <Link href={`/participante/ingressos/${reg.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {userRegistrations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum ingresso encontrado</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Você ainda não possui ingressos. Inscreva-se em um evento para receber seu ingresso digital.
            </p>
            <Link href="/">
              <Button>Explorar eventos</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
