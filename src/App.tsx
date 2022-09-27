import {IApp, IProject, ITask, IUser} from "./interfaces";

function App() {

    class User implements IUser {
        id: number;
        name: string;

        constructor(name: string) {
            this.id = new Date().getTime();
            this.name = name;
        };
    };

    class App implements IApp {
        name: string;
        projects: IProject[];

        constructor(name: string, projects: IProject[]) {
            this.name = name;
            this.projects = projects;
        };

        setName(name: string): void {
            this.name = name;
        }

        addProject(project: IProject): void {
            this.projects.push(project);
        };
    };

    class Task implements ITask {
        id: number;
        durationInMin: number;
        completed: boolean;
        developer: IUser;

        constructor(id: number, durationInMin: number, completed: boolean, developer: IUser) {
            this.id = id;
            this.durationInMin = durationInMin;
            this.completed = completed;
            this.developer = developer;
        };

        getInfo(): string {
            return `
        ID: ${this.id},
        Duration: ${this.durationInMin}m,
        Developer: ${this.developer.name},
        Status: ${this.completed ? 'completed.' : 'not completed.'}
        `;
        }
    };

    class Project implements IProject {
        tasks: ITask[];

        constructor(tasks: ITask[]) {
            this.tasks = tasks;
        };

        addTask(task: ITask): void {
            this.tasks.push(task);
        };

        editTask(task: Partial<ITask>): void {
            const getTaskForEdit = this.tasks.map((getTask) => getTask.id === task.id);
            // getTaskForEdit? Object.assign(getTaskForEdit, task) : throw new Error('Error');
            if (getTaskForEdit) {
                Object.assign(getTaskForEdit, task);
            } else {
                throw new Error('Error');
            }
        };

        deleteTask(id: number): void {
            this.tasks = this.tasks.filter(value => value.id !== id);
            console.log(this.tasks);
        }

        getTotalTime(): number {
            return this.tasks.reduce((prev, curr) => prev + curr.durationInMin, 0);
        }

        getAllTasksByDeveloper(id: number): ITask[] {
            return this.tasks.filter(task => task.developer.id === id);
        };
    };

    const user1 = new User('Ivan');
    const user2 = new User('Zheka');
    const user3 = new User('Liza');
    const user4 = new User('Eva');

    const testTask1 = new Task(0, 20, true, user1);
    const testTask2 = new Task(1, 40, true, user1);
    const testTask3 = new Task(2, 60, true, user2);
    const testTask4 = new Task(3, 45, true, user3);
    const testTask5 = new Task(4, 35, true, user4);

    const projectTest = new Project([testTask1, testTask2, testTask3, testTask4, testTask5]);

    console.log(user1);
    console.log(testTask1);
    console.log(projectTest);
    console.log(testTask3.getInfo());
    console.log(projectTest.deleteTask(1));
    console.log(projectTest.getTotalTime());
    console.log(projectTest.getAllTasksByDeveloper(0));

    return (
        <div>
            App
        </div>
    );
}

export default App;
