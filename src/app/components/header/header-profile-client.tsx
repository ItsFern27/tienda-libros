/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link";
import { signOut } from "@/app/(index)/login/actions";
import { useEffect, useRef, useState } from "react";

export default function ProfileMenu({ user }: Readonly<{ user: any }>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (openTimer.current) globalThis.clearTimeout(openTimer.current);
      if (closeTimer.current) globalThis.clearTimeout(closeTimer.current);
    };
  }, [open]);

  const handleMouseEnter = () => {
    // cancel any pending close
    if (closeTimer.current) {
      globalThis.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    // Abrir inmediatamente al hacer hover
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (openTimer.current) {
      globalThis.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    // Dar tiempo suficiente para mover el cursor al menú
    closeTimer.current = globalThis.setTimeout(() => setOpen(false), 400) as unknown as number;
  };

  if (!user) {
    return (
      <>
        <Link href="/login" className="hover:text-green-600">Iniciar sesión</Link>
        <svg className="h-4 w-4 text-green-500 ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>
      </>
    )
  }

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        type="button"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 bg-transparent border-0 p-0 text-sm hover:text-green-600"
      >
        <span className="text-sm">{user.user_metadata?.name ?? "Usuario"}</span>
        <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>
      </button>

      <div 
        tabIndex={-1} 
        role="menu" 
        aria-hidden={!open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all z-50 ${open ? 'block' : 'hidden'}`}>
        <Link role="menuitem" href="/pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mis Pedidos</Link>
        <Link role="menuitem" href="/configuration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuración</Link>
        <hr className="my-1 border-gray-200" />
        <form method="post" className="block">
          <button onClick={signOut} role="menuitem" type="submit" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cerrar Sesión</button>
        </form>
      </div>
    </div>
  )
}
