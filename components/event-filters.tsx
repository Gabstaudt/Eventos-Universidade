"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { categoryLabels, modalityLabels, type EventCategory, type EventModality } from "@/lib/types"

interface EventFiltersProps {
  onFilterChange?: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  category: EventCategory | "all"
  modality: EventModality | "all"
  period: "all" | "today" | "week" | "month"
}

export function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    modality: "all",
    period: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      category: "all",
      modality: "all",
      period: "all",
    }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  const hasActiveFilters = 
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.modality !== "all" ||
    filters.period !== "all"

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar eventos por nome, descrição..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>
        <Button
          variant={showFilters ? "secondary" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex-1 min-w-[150px]">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Categoria
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) => updateFilter("category", value as EventCategory | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Modalidade
            </label>
            <Select
              value={filters.modality}
              onValueChange={(value) => updateFilter("modality", value as EventModality | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as modalidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as modalidades</SelectItem>
                {Object.entries(modalityLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Período
            </label>
            <Select
              value={filters.period}
              onValueChange={(value) => updateFilter("period", value as FilterState["period"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Qualquer data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Qualquer data</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active filters badges */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {categoryLabels[filters.category as EventCategory]}
              <button onClick={() => updateFilter("category", "all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.modality !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {modalityLabels[filters.modality as EventModality]}
              <button onClick={() => updateFilter("modality", "all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.period !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.period === "today" ? "Hoje" : filters.period === "week" ? "Esta semana" : "Este mês"}
              <button onClick={() => updateFilter("period", "all")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
