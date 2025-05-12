'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function registerUser(data: Record<string, string>) {
    const supabase = await createClient()

    try {
        // 1. Création du compte auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name
                }
            }
        })

        if (authError) throw authError

        // 2. Insertion dans la table publique
        if (authData.user) {
            const { error: profileError } = await supabase.from('users').insert({
                id: authData.user.id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: 'user'
            })

            if (profileError) throw profileError
        }

        redirect('/dashboard')
    } catch (error) {
        console.error('Erreur d\'inscription:', error)
        throw error
    }
}