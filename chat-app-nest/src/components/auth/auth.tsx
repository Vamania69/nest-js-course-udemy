"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface IAuthProps {
  submitHandler: (email: string, password: string) => void;
  submitLabel: string;
  children: React.ReactNode;
}

const Auth: React.FC<IAuthProps> = ({
  submitHandler,
  submitLabel,
  children,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitHandler(email, password);
    console.log(email, password);
  };

  return (
    <Card className="border m-auto max-w-[32rem]">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">{submitLabel}</Button>
      </form>
      {children}
    </Card>
  );
};

export default Auth;
