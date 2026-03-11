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
  QrCode,
  Search,
  CheckCircle2,
  XCircle,
  Users,
  Clock,
  Camera,
} from "lucide-react"
import { mockEvents } from "@/lib/types"

// Mock recent check-ins
const recentCheckins = [
  {
    id: "1",
    nome: "Ana Carolina Lima",
    email: "ana.lima@uepa.br",
    categoria: "Estudante de pós-graduação",
    checkInAt: new Date(),
  },
  {
    id: "2",
    nome: "João Pedro Oliveira",
    email: "joao.pedro@aluno.uepa.br",
    categoria: "Estudante de graduação",
    checkInAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "3",
    nome: "Maria Fernanda Costa",
    email: "maria.costa@email.com",
    categoria: "Profissional",
    checkInAt: new Date(Date.now() - 15 * 60 * 1000),
  },
]

export default function CheckinPage() {
  const [selectedEvent, setSelectedEvent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [scanMode, setScanMode] = useState(false)
  const [lastScanned, setLastScanned] = useState<null | {
    success: boolean
    name: string
    message: string
  }>(null)

  const myEvents = mockEvents.filter((e) => e.organizadorPrincipalId === "1")

  const handleManualCheckin = () => {
    // Simulate check-in
    setLastScanned({
      success: true,
      name: "João Pedro Oliveira",
      message: "Check-in realizado com sucesso!",
    })
    setSearchQuery("")
    
    setTimeout(() => setLastScanned(null), 5000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Check-in de Participantes
        </h1>
        <p className="text-muted-foreground mt-1">
          Valide a entrada dos participantes usando QR Code ou busca manual
        </p>
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
                  <SelectValue placeholder="Escolha um evento para fazer check-in" />
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
            {selectedEvent && (
              <div className="flex items-end gap-4">
                <div className="text-center px-6 py-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-xs text-muted-foreground">Check-ins hoje</div>
                </div>
                <div className="text-center px-6 py-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">266</div>
                  <div className="text-xs text-muted-foreground">Total inscritos</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedEvent && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Scanner Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Leitor de QR Code
              </CardTitle>
              <CardDescription>
                Escaneie o QR Code do ingresso do participante
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scanMode ? (
                <div className="space-y-4">
                  <div className="aspect-square max-w-sm mx-auto bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
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
                <div className="text-center py-8">
                  <div className="w-32 h-32 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Clique para ativar o scanner de QR Code
                  </p>
                  <Button onClick={() => setScanMode(true)}>
                    <Camera className="mr-2 h-4 w-4" />
                    Iniciar scanner
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Busca Manual
              </CardTitle>
              <CardDescription>
                Busque por nome, e-mail ou código de inscrição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Digite o nome, e-mail ou código..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {searchQuery && (
                  <div className="space-y-2">
                    {/* Mock search results */}
                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">JP</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">João Pedro Oliveira</div>
                            <div className="text-sm text-muted-foreground">joao.pedro@aluno.uepa.br</div>
                          </div>
                        </div>
                        <Button size="sm" onClick={handleManualCheckin}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Check-in
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Last scanned feedback */}
                {lastScanned && (
                  <div className={`p-4 rounded-lg ${lastScanned.success ? "bg-green-500/10 border border-green-500/20" : "bg-destructive/10 border border-destructive/20"}`}>
                    <div className="flex items-center gap-3">
                      {lastScanned.success ? (
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      ) : (
                        <XCircle className="h-8 w-8 text-destructive" />
                      )}
                      <div>
                        <div className="font-medium text-foreground">{lastScanned.name}</div>
                        <div className="text-sm text-muted-foreground">{lastScanned.message}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Check-ins */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Check-ins Recentes
              </CardTitle>
              <CardDescription>
                Últimos participantes que fizeram check-in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCheckins.map((checkin) => (
                  <div
                    key={checkin.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {checkin.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{checkin.nome}</div>
                        <div className="text-sm text-muted-foreground">{checkin.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {checkin.categoria}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {format(checkin.checkInAt, "HH:mm", { locale: ptBR })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!selectedEvent && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Selecione um evento</h3>
            <p className="text-sm text-muted-foreground">
              Escolha um evento acima para começar a fazer check-in dos participantes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
