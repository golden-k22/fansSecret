import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { addDocument, getApplicantStatus } from "../sumsub_api";
import { NextResponse } from "next/server";


export const config = {
    api: {
        bodyParser: false, // Disabling body parser to handle file uploads
    },
};

export async function POST(req: any, res: any) {
    const formData = await req.formData();
    const file: any = formData.get("file");
    const applicantId: any = formData.get("applicantId");

    const response = await axios(await addDocument(applicantId, file))
        .then(function (response) {
            console.log("Response:\n", response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log("Cannot upload document:\n", error.response.data);
        });
    return NextResponse.json(
        {
            message: "Document Uploaded!",
            data: response,
            fileName: file.name,
        },
        { status: 200 }
    );
}

export async function GET(req: any, res: any) {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const applicantId = url.searchParams.get("applicantId");

    const response = await axios(getApplicantStatus(applicantId))
        .then(function (response) {
            console.log("Response:\n", response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log("Error:\n", error.response.data);
        });

    return NextResponse.json(
        {
            message: "Applicant status!",
            data: response,
        },
        { status: 200 }
    );
}

// async function getRejectionReason(applicantId: any) {

//     try {
//         const response = await axios
//             .request({
//                 url: `https://api.sumsub.com/resources/applicants/${applicantId}/review`,
//                 method: "GET",
//                 headers: {
//                     "X-App-Token": SUMSUB_APP_TOKEN,
//                 },
//             })
//         return response.data;
//     } catch (error) {
//         throw new Error("Failed to check verification status");
//     }
// }

