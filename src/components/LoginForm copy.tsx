"use client";

import { useState, useEffect, useRef, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/Form";
import { InputField } from "@/components/InputField";
import { useSearchParams } from "next/navigation";
import IconGoogle from "@/components/icons/Google";
import { useToast } from "@/hooks/use-toast";
import { useOtpValidationMutation } from "@/hooks/useOtpValidationMutation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useLoginMutation,
  useSendOtpMutation,
  useLoginGoogleSubmit,
} from "@/hooks/useLoginMutation";
import { emailSchema, passwordSchema } from "@/lib/validationSchemas";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

type LoginFormProps = {
  onLoginSuccess?: () => void;
};

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm: FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const prevErrorRef = useRef<string | null>(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isDisable, setDisabled] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(3);
  const { validateOtp, loading: otpLoading } = useOtpValidationMutation();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading: loadingLogin, error } = useLoginMutation();
  const { sendOtpRequest } = useSendOtpMutation();

  const { loginGoogleSubmit, responseLoginGoogle } = useLoginGoogleSubmit();
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
      window.location.href = "/";
    }
  }, [responseLoginGoogle]);

  useEffect(() => {
    const lastAttempt = localStorage.getItem("lastResendTime");
    const attemptsLeft = localStorage.getItem("resendAttempts");

    if (attemptsLeft) {
      setResendAttempts(parseInt(attemptsLeft, 10));
    }

    if (lastAttempt) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(lastAttempt, 10)) / 1000
      );
      if (elapsed < 600) {
        setTimeLeft(600 - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (otp.length === 4 && otp.every((digit) => digit !== "")) {
      const email = form.watch("email");
      const password = form.watch("password");
      const otpCode = otp.join("");
      if (email && password) {
        const validate = async () => {
          const isValid = await validateOtp(email, otpCode);
          if (isValid) {
            const response = await loginUser(email, password);
            Cookies.set("token", response, { expires: 7 });
            dispatch(login());
            window.location.href = "/dashboard";
          }
        };
        validate();
      }
    }
  }, [otp, validateOtp]);

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
      window.location.href = "/";
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

  const handleResendVerificationEmail = async () => {
    const email = form.watch("email");
    if (!email) {
      console.error("Email tidak boleh kosong");
      return;
    }

    setDisabled(true);

    try {
      await sendOtpRequest(email);
      setTimeout(() => {
        setDisabled(false);
      }, 60000);
    } catch (error) {
      console.error("Gagal mengirim OTP:", error);
      setDisabled(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="px-0 lg:px-11">
        <div className="flex justify-center items-center h-full w-full">
          {isDisable && (
            <InputOTP
              maxLength={4}
              value={otp.join("")}
              onChange={(value) => setOtp(value.split(""))}
              disabled={otpLoading}
              className="pb-5"
            >
              <InputOTPGroup className="flex gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="text-2xl h-16 w-16 border border-gray-300 rounded-lg text-center"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        </div>
        {isDisable && (
          <div className="justify-center items-center text-center">
            <p className="text-lg font-medium text-gray-700">
              Check email Anda, kami kirim kode OTP
            </p>
          </div>
        )}

        {!isNotVerify && (
          <div className="space-y-8">
            <Button
              onClick={() => loginGoogle()}
              variant="outline"
              className="w-full uppercase rounded-full text-gray-500"
            >
              <IconGoogle />
              Log In with Google
            </Button>
            <div className="relative">
              <p className="absolute uppercase left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 z-10 text-xs text-center whitespace-nowrap w-full max-w-[60%] lg:max-w-[40%] mx-auto">
                Or log in using email
              </p>
              <Separator className="my-5" />
            </div>
          </div>
        )}
        <div className="space-y-4">
          {!isDisable && (
            <div>
              <InputField
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <p className="text-[10px]">
                Gunakan alamat email yang Anda daftarkan
              </p>
            </div>
          )}

          {isNotVerify && (
            <div>
              <p className="text-lg font-medium text-gray-700">
                Email Anda belum terverifikasi
              </p>
            </div>
          )}
          {!isNotVerify && (
            <div>
              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                />
                <div
                  className="absolute right-3 top-[2.6rem] cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </div>
              </div>
              <p className="text-[10px] pb-2">
                Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
              </p>
            </div>
          )}
          <Button
            type={isNotVerify ? "button" : "submit"}
            onClick={isNotVerify ? handleResendVerificationEmail : undefined}
            className="w-full bg-green-600 hover:bg-green-800 text-white rounded-full"
            disabled={loadingLogin || isDisable}
          >
            {loadingLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isNotVerify ? "Kirim Ulang Verifikasi" : "Log In"}
          </Button>
        </div>

        <div className="space-y-5 pt-5">
          <p className="text-center text-sm">
            <Link href="/register">
              <span className="cursor-pointer text-sm hover:underline">
                Forgot Password?
              </span>
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
};
