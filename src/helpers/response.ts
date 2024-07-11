import { NextResponse } from "next/server"

export const jsonRes = (res: unknown, statusCode: number) => {
    return NextResponse.json(res, {
        status: statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}