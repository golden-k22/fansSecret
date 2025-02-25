"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useRouter } from "next/navigation";
const ReferralForm = ({ user }: any) => {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <>
      <p className="text-3xl tracking-tighter my-5 font-medium text-center">
        Onboarding
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/onboarding/${user}`);
          router.refresh();
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Referral Link/Code</CardTitle>
            <CardDescription>
              Enter referral link/code below if any
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Referral Code/Link </Label>
              <Input
                id="name"
                type="text"
                placeholder="Referral Link/Code"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            {
              name !== "" ?
                <Button className="w-full" type="submit">
                  Submit
                </Button>
                : <Button className="w-full" type="submit">
                  Skip
                </Button>
            }
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
export default ReferralForm;
