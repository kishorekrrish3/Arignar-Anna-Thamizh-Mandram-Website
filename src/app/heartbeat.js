const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://twwkkzearnonzjraohhx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3d2tremVhcm5vbnpqcmFvaGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MzM5NDUsImV4cCI6MjA4MTIwOTk0NX0.NqfAVKICJV640LfTBoTKupFkOW3-aHxo6m9Mn1oLM7c";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function heartbeat() {
    try {
        console.log("Pinging Supabase...");
        const { data, error } = await supabase
            .from("events")
            .select("id")
            .limit(1);

        if (error) {
            console.error("Heartbeat failed:", error.message);
            process.exit(1);
        }

        console.log("Supabase heartbeat successful 💓");
        console.log("Data received:", data);
    } catch (err) {
        console.error("Unexpected error during heartbeat:", err);
        process.exit(1);
    }
}

heartbeat();
