import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

// Routes publiques (pas besoin d'authentification)
const PUBLIC_ROUTES = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/signup/client',
    '/auth/signup/provider',
    '/auth/verify-email',
    '/provider'
]

// Routes d'API publiques
const PUBLIC_API_ROUTES = [
    '/api/healthcheck'
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        PUBLIC_ROUTES.includes(pathname) ||
        PUBLIC_API_ROUTES.some(route => pathname.startsWith(route)) ||
        pathname.startsWith('/_next/') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    // Redirection si non authentifié
    if (!user || error) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Optionnel : Vérification des rôles utilisateur
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    // Exemple : Protection des routes admin
    if (profile?.role !== 'admin' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, etc.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}