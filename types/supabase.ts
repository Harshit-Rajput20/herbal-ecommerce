export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description?: string
          price: number
          image_url?: string
          category?: string
          featured?: boolean
          stock?: number
          created_at?: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          price: number
          image_url?: string
          category?: string
          featured?: boolean
          stock?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category?: string
          featured?: boolean
          stock?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: string
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          total?: number
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
