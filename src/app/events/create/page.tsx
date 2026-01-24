"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/Form";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Combobox } from "@/components/Combobox";
import { useAdminCommunities } from "@/hooks/use-community";
import { useListCategoriesEvent } from "@/hooks/use-category";
import { HostAsyncMultiSelect } from "@/components/HostAsyncMultiSelect";
import { CommunityAsyncSelect } from "@/components/ListCommunityAsyncMultiSelect";
import { TimezoneSelector } from "@/components/TimezoneSelector";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import TiptapEditorInput from "@/components/TiptapEditor";
import { JSONContent } from "@tiptap/core";
import { uploadFile } from "@/hooks/uploadFile";
import { MediaFolderType } from "@/types/MediaFolderType";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarIcon, PencilIcon, ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddEvent } from "@/hooks/events";
import { z } from "zod";
import Image from "next/image";
import { IEventInput } from "@/types/Events";
import { eventSchema } from "@/schema/events";
import { activityTypes, bankTypes, formatTypes } from "@/constants/events";

type EventFormInputs = z.infer<typeof eventSchema>;

export default function EventCreate() {
  const formMethods = useForm<EventFormInputs>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      collaboratingCommunities: [],
      type_actifity: "",
      category: "",
      format: "",
      title: "",
      startDate: undefined,
      endDate: undefined,
      startTime: "",
      endTime: "",
      timezone: "GMT+07:00",
      address: "",
      location_map: "",
      capacity: undefined,
      isApprovalRequired: false,
      isFree: true,
      content: "",
      thumbnail_url: "",
      bank_account: "",
      account_number: "",
      account_name: "",
      ticket_price: "",
      communityId: "",
      hosts: [],
      useRegistrationLink: false,
      registration_link: undefined,
    },
  });

  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = formMethods;
  const { toast } = useToast();
  const { addEvent } = useAddEvent();
  const router = useRouter();
  const { communities, loading: loadingCommunities } = useAdminCommunities();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useListCategoriesEvent({
    limit: 10,
  });

  const categoryTypes =
    categories?.map((category) => ({
      value: category.url,
      label: category.name,
    })) || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail_url", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onTextEditorInput = (value: JSONContent) => {
    const description = JSON.stringify(value);
    setValue("content", description);
  };

  const onSubmit = async (data: EventFormInputs) => {
    setIsLoading(true);
    try {
      let thumbnailUrl = "";
      if (data.thumbnail_url instanceof File) {
        const result = await uploadFile(
          data.thumbnail_url,
          MediaFolderType.EVENT
        );
        thumbnailUrl = result.data;
      } else if (typeof data.thumbnail_url === "string") {
        thumbnailUrl = data.thumbnail_url;
      }

      const formDataWithImage: IEventInput = {
        type_actifity: data.type_actifity,
        title: data.title,
        image: thumbnailUrl,
        category: data.category,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        startTime: data.startTime,
        endTime: data.endTime,
        timezone: data.timezone,
        format: data.format,
        address: data.address,
        location_map: data.location_map || "",
        capacity: data.capacity || 0,
        isApprovalRequired: data.isApprovalRequired || false,
        isFree: data.isFree,
        content: data.content,
        bank_account: data.bank_account || "",
        account_number: data.account_number || "",
        account_name: data.account_name || "",
        ticket_price: data.ticket_price || "",
        communityId: data.communityId || "",
        hosts: data.hosts.map((host) => host.value),
        collaboratingCommunities: data.collaboratingCommunities.map(
          (c: any) => c.value
        ),
        useRegistrationLink: data.useRegistrationLink || false,
        registration_link: data.useRegistrationLink
          ? data.registration_link
          : undefined,
      };

      await addEvent(formDataWithImage);
      toast({
        variant: "default",
        title: "Berhasil",
        description: "Event Anda telah berhasil dibuat.",
      });
      router.push("/settings/events");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Peringatan",
        description: "Event Anda tidak dapat dibuat. Silakan coba lagi.",
      });
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFree = watch("isFree");
  const useRegistrationLink = watch("useRegistrationLink");

  return (
    <Form form={formMethods} onSubmit={onSubmit}>
      <div className="w-full min-h-screen py-4 md:py-10 bg-gray-50 px-4 sm:px-6 lg:px-48">
        <div className="w-full mx-auto relative">
          <div className=" max-w-[1440px] w-full mx-auto px-2 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Left Section - Image Upload */}
              <div className="md:col-span-4">
                <AspectRatio ratio={16 / 12} className="bg-muted">
                  <Card className="h-full flex justify-center items-center shadow-none border-none">
                    <CardContent className="flex flex-col items-center p-4 w-full h-full">
                      {imagePreview ? (
                        <div className="w-full h-full relative">
                          <Image
                            src={imagePreview}
                            alt="Event preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setValue("thumbnail_url", undefined as any);
                            }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <div className="flex flex-col items-center justify-center h-full w-full border-2 border-dashed border-gray-300 rounded-lg">
                            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                            <Label className="text-sm font-medium mb-2">
                              Upload Event Image
                            </Label>
                            <Button
                              variant="outline"
                              type="button"
                              onClick={triggerFileInput}
                              className="w-3/4"
                            >
                              Choose File
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">
                              JPG, PNG up to 5MB
                            </p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </AspectRatio>
              </div>

              <div className="md:col-span-8">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Controller
                      name="type_actifity"
                      control={control}
                      render={({ field }) => (
                        <Combobox
                          items={activityTypes}
                          placeholder="Type of Activity"
                          value={field.value}
                          onChange={field.onChange}
                          className={cn(
                            "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                            errors.type_actifity && "border border-red-500"
                          )}
                        />
                      )}
                    />
                    <Controller
                      name="format"
                      control={control}
                      render={({ field }) => (
                        <Combobox
                          items={formatTypes}
                          placeholder="Format"
                          value={field.value}
                          onChange={field.onChange}
                          className={cn(
                            "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                            errors.format && "border border-red-500"
                          )}
                        />
                      )}
                    />
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Combobox
                          items={categoryTypes}
                          placeholder="Category"
                          value={field.value}
                          onChange={field.onChange}
                          className={cn(
                            "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                            errors.category && "border border-red-500"
                          )}
                        />
                      )}
                    />
                    <Controller
                      name="communityId"
                      control={control}
                      render={({ field }) => (
                        <Combobox
                          items={communities.map((c) => ({
                            value: c.value,
                            label: c.label,
                          }))}
                          placeholder={
                            loadingCommunities
                              ? "Loading communities..."
                              : "Select Community"
                          }
                          value={field.value}
                          onChange={field.onChange}
                          className={cn(
                            "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                            errors.communityId && "border border-red-500"
                          )}
                          disabled={loadingCommunities}
                        />
                      )}
                    />
                    <Controller
                      name="hosts"
                      control={control}
                      render={({ field }) => (
                        <HostAsyncMultiSelect
                          label=""
                          name="hosts"
                          field={field}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Input
                      id="event-name"
                      placeholder="Enter event name here"
                      {...register("title")}
                      className={cn(
                        "px-5 py-10 text-lg sm:text-xl md:text-3xl font-semibold",
                        "bg-transparent border-none outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none",
                        errors.title && "text-red-500"
                      )}
                    />
                  </div>

                  {/* Start & End Time */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
                    <div
                      className={cn(
                        "md:col-span-8 bg-gray-100 px-3 sm:px-4 py-2 rounded-xl grid place-items-center max-h-auto md:max-h-[100px]"
                      )}
                    >
                      <div className="relative py-2 group w-full">
                        <div
                          className="flex flex-col items-start mb-1 group-last:before:hidden 
                        before:absolute before:left-0 before:h-full before:w-[2px]
                        before:bg-[length:2px_4px] before:bg-repeat-y
                        before:bg-gradient-to-b before:from-slate-400 before:to-transparent before:via-slate-400
                        before:self-start before:-translate-x-1/2 before:translate-y-1 
                        after:absolute after:left-0 after:w-3 after:h-3 after:bg-gray-400 
                        after:border-1 after:box-content after:border-slate-50 after:rounded-full 
                        after:-translate-x-1/2 after:translate-y-1"
                        >
                          <div className="ml-2 -mt-2 grid grid-cols-1 md:grid-cols-12 gap-2 items-center w-full">
                            <div className="ml-3 text-sm md:text-md text-slate-600 md:col-span-3">
                              Start
                            </div>
                            <div className="md:col-span-9 w-full">
                              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                                <Controller
                                  name="startDate"
                                  control={control}
                                  render={({ field }) => (
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full text-left py-4 md:py-4 px-3 font-normal bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                            !field.value &&
                                              "text-muted-foreground",
                                            errors.startDate &&
                                              "border border-red-500"
                                          )}
                                        >
                                          {field.value
                                            ? format(field.value, "EEE, MMM d")
                                            : "Pick a date"}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0 border-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={(date) => {
                                            field.onChange(date);
                                          }}
                                          disabled={(date) => date < new Date()}
                                          initialFocus
                                          className="border-0"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  )}
                                />
                                <Input
                                  type="time"
                                  {...register("startTime")}
                                  className={cn(
                                    "w-full py-4 block md:py-4 px-3 bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                    errors.startTime && "border border-red-500"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative py-2 group w-full">
                        <div
                          className="flex flex-col items-start mb-1 group-last:before:hidden 
                        before:absolute before:left-0 before:h-full before:w-[2px]
                        before:bg-[length:2px_4px] before:bg-repeat-y
                        before:bg-gradient-to-b before:from-slate-400 before:to-transparent before:via-slate-400
                        before:self-start before:-translate-x-1/2 before:translate-y-1
                        after:absolute after:left-0 after:w-2 after:h-2 after:bg-gray-100 
                        after:border-2 after:box-content after:border-slate-500 after:rounded-full 
                        after:-translate-x-1/2 after:translate-y-1"
                        >
                          <div className="ml-2 -mt-2 grid grid-cols-1 md:grid-cols-12 gap-2 items-center w-full">
                            <div className="ml-3 text-sm md:text-md text-slate-600 md:col-span-3">
                              End
                            </div>
                            <div className="md:col-span-9 w-full">
                              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                                <Controller
                                  name="endDate"
                                  control={control}
                                  render={({ field }) => (
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full text-left py-4 md:py-4 px-3 font-normal bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                            !field.value &&
                                              "text-muted-foreground",
                                            errors.endDate &&
                                              "border border-red-500"
                                          )}
                                        >
                                          <span className="truncate">
                                            {field.value
                                              ? format(
                                                  field.value,
                                                  "EEE, MMM d"
                                                )
                                              : "Pick a date"}
                                          </span>
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 flex-shrink-0" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0 border-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={(date) => {
                                            field.onChange(date);
                                          }}
                                          disabled={(date) => date < new Date()}
                                          initialFocus
                                          className="border-0"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  )}
                                />
                                <Input
                                  type="time"
                                  {...register("endTime")}
                                  className={cn(
                                    "w-full py-4 block md:py-4 px-3 bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                    errors.endTime && "border border-red-500"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Controller
                      name="timezone"
                      control={control}
                      render={({ field }) => (
                        <TimezoneSelector
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="justify-start px-3 py-3 text-gray-600"
                        type="button"
                      >
                        {watch("content")
                          ? "Edit Description"
                          : "Add Description Here"}
                        {watch("content") && (
                          <span className="ml-2 text-gray-500 truncate max-w-xs">
                            {(() => {
                              try {
                                const desc = watch("content");
                                if (!desc) return "";
                                const parsed = JSON.parse(desc) as JSONContent;
                                return (
                                  parsed.content?.[0]?.content?.[0]?.text || ""
                                );
                              } catch {
                                return "";
                              }
                            })()}
                          </span>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Event Description</DialogTitle>
                      </DialogHeader>
                      <div>
                        <TiptapEditorInput
                          onChange={(value) => onTextEditorInput(value)}
                          initialContent={
                            watch("content")
                              ? (JSON.parse(watch("content")!) as JSONContent)
                              : undefined
                          }
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              (
                                document.querySelector(
                                  'button[type="submit"]'
                                ) as HTMLButtonElement
                              )?.click();
                              (
                                document.querySelector(
                                  '[role="dialog"] button[aria-label="Close"]'
                                ) as HTMLButtonElement
                              )?.click();
                            }}
                          >
                            Done
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div>
                    <Textarea
                      id="address"
                      placeholder="Enter full address"
                      {...register("address")}
                      className={cn(
                        "bg-gray-100 text-gray-600 border-0 shadow-none outline-none py-4 md:py-5 px-3",
                        errors.address && "border border-red-500"
                      )}
                    />
                  </div>
                  <div>
                    <Textarea
                      id="location_map"
                      rows={1}
                      placeholder="https://maps.google.com/..."
                      {...register("location_map")}
                      className={cn(
                        "bg-gray-100 text-gray-600 border-0 shadow-none outline-none py-4 md:py-5 px-3",
                        errors.location_map && "border border-red-500"
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Event Options</h3>
                    <Card className="bg-gray-100 rounded-xl space-y-4 shadow-none border-none">
                      <CardContent className="p-3 space-y-4 py-4">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-green-700">Tickets</p>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <p className="text-gray-400">
                                  {isFree ? "Free" : "Paid"}
                                </p>
                                <PencilIcon className="h-4 w-4 opacity-50" />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Ticket Settings</DialogTitle>
                                <DialogDescription>
                                  Configure payment options for your event
                                  attendees.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-center justify-between">
                                  <Label
                                    htmlFor="isFree"
                                    className="text-right"
                                  >
                                    Free Event
                                  </Label>
                                  <Controller
                                    name="isFree"
                                    control={control}
                                    render={({ field }) => (
                                      <Switch
                                        id="isFree"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-green-600"
                                      />
                                    )}
                                  />
                                </div>

                                {!isFree && (
                                  <>
                                    <Controller
                                      name="bank_account"
                                      control={control}
                                      render={({ field }) => (
                                        <Combobox
                                          items={bankTypes}
                                          placeholder="Bank Account"
                                          value={field.value}
                                          onChange={field.onChange}
                                          className={cn(
                                            "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                                            errors.bank_account &&
                                              "border border-red-500"
                                          )}
                                        />
                                      )}
                                    />
                                    <Input
                                      id="account_number"
                                      placeholder="Account Number"
                                      {...register("account_number")}
                                      className={cn(
                                        "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                                        errors.account_number &&
                                          "border border-red-500"
                                      )}
                                    />
                                    <Input
                                      id="account_name"
                                      placeholder="Account Name"
                                      {...register("account_name")}
                                      className={cn(
                                        "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                                        errors.account_name &&
                                          "border border-red-500"
                                      )}
                                    />
                                    <Input
                                      id="ticket_price"
                                      placeholder="Ticket Price"
                                      {...register("ticket_price")}
                                      className={cn(
                                        "py-4 md:py-5 px-3 bg-gray-100 border-0 outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none w-full",
                                        errors.ticket_price &&
                                          "border border-red-500"
                                      )}
                                    />

                                    <div className="flex flex-col gap-3">
                                      <Label htmlFor="includes">Includes</Label>
                                      <div className="col-span-3 space-y-2">
                                        <div className="flex items-center gap-3">
                                          <Checkbox
                                            id="terms-1"
                                            className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                          />
                                          <div className="grid gap-2">
                                            <Label htmlFor="terms-1">
                                              Food
                                            </Label>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Checkbox
                                            id="terms-2"
                                            className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                          />
                                          <div className="grid gap-2">
                                            <Label htmlFor="terms-2">
                                              Drink
                                            </Label>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Checkbox
                                            id="terms-3"
                                            className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                          />
                                          <div className="grid gap-3">
                                            <Label htmlFor="terms-3">
                                              Merchandise
                                            </Label>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Checkbox
                                            id="terms-4"
                                            className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                          />
                                          <div className="grid gap-4">
                                            <Label htmlFor="terms-3">
                                              Certificate
                                            </Label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <DialogFooter>
                                <Button type="button" variant="secondary">
                                  Save Settings
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <Separator className="my-2 bg-gray-200" />
                        <div className="flex items-center justify-between w-full">
                          <p className="text-green-700">Capacity</p>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Unlimited"
                              {...register("capacity", {
                                valueAsNumber: true,
                              })}
                              className={cn(
                                "w-24 py-2 px-2 bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                errors.capacity && "border border-red-500"
                              )}
                            />
                          </div>
                        </div>

                        {/* Custom Registration Link Section */}
                        <Separator className="bg-gray-200" />
                        <div className="flex items-center justify-between w-full">
                          <p className="text-green-700">
                            Use Custom Registration Link
                          </p>
                          <div className="flex items-center space-x-2">
                            <Controller
                              name="useRegistrationLink"
                              control={control}
                              render={({ field }) => (
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-green-600"
                                />
                              )}
                            />
                          </div>
                        </div>

                        {useRegistrationLink && (
                          <div className="mt-2">
                            <Input
                              id="registration_link"
                              placeholder="https://example.com/register"
                              {...register("registration_link")}
                              className={cn(
                                "w-full py-3 px-3 bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                errors.registration_link &&
                                  "border border-red-500"
                              )}
                            />
                            {errors.registration_link && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.registration_link.message}
                              </p>
                            )}
                          </div>
                        )}

                        <Separator className="bg-gray-200" />
                        <h3 className="text-md font-medium">
                          Collaboration With
                        </h3>
                        <Controller
                          name="collaboratingCommunities"
                          control={control}
                          render={({ field }) => (
                            <CommunityAsyncSelect
                              label=""
                              name="collaboratingCommunities"
                              field={field}
                            />
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h3 className="text-red-800 font-semibold mb-2">
                        Please fix the following errors:
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {Object.entries(errors).map(([fieldName, error]) => (
                          <li key={fieldName} className="text-red-600 text-sm">
                            {fieldName} {error.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4">
                    <Button
                      type="submit"
                      className="w-full font-bold py-4 md:py-5 text-sm md:text-base text-gray-600"
                      size="lg"
                      variant="secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Event..." : "Create Event"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
