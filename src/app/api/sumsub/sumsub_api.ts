import crypto from "crypto";
import axios, { AxiosRequestConfig } from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";

const SUMSUB_APP_TOKEN = process.env.NEXT_PUBLIC_SUMSUB_APP_TOKEN;
const SUMSUB_SECRET_KEY = process.env.NEXT_PUBLIC_SUMSUB_SECRET_KEY ? process.env.NEXT_PUBLIC_SUMSUB_SECRET_KEY : "";
const SUMSUB_BASE_URL = "https://api.sumsub.com";

var axios_config: AxiosRequestConfig = {};
axios_config.baseURL = SUMSUB_BASE_URL;

export const config = {
    api: {
        bodyParser: false, // ✅ This is correct in Next.js API Routes
    },
};


axios.interceptors.request.use(createSignature, function (error) {
    return Promise.reject(error);
})

export function createSignature(axios_config: any) {
    console.log('Creating a signature for the request...');

    var ts = Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac('sha256', SUMSUB_SECRET_KEY);
    signature.update(ts + axios_config.method.toUpperCase() + axios_config.url);

    if (axios_config.data instanceof FormData) {
        signature.update(axios_config.data.getBuffer());
    } else if (axios_config.data) {
        signature.update(axios_config.data);
    }

    axios_config.headers['X-App-Access-Ts'] = ts;
    axios_config.headers['X-App-Access-Sig'] = signature.digest('hex');

    return axios_config;
}

export async function createApplicant(externalUserId: any, levelName: any) {
    console.log("Creating an applicant...");

    var method = 'post';
    var url = '/resources/applicants?levelName=' + encodeURIComponent(levelName);
    var body = {
        externalUserId: externalUserId,
        reviewStatus: "auto"
    };

    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-App-Token': SUMSUB_APP_TOKEN
    };

    axios_config.method = method;
    axios_config.url = url;
    axios_config.headers = headers;
    axios_config.data = JSON.stringify(body);

    return axios_config;
}

export async function getApplicantID(externalUserId: any) {
    console.log("Getting an applicant...");

    var method = 'get';
    var url = `/resources/applicants/-;externalUserId=${externalUserId}/one`;
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-App-Token': SUMSUB_APP_TOKEN
    };

    axios_config.method = method;
    axios_config.url = url;
    axios_config.headers = headers;

    return axios_config;
}


// https://docs.sumsub.com/reference/add-id-documents
export async function addDocument(applicantId: any, file: any) {
    console.log("Adding document to the applicant...");
    var method = 'post';
    var url = `/resources/applicants/${applicantId}/info/idDoc`;

    // BANK_CARD
    // DRIVERS
    // ID_CARD
    // PASSPORT
    // SELFIE
    // UTILITY_BILL
    var id_metadata = {
        idDocType: 'ID_CARD',
        country: 'USA', 
        side: 'FRONT_SIDE'
    };

    var form = new FormData();
    form.append('metadata', JSON.stringify(id_metadata));

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); //  Convert Uint8Array to Buffer
    form.append("content", buffer, file.name); // Works in Next.js API route

    /*
    In case you'd like to upload images in base64 encoded string format:
    
    var content = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpcSMudAGjmiIwdiEtdSIwdCMxdSMwdSMwdQGmlyMvdSFPfQOnmCMvdSMwdSMwdQGjmiMwdQGjmgGjmiMwdQGjmlncPbUAAAAUdFJOUwAw5lQRH0PM8CGpBhC81eBrftK5jzDo3gAAAAlwSFlzAAABwAAAAcABl8K+3QAAAuRJREFUeNrtm9typCAURXFEdMRLm6T//1fnId4qfUKDomLNWo8pwLOq7WwP0koBAAAAAAAAAAD8xzz+BPJIq377DMbeXaBBAAEEEIhHc3eBR7hAEkn2+Bhz9bmBcerH41Z3flqZ3MQRaBBAAAEEEEAAAQQQQAABBO7QCV/YHc/978IzEi8LH9EnN89Tid8n/z1XoEEAAQQQuPTf6AHp/Hlm/Z8BhQ1d/4PSyDfRiYgFmLb8yaBU8fVKqZKkFUotVCb8tU9ToBNKzRBAAAEEEhQY0hQY3gkMWfGNSpSxvGyQBXp1G3pRoLuPQIcAAgggcCnlSsCWieevM5M7q5Qd802vBuSv3aeT1vjNXY8zodfIVwVmI7/sAeuvUFa3X+UaV0lp6ov2f+YIXnspzLoHeoqKFAgggAACCCQhUJvvGDRtHIF2Wq8+SWDO7yyOwFyYrU4RqIRHjl0C2vO2QgABBBDYL2CFYm10AXEjW+qq5n66XjpFt8DSF86p1Xqmc8imgzbf5J1bwI7jjJ074XdPCN3U4S5z3QJdPo7TagOZW0B5Zqi0itSPV+IbgF078p4C4dsAYote7bvzEUAAAQR2CvTRBaRMroVhebhALixT78tfVyavsK870Z3QMUuY9ZmldiQXkn1BqwMR89d5Re2byeegPb8hK/ZtmyOAAAII7BWokheo3VPqVAXm/H2XfUImJyFgd8xNQaAKn4wAAggggICJI5CfXnc9drNVHIGpO67NOfVLnfA+gZO74w3PoGk9WCOAAAIIXNsdb+iEJdojBUw9UrgF2vx1x9o7D6d30W+642KqJSCn9fzxlid0s2/Wm/2qLWen+9jPoO5vg1Rit+uwBwIIIIDAFQK293snHF3A+e64D0hLnY/YOZMXquMEqterGTvVsik1te9vkuIIxO+Tfc8vHidwwGEPBBBAAIHzBKzzN6d1HIE21olpZyZLRNqLta5rXPfyAAAAAAAAAAAAAH7nHygtt70j9IRfAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC'
    var ext = content.substring("data:image/".length, content.indexOf(";base64"));
    var fileName = `image.${ext}`;
    var base64Data = content.split(',')[1];
    form.append('content', Buffer.from(base64Data, 'base64'), { fileName });
    */

    var headers = {
        'Accept': 'application/json',
        'X-App-Token': SUMSUB_APP_TOKEN
    };

    axios_config.method = method;
    axios_config.url = url;
    axios_config.headers = Object.assign(headers, form.getHeaders());
    axios_config.data = form;

    return axios_config;
}

// https://docs.sumsub.com/reference/get-applicant-review-status
export function getApplicantStatus(applicantId: any) {
    console.log("Getting the applicant status...");

    var method = 'get';
    var url = `/resources/applicants/${applicantId}/status`;
    
    var headers = {
        'Accept': 'application/json',
        'X-App-Token': SUMSUB_APP_TOKEN
    };

    axios_config.method = method;
    axios_config.url = url;
    axios_config.headers = headers;
    axios_config.data = null;

    return axios_config;
}
