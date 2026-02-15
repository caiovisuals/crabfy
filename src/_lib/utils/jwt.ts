import { SignJWT, jwtVerify } from "jose"
import crypto from "crypto"

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
)

export interface JWTPayload {
    userId: string
    email: string
    sessionId: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(JWT_SECRET)

    return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)

        if (
            typeof payload.userId === "string" &&
            typeof payload.email === "string" &&
            typeof payload.sessionId === "string"
        ) {
            return {
                userId: payload.userId,
                email: payload.email,
                sessionId: payload.sessionId,
            }
        }

        return null
    } catch (error) {
        console.error("Token verification failed:", error)
        return null
    }
}

export function generateResetToken(): string {
    return crypto.randomBytes(32).toString("hex")
}