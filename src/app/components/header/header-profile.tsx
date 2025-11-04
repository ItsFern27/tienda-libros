import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export async function HeaderProfile() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <div className="flex items-center">
                {data.user ? (
                    <div className="relative group">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
                            <p>{data.user.user_metadata?.name}</p>
                            <svg className="h-full w-4 object-contain transition-transform group-hover:rotate-180" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" /></svg>
                        </div>
                        
                        {/* Menú desplegable */}
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                            <Link href="/user/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Mis Pedidos
                            </Link>
                            <Link href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Configuración
                            </Link>
                            <hr className="my-1 border-gray-200" />
                            <form action="/auth/signout" method="post" className="block">
                                <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    Cerrar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="hover:text-green-600">Iniciar sesión</Link>
                        <svg className="h-full w-4 object-contain text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" /></svg>
                    </>
                )}
            </div>
    )
}