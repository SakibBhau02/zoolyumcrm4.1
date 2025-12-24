"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Trash2,
  Edit,
  Copy,
  Users,
  MessageSquare,
  Paperclip,
  Activity,
  BarChart2,
  List as ListIcon,
  Layout,
  Link,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Filter as FilterIcon,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Send,
  UserPlus,
  ArrowRight,
  TrendingUp,
  History,
  ShieldCheck,
  Lock,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Play,
  Square,
  Trello,
  Maximize,
  Minimize,
  Timer,
  Zap,
  Plus,
  Search,
  Flag,
  Calendar,
  Tag,
  Circle,
  Clock,
  CheckSquare,
  AlertTriangle,
  MoreHorizontal,
  Upload,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SubTask {
  id: string
  title: string
  completed: boolean
}

interface Comment {
  id: string
  user: { name: string; avatar?: string; initials: string }
  text: string
  timestamp: string
}

interface TimeLog {
  id: string
  user: string
  duration: number // in minutes
  date: string
  notes?: string
}

interface Attachment {
  id: string
  name: string
  size: string
  type: string
  url: string
  uploadedAt: string
}

interface HistoryEvent {
  id: string
  type: "status_change" | "priority_change" | "assignee_change" | "comment_added" | "file_uploaded" | "task_created" | "manual_update"
  author: { name: string; avatar?: string; initials: string }
  description: string
  oldValue?: string
  newValue?: string
  timestamp: string
}

interface Reference {
  id: string
  title: string
  type: "document" | "task" | "url"
  url?: string
}

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  project: string
  projectCategory: "Development" | "Marketing" | "Design" | "Sales"
  assignee: { name: string; initials: string; avatar?: string }
  dueDate: string
  startDate?: string
  tags: string[]
  subtasks: SubTask[]
  estimatedTime?: number // in hours
  spentTime?: number // in hours
  budget?: number
  cost?: number
  dependencies?: string[] // task IDs
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly"
    interval: number
  }
  comments: Comment[]
  attachments: Attachment[]
  timeLogs: TimeLog[]
  history: HistoryEvent[]
  references: Reference[]
  parentTaskId?: string
  lastActivity?: string
  version?: number
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create wireframes for the new homepage design including hero, features, and footer sections",
    status: "completed",
    priority: "high",
    project: "E-commerce Redesign",
    projectCategory: "Design",
    assignee: { name: "Sarah Mitchell", initials: "SM" },
    dueDate: "2024-12-18",
    tags: ["Design", "UI/UX"],
    subtasks: [
      { id: "1a", title: "Hero section wireframe", completed: true },
      { id: "1b", title: "Features section wireframe", completed: true },
      { id: "1c", title: "Footer wireframe", completed: true },
    ],
    comments: [
      {
        id: "c1",
        user: { name: "John Doe", initials: "JD" },
        text: "Looking Great! Can we add a newsletter section too?",
        timestamp: "2024-12-15T10:30:00Z",
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "homepage-v1.fig",
        size: "2.4 MB",
        type: "Figma",
        url: "#",
        uploadedAt: "2024-12-15T11:00:00Z",
      },
    ],
    timeLogs: [{ id: "t1", user: "Sarah Mitchell", duration: 120, date: "2024-12-15" }],
    history: [
      {
        id: "h1",
        type: "task_created",
        author: { name: "John Doe", initials: "JD" },
        description: "Task created and assigned to Sarah Mitchell",
        timestamp: "2024-12-10T09:00:00Z"
      },
      {
        id: "h2",
        type: "status_change",
        author: { name: "Sarah Mitchell", initials: "SM" },
        description: "Status changed to Completed",
        oldValue: "review",
        newValue: "completed",
        timestamp: "2024-12-18T16:45:00Z"
      }
    ],
    references: [
      { id: "r1", title: "Brand Guidelines", type: "document", url: "#" },
      { id: "r2", title: "User Personas", type: "document", url: "#" }
    ],
    estimatedTime: 4,
    spentTime: 2,
    budget: 500,
    cost: 250,
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up login, register, and password reset functionality",
    status: "in-progress",
    priority: "urgent",
    project: "E-commerce Redesign",
    projectCategory: "Development",
    assignee: { name: "John Doe", initials: "JD" },
    dueDate: "2024-12-20",
    tags: ["Development", "Backend"],
    subtasks: [
      { id: "2a", title: "Login form", completed: true },
      { id: "2b", title: "Registration form", completed: true },
      { id: "2c", title: "Password reset", completed: false },
      { id: "2d", title: "Email verification", completed: false },
    ],
    comments: [],
    attachments: [],
    timeLogs: [],
    history: [],
    references: [],
    estimatedTime: 8,
    spentTime: 5,
    budget: 1200,
    cost: 800,
  },
  {
    id: "3",
    title: "Keyword research report",
    description: "Complete keyword research and competitor analysis for Q4 SEO campaign",
    status: "review",
    priority: "medium",
    project: "SEO Campaign Q4",
    projectCategory: "Marketing",
    assignee: { name: "Emily Chen", initials: "EC" },
    dueDate: "2024-12-19",
    tags: ["SEO", "Research"],
    subtasks: [],
    comments: [],
    attachments: [],
    timeLogs: [],
    history: [],
    references: [],
    estimatedTime: 6,
    spentTime: 4,
    budget: 300,
    cost: 200,
  },
  {
    id: "4",
    title: "Create Instagram content calendar",
    description: "Plan and schedule content for the next 30 days",
    status: "todo",
    priority: "medium",
    project: "Social Media Strategy",
    projectCategory: "Marketing",
    assignee: { name: "Amanda Torres", initials: "AT" },
    dueDate: "2024-12-22",
    tags: ["Social Media", "Content"],
    subtasks: [],
    comments: [],
    attachments: [],
    timeLogs: [],
    history: [],
    references: [],
    estimatedTime: 4,
    spentTime: 0,
    budget: 400,
    cost: 0,
  },
  {
    id: "5",
    title: "Set up Google Analytics 4",
    description: "Migrate from Universal Analytics to GA4 and configure events",
    status: "in-progress",
    priority: "high",
    project: "E-commerce Redesign",
    projectCategory: "Marketing",
    assignee: { name: "James Wilson", initials: "JW" },
    dueDate: "2024-12-21",
    tags: ["Analytics", "Setup"],
    subtasks: [],
    comments: [],
    attachments: [],
    timeLogs: [],
    history: [],
    references: [],
    estimatedTime: 5,
    spentTime: 3,
    budget: 600,
    cost: 400,
  },
  {
    id: "6",
    title: "Write meta descriptions",
    description: "Optimize meta descriptions for top 50 landing pages",
    status: "todo",
    priority: "low",
    project: "SEO Campaign Q4",
    projectCategory: "Marketing",
    assignee: { name: "Michael Brown", initials: "MB" },
    dueDate: "2024-12-25",
    tags: ["SEO", "Content"],
    subtasks: [],
    comments: [],
    attachments: [],
    timeLogs: [],
    history: [],
    references: [],
    estimatedTime: 3,
    spentTime: 0,
    budget: 200,
    cost: 0,
  },
]

