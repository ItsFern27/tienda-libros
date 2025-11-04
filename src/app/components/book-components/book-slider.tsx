/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface Libro {
    id: string;
    titulo: string;
    autor: string;
    precio: number;
    portada: string;
}

interface BookSliderProps {
    categoriaNombre?: string;
}

export function BookSlider({ categoriaNombre }: BookSliderProps) {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [gap, setGap] = useState(16); // gap inicial en px
    const sliderRef = useRef<HTMLDivElement>(null);

    // Obtener libros desde Supabase
    useEffect(() => {
        const fetchLibros = async () => {
            const supabase = createClient();
            let query = supabase.from('libro').select('*');
            
            // Si se proporciona un nombre de categoría, filtrar por esa categoría
            if (categoriaNombre) {
                // Primero obtener el ID de la categoría por su nombre
                const { data: categoriaData } = await supabase
                    .from('categoria')
                    .select('id')
                    .eq('nombre', categoriaNombre)
                    .single();
                
                if (categoriaData) {
                    // Filtrar libros por categoria_id
                    query = query.eq('categoria_id', categoriaData.id);
                } else {
                    // Si no se encuentra la categoría, no mostrar libros
                    setLibros([]);
                    setLoading(false);
                    return;
                }
            }
            
            const { data } = await query.limit(11);
            setLibros(data || []);
            setLoading(false);
        };
        fetchLibros();
    }, [categoriaNombre]);

    // Calcular cuántos elementos mostrar y el gap según el tamaño del slider
    useEffect(() => {
        const updateSlider = () => {
            if (!sliderRef.current) return;
            
            const sliderWidth = sliderRef.current.offsetWidth;
            const minItemWidth = 240; // max-w-60 = 15rem = 240px aproximadamente
            const minGap = 16; // gap mínimo en px
            
            // Calcular cuántos elementos caben
            let newItemsPerView = 1;
            if (sliderWidth >= 1200) {
                newItemsPerView = 5;
            } else if (sliderWidth >= 960) {
                newItemsPerView = 4;
            } else if (sliderWidth >= 720) {
                newItemsPerView = 3;
            } else if (sliderWidth >= 480) {
                newItemsPerView = 2;
            } else {
                newItemsPerView = 1;
            }
            
            // Calcular el gap basado en el ancho disponible
            // Distribuir el espacio extra entre los gaps (hay newItemsPerView + 1 espacios: antes, entre y después)
            const totalMinItemsWidth = newItemsPerView * minItemWidth;
            const totalMinGapsWidth = (newItemsPerView + 1) * minGap;
            const availableSpace = sliderWidth - totalMinItemsWidth - totalMinGapsWidth;
            
            // Si hay espacio extra, distribuirlo entre los gaps
            const calculatedGap = availableSpace > 0 
                ? minGap + (availableSpace / (newItemsPerView + 1))
                : minGap;
            
            setItemsPerView(newItemsPerView);
            setGap(calculatedGap);
            
            // Ajustar currentIndex si es necesario
            const maxIndex = Math.max(0, libros.length - newItemsPerView);
            setCurrentIndex((prev) => Math.min(prev, maxIndex));
        };

        if (libros.length > 0) {
            updateSlider();
            window.addEventListener('resize', updateSlider);
            return () => window.removeEventListener('resize', updateSlider);
        }
    }, [libros.length]);

    const maxIndex = Math.max(0, libros.length - itemsPerView);

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    if (loading) {
        return <div className="text-center py-8 text-gray-500">Cargando libros...</div>;
    }

    if (!libros || libros.length === 0) {
        return <div className="text-center py-8 text-gray-500">No hay libros disponibles</div>;
    }

    // Calcular el ancho de cada elemento considerando el gap
    const itemWidthCalc = `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})`;
    
    // Calcular el desplazamiento: avanzar por 1 elemento a la vez
    // Cada elemento ocupa (100% / itemsPerView) + su gap proporcional
    const translateX = currentIndex * (100 / itemsPerView);

    // Determinar si debemos usar space-between (cuando todos los elementos visibles caben en pantalla)
    // Cuando todos los elementos restantes desde currentIndex caben en la vista, usar space-between
    const remainingItems = libros.length - currentIndex;
    const allVisible = remainingItems <= itemsPerView;
    const useSpaceBetween = allVisible;

    return (
        <div className="w-full max-w-380">
            <div className="relative w-full" ref={sliderRef}>
                {/* Contenedor del slider */}
                <div className="overflow-hidden w-full">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${translateX}%)`,
                            gap: `${gap}px`,
                            justifyContent: useSpaceBetween ? 'space-between' : 'flex-start',
                        }}
                    >
                        {libros.map((libro) => (
                            <div
                                key={libro.id}
                                className="shrink-0"
                                style={{
                                    width: itemWidthCalc,
                                    minWidth: itemWidthCalc,
                                }}
                            >
                                <div className="max-w-60 w-full mx-auto flex flex-col cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-102 transition-[transform, shadow] duration-300">
                                    {/* Imagen del libro */}
                                    <img
                                        src={libro.portada}
                                        alt={libro.titulo}
                                        className="h-90 object-contain"
                                    />

                                    {/* Contenido del libro */}
                                    <div className="flex flex-col justify-between p-4">
                                        <div>
                                            <p className="text-sm text-gray-600">{libro?.autor}</p>
                                            <h2 className="text-lg font-bold text-gray-800 h-12 leading-6 line-clamp-2">{libro?.titulo}</h2>
                                        </div>
                                        <p className="mt-2 font-semibold text-green-600">S/ {libro?.precio.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Flecha izquierda - siempre visible */}
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Anterior"
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* Flecha derecha - siempre visible */}
                <button
                    onClick={goToNext}
                    disabled={currentIndex >= maxIndex}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Siguiente"
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
