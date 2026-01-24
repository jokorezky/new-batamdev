"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/Form";
import { InputField } from "@/components/InputField";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";

// Define validation schema using zod
const createCompanySchema = z.object({
  name: z.string().min(2, { message: "Company name is required." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters long." }),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only digits." })
    .min(10, { message: "Phone number must be at least 10 digits." }),
});

type CreateCompanyInputs = z.infer<typeof createCompanySchema>;

const CreateCompanyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateCompanyInputs>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      address: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: CreateCompanyInputs) => {
    setLoading(true);
    try {
      const response = await api.post("/users", data);
      if (response.status === 201) {
        router.push("/dashboard"); // Redirect on successful creation
      }
    } catch (error) {
      console.error("Error creating company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField
        label="Company Name"
        name="name"
        placeholder="Enter company name"
        type="text"
      />
      <InputField
        label="Address"
        name="address"
        placeholder="Enter address"
        type="text"
      />
      <InputField
        label="Phone Number"
        name="phoneNumber"
        placeholder="Enter phone number"
        type="text"
      />
      <Button
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary-dark"
        disabled={loading}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Company
      </Button>
    </Form>
  );
};

export default CreateCompanyPage;
