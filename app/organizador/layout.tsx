"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  CalendarPlus,
  Users,
  UserCheck,
  Award,
  UsersRound,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  QrCode,
  ChevronDown,
  Newspaper,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/organizador", icon: LayoutDashboard },
  { name: "Meus Eventos", href: "/organizador/eventos", icon: Calendar },
  { name: "Criar Evento", href: "/organizador/eventos/novo", icon: CalendarPlus },
  { name: "Notícias", href: "/organizador/noticias", icon: Newspaper },
  { name: "Participantes", href: "/organizador/participantes", icon: Users },
  { name: "Inscrições", href: "/organizador/inscricoes", icon: UserCheck },
  { name: "Certificados", href: "/organizador/certificados", icon: Award },
  { name: "Equipe", href: "/organizador/equipe", icon: UsersRound },
  { name: "Check-in", href: "/organizador/checkin", icon: QrCode },
  { name: "Configurações", href: "/organizador/configuracoes", icon: Settings },
]

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-sidebar-foreground">UEPA</span>
                <span className="text-lg font-medium text-sidebar-foreground/70"> Eventos</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/organizador" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                      MS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-sidebar-foreground">Maria Silva</div>
                    <div className="text-xs text-sidebar-foreground/60">Organizadora</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Maria Silva Santos</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      maria.silva@uepa.br
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/organizador/perfil">
                    <User className="mr-2 h-4 w-4" />
                    Meu perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/organizador/configuracoes">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/participante">
                    <User className="mr-2 h-4 w-4" />
                    Área do participante
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center h-16 px-4 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">UEPA Eventos</span>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">MS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/organizador/perfil">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)} 
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
            <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
              <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                  <GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" />
                </div>
                <span className="font-bold text-sidebar-foreground">UEPA</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5 text-sidebar-foreground" />
              </Button>
            </div>
            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/organizador" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
