import { Draggable } from '@hello-pangea/dnd';
import { Task as ITask, useUserTasksStore } from 'app/store/userTasksStore';

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

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`p-2 border rounded ${snapshot.isDragging && 'bg-purple-300'}`}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={{
                        ...provided.draggableProps.style,
                    }}
                    onClick={taskEdit}
                >
                    <p className='text-2xl'>{task.content}</p>
                    <p className='text-gray-300'>#{task.id}</p>
                </div>
            )}
        </Draggable>
    );
}
export default Task;
