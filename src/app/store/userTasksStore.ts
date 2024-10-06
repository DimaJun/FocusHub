import { nanoid } from 'nanoid';
import { create } from 'zustand';

export interface Column {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    content: string;
}

type Store = {
    columns: Column[];
    addColumn: (name: string) => void;
};

const useUserTasksStore = create<Store>()(set => ({
    columns: [],
    addColumn: name =>
        set(state => ({
            columns: [...state.columns, { id: nanoid(6), name, tasks: [] }],
        })),
}));

export { useUserTasksStore };
