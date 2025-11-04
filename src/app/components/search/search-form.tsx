"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function SearchForm() {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("q") as string;
        
        if (query && query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form 
            role="search" 
            aria-label="Buscar libros" 
            className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
            onSubmit={handleSubmit}
        >
            <input 
                className="px-3 py-2 text-sm text-gray-800 placeholder-gray-400" 
                type="search" 
                name="q" 
                placeholder="Buscar..." 
            />
            <button 
                type="submit" 
                className="px-3 text-gray-600 hover:text-green-600" 
                aria-label="Buscar"
            >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
                </svg>
            </button>
        </form>
    );
}

