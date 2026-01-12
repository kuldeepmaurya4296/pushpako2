import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // 1. Vercel Blob (Production/configured) - Primary Method if Token exists
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
            if (!request.body) {
                return NextResponse.json({ error: 'No file body provided' }, { status: 400 });
            }
            const blob = await put(filename, request.body, {
                access: 'public',
            });
            return NextResponse.json(blob);
        } catch (error) {
            console.error("Vercel Blob Upload Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    // 2. Local File System (Fallback for localhost without Blob token)
    // CRITICAL: Only allow local file system usage in development environment.
    // In production (Vercel), local files are ephemeral and will be lost.
    if (process.env.NODE_ENV === 'development') {
        try {
            console.log("Using Local Storage Fallback (No BLOB_READ_WRITE_TOKEN found)");

            const arrayBuffer = await request.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Unique name to avoid conflicts locally
            const uniqueName = `${Date.now()}-${filename}`;
            const uploadsDir = join(process.cwd(), 'public', 'uploads');

            await mkdir(uploadsDir, { recursive: true });
            const path = join(uploadsDir, uniqueName);

            await writeFile(path, buffer);

            return NextResponse.json({
                url: `/uploads/${uniqueName}`,
                pathname: uniqueName
            });
        } catch (error) {
            console.error("Local upload failed", error);
            return NextResponse.json({ error: "Local upload failed: " + error.message }, { status: 500 });
        }
    } else {
        // In Production, if Blob token is missing, we must fail.
        console.error("CRITICAL: BLOB_READ_WRITE_TOKEN is missing in production. Cannot upload files.");
        return NextResponse.json({
            error: "Server Configuration Error: File storage is not configured. Please add BLOB_READ_WRITE_TOKEN."
        }, { status: 500 });
    }
}
