"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function RegistrationConfirmationPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email"

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-base">
            We've sent a verification link to <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Click the link in the email to verify your account and complete the registration process.
          </p>
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p>
              If you don't see the email in your inbox, please check your spam folder or request a new verification
              link.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
