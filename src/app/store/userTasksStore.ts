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
    addTask: (content: string, columnId: string) => void;
};

const useUserTasksStore = create<Store>()(set => ({
    columns: [],
    addColumn: name =>
        set(state => ({
            columns: [...state.columns, { id: nanoid(6), name, tasks: [] }],
        })),
    addTask: (content, columnId) => set(state => ({
       columns: state.columns.map(col => 
        col.id === columnId
        ? {...col, tasks: [...col.tasks, {id: nanoid(8), content}]}
        : col
       ) 
    }))
}));

export { useUserTasksStore };
