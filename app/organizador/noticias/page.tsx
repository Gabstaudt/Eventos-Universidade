import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarDays, Eye, Newspaper, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockNews, mockUsers, newsStatusLabels } from "@/lib/types"

export default function OrganizerNewsPage() {
  const myNews = mockNews.filter((article) => article.autorId === "1")
  const publishedCount = myNews.filter((article) => article.status === "publicada").length
  const featuredCount = myNews.filter((article) => article.destaque).length

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Notícias</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie os comunicados publicados no portal de eventos.
          </p>
        </div>
        <Link href="/organizador/noticias/nova">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Nova notícia
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Newspaper className="h-5 w-5" />
            </div>
            <div className="mt-4 text-2xl font-bold text-foreground">{myNews.length}</div>
            <p className="text-sm text-muted-foreground">Notícias cadastradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Eye className="h-5 w-5" />
            </div>
            <div className="mt-4 text-2xl font-bold text-foreground">{publishedCount}</div>
            <p className="text-sm text-muted-foreground">Notícias publicadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="mt-4 text-2xl font-bold text-foreground">{featuredCount}</div>
            <p className="text-sm text-muted-foreground">Publicações em destaque</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Publicações recentes</CardTitle>
            <CardDescription>
              Notícias criadas pela equipe organizadora.
            </CardDescription>
          </div>
          <Link href="/noticias">
            <Button variant="outline">Ver módulo público</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myNews.map((article) => {
              const author = mockUsers.find((user) => user.id === article.autorId)

              return (
                <div
                  key={article.id}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={article.status === "publicada" ? "default" : "outline"}>
                          {newsStatusLabels[article.status]}
                        </Badge>
                        <Badge variant="secondary">{article.categoria}</Badge>
                        {article.destaque ? (
                          <Badge className="bg-accent text-accent-foreground">Destaque</Badge>
                        ) : null}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{article.titulo}</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                          {article.resumo}
                        </p>
                      </div>
                    </div>
                    <Link href="/organizador/noticias/nova">
                      <Button variant="ghost">Duplicar estrutura</Button>
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>
                      Publicada em{" "}
                      {format(article.publishedAt, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                    <span>Autor: {author?.nome ?? "Equipe UEPA"}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
