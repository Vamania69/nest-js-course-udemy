"use client";
import React from "react";
import Auth from "./auth";
import Link from "next/link";
import { useCreateUser } from "@/app/hooks/use-create-user";

const Login = () => {
//   const [createUser] = useCreateUser();
  const submitHandler = async (email: string, password: string) => {
//     // calling the graphql mutation hook
//     await createUser({
//       variables: {
//         createUserInput: {
//           email: email,
//           password: password,
//         },
//       },
//     });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Auth submitHandler={submitHandler} submitLabel={"Login"}>
        <Link href={"/signup"}>Don't have an account? Sign Up</Link>
      </Auth>
    </div>
  );
};

export default Login;
