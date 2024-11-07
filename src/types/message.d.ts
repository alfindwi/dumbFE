import { IUser } from "./user";

export interface IMessage {
    id: number;
    senderId: number;
    roomId: number;
    content: string;
    createdAt: string;
}

export interface IRoom{
    id: number;
    users: IUser;
    createdAt: string;
    updatedAt: string;
    messages: IMessage[];
}
