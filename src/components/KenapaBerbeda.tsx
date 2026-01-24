"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const KenapaBerbeda = () => {
  return (
    <div className="pt-10 md:pt-20">
      <div className="flex items-center justify-center pb-2">
        <div className="w-full md:w-1/2 text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
              Kenapa kinigo Berbeda
            </h1>
            <p className="text-sm md:text-base">
              kinigo menawarkan materi terjamin dan fokus pada keterampilan
              praktis yang sesuai dengan standar industri.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 items-center px-4 md:px-28 gap-10 md:gap-20">
        <div className="col-span-1 md:col-span-7 block md:hidden">
          <img
            src="/rect47.png"
            alt="Description of the image"
            className="w-full h-auto object-cover float-right"
          />
        </div>
        <div className="col-span-1 md:col-span-5 bg-gray-50 md:px-5 rounded-md">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="no-underline hover:no-underline text-xl font-bold">
                Kurikulum standar industri global
              </AccordionTrigger>
              <AccordionContent>
                Kurikulum ini disusun berdasarkan tren dan kebutuhan terbaru di
                pasar kerja global, dengan tujuan untuk mempersiapkan peserta
                didik agar siap menghadapi tantangan dan tuntutan industri.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="no-underline hover:no-underline text-xl font-bold">
                Kelas dengan Pendekatan Agile
              </AccordionTrigger>
              <AccordionContent>
                Menggunakan metode agile dalam pembelajaran untuk mengajarkan
                konsep-konsep pengembangan perangkat lunak seperti sprint dan
                iterasi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="no-underline hover:no-underline text-xl font-bold">
                Kelas Praktikal dan Proyek Nyata
              </AccordionTrigger>
              <AccordionContent>
                Menonjolkan bahwa siswa akan belajar melalui proyek nyata, dan
                bukan hanya teori.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-1 md:col-span-7 hidden md:block">
          <img
            src="/rect47.png"
            alt="Description of the image"
            className="w-full h-auto object-cover float-right"
          />
        </div>
      </div>
    </div>
  );
};

export default KenapaBerbeda;
