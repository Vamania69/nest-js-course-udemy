import { isAuthenticated } from "@/constants/authenticated";
import { API_URL } from "@/constants/urls";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toast({
        title: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      throw new Error(`Logout failed: ${errorMessage}`);
    } else {
      isAuthenticated(false);
      toast({
        title: "Login Successful",
        duration: 3000,
      });
      router.push("/login");
      console.log("User Logged out successfully");
    }
  };
  return { logout };
};

export { useLogout };
