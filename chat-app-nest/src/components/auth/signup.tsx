"use client";
import React from "react";
import Auth from "./auth";
import Link from "next/link";
import { useCreateUser } from "@/app/hooks/use-create-user";

const Signup = () => {
  const [createUser] = useCreateUser();
  const submitHandler = async (email: string, password: string) => {
    // calling the graphql mutation hook
    await createUser({
      variables: {
        createUserInput: {
          email: email,
          password: password,
        },
      },
    });
  };
  return (
    <div>
      <Auth submitHandler={submitHandler} submitLabel={"Sign Up"}>
        <Link href={"/login"}>Already have an account? Login</Link>
      </Auth>
    </div>
  );
};

export default Signup;
