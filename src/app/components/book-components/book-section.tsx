import { BookSlider } from "./book-slider";

export function BookSection({ title, categoriaNombre }: { title: string, categoriaNombre?: string }) {
    return (
        <article className="flex flex-col gap-4 px-8">
            <h2 className="font-bold text-3xl">{title}</h2>
            <BookSlider categoriaNombre={categoriaNombre}/>
        </article>
    )
}