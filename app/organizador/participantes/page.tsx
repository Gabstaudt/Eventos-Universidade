"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Users,
  Search,
  Download,
  MoreHorizontal,
  Mail,
  Eye,
  UserCheck,
  CheckCircle2,
  Clock,
  XCircle,
  QrCode,
  Camera,
  UserMinus,
  Send,
  Building,
  Ticket,
  AlertCircle,
} from "lucide-react"
import { mockEvents, registrationStatusLabels } from "@/lib/types"

// Mock participants data - mais completo
const initialParticipants = [
  {
    id: "1",
    nome: "João Pedro Oliveira",
    email: "joao.pedro@aluno.uepa.br",
    telefone: "(91) 91234-5678",
    instituicao: "UEPA",
    curso: "Engenharia de Software",
    categoria: "Estudante de graduação",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "confirmada" as const,
    statusPresenca: "ausente" as "presente" | "ausente",
    inscritoEm: new Date("2026-03-01"),
    checkInAt: null as Date | null,
  },
  {
    id: "2",
    nome: "Ana Carolina Lima",
    email: "ana.lima@uepa.br",
    telefone: "(91) 99876-5432",
    instituicao: "UEPA",
    curso: "Medicina",
    categoria: "Estudante de pós-graduação",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "confirmada" as const,
    statusPresenca: "presente" as "presente" | "ausente",
    inscritoEm: new Date("2026-02-28"),
    checkInAt: new Date("2026-04-15T08:30:00"),
  },
  {
    id: "3",
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@gmail.com",
    telefone: "(91) 98765-4321",
    instituicao: "UFPA",
    curso: "Ciência da Computação",
    categoria: "Estudante de graduação",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "pendente" as const,
    statusPresenca: "ausente" as "presente" | "ausente",
    inscritoEm: new Date("2026-03-05"),
    checkInAt: null,
  },
  {
    id: "4",
    nome: "Maria Fernanda Costa",
    email: "maria.costa@email.com",
    telefone: "(91) 97654-3210",
    instituicao: "UEPA",
    curso: "Enfermagem",
    categoria: "Profissional",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "confirmada" as const,
    statusPresenca: "ausente" as "presente" | "ausente",
    inscritoEm: new Date("2026-03-02"),
    checkInAt: null,
  },
  {
    id: "5",
    nome: "Pedro Henrique Alves",
    email: "pedro.alves@aluno.uepa.br",
    telefone: "(91) 96543-2109",
    instituicao: "UEPA",
    curso: "Direito",
    categoria: "Estudante de graduação",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "cancelada" as const,
    statusPresenca: "ausente" as "presente" | "ausente",
    inscritoEm: new Date("2026-02-25"),
    checkInAt: null,
  },
  {
    id: "6",
    nome: "Larissa Beatriz Souza",
    email: "larissa.souza@aluno.uepa.br",
    telefone: "(91) 95432-1098",
    instituicao: "UEPA",
    curso: "Pedagogia",
    categoria: "Estudante de graduação",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "confirmada" as const,
    statusPresenca: "presente" as "presente" | "ausente",
    inscritoEm: new Date("2026-03-03"),
    checkInAt: new Date("2026-04-15T09:15:00"),
  },
  {
    id: "7",
    nome: "Fernando Ribeiro Lima",
    email: "fernando.lima@ufpa.br",
    telefone: "(91) 94321-0987",
    instituicao: "UFPA",
    curso: "Física",
    categoria: "Docente",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "confirmada" as const,
    statusPresenca: "ausente" as "presente" | "ausente",
    inscritoEm: new Date("2026-02-20"),
    checkInAt: null,
  },
  {
    id: "8",
    nome: "Camila Rodrigues Silva",
    email: "camila.silva@gmail.com",
    telefone: "(91) 93210-9876",
    instituicao: "Particular",
    curso: "N/A",
    categoria: "Comunidade externa",
    evento: "VII Congresso de Iniciação Científica",
    eventoId: "1",
    statusInscricao: "confirmada" as const,
    statusPresenca: "presente" as "presente" | "ausente",
    inscritoEm: new Date("2026-03-08"),
    checkInAt: new Date("2026-04-15T08:45:00"),
  },
]

