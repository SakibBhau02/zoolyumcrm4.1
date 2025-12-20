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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Flame,
  Thermometer,
  Snowflake,
  Trash2,
  Edit,
  Eye,
  LayoutGrid,
  List,
  Columns3,
  GripVertical,
  X,
  TrendingUp,
  Clock,
  Target,
  Users,
  Globe,
  Linkedin,
  MessageSquare,
  Star,
  StarOff,
  CalendarPlus,
  SlidersHorizontal,
  Download,
  Upload,
} from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "hot" | "warm" | "cold"
  stage: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost"
  source: string
  value: number
  probability: number
  createdAt: string
  lastContact: string
  nextFollowUp: string
  notes: string
  tags: string[]
  assignedTo: string
  priority: "high" | "medium" | "low"
  starred: boolean
  activities: number
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    company: "TechStart Inc",
    status: "hot",
    stage: "proposal",
    source: "Website",
    value: 15000,
    probability: 75,
    createdAt: "2024-12-10",
    lastContact: "2024-12-15",
    nextFollowUp: "2024-12-18",
    notes: "Very interested in our SEO services. Follow up scheduled for next week.",
    tags: ["SEO", "Enterprise"],
    assignedTo: "John Smith",
    priority: "high",
    starred: true,
    activities: 12,
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james@growthco.io",
    phone: "+1 (555) 234-5678",
    company: "GrowthCo",
    status: "warm",
    stage: "contacted",
    source: "Referral",
    value: 8500,
    probability: 50,
    createdAt: "2024-12-08",
    lastContact: "2024-12-14",
    nextFollowUp: "2024-12-19",
    notes: "Needs proposal for social media management.",
    tags: ["Social Media"],
    assignedTo: "Emma Davis",
    priority: "medium",
    starred: false,
    activities: 5,
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily@innovatelab.com",
    phone: "+1 (555) 345-6789",
    company: "InnovateLab",
    status: "hot",
    stage: "negotiation",
    source: "LinkedIn",
    value: 22000,
    probability: 85,
    createdAt: "2024-12-05",
    lastContact: "2024-12-16",
    nextFollowUp: "2024-12-17",
    notes: "Looking for full-service digital marketing. High budget project.",
    tags: ["Full Service", "Priority"],
    assignedTo: "John Smith",
    priority: "high",
    starred: true,
    activities: 18,
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@scaleup.ltd",
    phone: "+1 (555) 456-7890",
    company: "ScaleUp Ltd",
    status: "cold",
    stage: "new",
    source: "Cold Email",
    value: 5000,
    probability: 20,
    createdAt: "2024-12-01",
    lastContact: "2024-12-10",
    nextFollowUp: "2024-12-20",
    notes: "Initial contact made. Waiting for response.",
    tags: ["PPC"],
    assignedTo: "Alex Johnson",
    priority: "low",
    starred: false,
    activities: 2,
  },
  {
    id: "5",
    name: "Amanda Torres",
    email: "amanda@brightideas.co",
    phone: "+1 (555) 567-8901",
    company: "Bright Ideas Co",
    status: "warm",
    stage: "qualified",
    source: "Conference",
    value: 12000,
    probability: 60,
    createdAt: "2024-12-03",
    lastContact: "2024-12-13",
    nextFollowUp: "2024-12-18",
    notes: "Met at MarketingCon. Interested in PPC campaigns.",
    tags: ["PPC", "Conference Lead"],
    assignedTo: "Emma Davis",
    priority: "medium",
    starred: false,
    activities: 8,
  },
  {
    id: "6",
    name: "David Park",
    email: "david@nexgen.tech",
    phone: "+1 (555) 678-9012",
    company: "NexGen Tech",
    status: "hot",
    stage: "proposal",
    source: "Website",
    value: 35000,
    probability: 70,
    createdAt: "2024-12-12",
    lastContact: "2024-12-16",
    nextFollowUp: "2024-12-17",
    notes: "Enterprise client. Looking for comprehensive brand overhaul.",
    tags: ["Branding", "Enterprise", "Priority"],
    assignedTo: "John Smith",
    priority: "high",
    starred: true,
    activities: 15,
  },
  {
    id: "7",
    name: "Lisa Wang",
    email: "lisa@cloudnine.io",
    phone: "+1 (555) 789-0123",
    company: "CloudNine",
    status: "warm",
    stage: "contacted",
    source: "LinkedIn",
    value: 9500,
    probability: 45,
    createdAt: "2024-12-11",
    lastContact: "2024-12-15",
    nextFollowUp: "2024-12-19",
    notes: "Interested in content marketing strategy.",
    tags: ["Content"],
    assignedTo: "Alex Johnson",
    priority: "medium",
    starred: false,
    activities: 4,
  },
  {
    id: "8",
    name: "Robert Kim",
    email: "robert@fintech.pro",
    phone: "+1 (555) 890-1234",
    company: "FinTech Pro",
    status: "cold",
    stage: "new",
    source: "Webinar",
    value: 18000,
    probability: 25,
    createdAt: "2024-12-14",
    lastContact: "2024-12-14",
    nextFollowUp: "2024-12-21",
    notes: "Attended webinar on digital transformation.",
    tags: ["Webinar Lead", "Finance"],
    assignedTo: "Emma Davis",
    priority: "low",
    starred: false,
    activities: 1,
  },
]

