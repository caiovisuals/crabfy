import type { NextRequest } from "next/server"
import Redis from "ioredis"
import crypto from "crypto"

type RateLimitType = "auth" | "api" | "general" | "password_reset" | "verification"

interface SuspiciousIPData {
    blockedUntil: number
    violations: number
    lastViolation: number
}

const suspiciousIPs = new Map<string, SuspiciousIPData>()

function isIPBlocked(ip: string): boolean {
    const suspicious = suspiciousIPs.get(ip)
    if (!suspicious) return false
    
    if (Date.now() < suspicious.blockedUntil) {
        return true
    }
    
    // Limpar bloqueio expirado
    suspiciousIPs.delete(ip)
    return false
}

export async function isRateLimited(
    ip: string,
    type: RateLimitType,
    fingerprint?: string
) {
    // Verificar se IP está bloqueado
    if (isIPBlocked(ip)) {
        return true
    }
}