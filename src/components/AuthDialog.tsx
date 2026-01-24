"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function AuthDialog({
  trigger,
  open,
  setOpen,
  alertMessage,
}: {
  trigger?: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  alertMessage?: string;
}) {
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="p-4 w-full lg:max-w-xl h-full lg:h-auto z-[100]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <Card className="w-full h-full max-h-[600px] p-0 shadow-none border-none">
          <CardHeader>
            <div className="relative w-20 h-20 mx-auto mb-5">
              <Image
                src="/Asset 4.svg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            {alertMessage && (
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Alert className="border-red-300 bg-red-50 text-red-700 shadow-sm rounded-xl">
                  <div>
                    <AlertDescription className="text-sm flex gap-4 items-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      {alertMessage}
                    </AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">LOG IN</TabsTrigger>
                <TabsTrigger value="register">SIGN UP</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <CardContent className="relative p-0 pt-10">
                  <LoginForm
                    onLoginSuccess={() => {
                      setOpen(false);
                      dispatch(login());
                    }}
                  />
                </CardContent>
              </TabsContent>
              <TabsContent value="register">
                <CardContent className="relative p-0">
                  <RegisterForm onRegisterSuccess={() => setOpen(false)} />
                </CardContent>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
