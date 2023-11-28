export interface IUploadFileResponse {
    status: "success" | "error";
    message: string;
    fileUrl: string | undefined;
}