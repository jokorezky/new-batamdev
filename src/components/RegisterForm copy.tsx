"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import IconGoogle from "@/components/icons/Google";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { Form } from "@/components/Form";
import { InputField } from "@/components/InputField";
import { Separator } from "@/components/ui/separator";
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
};

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const RegisterForm: FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const { registerGoogleSubmit, loading: loadingGoogle } =
    useRegisterGoogleSubmit();
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
          <Button
            variant="outline"
            className="w-full uppercase rounded-full text-gray-500"
            onClick={() => registerWithGoogle()}
            disabled={loadingGoogle}
          >
            <IconGoogle /> Register with Google
          </Button>
          <div className="relative">
            <p className="absolute uppercase left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 z-10 text-xs text-center whitespace-nowrap w-full max-w-[60%] lg:max-w-[40%] mx-auto">
              Or sign up using email
            </p>
            <Separator className="my-5" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <InputField
              label="Nama Lengkap"
              name="full_name"
              placeholder="Nama Lengkap"
              type="text"
            />
            <p className="text-[10px]">
              Masukkan nama asli Anda, nama akan digunakan pada data sertifikat
            </p>
          </div>
          <div>
            <InputField
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <p className="text-[10px]">Gunakan alamat email aktif Anda</p>
          </div>
          <div>
            <InputField
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <p className="text-[10px] pb-2">
              Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
            </p>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-5 w-full bg-green-600 text-white hover:bg-green-800 rounded-full"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          SIGN UP
        </Button>
      </div>
    </Form>
  );
};
