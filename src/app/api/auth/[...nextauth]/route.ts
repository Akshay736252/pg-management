// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Mock user database
const users = [
  {
    id: "1",
    name: "Rahul Student",
    email: "student@pg.com",
    password: bcrypt.hashSync("student123", 10),
    role: "student",
    roomNo: "101",
    uid: "STU001"
  },
  {
    id: "2",
    name: "Manager Singh",
    email: "manager@pg.com",
    password: bcrypt.hashSync("manager123", 10),
    role: "manager",
    employeeCode: "MGR001"
  },
  {
    id: "3",
    name: "Owner Verma",
    email: "owner@pg.com",
    password: bcrypt.hashSync("owner123", 10),
    role: "owner"
  }
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(
          u => u.email === credentials.email && u.role === credentials.role
        )

        if (!user) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          ...(user.role === "student" && { roomNo: user.roomNo, uid: user.uid }),
          ...(user.role === "manager" && { employeeCode: user.employeeCode })
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        if (user.role === "student") {
          token.roomNo = user.roomNo
          token.uid = user.uid
        }
        if (user.role === "manager") {
          token.employeeCode = user.employeeCode
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
        if (token.role === "student") {
          session.user.roomNo = token.roomNo as string
          session.user.uid = token.uid as string
        }
        if (token.role === "manager") {
          session.user.employeeCode = token.employeeCode as string
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }