function Task (task: {id: string, content: string}) {
  return (
    <div className="p-2 border rounded">
      <p>{task.content}</p>
      <p>#{task.id}</p>
    </div>
  );
};
export default Task;