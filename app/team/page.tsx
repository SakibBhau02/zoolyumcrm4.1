"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Star,
  Award,
  Briefcase,
  TrendingUp,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: "design" | "development" | "marketing" | "content" | "management"
  status: "active" | "away" | "offline"
  avatar?: string
  location: string
  joinedDate: string
  tasksCompleted: number
  tasksInProgress: number
  projectsActive: number
  rating: number
  skills: string[]
  performanceData: { month: string; tasks: number }[]
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@agencyflow.com",
    phone: "+1 (555) 123-4567",
    role: "Lead Developer",
    department: "development",
    status: "active",
    location: "San Francisco, CA",
    joinedDate: "2022-03-15",
    tasksCompleted: 156,
    tasksInProgress: 8,
    projectsActive: 4,
    rating: 4.9,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    performanceData: [
      { month: "Jul", tasks: 18 },
      { month: "Aug", tasks: 22 },
      { month: "Sep", tasks: 19 },
      { month: "Oct", tasks: 25 },
      { month: "Nov", tasks: 28 },
      { month: "Dec", tasks: 24 },
    ],
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    email: "sarah@agencyflow.com",
    phone: "+1 (555) 234-5678",
    role: "Senior Designer",
    department: "design",
    status: "active",
    location: "New York, NY",
    joinedDate: "2022-06-20",
    tasksCompleted: 142,
    tasksInProgress: 6,
    projectsActive: 3,
    rating: 4.8,
    skills: ["Figma", "Adobe XD", "Illustration", "UI/UX"],
    performanceData: [
      { month: "Jul", tasks: 15 },
      { month: "Aug", tasks: 20 },
      { month: "Sep", tasks: 18 },
      { month: "Oct", tasks: 22 },
      { month: "Nov", tasks: 25 },
      { month: "Dec", tasks: 21 },
    ],
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily@agencyflow.com",
    phone: "+1 (555) 345-6789",
    role: "SEO Specialist",
    department: "marketing",
    status: "away",
    location: "Austin, TX",
    joinedDate: "2023-01-10",
    tasksCompleted: 98,
    tasksInProgress: 5,
    projectsActive: 2,
    rating: 4.7,
    skills: ["SEO", "Google Analytics", "Content Strategy", "Keyword Research"],
    performanceData: [
      { month: "Jul", tasks: 12 },
      { month: "Aug", tasks: 15 },
      { month: "Sep", tasks: 14 },
      { month: "Oct", tasks: 18 },
      { month: "Nov", tasks: 20 },
      { month: "Dec", tasks: 16 },
    ],
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@agencyflow.com",
    phone: "+1 (555) 456-7890",
    role: "PPC Manager",
    department: "marketing",
    status: "active",
    location: "Chicago, IL",
    joinedDate: "2023-04-05",
    tasksCompleted: 87,
    tasksInProgress: 4,
    projectsActive: 2,
    rating: 4.6,
    skills: ["Google Ads", "Meta Ads", "Analytics", "Campaign Management"],
    performanceData: [
      { month: "Jul", tasks: 10 },
      { month: "Aug", tasks: 14 },
      { month: "Sep", tasks: 12 },
      { month: "Oct", tasks: 16 },
      { month: "Nov", tasks: 18 },
      { month: "Dec", tasks: 15 },
    ],
  },
  {
    id: "5",
    name: "Amanda Torres",
    email: "amanda@agencyflow.com",
    phone: "+1 (555) 567-8901",
    role: "Content Writer",
    department: "content",
    status: "active",
    location: "Miami, FL",
    joinedDate: "2023-07-12",
    tasksCompleted: 65,
    tasksInProgress: 7,
    projectsActive: 3,
    rating: 4.5,
    skills: ["Copywriting", "Blog Writing", "Social Media", "Editing"],
    performanceData: [
      { month: "Jul", tasks: 8 },
      { month: "Aug", tasks: 12 },
      { month: "Sep", tasks: 10 },
      { month: "Oct", tasks: 14 },
      { month: "Nov", tasks: 15 },
      { month: "Dec", tasks: 13 },
    ],
  },
  {
    id: "6",
    name: "Michael Brown",
    email: "michael@agencyflow.com",
    phone: "+1 (555) 678-9012",
    role: "Junior Developer",
    department: "development",
    status: "offline",
    location: "Denver, CO",
    joinedDate: "2024-02-20",
    tasksCompleted: 42,
    tasksInProgress: 3,
    projectsActive: 2,
    rating: 4.3,
    skills: ["JavaScript", "React", "CSS", "HTML"],
    performanceData: [
      { month: "Jul", tasks: 5 },
      { month: "Aug", tasks: 8 },
      { month: "Sep", tasks: 7 },
      { month: "Oct", tasks: 10 },
      { month: "Nov", tasks: 12 },
      { month: "Dec", tasks: 9 },
    ],
  },
  {
    id: "7",
    name: "David Park",
    email: "david@agencyflow.com",
    phone: "+1 (555) 789-0123",
    role: "Account Manager",
    department: "management",
    status: "active",
    location: "Seattle, WA",
    joinedDate: "2022-09-01",
    tasksCompleted: 112,
    tasksInProgress: 5,
    projectsActive: 6,
    rating: 4.8,
    skills: ["Client Relations", "Project Management", "Negotiations", "Strategy"],
    performanceData: [
      { month: "Jul", tasks: 14 },
      { month: "Aug", tasks: 18 },
      { month: "Sep", tasks: 16 },
      { month: "Oct", tasks: 20 },
      { month: "Nov", tasks: 22 },
      { month: "Dec", tasks: 19 },
    ],
  },
  {
    id: "8",
    name: "Lisa Thompson",
    email: "lisa@agencyflow.com",
    phone: "+1 (555) 890-1234",
    role: "Creative Director",
    department: "design",
    status: "active",
    location: "Los Angeles, CA",
    joinedDate: "2021-11-15",
    tasksCompleted: 189,
    tasksInProgress: 4,
    projectsActive: 5,
    rating: 5.0,
    skills: ["Brand Strategy", "Art Direction", "Team Leadership", "Presentation"],
    performanceData: [
      { month: "Jul", tasks: 20 },
      { month: "Aug", tasks: 24 },
      { month: "Sep", tasks: 22 },
      { month: "Oct", tasks: 28 },
      { month: "Nov", tasks: 30 },
      { month: "Dec", tasks: 26 },
    ],
  },
]

