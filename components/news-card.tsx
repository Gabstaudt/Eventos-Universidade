import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowRight, CalendarDays, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { type NewsArticle } from "@/lib/types"

interface NewsCardProps {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="overflow-hidden border-border/80">
      <div className="relative h-48 bg-gradient-to-br from-primary/12 via-primary/5 to-accent/10">
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge className="bg-background/90 text-foreground hover:bg-background/90">
            {article.categoria}
          </Badge>
          {article.destaque ? (
            <Badge className="bg-accent text-accent-foreground hover:bg-accent">
              Destaque
            </Badge>
          ) : null}
        </div>
      </div>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {format(article.publishedAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            {article.categoria}
          </span>
        </div>
        <div className="text-xl font-semibold leading-snug text-foreground">
          {article.titulo}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {article.resumo}
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/noticias" className="w-full">
          <Button variant="ghost" className="w-full justify-between px-0 text-primary hover:bg-transparent">
            Ler notícias
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
