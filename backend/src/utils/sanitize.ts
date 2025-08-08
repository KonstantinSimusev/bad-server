import sanitizeHtml from 'sanitize-html'

export const sanitize = (str: string): string =>
    sanitizeHtml(str, {
        allowedTags: [],
        allowedAttributes: {},
    })

export function sanitizeObject<T extends Record<string, unknown>>(input: T): T {
    const sanitized = { ...input }

    Object.entries(sanitized).forEach(([key, value]) => {
        if (typeof value === 'string') {
            ;(sanitized as Record<string, unknown>)[key] = sanitize(value)
        }
    })

    return sanitized as T
}
