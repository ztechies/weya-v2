import { jsonRes } from "@/helpers/response";
import { userLoginService } from "@/service/user/userLogin";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const res = await userLoginService(req);
        return jsonRes(res, res.status!);
    } catch (error: any) {
        throw new Error(error);
    }
}