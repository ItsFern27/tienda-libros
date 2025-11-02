import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export async function HeaderProfile() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    return (
        <div className="flex items-center">
                {data.user ? (
                    <>
                        <p>{data.user.user_metadata?.name}</p>
                        <svg className="h-full w-4 object-contain" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" /></svg>
                    </>
                ) : (
                    <>
                        <Link href="/login">Iniciar sesión</Link>
                        <svg className="h-full w-4 object-contain text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" /></svg>
                    </>
                )}
                {/* <Link href="/login">Iniciar sesión</Link>
                <svg className="h-full w-4 object-contain text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" /></svg> */}
            </div>
    )
}