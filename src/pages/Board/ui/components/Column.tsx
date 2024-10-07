import { Droppable } from '@hello-pangea/dnd';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Task as ITask, useUserTasksStore } from 'app/store/userTasksStore';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import Task from './Task';

interface ColumnProps {
    tasks: ITask[];
    columnName: string;
    columnId: string;
}

function Column({ tasks, columnName, columnId }: ColumnProps) {
    const [isTaskAdd, setIsTaskAdd] = useState(false);
    const [taskName, setTaskName] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { addTask } = useUserTasksStore();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (taskName.trim()) {
                addTask(taskName, columnId);
                setTaskName('');
                setIsTaskAdd(false);
            }
        }
    };

    useEffect(() => {
        if (isTaskAdd) {
            inputRef.current?.focus();
        }
    }, [isTaskAdd]);

    return (
        <div className='max-w-[300px] w-[300px] flex-grow flex-shrink-0 border rounded h-full'>
            <div className='flex items-center justify-between p-3 border-b-2'>
                <h2 className='font-medium text-xl'>
                    {columnName} ({tasks.length})
                </h2>
                <button onClick={() => setIsTaskAdd(true)}>
                    <PlusIcon width={24} />
                </button>
            </div>
            <Droppable droppableId={columnId}>
                {provided => (
                    <div
                        className='h-[92%] p-3 flex flex-col gap-y-2 overflow-y-auto'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {isTaskAdd && (
                            <input
                                className='border p-2 text-gray-500'
                                ref={inputRef}
                                type='text'
                                value={taskName}
                                onChange={e => setTaskName(e.target.value)}
                                onBlur={() => setIsTaskAdd(false)}
                                onKeyDown={e => handleKeyDown(e)}
                            />
                        )}
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
export default Column;
