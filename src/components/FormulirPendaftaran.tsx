"use client";

import { useState, useEffect, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/Form";
import { Loader2 } from "lucide-react";
import { InputField } from "@/components/InputField";
import { TextareaField } from "@/components/TextareaField";
import { useRouter } from "next/navigation";
import { useCreateStudentEnrollment } from "@/hooks/useStudentEnrollmentMutation";
import { useOtpValidationMutation } from "@/hooks/useOtpValidationMutation";
import propinsiData from "@/constants/propinsi.json";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  emailSchema,
  fullnameSchema,
  stringSchema,
  birthDateSchema,
} from "@/lib/validationSchemas";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { SelectBoxField } from "./SelectBoxField";
import { DatePickerField } from "./DatePickerField";
import { CheckboxField } from "./CheckboxField";
import { LearningPathDto } from "@/types/LearningPath";

const registerSchema = z.object({
  email: emailSchema,
  fullName: fullnameSchema,
  province: stringSchema,
  city: stringSchema,
  jadwalBiaya: stringSchema,
  birthDate: birthDateSchema,
  gender: stringSchema,
  phone: stringSchema,
  address: stringSchema,
  referralSource: stringSchema,
  motivation: stringSchema,
  acceptTerms: z.literal(true, {
    errorMap: () => ({
      message: "Anda harus menyetujui syarat dan ketentuan.",
    }),
  }),
  learningProgram: stringSchema,
});

type FormulirPendaftaranInputs = z.infer<typeof registerSchema>;

interface TypeFormulirPendaftaran {
  data: LearningPathDto;
  jadwalId: string;
}

