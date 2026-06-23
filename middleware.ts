import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session")
  const userSession = request.cookies.get("user_session")

  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname === "/login"
  const isAdminRoute = pathname.startsWith("/admin")
  const isOnlineConsultation = pathname === "/online-consultation"

  const isAdminAppointments = pathname.startsWith("/admin/appointments")
  const isStudentCounseling = pathname.startsWith("/student-counseling")

  // Block /admin/appointments route (hide from admin, preserve files for future)
  if (isAdminAppointments) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // Hide student counseling feature until Phase 2
  if (isStudentCounseling) {
    return new NextResponse("Not Found", { status: 404 })
  }

  // Redirect /online-consultation to /contact
  if (isOnlineConsultation) {
    return NextResponse.redirect(new URL("/contact", request.url))
  }

  // Redirect to login if accessing admin routes without session
  if (isAdminRoute && !session && !userSession) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to admin if accessing login with active session
  if (isLoginPage && (session || userSession)) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/online-consultation",
    "/student-counseling/:path*",
  ],
}