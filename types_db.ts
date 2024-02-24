export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog: {
        Row: {
          categoryId: number | null
          comments: number | null
          content: string
          cover: string
          createdAt: string | null
          description: string
          favorite: boolean | null
          forbiddedComment: boolean | null
          id: number
          keywords: string[]
          mood: Database["public"]["Enums"]["blogMood"] | null
          reactions: Json | null
          slug: string
          state: Database["public"]["Enums"]["blogState"] | null
          title: string
          updatedAt: string | null
          views: number | null
        }
        Insert: {
          categoryId?: number | null
          comments?: number | null
          content: string
          cover: string
          createdAt?: string | null
          description: string
          favorite?: boolean | null
          forbiddedComment?: boolean | null
          id?: number
          keywords: string[]
          mood?: Database["public"]["Enums"]["blogMood"] | null
          reactions?: Json | null
          slug: string
          state?: Database["public"]["Enums"]["blogState"] | null
          title: string
          updatedAt?: string | null
          views?: number | null
        }
        Update: {
          categoryId?: number | null
          comments?: number | null
          content?: string
          cover?: string
          createdAt?: string | null
          description?: string
          favorite?: boolean | null
          forbiddedComment?: boolean | null
          id?: number
          keywords?: string[]
          mood?: Database["public"]["Enums"]["blogMood"] | null
          reactions?: Json | null
          slug?: string
          state?: Database["public"]["Enums"]["blogState"] | null
          title?: string
          updatedAt?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      blogTag: {
        Row: {
          blogId: number
          tagId: number
        }
        Insert: {
          blogId: number
          tagId: number
        }
        Update: {
          blogId?: number
          tagId?: number
        }
        Relationships: [
          {
            foreignKeyName: "blogTag_blogId_fkey"
            columns: ["blogId"]
            isOneToOne: false
            referencedRelation: "blog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blogTag_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["id"]
          }
        ]
      }
      category: {
        Row: {
          count: number
          createdAt: string | null
          description: string | null
          expand: string | null
          id: number
          slug: string
          sort: number | null
          title: string
          updatedAt: string | null
        }
        Insert: {
          count?: number
          createdAt?: string | null
          description?: string | null
          expand?: string | null
          id?: never
          slug: string
          sort?: number | null
          title: string
          updatedAt?: string | null
        }
        Update: {
          count?: number
          createdAt?: string | null
          description?: string | null
          expand?: string | null
          id?: never
          slug?: string
          sort?: number | null
          title?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
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
          isDev: boolean | null
          nickname: string
          parentId: number | null
          section: string | null
          slug: string | null
          state: Database["public"]["Enums"]["commentState"] | null
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
          isDev?: boolean | null
          nickname?: string
          parentId?: number | null
          section?: string | null
          slug?: string | null
          state?: Database["public"]["Enums"]["commentState"] | null
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
          isDev?: boolean | null
          nickname?: string
          parentId?: number | null
          section?: string | null
          slug?: string | null
          state?: Database["public"]["Enums"]["commentState"] | null
          updatedAt?: string | null
          userAgent?: Json | null
        }
        Relationships: []
      }
      tag: {
        Row: {
          count: number
          createdAt: string | null
          description: string | null
          expand: string | null
          id: number
          slug: string
          sort: number | null
          title: string
          updatedAt: string | null
        }
        Insert: {
          count?: number
          createdAt?: string | null
          description?: string | null
          expand?: string | null
          id?: number
          slug: string
          sort?: number | null
          title: string
          updatedAt?: string | null
        }
        Update: {
          count?: number
          createdAt?: string | null
          description?: string | null
          expand?: string | null
          id?: number
          slug?: string
          sort?: number | null
          title?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      category_count_increment: {
        Args: {
          x: number
          row_id: number
        }
        Returns: undefined
      }
      tag_count_increment: {
        Args: {
          x: number
          row_id: number
        }
        Returns: undefined
      }
      views_increment: {
        Args: {
          x: number
          row_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      blogMood: "happy" | "sad" | "neutral"
      blogState: "draft" | "published" | "trash"
      commentState: "auditing" | "published" | "spam" | "trash" | "deleted"
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
