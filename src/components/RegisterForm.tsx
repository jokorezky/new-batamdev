"use client";

import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import IconGoogle from "@/components/icons/Google";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { Form } from "@/components/Form";
import {
  useRegisterMutation,
  useRegisterGoogleSubmit,
} from "@/hooks/useRegisterMutation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import {
  emailSchema,
  fullnameSchema,
  passwordSchema,
} from "@/lib/validationSchemas";
import { useLoginMutation } from "@/hooks/useLoginMutation";

const registerSchema = z.object({
  email: emailSchema,
  full_name: fullnameSchema,
  password: passwordSchema,
});

type RegisterFormProps = {
  onRegisterSuccess?: () => void;
  onCloseModal?: () => void;
};

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const RegisterForm: FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onCloseModal,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const {
    registerGoogleSubmit,
    loading: loadingGoogle,
    error: errorGmail,
  } = useRegisterGoogleSubmit();
  const { registerUser, loading } = useRegisterMutation();
  const { loginUser } = useLoginMutation();

  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

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
          if (onRegisterSuccess) {
            onRegisterSuccess();
          }
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
    if (errorGmail) {
      if (onCloseModal) {
        onCloseModal();
      }
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

  const onSubmit = async (data: RegisterFormInputs) => {
    const success = await registerUser(data);
    if (success) {
      const response = await loginUser(data.email, data.password);
      Cookies.set("token", response, { expires: 7 });
      dispatch(login());
      window.location.href = "/";
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="px-0 lg:px-11">
        <div className="space-y-8">
          <p className="text-center text-gray-500">
            Sign up quickly and securely using your Google account — no need to
            create a new password.
          </p>
          <Button
            variant="outline"
            className="w-full uppercase rounded-full text-gray-600 hover:text-gray-800"
            onClick={() => registerWithGoogle()}
            disabled={loadingGoogle}
          >
            <IconGoogle />
            {loadingGoogle ? "Connecting..." : "Sign up with Google"}
          </Button>
        </div>
      </div>
    </Form>
  );
};
