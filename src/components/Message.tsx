import {cookies} from "next/headers";

export default function Message() {
    const viewedWelcomeMessage = cookies().get("viewedWelcomeMessage")
    if (viewedWelcomeMessage?.value === "true") {
        return <div>Welcome back!</div>
    }

    // (!) this is wrong don't do this
    cookies().set("viewedWelcomeMessage", "true")
    return <div>Welcome!</div>
}