import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileForm from "@/components/Settings/ProfileForm";
import DetailProfileForm from "@/components/Settings/DetailProfileForm";

const LearningPath = () => {
  return (
    <div className="px-4 md:px-36 py-10 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl py-4 font-bold text-black">
            Profil Pengguna
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <CardDescription className="w-full">
            <ProfileForm />
            <DetailProfileForm />
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPath;
