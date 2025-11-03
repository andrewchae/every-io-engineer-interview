import TaskComponent from './TaskComponent.tsx';
import { useTasks } from '../contexts/TasksContext.tsx';

export default function CategoryComponent({ category, categoryIndex }: { category: string, categoryIndex: number }) {
  const { tasks: allTasks } = useTasks();
  const tasks = allTasks[categoryIndex] || [];
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-300 p-4 mx-2">
      <h2 className="text-lg font-semibold mb-4 text-center">{category}</h2>
      {tasks.map((task, index) => (
        <TaskComponent key={task} task={task} categoryIndex={categoryIndex} taskIndex={index} />
      ))}
    </div>
  );
}