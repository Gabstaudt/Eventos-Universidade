// Tipos do sistema de eventos

export type EventStatus = 'rascunho' | 'publicado' | 'encerrado' | 'cancelado'
export type EventModality = 'presencial' | 'online' | 'hibrido'
export type EventCategory = 'congresso' | 'seminario' | 'workshop' | 'palestra' | 'minicurso' | 'extensao' | 'outro'

export type UserRole = 'participante' | 'organizador'
export type OrganizerRole = 'administrador' | 'organizador' | 'apoio' | 'secretaria'

export type RegistrationStatus = 'pendente' | 'confirmada' | 'cancelada' | 'presente'

export interface User {
  id: string
  nome: string
  email: string
  telefone?: string
  cpf?: string
  instituicao?: string
  curso?: string
  semestre?: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export interface Event {
  id: string
  nome: string
  subtitulo?: string
  descricao: string
  imagemCapa?: string
  categoria: EventCategory
  modalidade: EventModality
  dataInicio: Date
  dataFim: Date
  horarioInicio: string
  horarioFim: string
  local?: string
  linkExterno?: string
  limiteVagas: number
  vagasDisponiveis: number
  regrasInscricao?: string
  status: EventStatus
  organizadorPrincipalId: string
  createdAt: Date
  updatedAt: Date
}

export interface EventProgramItem {
  id: string
  eventoId: string
  titulo: string
  descricao?: string
  data: Date
  horarioInicio: string
  horarioFim: string
  local?: string
  palestranteId?: string
}

export interface Speaker {
  id: string
  eventoId: string
  nome: string
  bio?: string
  foto?: string
  instituicao?: string
  cargo?: string
}

export interface EventOrganizer {
  id: string
  eventoId: string
  userId: string
  role: OrganizerRole
  user?: User
}

export interface Registration {
  id: string
  eventoId: string
  userId: string
  categoriaParticipacao: string
  status: RegistrationStatus
  qrCode: string
  checkInAt?: Date
  createdAt: Date
  evento?: Event
  user?: User
}

export interface Certificate {
  id: string
  eventoId: string
  userId: string
  registrationId: string
  codigoValidacao: string
  cargaHoraria: number
  emitidoEm: Date
  evento?: Event
  user?: User
}

export interface CertificateTemplate {
  id: string
  eventoId: string
  nome: string
  layout: string
  camposDinamicos: string[]
}

// Dados mockados para demonstração
export const mockEvents: Event[] = [
  {
    id: '1',
    nome: 'VII Congresso de Iniciação Científica da UEPA',
    subtitulo: 'Ciência, Tecnologia e Inovação para o Desenvolvimento Regional',
    descricao: 'O VII Congresso de Iniciação Científica da UEPA é o maior evento científico da universidade, reunindo pesquisadores, estudantes e profissionais de diversas áreas do conhecimento. Durante três dias, serão apresentados trabalhos de pesquisa, palestras com renomados cientistas e mesas redondas sobre temas atuais da ciência e tecnologia.',
    imagemCapa: '/placeholder-event-1.jpg',
    categoria: 'congresso',
    modalidade: 'hibrido',
    dataInicio: new Date('2026-04-15'),
    dataFim: new Date('2026-04-17'),
    horarioInicio: '08:00',
    horarioFim: '18:00',
    local: 'Centro de Ciências Sociais e Educação - CCSE/UEPA',
    limiteVagas: 500,
    vagasDisponiveis: 234,
    status: 'publicado',
    organizadorPrincipalId: '1',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-03-01'),
  },
  {
    id: '2',
    nome: 'Workshop de Desenvolvimento Web Moderno',
    subtitulo: 'Do básico ao avançado com React e Next.js',
    descricao: 'Aprenda as tecnologias mais utilizadas no mercado de desenvolvimento web. Este workshop intensivo cobrirá desde os fundamentos de HTML, CSS e JavaScript até o desenvolvimento de aplicações completas com React e Next.js.',
    imagemCapa: '/placeholder-event-2.jpg',
    categoria: 'workshop',
    modalidade: 'presencial',
    dataInicio: new Date('2026-04-20'),
    dataFim: new Date('2026-04-20'),
    horarioInicio: '14:00',
    horarioFim: '18:00',
    local: 'Laboratório de Informática - CCNT/UEPA',
    limiteVagas: 40,
    vagasDisponiveis: 12,
    status: 'publicado',
    organizadorPrincipalId: '2',
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-03-05'),
  },
  {
    id: '3',
    nome: 'Seminário de Saúde Pública na Amazônia',
    subtitulo: 'Desafios e perspectivas para a região Norte',
    descricao: 'Seminário interdisciplinar que aborda os principais desafios da saúde pública na região amazônica, com foco em políticas públicas, acesso à saúde e doenças tropicais.',
    imagemCapa: '/placeholder-event-3.jpg',
    categoria: 'seminario',
    modalidade: 'online',
    dataInicio: new Date('2026-05-10'),
    dataFim: new Date('2026-05-11'),
    horarioInicio: '09:00',
    horarioFim: '17:00',
    linkExterno: 'https://meet.google.com/abc-defg-hij',
    limiteVagas: 200,
    vagasDisponiveis: 156,
    status: 'publicado',
    organizadorPrincipalId: '1',
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-03-08'),
  },
  {
    id: '4',
    nome: 'Palestra: Inteligência Artificial na Educação',
    subtitulo: 'Como a IA está transformando o ensino superior',
    descricao: 'Palestra com especialistas sobre o impacto da inteligência artificial no ensino superior, abordando ferramentas, metodologias e questões éticas.',
    imagemCapa: '/placeholder-event-4.jpg',
    categoria: 'palestra',
    modalidade: 'presencial',
    dataInicio: new Date('2026-04-25'),
    dataFim: new Date('2026-04-25'),
    horarioInicio: '19:00',
    horarioFim: '21:00',
    local: 'Auditório Central - Reitoria UEPA',
    limiteVagas: 150,
    vagasDisponiveis: 89,
    status: 'publicado',
    organizadorPrincipalId: '3',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-10'),
  },
  {
    id: '5',
    nome: 'Minicurso de Metodologia Científica',
    subtitulo: 'Ferramentas e técnicas para pesquisa acadêmica',
    descricao: 'Minicurso voltado para estudantes de graduação e pós-graduação sobre métodos de pesquisa, elaboração de projetos e redação científica.',
    imagemCapa: '/placeholder-event-5.jpg',
    categoria: 'minicurso',
    modalidade: 'presencial',
    dataInicio: new Date('2026-05-05'),
    dataFim: new Date('2026-05-07'),
    horarioInicio: '14:00',
    horarioFim: '17:00',
    local: 'Sala 201 - CCSE/UEPA',
    limiteVagas: 30,
    vagasDisponiveis: 8,
    status: 'publicado',
    organizadorPrincipalId: '2',
    createdAt: new Date('2026-03-05'),
    updatedAt: new Date('2026-03-10'),
  },
  {
    id: '6',
    nome: 'Extensão: Alfabetização Digital para Idosos',
    subtitulo: 'Inclusão digital na terceira idade',
    descricao: 'Projeto de extensão que visa promover a inclusão digital de idosos da comunidade, ensinando uso básico de smartphones e computadores.',
    imagemCapa: '/placeholder-event-6.jpg',
    categoria: 'extensao',
    modalidade: 'presencial',
    dataInicio: new Date('2026-05-15'),
    dataFim: new Date('2026-06-15'),
    horarioInicio: '09:00',
    horarioFim: '11:00',
    local: 'Centro Comunitário - Belém',
    limiteVagas: 20,
    vagasDisponiveis: 5,
    status: 'publicado',
    organizadorPrincipalId: '1',
    createdAt: new Date('2026-03-08'),
    updatedAt: new Date('2026-03-10'),
  },
]

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    email: 'maria.silva@uepa.br',
    telefone: '(91) 98765-4321',
    cpf: '123.456.789-00',
    instituicao: 'UEPA',
    curso: 'Ciência da Computação',
    semestre: '6º',
    role: 'organizador',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    nome: 'João Pedro Oliveira',
    email: 'joao.pedro@aluno.uepa.br',
    telefone: '(91) 91234-5678',
    instituicao: 'UEPA',
    curso: 'Engenharia de Software',
    semestre: '4º',
    role: 'participante',
    createdAt: new Date('2025-06-20'),
  },
  {
    id: '3',
    nome: 'Ana Carolina Lima',
    email: 'ana.lima@uepa.br',
    telefone: '(91) 99876-5432',
    instituicao: 'UEPA',
    curso: 'Medicina',
    role: 'organizador',
    createdAt: new Date('2024-08-10'),
  },
]

