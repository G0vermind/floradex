import React from 'react'
import Image from 'next/image'

interface CompanyShowcaseProps {
  partnerName: string
  partnerCategory: string
  logoUrl?: string | null
  websiteUrl?: string | null
  instagramUrl?: string | null
  whatsappNumber?: string | null
  howToBuyText?: string | null
}

export default function CompanyShowcase({
  partnerName,
  partnerCategory,
  logoUrl,
  websiteUrl,
  instagramUrl,
  whatsappNumber,
  howToBuyText
}: CompanyShowcaseProps) {
  
  const hasLinks = websiteUrl || instagramUrl || whatsappNumber
  const defaultLogo = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=150&h=150"
  
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem',
      width: '100%',
      maxWidth: '350px',
      margin: '0 auto',
      marginTop: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          border: '2px solid rgba(201,168,76,0.3)',
          background: '#F5F0E8'
        }}>
          <Image 
            src={logoUrl || defaultLogo} 
            alt={partnerName} 
            width={60} 
            height={60}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Patrocinador
          </p>
          <h3 className="font-serif" style={{ color: 'var(--leaf-gold-light)', fontSize: '1.2rem', margin: 0 }}>
            {partnerName}
          </h3>
        </div>
      </div>

      {howToBuyText && (
        <div style={{ 
          background: 'rgba(0,0,0,0.2)', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '1.25rem',
          borderLeft: '3px solid var(--leaf-gold)'
        }}>
          <h4 style={{ color: 'var(--leaf-gold)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Como Apoiar
          </h4>
          <p style={{ color: 'rgba(245,240,232,0.85)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
            {howToBuyText}
          </p>
        </div>
      )}

      {hasLinks && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {websiteUrl && (
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ flex: 1, textAlign: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', color: '#F5F0E8', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              🌐 Site
            </a>
          )}
          {instagramUrl && (
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ flex: 1, textAlign: 'center', padding: '0.5rem', background: 'rgba(225,48,108,0.2)', border: '1px solid rgba(225,48,108,0.4)', borderRadius: '6px', color: '#F5F0E8', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              📸 Insta
            </a>
          )}
          {whatsappNumber && (
            <a 
              href={`https://wa.me/${whatsappNumber.replace(/\D/g,'')}`} 
              target="_blank" 
              rel="noreferrer"
              style={{ flex: 1, textAlign: 'center', padding: '0.5rem', background: 'rgba(37,211,102,0.2)', border: '1px solid rgba(37,211,102,0.4)', borderRadius: '6px', color: '#F5F0E8', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              💬 Whats
            </a>
          )}
        </div>
      )}
    </div>
  )
}
