import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient()

  // Get user profile
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div>
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-muted-foreground">Please sign in to view your account</p>
      </div>
    )
  }

  // Get user's orders count
  const { count: ordersCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id || "")

  // Get user's latest order
  const { data: latestOrder } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user?.id || "")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  // Get user metadata from auth.users
  const userMetadata = user?.user_metadata || {}
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture
  const fullName = userMetadata.full_name || userMetadata.name || "User"
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  console.log("User metadata:", userMetadata)

  return (
    <div>
      <h1 className="text-3xl font-bold">My Account</h1>
      <p className="text-muted-foreground">Manage your account settings and view orders</p>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl || ""} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{fullName}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p>{user?.created_at ? formatDate(user.created_at) : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Sign In</p>
                <p>{user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Provider</p>
                <p className="capitalize">{user?.app_metadata?.provider || "Email"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of your activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{ordersCount || 0}</p>
              </div>
              {latestOrder && (
                <div>
                  <p className="text-sm text-muted-foreground">Latest Order</p>
                  <p>
                    Order #{latestOrder.id} - {formatDate(latestOrder.created_at)}
                  </p>
                  <p className="text-sm text-primary">
                    Status: {latestOrder.status.charAt(0).toUpperCase() + latestOrder.status.slice(1)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
