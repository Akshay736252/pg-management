// src/types/next-auth.d.ts
import "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
    roomNo?: string
    uid?: string
    employeeCode?: string
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role?: string
      roomNo?: string
      uid?: string
      employeeCode?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    roomNo?: string
    uid?: string
    employeeCode?: string
  }
}