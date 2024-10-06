import { useState } from "react";
import Task from "./Task";

const initialTasks = [
    {id: '123sd', content: 'curwa'},
    {id: '12133sd', content: 'csadurwa'},
    {id: '123sdawd', content: 'curwa'}
]

function Column () {

    const [tasks, _setTasks] = useState(initialTasks);
    
  return (
    <div className="w-[300px] flex-grow flex-shrink-0 border rounded h-full">
        <h2 className="p-3 border-b-2 font-medium text-xl">Column Name</h2>
        <div className="p-3 flex flex-col gap-y-2">
            {tasks.map(task => <Task key={task.id} {...task}/>)}
        </div>
    </div>
  );
};
export default Column;