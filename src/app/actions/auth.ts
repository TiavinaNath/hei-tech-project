'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function registerUser(data: Record<string, string>) {
    const supabase = await createClient()

    try {
        console.log("Tentative d'inscription pour:", data.email)
        // 1. Création du compte auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role: data.role
                }
            }
        })

        if (authError) {
            console.error("Détails de l'erreur:", {
                message: authError.message,
                status: authError.status,
                name: authError.name
            })
            throw new Error(`Erreur d'inscription: ${authError.message}`)
        }
        console.log("Inscription réussie, données:", authData)

        // 2. Insertion dans la table publique
        if (authData.user) {
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role: data.role
                })
                .select();

            if (profileError) {
                console.error("Détails erreur DB:", profileError);
                // Annule l'inscription si l'insertion échoue
                await supabase.auth.admin.deleteUser(authData.user.id);
                throw new Error(`Erreur base de données: ${profileError.message}`);
            }
        }

    } catch (error) {
        console.error('Erreur d\'inscription:', error)
        throw error
    }
    redirect('/test')
}


export async function loginUser(credentials: { email: string, password: string }) {
    const supabase = await createClient()

    try {
        console.log("Tentative de connexion pour :", credentials.email)

        const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        })

        if (loginError) {
            console.error("Erreur de connexion :", loginError.message)
            throw new Error('Identifiants invalides')
        }

        console.log("Connexion réussie :", authData)
        
    } catch (error) {
        console.error("Erreur dans loginUser:", error)
        throw error
    }
    redirect('/test')
}