"use client";
import { useGetMe } from "@/app/hooks/use-get-me";
import { isAuthenticated } from "@/constants/authenticated";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { JSX, ReactNode, useEffect } from "react";

interface IGuardProps {
  children: JSX.Element | ReactNode;
}

const Guard = ({ children }: IGuardProps) => {
  const { user, loading, error } = useGetMe();
  const router = useRouter();
  console.log("User:", user); // Log user data
  console.log("Loading:", loading); // Log loading state
  console.log("Error:", error); // Log error state

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }
  if (user) isAuthenticated(true);

  if (error) {
    console.error("Error fetching user data:", error);
    toast({
      title: error.message || "Something went know you need to login again",
      variant: "destructive",
    });
    router.push("/login");
    return null; // Return null to avoid rendering
  }

  //   useEffect(() => {
  //     if (user) isAuthenticated(true);
  //     console.log("user logged in");
  //   }, [user]);
  return <>{user ? children : <div>You are not logged in</div>}</>; // Render children if user exists
};

export default Guard;