const FormulirPendaftaran: FC<TypeFormulirPendaftaran> = ({
  data,
  jadwalId,
}) => {
  const dispatch = useDispatch();
  const {
    createEnrollStudent,
    data: responseCreateEnroll,
    loading: loadingCreate,
    error,
  } = useCreateStudentEnrollment();
  const router = useRouter();
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");
  const [kotaOptions, setKotaOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPassword, setUserPassword] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const { validateOtp, loading: otpLoading } = useOtpValidationMutation();
  const { loginUser } = useLoginMutation();
  const form = useForm<FormulirPendaftaranInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      province: "",
      city: "",
      jadwalBiaya: jadwalId,
      learningProgram: data._id,
    },
  });

  const onSubmit = async (payload: FormulirPendaftaranInputs) => {
    payload.learningProgram = data._id;
    await createEnrollStudent(payload);
  };

  useEffect(() => {
    if (responseCreateEnroll) {
      form.reset();
      router.push("/payment");
    }
  }, [responseCreateEnroll, form, router]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      const otpCode = otp.join("");
      if (userEmail && userPassword) {
        const validate = async () => {
          const isValid = await validateOtp(userEmail, otpCode);
          if (isValid) {
            const response = await loginUser(userEmail, userPassword);
            Cookies.set("token", response, { expires: 7 });
            dispatch(login());
            window.location.href = "/register/success";
          }
        };
        validate();
      }
    }
  }, [otp, userEmail, validateOtp, router]);
  useEffect(() => {}, [form.formState.errors]);

  useEffect(() => {}, [form.watch()]);

  const handleProvinsiChange = (provinsi: string | undefined) => {
    setSelectedProvinsi(provinsi ?? "");
    const selected = propinsiData.find((p) => p.nama === (provinsi ?? ""));
    const cities = selected
      ? selected.city.map((c) => ({ label: c, value: c }))
      : [];
    setKotaOptions(cities);
    form.setValue("city", "");
  };

  const provinceWatch = form.watch("province");

  useEffect(() => {
    handleProvinsiChange(provinceWatch);
  }, [provinceWatch]);

  useEffect(() => {
    if (jadwalId) {
      form.setValue("jadwalBiaya", jadwalId);
    }
  }, [jadwalId]);

  return (
    <div className="w-full flex flex-col gap-6">
      <Card className="flex-1 shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-md">{data?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form form={form} onSubmit={() => form.handleSubmit(onSubmit)()}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <div className="flex flex-col space-y-3 col-span-2 w-full md:col-span-1">
                  <div className="space-y-1">
                    <SelectBoxField
                      label="Pilih Batch"
                      name="jadwalBiaya"
                      options={data?.populatedJadwalBiayas.map((p) => ({
                        label: p.name,
                        value: p._id,
                      }))}
                      isRequired={true}
                    />
                    <p className="text-[10px]">
                      Pilih batch yang akan di ikuti
                    </p>
                  </div>
                  <div className="space-y-1">
                    <InputField
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      // isDisabled
                    />
                    <p className="text-[10px]">
                      Anda dapat mengubah alamat email melalui menu Akun.
                    </p>
                  </div>
                  <DatePickerField
                    label="Tanggal Lahir"
                    name="birthDate"
                    isRequired={true}
                  />
                  <SelectBoxField
                    label="Propinsi"
                    name="province"
                    options={propinsiData.map((p) => ({
                      label: p.nama,
                      value: p.nama,
                    }))}
                    isRequired={true}
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="space-y-1">
                    <InputField
                      label="Nama Lengkap"
                      name="fullName"
                      placeholder="Nama Lengkap"
                      type="text"
                      isRequired
                    />
                    <p className="text-[10px]">
                      Nama asli Anda, nama akan digunakan pada data sertifikat
                    </p>
                  </div>
                  <SelectBoxField
                    label="Jenis Kelamin"
                    name="gender"
                    options={[
                      { label: "Laki Laki", value: "Laki Laki" },
                      { label: "Perempuan", value: "Perempuan" },
                    ]}
                    isRequired={true}
                  />
                  <div className="pt-5">
                    <InputField
                      label="Nomor HP"
                      name="phone"
                      placeholder=""
                      type="number"
                    />
                  </div>
                  <SelectBoxField
                    label="Kota Asal"
                    name="city"
                    options={kotaOptions}
                    isRequired={true}
                    isDisabled={!selectedProvinsi}
                  />
                </div>
                <div className="flex flex-col col-span-2 w-full space-y-3">
                  <TextareaField
                    label="Alamat Lengkap"
                    name="address"
                    placeholder=""
                    isRequired={true}
                  />
                  <SelectBoxField
                    label="Dari Mana Mengetahui Program Ini"
                    name="referralSource"
                    options={[
                      { label: "Facebook", value: "Facebook" },
                      { label: "Google", value: "Google" },
                      { label: "Instagram", value: "Instagram" },
                      { label: "Teman / Keluarga", value: "Temankeluarga" },
                      { label: "Alumni", value: "Alumni" },
                      { label: "Employee", value: "Employee" },
                    ]}
                    isRequired={true}
                  />
                  <SelectBoxField
                    label="Apa Motivasi Kamu Mengikuti Program Ini?"
                    name="motivation"
                    options={[
                      { label: "Switch Career", value: "Switch Career" },
                      { label: "Upgrade Skill", value: "Upgrade Skill" },
                      {
                        label: "Mendapatkan Pekerjaan",
                        value: "Mendapatkan Pekerjaan",
                      },
                      {
                        label: "Untuk Menambah Wawasan",
                        value: "Untuk Menambah Wawasan",
                      },
                      { label: "Lainnya", value: "Lainnya" },
                    ]}
                    isRequired={true}
                  />
                  <div className="py-4">
                    <CheckboxField
                      label="Dengan mengirim formulir ini saya menyetujui Syarat dan Ketentuan untuk mengikuti program yang saya daftarkan."
                      name="acceptTerms"
                      isRequired={true}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      className="font-bold py-6 text-md"
                    >
                      {loadingCreate && <Loader2 className="animate-spin" />}
                      Kirim Formulir
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulirPendaftaran;
