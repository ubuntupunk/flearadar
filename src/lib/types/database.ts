 // src/lib/types/database.ts
import { SupabaseClient } from '@supabase/supabase-js'

// Export via npx supabase gen types typescript --project-id vyledqnvjp
// hgtgzihpey --schema public > src/lib/types/output.ts
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
      activity_log: {
        Row: {
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          related_entity_id: string | null
          related_entity_type: string | null
          type: Database["public"]["Enums"]["activity_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          type: Database["public"]["Enums"]["activity_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          type?: Database["public"]["Enums"]["activity_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      addresses: {
        Row: {
          address_one: string | null
          address_two: string | null
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          postal_code: string | null
          region_code: string | null
          state_province: string | null
          street_number: string | null
          suburb: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_one?: string | null
          address_two?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          postal_code?: string | null
          region_code?: string | null
          state_province?: string | null
          street_number?: string | null
          suburb?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address_one?: string | null
          address_two?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          postal_code?: string | null
          region_code?: string | null
          state_province?: string | null
          street_number?: string | null
          suburb?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          attendance_date: string | null
          id: number
          market_id: string | null
          status: string | null
          vendor_id: string | null
        }
        Insert: {
          attendance_date?: string | null
          id?: never
          market_id?: string | null
          status?: string | null
          vendor_id?: string | null
        }
        Update: {
          attendance_date?: string | null
          id?: never
          market_id?: string | null
          status?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "attendance_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attendance_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          content_id: number | null
          created_at: string | null
          description: string | null
          id: string
          item_id: string
          item_type: Database["public"]["Enums"]["bookmark_item_type"]
          listing_id: number | null
          market_id: string | null
          metadata: Json | null
          source_user_id: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          content_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          item_id: string
          item_type: Database["public"]["Enums"]["bookmark_item_type"]
          listing_id?: number | null
          market_id?: string | null
          metadata?: Json | null
          source_user_id?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          content_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          item_id?: string
          item_type?: Database["public"]["Enums"]["bookmark_item_type"]
          listing_id?: number | null
          market_id?: string | null
          metadata?: Json | null
          source_user_id?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "security_scores"
            referencedColumns: ["listing_id"]
          },
          {
            foreignKeyName: "bookmarks_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "bookmarks_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "bookmarks_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_source_user_id_fkey"
            columns: ["source_user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "bookmarks_source_user_id_fkey"
            columns: ["source_user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "bookmarks_source_user_id_fkey"
            columns: ["source_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      colors: {
        Row: {
          blue: number | null
          green: number | null
          hex: string
          hue: number | null
          id: number
          light_hsl: number | null
          name: string | null
          red: number | null
          sat_hsl: number | null
          sat_hsv: number | null
          source: Database["public"]["Enums"]["color_source"] | null
          val_hsv: number | null
        }
        Insert: {
          blue?: number | null
          green?: number | null
          hex: string
          hue?: number | null
          id?: number
          light_hsl?: number | null
          name?: string | null
          red?: number | null
          sat_hsl?: number | null
          sat_hsv?: number | null
          source?: Database["public"]["Enums"]["color_source"] | null
          val_hsv?: number | null
        }
        Update: {
          blue?: number | null
          green?: number | null
          hex?: string
          hue?: number | null
          id?: number
          light_hsl?: number | null
          name?: string | null
          red?: number | null
          sat_hsl?: number | null
          sat_hsv?: number | null
          source?: Database["public"]["Enums"]["color_source"] | null
          val_hsv?: number | null
        }
        Relationships: []
      }
      content: {
        Row: {
          body: string
          created_at: string | null
          created_by: string
          id: number
          listing_id: number | null
          metadata: Json | null
          slug: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          created_by: string
          id?: number
          listing_id?: number | null
          metadata?: Json | null
          slug: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          created_by?: string
          id?: number
          listing_id?: number | null
          metadata?: Json | null
          slug?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      crime_reports: {
        Row: {
          description: string | null
          id: number
          incident_type: string
          market_id: string
          reporter_id: string
          timestamp: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          incident_type: string
          market_id: string
          reporter_id: string
          timestamp?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          incident_type?: string
          market_id?: string
          reporter_id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crime_reports_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "crime_reports_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "crime_reports_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crime_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "crime_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "crime_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      factors: {
        Row: {
          id: number
          is_security_factor: boolean | null
          name: string
          scoring: Json | null
          type: string
        }
        Insert: {
          id?: never
          is_security_factor?: boolean | null
          name: string
          scoring?: Json | null
          type: string
        }
        Update: {
          id?: never
          is_security_factor?: boolean | null
          name?: string
          scoring?: Json | null
          type?: string
        }
        Relationships: []
      }
      gps_logs: {
        Row: {
          id: number
          latitude: number | null
          longitude: number | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: never
          latitude?: number | null
          longitude?: number | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: never
          latitude?: number | null
          longitude?: number | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gps_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "gps_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "gps_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: number
          imageable_id: string | null
          imageable_type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: never
          imageable_id?: string | null
          imageable_type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: never
          imageable_id?: string | null
          imageable_type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_imageable_profile"
            columns: ["imageable_id"]
            isOneToOne: false
            referencedRelation: "profile_full_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_imageable_profile"
            columns: ["imageable_id"]
            isOneToOne: false
            referencedRelation: "profile_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_imageable_profile"
            columns: ["imageable_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          contact_details: string | null
          contact_email: string | null
          created_at: string | null
          created_by: string | null
          data: Json
          id: number
          is_verified: boolean | null
          owner_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          contact_details?: string | null
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          data: Json
          id?: number
          is_verified?: boolean | null
          owner_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          contact_details?: string | null
          contact_email?: string | null
          created_at?: string | null
          created_by?: string | null
          data?: Json
          id?: number
          is_verified?: boolean | null
          owner_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "listings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "listings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      market_crime_stats: {
        Row: {
          crime_index: number
          last_updated: string | null
          market_id: string
        }
        Insert: {
          crime_index: number
          last_updated?: string | null
          market_id: string
        }
        Update: {
          crime_index?: number
          last_updated?: string | null
          market_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_crime_stats_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "market_crime_stats_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "market_crime_stats_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      market_reputation: {
        Row: {
          approved_verifications: number | null
          avg_daily_visitors: number | null
          avg_verification_points: number | null
          bookmark_count: number | null
          calculated_at: string | null
          content_count: number | null
          content_engagement_score: number | null
          crowd_density_score: number | null
          factor_scores: Json | null
          flea_score: number | null
          last_content_update: string | null
          last_updated: string | null
          market_id: string
          reputation_score: number | null
          security_score: number | null
          total_attendance: number | null
          total_ratings: number | null
          total_verifications: number | null
          total_visits: number | null
          unique_contributors: number | null
          unique_vendors: number | null
          unique_visitors: number | null
          vendor_attendance_rate: number | null
          vendor_attendance_score: number | null
        }
        Insert: {
          approved_verifications?: number | null
          avg_daily_visitors?: number | null
          avg_verification_points?: number | null
          bookmark_count?: number | null
          calculated_at?: string | null
          content_count?: number | null
          content_engagement_score?: number | null
          crowd_density_score?: number | null
          factor_scores?: Json | null
          flea_score?: number | null
          last_content_update?: string | null
          last_updated?: string | null
          market_id: string
          reputation_score?: number | null
          security_score?: number | null
          total_attendance?: number | null
          total_ratings?: number | null
          total_verifications?: number | null
          total_visits?: number | null
          unique_contributors?: number | null
          unique_vendors?: number | null
          unique_visitors?: number | null
          vendor_attendance_rate?: number | null
          vendor_attendance_score?: number | null
        }
        Update: {
          approved_verifications?: number | null
          avg_daily_visitors?: number | null
          avg_verification_points?: number | null
          bookmark_count?: number | null
          calculated_at?: string | null
          content_count?: number | null
          content_engagement_score?: number | null
          crowd_density_score?: number | null
          factor_scores?: Json | null
          flea_score?: number | null
          last_content_update?: string | null
          last_updated?: string | null
          market_id?: string
          reputation_score?: number | null
          security_score?: number | null
          total_attendance?: number | null
          total_ratings?: number | null
          total_verifications?: number | null
          total_visits?: number | null
          unique_contributors?: number | null
          unique_vendors?: number | null
          unique_visitors?: number | null
          vendor_attendance_rate?: number | null
          vendor_attendance_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "market_reputation_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "market_reputation_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "market_reputation_market_id_fkey"
            columns: ["market_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_availability: {
        Row: {
          created_at: string | null
          day: number | null
          end_time: string
          id: string
          profile_id: string | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day?: number | null
          end_time: string
          id?: string
          profile_id?: string | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day?: number | null
          end_time?: string
          id?: string
          profile_id?: string | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_availability_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_full_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_availability_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_availability_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_social_links: {
        Row: {
          created_at: string | null
          id: string
          platform: string
          profile_id: string | null
          updated_at: string | null
          url: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          platform: string
          profile_id?: string | null
          updated_at?: string | null
          url: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          platform?: string
          profile_id?: string | null
          updated_at?: string | null
          url?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_social_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_full_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_social_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_with_username"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_social_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          chosen_color_id: number | null
          full_name: string | null
          id: string
          last_seen_at: string | null
          notification_preferences: Json
          profile_type: string | null
          status_emoji: string | null
          status_message: string | null
          timezone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          chosen_color_id?: number | null
          full_name?: string | null
          id: string
          last_seen_at?: string | null
          notification_preferences?: Json
          profile_type?: string | null
          status_emoji?: string | null
          status_message?: string | null
          timezone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          chosen_color_id?: number | null
          full_name?: string | null
          id?: string
          last_seen_at?: string | null
          notification_preferences?: Json
          profile_type?: string | null
          status_emoji?: string | null
          status_message?: string | null
          timezone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_chosen_color_id_fkey"
            columns: ["chosen_color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          created_at: string | null
          factor: string
          id: number
          listing_id: number | null
          user_id: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          factor: string
          id?: never
          listing_id?: number | null
          user_id?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          factor?: string
          id?: never
          listing_id?: number | null
          user_id?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_factor"
            columns: ["factor"]
            isOneToOne: false
            referencedRelation: "factors"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "security_scores"
            referencedColumns: ["listing_id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          business_name: string | null
          geofence_radius: number | null
          gps_tracking_consent: boolean | null
          id: string
          latitude: number | null
          longitude: number | null
          onboarding_completed: boolean | null
          reputation_score: number | null
          updated_at: string | null
          user_type: string
          username: string | null
        }
        Insert: {
          business_name?: string | null
          geofence_radius?: number | null
          gps_tracking_consent?: boolean | null
          id: string
          latitude?: number | null
          longitude?: number | null
          onboarding_completed?: boolean | null
          reputation_score?: number | null
          updated_at?: string | null
          user_type: string
          username?: string | null
        }
        Update: {
          business_name?: string | null
          geofence_radius?: number | null
          gps_tracking_consent?: boolean | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          onboarding_completed?: boolean | null
          reputation_score?: number | null
          updated_at?: string | null
          user_type?: string
          username?: string | null
        }
        Relationships: []
      }
      vendor_reputation: {
        Row: {
          last_updated: string | null
          reputation_score: number | null
          vendor_id: string
        }
        Insert: {
          last_updated?: string | null
          reputation_score?: number | null
          vendor_id: string
        }
        Update: {
          last_updated?: string | null
          reputation_score?: number | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_reputation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "vendor_reputation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "vendor_reputation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_stats: {
        Row: {
          active_listings: number | null
          avg_rating: number | null
          last_updated: string | null
          total_bookmarks: number | null
          total_listings: number | null
          total_views: number | null
          vendor_id: string
        }
        Insert: {
          active_listings?: number | null
          avg_rating?: number | null
          last_updated?: string | null
          total_bookmarks?: number | null
          total_listings?: number | null
          total_views?: number | null
          vendor_id: string
        }
        Update: {
          active_listings?: number | null
          avg_rating?: number | null
          last_updated?: string | null
          total_bookmarks?: number | null
          total_listings?: number | null
          total_views?: number | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_stats_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "vendor_stats_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "vendor_stats_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          id: number
          listing_id: number | null
          proof: Json | null
          reviewed_at: string | null
          reviewer_id: string | null
          reward_points: number | null
          status: string | null
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: never
          listing_id?: number | null
          proof?: Json | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          reward_points?: number | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: never
          listing_id?: number | null
          proof?: Json | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          reward_points?: number | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "security_scores"
            referencedColumns: ["listing_id"]
          },
          {
            foreignKeyName: "verifications_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "verifications_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "verifications_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      flea_scores: {
        Row: {
          flea_score: number | null
          listing_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "security_scores"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      listing_scores: {
        Row: {
          avg_score: number | null
          factor: string | null
          listing_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_factor"
            columns: ["factor"]
            isOneToOne: false
            referencedRelation: "factors"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "security_scores"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      market_metrics: {
        Row: {
          approved_verifications: number | null
          avg_daily_visitors: number | null
          avg_verification_points: number | null
          bookmark_count: number | null
          business_name: string | null
          calculated_at: string | null
          content_count: number | null
          content_engagement_score: number | null
          crime_index: number | null
          crowd_density_score: number | null
          factor_scores: Json | null
          flea_score: number | null
          last_content_update: string | null
          market_id: string | null
          market_name: string | null
          security_score: number | null
          total_attendance: number | null
          total_ratings: number | null
          total_verifications: number | null
          total_visits: number | null
          unique_contributors: number | null
          unique_vendors: number | null
          unique_visitors: number | null
          vendor_attendance_rate: number | null
          vendor_attendance_score: number | null
        }
        Relationships: []
      }
      profile_full_details: {
        Row: {
          availability_windows: Json | null
          avatar_url: string | null
          chosen_color_id: number | null
          full_name: string | null
          id: string | null
          last_seen_at: string | null
          notification_preferences: Json | null
          profile_type: string | null
          social_links: Json | null
          status_emoji: string | null
          status_message: string | null
          timezone: string | null
          updated_at: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_chosen_color_id_fkey"
            columns: ["chosen_color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_with_username: {
        Row: {
          avatar_url: string | null
          chosen_color_id: number | null
          email: string | null
          full_name: string | null
          id: string | null
          last_seen_at: string | null
          notification_preferences: Json | null
          profile_type: string | null
          status_emoji: string | null
          status_message: string | null
          timezone: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_chosen_color_id_fkey"
            columns: ["chosen_color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      review_metrics: {
        Row: {
          avg_review_rating: number | null
          listing_id: number | null
          review_count: number | null
        }
        Relationships: []
      }
      security_scores: {
        Row: {
          avg_security_rating: number | null
          crime_index: number | null
          listing_id: number | null
          num_reports: number | null
          security_score: number | null
        }
        Relationships: []
      }
      user_social_credits: {
        Row: {
          social_credit: number | null
          user_id: string | null
        }
        Relationships: []
      }
      vendor_avg_rating: {
        Row: {
          avg_rating: number | null
          vendor_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "listings_owner_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_consistency: {
        Row: {
          consistency_percentage: number | null
          vendor_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_market_quality: {
        Row: {
          avg_market_quality: number | null
          vendor_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attendance_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_social_credits: {
        Row: {
          social_credit: number | null
          vendor_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_reputation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "market_metrics"
            referencedColumns: ["market_id"]
          },
          {
            foreignKeyName: "vendor_reputation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "user_social_credits"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "vendor_reputation_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_type:
        | "listing_created"
        | "listing_updated"
        | "listing_deleted"
        | "bookmark_added"
        | "verification_received"
        | "review_received"
      bookmark_item_type: "listing" | "content" | "review"
      color_source:
        | "99COLORS_NET"
        | "ART_PAINTS_YG07S"
        | "BYRNE"
        | "CRAYOLA"
        | "CMYK_COLOR_MODEL"
        | "COLORCODE_IS"
        | "COLORHEXA"
        | "COLORXS"
        | "CORNELL_UNIVERSITY"
        | "COLUMBIA_UNIVERSITY"
        | "DUKE_UNIVERSITY"
        | "ENCYCOLORPEDIA_COM"
        | "ETON_COLLEGE"
        | "FANTETTI_AND_PETRACCHI"
        | "FINDTHEDATA_COM"
        | "FERRARIO_1919"
        | "FEDERAL_STANDARD_595"
        | "FLAG_OF_INDIA"
        | "FLAG_OF_SOUTH_AFRICA"
        | "GLAZEBROOK_AND_BALDRY"
        | "GOOGLE"
        | "HEXCOLOR_CO"
        | "ISCC_NBS"
        | "KELLY_MOORE"
        | "MATTEL"
        | "MAERZ_AND_PAUL"
        | "MILK_PAINT"
        | "MUNSELL_COLOR_WHEEL"
        | "NATURAL_COLOR_SYSTEM"
        | "PANTONE"
        | "PLOCHERE"
        | "POURPRE_COM"
        | "RAL"
        | "RESENE"
        | "RGB_COLOR_MODEL"
        | "THOM_POOLE"
        | "UNIVERSITY_OF_ALABAMA"
        | "UNIVERSITY_OF_CALIFORNIA_DAVIS"
        | "UNIVERSITY_OF_CAMBRIDGE"
        | "UNIVERSITY_OF_NORTH_CAROLINA"
        | "UNIVERSITY_OF_TEXAS_AT_AUSTIN"
        | "X11_WEB"
        | "XONA_COM"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

// End of supbase gen types do not edit the above

// Q Added these helper types:
 
    export type Views<T extends keyof Database['public']['Views']> = 
      Database['public']['Views'][T]['Row']
    
    // Common table types
    export type Profile = Tables<'profiles'>
    export type User = Tables<'users'>
    export type Content = Tables<'content'>
    export type Listing = Tables<'listings'>
    export type Bookmark = Tables<'bookmarks'>
    export type Image = Tables<'images'>
    export type Address = Tables<'addresses'>
    export type Verification = Tables<'verifications'>
    export type CrimeReport = Tables<'crime_reports'>
    export type GPSLog = Tables<'gps_logs'>i
    export type SocialLink = Tables<'profile_social_links'>;
    // Add these:
    export type Rating = Tables<'ratings'>
    export type MarketReputation = Tables<'market_reputation'>
    export type MarketCrimeStats = Tables<'market_crime_stats'>
    export type VendorReputation = Tables<'vendor_reputation'>
    export type VendorStats = Tables<'vendor_stats'>
    export type ProfileSocialLinks = Tables<'profile_social_links'>
    export type Availability = Tables<'profile_availability'>
    
    
    // Insert types
    export type InsertProfile = TablesInsert<'profiles'>
    export type InsertListing = TablesInsert<'listings'>
    export type InsertBookmark = TablesInsert<'bookmarks'>
    export type InsertContent = TablesInsert<'content'>
    export type InsertImage = TablesInsert<'images'>
    export type InsertAddress = TablesInsert<'addresses'>
    export type InsertUser = TablesInsert<'users'>
    export type InsertCrimeReport = TablesInsert<'crime_reports'>
    export type InsertFactor = TablesInsert<'factors'>
    export type InsertVerification = TablesInsert<'verifications'>
    export type InsertRating = TablesInsert<'ratings'>
    export type InsertMarketReputation = TablesInsert<'market_reputation'>
    export type InsertMarketCrimeStats = TablesInsert<'market_crime_stats'>
    export type InsertVendorReputation = TablesInsert<'vendor_reputation'>
    export type InsertVendorStats = TablesInsert<'vendor_stats'>
    export type InsertProfileSocialLinks = TablesInsert<'profile_social_links'>
    export type InsertProfileAvailability = TablesInsert<'profile_availability'>


    // Update types
    export type UpdateProfile = TablesUpdate<'profiles'>
    export type UpdateListing = TablesUpdate<'listings'>
    export type UpdateBookmark = TablesUpdate<'bookmarks'>
    export type UpdateImage = TablesUpdate<'images'>
    export type UpdateAddress = TablesUpdate<'addresses'>
    export type UpdateContent = TablesUpdate<'content'>
    export type UpdateUser = TablesUpdate<'users'>
    export type UpdateCrimeReport = TablesUpdate<'crime_reports'>
    export type UpdateVerification = TablesUpdate<'verifications'>
    export type UpdateGPS = TablesUpdate<'gps_logs'>
    export type UpdateRating = TablesUpdate<'ratings'>
    export type UpdateMarketReputation = TablesUpdate<'market_reputation'>
    export type UpdateMarketCrimeStats = TablesUpdate<'market_crime_stats'>
    export type UpdateVendorReputation = TablesUpdate<'vendor_reputation'>
    export type UpdateVendorStats = TablesUpdate<'vendor_stats'>
    export type UpdateProfileSocialLinks = TablesUpdate<'profile_social_links'>
    export type UpdateProfileAvailability = TablesUpdate<'profile_availability'>
    
    // View types (if you're using them)
    export type VendorSocialCredit = Views<'vendor_social_credits'>
    export type SecurityScore = Views<'security_scores'>
    export type MarketMetrics = Views<'market_metrics'>
    export type ProfileFullDetails = Views<'profile_full_details'>
    export type ProfileWithUsername = Views<'profile_with_username'>
    export type ReviewMetrics = Views<'review_metrics'>
    export type FleaScores = Views<'flea_scores'>
    export type ListingScores = Views<'listing_scores'>
    export type VendorAvgRating = Views<'vendor_avg_rating'>
    export type VendorConsistency = Views<'vendor_consistency'>
    export type VendorMarketQuality = Views<'vendor_market_quality'>
    export type UserSocialCredits = Views<'user_social_credits'>
    
    // Type for the Supabase client
    export type TypedSupabaseClient = SupabaseClient<Database>
 
  export type ProfileSocialLink = {
    id: string;
    platform: string;
    url: string;
    verified?: boolean;
    profile_id: string;
    created_at?: string;
    updated_at?: string;
  };
  
  export type ProfileAvailability = {
    id: string;
    day: number;
    start_time: string;
    end_time: string;
    profile_id: string;
    created_at?: string;
    updated_at?: string;
  };
  
  export type UserProfile = {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    chosen_color_id?: number;
    profile_type?: string;
    status_emoji?: string;
    status_message?: string;
    timezone?: string;
    website?: string;
    last_seen_at?: string;
    updated_at?: string;
    notification_preferences?: {
      notification_types: {
        replies: boolean;
        mentions: boolean;
        direct_messages: boolean;
      };
      push_notifications: boolean;
      email_notifications: boolean;
      sms_notifications: boolean;
    };
    // These come from related tables through the view
    social_links?: ProfileSocialLink[];
    availability?: ProfileAvailability[];
    user_type: 'user' | 'vendor' | 'market' | 'admin';
    username: string;
    reputation_score?: number | null;
  };
 
  