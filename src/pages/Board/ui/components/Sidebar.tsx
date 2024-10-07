import { Task, useUserTasksStore } from 'app/store/userTasksStore';
import { ChangeEvent, useEffect, useState } from 'react';

interface SidebarProps {
    task: Task | null;
}

interface FormData {
    id: string | '';
    content: string | '';
}

function Sidebar({ task }: SidebarProps) {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        content: '',
    });

    const { isTaskEdit } = useUserTasksStore();

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id,
                content: task.content,
            });
        } else {
            setFormData({
                id: '',
                content: '',
            });
        }
    }, [task]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
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
                        <div className='mt-2 flex gap-x-2'>
                            <button
                                type='button'
                                className='p-2 bg-purple-800 rounded font-medium text-white active:bg-purple-700'
                            >
                                Save
                            </button>
                            <button
                                type='button'
                                className='p-2 bg-purple-800 rounded font-medium text-white active:bg-purple-700'
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
