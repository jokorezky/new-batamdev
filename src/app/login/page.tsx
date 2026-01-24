"use client";
import { LoginForm } from "@/components/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center px-6 py-12 sm:px-20 font-sans gap-8">
      <h3 className="text-2xl text-center sm:text-left">Masuk akun kinigo</h3>
      <main className="flex flex-col gap-4 items-center sm:items-start">
        <Card className="max-w-sm w-full pt-5 shadow-none">
          <CardContent className="relative">
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
