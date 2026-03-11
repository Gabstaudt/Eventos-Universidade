import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { EventCard } from "@/components/event-card"
import { EventFilters } from "@/components/event-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/types"
import { 
  Calendar, 
  Users, 
  Award, 
  ArrowRight,
  Sparkles,
  Building,
  Monitor,
  Wifi
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredEvents = mockEvents.slice(0, 3)
  const allEvents = mockEvents

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Sparkles className="mr-1 h-3 w-3" />
                Novos eventos disponíveis
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight text-balance">
                Conecte-se ao conhecimento através dos eventos acadêmicos
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl">
                Descubra congressos, seminários, workshops e muito mais. Inscreva-se facilmente e receba seu ingresso digital com QR Code.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#eventos">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Explorar eventos
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/organizador">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2">
                    Criar evento
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">150+</div>
                <div className="text-sm text-muted-foreground">Eventos realizados</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">5.000+</div>
                <div className="text-sm text-muted-foreground">Participantes</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">3.500+</div>
                <div className="text-sm text-muted-foreground">Certificados emitidos</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-accent/10">
                  <Building className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Campi ativos</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Eventos em destaque
                </h2>
                <p className="text-muted-foreground">
                  Os eventos mais procurados no momento
                </p>
              </div>
              <Link href="#eventos">
                <Button variant="ghost" className="gap-2">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Explore por categoria
              </h2>
              <p className="text-muted-foreground">
                Encontre eventos do seu interesse
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Congressos", icon: "🎓", count: 12 },
                { name: "Seminários", icon: "📚", count: 8 },
                { name: "Workshops", icon: "🛠️", count: 15 },
                { name: "Palestras", icon: "🎤", count: 23 },
                { name: "Minicursos", icon: "📝", count: 18 },
                { name: "Extensão", icon: "🤝", count: 7 },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/categorias/${category.name.toLowerCase()}`}
                  className="group p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count} eventos</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Events Section */}
        <section id="eventos" className="py-16 bg-background scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Todos os eventos
              </h2>
              <p className="text-muted-foreground">
                Encontre e participe dos eventos da UEPA
              </p>
            </div>

            <div className="mb-8">
              <EventFilters />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Carregar mais eventos
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-sidebar via-sidebar to-sidebar/95">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sidebar-foreground mb-4 text-balance">
              Quer organizar um evento acadêmico?
            </h2>
            <p className="text-lg text-sidebar-foreground/70 mb-8 max-w-2xl mx-auto">
              Crie e gerencie seus eventos com facilidade. Controle inscrições, emita certificados e muito mais.
            </p>
            <Link href="/organizador">
              <Button size="lg" className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 gap-2">
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
