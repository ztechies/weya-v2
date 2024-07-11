import { Message } from "ai";
export interface Error {
    error: {
        message: string
    }
}

export type VerificationResult = string | Error;
export interface MessageMetadata extends Partial<Message> {
    start?: number;
    response?: number;
    end?: number;
    ttsModel?: string;
  }