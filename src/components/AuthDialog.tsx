"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  readonly trigger?: React.ReactNode;
  readonly open: boolean;
  readonly setOpen: (value: boolean) => void;
  readonly alertMessage?: string;
}) {
  const dispatch = useDispatch();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="p-4 w-full lg:max-w-lg h-full lg:h-auto z-[100] border-none rounded-2xl shadow-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <Card className="w-full h-full max-h-[600px] p-0 shadow-lgrounded-xl border-none">
          <CardHeader className="flex flex-col items-center">


            {alertMessage && (
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-4 w-full"
              >
                <Alert className=" text-red-500 shadow-lg rounded-xl">
                  <div>
                    <AlertDescription className="text-sm flex gap-3 items-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      {alertMessage}
                    </AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}

            <Tabs defaultValue="login" className="w-full mt-2">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="text-white font-bold hover:text-red-400 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_red] rounded-lg"
                >
                  LOG IN
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-white font-bold hover:text-red-400 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_red] rounded-lg"
                >
                  SIGN UP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardContent className="relative p-6 rounded-b-xl shadow-inner">
                  <LoginForm
                    onLoginSuccess={() => {
                      setOpen(false);
                      dispatch(login());
                    }}
                  />
                </CardContent>
              </TabsContent>

              <TabsContent value="register">
                <CardContent className="relative p-6 rounded-b-xl shadow-inner">
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
