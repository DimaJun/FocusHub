import { Task as ITask } from 'app/store/userTasksStore';
import Task from './Task';
import { PlusIcon } from '@heroicons/react/24/solid';

interface ColumnProps {
    tasks: ITask[];
    columnName: string;
}

function Column({ tasks, columnName }: ColumnProps) {
    return (
        <div className='max-w-[300px] w-[300px] flex-grow flex-shrink-0 border rounded h-full'>
            <div className='flex items-center justify-between p-3 border-b-2'>
                <h2 className='font-medium text-xl'>
                    {columnName}
                </h2>
                <button>
                    <PlusIcon width={24}/>
                </button>
            </div>
            <div className='p-3 flex flex-col gap-y-2'>
                
                {tasks.map(task => (
                    <Task key={task.id} {...task} />
                ))}
            </div>
        </div>
    );
}
export default Column;
