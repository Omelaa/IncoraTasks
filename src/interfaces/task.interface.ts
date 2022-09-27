import { IUser } from "./user.interface";

interface ITask {
    id: number;
    durationInMin: number;
    completed: boolean;
    developer: IUser;
    getInfo(): string;
};

export type {
    ITask
};
