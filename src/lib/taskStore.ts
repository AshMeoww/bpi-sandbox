export type Task = {
  id: number;
  title: string;
  reward: number;
  badge: string;
  status: "pending" | "completed";
  assignedDate: string;
  isNew: boolean;
};

export const TaskStore = {
  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return [];
    const tasks = localStorage.getItem('sandbox-tasks');
    return tasks ? JSON.parse(tasks) : [
      { id: 1, title: "Clean your room", reward: 25, badge: "Helper", status: "pending", assignedDate: "2024-01-16", isNew: true },
      { id: 2, title: "Help with groceries", reward: 20, badge: "", status: "completed", assignedDate: "2024-01-15", isNew: false },
    ];
  },

  saveTasks: (tasks: Task[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sandbox-tasks', JSON.stringify(tasks));
    window.dispatchEvent(new CustomEvent('tasks-updated'));
  },

  addTask: (task: Omit<Task, 'id' | 'assignedDate' | 'isNew'>) => {
    const tasks = TaskStore.getTasks();
    const newTask: Task = {
      ...task,
      id: Date.now(),
      assignedDate: new Date().toISOString().split('T')[0],
      isNew: true,
      status: "pending"
    };
    TaskStore.saveTasks([newTask, ...tasks]);
  },

  updateTask: (taskId: number, updates: Partial<Task>) => {
    const tasks = TaskStore.getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    TaskStore.saveTasks(updatedTasks);
  }
};