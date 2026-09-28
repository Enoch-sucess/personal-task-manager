export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  token: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  identifier: string;
  password: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  register: (formData: RegisterForm) => Promise<void>;
  login: (formData: LoginForm) => Promise<void>;
  logout: () => void;
}

export interface Task {
  _id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  description?: string;
  category: "Work" | "Personal" | "Urgent";
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewTaskData {
  title: string;
  description?: string;
  category: "Work" | "Personal" | "Urgent";
  dueDate: string;
}

export type EditTask = Partial<NewTaskData>;

export interface TaskContextValue {
  tasks: Task[];
  ongoing: Task[];
  completed: Task[];
  error: string | null;
  createTask: (taskData: NewTaskData) => Promise<void>;
  updateTask: (id: string, updatedTask: EditTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}