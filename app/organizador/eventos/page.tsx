import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Users,
  CalendarPlus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Trash2,
  UserCheck,
  Award,
  MapPin,
} from "lucide-react"
import { mockEvents, statusLabels, categoryLabels, modalityLabels } from "@/lib/types"

export default function EventsListPage() {
  const myEvents = mockEvents.filter((e) => e.organizadorPrincipalId === "1")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Meus Eventos
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os seus eventos acadêmicos
          </p>
        </div>
        <Link href="/organizador/eventos/novo">
          <Button className="gap-2">
            <CalendarPlus className="h-4 w-4" />
            Criar evento
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar eventos..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
                <SelectItem value="publicado">Publicado</SelectItem>
                <SelectItem value="encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {myEvents.map((event) => {
          const occupancyRate = ((event.limiteVagas - event.vagasDisponiveis) / event.limiteVagas) * 100
          const isAlmostFull = occupancyRate >= 80
          
          return (
            <Card key={event.id} className="overflow-hidden hover:border-primary/30 transition-colors">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={event.status === "publicado" ? "default" : "secondary"}
                        className={event.status === "publicado" ? "bg-primary" : ""}
                      >
                        {statusLabels[event.status]}
                      </Badge>
                      <Badge variant="outline">{categoryLabels[event.categoria]}</Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/eventos/${event.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar página
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/organizador/eventos/${event.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar evento
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/organizador/eventos/${event.id}/participantes`}>
                            <Users className="mr-2 h-4 w-4" />
                            Participantes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/organizador/eventos/${event.id}/certificados`}>
                            <Award className="mr-2 h-4 w-4" />
                            Certificados
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/organizador/checkin?evento=${event.id}`}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Check-in
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar evento
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir evento
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Link href={`/organizador/eventos/${event.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                      {event.nome}
                    </h3>
                  </Link>
                  {event.subtitulo && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {event.subtitulo}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(event.dataInicio, "dd/MM/yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Badge variant="outline" className="font-normal">
                        {modalityLabels[event.modalidade]}
                      </Badge>
                    </span>
                    {event.local && (
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        {event.local}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          Inscrições
                        </span>
                        <span className="font-medium text-foreground">
                          {event.limiteVagas - event.vagasDisponiveis}/{event.limiteVagas}
                        </span>
                      </div>
                      <Progress value={occupancyRate} className="h-2" />
                      {isAlmostFull && (
                        <p className="text-xs text-accent mt-1">Quase lotado!</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {myEvents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum evento criado</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Você ainda não criou nenhum evento. Comece criando seu primeiro evento acadêmico.
            </p>
            <Link href="/organizador/eventos/novo">
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Criar primeiro evento
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
