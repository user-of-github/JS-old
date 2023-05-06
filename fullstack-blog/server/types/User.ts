export interface User {
    name: string;
    email: string;
    passwordHash: string;
    avatarUrl?: string;
    _id: string | unknown;
    createdAt: unknown;
    updatedAt: unknown;
}

export interface UserDocumentResult {
    _doc: User;
    _id: unknown;
}