const statusInscricaoIcons = {
  pendente: Clock,
  confirmada: CheckCircle2,
  cancelada: XCircle,
}

const statusInscricaoColors = {
  pendente: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  confirmada: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelada: "bg-red-500/10 text-red-600 border-red-500/20",
}

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState(initialParticipants)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusInscricaoFilter, setStatusInscricaoFilter] = useState("all")
  const [statusPresencaFilter, setStatusPresencaFilter] = useState("all")
  const [scanMode, setScanMode] = useState(false)
  const [checkinSearch, setCheckinSearch] = useState("")
  const [selectedParticipant, setSelectedParticipant] = useState<typeof participants[0] | null>(null)
  const [showCheckinDialog, setShowCheckinDialog] = useState(false)
  const [showQRDialog, setShowQRDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [checkinFeedback, setCheckinFeedback] = useState<{
    show: boolean
    success: boolean
    name: string
    message: string
  } | null>(null)

  const myEvents = mockEvents.filter((e) => e.organizadorPrincipalId === "1")
  const selectedEvent = myEvents[0] // Para este exemplo, usando o primeiro evento

  // Estatísticas
  const totalInscritos = participants.length
  const participantesPresentes = participants.filter(p => p.statusPresenca === "presente").length
  const participantesPendentes = participants.filter(p => p.statusInscricao === "pendente").length
  const capacidadeEvento = 300 // Mock

  // Filtros
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch = 
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatusInscricao = 
      statusInscricaoFilter === "all" || p.statusInscricao === statusInscricaoFilter
    
    const matchesPresenca = 
      statusPresencaFilter === "all" || p.statusPresenca === statusPresencaFilter
    
    return matchesSearch && matchesStatusInscricao && matchesPresenca
  })

  // Busca para check-in
  const checkinResults = checkinSearch 
    ? participants.filter(
        p => 
          (p.nome.toLowerCase().includes(checkinSearch.toLowerCase()) ||
          p.email.toLowerCase().includes(checkinSearch.toLowerCase())) &&
          p.statusInscricao === "confirmada" &&
          p.statusPresenca === "ausente"
      )
    : []

  const handleConfirmCheckin = (participant: typeof participants[0]) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === participant.id 
          ? { ...p, statusPresenca: "presente" as const, checkInAt: new Date() }
          : p
      )
    )
    
    setCheckinFeedback({
      show: true,
      success: true,
      name: participant.nome,
      message: "Check-in realizado com sucesso!"
    })
    
    setShowCheckinDialog(false)
    setSelectedParticipant(null)
    setCheckinSearch("")
    
    setTimeout(() => setCheckinFeedback(null), 5000)
  }

  const handleManualPresence = (participant: typeof participants[0]) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === participant.id 
          ? { ...p, statusPresenca: "presente" as const, checkInAt: new Date() }
          : p
      )
    )
    
    setCheckinFeedback({
      show: true,
      success: true,
      name: participant.nome,
      message: "Presença marcada manualmente!"
    })
    
    setTimeout(() => setCheckinFeedback(null), 5000)
  }

  const openCheckinDialog = (participant: typeof participants[0]) => {
    setSelectedParticipant(participant)
    setShowCheckinDialog(true)
  }

  const openQRDialog = (participant: typeof participants[0]) => {
    setSelectedParticipant(participant)
    setShowQRDialog(true)
  }

  const openDetailsDialog = (participant: typeof participants[0]) => {
    setSelectedParticipant(participant)
    setShowDetailsDialog(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Participantes e Check-in
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os participantes inscritos e realize check-in no evento
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar lista
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{totalInscritos}</div>
                <div className="text-sm text-muted-foreground">Total de inscritos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{participantesPresentes}</div>
                <div className="text-sm text-muted-foreground">Participantes presentes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{totalInscritos - participantesPresentes}</div>
                <div className="text-sm text-muted-foreground">Participantes pendentes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{capacidadeEvento}</div>
                <div className="text-sm text-muted-foreground">Capacidade do evento</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Ocupação</span>
                <span>{Math.round((totalInscritos / capacidadeEvento) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(totalInscritos / capacidadeEvento) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Área de Check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Área de Check-in
          </CardTitle>
          <CardDescription>
            Escaneie o QR Code do ingresso ou busque o participante manualmente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Scanner QR Code */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Escanear QR Code</h3>
              {scanMode ? (
                <div className="space-y-4">
                  <div className="aspect-video max-w-sm bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center p-4">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Câmera ativa - Posicione o QR Code
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setScanMode(false)}
                  >
                    Parar scanner
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 bg-muted/50 rounded-lg border border-dashed border-border">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Clique para ativar o scanner
                  </p>
                  <Button onClick={() => setScanMode(true)}>
                    <Camera className="mr-2 h-4 w-4" />
                    Escanear QR Code
                  </Button>
                </div>
              )}
            </div>

            {/* Busca Manual */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Busca Manual</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  className="pl-10"
                  value={checkinSearch}
                  onChange={(e) => setCheckinSearch(e.target.value)}
                />
              </div>

              {/* Resultados da busca */}
              {checkinSearch && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {checkinResults.length > 0 ? (
                    checkinResults.map((participant) => (
                      <div 
                        key={participant.id}
                        className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => openCheckinDialog(participant)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {participant.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-medium text-foreground truncate">{participant.nome}</div>
                              <div className="text-sm text-muted-foreground truncate">{participant.email}</div>
                            </div>
                          </div>
                          <Button size="sm" className="flex-shrink-0">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Check-in
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhum participante encontrado para check-in</p>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback do check-in */}
              {checkinFeedback && (
                <div className={`p-4 rounded-lg ${checkinFeedback.success ? "bg-green-500/10 border border-green-500/20" : "bg-destructive/10 border border-destructive/20"}`}>
                  <div className="flex items-center gap-3">
                    {checkinFeedback.success ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-8 w-8 text-destructive flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium text-foreground">{checkinFeedback.name}</div>
                      <div className="text-sm text-muted-foreground">{checkinFeedback.message}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros e Busca da Tabela */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou e-mail..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusInscricaoFilter} onValueChange={setStatusInscricaoFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status da inscrição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {Object.entries(registrationStatusLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusPresencaFilter} onValueChange={setStatusPresencaFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Presença" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="presente">Presente</SelectItem>
                <SelectItem value="ausente">Ausente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Participantes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Participantes</CardTitle>
          <CardDescription>
            {filteredParticipants.length} participantes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participante</TableHead>
                  <TableHead>Instituição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data de inscrição</TableHead>
                  <TableHead>Status da inscrição</TableHead>
                  <TableHead>Presença</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => {
                  const StatusIcon = statusInscricaoIcons[participant.statusInscricao]
                  return (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {participant.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{participant.nome}</div>
                            <div className="text-sm text-muted-foreground">{participant.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {participant.instituicao}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{participant.categoria}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(participant.inscritoEm, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={statusInscricaoColors[participant.statusInscricao]}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {registrationStatusLabels[participant.statusInscricao]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            participant.statusPresenca === "presente" 
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {participant.statusPresenca === "presente" ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Presente
                            </>
                          ) : (
                            <>
                              <UserMinus className="mr-1 h-3 w-3" />
                              Ausente
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDetailsDialog(participant)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar participante
                            </DropdownMenuItem>
                            {participant.statusInscricao === "confirmada" && participant.statusPresenca === "ausente" && (
                              <DropdownMenuItem onClick={() => handleManualPresence(participant)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Marcar presença manualmente
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Reenviar ingresso
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openQRDialog(participant)}>
                              <QrCode className="mr-2 h-4 w-4" />
                              Visualizar QR Code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Enviar e-mail
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação de Check-in */}
      <Dialog open={showCheckinDialog} onOpenChange={setShowCheckinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Check-in</DialogTitle>
            <DialogDescription>
              Verifique os dados do participante antes de confirmar
            </DialogDescription>
          </DialogHeader>
          {selectedParticipant && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {selectedParticipant.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{selectedParticipant.nome}</h3>
                  <p className="text-sm text-muted-foreground">{selectedParticipant.email}</p>
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Instituição</span>
                  <span className="font-medium text-foreground">{selectedParticipant.instituicao}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Categoria</span>
                  <span className="font-medium text-foreground">{selectedParticipant.categoria}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Status da inscrição</span>
                  <Badge 
                    variant="outline" 
                    className={statusInscricaoColors[selectedParticipant.statusInscricao]}
                  >
                    {registrationStatusLabels[selectedParticipant.statusInscricao]}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowCheckinDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => selectedParticipant && handleConfirmCheckin(selectedParticipant)}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirmar Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de QR Code */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>QR Code do Ingresso</DialogTitle>
            <DialogDescription>
              {selectedParticipant?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-48 h-48 bg-white p-4 rounded-lg border border-border">
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZD0iTTEgMWg3djdIMXptMiAydjNoM1Yzem0xMi0yaDd2N2gtN3ptMiAydjNoM1Yzek0xIDEzaDd2N0gxem0yIDJ2M2gzdi0zem0xNS0yaDF2MWgtMXptLTIgMGgxdjFoLTF6bTEgMmgxdjFoLTF6bTAgMmgxdjFoLTF6bS0yLTJoMXYxaC0xem0wIDJoMXYxaC0xem0tMi0yaDF2MWgtMXptMCAyaDF2MWgtMXptLTItMmgxdjFoLTF6bTAgMmgxdjFoLTF6bTItNGgxdjFoLTF6bS0yIDBoMXYxaC0xem0tMiAwaDJ2MWgtMnptMCAyaDF2MWgtMXptMCAyaDF2MWgtMXptLTItNGgxdjFoLTF6bTAgMmgxdjFoLTF6bS0yIDBoMXYxaC0xem0wLTRoMXYyaC0xem00IDJoMXYxaC0xem0yLTJoMXYxaC0xeiIvPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat" />
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Código: {selectedParticipant?.id.toUpperCase().padStart(8, '0')}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Detalhes do Participante */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Participante</DialogTitle>
          </DialogHeader>
          {selectedParticipant && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedParticipant.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-xl text-foreground">{selectedParticipant.nome}</h3>
                  <p className="text-muted-foreground">{selectedParticipant.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedParticipant.telefone}</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Instituição</p>
                    <p className="font-medium text-foreground">{selectedParticipant.instituicao}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Curso</p>
                    <p className="font-medium text-foreground">{selectedParticipant.curso}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Categoria</p>
                    <p className="font-medium text-foreground">{selectedParticipant.categoria}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Data de inscrição</p>
                    <p className="font-medium text-foreground">
                      {format(selectedParticipant.inscritoEm, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Status da inscrição</p>
                    <Badge 
                      variant="outline" 
                      className={statusInscricaoColors[selectedParticipant.statusInscricao]}
                    >
                      {registrationStatusLabels[selectedParticipant.statusInscricao]}
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Presença</p>
                    <Badge 
                      variant="outline" 
                      className={
                        selectedParticipant.statusPresenca === "presente" 
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {selectedParticipant.statusPresenca === "presente" ? "Presente" : "Ausente"}
                    </Badge>
                  </div>
                </div>
                {selectedParticipant.checkInAt && (
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-xs text-green-600 mb-1">Check-in realizado em</p>
                    <p className="font-medium text-green-700">
                      {format(selectedParticipant.checkInAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
