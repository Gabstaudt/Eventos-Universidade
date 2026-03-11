import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Download,
  Eye,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react"

// Mock certificates
const certificates = [
  {
    id: "1",
    eventoNome: "VI Congresso de Iniciação Científica da UEPA",
    cargaHoraria: 20,
    emitidoEm: new Date("2025-11-20"),
    codigoValidacao: "CERT-2025-001234",
    tipo: "Participante",
  },
  {
    id: "2",
    eventoNome: "Workshop de Python para Análise de Dados",
    cargaHoraria: 8,
    emitidoEm: new Date("2025-10-15"),
    codigoValidacao: "CERT-2025-001235",
    tipo: "Participante",
  },
]

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Meus Certificados
        </h1>
        <p className="text-muted-foreground mt-1">
          Certificados de participação em eventos acadêmicos
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{certificates.length}</div>
                <div className="text-sm text-muted-foreground">Certificados emitidos</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {certificates.reduce((acc, c) => acc + c.cargaHoraria, 0)}h
                </div>
                <div className="text-sm text-muted-foreground">Carga horária total</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{certificates.length}</div>
                <div className="text-sm text-muted-foreground">Eventos concluídos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Certificate Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{cert.tipo}</Badge>
                        <Badge variant="outline">{cert.cargaHoraria}h</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {cert.eventoNome}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Emitido em {format(cert.emitidoEm, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        <span className="font-medium">Código de validação:</span>{" "}
                        <code className="bg-muted px-2 py-0.5 rounded">{cert.codigoValidacao}</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:w-48 p-6 bg-muted/30 border-t md:border-t-0 md:border-l border-border flex flex-col items-center justify-center gap-3">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Nenhum certificado disponível</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Seus certificados aparecerão aqui após a conclusão dos eventos e liberação pelos organizadores.
            </p>
            <Link href="/">
              <Button>Explorar eventos</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Validation Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Validação de certificados</h3>
          <p className="text-sm text-muted-foreground">
            Todos os certificados emitidos pelo sistema UEPA Eventos possuem código de validação único.
            Para verificar a autenticidade de um certificado, acesse{" "}
            <Link href="/validar" className="text-primary hover:underline">
              nossa página de validação
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