const statusConfig = {
  hot: { label: "Hot", icon: Flame, color: "bg-red-500/20 text-red-400 border-red-500/30" },
  warm: { label: "Warm", icon: Thermometer, color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  cold: { label: "Cold", icon: Snowflake, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
}

const stageConfig = {
  new: { label: "New", color: "bg-slate-500/20 text-slate-400", order: 0 },
  contacted: { label: "Contacted", color: "bg-blue-500/20 text-blue-400", order: 1 },
  qualified: { label: "Qualified", color: "bg-cyan-500/20 text-cyan-400", order: 2 },
  proposal: { label: "Proposal", color: "bg-violet-500/20 text-violet-400", order: 3 },
  negotiation: { label: "Negotiation", color: "bg-amber-500/20 text-amber-400", order: 4 },
  won: { label: "Won", color: "bg-emerald-500/20 text-emerald-400", order: 5 },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400", order: 6 },
}

const priorityConfig = {
  high: { label: "High", color: "text-red-400" },
  medium: { label: "Medium", color: "text-amber-400" },
  low: { label: "Low", color: "text-slate-400" },
}

const sourceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Website: Globe,
  LinkedIn: Linkedin,
  Referral: Users,
  "Cold Email": Mail,
  Conference: Target,
  Webinar: MessageSquare,
}

type ViewMode = "table" | "grid" | "kanban"
type Stage = Lead["stage"]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("kanban")
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter
    const matchesAssignee = assigneeFilter === "all" || lead.assignedTo === assigneeFilter
    return matchesSearch && matchesStatus && matchesSource && matchesPriority && matchesAssignee
  })

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.status === "hot").length,
    warm: leads.filter((l) => l.status === "warm").length,
    cold: leads.filter((l) => l.status === "cold").length,
    totalValue: leads.reduce((sum, l) => sum + l.value, 0),
    weightedValue: leads.reduce((sum, l) => sum + (l.value * l.probability) / 100, 0),
    avgProbability: Math.round(leads.reduce((sum, l) => sum + l.probability, 0) / leads.length),
    starred: leads.filter((l) => l.starred).length,
  }

  const uniqueSources = [...new Set(leads.map((l) => l.source))]
  const uniqueAssignees = [...new Set(leads.map((l) => l.assignedTo))]

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newLead: Lead = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      status: formData.get("status") as "hot" | "warm" | "cold",
      stage: formData.get("stage") as Stage,
      source: formData.get("source") as string,
      value: Number(formData.get("value")),
      probability: Number(formData.get("probability")) || 50,
      createdAt: new Date().toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
      nextFollowUp: (formData.get("nextFollowUp") as string) || "",
      notes: formData.get("notes") as string,
      tags:
        (formData.get("tags") as string)
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean) || [],
      assignedTo: (formData.get("assignedTo") as string) || "Unassigned",
      priority: formData.get("priority") as "high" | "medium" | "low",
      starred: false,
      activities: 0,
    }
    setLeads([newLead, ...leads])
    setIsAddDialogOpen(false)
  }

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((l) => l.id !== id))
    setSelectedLeads(selectedLeads.filter((sid) => sid !== id))
  }

  const handleBulkDelete = () => {
    setLeads(leads.filter((l) => !selectedLeads.includes(l.id)))
    setSelectedLeads([])
  }

  const handleStatusChange = (id: string, newStatus: "hot" | "warm" | "cold") => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)))
  }

  const handleStageChange = (id: string, newStage: Stage) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, stage: newStage } : l)))
  }

  const handleToggleStar = (id: string) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, starred: !l.starred } : l)))
  }

  const handleSelectLead = (id: string) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map((l) => l.id))
    }
  }

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", lead.id)
  }

  const handleDragOver = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverStage(stage)
  }

  const handleDragLeave = () => {
    setDragOverStage(null)
  }

  const handleDrop = (e: React.DragEvent, targetStage: Stage) => {
    e.preventDefault()
    if (draggedLead && draggedLead.stage !== targetStage) {
      handleStageChange(draggedLead.id, targetStage)
    }
    setDraggedLead(null)
    setDragOverStage(null)
  }

  const handleDragEnd = () => {
    setDraggedLead(null)
    setDragOverStage(null)
  }

  const clearFilters = () => {
    setStatusFilter("all")
    setSourceFilter("all")
    setPriorityFilter("all")
    setAssigneeFilter("all")
    setSearchQuery("")
  }

  const activeFiltersCount = [statusFilter, sourceFilter, priorityFilter, assigneeFilter].filter(
    (f) => f !== "all",
  ).length

  const kanbanStages: Stage[] = ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
            <p className="text-muted-foreground mt-1">Track, manage, and convert your leads into clients</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                  <DialogDescription>Fill in the details to create a new lead.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddLead} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company *</Label>
                      <Input id="company" name="company" placeholder="Acme Inc" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@acme.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Temperature</Label>
                      <Select name="status" defaultValue="warm">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hot">Hot</SelectItem>
                          <SelectItem value="warm">Warm</SelectItem>
                          <SelectItem value="cold">Cold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stage">Stage</Label>
                      <Select name="stage" defaultValue="new">
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {kanbanStages
                            .filter((s) => s !== "won" && s !== "lost")
                            .map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stageConfig[stage].label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select name="priority" defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source">Source</Label>
                      <Select name="source" defaultValue="Website">
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Cold Email">Cold Email</SelectItem>
                          <SelectItem value="Conference">Conference</SelectItem>
                          <SelectItem value="Webinar">Webinar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assigned To</Label>
                      <Select name="assignedTo" defaultValue="John Smith">
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Smith">John Smith</SelectItem>
                          <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                          <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="value">Deal Value ($) *</Label>
                      <Input id="value" name="value" type="number" placeholder="10000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="probability">Win Probability (%)</Label>
                      <Input id="probability" name="probability" type="number" placeholder="50" min="0" max="100" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextFollowUp">Next Follow-up</Label>
                    <Input id="nextFollowUp" name="nextFollowUp" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" name="tags" placeholder="SEO, Enterprise, Priority" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" placeholder="Additional notes about the lead..." rows={3} />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Lead</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Total Leads", value: stats.total, icon: Users, color: "text-foreground", bg: "bg-secondary" },
            { label: "Hot", value: stats.hot, icon: Flame, color: "text-red-400", bg: "bg-red-500/10" },
            { label: "Warm", value: stats.warm, icon: Thermometer, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "Cold", value: stats.cold, icon: Snowflake, color: "text-blue-400", bg: "bg-blue-500/10" },
            {
              label: "Pipeline",
              value: `$${(stats.totalValue / 1000).toFixed(0)}k`,
              icon: DollarSign,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Weighted",
              value: `$${(stats.weightedValue / 1000).toFixed(0)}k`,
              icon: TrendingUp,
              color: "text-violet-400",
              bg: "bg-violet-500/10",
            },
            {
              label: "Avg. Prob.",
              value: `${stats.avgProbability}%`,
              icon: Target,
              color: "text-cyan-400",
              bg: "bg-cyan-500/10",
            },
            { label: "Starred", value: stats.starred, icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          ].map((stat, i) => (
            <AnimatedCard key={stat.label} delay={i * 30} className="p-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md ${stat.bg}`}>
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Toolbar */}
        <AnimatedCard delay={200} className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search and filters */}
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads, companies, tags..."
                  className="pl-10 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Button
                variant={isFilterPanelOpen ? "default" : "outline"}
                size="icon"
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className="relative"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* View Toggle and Actions */}
            <div className="flex items-center gap-2">
              {selectedLeads.length > 0 && (
                <div className="flex items-center gap-2 mr-2 animate-in fade-in slide-in-from-left-2 duration-200">
                  <span className="text-sm text-muted-foreground">{selectedLeads.length} selected</span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedLeads([])}>
                    Clear
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}

              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <TabsList className="bg-secondary">
                  <TabsTrigger value="kanban" className="gap-1.5">
                    <Columns3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Kanban</span>
                  </TabsTrigger>
                  <TabsTrigger value="table" className="gap-1.5">
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">Table</span>
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="gap-1.5">
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterPanelOpen && (
            <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] bg-secondary border-0">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-[140px] bg-secondary border-0">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {uniqueSources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px] bg-secondary border-0">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                  <SelectTrigger className="w-[150px] bg-secondary border-0">
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {uniqueAssignees.map((assignee) => (
                      <SelectItem key={assignee} value={assignee}>
                        {assignee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                    <X className="w-4 h-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </AnimatedCard>

        {/* Kanban View */}
        {viewMode === "kanban" && (
          <div className="overflow-x-auto pb-4 animate-in fade-in duration-300">
            <div className="flex gap-4 min-w-max">
              {kanbanStages.map((stage, stageIndex) => {
                const stageLeads = filteredLeads.filter((l) => l.stage === stage)
                const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0)
                const isDropTarget = dragOverStage === stage && draggedLead?.stage !== stage

                return (
                  <div
                    key={stage}
                    className={`w-[300px] flex flex-col rounded-xl transition-all duration-200 ${
                      isDropTarget ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    }`}
                    onDragOver={(e) => handleDragOver(e, stage)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, stage)}
                    style={{ animationDelay: `${stageIndex * 50}ms` }}
                  >
                    <div className="flex items-center justify-between p-3 bg-card rounded-t-xl border border-border border-b-0">
                      <div className="flex items-center gap-2">
                        <Badge className={`${stageConfig[stage].color} border-0`}>{stageConfig[stage].label}</Badge>
                        <span className="text-xs text-muted-foreground">({stageLeads.length})</span>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        ${(stageValue / 1000).toFixed(0)}k
                      </span>
                    </div>

                    <div
                      className={`flex-1 p-2 bg-secondary/30 rounded-b-xl border border-border border-t-0 min-h-[400px] space-y-2 transition-colors ${
                        isDropTarget ? "bg-primary/5" : ""
                      }`}
                    >
                      {stageLeads.map((lead, i) => {
                        const StatusIcon = statusConfig[lead.status].icon
                        const SourceIcon = sourceIcons[lead.source] || Globe

                        return (
                          <div
                            key={lead.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, lead)}
                            onDragEnd={handleDragEnd}
                            className={`group bg-card rounded-lg border border-border p-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 animate-in fade-in slide-in-from-bottom-2 ${
                              draggedLead?.id === lead.id ? "opacity-50 scale-95" : ""
                            }`}
                            style={{ animationDelay: `${i * 30}ms` }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <button
                                  onClick={() => handleToggleStar(lead.id)}
                                  className="flex-shrink-0 text-muted-foreground hover:text-yellow-400 transition-colors"
                                >
                                  {lead.starred ? (
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ) : (
                                    <StarOff className="w-4 h-4" />
                                  )}
                                </button>
                                <Avatar className="w-7 h-7 flex-shrink-0">
                                  <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                                    {lead.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                  <p className="font-medium text-sm truncate">{lead.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                                </div>
                              </div>
                              <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Badge className={`${statusConfig[lead.status].color} border text-[10px] px-1.5 py-0`}>
                                  <StatusIcon className="w-2.5 h-2.5 mr-0.5" />
                                  {statusConfig[lead.status].label}
                                </Badge>
                              </div>
                              <span className={`text-xs font-medium ${priorityConfig[lead.priority].color}`}>
                                {priorityConfig[lead.priority].label}
                              </span>
                            </div>

                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Deal Value</span>
                                <span className="font-semibold text-emerald-400">${lead.value.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Probability</span>
                                <span className="font-medium">{lead.probability}%</span>
                              </div>
                              <Progress value={lead.probability} className="h-1" />
                            </div>

                            {lead.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1">
                                {lead.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 bg-secondary">
                                    {tag}
                                  </Badge>
                                ))}
                                {lead.tags.length > 2 && (
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-secondary">
                                    +{lead.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}

                            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <SourceIcon className="w-3 h-3" />
                                {lead.source}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 rounded hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedLead(lead)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Lead
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CalendarPlus className="w-4 h-4 mr-2" />
                                    Schedule Meeting
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <ArrowUpRight className="w-4 h-4 mr-2" />
                                    Convert to Client
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteLead(lead.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        )
                      })}

                      {stageLeads.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
                          <p>No leads</p>
                          <p className="text-xs">Drag leads here</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <AnimatedCard delay={300}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  All Leads
                  <span className="text-muted-foreground font-normal ml-2">({filteredLeads.length})</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground w-10">
                        <Checkbox
                          checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Lead</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Stage</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Value</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Probability</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Assigned</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Follow-up</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, i) => {
                      const StatusIcon = statusConfig[lead.status].icon
                      return (
                        <tr
                          key={lead.id}
                          className={`border-b border-border/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                            selectedLeads.includes(lead.id) ? "bg-primary/5" : "hover:bg-secondary/30"
                          }`}
                          style={{ animationDelay: `${i * 30}ms` }}
                        >
                          <td className="py-3 px-4">
                            <Checkbox
                              checked={selectedLeads.includes(lead.id)}
                              onCheckedChange={() => handleSelectLead(lead.id)}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <button onClick={() => handleToggleStar(lead.id)}>
                                {lead.starred ? (
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ) : (
                                  <StarOff className="w-4 h-4 text-muted-foreground hover:text-yellow-400 transition-colors" />
                                )}
                              </button>
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                  {lead.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{lead.name}</p>
                                <p className="text-xs text-muted-foreground">{lead.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-sm">{lead.company}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button>
                                  <Badge className={`${statusConfig[lead.status].color} border cursor-pointer`}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {statusConfig[lead.status].label}
                                  </Badge>
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "hot")}>
                                  <Flame className="w-4 h-4 mr-2 text-red-400" />
                                  Hot
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "warm")}>
                                  <Thermometer className="w-4 h-4 mr-2 text-amber-400" />
                                  Warm
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "cold")}>
                                  <Snowflake className="w-4 h-4 mr-2 text-blue-400" />
                                  Cold
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button>
                                  <Badge className={`${stageConfig[lead.stage].color} border-0 cursor-pointer`}>
                                    {stageConfig[lead.stage].label}
                                  </Badge>
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {kanbanStages.map((stage) => (
                                  <DropdownMenuItem key={stage} onClick={() => handleStageChange(lead.id, stage)}>
                                    {stageConfig[stage].label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 text-sm font-medium text-emerald-400">
                              <DollarSign className="w-3.5 h-3.5" />
                              {lead.value.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Progress value={lead.probability} className="w-16 h-1.5" />
                              <span className="text-xs text-muted-foreground">{lead.probability}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{lead.assignedTo}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              {lead.nextFollowUp ? new Date(lead.nextFollowUp).toLocaleDateString() : "-"}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setSelectedLead(lead)
                                  setIsViewDialogOpen(true)
                                }}
                                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                              >
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ArrowUpRight className="w-4 h-4 mr-2" />
                                    Convert to Client
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteLead(lead.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                {filteredLeads.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No leads found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </AnimatedCard>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
            {filteredLeads.map((lead, i) => {
              const StatusIcon = statusConfig[lead.status].icon
              const SourceIcon = sourceIcons[lead.source] || Globe

              return (
                <AnimatedCard key={lead.id} delay={i * 30} className="p-4 group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{lead.name}</p>
                          <button onClick={() => handleToggleStar(lead.id)}>
                            {lead.starred ? (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLead(lead)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteLead(lead.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Badge className={`${statusConfig[lead.status].color} border`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[lead.status].label}
                    </Badge>
                    <Badge className={`${stageConfig[lead.stage].color} border-0`}>
                      {stageConfig[lead.stage].label}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deal Value</span>
                      <span className="font-semibold text-emerald-400">${lead.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium">{lead.probability}%</span>
                    </div>
                    <Progress value={lead.probability} className="h-1.5" />
                  </div>

                  <div className="mt-4 pt-3 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <SourceIcon className="w-3.5 h-3.5" />
                      <span>{lead.source}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Follow-up: {lead.nextFollowUp ? new Date(lead.nextFollowUp).toLocaleDateString() : "Not set"}
                      </span>
                    </div>
                  </div>

                  {lead.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 bg-secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </AnimatedCard>
              )
            })}

            {filteredLeads.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No leads found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}

        {/* View Lead Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            {selectedLead && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="bg-primary/20 text-primary text-lg">
                          {selectedLead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <DialogTitle className="text-xl">{selectedLead.name}</DialogTitle>
                        <p className="text-muted-foreground">{selectedLead.company}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${statusConfig[selectedLead.status].color} border`}>
                            {statusConfig[selectedLead.status].label}
                          </Badge>
                          <Badge className={`${stageConfig[selectedLead.stage].color} border-0`}>
                            {stageConfig[selectedLead.stage].label}
                          </Badge>
                          <Badge className={`${priorityConfig[selectedLead.priority].color} bg-transparent border`}>
                            {priorityConfig[selectedLead.priority].label} Priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Contact Info
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedLead.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedLead.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Deal Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Deal Value</span>
                        <span className="font-semibold text-emerald-400">${selectedLead.value.toLocaleString()}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Win Probability</span>
                          <span className="font-semibold">{selectedLead.probability}%</span>
                        </div>
                        <Progress value={selectedLead.probability} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Weighted Value</span>
                        <span className="font-semibold text-violet-400">
                          ${Math.round((selectedLead.value * selectedLead.probability) / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Created</span>
                        <span className="text-sm">{new Date(selectedLead.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Last Contact</span>
                        <span className="text-sm">{new Date(selectedLead.lastContact).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Next Follow-up</span>
                        <span className="text-sm font-medium text-primary">
                          {selectedLead.nextFollowUp
                            ? new Date(selectedLead.nextFollowUp).toLocaleDateString()
                            : "Not set"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Assignment</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Assigned To</span>
                        <span className="text-sm font-medium">{selectedLead.assignedTo}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Source</span>
                        <span className="text-sm">{selectedLead.source}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Activities</span>
                        <span className="text-sm">{selectedLead.activities} interactions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedLead.tags.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLead.notes && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h4>
                    <p className="text-sm p-3 rounded-lg bg-secondary/50">{selectedLead.notes}</p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-border flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <CalendarPlus className="w-4 h-4" />
                    Schedule
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
