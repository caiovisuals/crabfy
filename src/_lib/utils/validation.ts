export interface ValidationResult {
    valid: boolean
    errors: string[]
}

export function validateEmail(email: string): ValidationResult {
    const errors: string[] = []
    
    if (!email) {
        errors.push("Email é obrigatório")
        return { valid: false, errors }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        errors.push("Email inválido")
    }

    return { valid: errors.length === 0, errors }
}

export function validatePassword(password: string): ValidationResult {
    const errors: string[] = []
    
    if (!password) {
        errors.push("Senha é obrigatória")
        return { valid: false, errors }
    }

    if (password.length < 8) {
        errors.push("A senha deve ter no mínimo 8 caracteres")
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("A senha deve conter pelo menos uma letra maiúscula")
    }

    if (!/[a-z]/.test(password)) {
        errors.push("A senha deve conter pelo menos uma letra minúscula")
    }

    if (!/[0-9]/.test(password)) {
        errors.push("A senha deve conter pelo menos um número")
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("A senha deve conter pelo menos um caractere especial")
    }

    return { valid: errors.length === 0, errors }
}

export function validateUsername(username: string): ValidationResult {
    const errors: string[] = []
    
    if (!username) {
        errors.push("Nome de usuário é obrigatório")
        return { valid: false, errors }
    }

    if (username.length < 3) {
        errors.push("Nome de usuário deve ter no mínimo 3 caracteres")
    }

    if (username.length > 30) {
        errors.push("Nome de usuário deve ter no máximo 30 caracteres")
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Nome de usuário deve conter apenas letras, números e underscores")
    }

    return { valid: errors.length === 0, errors }
}

export function validateName(name: string): ValidationResult {
    const errors: string[] = []
    
    if (!name) {
        errors.push("Nome é obrigatório")
        return { valid: false, errors }
    }

    if (name.length < 2) {
        errors.push("Nome deve ter no mínimo 2 caracteres")
    }

    if (name.length > 100) {
        errors.push("Nome deve ter no máximo 100 caracteres")
    }

    return { valid: errors.length === 0, errors }
}