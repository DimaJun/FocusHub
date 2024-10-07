import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useUserTasksStore } from 'app/store/userTasksStore';
import { useEffect, useRef, useState } from 'react';
import Column from './components/Column';
import Sidebar from './components/Sidebar';

function Board() {
    const [isColumnAdd, setIsColumnAdd] = useState(false);
    const [columnName, setColumnName] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const { columns, addColumn, moveTask, selectedTask } = useUserTasksStore();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (columnName.trim()) {
                addColumn(columnName);
                setColumnName('');
                setIsColumnAdd(false);
            }
        }
    };

    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        moveTask(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
        );
    };

    useEffect(() => {
        if (isColumnAdd) {
            inputRef.current?.focus();
        }
        console.log(selectedTask);
    }, [isColumnAdd, selectedTask]);

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='flex items-start gap-x-4 h-full'>
                <button
                    className='border border-purple-500 rounded-full p-1 text-purple-500 active:scale-95 duration-300 active:text-purple-300'
                    onClick={() => setIsColumnAdd(true)}
                >
                    <PlusIcon width={30} />
                </button>
                {isColumnAdd && (
                    <input
                        ref={inputRef}
                        className='border h-10 max-w-[200px] min-w-[200px] p-2 text-gray-500 rounded'
                        type='text'
                        value={columnName}
                        onChange={e => setColumnName(e.target.value)}
                        onBlur={() => {
                            setIsColumnAdd(false);
                            setColumnName('');
                        }}
                        onKeyDown={e => handleKeyDown(e)}
                    />
                )}
                {columns.map(column => (
                    <Column
                        key={column.id}
                        columnName={column.name}
                        tasks={column.tasks}
                        columnId={column.id}
                    />
                ))}
            </div>
            <Sidebar task={selectedTask} />
        </DragDropContext>
    );
}
export default Board;
