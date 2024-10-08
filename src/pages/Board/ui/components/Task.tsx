import { Draggable } from '@hello-pangea/dnd';
import {
    Task as ITask,
    TaskPriority,
    useUserTasksStore,
} from 'app/store/userTasksStore';

interface TaskProps {
    task: ITask;
    index: number;
}

function Task({ task, index }: TaskProps) {
    const { selectTask, setIsTaskEdit, isTaskEdit } = useUserTasksStore();

    const taskEdit = () => {
        const newIsTaskEdit = !isTaskEdit;
        setIsTaskEdit(newIsTaskEdit);
        selectTask(newIsTaskEdit ? task : null);
    };

    const switchPriority = () => {
        switch (task.priority) {
            case TaskPriority.LOW:
                return 'border-sky-500 border-2';
            case TaskPriority.MEDIUM:
                return 'border-orange-500 border-2';
            case TaskPriority.HIGH:
                return 'border-red-500 border-2';
            case TaskPriority.NONE:
                return '';
        }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`p-2 border rounded ${switchPriority()} ${snapshot.isDragging && 'bg-purple-300'} duration-0`}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={{
                        ...provided.draggableProps.style,
                    }}
                    onClick={taskEdit}
                >
                    <p className='text-2xl'>{task.content}</p>
                    <p className='text-gray-200'>#{task.id}</p>
                </div>
            )}
        </Draggable>
    );
}
export default Task;
