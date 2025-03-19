"use client";

import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span className="font-bold">CareerKit</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/cv-builder" className="text-sm font-medium transition-colors hover:text-primary">
              CV Builder
            </Link>
            <Link href="/cover-letter" className="text-sm font-medium transition-colors hover:text-primary">
              Cover Letter
            </Link>
            <Link href="/application-kit" className="text-sm font-medium transition-colors hover:text-primary">
              Application Kit
            </Link>
          </nav>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-2">
            <Link href="/dashboard" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/cv-builder" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              CV Builder
            </Link>
            <Link href="/cover-letter" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Cover Letter
            </Link>
            <Link href="/application-kit" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Application Kit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}