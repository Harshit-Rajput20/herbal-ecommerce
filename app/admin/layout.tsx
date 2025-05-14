import type React from "react"
import AdminSidebar from "@/components/admin-sidebar"
import AdminCheck from "@/lib/middleware/admin-check"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <AdminSidebar />
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </AdminCheck>
  )
}
