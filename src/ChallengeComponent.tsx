import CategoryComponent from './components/CategoryComponent.tsx';
import { CATEGORIES, INITIAL_TASKS } from './utils/consts.ts';
import { useState } from 'react';
  
export function ChallengeComponent() {
  const [tasks, setTasks] = useState<string[][]>(INITIAL_TASKS);
  return (
    <div className="flex flex-row p-4">
      {CATEGORIES.map((category, index) => (
        <CategoryComponent key={category} category={category} tasks={tasks[index] || []} />
      ))}
    </div>
  );
}
