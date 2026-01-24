"use client";
import SocialShare from "@/components/SocialShare";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Layers } from "lucide-react";

type userType = {
  full_name: string;
};
interface NewsItemsType {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  userId: userType;
  createdAt: string;
}
type CardProps = {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  userId: userType;
  createdAt: string;
  newsItems: NewsItemsType[];
};
type DataDetail = {
  data: CardProps;
};
const StoryTopWidgetDetailWithProfile: React.FC<DataDetail> = ({ data }) => {
  return (
    <div className="relative w-full min-h-max lg:min-h-[calc(100vh-32rem)] bg-green-700 flex">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:2vw_2vw] opacity-30" />
      <div className="w-full lg:flex items-start justify-normal lg:justify-between">
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div className="w-full px-5 lg:px-32 relative flex flex-col justify-between">
            <div className="block top-14 space-y-5 lg:space-y-5 my-5 lg:mt-14">
              <div className="flex items-start w-full">
                <div className="hidden md:flex w-full">
                  <SocialShare />
                </div>
              </div>
              <div className="flex gap-6 flex-shrink-0">
                <div className="w-1/6 shrink-0 hidden md:block">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-green-800 rounded-md transform rotate-2 transition-all duration-300 group-hover:rotate-3"></div>
                    <div className="absolute -inset-1 bg-green-600 rounded-md transform -rotate-1 transition-all duration-300 group-hover:-rotate-2 opacity-70"></div>
                    <AspectRatio
                      ratio={1}
                      className="relative rounded-md bg-muted z-10"
                    >
                      <img
                        src={data?.thumbnail_url}
                        alt="Story Image"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </AspectRatio>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-white uppercase relative w-fit text-center after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px] after:border-gray-300">
                    {data?.category}
                  </p>
                  <div className="justify-between flex items-center">
                    <h3 className="text-2xl lg:text-4xl font-bold font-nexaHeavy text-white leading-tight pr-6 flex-grow">
                      {data?.title}
                    </h3>
                    <div className="w-1/4 shrink-0 md:hidden block">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-green-800 rounded-md transform rotate-2 transition-all duration-300 group-hover:rotate-3"></div>
                        <div className="absolute -inset-1 bg-green-600 rounded-md transform -rotate-1 transition-all duration-300 group-hover:-rotate-2 opacity-70"></div>
                        <AspectRatio
                          ratio={1}
                          className="relative rounded-md bg-muted z-10"
                        >
                          <img
                            src={data?.thumbnail_url}
                            alt="Story Image"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <p className="text-white text-xs lg:text-xl">
                      {format(
                        new Date(data.createdAt),
                        "h:mm a - MMMM d, yyyy",
                        {
                          locale: id,
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layers className="h-3 w-3 text-white" />
                    <p className="text-white text-xs capitalize lg:text-sm">
                      {data.newsItems.length} stories
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:absolute md:left-0 md:bottom-0 md:w-[45vw] md:h-[calc(100vh-28.5rem)] lg:h-[calc(100vh-13.5rem)] md:bg-green-700 md:opacity-80 md:-z-10 md:top-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryTopWidgetDetailWithProfile;
