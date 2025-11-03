import CategoryComponent from './components/CategoryComponent.tsx';
import { CATEGORIES } from './utils/consts.ts';
import { useState } from 'react';
import { useTasks } from './contexts/TasksContext.tsx';
  
export function ChallengeComponent() {
  const { tasks, addTask } = useTasks();
  const [newTask, setNewTask] = useState<string>('');
  
  const handleAddTask = () => {
    addTask(newTask);
    setNewTask('');
  };

  return (
    <>
      <div className="flex flex-row p-4">
        {CATEGORIES.map((category, index) => (
          <CategoryComponent key={category} category={category} categoryIndex={index} tasks={tasks[index] || []} />
        ))}
      </div>
      <div className='flex flex-row p-4 m-2 gap-2'>
        <input type="text" placeholder="Add task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block" onClick={handleAddTask}>
          +
        </button>
      </div>
    </>
  );
}
