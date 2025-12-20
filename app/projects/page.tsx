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
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Pause,
  FolderKanban,
  ArrowRight,
  Target,
  LayoutGrid,
  List,
  BarChart3,
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  client: string
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold"
  priority: "low" | "medium" | "high"
  progress: number
  budget: number
  spent: number
  startDate: string
  dueDate: string
  team: string[]
  tasks: { total: number; completed: number }
  category: string
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Redesign",
    description: "Complete website redesign with new branding and improved UX",
    client: "TechMart Solutions",
    status: "in-progress",
    priority: "high",
    progress: 75,
    budget: 25000,
    spent: 18500,
    startDate: "2024-10-15",
    dueDate: "2024-12-28",
    team: ["JD", "SM", "EC"],
    tasks: { total: 24, completed: 18 },
    category: "Web Design",
  },
  {
    id: "2",
    name: "SEO Campaign Q4",
    description: "Comprehensive SEO optimization and content strategy",
    client: "GreenLife Organics",
    status: "in-progress",
    priority: "medium",
    progress: 45,
    budget: 12000,
    spent: 5400,
    startDate: "2024-11-01",
    dueDate: "2025-01-05",
    team: ["JW", "AT"],
    tasks: { total: 18, completed: 8 },
    category: "SEO",
  },
  {
    id: "3",
    name: "Social Media Strategy",
    description: "Full social media management and content calendar",
    client: "FoodieHub",
    status: "review",
    priority: "medium",
    progress: 90,
    budget: 8000,
    spent: 7200,
    startDate: "2024-09-20",
    dueDate: "2024-12-22",
    team: ["EC", "MB"],
    tasks: { total: 32, completed: 29 },
    category: "Social Media",
  },
  {
    id: "4",
    name: "PPC Management",
    description: "Google Ads and Meta advertising campaigns",
    client: "AutoDeal Motors",
    status: "on-hold",
    priority: "low",
    progress: 30,
    budget: 15000,
    spent: 4500,
    startDate: "2024-10-01",
    dueDate: "2025-01-15",
    team: ["DP", "JW"],
    tasks: { total: 12, completed: 4 },
    category: "PPC",
  },
  {
    id: "5",
    name: "Brand Identity Overhaul",
    description: "Complete rebranding including logo, colors, and guidelines",
    client: "LuxStay Hotels",
    status: "planning",
    priority: "high",
    progress: 15,
    budget: 35000,
    spent: 5250,
    startDate: "2024-12-01",
    dueDate: "2025-03-15",
    team: ["SM", "JD", "LT", "EC"],
    tasks: { total: 28, completed: 4 },
    category: "Branding",
  },
  {
    id: "6",
    name: "Email Marketing Automation",
    description: "Set up automated email sequences and newsletters",
    client: "TechMart Solutions",
    status: "completed",
    priority: "medium",
    progress: 100,
    budget: 6000,
    spent: 5800,
    startDate: "2024-08-15",
    dueDate: "2024-11-30",
    team: ["AT", "MB"],
    tasks: { total: 15, completed: 15 },
    category: "Email Marketing",
  },
]

