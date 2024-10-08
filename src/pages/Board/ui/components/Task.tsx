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
                return 'bg-sky-300';
            case TaskPriority.MEDIUM:
                return 'bg-orange-500';
            case TaskPriority.HIGH:
                return 'bg-red-600';
            case TaskPriority.NONE:
                return 'bg-white';
        }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`p-2 border rounded ${snapshot.isDragging && 'bg-purple-300'} ${switchPriority()}`}
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
