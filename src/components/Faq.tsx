"use client";
import React, { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqDto } from "@/types/Faq";

interface TypeFaq {
  data: FaqDto;
}
const Faq: FC<TypeFaq> = ({ data }) => {
  return (
    <div>
      <div className="flex items-center justify-center pb-2">
        <div className="w-full md:w-1/2 text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
              Frequently Asked Question
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">
        <div className="col-span-1 md:col-span-12 bg-gray-50 px-5 rounded-md">
          <Accordion type="single" collapsible className="w-full">
            {data?.populatedFaq.map((faq) => (
              <AccordionItem
                key={faq._id}
                value={faq._id}
                className="border-b border-gray-200 last:border-none"
              >
                <AccordionTrigger className="no-underline hover:no-underline text-xl font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answered}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
