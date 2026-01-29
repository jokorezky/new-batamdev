"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useLoginGoogleSubmit } from "@/hooks/useLoginMutation";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onLoginSuccess?: () => void;
};

export default function JoinPage({ onLoginSuccess }: LoginFormProps): JSX.Element {
  const router = useRouter();
  const { loginGoogleSubmit, responseLoginGoogle, error: errorGmail } = useLoginGoogleSubmit();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await loginGoogleSubmit({ variables: { token: codeResponse.code } });
      } catch (err) {
        console.error("Login Google failed:", err);
      }
    },
    onError: (err) => {
      console.error("Google login error:", err);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (responseLoginGoogle) {
      const { token, refreshToken } = responseLoginGoogle.loginGoogle;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("refresh_token", refreshToken);
      if (onLoginSuccess) onLoginSuccess();
      router.push("/");
    }
  }, [responseLoginGoogle, onLoginSuccess, router]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-x-hidden overflow-y-auto relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-md w-full bg-black/70 border border-red-600/40 backdrop-blur-xl rounded-3xl p-8 md:p-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          Join the Builders
        </h1>
        <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed">
          batamdev is an ecosystem for builders who ship, break, secure, and experiment with real systems.
        </p>
        {errorGmail && (
          <p className="mt-4 text-red-500 text-sm">
            {errorGmail.message || "Something went wrong with Google login."}
          </p>
        )}
        <div className="mt-10">
          <Button
            onClick={() => loginGoogle()}
            size="lg"
            className="w-full h-14 rounded-2xl bg-white text-black font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          By joining, you agree to participate respectfully and contribute to a high-signal community.
        </p>
        <div className="mt-8 text-xs text-gray-500">
          Looking to collaborate as a partner?{" "}
          <Link href="/partners" className="text-red-400 hover:text-red-500 transition">
            Become a Partner
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.09-6.09C34.52 2.9 29.62 1 24 1 14.61 1 6.73 6.38 3.26 14.21l7.1 5.51C12.05 13.09 17.57 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.42-4.74H24v9.01h12.69c-.55 2.97-2.2 5.49-4.69 7.19l7.19 5.59c4.21-3.88 6.31-9.6 6.31-17.05z" />
      <path fill="#FBBC05" d="M10.36 28.72c-.48-1.44-.76-2.97-.76-4.56s.28-3.12.76-4.56l-7.1-5.51C1.16 17.12 0 20.46 0 24s1.16 6.88 3.26 9.91l7.1-5.19z" />
      <path fill="#34A853" d="M24 47c5.62 0 10.34-1.86 13.79-5.03l-7.19-5.59c-2 1.34-4.56 2.14-6.6 2.14-6.43 0-11.95-3.59-14.64-8.72l-7.1 5.19C6.73 41.62 14.61 47 24 47z" />
    </svg>
  );
}
