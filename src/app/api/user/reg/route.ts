import { NextRequest } from "next/server";
import { jsonRes } from "@/helpers/response";
import { emailVerification, userRegistrationService } from "@/service/user/userReg";

export const POST = async (req: NextRequest) => {
    const res = await userRegistrationService(req);
    return jsonRes(res, res.status!);
}

export const GET = async (req: NextRequest) => {
    const res = await emailVerification(req);
    return jsonRes(res, res.status!);
}