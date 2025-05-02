import { auth } from "@/auth";
import { profile } from "@/features/profile";
import { ProfileContent } from "@/features/profile/components/ProfileContent";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const userData = await profile.getUserInfo(session.user.email ?? "");

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileContent session={session} userId={userData?.data?.id ?? ""} />
    </div>
  );
}
