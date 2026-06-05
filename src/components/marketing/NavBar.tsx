'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'Planos', href: '#planos' },
    { name: 'Para Empresas', href: '#para-empresas' },
    { name: 'Para Usuários', href: '/leafpass' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'var(--transition-base)',
        backgroundColor: scrolled ? 'var(--forest-deep)' : 'transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
        padding: '1rem var(--container-pad)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
          <span style={{ color: 'var(--forest-bright)' }}>🍃</span>
          <span style={{ color: 'var(--cream-paper)' }}>Florestas.Social</span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="nav-desktop">
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} style={{ color: 'var(--forest-mist)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cream-paper)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--forest-mist)')}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ background: 'transparent', border: '1px solid var(--gold-warm)', color: 'var(--gold-warm)', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-btn)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, transition: 'var(--transition-base)' }}>
              Falar com Especialista
            </button>
            <button style={{ background: 'var(--forest-mid)', border: 'none', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-btn)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, transition: 'var(--transition-base)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--forest-bright)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--forest-mid)')}
            >
              Assinar Agora
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--cream-paper)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ width: '24px', height: '2px', background: 'currentColor', transition: 'var(--transition-base)', transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ width: '24px', height: '2px', background: 'currentColor', opacity: mobileMenuOpen ? 0 : 1 }} />
          <span style={{ width: '24px', height: '2px', background: 'currentColor', transition: 'var(--transition-base)', transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--forest-deep)',
              padding: '1rem var(--container-pad) 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            }}
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--cream-paper)', textDecoration: 'none', fontSize: '1.125rem', fontWeight: 500 }}>
                {link.name}
              </Link>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ background: 'transparent', border: '1px solid var(--gold-warm)', color: 'var(--gold-warm)', padding: '0.75rem', borderRadius: 'var(--radius-btn)', fontWeight: 600 }}>
                Falar com Especialista
              </button>
              <button style={{ background: 'var(--forest-mid)', border: 'none', color: '#fff', padding: '0.75rem', borderRadius: 'var(--radius-btn)', fontWeight: 600 }}>
                Assinar Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}} />
    </nav>
  )
}
