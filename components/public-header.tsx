"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, X, GraduationCap, User, LogIn } from "lucide-react"

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-foreground">UEPA</span>
            <span className="text-lg font-medium text-muted-foreground"> Eventos</span>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Eventos
          </Link>
          <Link
            href="/categorias"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Categorias
          </Link>
          <Link
            href="/noticias"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Notícias
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sobre
          </Link>
        </nav>

        {/* Search and Auth - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Buscar eventos..."
                className="w-64"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
          <Link href="/login">
            <Button variant="ghost" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button size="sm">
              <User className="mr-2 h-4 w-4" />
              Cadastrar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden border-t border-border bg-card p-4">
          <Input
            type="search"
            placeholder="Buscar eventos..."
            className="w-full"
            autoFocus
          />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link
              href="/categorias"
              className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categorias
            </Link>
            <Link
              href="/noticias"
              className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Notícias
            </Link>
            <Link
              href="/sobre"
              className="px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <hr className="my-2 border-border" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Cadastrar
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
