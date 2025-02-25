import crypto from "crypto";
import axios, { AxiosRequestConfig } from "axios";
import { NextResponse } from "next/server";
import {getApplicantID, createApplicant} from "../sumsub_api";

const SUMSUB_LEVEL_NAME = "basic-kyc-level"; // Set the correct KYC level


export async function GET(req: any, res: any) {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const externalUserId = url.searchParams.get("externalUserId");
    try {
        const response = await axios(await getApplicantID(externalUserId))
            .then(function (response) {
                return response.data.id
            })
            .catch(function (error) {
                console.log("Error:\n", error.response.data);
                throw new Error("Not found applicant created!");
            });
        return NextResponse.json(
            {
                message: "Applicant exist!",
                applicantId: response,
            },
            { status: 200 }
        );
    } catch (error) {

        const response = await axios(await createApplicant(externalUserId, SUMSUB_LEVEL_NAME))
            .then(function (response) {
                return response.data.id
            })
            .catch(function (error) {
                console.log("Cannot create applicant! Error:\n", error.response.data);
                return NextResponse.json(
                    {
                        message: "Cannot create applicant!",
                        error: error,
                    },
                    { status: 500 }
                );
            });
        return NextResponse.json(
            {
                message: "Applicant created!",
                applicantId: response,
            },
            { status: 200 }
        );
    }
}
