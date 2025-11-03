import CategoryComponent from './components/CategoryComponent.tsx';
import { CATEGORIES, INITIAL_TASKS } from './utils/consts.ts';
import { useState } from 'react';
  
export function ChallengeComponent() {
  const [tasks, setTasks] = useState<string[][]>(INITIAL_TASKS);
  const [newTask, setNewTask] = useState<string>('');
  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }
    const newTasks = [...tasks];
    newTasks[0].push(newTask);
    setTasks(newTasks);
    setNewTask('');
  };

  return (
    <>
      <div className="flex flex-row p-4">
        {CATEGORIES.map((category, index) => (
          <CategoryComponent key={category} category={category} tasks={tasks[index] || []} />
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