const statusConfig = {
  todo: { label: "To Do", icon: Circle, color: "text-muted-foreground" },
  "in-progress": { label: "In Progress", icon: Clock, color: "text-primary" },
  review: { label: "Review", icon: AlertTriangle, color: "text-warning" },
  completed: { label: "Completed", icon: CheckSquare, color: "text-success" },
}

const priorityConfig = {
  low: { label: "Low", color: "bg-muted text-muted-foreground", flagColor: "text-muted-foreground" },
  medium: { label: "Medium", color: "bg-chart-1/20 text-chart-1", flagColor: "text-chart-1" },
  high: { label: "High", color: "bg-warning/20 text-warning", flagColor: "text-warning" },
  urgent: { label: "Urgent", color: "bg-destructive/20 text-destructive", flagColor: "text-destructive" },
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"board" | "list" | "calendar" | "timeline" | "grid">("board")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [expandedTasks, setExpandedTasks] = useState<string[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false)
  const [activeTimer, setActiveTimer] = useState<{ taskId: string; startTime: number; duration: number } | null>(null)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = (taskId: string) => {
    if (activeTimer && activeTimer.taskId === taskId) return

    if (timerInterval) clearInterval(timerInterval)

    const startTime = Date.now()
    const newTimer = { taskId, startTime, duration: 0 }
    setActiveTimer(newTimer)

    const interval = setInterval(() => {
      setActiveTimer(prev => prev ? { ...prev, duration: Math.floor((Date.now() - prev.startTime) / 1000) } : null)
    }, 1000)
    setTimerInterval(interval)
  }

  const stopTimer = () => {
    if (timerInterval) clearInterval(timerInterval)
    setTimerInterval(null)
    setActiveTimer(null)
    // In a real app, we would save the time log here
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || task.projectCategory === categoryFilter
    const matchesAssignee = assigneeFilter === "all" || task.assignee.name === assigneeFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignee
  })

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    review: tasks.filter((t) => t.status === "review").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "completed" ? "todo" : "completed" } : task,
      ),
    )
  }

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
            ...task,
            subtasks: task.subtasks?.map((st) => (st.id === subtaskId ? { ...st, completed: !st.completed } : st)),
          }
          : task,
      ),
    )
  }

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: "todo",
      priority: formData.get("priority") as "low" | "medium" | "high" | "urgent",
      project: formData.get("project") as string,
      projectCategory: (formData.get("category") as any) || "Development",
      assignee: { name: "John Doe", initials: "JD" },
      dueDate: formData.get("dueDate") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      subtasks: [],
      comments: [],
      attachments: [],
      timeLogs: [],
      history: [
        {
          id: Date.now().toString(),
          type: "task_created",
          author: { name: "John Doe", initials: "JD" },
          description: "Task created via Add Task form",
          timestamp: new Date().toISOString(),
        },
      ],
      references: [],
      estimatedTime: Number(formData.get("estimatedTime")) || 0,
      spentTime: 0,
      budget: Number(formData.get("budget")) || 0,
      cost: 0,
    }
    setTasks([newTask, ...tasks])
    setIsAddDialogOpen(false)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  // Group tasks by status for kanban view
  const groupedTasks = {
    todo: filteredTasks.filter((t) => t.status === "todo"),
    "in-progress": filteredTasks.filter((t) => t.status === "in-progress"),
    review: filteredTasks.filter((t) => t.status === "review"),
    completed: filteredTasks.filter((t) => t.status === "completed"),
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your tasks across projects</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-[95vw] sm:w-full">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription className="sr-only">
                  Enter the details for the new task including title, description, project, and due date.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" name="title" placeholder="Design homepage wireframes" required className="bg-secondary/50 border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Task details..." className="bg-secondary/50 border-0" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select name="project" defaultValue="E-commerce Redesign">
                      <SelectTrigger className="bg-secondary/50 border-0">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E-commerce Redesign">E-commerce Redesign</SelectItem>
                        <SelectItem value="SEO Campaign Q4">SEO Campaign Q4</SelectItem>
                        <SelectItem value="Social Media Strategy">Social Media Strategy</SelectItem>
                        <SelectItem value="PPC Management">PPC Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue="Development">
                      <SelectTrigger className="bg-secondary/50 border-0">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger className="bg-secondary/50 border-0">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" name="dueDate" type="date" required className="bg-secondary/50 border-0 text-white scheme-dark" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" name="tags" placeholder="Design, UI/UX" className="bg-secondary/50 border-0" />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" className="border-0 bg-secondary/50 hover:bg-secondary" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Add Bar */}
        <AnimatedCard delay={50} className="p-2 bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-top-2 duration-500">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("quickAdd") as HTMLInputElement;
              if (!input.value) return;

              const quickTask: Task = {
                id: Date.now().toString(),
                title: input.value,
                description: "Quick added task",
                status: "todo",
                priority: "medium",
                project: "General",
                projectCategory: "Development",
                assignee: { name: "John Doe", initials: "JD" },
                dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
                tags: ["Quick"],
                subtasks: [],
                comments: [],
                attachments: [],
                timeLogs: [],
                history: [{
                  id: Date.now().toString(),
                  type: "task_created",
                  author: { name: "John Doe", initials: "JD" },
                  description: "Task created via Quick Add",
                  timestamp: new Date().toISOString()
                }],
                references: []
              };
              setTasks([quickTask, ...tasks]);
              input.value = "";
            }}
          >
            <div className="flex-1 relative">
              <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/50" />
              <Input
                name="quickAdd"
                placeholder="Quick add task: Type title and press Enter..."
                className="pl-9 bg-transparent border-none focus-visible:ring-0 shadow-none text-sm placeholder:text-muted-foreground/50"
              />
            </div>
            <Button size="sm" variant="ghost" className="h-8 gap-2 px-3 text-xs hover:bg-primary/10 hover:text-primary transition-all">
              <Zap className="w-3.5 h-3.5" />
              Quick Save
            </Button>
          </form>
        </AnimatedCard>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Tasks", value: stats.total, icon: CheckSquare, color: "text-foreground" },
            { label: "To Do", value: stats.todo, icon: Circle, color: "text-muted-foreground" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-primary" },
            { label: "In Review", value: stats.review, icon: AlertTriangle, color: "text-warning" },
            { label: "Completed", value: stats.completed, icon: CheckSquare, color: "text-success" },
          ].map((stat, i) => (
            <AnimatedCard key={stat.label} delay={i * 50} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Filters and View Switcher */}
        <AnimatedCard delay={250} className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-1 flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px] bg-secondary border-0 text-[10px] h-8">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[120px] bg-secondary border-0 text-[10px] h-8">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[120px] bg-secondary border-0 text-[10px] h-8">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                  <SelectTrigger className="w-[120px] bg-secondary border-0 text-[10px] h-8">
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {[...new Set(tasks.map(t => t.assignee.name))].map(name => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all" || assigneeFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[10px] text-muted-foreground hover:text-primary"
                    onClick={() => {
                      setStatusFilter("all")
                      setPriorityFilter("all")
                      setCategoryFilter("all")
                      setAssigneeFilter("all")
                    }}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-lg self-start">
              {[
                { id: "board", label: "Board", icon: Trello },
                { id: "list", label: "List", icon: ListIcon },
                { id: "calendar", label: "Calendar", icon: CalendarIcon },
                { id: "timeline", label: "Timeline", icon: History },
                { id: "grid", label: "Grid", icon: Layout },
              ].map((v) => (
                <Button
                  key={v.id}
                  variant={view === v.id ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("h-8 px-3 gap-2 text-xs", view === v.id && "bg-background shadow-sm")}
                  onClick={() => setView(v.id as any)}
                >
                  <v.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{v.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Task Views */}
        <div className="min-h-[60vh]">
          {view === "board" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-500">
              {(Object.keys(groupedTasks) as Array<keyof typeof groupedTasks>).map((status, colIndex) => {
                const StatusIcon = statusConfig[status].icon
                return (
                  <div key={status} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2 py-1">
                      <div className={cn("flex items-center gap-2 font-semibold text-sm", statusConfig[status].color)}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[status].label}
                      </div>
                      <Badge variant="secondary" className="text-[10px] h-5">
                        {groupedTasks[status].length}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-3">
                      {groupedTasks[status].map((task, i) => (
                        <AnimatedCard
                          key={task.id}
                          delay={i * 50}
                          className={cn(
                            "p-3 cursor-pointer group hover:ring-2 hover:ring-primary/20",
                            task.status === "completed" && "opacity-75",
                          )}
                          onClick={() => {
                            setSelectedTask(task)
                            setIsTaskDetailsOpen(true)
                          }}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <h4
                                className={cn(
                                  "font-medium text-sm leading-tight flex-1",
                                  task.status === "completed" && "line-through text-muted-foreground",
                                )}
                              >
                                {task.title}
                              </h4>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              <Badge className={cn("text-[10px] px-1.5 py-0 h-4 border-0", priorityConfig[task.priority].color)}>
                                {priorityConfig[task.priority].label}
                              </Badge>
                              {task.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                              <div className="flex -space-x-1.5 overflow-hidden">
                                <Avatar className="w-5 h-5 border-2 border-background">
                                  <AvatarFallback className="bg-primary/20 text-primary text-[8px]">
                                    {task.assignee.initials}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  {formatDate(task.dueDate)}
                                </span>
                                {task.subtasks.length > 0 && (
                                  <span className="flex items-center gap-1">
                                    <CheckSquare className="w-3 h-3" />
                                    {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </AnimatedCard>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full h-8 text-muted-foreground hover:text-foreground text-xs gap-2" onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="h-3 w-3" /> Add Task
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {view === "list" && (
            <AnimatedCard className="overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground bg-muted/50 uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Task Name</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Priority</th>
                      <th className="px-4 py-3 font-medium">Assignee</th>
                      <th className="px-4 py-3 font-medium text-right">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedTask(task)
                          setIsTaskDetailsOpen(true)
                        }}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={task.status === "completed"}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTaskStatus(task.id)
                              }}
                            />
                            <div>
                              <p className={cn("font-medium", task.status === "completed" && "line-through text-muted-foreground")}>
                                {task.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{task.project}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] font-normal",
                              task.status === "completed" && "bg-success/10 text-success",
                              task.status === "in-progress" && "bg-primary/10 text-primary",
                            )}
                          >
                            {statusConfig[task.status].label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={cn("text-[10px] font-normal border-0", priorityConfig[task.priority].color)}>
                            {priorityConfig[task.priority].label}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                                {task.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.assignee.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                          {formatDate(task.dueDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedCard>
          )}

          {(view === "calendar" || view === "timeline" || view === "grid") && (
            <AnimatedCard className="p-20 flex items-center justify-center text-muted-foreground animate-in zoom-in-95 duration-500">
              <div className="text-center max-w-xs">
                {view === "calendar" && <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />}
                {view === "timeline" && <History className="w-12 h-12 mx-auto mb-4 opacity-10" />}
                {view === "grid" && <Layout className="w-12 h-12 mx-auto mb-4 opacity-10" />}
                <h3 className="text-lg font-medium text-foreground">{view.charAt(0).toUpperCase() + view.slice(1)} View Coming Soon</h3>
                <p className="text-sm mt-2">We are working on bringing this powerful view to your tasks. Stay tuned!</p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => setView("board")}>Back to Board</Button>
              </div>
            </AnimatedCard>
          )}
        </div>

        {/* Task Detail Workspace */}
        <Dialog open={isTaskDetailsOpen} onOpenChange={(open) => {
          setIsTaskDetailsOpen(open)
          if (!open) setSelectedTask(null)
        }}>
          <DialogContent className="max-w-4xl w-[95vw] sm:w-full p-0 overflow-hidden border-0 shadow-2xl bg-card/95 backdrop-blur-xl max-h-[95vh] sm:max-h-[90vh]">
            <DialogTitle className="sr-only">Task Workspace: {selectedTask?.title}</DialogTitle>
            <DialogDescription className="sr-only">
              View and manage task details, subtasks, communication, and time tracking.
            </DialogDescription>
            {selectedTask && (
              <div className="flex flex-col h-[90vh]">
                {/* Header Section */}
                <div className="p-6 border-b bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge className={cn("border-0", priorityConfig[selectedTask.priority].color)}>
                        <Flag className="w-3 h-3 mr-1" />
                        {priorityConfig[selectedTask.priority].label}
                      </Badge>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {selectedTask.project}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">{selectedTask.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                        <AvatarFallback className="bg-primary/20 text-primary text-[8px] sm:text-[10px]">{selectedTask.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px] sm:max-w-none">{selectedTask.assignee.name}</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <UserPlus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block h-4" />
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Due {formatDate(selectedTask.dueDate)}</span>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block h-4" />
                    <div className="flex items-center gap-1">
                      <div className={cn("w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full", statusConfig[selectedTask.status].color.replace("text-", "bg-"))} />
                      <span>{statusConfig[selectedTask.status].label}</span>
                    </div>
                  </div>
                </div>

                {/* Workspace Content */}
                <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-6 border-b bg-muted/20 overflow-x-auto scrollbar-hide">
                    <TabsList className="bg-transparent h-12 w-max sm:w-full justify-start gap-4 sm:gap-6 p-0">
                      <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0 text-xs sm:text-sm">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="subtasks" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0 text-xs sm:text-sm">
                        Subtasks ({selectedTask.subtasks.length})
                      </TabsTrigger>
                      <TabsTrigger value="communication" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0 text-xs sm:text-sm">
                        Chat
                      </TabsTrigger>
                      <TabsTrigger value="files" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0 text-xs sm:text-sm">
                        Files ({selectedTask.attachments.length})
                      </TabsTrigger>
                      <TabsTrigger value="time" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0 text-xs sm:text-sm">
                        Time
                      </TabsTrigger>
                      <TabsTrigger value="history" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-0 text-xs sm:text-sm">
                        History
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <ScrollArea className="flex-1 p-4 sm:p-6">
                    <TabsContent value="overview" className="m-0 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                              <ListIcon className="w-4 h-4" /> Description
                            </h3>
                            <div className="bg-muted/30 p-4 rounded-xl text-sm leading-relaxed text-foreground/80">
                              {selectedTask.description}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedTask.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                                  <Tag className="w-3 h-3 mr-1" /> {tag}
                                </Badge>
                              ))}
                              <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] border-dashed">
                                <Plus className="w-3 h-3 mr-1" /> Add Tag
                              </Button>
                            </div>
                          </div>

                          {selectedTask.references.length > 0 && (
                            <div>
                              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Link className="w-4 h-4" /> References
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedTask.references.map(ref => (
                                  <a
                                    key={ref.id}
                                    href={ref.url}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all group"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border">
                                      {ref.type === "document" ? <Paperclip className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium truncate">{ref.title}</p>
                                      <p className="text-[10px] text-muted-foreground capitalize">{ref.type}</p>
                                    </div>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-primary">
                              <Zap className="w-4 h-4" /> Automated Workflow
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              When this task status changes to "Completed", notify the client and trigger "Final SEO Audit" task.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Card className="bg-muted/30 border-0 shadow-none">
                            <CardHeader className="p-3 sm:p-4 pb-0">
                              <CardTitle className="text-[10px] sm:text-xs uppercase text-muted-foreground font-bold tracking-wider">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 sm:p-4 space-y-4">
                              <div className="flex justify-between items-center text-xs sm:text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">65%</span>
                              </div>
                              <Progress value={65} className="h-1 sm:h-1.5" />

                              <div className="space-y-2 sm:space-y-3 pt-2">
                                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Timer className="w-3 h-3" /> Time Logged
                                  </span>
                                  <span className="font-medium whitespace-nowrap">{selectedTask.spentTime}h / {selectedTask.estimatedTime}h</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <BarChart2 className="w-3 h-3" /> Budget Spent
                                  </span>
                                  <span className="font-medium whitespace-nowrap">${selectedTask.cost} / ${selectedTask.budget}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div>
                            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3 px-1 tracking-wider">Recent Activity</h3>
                            <div className="space-y-4">
                              {[1, 2].map(i => (
                                <div key={i} className="flex gap-3 relative before:absolute before:left-[11px] before:top-[24px] before:bottom-[-16px] before:w-[1px] before:bg-border last:before:hidden">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center z-10 shrink-0">
                                    <Activity className="w-3 h-3 text-muted-foreground" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium truncate">Status changed to {i === 1 ? '"Review"' : '"In Progress"'}</p>
                                    <p className="text-[10px] text-muted-foreground">2 hours ago</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="subtasks" className="m-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Subtasks Checklist</h3>
                        <Button size="sm" variant="outline" className="h-8 gap-2">
                          <Plus className="w-3.5 h-3.5" /> Add Subtask
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {selectedTask.subtasks.map(st => (
                          <div key={st.id} className="group flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all">
                            <Checkbox checked={st.completed} />
                            <span className={cn("text-sm flex-1", st.completed && "line-through text-muted-foreground")}>{st.title}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="communication" className="m-0 flex flex-col h-full">
                      <div className="flex-1 space-y-6 mb-4">
                        {selectedTask.comments.length > 0 ? selectedTask.comments.map(comment => (
                          <div key={comment.id} className="flex gap-4">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">{comment.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted/30 p-4 rounded-2xl rounded-tl-none border">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-bold">{comment.user.name}</span>
                                  <span className="text-[10px] text-muted-foreground">14 Dec 2024, 10:30 AM</span>
                                </div>
                                <p className="text-sm">{comment.text}</p>
                              </div>
                              <div className="flex gap-3 mt-2 px-2">
                                <button className="text-[10px] font-medium text-muted-foreground hover:text-primary">Reply</button>
                                <button className="text-[10px] font-medium text-muted-foreground hover:text-primary">Like</button>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground opacity-30">
                            <MessageSquare className="w-12 h-12 mb-4" />
                            <p>No comments yet</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto border-t pt-4">
                        <div className="relative">
                          <Textarea className="pr-20 bg-muted/30 min-h-[80px] border-0 focus-visible:ring-1 p-4 rounded-xl" placeholder="Write a comment, use @ to mention..." />
                          <div className="absolute right-2 bottom-2 flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button size="icon" className="h-8 w-8 bg-primary">
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="files" className="m-0 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-center">Click or drag to upload files</p>
                          <p className="text-[10px] text-muted-foreground text-center">Support PNG, JPG, PDF up to 20MB</p>
                        </div>
                        <div className="space-y-2">
                          {selectedTask.attachments.map(file => (
                            <div key={file.id} className="flex items-center gap-3 p-3 rounded-xl border bg-muted/10 group hover:border-primary/30 transition-all">
                              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                                <Paperclip className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-[10px] text-muted-foreground">{file.size} • {file.type}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="time" className="m-0 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-muted/10 border-0 shadow-none">
                          <CardHeader className="text-center pb-2">
                            <CardTitle className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Active Timer</CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col items-center gap-6 py-6">
                            <div className="text-5xl font-mono font-bold tracking-tighter text-primary bg-primary/10 px-8 py-4 rounded-2xl shadow-inner-lg">
                              {activeTimer && activeTimer.taskId === selectedTask.id ? formatTimer(activeTimer.duration) : "00:00:00"}
                            </div>
                            <div className="flex gap-4">
                              <Button
                                size="lg"
                                className={cn("rounded-full w-16 h-16 shadow-xl transition-transform", activeTimer?.taskId === selectedTask.id ? "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30" : "bg-primary shadow-primary/30 hover:scale-105")}
                                onClick={() => activeTimer?.taskId === selectedTask.id ? stopTimer() : startTimer(selectedTask.id)}
                              >
                                {activeTimer?.taskId === selectedTask.id ? <ClockIcon className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                              </Button>
                              <Button size="lg" variant="outline" className="rounded-full w-16 h-16 hover:bg-muted/50" onClick={stopTimer}>
                                <Square className="h-6 w-6" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wider px-1">Time Logs</h3>
                          <ScrollArea className="h-[250px] pr-4">
                            <div className="space-y-2">
                              {selectedTask.timeLogs.length > 0 ? selectedTask.timeLogs.map(log => (
                                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-transparent hover:border-border transition-all group">
                                  <div>
                                    <p className="text-sm font-bold">{log.duration} min</p>
                                    <p className="text-[10px] text-muted-foreground">{log.date} • {log.user}</p>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </div>
                              )) : (
                                <div className="text-center py-10 text-muted-foreground text-xs italic">No time logs yet</div>
                              )}
                              <Button variant="ghost" size="sm" className="w-full text-xs gap-2 border-dashed border h-10 mt-2">
                                <Plus className="h-3.5 w-3.5" /> Manual Entry
                              </Button>
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history" className="m-0">
                      <div className="space-y-6">
                        {selectedTask.history.length > 0 ? (
                          <div className="relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
                            {selectedTask.history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((event, idx) => (
                              <div key={event.id} className="relative pl-10 pb-8 last:pb-0">
                                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center z-10 shadow-sm">
                                  {event.type === "status_change" && <Activity className="w-3.5 h-3.5 text-primary" />}
                                  {event.type === "task_created" && <Plus className="w-3.5 h-3.5 text-emerald-500" />}
                                  {event.type === "comment_added" && <MessageSquare className="w-3.5 h-3.5 text-blue-500" />}
                                  {event.type === "file_uploaded" && <Upload className="w-3.5 h-3.5 text-orange-500" />}
                                  {(!["status_change", "task_created", "comment_added", "file_uploaded"].includes(event.type)) && <History className="w-3.5 h-3.5 text-muted-foreground" />}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold">{event.author.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="text-sm text-foreground/80">{event.description}</p>
                                  {(event.oldValue || event.newValue) && (
                                    <div className="flex items-center gap-2 mt-2 py-1 px-2 rounded bg-muted/50 border text-[10px]">
                                      <span className="text-muted-foreground line-through">{event.oldValue || "None"}</span>
                                      <ArrowRight className="w-2 h-2" />
                                      <span className="font-bold text-primary">{event.newValue}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/30">
                            <History className="w-12 h-12 mb-4" />
                            <p>No history available yet</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </ScrollArea>

                  <div className="p-4 px-4 sm:px-6 border-t bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase tracking-widest">Verified for client billing</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button variant="ghost" size="sm" className="flex-1 sm:flex-none h-9 px-4 font-medium" onClick={() => setIsTaskDetailsOpen(false)}>Close</Button>
                      <Button size="sm" className="flex-1 sm:flex-none h-9 px-6 bg-primary font-semibold shadow-lg shadow-primary/20">Save Workspace</Button>
                    </div>
                  </div>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
