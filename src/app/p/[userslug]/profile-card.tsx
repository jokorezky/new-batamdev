"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Globe } from "lucide-react";
import { User } from "@/types/User";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetNewsByUserSlug } from "@/hooks/useNewsMutation";

export function ProfileWithArticles(user: any) {
  const prof: User = user.user;
  const { news } = useGetNewsByUserSlug(user.user.username, 1, 10);

  function cleanText(htmlText: string, maxLength = 150) {
    let cleanText = htmlText.replace(/<[^>]*>/g, " ");

    cleanText = cleanText.replace(/kinigo\.id\s*-\s*/g, "");

    cleanText = cleanText.replace(/\s+/g, " ").trim();

    if (cleanText.length > maxLength) {
      cleanText = cleanText.substring(0, maxLength) + "...";
    }
    return cleanText;
  }
  return (
    <div className="container mx-auto py-2">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <Card className="sticky top-3 overflow-hidden shadow-sm">
            <div className="relative h-28 bg-gradient-to-r from-green-600 to-green-700">
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg rounded-full">
                    <AvatarImage src={prof.picture} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-green-600 text-3xl font-bold text-white">
                      {prof.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            <CardHeader className="pt-20 text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {prof.full_name}
              </CardTitle>
              <p className="text-muted-foreground">@{prof.username}</p>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-gray-600">{prof.bio}</p>
              <div className="space-y-2">
                {/* <div className="flex items-start gap-4">
                                    <Mail className="mt-1 h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <a href={`mailto:${prof.email}`} className="text-gray-700 hover:text-blue-600 hover:underline">
                                            {prof.email}
                                        </a>
                                    </div>
                                </div> */}
                {prof.linkedin && (
                  <div className="flex items-start gap-4">
                    <Globe className="mt-1 h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Linkedin</p>
                      <a
                        href={`https://id.linkedin.com/${prof.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {prof.username}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-2/3">
          <Card className="shadow-none border-none backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-wide">
                🚀 Latest Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {news.length === 0 ? (
                <div className="text-center py-10 text-gray-500 italic">
                  ✨ <span className="font-semibold">{prof.full_name} </span>
                  belum membagikan artikel — tunggu kejutan inspirasinya! 🚀
                </div>
              ) : (
                news.map((article) => (
                  <article
                    key={article._id}
                    className="group cursor-pointer rounded-xl border border-gray-100 hover:border-green-500/40 hover:shadow-xl transition duration-300 bg-white/80 backdrop-blur-md p-5 space-y-3"
                  >
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>
                        {format(
                          new Date(article.createdAt),
                          "h:mm a - MMMM d, yyyy",
                          {
                            locale: id,
                          }
                        )}
                      </span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-green-700 transition">
                      <Link
                        href={`/${article.url}`}
                        className="hover:underline"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600">
                      {cleanText(article.content, 170)}
                    </p>
                    <div>
                      <Link
                        href={`/${article.url}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800 transition"
                      >
                        Selengkapnya
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </CardContent>

            {/* <CardFooter className="border-t p-4">
                            <Button variant="outline" className="w-full hover:bg-blue-50 hover:border-blue-500 transition">
                                View All Articles
                            </Button>
                        </CardFooter> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
