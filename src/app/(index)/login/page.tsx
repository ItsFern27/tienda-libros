'use client'

import { login, signUp, signOut } from "./actions";
import { useState } from "react";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Título y descripción */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isSignUp 
                            ? 'Completa tus datos para registrarte' 
                            : 'Ingresa a tu cuenta para continuar'}
                    </p>
                </div>

                {/* Formulario */}
                <form className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Correo Electrónico
                            </label>
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                required 
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="tu@email.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Contraseña
                            </label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Nombre y Apellido - Solo para Sign Up */}
                        {isSignUp && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre y Apellido
                                </label>
                                <input 
                                    id="name" 
                                    name="name" 
                                    required 
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="Juan Pérez"
                                />
                            </div>
                        )}

                        {/* Username - Solo para Sign Up */}
                        {isSignUp && (
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre de Usuario
                                </label>
                                <input 
                                    id="username" 
                                    name="username" 
                                    required 
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="juanperez"
                                />
                            </div>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {!isSignUp ? (
                            <button 
                                formAction={login}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                            >
                                Iniciar Sesión
                            </button>
                        ) : (
                            <button 
                                formAction={signUp}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                            >
                                Registrarse
                            </button>
                        )}
                    </div>

                    {/* Toggle entre Login y Sign Up */}
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {isSignUp ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="ml-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                            >
                                {isSignUp ? 'Inicia Sesión' : 'Regístrate'}
                            </button>
                        </p>
                    </div>
                </form>

                {/* Botón Sign Out */}
                <div className="text-center">
                    <button 
                        onClick={signOut}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors underline"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}