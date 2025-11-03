import { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_TASKS } from '../utils/consts.ts';

interface TasksContextType {
  tasks: string[][];
  addTask: (task: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<string[][]>(INITIAL_TASKS);

  const addTask = (task: string) => {
    if (task.trim() === '') {
      return;
    }
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[0] = [...newTasks[0], task];
      return newTasks;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

