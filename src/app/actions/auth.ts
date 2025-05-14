'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import geocodeAddress from '@/lib/utils/geocodeAddress'

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
    redirect('/auth/verify-email')
}

export async function registerProvider(data: Record<string, any>) {
    const supabase = await createClient()

    try {
        console.log('Tentative d’inscription prestataire pour:', data.email)

        // 1. Auth Signup
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role: 'PROVIDER'
                }
            }
        })

        if (authError) {
            console.error('Erreur auth:', authError)
            throw new Error(`Erreur d'inscription: ${authError.message}`)
        }

        const userId = authData.user?.id
        if (!userId) throw new Error('ID utilisateur non défini après signup.')

        // 2. Insertion dans la table `users`
        const { error: userInsertError } = await supabase
            .from('users')
            .insert({
                id: userId,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: 'PROVIDER'
            })

        if (userInsertError) {
            console.error('Erreur insertion `users`:', userInsertError)
            await supabase.auth.admin.deleteUser(userId)
            throw new Error('Erreur base de données: insertion utilisateur')
        }

        // 3. Upload image (optionnel)
        const profilePhotoUrl = "https://drive.google.com/uc?export=view&id=1hLyOK4QMInOTvRcsHGBCaLgOt1LLHvK9";
        // let profilePhotoUrl: string | null = null
        // if (data.profile_picture && data.profile_picture instanceof File) {
        //     const file = data.profile_picture
        //     const filename = `${userId}/${uuidv4()}-${file.name}`

        //     const { data: uploadData, error: uploadError } = await supabase.storage
        //         .from('provider-profile-pictures')
        //         .upload(filename, file, {
        //             contentType: file.type
        //         })

        //     if (uploadError) {
        //         console.error('Erreur upload photo:', uploadError)
        //         throw new Error('Échec du téléversement de la photo de profil.')
        //     }

        //     const { data: publicUrlData } = supabase.storage
        //         .from('provider-profile-pictures')
        //         .getPublicUrl(uploadData.path)

        //     profilePhotoUrl = publicUrlData.publicUrl
        // }

        // 3.5 Géocodage adresse (si fournie)
        let fixed_location = null
        if (data.address) {
            const geo = await geocodeAddress(data.address)
            if (geo) {
                fixed_location = `POINT(${geo.lon} ${geo.lat})`
            }
        }

        // 4. Insertion dans `provider_profiles`
        const { error: profileError } = await supabase
            .from('provider_profiles')
            .insert({
                user_id: userId,
                phone_number: data.phone,
                bio: data.bio,
                birth_date: data.birth_date,
                is_mobile: data.mobile ?? true,
                fixed_location,
                travel_radius_km: parseInt(data.service_radius),
                profile_photo_url: profilePhotoUrl
            })

        if (profileError) {
            console.error('Erreur insertion `provider_profiles`:', profileError)
            await supabase.auth.admin.deleteUser(userId)
            throw new Error('Erreur lors de la création du profil prestataire.')
        }

        // 5. Redirection
    } catch (error) {
        console.error('Erreur d’inscription prestataire:', error)
        throw error
    }
    redirect('/auth/verify-email')
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
    redirect('/dashboard')
}

function uuidv4() {
    throw new Error('Function not implemented.')
}
