export interface FileOperationRequest {
  path: string; // Path to the file/folder
  content?: string; // Optional file content (for create/update)
}

export interface FileResponse {
  path: string;
  content?: string;
  message?: string;
}

