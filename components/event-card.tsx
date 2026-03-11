import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Monitor, Building, Wifi } from "lucide-react"
import { type Event, categoryLabels, modalityLabels } from "@/lib/types"

interface EventCardProps {
  event: Event
}

const modalityIcons = {
  presencial: Building,
  online: Monitor,
  hibrido: Wifi,
}

export function EventCard({ event }: EventCardProps) {
  const ModalityIcon = modalityIcons[event.modalidade]
  const vacancyPercentage = ((event.limiteVagas - event.vagasDisponiveis) / event.limiteVagas) * 100
  const isAlmostFull = vacancyPercentage >= 80

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/30">
            {event.nome.charAt(0)}
          </span>
        </div>
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <Badge variant="secondary" className="bg-card/90 text-foreground backdrop-blur-sm">
            {categoryLabels[event.categoria]}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 z-20">
          <Badge 
            variant="outline" 
            className="bg-card/90 text-foreground backdrop-blur-sm border-0 gap-1"
          >
            <ModalityIcon className="h-3 w-3" />
            {modalityLabels[event.modalidade]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {event.nome}
        </h3>
        {event.subtitulo && (
          <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
            {event.subtitulo}
          </p>
        )}
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {format(event.dataInicio, "dd 'de' MMMM", { locale: ptBR })}
              {event.dataInicio.getTime() !== event.dataFim.getTime() && (
                <> a {format(event.dataFim, "dd 'de' MMMM", { locale: ptBR })}</>
              )}
            </span>
          </div>
          {event.local && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="line-clamp-1">{event.local}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {event.vagasDisponiveis} vagas disponíveis
              {isAlmostFull && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  Últimas vagas
                </Badge>
              )}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/eventos/${event.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
            Ver detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
