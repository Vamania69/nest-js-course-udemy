"use client";
import { useCreateUser } from "@/app/hooks/use-create-user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Auth from "./auth";

const Signup = () => {
  const [createUser] = useCreateUser();
  const router = useRouter();
  const submitHandler = async (email: string, password: string) => {
    // calling the graphql mutation hook
    // await createUser({
    //   variables: {
    //     createUserInput: {
    //       email: email,
    //       password: password,
    //     },
    //   },
    // });

    try {
      await createUser({
        variables: {
          createUserInput: {
            email: email,
            password: password,
          },
        },
      });
      router.push("/login"); // Redirect to login page on successful signup
    } catch (err) {
      // setError("Signup failed. Please try again."); // Set error message
      console.error(err); // Log error for debugging
    }
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
