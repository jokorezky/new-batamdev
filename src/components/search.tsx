import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchType {
  placeholder: string;
  textColor?: string;
}

const Search: FC<SearchType> = ({ placeholder, textColor = "text-black" }) => {
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute left-3 text-gray-400" size={18} />
      <Input
        type="search"
        placeholder={placeholder}
        className={`md:w-[100px] lg:w-[230px] shadow-none pl-10 ${textColor}`}
      />
    </div>
  );
};

export default Search;
