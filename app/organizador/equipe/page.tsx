"use client"

import { useState } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  UsersRound,
  UserPlus,
  MoreHorizontal,
  Mail,
  Shield,
  Pencil,
  Trash2,
  Search,
  Crown,
} from "lucide-react"
import { mockEvents, organizerRoleLabels, type OrganizerRole } from "@/lib/types"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

// Mock team members
const teamMembers = [
  {
    id: "1",
    nome: "Maria Silva Santos",
    email: "maria.silva@uepa.br",
    role: "administrador" as OrganizerRole,
    avatar: null,
    eventos: ["VII Congresso de Iniciação Científica", "Seminário de Saúde Pública"],
    convitadoEm: new Date("2025-01-15"),
    isOwner: true,
  },
  {
    id: "2",
    nome: "Ana Carolina Lima",
    email: "ana.lima@uepa.br",
    role: "organizador" as OrganizerRole,
    avatar: null,
    eventos: ["VII Congresso de Iniciação Científica"],
    convitadoEm: new Date("2026-02-10"),
    isOwner: false,
  },
  {
    id: "3",
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@gmail.com",
    role: "apoio" as OrganizerRole,
    avatar: null,
    eventos: ["VII Congresso de Iniciação Científica"],
    convitadoEm: new Date("2026-03-01"),
    isOwner: false,
  },
  {
    id: "4",
    nome: "Juliana Mendes",
    email: "juliana.mendes@uepa.br",
    role: "secretaria" as OrganizerRole,
    avatar: null,
    eventos: ["Workshop de Desenvolvimento Web Moderno"],
    convitadoEm: new Date("2026-02-20"),
    isOwner: false,
  },
]

const roleColors: Record<OrganizerRole, string> = {
  administrador: "bg-accent text-accent-foreground",
  organizador: "bg-primary text-primary-foreground",
  apoio: "bg-secondary text-secondary-foreground",
  secretaria: "bg-muted text-muted-foreground",
}

const roleDescriptions: Record<OrganizerRole, string> = {
  administrador: "Controle total do evento, pode gerenciar equipe e todas as configurações",
  organizador: "Pode editar informações, gerenciar programação e visualizar participantes",
  apoio: "Pode visualizar listas, validar entradas e fazer check-in",
  secretaria: "Pode configurar e emitir certificados, validar presenças",
}

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<OrganizerRole | "">("")
  const [selectedEvent, setSelectedEvent] = useState("")

  const myEvents = mockEvents.filter((e) => e.organizadorPrincipalId === "1")

  const handleInvite = () => {
    // Simulate invite
    console.log("Inviting:", inviteEmail, inviteRole, selectedEvent)
    setInviteOpen(false)
    setInviteEmail("")
    setInviteRole("")
    setSelectedEvent("")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Equipe Organizadora
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os membros da equipe e suas permissões
          </p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Convidar membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convidar novo membro</DialogTitle>
              <DialogDescription>
                Envie um convite para adicionar um novo membro à equipe organizadora
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail do convidado</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>Evento</FieldLabel>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {myEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Papel/Permissão</FieldLabel>
                <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as OrganizerRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o papel" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(organizerRoleLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <div className="font-medium">{label}</div>
                          <div className="text-xs text-muted-foreground">
                            {roleDescriptions[key as OrganizerRole]}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleInvite} disabled={!inviteEmail || !inviteRole || !selectedEvent}>
                <Mail className="mr-2 h-4 w-4" />
                Enviar convite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role descriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Níveis de Permissão
          </CardTitle>
          <CardDescription>
            Entenda os diferentes papéis e suas permissões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(organizerRoleLabels).map(([key, label]) => (
              <div key={key} className="p-4 rounded-lg bg-muted/50 border border-border">
                <Badge className={roleColors[key as OrganizerRole]} variant="secondary">
                  {label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {roleDescriptions[key as OrganizerRole]}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou e-mail..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os eventos</SelectItem>
                {myEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Object.entries(organizerRoleLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <div className="grid gap-4 md:grid-cols-2">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{member.nome}</h3>
                        {member.isOwner && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  {!member.isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar permissões
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar mensagem
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover da equipe
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Badge className={roleColors[member.role]} variant="secondary">
                    {organizerRoleLabels[member.role]}
                  </Badge>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Eventos:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.eventos.map((evento, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-normal">
                        {evento}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
              <UsersRound className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum membro na equipe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Convide outros organizadores para ajudar na gestão dos seus eventos.
            </p>
            <Button onClick={() => setInviteOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Convidar primeiro membro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
