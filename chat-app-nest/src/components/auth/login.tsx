"use client";
import { useLoginUser } from "@/app/hooks/use-login-user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Auth from "./auth";
import { isAuthenticated } from "@/constants/authenticated";

const Login = () => {
  const { loginUser, error } = useLoginUser();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false); // Local state to track success
  const submitHandler = async (email: string, password: string) => {
    try {
      await loginUser({ email, password }); // Attempt to log in
      setIsSuccess(true); // Set success state to true
    } catch (err) {
      console.error(err); // Log error for debugging
      // Optionally, handle error state to display to the user
    }
  };

  // Redirect to homepage after successful login
  useEffect(() => {
    if (isSuccess) {
      router.push("/"); // Redirect to homepage on successful login
    }
  }, [isSuccess, router]); // Dependency array includes isSuccess and router

  return (
    <div className="h-screen flex justify-center items-center">
      <Auth submitHandler={submitHandler} submitLabel={"Login"}>
        <Link href={"/signup"}>Don't have an account? Sign Up</Link>
      </Auth>
    </div>
  );
};

export default Login;
