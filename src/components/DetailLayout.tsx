"use client";
import React, { useState, useEffect } from "react";
import { BrainIcon, UsersIcon, LinkIcon, RocketIcon } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useNewsQuery } from "@/hooks/useNewsMutation";
import parse, { domToReact } from "html-react-parser";
import { Button } from "@/components/ui/button";
import createDOMPurify from "dompurify";
import { Badge } from "@/components/ui/badge";
import Script from "next/script";

type userType = { full_name: string };
type tags = { label: string };
type CardProps = {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  userId: userType;
  createdAt: string;
  source_link: string;
  source: string;
  tags: tags[];
};
type DataDetail = { data: CardProps };

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(typeof code === "string" ? code : JSON.stringify(code, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative my-4">
      <Button onClick={copyToClipboard} className="absolute right-2 top-2 py-0 h-6">
        {copied ? "Copied!" : "Copy"}
      </Button>
      <pre className="bg-[#0f0f0f] text-[#e0e0e0] p-4 rounded-lg overflow-x-auto font-mono">
        {code}
      </pre>
    </div>
  );
};

const DetailLayout: React.FC<DataDetail> = ({ data }) => {
  const [sanitizedContent, setSanitizedContent] = useState("");
  const [adInserted, setAdInserted] = useState(false);
  const [page] = useState(1);
  const t = useTranslations();
  const { news: mostPopularNews } = useNewsQuery(page, 6, { isGetTrending: true });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = createDOMPurify(window);
      setSanitizedContent(DOMPurify.sanitize(data?.content || ""));
    }
  }, [data?.content]);

  const options = {
    replace: (domNode: any) => {
      if (!adInserted && domNode.type === "tag" && domNode.name === "p") {
        const index = domNode.parent?.children?.indexOf(domNode) || 0;
        if (index === 2) {
          setAdInserted(true);
          return (
            <>
              <p className="mt-4">{domToReact(domNode.children, options)}</p>
              <div className="my-6 flex justify-center">
                <Script strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1371677224854819" crossOrigin="anonymous" />
                <ins className="adsbygoogle" style={{ display: "block", textAlign: "center" }} data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-1371677224854819" data-ad-slot="4115406495"></ins>
                <Script id="adsense-init" strategy="afterInteractive">{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
              </div>
            </>
          );
        }
      }
      if (domNode.type === "tag" && domNode.name === "p") return <p className="mt-4">{domToReact(domNode.children, options)}</p>;
      if (domNode.type === "tag" && domNode.name === "pre") return <CodeBlock code={domToReact(domNode.children) as string} />;
      if (domNode.type === "tag" && domNode.name === "ul") return <ul className="pl-6 mt-2">{domToReact(domNode.children, options)}</ul>;
      if (domNode.type === "tag" && domNode.name === "code") return <code className="bg-[#1a1a1a] px-1 rounded">{domToReact(domNode.children, options)}</code>;
    },
  };

  return (
    <div className="min-h-screen flex justify-center pb-16 px-4">
      <div className="w-full max-w-3xl rounded-2xl pb-8 space-y-8">

        {sanitizedContent && <div>{parse(sanitizedContent, options)}</div>}

        {data?.source_link && (
          <div className="flex items-center gap-2 mt-4">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <p>
              Sumber:{" "}
              <a href={data.source_link} target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-300">
                {data.source}
              </a>
            </p>
          </div>
        )}

        {data?.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {data.tags.map((tag) => (
              <Badge key={tag.label} className="capitalize text-black">
                #{tag.label}
              </Badge>
            ))}
          </div>
        )}
        {data?.source_link && (
          <Alert>
            <div className="flex items-start gap-3">
              <BrainIcon className="w-5 h-5 text-blue-400" />
              <p className="text-sm">
                Konten ini dihasilkan dengan bantuan AI berdasarkan sumber terpercaya.
              </p>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <UsersIcon className="w-5 h-5 text-green-400" />
              <p className="text-sm">Tim editor memastikan akurasi sebelum dipublikasikan.</p>
            </div>
          </Alert>
        )}
        <div className="w-full mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recommended reads
          </h3>
          <div className="flex flex-col space-y-3">
            {mostPopularNews.map((item) => (
              <Link
                key={item._id}
                href={`/${item?.url}`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white"
              >
                <p className="text-gray-900 font-medium">{item.title}</p>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
                  <RocketIcon className="w-4 h-4 text-gray-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailLayout;
