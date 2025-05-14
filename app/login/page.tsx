import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string; redirect?: string }
}) {
  const supabase = await createServerSupabaseClient()

  // Check if user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If logged in, redirect to account page or the specified redirect URL
  if (session) {
    redirect(searchParams?.redirect || "/account")
  }

  const error = searchParams?.error

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md">{error}</div>}
          <div className="space-y-4">
            <Button
              formAction={`/auth/login?provider=google${searchParams?.redirect ? `&redirect=${searchParams.redirect}` : ""}`}
              className="w-full bg-[#4285F4] text-white hover:bg-[#3367D6]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-2 h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
