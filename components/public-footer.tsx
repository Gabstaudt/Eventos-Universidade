import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo e descrição */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">UEPA</span>
                <span className="text-lg font-medium text-muted-foreground"> Eventos</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma oficial de gestão de eventos acadêmicos da Universidade do Estado do Pará.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Eventos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Todos os eventos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/calendario" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Calendário
                </Link>
              </li>
            </ul>
          </div>

          {/* Participantes */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Participantes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Acessar conta
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Criar conta
                </Link>
              </li>
              <li>
                <Link href="/participante" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Meus eventos
                </Link>
              </li>
              <li>
                <Link href="/participante/certificados" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Certificados
                </Link>
              </li>
            </ul>
          </div>

          {/* Organizadores */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Organizadores</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/organizador" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Painel do organizador
                </Link>
              </li>
              <li>
                <Link href="/organizador/eventos/novo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Criar evento
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Central de ajuda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} UEPA Eventos. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termos de uso
            </Link>
            <Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
