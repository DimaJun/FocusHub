import Column from "./components/Column";

function Board () {
  return (
    <div className="flex gap-x-4 h-full">
      <Column/>
      <Column/>
      <Column/>
      <Column/>
      <Column/>
    </div>
  );
};
export default Board;