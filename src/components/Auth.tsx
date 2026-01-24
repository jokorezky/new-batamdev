"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout, updateUser, login, setLoadingUser } from "@/redux/authSlice";
import { useGetMeQuery } from "@/hooks/useGetMeQuery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/providers/LanguageProvider";

export function Auth() {
  const [open, setOpen] = useState(false);
  const { changeLanguage, locale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();
  const { data, loading } = useGetMeQuery();
  const isPodcast = pathname.startsWith("/podcast");

  useEffect(() => {
    if (!loading) {
      if (data?.getMe?.full_name) {
        dispatch(updateUser(data.getMe));
        dispatch(login());
      }
      dispatch(setLoadingUser(false));
    }
  }, [data, dispatch, loading]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const { full_name, username, picture, communities } = data?.getMe || {};

  const seed = encodeURIComponent(full_name);
  const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${seed}`;
  const flagIcons: Record<"id" | "en", string> = {
    id: "/indonesia.png",
    en: "/singapore.png",
  };
  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-7 h-7 rounded-sm border-green-700">
                  <AvatarImage
                    src={picture || avatarUrl}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-green-600 text-sm font-bold text-white">
                    {full_name
                      ? full_name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : ""}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[150px]">
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer" href={`/p/${username}`}>
                    Profil Saya
                  </Link>
                </DropdownMenuItem>
                {communities && (
                  <DropdownMenuItem asChild>
                    <Link
                      className="cursor-pointer capitalize"
                      href={`/${communities.url}`}
                    >
                      {communities?.name}
                    </Link>
                  </DropdownMenuItem>
                )}
                <Separator />
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer" href="/settings">
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-5">
          <div className="relative overflow-visible pt-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-transparent px-2">
                <Image
                  src={flagIcons[locale]}
                  alt={locale === "id" ? "Indonesian Flag" : "Singlish Flag"}
                  width={24}
                  height={12}
                  className="rounded-sm"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-max z-[999] shadow-md">
                <DropdownMenuItem
                  className={`cursor-pointer ${
                    locale === "id" ? "font-bold text-blue-500" : ""
                  }`}
                  onClick={() => changeLanguage("id")}
                >
                  <Image
                    className="rounded-sm"
                    src="/indonesia.png"
                    alt="Indonesian Flag"
                    width={24}
                    height={16}
                  />
                  Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`cursor-pointer ${
                    locale === "en" ? "font-bold text-blue-500" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  <Image
                    src="/singapore.png"
                    alt="Singapore Flag"
                    width={24}
                    height={16}
                  />
                  Singlish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <Link href="/subscription">
            <p
              className={`text-xs lg:text-sm uppercase cursor-pointer ${
                isPodcast ? "text-[#d3cdcd]" : "text-[#d3cdcd]"
              }`}
            >
              SIGN UP
            </p>
          </Link> */}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <p
                className={`text-xs lg:text-sm uppercase cursor-pointer ${
                  isPodcast ? "text-[#d3cdcd]" : "text-[#d3cdcd]"
                }`}
              >
                Sign In
              </p>
            </DialogTrigger>
            <DialogContent
              className="p-4 w-full lg:max-w-xl h-full lg:h-auto z-[100]"
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <Card className="w-full h-full max-h-[600px] p-0 shadow-none border-none">
                <CardHeader>
                  <div className="relative w-24 h-24 mx-auto mb-5">
                    <Image
                      src="/Asset 4.svg"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
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
                          onCloseModal={() => {
                            setOpen(false);
                          }}
                        />
                      </CardContent>
                    </TabsContent>
                    <TabsContent value="register">
                      <CardContent className="relative p-0 pt-10">
                        <RegisterForm
                          onRegisterSuccess={() => setOpen(false)}
                          onCloseModal={() => {
                            setOpen(false);
                          }}
                        />
                      </CardContent>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
