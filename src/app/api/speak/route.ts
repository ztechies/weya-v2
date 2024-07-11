import { Message } from "ai";
import { NextRequest, NextResponse } from "next/server";

/**
 * Return a stream from the API
 * @param {NextRequest} req - The HTTP request
 * @returns {Promise<NextResponse>} A NextResponse with the streamable response
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY as string;
  if (!ELEVENLABS_API_KEY) {
    throw new Error("Missing ELEVENLABS_API_KEY in environment variables");
  }

  const message: Message = await req.json();
  let text = message.content;

  text = text
    .replaceAll("¡", "")
    .replaceAll("https://", "")
    .replaceAll("http://", "")
    .replaceAll(".com", " dot com")
    .replaceAll(".org", " dot org")
    .replaceAll(".co.uk", " dot co dot UK")
    .replaceAll(/```[\s\S]*?```/g, "\nAs shown on the app.\n")
    .replaceAll(
      /([a-zA-Z0-9])\/([a-zA-Z0-9])/g,
      (match, precedingText, followingText) => {
        return precedingText + " forward slash " + followingText;
      }
    );

  const options = {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.2
      }
    })
  };

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream', options);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'audio/mp3'
      }
    });
  } catch (err:any) {
    console.error(err);
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
}