"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Loader2, UserPlus, Shield, ShieldAlert, User } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { formatDate } from "@/lib/utils"

type UserWithAdmin = {
  id: string
  email: string
  created_at: string
  is_admin: boolean
  full_name?: string
  avatar_url?: string
}

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<UserWithAdmin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      // Get all users from auth.users via our server endpoint
      const response = await fetch("/api/admin/users")
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const authUsers = await response.json()

      // Get admin users
      const { data: adminUsers, error: adminError } = await supabase.from("admin_users").select("id, email")

      if (adminError) throw adminError

      // Combine the data
      const usersWithAdmin = authUsers.map((user: any) => ({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
        is_admin: adminUsers?.some((admin) => admin.id === user.id) || false,
      }))

      setUsers(usersWithAdmin)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching users",
        description: error.message || "An error occurred while fetching users.",
      })
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addAdminUser = async () => {
    if (!newAdminEmail) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter an email address.",
      })
      return
    }

    setIsAddingAdmin(true)
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newAdminEmail }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to add admin")
      }

      toast({
        title: "Admin added",
        description: `${newAdminEmail} has been made an admin.`,
      })

      setNewAdminEmail("")
      fetchUsers()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding admin",
        description: error.message || "An error occurred while adding admin.",
      })
    } finally {
      setIsAddingAdmin(false)
    }
  }

  const toggleAdminStatus = async (user: UserWithAdmin) => {
    try {
      if (user.is_admin) {
        // Remove admin status
        const { error } = await supabase.from("admin_users").delete().eq("id", user.id)

        if (error) throw error

        toast({
          title: "Admin removed",
          description: `${user.email} is no longer an admin.`,
        })
      } else {
        // Add admin status
        const { error } = await supabase.from("admin_users").insert({
          id: user.id,
          email: user.email,
        })

        if (error) throw error

        toast({
          title: "Admin added",
          description: `${user.email} is now an admin.`,
        })
      }

      fetchUsers()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating admin status",
        description: error.message || "An error occurred while updating admin status.",
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users and admin access</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="admin-email" className="sr-only">
                Email
              </Label>
              <Input
                id="admin-email"
                placeholder="Enter user email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
              />
            </div>
            <Button onClick={addAdminUser} disabled={isAddingAdmin}>
              {isAddingAdmin ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Admin
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border">
          <h2 className="text-xl font-semibold p-6 pb-0">Users</h2>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url || "/placeholder.svg"}
                              alt={user.full_name || user.email}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {(user.full_name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
                            </div>
                          )}
                          <span>{user.full_name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">{formatDate(user.created_at)}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.is_admin ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.is_admin ? (
                            <>
                              <Shield className="mr-1 h-3 w-3" />
                              Admin
                            </>
                          ) : (
                            <>
                              <User className="mr-1 h-3 w-3" />
                              User
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <Button variant="outline" size="sm" onClick={() => toggleAdminStatus(user)}>
                          {user.is_admin ? (
                            <>
                              <ShieldAlert className="mr-2 h-4 w-4" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
