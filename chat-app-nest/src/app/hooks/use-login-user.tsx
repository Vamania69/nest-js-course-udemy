import client from "@/constants/apollo-client";
import { API_URL } from "@/constants/urls";
import { useState } from "react";

interface Request {
  email: string;
  password: string;
}

const useLoginUser = () => {
  const [error, setError] = useState(false);

  const loginUser = async (request: Request) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Login failed: ${errorMessage}`);
      }

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Response is not JSON");
      }

      console.log(data);

      await client.refetchQueries({ include: "active" });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return { loginUser, error };
};

export { useLoginUser };
