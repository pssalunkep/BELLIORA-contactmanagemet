import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Check for Supabase configuration
    let supabase;
    try {
      supabase = getSupabaseClient();
    } catch (configError) {
      return NextResponse.json(
        { error: 'Server configuration error: ' + (configError instanceof Error ? configError.message : 'Missing Supabase credentials') },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, phone, interested, message } = body;

    // Validate required fields
    if (!name || !phone || !interested) {
      return NextResponse.json(
        { error: 'Name, phone number, and interested field are required' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          interested: interested || null,
          message: message || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      
      // Provide more helpful error messages
      if (error.code === '42501') {
        return NextResponse.json(
          { 
            error: 'Row Level Security policy error. Please check your Supabase RLS policies. See FIX_RLS_POLICY.md for instructions.',
            details: error.message 
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to save contact information',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

