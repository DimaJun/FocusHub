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
    const [newColumnName, setNewColumnName] = useState(columnName);
    const [isColumnUpdate, setIsColumnUpdate] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const colRef = useRef<HTMLInputElement>(null);

    const { addTask, updateColumn } = useUserTasksStore();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (taskName.trim()) {
                addTask(taskName, columnId);
                setTaskName('');
                setIsTaskAdd(false);
            }
        }
    };

    const changeColumnName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newColumnName.trim()) {
                updateColumn(columnId, newColumnName);
                setNewColumnName(newColumnName);
                setIsColumnUpdate(false);
            }
        }
    };

    useEffect(() => {
        if (isTaskAdd) {
            inputRef.current?.focus();
        }
        if (isColumnUpdate) {
            colRef.current?.focus();
        }
    }, [isTaskAdd, isColumnUpdate]);

    return (
        <div className='max-w-[300px] w-[300px] flex-grow flex-shrink-0 border rounded h-full'>
            <div className='flex items-center justify-between p-3 border-b-2'>
                {isColumnUpdate ? (
                    <>
                        <input
                            ref={colRef}
                            className='border h-10 max-w-[200px] min-w-[200px] p-2 text-gray-500 rounded'
                            type='text'
                            value={newColumnName}
                            onChange={e => setNewColumnName(e.target.value)}
                            onBlur={() => setIsColumnUpdate(false)}
                            onKeyDown={e => changeColumnName(e)}
                        />
                    </>
                ) : (
                    <>
                        <h2
                            onClick={() => {
                                setIsColumnUpdate(true);
                                setNewColumnName(newColumnName);
                            }}
                            className='font-medium text-xl'
                        >
                            {columnName} ({tasks.length})
                        </h2>
                        <button onClick={() => setIsTaskAdd(true)}>
                            <PlusIcon width={24} />
                        </button>
                    </>
                )}
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
