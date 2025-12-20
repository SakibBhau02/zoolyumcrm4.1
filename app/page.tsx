"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, UserCheck, FolderKanban, DollarSign, ArrowRight, MoreHorizontal } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 45000, leads: 120 },
  { month: "Feb", revenue: 52000, leads: 145 },
  { month: "Mar", revenue: 48000, leads: 130 },
  { month: "Apr", revenue: 61000, leads: 168 },
  { month: "May", revenue: 55000, leads: 155 },
  { month: "Jun", revenue: 67000, leads: 180 },
  { month: "Jul", revenue: 72000, leads: 195 },
]

const projectStatusData = [
  { name: "Completed", value: 12, color: "#4ade80" },
  { name: "In Progress", value: 8, color: "#60a5fa" },
  { name: "On Hold", value: 3, color: "#fbbf24" },
  { name: "Planning", value: 5, color: "#a78bfa" },
]

const recentLeads = [
  { name: "Sarah Mitchell", company: "TechStart Inc", status: "Hot", value: "$15,000", avatar: "SM" },
  { name: "James Wilson", company: "GrowthCo", status: "Warm", value: "$8,500", avatar: "JW" },
  { name: "Emily Chen", company: "InnovateLab", status: "Hot", value: "$22,000", avatar: "EC" },
  { name: "Michael Brown", company: "ScaleUp Ltd", status: "Cold", value: "$5,000", avatar: "MB" },
]

const activeProjects = [
  { name: "E-commerce Redesign", client: "TechMart", progress: 75, dueDate: "Dec 28" },
  { name: "SEO Campaign", client: "GreenLife", progress: 45, dueDate: "Jan 5" },
  { name: "Social Media Strategy", client: "FoodieHub", progress: 90, dueDate: "Dec 22" },
  { name: "PPC Management", client: "AutoDeal", progress: 30, dueDate: "Jan 15" },
]

const teamPerformance = [
  { name: "Design", tasks: 24, completed: 18 },
  { name: "Dev", tasks: 32, completed: 28 },
  { name: "Marketing", tasks: 18, completed: 15 },
  { name: "Content", tasks: 21, completed: 19 },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your agency.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Leads" value="1,284" change={12.5} icon={Users} delay={0} iconColor="text-chart-1" />
          <StatCard
            title="Active Clients"
            value="86"
            change={8.2}
            icon={UserCheck}
            delay={100}
            iconColor="text-chart-2"
          />
          <StatCard
            title="Projects"
            value="28"
            change={-3.1}
            icon={FolderKanban}
            delay={200}
            iconColor="text-chart-3"
          />
          <StatCard
            title="Revenue"
            value="$342K"
            change={15.3}
            icon={DollarSign}
            delay={300}
            iconColor="text-chart-4"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Chart */}
          <AnimatedCard className="lg:col-span-2" delay={400}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Revenue Overview</CardTitle>
              <Badge variant="secondary" className="text-xs">
                Last 7 months
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a2e",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* Project Status */}
          <AnimatedCard delay={500}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a2e",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {projectStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Leads */}
          <AnimatedCard delay={600}>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-medium">Recent Leads</CardTitle>
              <button className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLeads.map((lead, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                >
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">{lead.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={
                        lead.status === "Hot"
                          ? "bg-destructive/20 text-destructive border-0"
                          : lead.status === "Warm"
                            ? "bg-warning/20 text-warning border-0"
                            : "bg-muted text-muted-foreground border-0"
                      }
                    >
                      {lead.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{lead.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </AnimatedCard>

          {/* Active Projects */}
          <AnimatedCard delay={700}>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-medium">Active Projects</CardTitle>
              <button className="p-1 rounded hover:bg-secondary transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProjects.map((project, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.client}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{project.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={project.progress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium w-8">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </AnimatedCard>

          {/* Team Performance */}
          <AnimatedCard delay={800}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                    <XAxis type="number" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a2e",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="tasks" fill="#333" radius={[0, 4, 4, 0]} name="Total Tasks" />
                    <Bar dataKey="completed" fill="#60a5fa" radius={[0, 4, 4, 0]} name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </DashboardLayout>
  )
}
