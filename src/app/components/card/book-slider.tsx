import { createClient } from "@/utils/supabase/server";
import { BookSliderClient } from "./book-slider-client";

export async function BookSlider() {
    const supabase = await createClient();
    const { data: libros } = await supabase.from('libro').select('*').limit(11);
    
    return (
        <div className="w-full max-w-380">
            <BookSliderClient libros={libros || []} />
        </div>
    );
}
