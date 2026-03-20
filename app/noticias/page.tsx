import Link from "next/link"
import { ArrowRight, Newspaper, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NewsCard } from "@/components/news-card"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { mockNews } from "@/lib/types"

export default function NewsPage() {
  const featuredNews = mockNews.filter((article) => article.destaque)
  const latestNews = [...mockNews].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  )

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-sidebar via-sidebar to-sidebar/95 py-18">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <Badge className="mb-4 border-0 bg-sidebar-primary text-sidebar-primary-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              Atualizações da UEPA
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold text-sidebar-foreground md:text-5xl">
              Notícias, comunicados e destaques dos eventos acadêmicos
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-sidebar-foreground/75 md:text-lg">
              Acompanhe lançamentos, mudanças de programação e publicações institucionais
              relacionadas aos eventos da universidade.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Destaques
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Publicações estratégicas para divulgação e acompanhamento dos eventos.
                </p>
              </div>
              <Link href="/organizador/noticias/nova">
                <Button variant="outline" className="gap-2">
                  Publicar notícia
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {featuredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Newspaper className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Últimas notícias
                </h2>
                <p className="text-muted-foreground">
                  Conteúdo recente publicado pela organização dos eventos.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
