"use client";

import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import IconGoogle from "@/components/icons/Google";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { useToast } from "@/hooks/use-toast";
import { useRegisterGoogleSubmit } from "@/hooks/useRegisterMutation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

type RegisterFormProps = {
  onRegisterSuccess?: () => void;
  onCloseModal?: () => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onCloseModal,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { registerGoogleSubmit, loading: loadingGoogle, error: errorGmail } =
    useRegisterGoogleSubmit();

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await registerGoogleSubmit({
          variables: { token: tokenResponse.code },
        });

        const data = result?.data?.registerGoogle;
        if (data) {
          Cookies.set("token", data.token, { expires: 7 });
          dispatch(login());
          if (onRegisterSuccess) onRegisterSuccess();
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Google register error:", err);
      }
    },
    onError: (error) => {
      console.error("Google register failed", error);
    },
    flow: "auth-code",
    scope: "openid email profile",
  });

  useEffect(() => {
    if (errorGmail && onCloseModal) onCloseModal();

    if (errorGmail) {
      const graphQLError = errorGmail.graphQLErrors?.[0];
      const message =
        graphQLError?.message || "Something went wrong, please try again.";

      toast({
        variant: "destructive",
        title: "Google Register Failed",
        description: message,
      });
    }
  }, [errorGmail]);

  return (
   <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-2xl shadow-[0_0_25px_rgba(255,0,0,0.4)] space-y-6 w-full max-w-md mx-auto">
      <p className="text-center text-gray-300 text-sm">
        Sign up quickly and securely using your Google account – no password required.
      </p>
      <Button
        onClick={() => registerWithGoogle()}
        variant="outline"
        className="w-full flex items-center justify-center gap-3 uppercase rounded-full text-white border-red-500 hover:bg-red-600 hover:shadow-[0_0_20px_red] transition-all duration-300"
        disabled={loadingGoogle}
      >
        <IconGoogle />
        {loadingGoogle ? "Connecting..." : "Sign up with Google"}
      </Button>
    </div>
  );
};
