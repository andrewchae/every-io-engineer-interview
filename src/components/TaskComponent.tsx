import { useTasks } from '../contexts/TasksContext.tsx';

export default function TaskComponent({ task, categoryIndex, taskIndex }: { task: string, categoryIndex: number, taskIndex: number }) {
  const { moveTask } = useTasks();
  const handleMoveTaskForward = () => {
    moveTask(taskIndex, categoryIndex, categoryIndex + 1);
  };
  const handleMoveTaskBack = () => {
    moveTask(taskIndex, categoryIndex, categoryIndex - 1);
  };
  return (
    <div className="flex flex-row justify-between items-center mb-2">
      <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors inline-block" onClick={handleMoveTaskBack}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span>{task}</span>
      <button className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors inline-block" onClick={handleMoveTaskForward}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

