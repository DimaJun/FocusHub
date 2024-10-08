import { nanoid } from 'nanoid';
import { create } from 'zustand';

export enum TaskPriority {
    NONE = 'none',
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface Column {
    id: string;
    name: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    content: string;
    priority: TaskPriority;
}

type Store = {
    columns: Column[];
    selectedTask: Task | null;
    isTaskEdit: boolean;
    selectTask: (task: Task | null) => void;
    setIsTaskEdit: (value: boolean) => void;
    addColumn: (name: string) => void;
    addTask: (content: string, columnId: string) => void;
    updateTask: (
        taskId: string,
        content: string,
        priority: TaskPriority,
    ) => void;
    moveTask: (
        sourceColumnId: string,
        destinationColumnId: string,
        sourceIndex: number,
        destinationIndex: number,
    ) => void;
};

const useUserTasksStore = create<Store>()(set => ({
    columns: [],
    selectedTask: null,
    isTaskEdit: false,
    setIsTaskEdit: value => set({ isTaskEdit: value }),
    selectTask: task => set({ selectedTask: task }),
    addColumn: name =>
        set(state => ({
            columns: [...state.columns, { id: nanoid(6), name, tasks: [] }],
        })),
    addTask: (content, columnId) =>
        set(state => ({
            columns: state.columns.map(col =>
                col.id === columnId
                    ? {
                          ...col,
                          tasks: [
                              ...col.tasks,
                              {
                                  id: nanoid(8),
                                  content,
                                  priority: TaskPriority.NONE,
                              },
                          ],
                      }
                    : col,
            ),
        })),
    updateTask: (taskId, content, priority) =>
        set(state => {
            return {
                columns: state.columns.map(col => {
                    const taskIndex = col.tasks.findIndex(
                        task => task.id === taskId,
                    );
                    if (taskIndex === -1) {
                        return { ...col };
                    }

                    const updatedTasks = col.tasks.map((task, index) =>
                        index === taskIndex
                            ? { ...task, content, priority }
                            : task,
                    );

                    return { ...col, tasks: updatedTasks };
                }),
            };
        }),
    moveTask: (
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
    ) =>
        set(state => {
            const sourceColumn = state.columns.find(
                col => col.id === sourceColumnId,
            );
            const destinationColumn = state.columns.find(
                col => col.id === destinationColumnId,
            );

            if (!sourceColumn || !destinationColumn) return state;

            if (sourceColumnId === destinationColumnId) {
                const updatedTasks = [...sourceColumn.tasks];
                const [movedTask] = updatedTasks.splice(sourceIndex, 1);
                updatedTasks.splice(destinationIndex, 0, movedTask);

                return {
                    columns: state.columns.map(col =>
                        col.id === sourceColumnId
                            ? { ...col, tasks: updatedTasks }
                            : col,
                    ),
                };
            } else {
                const sourceTasks = [...sourceColumn.tasks];
                const destinationTasks = [...destinationColumn.tasks];

                const [movedTask] = sourceTasks.splice(sourceIndex, 1);

                destinationTasks.splice(destinationIndex, 0, movedTask);

                return {
                    columns: state.columns.map(col => {
                        if (col.id === sourceColumnId) {
                            return { ...col, tasks: sourceTasks };
                        }
                        if (col.id === destinationColumnId) {
                            return { ...col, tasks: destinationTasks };
                        }
                        return col;
                    }),
                };
            }
        }),
}));

export { useUserTasksStore };
