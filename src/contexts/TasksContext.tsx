import { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_TASKS } from '../utils/consts.ts';
import { Task } from '../types';

interface TasksContextType {
  tasks: Task[][];
  addTask: (title: string) => void;
  moveTask: (taskId: string, fromCategory: number, toCategory: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[][]>(INITIAL_TASKS);

  const addTask = (title: string) => {
    if (title.trim() === '') {
      return;
    }
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[0] = [...newTasks[0], { id: crypto.randomUUID(), title }];
      return newTasks;
    });
  };

  const moveTask = (taskId: string, fromCategory: number, toCategory: number) => {
    if (toCategory < 0 || toCategory >= tasks.length) {
      return;
    }
    
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((category) => [...category]);
      const taskIndex = newTasks[fromCategory].findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        return prevTasks;
      }
      const task = newTasks[fromCategory][taskIndex];
      newTasks[fromCategory].splice(taskIndex, 1);
      newTasks[toCategory].push(task);
      return newTasks;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, moveTask }}>
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