const statusConfig = {
  planning: { label: "Planning", icon: Target, color: "bg-chart-3/20 text-chart-3" },
  "in-progress": { label: "In Progress", icon: Clock, color: "bg-primary/20 text-primary" },
  review: { label: "Review", icon: AlertCircle, color: "bg-warning/20 text-warning" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-success/20 text-success" },
  "on-hold": { label: "On Hold", icon: Pause, color: "bg-muted text-muted-foreground" },
}

const priorityConfig = {
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", color: "bg-warning/20 text-warning" },
  high: { label: "High", color: "bg-destructive/20 text-destructive" },
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
  }

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      client: formData.get("client") as string,
      status: "planning",
      priority: formData.get("priority") as "low" | "medium" | "high",
      progress: 0,
      budget: Number(formData.get("budget")),
      spent: 0,
      startDate: formData.get("startDate") as string,
      dueDate: formData.get("dueDate") as string,
      team: [],
      tasks: { total: 0, completed: 0 },
      category: formData.get("category") as string,
    }
    setProjects([newProject, ...projects])
    setIsAddDialogOpen(false)
  }

  const kanbanStatuses = ["planning", "in-progress", "review", "completed"] as const

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">Track and manage all your client projects</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" placeholder="Website Redesign" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Brief project description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select name="client" defaultValue="TechMart Solutions">
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TechMart Solutions">TechMart Solutions</SelectItem>
                        <SelectItem value="GreenLife Organics">GreenLife Organics</SelectItem>
                        <SelectItem value="FoodieHub">FoodieHub</SelectItem>
                        <SelectItem value="LuxStay Hotels">LuxStay Hotels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue="Web Design">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Web Design">Web Design</SelectItem>
                        <SelectItem value="SEO">SEO</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="PPC">PPC</SelectItem>
                        <SelectItem value="Branding">Branding</SelectItem>
                        <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input id="budget" name="budget" type="number" placeholder="10000" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" name="startDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" name="dueDate" type="date" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Projects", value: stats.total, icon: FolderKanban, color: "text-foreground" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-primary" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-success" },
            {
              label: "Total Budget",
              value: `$${(stats.totalBudget / 1000).toFixed(0)}K`,
              icon: DollarSign,
              color: "text-chart-4",
            },
            {
              label: "Total Spent",
              value: `$${(stats.totalSpent / 1000).toFixed(0)}K`,
              icon: BarChart3,
              color: "text-warning",
            },
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
                placeholder="Search projects..."
                className="pl-10 bg-secondary border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-0">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`p-2 rounded ${viewMode === "kanban" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <FolderKanban className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Projects View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, i) => {
              const StatusIcon = statusConfig[project.status].icon
              return (
                <AnimatedCard
                  key={project.id}
                  delay={300 + i * 50}
                  className="cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-normal">
                            {project.category}
                          </Badge>
                          <Badge className={`${priorityConfig[project.priority].color} border-0 text-xs`}>
                            {priorityConfig[project.priority].label}
                          </Badge>
                        </div>
                        <h3 className="font-semibold mt-2">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.client}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>View Tasks</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <Badge className={`${statusConfig[project.status].color} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[project.status].label}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(project.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, idx) => (
                          <Avatar key={idx} className="w-7 h-7 border-2 border-card">
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">{member}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-card">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>
                          <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                          {project.tasks.completed}/{project.tasks.total}
                        </span>
                        <span className="text-primary font-medium">
                          ${(project.spent / 1000).toFixed(1)}K / ${(project.budget / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              )
            })}
          </div>
        )}

        {viewMode === "list" && (
          <AnimatedCard delay={300}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Project</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Client</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Progress</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Budget</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Due Date</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project, i) => {
                      const StatusIcon = statusConfig[project.status].icon
                      return (
                        <tr
                          key={project.id}
                          className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                          style={{ animationDelay: `${i * 50}ms` }}
                          onClick={() => setSelectedProject(project)}
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-sm">{project.name}</p>
                              <Badge variant="outline" className="text-xs font-normal mt-1">
                                {project.category}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{project.client}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${statusConfig[project.status].color} border-0`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[project.status].label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 w-32">
                            <div className="flex items-center gap-2">
                              <Progress value={project.progress} className="h-1.5 flex-1" />
                              <span className="text-xs font-medium w-8">{project.progress}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">
                              <span className="text-primary font-medium">${(project.spent / 1000).toFixed(1)}K</span>
                              <span className="text-muted-foreground"> / ${(project.budget / 1000).toFixed(0)}K</span>
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{new Date(project.dueDate).toLocaleDateString()}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex -space-x-2">
                              {project.team.slice(0, 3).map((member, idx) => (
                                <Avatar key={idx} className="w-6 h-6 border-2 border-card">
                                  <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                                    {member}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </AnimatedCard>
        )}

        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {kanbanStatuses.map((status, colIndex) => {
              const statusProjects = filteredProjects.filter((p) => p.status === status)
              const StatusIcon = statusConfig[status].icon
              return (
                <AnimatedCard key={status} delay={300 + colIndex * 100} hover={false} className="min-w-[280px]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[status].label}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {statusProjects.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                    {statusProjects.map((project, i) => (
                      <div
                        key={project.id}
                        className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                        style={{ animationDelay: `${i * 50}ms` }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <Badge variant="outline" className="text-[10px] font-normal mb-1">
                              {project.category}
                            </Badge>
                            <h4 className="font-medium text-sm truncate">{project.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{project.client}</p>
                          </div>
                          <Badge className={`${priorityConfig[project.priority].color} border-0 text-[10px] shrink-0`}>
                            {project.priority[0].toUpperCase()}
                          </Badge>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{project.progress}%</span>
                            <span className="text-muted-foreground">
                              {project.tasks.completed}/{project.tasks.total} tasks
                            </span>
                          </div>
                          <Progress value={project.progress} className="h-1" />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex -space-x-1.5">
                            {project.team.slice(0, 2).map((member, idx) => (
                              <Avatar key={idx} className="w-5 h-5 border border-card">
                                <AvatarFallback className="bg-primary/20 text-primary text-[8px]">
                                  {member}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(project.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </AnimatedCard>
              )
            })}
          </div>
        )}

        {/* Project Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedProject && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {selectedProject.category}
                        </Badge>
                        <Badge className={`${statusConfig[selectedProject.status].color} border-0`}>
                          {statusConfig[selectedProject.status].label}
                        </Badge>
                      </div>
                      <DialogTitle className="text-xl">{selectedProject.name}</DialogTitle>
                      <p className="text-muted-foreground mt-1">{selectedProject.client}</p>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <p className="text-sm text-muted-foreground">{selectedProject.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        Budget
                      </div>
                      <p className="text-lg font-bold">
                        <span className="text-primary">${selectedProject.spent.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm font-normal">
                          {" "}
                          / ${selectedProject.budget.toLocaleString()}
                        </span>
                      </p>
                      <Progress value={(selectedProject.spent / selectedProject.budget) * 100} className="h-1 mt-2" />
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Tasks
                      </div>
                      <p className="text-lg font-bold">
                        <span className="text-success">{selectedProject.tasks.completed}</span>
                        <span className="text-muted-foreground text-sm font-normal">
                          {" "}
                          / {selectedProject.tasks.total}
                        </span>
                      </p>
                      <Progress
                        value={(selectedProject.tasks.completed / selectedProject.tasks.total) * 100}
                        className="h-1 mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                      <p className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                      <p className="font-medium">{new Date(selectedProject.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Team Members</p>
                    <div className="flex gap-2">
                      {selectedProject.team.map((member, idx) => (
                        <Avatar key={idx} className="w-8 h-8">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">{member}</AvatarFallback>
                        </Avatar>
                      ))}
                      <button className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    View Tasks
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
