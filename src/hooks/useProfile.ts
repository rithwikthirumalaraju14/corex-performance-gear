
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  address_street: string | null;
  address_city: string | null;
  address_state: string | null;
  address_zip: string | null;
  address_country: string | null;
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setProfile(null);
        setError(userError?.message || "Not logged in");
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !data) {
        setProfile(null);
        setError(profileError?.message || "Not found");
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;
    setLoading(true);
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id)
      .select("*")
      .single();

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return false;
    }
    setProfile(data);
    setError(null);
    return true;
  };

  return { profile, loading, error, updateProfile };
}
