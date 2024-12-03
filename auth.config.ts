import { NextAuthConfig } from 'next-auth'

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    trustHost: true,
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            const isOnLogin = nextUrl.pathname.startsWith('/login')
            // debugger
            if (isOnDashboard) {
                if (isLoggedIn) {
                     return true
                // return Response.redirect(new URL("./", nextUrl))

                }
                return false // Redirect unauthenticated users to login page
            } 
            else if (isLoggedIn && isOnLogin) {
                return Response.redirect(new URL("/dashboard", nextUrl))
            }

            return true;

        }
    },
    providers: []
} satisfies NextAuthConfig