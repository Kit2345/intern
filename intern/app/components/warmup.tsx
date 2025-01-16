"use client";
import { useEffect } from "react";

export default function WarmupComponent() {
  useEffect(() => {
    fetch(
      "https://intern-kappa-seven.vercel.app/api/database/GET/getBootcampers"
    )
      .then((response) => {
        if (response.ok) {
          console.log("Supabase warmup successful");
        } else {
          console.error("Supabase warmup failed");
        }
      })
      .catch((error) => console.error("Error warming up Supabase:", error));
  }, []);

  return null;
}
