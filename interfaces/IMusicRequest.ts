interface IMusicRequest {
    role: string;
    prompt: string;
    duration?: number;
    input_audio?: File;
    continuation?: boolean;
    continuation_start?: number;
    continuation_end?: number;
}