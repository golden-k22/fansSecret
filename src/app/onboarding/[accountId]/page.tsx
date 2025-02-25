"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {HandleCredits} "fs/promises";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sizeMap: { [key: string]: string } = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
};


const ReferralForm = ({ params }: any) => {
  const user = params.accountId
  const [role, setRole] = useState("fan");
  const router = useRouter();

  return (
    <>
      <p className="text-3xl tracking-tighter my-5 font-medium text-center">
        Role
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (role) {
            role == "creater"
              ? router.push(`/onboarding/${user}/creater`)
              : router.push(`/onboarding/${user}/fan`);
          }
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Set Your Role!</CardTitle>
            <CardDescription>
              Select a role through which you want to continue using the
              application.
            </CardDescription>
            <RadioGroup
              defaultValue="fan"
              value={role}
              style={{ marginTop: "15px" }}
              onValueChange={(value: "creater" | "fan") => setRole(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fan" id="fan" />
                <Label htmlFor="fan">Fan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creater" id="creater" />
                <Label htmlFor="creater">Creater</Label>
              </div>
            </RadioGroup>
          </CardHeader>

          <CardFooter>
            <Button className="w-full" type="submit">
              Set
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
export default ReferralForm;