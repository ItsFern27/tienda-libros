import { createClient } from "@/utils/supabase/server";
import ProfileMenu from "./header-profile-client";

export async function HeaderProfile() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <div className="flex items-center">
            <ProfileMenu user={data.user} />
        </div>
    )
}