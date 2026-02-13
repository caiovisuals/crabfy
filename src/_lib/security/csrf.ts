import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { cookies } from "next/headers"

const CSRF_TOKEN_NAME = "csrf_token"
const CSRF_HEADER_NAME = "x-csrf-token"
const TOKEN_LENGTH = 32

export function generateCSRFToken(): string {
    return crypto.randomBytes(TOKEN_LENGTH).toString("hex")
}

export async function getCSRFTokenFromCookie(): Promise<string | undefined> {
    const cookieStore = await cookies()
    return cookieStore.get(CSRF_TOKEN_NAME)?.value
}

export async function getCSRFTokenForClient(): Promise<string> {
    const token = await getCSRFTokenFromCookie()
    if (!token) {
        return generateCSRFToken()
    }
    return token
}