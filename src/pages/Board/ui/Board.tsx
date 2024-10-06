import { PlusIcon } from '@heroicons/react/24/solid';
import { useUserTasksStore } from 'app/store/userTasksStore';
import { useEffect, useRef, useState } from 'react';
import Column from './components/Column';

function Board() {
    const [isColumnAdd, setIsColumnAdd] = useState(false);
    const [columnName, setColumnName] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const { columns, addColumn } = useUserTasksStore();

    const handleAddColumn = (name: string) => {
        if (name.trim()) {
            addColumn(name);
            setColumnName('');
            setIsColumnAdd(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddColumn(columnName);
        }
    };

    useEffect(() => {
        if (isColumnAdd) {
            inputRef.current?.focus();
        }
    }, [isColumnAdd]);

    return (
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
                    className='border h-10 max-w-[200px] w-full p-2 text-gray-500 rounded'
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
                />
            ))}
        </div>
    );
}
export default Board;
