import { createHmac, createHash } from 'crypto'

/**
 * Generates the expected QR secret for a partner for the current month.
 * Pattern: HMAC-SHA256(CRON_SECRET, partnerId + "YYYY-MM")
 */
export function generateMonthlySecret(partnerId: string, date?: Date): string {
  const d = date ?? new Date()
  const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  const secret = process.env.CRON_SECRET ?? 'leafpass-dev-cron'
  return createHmac('sha256', secret).update(partnerId + month).digest('hex')
}

/**
 * Creates a device fingerprint hash from user-agent + IP.
 * Used for anti-fraud soft-checks.
 */
export function makeDeviceHash(userAgent: string, ip: string): string {
  return createHash('sha256').update(userAgent + ip).digest('hex')
}

/**
 * Formats a ClaimCode cuid into a user-friendly LEAF-XXXX-XXXX format.
 */
export function formatClaimCode(raw: string): string {
  // Take last 8 chars of cuid and format as LEAF-XXXX-XXXX
  const slug = raw.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(-8)
  return `LEAF-${slug.slice(0, 4)}-${slug.slice(4, 8)}`
}

/**
 * Haversine distance in metres between two lat/lng coordinates.
 */
export function haversineMetres(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
