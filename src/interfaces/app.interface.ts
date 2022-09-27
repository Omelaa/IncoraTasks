import { IProject } from "./project.interface";

interface IApp {
    name: string;
    setName(name: string): void;
    projects: IProject[];
    addProject(project: IProject): void;
};

export type {
    IApp
};

