// src/proxy.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (path.startsWith("/student") && token?.role !== "student") {
      return NextResponse.redirect(new URL("/login?role=student", req.url))
    }

    if (path.startsWith("/manager") && token?.role !== "manager") {
      return NextResponse.redirect(new URL("/login?role=manager", req.url))
    }

    if (path.startsWith("/owner") && token?.role !== "owner") {
      return NextResponse.redirect(new URL("/login?role=owner", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ["/student/:path*", "/manager/:path*", "/owner/:path*"]
}