export const mockRegistrations: Registration[] = [
  {
    id: '1',
    eventoId: '1',
    userId: '2',
    categoriaParticipacao: 'Ouvinte',
    status: 'confirmada',
    qrCode: 'EVT001-USR002-REG001',
    createdAt: new Date('2026-03-01'),
  },
  {
    id: '2',
    eventoId: '2',
    userId: '2',
    categoriaParticipacao: 'Participante',
    status: 'confirmada',
    qrCode: 'EVT002-USR002-REG002',
    createdAt: new Date('2026-03-05'),
  },
  {
    id: '3',
    eventoId: '4',
    userId: '2',
    categoriaParticipacao: 'Ouvinte',
    status: 'pendente',
    qrCode: 'EVT004-USR002-REG003',
    createdAt: new Date('2026-03-08'),
  },
]

export const categoryLabels: Record<EventCategory, string> = {
  congresso: 'Congresso',
  seminario: 'Seminário',
  workshop: 'Workshop',
  palestra: 'Palestra',
  minicurso: 'Minicurso',
  extensao: 'Extensão',
  outro: 'Outro',
}

export const modalityLabels: Record<EventModality, string> = {
  presencial: 'Presencial',
  online: 'Online',
  hibrido: 'Híbrido',
}

export const statusLabels: Record<EventStatus, string> = {
  rascunho: 'Rascunho',
  publicado: 'Publicado',
  encerrado: 'Encerrado',
  cancelado: 'Cancelado',
}

export const registrationStatusLabels: Record<RegistrationStatus, string> = {
  pendente: 'Pendente',
  confirmada: 'Confirmada',
  cancelada: 'Cancelada',
  presente: 'Presente',
}

export const organizerRoleLabels: Record<OrganizerRole, string> = {
  administrador: 'Administrador',
  organizador: 'Organizador',
  apoio: 'Apoio / Staff',
  secretaria: 'Certificados / Secretaria',
}
