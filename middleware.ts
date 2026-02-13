import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getClientIP } from "@/_lib/security/ip"
import { isRateLimited } from "@/_lib/security/rateLimit"

const suspiciousIPs = new Set<string>()

export async function middleware(request: NextRequest) {
    const startTime = Date.now()
    const ip = getClientIP(request)
    const pathname = request.nextUrl.pathname

    if (suspiciousIPs.has(ip)) {
        return new NextResponse("IP Blocked", { status: 403 })
    }

    let rateLimitType: "auth" | "api" | "general" = "general"
    if (pathname.startsWith("/api/auth/")) rateLimitType = "auth"
    else if (pathname.startsWith("/api/")) rateLimitType = "api"

    const isLimited = await isRateLimited(ip, rateLimitType)
    if (isLimited) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                error: "Muitas tentativas. Tente novamente mais tarde.",
            }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": "900",
                },
            }
        )
    }
}