import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Whitepaper files that are allowed to be embedded via iframe (same origin only)
const EMBEDDABLE_FILES = [
    "/sbp-mica-whitepaper.pdf",
    "/sbp-mica-whitepaper.xhtml",
];

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    if (EMBEDDABLE_FILES.includes(pathname)) {
        response.headers.set("X-Frame-Options", "SAMEORIGIN");
        response.headers.set("Content-Security-Policy", "frame-ancestors 'self';");
    } else {
        response.headers.set("X-Frame-Options", "DENY");
        response.headers.set("Content-Security-Policy", "frame-ancestors 'none';");
    }

    return response;
}