const departmentConfig = {
  design: { label: "Design", color: "bg-chart-3/20 text-chart-3" },
  development: { label: "Development", color: "bg-primary/20 text-primary" },
  marketing: { label: "Marketing", color: "bg-chart-2/20 text-chart-2" },
  content: { label: "Content", color: "bg-chart-4/20 text-chart-4" },
  management: { label: "Management", color: "bg-chart-5/20 text-chart-5" },
}

const statusConfig = {
  active: { label: "Active", color: "bg-success" },
  away: { label: "Away", color: "bg-warning" },
  offline: { label: "Offline", color: "bg-muted-foreground" },
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    totalTasksCompleted: members.reduce((sum, m) => sum + m.tasksCompleted, 0),
    avgRating: (members.reduce((sum, m) => sum + m.rating, 0) / members.length).toFixed(1),
  }

  const departmentStats = Object.keys(departmentConfig).map((dept) => ({
    name: departmentConfig[dept as keyof typeof departmentConfig].label,
    count: members.filter((m) => m.department === dept).length,
  }))

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      role: formData.get("role") as string,
      department: formData.get("department") as TeamMember["department"],
      status: "active",
      location: formData.get("location") as string,
      joinedDate: new Date().toISOString().split("T")[0],
      tasksCompleted: 0,
      tasksInProgress: 0,
      projectsActive: 0,
      rating: 0,
      skills: (formData.get("skills") as string).split(",").map((s) => s.trim()),
      performanceData: [],
    }
    setMembers([newMember, ...members])
    setIsAddDialogOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team</h1>
            <p className="text-muted-foreground mt-1">Manage your team members and track performance</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" name="role" placeholder="Developer" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select name="department" defaultValue="development">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="City, State" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input id="skills" name="skills" placeholder="React, TypeScript, Node.js" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Member</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Team Members", value: stats.total, icon: Users, color: "text-foreground" },
            { label: "Active Now", value: stats.active, icon: CheckCircle, color: "text-success" },
            { label: "Tasks Completed", value: stats.totalTasksCompleted, icon: Award, color: "text-primary" },
            { label: "Avg. Rating", value: stats.avgRating, icon: Star, color: "text-chart-4" },
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

        {/* Department Overview */}
        <AnimatedCard delay={200}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Team by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentStats} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12, fill: "#888" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {departmentStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#a78bfa", "#60a5fa", "#4ade80", "#fbbf24", "#f87171"][index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Filters */}
        <AnimatedCard delay={250} className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-10 bg-secondary border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[160px] bg-secondary border-0">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AnimatedCard>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((member, i) => (
            <AnimatedCard
              key={member.id}
              delay={300 + i * 50}
              className="cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <CardContent className="p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/20 text-primary text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${statusConfig[member.status].color}`}
                    />
                  </div>

                  <h3 className="font-semibold mt-3">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>

                  <Badge className={`${departmentConfig[member.department].color} border-0 mt-2`}>
                    {departmentConfig[member.department].label}
                  </Badge>

                  <div className="flex items-center gap-1 mt-3">
                    <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
                    <span className="text-sm font-medium">{member.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border text-center">
                  <div>
                    <p className="text-lg font-bold text-success">{member.tasksCompleted}</p>
                    <p className="text-[10px] text-muted-foreground">Done</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{member.tasksInProgress}</p>
                    <p className="text-[10px] text-muted-foreground">Active</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{member.projectsActive}</p>
                    <p className="text-[10px] text-muted-foreground">Projects</p>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>

        {/* Member Detail Dialog */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedMember && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary/20 text-primary text-xl">
                          {selectedMember.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${statusConfig[selectedMember.status].color}`}
                      />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-xl">{selectedMember.name}</DialogTitle>
                      <p className="text-muted-foreground">{selectedMember.role}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`${departmentConfig[selectedMember.department].color} border-0`}>
                          {departmentConfig[selectedMember.department].label}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
                          <span className="text-sm font-medium">{selectedMember.rating}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-transparent">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Assign Task</DropdownMenuItem>
                        <DropdownMenuItem>View Tasks</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-4">
                  <TabsList className="bg-secondary w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </div>
                        <p className="text-sm">{selectedMember.email}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          Phone
                        </div>
                        <p className="text-sm">{selectedMember.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          Location
                        </div>
                        <p className="text-sm">{selectedMember.location}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          Joined
                        </div>
                        <p className="text-sm">{new Date(selectedMember.joinedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      <div className="bg-secondary/50 rounded-lg p-4 text-center">
                        <CheckCircle className="w-5 h-5 mx-auto text-success mb-1" />
                        <p className="text-xl font-bold">{selectedMember.tasksCompleted}</p>
                        <p className="text-xs text-muted-foreground">Tasks Completed</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4 text-center">
                        <Clock className="w-5 h-5 mx-auto text-primary mb-1" />
                        <p className="text-xl font-bold">{selectedMember.tasksInProgress}</p>
                        <p className="text-xs text-muted-foreground">In Progress</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4 text-center">
                        <Briefcase className="w-5 h-5 mx-auto text-chart-3 mb-1" />
                        <p className="text-xl font-bold">{selectedMember.projectsActive}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium">Task Completion (Last 6 Months)</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          +12% growth
                        </Badge>
                      </div>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedMember.performanceData}>
                            <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1a1a2e",
                                border: "1px solid #333",
                                borderRadius: "8px",
                                fontSize: "12px",
                              }}
                            />
                            <Bar dataKey="tasks" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-4">
                    <div className="space-y-3">
                      {selectedMember.skills.map((skill, index) => (
                        <div key={skill} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{skill}</span>
                            <span className="text-muted-foreground">{90 - index * 8}%</span>
                          </div>
                          <Progress value={90 - index * 8} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
