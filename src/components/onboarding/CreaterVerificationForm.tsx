"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingWithoutImage from "@/components/LoadingWithoutImage";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreatorVerificationForm = ({ user }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState("1");
  const [birthMonth, setBirthMonth] = useState("January");
  const [birthYear, setBirthYear] = useState("");
  const [isAgeAvailable, setIsAgeAvailable] = useState(true);
  const [isIdFileAvailable, setIsIdFileAvailable] = useState(true);
  const [idFile, setIdFile] = useState("");
  const [isSelfieFileAvailable, setIsSelfieFileAvailable] = useState(true);
  const [selfieFile, setSelfieFile] = useState("");
  const [isBirthMonthAvailable, setIsBirthMonthAvailable] = useState(true);
  const [isBirthDateAvailable, setIsBirthDateAvailable] = useState(true);
  const [isBirthYearAvailable, setIsBirthYearAvailable] = useState(true);
  const [isFirstnameAvailable, setIsFirstnameAvailable] = useState(true);
  const [isLastnameAvailable, setIsLastnameAvailable] = useState(true);
  const router = useRouter();

  const isNumber = (str: string) => {
    return !isNaN(parseInt(str));
  }

  const handleOnSubmit = async () => {
    if (!isNumber(age) || parseInt(age) < 18) {
      setIsAgeAvailable(false);
      return;
    }
    if (firstname === "") {
      setIsFirstnameAvailable(false);
      return;
    }
    if (lastname === "") {
      setIsLastnameAvailable(false);
      return;
    }
    if (birthMonth === "") {
      setIsBirthMonthAvailable(false);
      return;
    }
    if (birthDate === "") {
      setIsBirthDateAvailable(false);
      return;
    }
    if (birthYear === "") {
      setIsBirthYearAvailable(false);
      return;
    }
    if (idFile === "") {
      setIsIdFileAvailable(false);
      return;
    }
    if (selfieFile === "") {
      setIsSelfieFileAvailable(false);
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('id', user);
      formData.append('age', age);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('birthday', `${birthMonth} ${birthDate}, ${birthYear}`);
      formData.append('idFile', idFile);
      formData.append('selfieFile', selfieFile);
      const res = await axios.post("/api/user/verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error response:", error.response);
      alert(`Error: ${error.response?.data?.error}`);
    }
  };

  const handleChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
    setIsAgeAvailable(true);
  };

  const handleChangeBirthMonth: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setBirthMonth(event.target.value);
    setIsBirthMonthAvailable(true);
  };

  const handleChangeBirthDate: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setBirthDate(event.target.value);
    setIsBirthDateAvailable(true);
  };

  const handleChangeBirthYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(event.target.value);
    setIsBirthYearAvailable(true);
  };

  const handleChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
    setIsFirstnameAvailable(true);
  };

  const handleChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
    setIsLastnameAvailable(true);
  };

  return (
    <>
      {
        isLoading &&
        <LoadingWithoutImage />
      }
      <p className="text-3xl tracking-tighter my-5 font-medium text-center">
        Creator Verification Form
      </p>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Age Verification</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="age">Enter your Age below</Label>
            <Input
              id="age"
              type="number"
              min="0"
              placeholder="eg. 18"
              required
              value={age}
              onChange={(e) => handleChangeAge(e)}
            />
            {
              !isAgeAvailable &&
              <Label htmlFor="age" style={{ color: "#ff0000" }}>Your age is not valid</Label>
            }
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle className="text-2xl">Id Verification</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="finance">Fullname:</Label>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <Input
                id="firstname"
                placeholder="Firstname"
                required
                style={{ marginRight: "10px" }}
                value={firstname}
                onChange={handleChangeFirstname}
              />
              <Input
                id="lastname"
                placeholder="Lastname"
                required
                value={lastname}
                onChange={handleChangeLastname}
              />
            </div>
            {
              (!isFirstnameAvailable || !isLastnameAvailable) &&
              <Label htmlFor="birthday" style={{ color: "#ff0000" }}> * Fullname required</Label>
            }
            <Label htmlFor="finance">Birthday:</Label>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" style={{ marginRight: "10px" }} value={birthMonth} onChange={ handleChangeBirthMonth}>
                <option style={{ color: "#000" }} value="January">January</option>
                <option style={{ color: "#000" }} value="February">February</option>
                <option style={{ color: "#000" }} value="March">March</option>
                <option style={{ color: "#000" }} value="April">April</option>
                <option style={{ color: "#000" }} value="May">May</option>
                <option style={{ color: "#000" }} value="June">June</option>
                <option style={{ color: "#000" }} value="July">July</option>
                <option style={{ color: "#000" }} value="August">August</option>
                <option style={{ color: "#000" }} value="September">September</option>
                <option style={{ color: "#000" }} value="October">October</option>
                <option style={{ color: "#000" }} value="November">November</option>
                <option style={{ color: "#000" }} value="December">December</option>
              </select>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={birthDate} onChange={handleChangeBirthDate}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((number) => (
                  <option key={number} value={number} style={{ color: "#000" }}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <Input
              id="year"
              type="number"
              min="0"
              placeholder="eg. 1997"
              required
              value={birthYear}
              onChange={handleChangeBirthYear}
            />
            {
              (!isBirthMonthAvailable || !isBirthDateAvailable || !isBirthYearAvailable) &&
              <Label htmlFor="birthday" style={{ color: "#ff0000" }}> * Birthday information required</Label>
            }
          </div>
          <div className="grid gap-2" style={{ marginTop: "20px" }}>
            <Label htmlFor="finance">Upload Passport, ID Card or Driver License:</Label>
            <CldUploadWidget
              signatureEndpoint={"/api/sign-image"}
              onSuccess={(result, { widget }) => {
                setIdFile((result.info as CloudinaryUploadWidgetInfo).secure_url);
                setIsIdFileAvailable(true);
                // widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    onClick={() => open()}
                    variant={"outline"}
                    type='button'
                    className='w-full mt-2 mb-4'
                  >
                    Upload
                  </Button>
                );
              }}
            </CldUploadWidget>
            {
              isIdFileAvailable && idFile !== "" &&
              <Label htmlFor="id">{idFile.split("/")[idFile.split("/").length - 1]}</Label>
            }
            {
              !isIdFileAvailable &&
              <Label htmlFor="finance" style={{ color: "#ff0000" }}> * Id document file required</Label>
            }
          </div>
          <div className="grid gap-2">
            <CldUploadWidget
              signatureEndpoint={"/api/sign-image"}
              onSuccess={(result, { widget }) => {
                setSelfieFile((result.info as CloudinaryUploadWidgetInfo).secure_url);
                setIsSelfieFileAvailable(true);
                // widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    onClick={() => open()}
                    variant={"outline"}
                    type='button'
                    className='w-full mt-2 mb-4'
                  >
                    Upload Selfie
                  </Button>
                );
              }}
            </CldUploadWidget>
            {
              isSelfieFileAvailable && selfieFile !== "" &&
              <Label htmlFor="id">{idFile.split("/")[idFile.split("/").length - 1]}</Label>
            }
            {
              !isSelfieFileAvailable &&
              <Label htmlFor="finance" style={{ color: "#ff0000" }}> * Selfie file required</Label>
            }
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleOnSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CreatorVerificationForm;
