import type { NextRequest } from "next/server"

export function getClientIP(request: NextRequest): string {
    const realIP = request.headers.get("x-real-ip")
    const cfIP = request.headers.get("cf-connecting-ip")
    const forwarded = request.headers.get("x-forwarded-for")

    if (forwarded) return forwarded.split(",")[0].trim()
    if (cfIP) return cfIP
    if (realIP) return realIP

    return "unknown"
}