import { NextResponse } from 'next/server';

export async function GET() {
  // Return empty data by default as requested by user
  return NextResponse.json(
    {
      data: [],
      message: 'No lyrics available'
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
