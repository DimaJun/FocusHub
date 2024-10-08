import {
    Task,
    TaskPriority,
    useUserTasksStore,
} from 'app/store/userTasksStore';
import { ChangeEvent, useEffect, useState } from 'react';

interface SidebarProps {
    task: Task | null;
}

interface FormData {
    id: string | '';
    content: string | '';
    priority: TaskPriority;
}

function Sidebar({ task }: SidebarProps) {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        content: '',
        priority: TaskPriority.NONE,
    });

    const { isTaskEdit, setIsTaskEdit, updateTask } = useUserTasksStore();

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id,
                content: task.content,
                priority:
                    task.priority !== TaskPriority.NONE
                        ? task.priority
                        : TaskPriority.NONE,
            });
        } else {
            setFormData({
                id: '',
                content: '',
                priority: TaskPriority.NONE,
            });
        }
    }, [task]);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSave = () => {
        if (formData.content.trim()) {
            if (task) {
                updateTask(task.id, formData.content.trim(), formData.priority);
                setFormData({
                    id: '',
                    content: '',
                    priority: TaskPriority.NONE,
                });
                setIsTaskEdit(false);
            }
        }
    };

    return (
        <div
            className={`p-2 bg-purple-300 fixed right-0 top-0 w-72 h-full ${isTaskEdit ? 'translate-x-0' : 'translate-x-full'} duration-300 shadow`}
        >
            {task && (
                <>
                    <p className='text-xl w-fit'>Task</p>
                    <span className='text-gray-100 '>#{formData.id}</span>
                    <form className='mt-2'>
                        <label className='flex flex-col' htmlFor='contentI'>
                            Content
                            <input
                                className='p-2 border bg-purple-100 rounded'
                                type='text'
                                name='content'
                                id='contentI'
                                value={formData.content}
                                onChange={e => onChange(e)}
                            />
                        </label>
                        <label className='flex flex-col' htmlFor='priorityS'>
                            Priority
                            <select
                                className='p-2 border bg-purple-100 rounded'
                                name='priority'
                                id='priorityS'
                                value={formData.priority}
                                onChange={e => onChange(e)}
                            >
                                <option value={TaskPriority.NONE}>none</option>
                                <option value={TaskPriority.LOW}>Low</option>
                                <option value={TaskPriority.MEDIUM}>
                                    Medium
                                </option>
                                <option value={TaskPriority.HIGH}>High</option>
                            </select>
                        </label>
                        <div className='mt-2 flex gap-x-2'>
                            <button
                                type='button'
                                className='p-2 bg-purple-800 rounded font-medium text-white active:bg-purple-700'
                                onClick={onSave}
                            >
                                Save
                            </button>
                            <button
                                type='button'
                                className='p-2 bg-purple-800 rounded font-medium text-white active:bg-purple-700'
                                onClick={() => setIsTaskEdit(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
export default Sidebar;
