import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    // Note that viewedWelcomeMessage (if it exists) is an object with 
    // a name and value field, not a string like before
    const viewedWelcomeMessage = request.cookies.get("viewedWelcomeMessage")
    if (viewedWelcomeMessage?.value === "true") {
        return NextResponse.json({message: "Welcome back!"})
    }

    const response = NextResponse.json({message: "Welcome!"})
    response.cookies.set("viewedWelcomeMessage", "true", {
    httpOnly: true,
    maxAge: 60 * 10,
    secure: true,
})
    return response
}