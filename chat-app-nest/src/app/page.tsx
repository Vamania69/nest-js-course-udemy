"use client";
import Navbar from "@/components/common/navbar";
import dynamic from "next/dynamic";
export default function Home() {
  const DynamicGuard = dynamic(() => import("@/components/auth/guard"), {
    ssr: false,
  });
  return (
    <>
      <DynamicGuard>
        <Navbar />
        <div>Hello</div>
      </DynamicGuard>
    </>
  );
}
