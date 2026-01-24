"use client";

import React, { useState } from "react";
import { Combobox } from "@/components/Combobox";
import { useAdminCommunities } from "@/hooks/use-community";
import {
  useRegisterCommunityDomain,
  useVerifyCommunityDomain,
  useBatchDomainVerificationStatus,
} from "@/hooks/use-domain";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { domainSchema } from "@/schema/domain";
import { IDomainInput } from "@/types/Domain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type DomainFormValues = z.infer<typeof domainSchema>;

export default function DomainRegistrationForm() {
  const { registerDomain, error } = useRegisterCommunityDomain();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
      communityId: "",
    },
  });

  const {
    control,
    formState: { errors },
  } = formMethods;

  const { communities, loading: loadingCommunities } = useAdminCommunities();
  const communityIds = communities.map((c) => c.value);

  const { statuses, loading: loadingStatuses } =
    useBatchDomainVerificationStatus(communityIds);

  const { verifyDomain, loading: loadingVerify } = useVerifyCommunityDomain();
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleDomainRegistration = async (formData: IDomainInput) => {
    setIsSubmitting(true);
    try {
      await registerDomain(formData.communityId, formData.domain);
      setSelectedCommunityId(formData.communityId);
      setShowVerificationForm(true);
    } catch (error) {
      console.error("Domain registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyDomain(selectedCommunityId, verificationCode);
      alert("Domain verified successfully!");
      setShowVerificationForm(false);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const verifiedDomains = statuses.filter((status) => status.isVerified);
  const hasVerifiedDomains = verifiedDomains.length > 0;

  if (loadingCommunities || loadingStatuses) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!hasVerifiedDomains && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Tambahkan Domain Sebelum Integrasi</AlertTitle>
          <AlertDescription>
            Sebelum melakukan integrasi dengan <strong>Kinigo</strong>, Anda
            harus mendaftarkan domain Anda terlebih dahulu. Domain ini
            dibutuhkan untuk mengaktifkan mekanisme keamanan autentikasi.
          </AlertDescription>
        </Alert>
      )}

      {hasVerifiedDomains && (
        <div className="space-y-3">
          <h1 className="font-medium">Domain Tervalidasi</h1>
          <div className="grid gap-4 space-y-3">
            {verifiedDomains.map((status) => (
              <Card
                key={status.communityId}
                className="border-green-200 bg-green-50"
              >
                <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-medium">
                      {communities.find((c) => c.value === status.communityId)
                        ?.label || "Unknown Community"}
                    </h4>
                    <p className="text-sm text-green-600">{status.domain}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {status.verifiedAt
                      ? `Tervalidasi pada ${new Date(
                          status.verifiedAt
                        ).toLocaleString()}`
                      : "Tanggal validasi tidak tersedia"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {(!hasVerifiedDomains || showVerificationForm) && (
        <>
          {!showVerificationForm && (
            <Form form={formMethods} onSubmit={handleDomainRegistration}>
              <div className="grid grid-cols-1 md:grid-cols-[4fr_4fr] gap-8">
                <div className="space-y-2">
                  <label className="text-sm md:text-md text-slate-600 md:col-span-3">
                    Community
                  </label>
                  <Controller
                    name="communityId"
                    control={control}
                    render={({ field }) => (
                      <Combobox
                        items={communities.map((community) => ({
                          value: community.value,
                          label: community.label,
                        }))}
                        placeholder="Select a community"
                        value={field.value}
                        onChange={field.onChange}
                        className={cn(
                          "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none",
                          "focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                          errors.communityId && "border border-red-500"
                        )}
                      />
                    )}
                  />
                  {errors.communityId && (
                    <p className="text-red-500 text-sm">
                      {errors.communityId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm md:text-md text-slate-600">
                    Domain Name
                  </label>
                  <Controller
                    name="domain"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="example.com"
                        className={cn(
                          "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none w-full",
                          "focus:ring-0 focus:ring-offset-0 focus:outline-none",
                          errors.domain && "border border-red-500"
                        )}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.domain && (
                    <p className="text-red-500 text-sm">
                      {errors.domain.message}
                    </p>
                  )}
                </div>

                <div className="mt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-white"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Mendaftarkan..." : "Register Domain"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
          {showVerificationForm && (
            <Card>
              <CardHeader>
                <h3 className="font-medium">Verifikasi Domain</h3>
                <p className="text-sm text-muted-foreground">
                  Masukkan kode verifikasi yang telah dikirim ke email Anda
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyDomain} className="space-y-4">
                  <Input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Paste the code from your email"
                    disabled={loadingVerify}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={loadingVerify}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {loadingVerify && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loadingVerify ? "Memverifikasi..." : "Verifikasi Domain"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowVerificationForm(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
