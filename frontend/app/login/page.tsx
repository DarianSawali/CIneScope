import AuthForm from "@/components/AuthForm"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="p-8">
      <AuthForm mode="login" />
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
