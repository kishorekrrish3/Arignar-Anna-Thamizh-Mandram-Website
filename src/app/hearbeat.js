import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY // or anon key
);

async function heartbeat() {
    const { error } = await supabase
        .from("your_table_name")
        .select("id")
        .limit(1);

    if (error) {
        console.error("Heartbeat failed:", error.message);
        process.exit(1);
    }

    console.log("Supabase heartbeat successful 💓");
}

heartbeat();
