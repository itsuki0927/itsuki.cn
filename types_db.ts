export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment: {
        Row: {
          avatar: string | null
          blogId: number
          content: string
          createdAt: string
          email: string
          emoji: Json | null
          geo: Json | null
          id: number
          ip: string | null
          nickname: string
          parentId: number | null
          slug: string | null
          state: number
          updatedAt: string | null
          userAgent: Json | null
        }
        Insert: {
          avatar?: string | null
          blogId: number
          content: string
          createdAt?: string
          email: string
          emoji?: Json | null
          geo?: Json | null
          id?: number
          ip?: string | null
          nickname?: string
          parentId?: number | null
          slug?: string | null
          state?: number
          updatedAt?: string | null
          userAgent?: Json | null
        }
        Update: {
          avatar?: string | null
          blogId?: number
          content?: string
          createdAt?: string
          email?: string
          emoji?: Json | null
          geo?: Json | null
          id?: number
          ip?: string | null
          nickname?: string
          parentId?: number | null
          slug?: string | null
          state?: number
          updatedAt?: string | null
          userAgent?: Json | null
        }
        Relationships: []
      }
      comment_dev: {
        Row: {
          avatar: string | null
          blogId: number
          content: string
          createdAt: string
          email: string
          emoji: Json | null
          geo: Json | null
          id: number
          ip: string | null
          nickname: string
          parentId: number | null
          slug: string | null
          state: number
          updatedAt: string | null
          userAgent: Json | null
        }
        Insert: {
          avatar?: string | null
          blogId: number
          content: string
          createdAt?: string
          email: string
          emoji?: Json | null
          geo?: Json | null
          id?: number
          ip?: string | null
          nickname?: string
          parentId?: number | null
          slug?: string | null
          state?: number
          updatedAt?: string | null
          userAgent?: Json | null
        }
        Update: {
          avatar?: string | null
          blogId?: number
          content?: string
          createdAt?: string
          email?: string
          emoji?: Json | null
          geo?: Json | null
          id?: number
          ip?: string | null
          nickname?: string
          parentId?: number | null
          slug?: string | null
          state?: number
          updatedAt?: string | null
          userAgent?: Json | null
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
