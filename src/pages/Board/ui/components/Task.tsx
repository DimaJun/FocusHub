import { Draggable } from '@hello-pangea/dnd';
import { Task as ITask } from 'app/store/userTasksStore';

interface TaskProps {
    task: ITask;
    index: number;
}

function Task({ task, index }: TaskProps) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <div 
                  className='p-2 border rounded'
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  style={{
                    ...provided.draggableProps.style
                  }}
                >
                    <p>{task.content}</p>
                    <p>#{task.id}</p>
                </div>
            )}
        </Draggable>
    );
}
export default Task;
