import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import OnboardingScreen from "@/components/onboarding/onboarding-screen/OnboardingScreen";
import prisma from "@/db/prisma";

export default async function Home() {
  let onBoarded = false;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("real user id: app\\page", user)
  console.log("real user id: app\\page", user?.id)
  if (user) { //gmail exist?
    const onboardedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    console.log("EXISTING ID: app\\page", user.id);
    onBoarded = (onboardedUser?.isVerified || onboardedUser?.isVerifySubmitted) ?? false;
    console.log("onBoarded: app\\page", onBoarded);
    console.log("this is user", user);
  } else {
    console.log("No user found");
  }

  return (
    <main>
      {user ? (
        !onBoarded ? (
          <OnboardingScreen user={user.id} />
        ) : (
          <HomeScreen />
        )
      ) : (
        <AuthScreen />
      )}
    </main>
  );
}




