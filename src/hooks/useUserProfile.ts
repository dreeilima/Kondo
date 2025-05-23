import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { useUserRole } from "./useUserRole";
import { UserRole } from "./useUserRole";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  apartment: string;
  block: string;
  role: UserRole; // Using UserRole type from useUserRole
}

export function useUserProfile() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        console.log("Fetching profile for user:", user.id);

        // Get user email from auth
        const email = user.email || "";

        // Try to get profile data using RPC function to avoid RLS issues
        let profileData = null;
        let profileError = null;

        try {
          // First try the direct query
          const { data, error } = await supabase
            .from("profiles")
            .select("full_name, apartment, block, role")
            .eq("id", user.id)
            .single();

          profileData = data;
          profileError = error;
        } catch (err) {
          console.log("Direct query failed, trying alternative approach");
          profileError = err;
        }

        // If direct query fails due to RLS, try using auth metadata
        if (profileError || !profileData) {
          console.log("Using auth metadata as fallback");
          const { data: userData } = await supabase.auth.getUser();
          const userMetadata = userData.user?.user_metadata || {};

          profileData = {
            full_name: userMetadata.full_name || email.split("@")[0],
            apartment: userMetadata.apartment || "",
            block: userMetadata.block || "",
            role: role || "morador",
          };
        }

        const profileInfo: UserProfile = {
          id: user.id,
          email: email,
          full_name: profileData.full_name || email.split("@")[0],
          apartment: profileData.apartment || "",
          block: profileData.block || "",
          role: (profileData.role || role || "morador") as UserRole,
        };

        console.log("Profile data received:", profileInfo);
        setProfile(profileInfo);
      } catch (error) {
        const err = error as Error;
        console.error("Error:", err);
        toast.error("Ocorreu um erro ao carregar o perfil");
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      console.log("No user available for profile fetch");
    }
  }, [user, role]);

  const updateProfile = async (
    data: Partial<Omit<UserProfile, "role" | "id" | "email">>
  ) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      // Try to update the profile in the database
      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);

        // If RLS error, try updating auth metadata as fallback
        if (error.code === "42P17" || error.message.includes("policy")) {
          console.log("RLS error detected, updating auth metadata");

          const { error: authError } = await supabase.auth.updateUser({
            data: {
              ...data,
              updated_at: new Date().toISOString(),
            },
          });

          if (authError) {
            toast.error("Erro ao atualizar perfil");
            return { error: authError };
          }
        } else {
          toast.error("Erro ao atualizar perfil");
          return { error };
        }
      }

      // Update the state of the profile
      setProfile((prev) => (prev ? { ...prev, ...data } : null));

      toast.success("Perfil atualizado com sucesso");
      return { success: true };
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocorreu um erro ao atualizar o perfil");
      return { error };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}
