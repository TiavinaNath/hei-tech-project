"use client";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event: string) => {
      if (event === "SIGNED_IN") {
        router.refresh();
      }
    });
  }, [router]);

  return <>{children}</>;
}
