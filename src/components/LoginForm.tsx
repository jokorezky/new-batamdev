"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import IconGoogle from "@/components/icons/Google";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useLoginGoogleSubmit } from "@/hooks/useLoginMutation";

type LoginFormProps = {
  onLoginSuccess?: () => void;
  onCloseModal?: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onLoginSuccess, onCloseModal }) => {
  const { loginGoogleSubmit, responseLoginGoogle, error: errorGmail } = useLoginGoogleSubmit();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await loginGoogleSubmit({ variables: { token: codeResponse.code } });
    },
    flow: "auth-code",
  });

  if (errorGmail && onCloseModal) onCloseModal();

  if (responseLoginGoogle) {
    Cookies.set("token", responseLoginGoogle.loginGoogle.token, { expires: 7 });
    Cookies.set("refresh_token", responseLoginGoogle.loginGoogle.refreshToken);
    if (onLoginSuccess) onLoginSuccess();
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-2xl shadow-[0_0_25px_rgba(255,0,0,0.4)] space-y-6 w-full max-w-md mx-auto">
      <p className="text-center text-gray-300 text-sm">
        Sign in securely with your Google account to access your dashboard instantly.
      </p>
      <Button
        onClick={() => loginGoogle()}
        variant="outline"
        className="w-full flex items-center justify-center gap-3 uppercase rounded-full text-white border-red-500 hover:bg-red-600 hover:shadow-[0_0_20px_red] transition-all duration-300"
      >
        <IconGoogle />
        Continue with Google
      </Button>
    </div>
  );
};
