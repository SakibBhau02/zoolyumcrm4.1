"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  CheckSquare,
  Circle,
  Clock,
  AlertTriangle,
  Flag,
  Tag,
  ChevronDown,
  ChevronRight,
  Trash2,
  Edit,
  Copy,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  project: string
  assignee: { name: string; initials: string }
  dueDate: string
  tags: string[]
  subtasks?: { id: string; title: string; completed: boolean }[]
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create wireframes for the new homepage design including hero, features, and footer sections",
    status: "completed",
    priority: "high",
    project: "E-commerce Redesign",
    assignee: { name: "Sarah Mitchell", initials: "SM" },
    dueDate: "2024-12-18",
    tags: ["Design", "UI/UX"],
    subtasks: [
      { id: "1a", title: "Hero section wireframe", completed: true },
      { id: "1b", title: "Features section wireframe", completed: true },
      { id: "1c", title: "Footer wireframe", completed: true },
    ],
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up login, register, and password reset functionality",
    status: "in-progress",
    priority: "urgent",
    project: "E-commerce Redesign",
    assignee: { name: "John Doe", initials: "JD" },
    dueDate: "2024-12-20",
    tags: ["Development", "Backend"],
    subtasks: [
      { id: "2a", title: "Login form", completed: true },
      { id: "2b", title: "Registration form", completed: true },
      { id: "2c", title: "Password reset", completed: false },
      { id: "2d", title: "Email verification", completed: false },
    ],
  },
  {
    id: "3",
    title: "Keyword research report",
    description: "Complete keyword research and competitor analysis for Q4 SEO campaign",
    status: "review",
    priority: "medium",
    project: "SEO Campaign Q4",
    assignee: { name: "Emily Chen", initials: "EC" },
    dueDate: "2024-12-19",
    tags: ["SEO", "Research"],
  },
  {
    id: "4",
    title: "Create Instagram content calendar",
    description: "Plan and schedule content for the next 30 days",
    status: "todo",
    priority: "medium",
    project: "Social Media Strategy",
    assignee: { name: "Amanda Torres", initials: "AT" },
    dueDate: "2024-12-22",
    tags: ["Social Media", "Content"],
  },
  {
    id: "5",
    title: "Set up Google Analytics 4",
    description: "Migrate from Universal Analytics to GA4 and configure events",
    status: "in-progress",
    priority: "high",
    project: "E-commerce Redesign",
    assignee: { name: "James Wilson", initials: "JW" },
    dueDate: "2024-12-21",
    tags: ["Analytics", "Setup"],
  },
  {
    id: "6",
    title: "Write meta descriptions",
    description: "Optimize meta descriptions for top 50 landing pages",
    status: "todo",
    priority: "low",
    project: "SEO Campaign Q4",
    assignee: { name: "Michael Brown", initials: "MB" },
    dueDate: "2024-12-25",
    tags: ["SEO", "Content"],
  },
  {
    id: "7",
    title: "Design email templates",
    description: "Create responsive email templates for newsletter and transactional emails",
    status: "review",
    priority: "medium",
    project: "E-commerce Redesign",
    assignee: { name: "Sarah Mitchell", initials: "SM" },
    dueDate: "2024-12-20",
    tags: ["Design", "Email"],
  },
  {
    id: "8",
    title: "Competitor ad analysis",
    description: "Analyze competitor PPC strategies and identify opportunities",
    status: "todo",
    priority: "high",
    project: "PPC Management",
    assignee: { name: "David Park", initials: "DP" },
    dueDate: "2024-12-23",
    tags: ["PPC", "Research"],
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
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [expandedTasks, setExpandedTasks] = useState<string[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
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
      assignee: { name: "John Doe", initials: "JD" },
      dueDate: formData.get("dueDate") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
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
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" name="title" placeholder="Design homepage wireframes" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Task details..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select name="project" defaultValue="E-commerce Redesign">
                      <SelectTrigger>
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
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" name="dueDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" name="tags" placeholder="Design, UI/UX" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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

        {/* Filters */}
        <AnimatedCard delay={250} className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-10 bg-secondary border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] bg-secondary border-0">
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
                <SelectTrigger className="w-[130px] bg-secondary border-0">
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
            </div>
          </div>
        </AnimatedCard>

        {/* Tasks Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(groupedTasks) as Array<keyof typeof groupedTasks>).map((status, colIndex) => {
            const StatusIcon = statusConfig[status].icon
            return (
              <AnimatedCard key={status} delay={300 + colIndex * 100} hover={false}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <div className={`flex items-center gap-2 ${statusConfig[status].color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig[status].label}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {groupedTasks[status].length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
                  {groupedTasks[status].map((task, i) => (
                    <div
                      key={task.id}
                      className={cn(
                        "p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300 group",
                        task.status === "completed" && "opacity-60",
                      )}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-start gap-2">
                        <Checkbox
                          checked={task.status === "completed"}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Flag className={`w-3 h-3 ${priorityConfig[task.priority].flagColor}`} />
                            <h4
                              className={cn(
                                "font-medium text-sm truncate flex-1",
                                task.status === "completed" && "line-through text-muted-foreground",
                              )}
                            >
                              {task.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{task.project}</p>

                          {/* Subtasks toggle */}
                          {task.subtasks && task.subtasks.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTaskExpansion(task.id)
                              }}
                              className="flex items-center gap-1 text-xs text-muted-foreground mt-2 hover:text-foreground transition-colors"
                            >
                              {expandedTasks.includes(task.id) ? (
                                <ChevronDown className="w-3 h-3" />
                              ) : (
                                <ChevronRight className="w-3 h-3" />
                              )}
                              {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length} subtasks
                            </button>
                          )}

                          {/* Expanded subtasks */}
                          {expandedTasks.includes(task.id) && task.subtasks && (
                            <div className="mt-2 space-y-1 pl-2 border-l border-border">
                              {task.subtasks.map((subtask) => (
                                <div key={subtask.id} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={subtask.completed}
                                    onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                                    className="scale-75"
                                  />
                                  <span
                                    className={cn("text-xs", subtask.completed && "line-through text-muted-foreground")}
                                  >
                                    {subtask.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="bg-primary/20 text-primary text-[8px]">
                                {task.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedTask(task)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTask(task.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </AnimatedCard>
            )
          })}
        </div>

        {/* Task Detail Dialog */}
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedTask && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${priorityConfig[selectedTask.priority].color} border-0`}>
                      <Flag className="w-3 h-3 mr-1" />
                      {priorityConfig[selectedTask.priority].label}
                    </Badge>
                    <Badge
                      className={`${statusConfig[selectedTask.status].color.replace("text-", "bg-").replace("-foreground", "/20")} border-0`}
                    >
                      {statusConfig[selectedTask.status].label}
                    </Badge>
                  </div>
                  <DialogTitle>{selectedTask.title}</DialogTitle>
                  <p className="text-muted-foreground text-sm">{selectedTask.project}</p>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm bg-secondary/50 p-3 rounded-lg">{selectedTask.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Assignee</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {selectedTask.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{selectedTask.assignee.name}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(selectedTask.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Subtasks</p>
                      <div className="space-y-2">
                        {selectedTask.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                            <Checkbox checked={subtask.completed} />
                            <span className={cn("text-sm", subtask.completed && "line-through text-muted-foreground")}>
                              {subtask.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
