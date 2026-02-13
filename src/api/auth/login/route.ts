import { NextRequest } from "next/server"
import { isRateLimited } from "@/_lib/security/rateLimit"
import crypto from "crypto"