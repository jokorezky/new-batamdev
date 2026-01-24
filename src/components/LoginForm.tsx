"use client";

import { useState, useEffect, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/Form";
import IconGoogle from "@/components/icons/Google";
import { useToast } from "@/hooks/use-toast";
import {
  useLoginMutation,
  useLoginGoogleSubmit,
} from "@/hooks/useLoginMutation";
import { emailSchema, passwordSchema } from "@/lib/validationSchemas";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

type LoginFormProps = {
  onLoginSuccess?: () => void;
  onCloseModal?: () => void;
};

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm: FC<LoginFormProps> = ({
  onLoginSuccess,
  onCloseModal,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { loginUser, loading: loadingLogin, error } = useLoginMutation();

  const {
    loginGoogleSubmit,
    responseLoginGoogle,
    error: errorGmail,
  } = useLoginGoogleSubmit();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await loginGoogleSubmit({
        variables: {
          token: codeResponse.code,
        },
      });
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (errorGmail) {
      if (onCloseModal) {
        onCloseModal();
      }
      const graphQLError = errorGmail.graphQLErrors?.[0];
      const message =
        graphQLError?.message || "Something went wrong, please try again.";

      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description: message,
      });
    }
  }, [errorGmail]);

  useEffect(() => {
    if (responseLoginGoogle) {
      Cookies.set("token", responseLoginGoogle.loginGoogle.token, {
        expires: 7,
      });
      Cookies.set(
        "refresh_token",
        responseLoginGoogle.loginGoogle.refreshToken
      );
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      window.location.reload();
    }
  }, [responseLoginGoogle]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const onSubmit = async (data: LoginFormInputs) => {
    if (isNotVerify) return;
    const { email, password } = data;
    const response = await loginUser(email, password);
    if (response) {
      Cookies.set("token", response, { expires: 7 });
      dispatch(login());
      window.location.reload();
    } else {
      toast({
        variant: "destructive",
        title: "Warning",
        description:
          "Email atau password yang Anda masukkan salah. Silakan coba lagi.",
      });
    }
  };

  const isNotVerify = error === "Email Anda belum terverifikasi";

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="px-0 lg:px-11">
        <div className="space-y-8">
          <p className="text-center text-gray-500">
            Sign in securely with your Google account to access your dashboard
            instantly without creating a new password.
          </p>
          <Button
            onClick={() => loginGoogle()}
            variant="outline"
            className="w-full uppercase rounded-full text-gray-600 hover:text-gray-800"
          >
            <IconGoogle />
            {loadingLogin ? "Connecting..." : "Continue with Google"}
          </Button>
        </div>
      </div>
    </Form>
  );
};
