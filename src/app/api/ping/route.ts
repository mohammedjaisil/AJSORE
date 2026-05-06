
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ status: "Server is awake", timestamp: new Date().toISOString() });
}
