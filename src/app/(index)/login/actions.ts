'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/private')
}

export async function signUp(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
                name: formData.get('name') as string,
                user_name: formData.get('username') as string,
                avatar_url: 'https://static.wikia.nocookie.net/youtubepedia/images/8/8e/Curly.jpeg/revision/latest?cb=20200109025702&path-prefix=es' //https://static.wikia.nocookie.net/youtubepedia/images/8/8e/Curly.jpeg/revision/latest?cb=20200109025702&path-prefix=es
            }
        }
    }

    const { error } = await supabase.auth.signUp(data)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
        redirect('/error')
    }
}