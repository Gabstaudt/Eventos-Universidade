"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Award,
  Search,
  Download,
  Send,
  FileText,
  CheckCircle2,
  Clock,
  Users,
  Settings,
} from "lucide-react"
import { mockEvents } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"

// Mock certificate data
const eligibleParticipants = [
  {
    id: "1",
    nome: "João Pedro Oliveira",
    email: "joao.pedro@aluno.uepa.br",
    categoria: "Participante",
    presenca: true,
    certificadoEmitido: false,
    cargaHoraria: 20,
  },
  {
    id: "2",
    nome: "Ana Carolina Lima",
    email: "ana.lima@uepa.br",
    categoria: "Apresentador de trabalho",
    presenca: true,
    certificadoEmitido: true,
    emitidoEm: new Date("2026-03-10"),
    cargaHoraria: 20,
  },
  {
    id: "3",
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@gmail.com",
    categoria: "Participante",
    presenca: true,
    certificadoEmitido: false,
    cargaHoraria: 20,
  },
  {
    id: "4",
    nome: "Maria Fernanda Costa",
    email: "maria.costa@email.com",
    categoria: "Participante",
    presenca: false,
    certificadoEmitido: false,
    cargaHoraria: 20,
  },
]

export default function CertificatesOrganizerPage() {
  const [selectedEvent, setSelectedEvent] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [issuing, setIssuing] = useState(false)

  const myEvents = mockEvents.filter((e) => e.organizadorPrincipalId === "1")

  const toggleParticipant = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    const eligibleIds = eligibleParticipants
      .filter((p) => p.presenca && !p.certificadoEmitido)
      .map((p) => p.id)
    
    if (selectedParticipants.length === eligibleIds.length) {
      setSelectedParticipants([])
    } else {
      setSelectedParticipants(eligibleIds)
    }
  }

  const handleIssueCertificates = async () => {
    setIssuing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIssuing(false)
    setSelectedParticipants([])
  }

  const emittedCount = eligibleParticipants.filter((p) => p.certificadoEmitido).length
  const eligibleCount = eligibleParticipants.filter((p) => p.presenca).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Gestão de Certificados
          </h1>
          <p className="text-muted-foreground mt-1">
            Emita e gerencie certificados para os participantes
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Configurar modelo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurar modelo de certificado</DialogTitle>
                <DialogDescription>
                  Personalize o layout e os campos do certificado
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="aspect-[1.4/1] bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Pré-visualização do modelo
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar modelo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Event Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Selecione o evento
              </label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um evento para gerenciar certificados" />
                </SelectTrigger>
                <SelectContent>
                  {myEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedEvent && (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{eligibleCount}</div>
                    <div className="text-sm text-muted-foreground">Participantes elegíveis</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{emittedCount}</div>
                    <div className="text-sm text-muted-foreground">Certificados emitidos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {eligibleCount - emittedCount}
                    </div>
                    <div className="text-sm text-muted-foreground">Pendentes de emissão</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          {selectedParticipants.length > 0 && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {selectedParticipants.length} participante(s) selecionado(s)
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedParticipants([])}>
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleIssueCertificates} disabled={issuing}>
                      {issuing ? (
                        <>
                          <Spinner className="mr-2" />
                          Emitindo...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Emitir certificados
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Participants Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Participantes</CardTitle>
                  <CardDescription>
                    Selecione os participantes para emitir certificados
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar participante..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            selectedParticipants.length ===
                            eligibleParticipants.filter((p) => p.presenca && !p.certificadoEmitido).length
                          }
                          onCheckedChange={toggleAll}
                        />
                      </TableHead>
                      <TableHead>Participante</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Carga horária</TableHead>
                      <TableHead>Presença</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eligibleParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedParticipants.includes(participant.id)}
                            onCheckedChange={() => toggleParticipant(participant.id)}
                            disabled={!participant.presenca || participant.certificadoEmitido}
                          />
                        </TableCell>
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
                          <Badge variant="outline">{participant.categoria}</Badge>
                        </TableCell>
                        <TableCell>{participant.cargaHoraria}h</TableCell>
                        <TableCell>
                          {participant.presenca ? (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Confirmada
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Clock className="mr-1 h-3 w-3" />
                              Ausente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {participant.certificadoEmitido ? (
                            <Badge className="bg-primary">
                              <Award className="mr-1 h-3 w-3" />
                              Emitido
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pendente</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {participant.certificadoEmitido ? (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Baixar
                            </Button>
                          ) : participant.presenca ? (
                            <Button variant="ghost" size="sm">
                              <Send className="h-4 w-4 mr-1" />
                              Emitir
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedEvent && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Selecione um evento</h3>
            <p className="text-sm text-muted-foreground">
              Escolha um evento acima para gerenciar os certificados dos participantes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
