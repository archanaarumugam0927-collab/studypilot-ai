import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bgsahjbullumzwcmplgn.supabase.co";

const supabaseAnonKey = "sb_publishable_M6UdYsuK3WH8KyFTxOWMDw_7iCQyCrG";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);