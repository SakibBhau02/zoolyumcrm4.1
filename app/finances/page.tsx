"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Send,
  Eye,
  Edit,
  Trash2,
  Copy,
  FileText,
  LayoutGrid,
  List,
  Columns3,
  Mail,
  Printer,
  MoreVertical,
  Target,
  TrendingDown,
  Repeat,
  AlertTriangle,
  Calculator,
  Percent,
  CircleDollarSign,
  Banknote,
} from "lucide-react"
import {
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts"

const invoicesData = [
  {
    id: "INV-2024-001",
    invoiceNumber: "INV-2024-001",
    client: "TechCorp Inc",
    clientEmail: "accounting@techcorp.com",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "Website Redesign",
    projectId: "PRJ-001",
    amount: 15000,
    paid: 15000,
    tax: 1200,
    discount: 0,
    status: "paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    paidDate: "2024-01-14",
    paymentMethod: "Bank Transfer",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      {
        id: 1,
        description: "UI/UX Design - Homepage & Landing Pages",
        quantity: 1,
        rate: 5000,
        amount: 5000,
        taxable: true,
      },
      {
        id: 2,
        description: "Frontend Development (React + Next.js)",
        quantity: 40,
        rate: 150,
        amount: 6000,
        taxable: true,
      },
      {
        id: 3,
        description: "Backend Integration & API Development",
        quantity: 20,
        rate: 200,
        amount: 4000,
        taxable: true,
      },
    ],
    notes: "Thank you for your business! Payment received on time.",
    internalNotes: "Client prefers monthly billing",
    category: "development",
    recurringInvoice: false,
    attachments: ["contract.pdf", "mockups.zip"],
  },
  {
    id: "INV-2024-002",
    invoiceNumber: "INV-2024-002",
    client: "StartupXYZ",
    clientEmail: "finance@startupxyz.com",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "SEO Campaign Q1",
    projectId: "PRJ-002",
    amount: 8500,
    paid: 4250,
    tax: 680,
    discount: 500,
    status: "partial",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    paidDate: "2024-01-06",
    paymentMethod: "Credit Card",
    paymentTerms: "50% upfront, 50% on completion",
    currency: "USD",
    items: [
      {
        id: 1,
        description: "Comprehensive SEO Audit & Strategy",
        quantity: 1,
        rate: 1500,
        amount: 1500,
        taxable: true,
      },
      {
        id: 2,
        description: "Monthly SEO Management & Optimization",
        quantity: 3,
        rate: 2000,
        amount: 6000,
        taxable: true,
      },
      { id: 3, description: "Content Writing & Blog Posts", quantity: 5, rate: 200, amount: 1000, taxable: true },
    ],
    notes: "50% paid upfront. Balance due upon completion.",
    internalNotes: "New client - watch payment closely",
    category: "marketing",
    recurringInvoice: false,
    attachments: ["proposal.pdf"],
  },
  {
    id: "INV-2024-003",
    invoiceNumber: "INV-2024-003",
    client: "GrowthLabs",
    clientEmail: "billing@growthlabs.io",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "Social Media Management",
    projectId: "PRJ-003",
    amount: 12000,
    paid: 0,
    tax: 960,
    discount: 0,
    status: "pending",
    dueDate: "2024-02-01",
    issueDate: "2024-01-10",
    paidDate: null,
    paymentMethod: "ACH",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      { id: 1, description: "Social Media Strategy Development", quantity: 1, rate: 3000, amount: 3000, taxable: true },
      { id: 2, description: "Monthly Social Media Management", quantity: 3, rate: 2500, amount: 7500, taxable: true },
      { id: 3, description: "Paid Ad Campaign Management", quantity: 1, rate: 1500, amount: 1500, taxable: true },
    ],
    notes: "Net 30 payment terms. Auto-pay enabled.",
    internalNotes: "Recurring client - good payment history",
    category: "social",
    recurringInvoice: true,
    attachments: ["strategy.pdf", "content-calendar.xlsx"],
  },
  {
    id: "INV-2024-004",
    invoiceNumber: "INV-2024-004",
    client: "MediaFlow",
    clientEmail: "accounts@mediaflow.com",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "Video Production - Product Launch",
    projectId: "PRJ-004",
    amount: 25000,
    paid: 0,
    tax: 2000,
    discount: 1000,
    status: "overdue",
    dueDate: "2024-01-10",
    issueDate: "2023-12-15",
    paidDate: null,
    paymentMethod: "Bank Transfer",
    paymentTerms: "Net 15",
    currency: "USD",
    items: [
      {
        id: 1,
        description: "Video Shooting & Production (5 days)",
        quantity: 5,
        rate: 2000,
        amount: 10000,
        taxable: true,
      },
      { id: 2, description: "Post Production & Editing", quantity: 5, rate: 1500, amount: 7500, taxable: true },
      { id: 3, description: "Motion Graphics & Animation", quantity: 5, rate: 1500, amount: 7500, taxable: true },
    ],
    notes: "OVERDUE - Payment reminder sent multiple times",
    internalNotes: "CLIENT DELAYED - Consider legal action if not paid by Feb 1",
    category: "creative",
    recurringInvoice: false,
    attachments: ["contract_signed.pdf", "deliverables.zip"],
  },
  {
    id: "INV-2024-005",
    invoiceNumber: "INV-2024-005",
    client: "BrandFirst",
    clientEmail: "contact@brandfirst.co",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "Brand Identity Package",
    projectId: "PRJ-005",
    amount: 18000,
    paid: 0,
    tax: 1440,
    discount: 2000,
    status: "draft",
    dueDate: "2024-02-15",
    issueDate: "2024-01-18",
    paidDate: null,
    paymentMethod: "Wire Transfer",
    paymentTerms: "Net 45",
    currency: "USD",
    items: [
      { id: 1, description: "Logo Design & Brand Mark", quantity: 1, rate: 5000, amount: 5000, taxable: true },
      { id: 2, description: "Brand Guidelines & Style Guide", quantity: 1, rate: 8000, amount: 8000, taxable: true },
      { id: 3, description: "Marketing Collateral Design", quantity: 1, rate: 5000, amount: 5000, taxable: true },
    ],
    notes: "DRAFT - Pending client approval on final deliverables",
    internalNotes: "10% discount for early payment within 7 days",
    category: "branding",
    recurringInvoice: false,
    attachments: [],
  },
  {
    id: "INV-2024-006",
    invoiceNumber: "INV-2024-006",
    client: "E-Shop Pro",
    clientEmail: "billing@eshoppro.com",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "E-commerce Platform Development",
    projectId: "PRJ-006",
    amount: 45000,
    paid: 45000,
    tax: 3600,
    discount: 3000,
    status: "paid",
    dueDate: "2024-01-25",
    issueDate: "2024-01-01",
    paidDate: "2024-01-24",
    paymentMethod: "Bank Transfer",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      {
        id: 1,
        description: "Full E-commerce Platform Development",
        quantity: 1,
        rate: 30000,
        amount: 30000,
        taxable: true,
      },
      {
        id: 2,
        description: "Payment Gateway Integration (Stripe)",
        quantity: 1,
        rate: 10000,
        amount: 10000,
        taxable: true,
      },
      { id: 3, description: "Training, Documentation & Support", quantity: 1, rate: 5000, amount: 5000, taxable: true },
    ],
    notes: "Project completed successfully. Payment received in full.",
    internalNotes: "VIP Client - Expedite all future requests",
    category: "development",
    recurringInvoice: false,
    attachments: ["final_deliverables.zip", "documentation.pdf"],
  },
  {
    id: "INV-2024-007",
    invoiceNumber: "INV-2024-007",
    client: "HealthTech Solutions",
    clientEmail: "finance@healthtech.com",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "PPC Campaign Management",
    projectId: "PRJ-007",
    amount: 6500,
    paid: 0,
    tax: 520,
    discount: 0,
    status: "sent",
    dueDate: "2024-02-10",
    issueDate: "2024-01-20",
    paidDate: null,
    paymentMethod: "Credit Card",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      {
        id: 1,
        description: "Google Ads Campaign Setup & Strategy",
        quantity: 1,
        rate: 1500,
        amount: 1500,
        taxable: true,
      },
      { id: 2, description: "Monthly Campaign Management", quantity: 2, rate: 2000, amount: 4000, taxable: true },
      { id: 3, description: "Performance Reporting & Analytics", quantity: 2, rate: 500, amount: 1000, taxable: true },
    ],
    notes: "Invoice sent via email on Jan 20. Auto-pay enabled.",
    internalNotes: "Monthly recurring - set up auto-invoice",
    category: "marketing",
    recurringInvoice: true,
    attachments: ["campaign_strategy.pdf"],
  },
  {
    id: "INV-2024-008",
    invoiceNumber: "INV-2024-008",
    client: "FinanceFirst",
    clientEmail: "ap@financefirst.com",
    clientLogo: "/placeholder.svg?height=40&width=40",
    project: "Content Marketing Package",
    projectId: "PRJ-008",
    amount: 9000,
    paid: 9000,
    tax: 720,
    discount: 0,
    status: "paid",
    dueDate: "2024-01-05",
    issueDate: "2023-12-20",
    paidDate: "2024-01-03",
    paymentMethod: "ACH",
    paymentTerms: "Net 15",
    currency: "USD",
    items: [
      { id: 1, description: "Content Marketing Strategy", quantity: 1, rate: 2000, amount: 2000, taxable: true },
      { id: 2, description: "Blog Writing & SEO Optimization", quantity: 10, rate: 400, amount: 4000, taxable: true },
      { id: 3, description: "Email Marketing Campaigns", quantity: 6, rate: 500, amount: 3000, taxable: true },
    ],
    notes: "Paid early. Thank you!",
    internalNotes: "Long-term client - priority support",
    category: "content",
    recurringInvoice: true,
    attachments: ["content_calendar.xlsx"],
  },
]

const incomeData = [
  {
    id: 1,
    description: "Monthly Retainer - TechCorp Inc",
    category: "Retainer",
    amount: 15000,
    date: "2024-01-15",
    client: "TechCorp Inc",
    project: "Website Redesign",
    status: "received",
    invoiceId: "INV-2024-001",
    paymentMethod: "Bank Transfer",
    recurring: true,
    taxAmount: 1200,
  },
  {
    id: 2,
    description: "Project Payment - E-commerce Platform",
    category: "Project",
    amount: 45000,
    date: "2024-01-24",
    client: "E-Shop Pro",
    project: "E-commerce Platform",
    status: "received",
    invoiceId: "INV-2024-006",
    paymentMethod: "Bank Transfer",
    recurring: false,
    taxAmount: 3600,
  },
  {
    id: 3,
    description: "Partial Payment - SEO Campaign",
    category: "Project",
    amount: 4250,
    date: "2024-01-06",
    client: "StartupXYZ",
    project: "SEO Campaign Q1",
    status: "received",
    invoiceId: "INV-2024-002",
    paymentMethod: "Credit Card",
    recurring: false,
    taxAmount: 340,
  },
  {
    id: 4,
    description: "Monthly Retainer - FinanceFirst",
    category: "Retainer",
    amount: 9000,
    date: "2024-01-03",
    client: "FinanceFirst",
    project: "Content Marketing",
    status: "received",
    invoiceId: "INV-2024-008",
    paymentMethod: "ACH",
    recurring: true,
    taxAmount: 720,
  },
  {
    id: 5,
    description: "Consulting Services - Brand Strategy",
    category: "Consulting",
    amount: 3500,
    date: "2024-01-18",
    client: "BrandFirst",
    project: "Brand Identity",
    status: "pending",
    invoiceId: "INV-2024-009",
    paymentMethod: "Wire Transfer",
    recurring: false,
    taxAmount: 280,
  },
  {
    id: 6,
    description: "Ad Management Fee - GrowthLabs",
    category: "Management Fee",
    amount: 2500,
    date: "2024-01-12",
    client: "GrowthLabs",
    project: "Social Media Management",
    status: "received",
    invoiceId: "INV-2024-010",
    paymentMethod: "ACH",
    recurring: true,
    taxAmount: 200,
  },
]

const expensesData = [
  {
    id: 1,
    description: "Adobe Creative Cloud - Team Plan",
    category: "Software",
    amount: 599,
    date: "2024-01-15",
    vendor: "Adobe Inc",
    status: "paid",
    recurring: true,
    recurringFrequency: "monthly",
    approvalStatus: "approved",
    approvedBy: "Sarah Chen",
    paymentMethod: "Credit Card",
    receiptUrl: "receipt_001.pdf",
    taxDeductible: true,
    notes: "Annual subscription billed monthly",
    department: "Creative",
    project: null,
  },
  {
    id: 2,
    description: "Google Ads - Client Campaign Budget",
    category: "Advertising",
    amount: 2500,
    date: "2024-01-14",
    vendor: "Google LLC",
    status: "paid",
    recurring: false,
    recurringFrequency: null,
    approvalStatus: "approved",
    approvedBy: "Michael Torres",
    paymentMethod: "Credit Card",
    receiptUrl: "receipt_002.pdf",
    taxDeductible: true,
    notes: "Campaign for StartupXYZ - billable to client",
    department: "Marketing",
    project: "PRJ-002",
  },
  {
    id: 3,
    description: "Office Space Rent - WeWork Downtown",
    category: "Operations",
    amount: 4500,
    date: "2024-01-01",
    vendor: "WeWork",
    status: "paid",
    recurring: true,
    recurringFrequency: "monthly",
    approvalStatus: "approved",
    approvedBy: "Sarah Chen",
    paymentMethod: "ACH",
    receiptUrl: "receipt_003.pdf",
    taxDeductible: true,
    notes: "Monthly office rent including utilities",
    department: "Operations",
    project: null,
  },
  {
    id: 4,
    description: "Freelancer Payment - UI/UX Designer",
    category: "Contractors",
    amount: 3200,
    date: "2024-01-12",
    vendor: "Sarah Miller Design",
    status: "pending",
    recurring: false,
    recurringFrequency: null,
    approvalStatus: "approved",
    approvedBy: "Sarah Chen",
    paymentMethod: "PayPal",
    receiptUrl: "invoice_freelancer_001.pdf",
    taxDeductible: true,
    notes: "40 hours @ $80/hr - TechCorp project",
    department: "Creative",
    project: "PRJ-001",
  },
  {
    id: 5,
    description: "HubSpot Marketing Hub - Professional",
    category: "Software",
    amount: 890,
    date: "2024-01-10",
    vendor: "HubSpot Inc",
    status: "paid",
    recurring: true,
    recurringFrequency: "monthly",
    approvalStatus: "approved",
    approvedBy: "Michael Torres",
    paymentMethod: "Credit Card",
    receiptUrl: "receipt_005.pdf",
    taxDeductible: true,
    notes: "CRM and marketing automation",
    department: "Sales",
    project: null,
  },
  {
    id: 6,
    description: "Team Building Event - Q1 Kickoff",
    category: "Team",
    amount: 1450,
    date: "2024-01-18",
    vendor: "Various Vendors",
    status: "paid",
    recurring: false,
    recurringFrequency: null,
    approvalStatus: "approved",
    approvedBy: "Sarah Chen",
    paymentMethod: "Company Card",
    receiptUrl: "receipts_team_event.zip",
    taxDeductible: false,
    notes: "Dinner and activities for 12 team members",
    department: "HR",
    project: null,
  },
  {
    id: 7,
    description: "Stock Photography & Assets - Shutterstock",
    category: "Assets",
    amount: 299,
    date: "2024-01-08",
    vendor: "Shutterstock",
    status: "paid",
    recurring: true,
    recurringFrequency: "monthly",
    approvalStatus: "approved",
    approvedBy: "Sarah Chen",
    paymentMethod: "Credit Card",
    receiptUrl: "receipt_007.pdf",
    taxDeductible: true,
    notes: "Team subscription - 750 images/month",
    department: "Creative",
    project: null,
  },
  {
    id: 8,
    description: "Client Gift Baskets - Holiday Season",
    category: "Client Relations",
    amount: 750,
    date: "2024-01-20",
    vendor: "Premium Gift Co",
    status: "pending_approval",
    recurring: false,
    recurringFrequency: null,
    approvalStatus: "pending",
    approvedBy: null,
    paymentMethod: "Credit Card",
    receiptUrl: "receipt_008.pdf",
    taxDeductible: true,
    notes: "Gift baskets for top 5 clients",
    department: "Business Development",
    project: null,
  },
  {
    id: 9,
    description: "AWS Cloud Hosting - Production Servers",
    category: "Infrastructure",
    amount: 1280,
    date: "2024-01-05",
    vendor: "Amazon Web Services",
    status: "paid",
    recurring: true,
    recurringFrequency: "monthly",
    approvalStatus: "approved",
    approvedBy: "Sarah Chen",
    paymentMethod: "Credit Card",
    receiptUrl: "receipt_009.pdf",
    taxDeductible: true,
    notes: "Client project hosting costs",
    department: "Development",
    project: "PRJ-006",
  },
  {
    id: 10,
    description: "Professional Development - Marketing Conference",
    category: "Training",
    amount: 899,
    date: "2024-01-22",
    vendor: "Marketing Summit 2024",
    status: "pending_approval",
    recurring: false,
    recurringFrequency: null,
    approvalStatus: "pending",
    approvedBy: null,
    paymentMethod: "Company Card",
    receiptUrl: null,
    taxDeductible: true,
    notes: "Conference ticket for Michael Torres",
    department: "Marketing",
    project: null,
  },
]

const revenueData = [
  { month: "Jul", revenue: 65000, expenses: 42000, profit: 23000, projectRevenue: 45000, retainerRevenue: 20000 },
  { month: "Aug", revenue: 72000, expenses: 45000, profit: 27000, projectRevenue: 50000, retainerRevenue: 22000 },
  { month: "Sep", revenue: 68000, expenses: 40000, profit: 28000, projectRevenue: 43000, retainerRevenue: 25000 },
  { month: "Oct", revenue: 85000, expenses: 52000, profit: 33000, projectRevenue: 60000, retainerRevenue: 25000 },
  { month: "Nov", revenue: 92000, expenses: 55000, profit: 37000, projectRevenue: 65000, retainerRevenue: 27000 },
  { month: "Dec", revenue: 98000, expenses: 58000, profit: 40000, projectRevenue: 70000, retainerRevenue: 28000 },
  { month: "Jan", revenue: 105000, expenses: 62000, profit: 43000, projectRevenue: 73250, retainerRevenue: 31750 },
]

const incomeCategoryData = [
  { name: "Retainer", value: 26500, color: "#6366f1" },
  { name: "Project", value: 49250, color: "#22c55e" },
  { name: "Consulting", value: 3500, color: "#f59e0b" },
  { name: "Management Fee", value: 2500, color: "#ec4899" },
]

// Category breakdown
const categoryData = [
  { name: "Development", value: 60000, color: "#6366f1" },
  { name: "Marketing", value: 15000, color: "#22c55e" },
  { name: "Creative", value: 25000, color: "#f59e0b" },
  { name: "Social Media", value: 12000, color: "#ec4899" },
  { name: "Branding", value: 18000, color: "#8b5cf6" },
]

// Payment methods breakdown
const paymentMethodData = [
  { name: "Bank Transfer", value: 105000, color: "#6366f1" },
  { name: "Credit Card", value: 10750, color: "#22c55e" },
  { name: "ACH", value: 11500, color: "#f59e0b" },
  { name: "Wire Transfer", value: 3500, color: "#ec4899" },
]

const expenseCategoryData = [
  { name: "Software", value: 1788, color: "#6366f1", count: 3 },
  { name: "Operations", value: 4500, color: "#22c55e", count: 1 },
  { name: "Contractors", value: 3200, color: "#f59e0b", count: 1 },
  { name: "Advertising", value: 2500, color: "#ec4899", count: 1 },
  { name: "Infrastructure", value: 1280, color: "#8b5cf6", count: 1 },
  { name: "Team", value: 1450, color: "#14b8a6", count: 1 },
  { name: "Training", value: 899, color: "#f97316", count: 1 },
  { name: "Client Relations", value: 750, color: "#a855f7", count: 1 },
  { name: "Assets", value: 299, color: "#06b6d4", count: 1 },
]

// Cash flow data
const cashFlowData = [
  { week: "W1", inflow: 28000, outflow: 15000, net: 13000 },
  { week: "W2", inflow: 32000, outflow: 18000, net: 14000 },
  { week: "W3", inflow: 25000, outflow: 12000, net: 13000 },
  { week: "W4", inflow: 35000, outflow: 20000, net: 15000 },
]

const profitMarginData = [
  { month: "Jul", margin: 35.4 },
  { month: "Aug", margin: 37.5 },
  { month: "Sep", margin: 41.2 },
  { month: "Oct", margin: 38.8 },
  { month: "Nov", margin: 40.2 },
  { month: "Dec", margin: 40.8 },
  { month: "Jan", margin: 41.0 },
]

// Budget data
const budgetData = [
  { category: "Marketing", budget: 25000, spent: 18500, remaining: 6500 },
  { category: "Development", budget: 45000, spent: 38000, remaining: 7000 },
  { category: "Operations", budget: 15000, spent: 12500, remaining: 2500 },
  { category: "Software", budget: 8000, spent: 6200, remaining: 1800 },
  { category: "Team", budget: 12000, spent: 9800, remaining: 2200 },
]

// Invoice kanban columns
const invoiceColumns = [
  { id: "draft", title: "Draft", color: "bg-muted-foreground" },
  { id: "sent", title: "Sent", color: "bg-blue-500" },
  { id: "pending", title: "Pending", color: "bg-amber-500" },
  { id: "partial", title: "Partial Paid", color: "bg-purple-500" },
  { id: "paid", title: "Paid", color: "bg-emerald-500" },
  { id: "overdue", title: "Overdue", color: "bg-red-500" },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText },
  sent: { label: "Sent", color: "bg-blue-500/10 text-blue-500", icon: Send },
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-500", icon: Clock },
  partial: { label: "Partial", color: "bg-purple-500/10 text-purple-500", icon: AlertCircle },
  paid: { label: "Paid", color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-500/10 text-red-500", icon: XCircle },
}

export default function FinancesPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState<"kanban" | "list" | "grid">("kanban")
  const [searchQuery, setSearchQuery] = useState("")
  const [invoices, setInvoices] = useState(invoicesData)
  const [expenses, setExpenses] = useState(expensesData)
  const [income, setIncome] = useState(incomeData)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoicesData)[0] | null>(null)
  const [selectedExpense, setSelectedExpense] = useState<(typeof expensesData)[0] | null>(null)
  const [draggedInvoice, setDraggedInvoice] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    client: "all",
    category: "all",
    dateRange: "all",
    paymentMethod: "all",
    recurring: "all",
  })

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0)
  const totalPending = invoices.reduce((sum, inv) => sum + (inv.status !== "paid" ? inv.amount - inv.paid : 0), 0)
  const totalExpenses = expenses.filter((exp) => exp.status === "paid").reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses
    .filter((exp) => exp.status === "pending" || exp.status === "pending_approval")
    .reduce((sum, exp) => sum + exp.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0.0"
  const overdueAmount = invoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)
  const overdueCount = invoices.filter((inv) => inv.status === "overdue").length
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalTax = invoices.reduce((sum, inv) => sum + inv.tax, 0)
  const avgInvoiceValue = invoices.length > 0 ? totalInvoiced / invoices.length : 0
  const recurringRevenue = income.filter((inc) => inc.recurring).reduce((sum, inc) => sum + inc.amount, 0)

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filters.status === "all" || invoice.status === filters.status
    const matchesCategory = filters.category === "all" || invoice.category === filters.category
    const matchesPaymentMethod = filters.paymentMethod === "all" || invoice.paymentMethod === filters.paymentMethod
    const matchesRecurring =
      filters.recurring === "all" ||
      (filters.recurring === "recurring" && invoice.recurringInvoice) ||
      (filters.recurring === "one-time" && !invoice.recurringInvoice)
    return matchesSearch && matchesStatus && matchesCategory && matchesPaymentMethod && matchesRecurring
  })

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filters.category === "all" || expense.category === filters.category
    return matchesSearch && matchesCategory
  })

  // Filter income
  const filteredIncome = income.filter((inc) => {
    const matchesSearch =
      inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filters.category === "all" || inc.category === filters.category
    return matchesSearch && matchesCategory
  })

  // Get invoices by status for kanban
  const getInvoicesByStatus = (status: string) => filteredInvoices.filter((inv) => inv.status === status)

  // Drag and drop handlers
  const handleDragStart = (invoiceId: string) => {
    setDraggedInvoice(invoiceId)
  }

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    setDropTarget(status)
  }

  const handleDragLeave = () => {
    setDropTarget(null)
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedInvoice) {
      setInvoices((prev) =>
        prev.map((inv) => {
          if (inv.id === draggedInvoice) {
            // Auto-update paid amount when moving to paid status
            if (newStatus === "paid") {
              return { ...inv, status: newStatus, paid: inv.amount, paidDate: new Date().toISOString().split("T")[0] }
            }
            return { ...inv, status: newStatus }
          }
          return inv
        }),
      )
    }
    setDraggedInvoice(null)
    setDropTarget(null)
  }

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "all").length

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-balance text-2xl font-bold text-foreground">Financial Management</h1>
            <p className="text-pretty text-muted-foreground">
              Comprehensive financial tracking, invoicing, expenses, and profitability analysis
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client *</Label>
                      <Select>
                        <SelectTrigger id="client">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="techcorp">TechCorp Inc</SelectItem>
                          <SelectItem value="startup">StartupXYZ</SelectItem>
                          <SelectItem value="growth">GrowthLabs</SelectItem>
                          <SelectItem value="media">MediaFlow</SelectItem>
                          <SelectItem value="brand">BrandFirst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project">Project *</Label>
                      <Select>
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Website Redesign</SelectItem>
                          <SelectItem value="seo">SEO Campaign</SelectItem>
                          <SelectItem value="social">Social Media Management</SelectItem>
                          <SelectItem value="video">Video Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Issue Date *</Label>
                      <Input id="issueDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date *</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Select>
                        <SelectTrigger id="paymentTerms">
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <Select>
                        <SelectTrigger id="paymentMethod">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="card">Credit Card</SelectItem>
                          <SelectItem value="ach">ACH</SelectItem>
                          <SelectItem value="wire">Wire Transfer</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Line Items *</Label>
                      <Checkbox id="recurring" />
                      <Label htmlFor="recurring" className="text-sm font-normal">
                        Recurring Invoice
                      </Label>
                    </div>
                    <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                      <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                        <div className="col-span-5">Description</div>
                        <div className="col-span-2">Quantity</div>
                        <div className="col-span-2">Rate ($)</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-1"></div>
                      </div>
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <Input className="col-span-5" placeholder="Service or product description" />
                        <Input className="col-span-2" type="number" placeholder="1" defaultValue="1" />
                        <Input className="col-span-2" type="number" placeholder="0.00" step="0.01" />
                        <div className="col-span-2 text-sm font-medium">$0.00</div>
                        <Button variant="ghost" size="icon" className="col-span-1">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Line Item
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subtotal">Subtotal</Label>
                      <Input id="subtotal" value="$0.00" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax">Tax (%)</Label>
                      <Input id="tax" type="number" placeholder="8" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount">Discount ($)</Label>
                      <Input id="discount" type="number" placeholder="0.00" step="0.01" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Invoice Notes</Label>
                    <Textarea id="notes" placeholder="Thank you for your business..." rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="internalNotes">Internal Notes (Private)</Label>
                    <Textarea id="internalNotes" placeholder="Notes for internal use only..." rows={2} />
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-lg font-bold">
                      Total: <span className="text-2xl text-primary">$0.00</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>Create & Send Invoice</Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <AnimatedCard delay={0}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-lg font-bold">{formatCurrency(totalRevenue)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-500 font-medium">+12.5%</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.1}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Net Profit</p>
                  <p className="text-lg font-bold">{formatCurrency(netProfit)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Percent className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-blue-500 font-medium">{profitMargin}% margin</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
                  <p className="text-lg font-bold">{formatCurrency(totalExpenses)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 text-amber-500" />
                    <span className="text-xs text-amber-500 font-medium">
                      {formatCurrency(pendingExpenses)} pending
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
                  <p className="text-lg font-bold">{formatCurrency(totalPending)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-amber-500" />
                    <span className="text-xs text-amber-500 font-medium">
                      {invoices.filter((inv) => inv.status === "pending" || inv.status === "partial").length} invoices
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Overdue</p>
                  <p className="text-lg font-bold text-red-500">{formatCurrency(overdueAmount)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">{overdueCount} invoices</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.5}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">MRR</p>
                  <p className="text-lg font-bold">{formatCurrency(recurringRevenue)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Repeat className="h-3 w-3 text-purple-500" />
                    <span className="text-xs text-purple-500 font-medium">Recurring</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Repeat className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Revenue & Profit Chart */}
            <AnimatedCard delay={0.1}>
              <CardHeader>
                <CardTitle>Revenue, Expenses & Profit Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      fill="#6366f1"
                      fillOpacity={0.2}
                      stroke="#6366f1"
                      name="Revenue"
                    />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Profit" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </AnimatedCard>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard delay={0.2}>
                <CardHeader>
                  <CardTitle>Income by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <RechartsPieChart>
                      <Pie data={incomeCategoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                        {incomeCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {incomeCategoryData.map((cat) => (
                      <div key={cat.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm text-muted-foreground">{cat.name}</span>
                        <span className="text-sm font-medium ml-auto">{formatCurrency(cat.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>

              {/* Expense Categories */}
              <AnimatedCard delay={0.3}>
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <RechartsPieChart>
                      <Pie data={expenseCategoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                        {expenseCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {expenseCategoryData.slice(0, 6).map((cat) => (
                      <div key={cat.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm text-muted-foreground">{cat.name}</span>
                        <span className="text-sm font-medium ml-auto">{formatCurrency(cat.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>

              {/* Cash Flow */}
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle>Weekly Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="inflow" fill="#22c55e" name="Inflow" />
                      <Bar dataKey="outflow" fill="#ef4444" name="Outflow" />
                      <Bar dataKey="net" fill="#6366f1" name="Net" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </AnimatedCard>

              {/* Profit Margin Trend */}
              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle>Profit Margin Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={profitMarginData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" unit="%" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="margin"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", r: 5 }}
                        name="Profit Margin %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-purple-500/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Profit Margin</span>
                      <span className="text-2xl font-bold text-purple-500">{profitMargin}%</span>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.6}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...invoices, ...expenses.map((e) => ({ ...e, type: "expense" }))]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 8)
                    .map((item) => {
                      const isExpense = "vendor" in item
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", isExpense ? "bg-red-500/10" : "bg-emerald-500/10")}>
                              {isExpense ? (
                                <ArrowDownRight className="h-4 w-4 text-red-500" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{isExpense ? item.description : (item as any).client}</p>
                              <p className="text-sm text-muted-foreground">
                                {isExpense ? (item as any).vendor : (item as any).project} • {formatDate(item.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn("font-bold", isExpense ? "text-red-500" : "text-emerald-500")}>
                              {isExpense ? "-" : "+"}
                              {formatCurrency(item.amount)}
                            </p>
                            {!isExpense && (
                              <Badge variant="secondary" className="text-xs">
                                {statusConfig[(item as any).status]?.label || (item as any).status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 flex-1 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices by client, number, or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)} className="relative">
                  <Filter className="h-4 w-4" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "kanban" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("kanban")}
                  >
                    <Columns3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <AnimatedCard delay={0}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Status</label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="partial">Partial Paid</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Category</label>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Payment Method</label>
                      <Select
                        value={filters.paymentMethod}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, paymentMethod: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Credit Card">Credit Card</SelectItem>
                          <SelectItem value="ACH">ACH</SelectItem>
                          <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                          <SelectItem value="PayPal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Type</label>
                      <Select
                        value={filters.recurring}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, recurring: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="recurring">Recurring</SelectItem>
                          <SelectItem value="one-time">One-Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() =>
                          setFilters({
                            status: "all",
                            client: "all",
                            category: "all",
                            dateRange: "all",
                            paymentMethod: "all",
                            recurring: "all",
                          })
                        }
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            )}

            {/* Kanban View */}
            {viewMode === "kanban" && (
              <div className="grid grid-cols-6 gap-4">
                {invoiceColumns.map((column) => {
                  const columnInvoices = getInvoicesByStatus(column.id)
                  const columnTotal = columnInvoices.reduce((sum, inv) => sum + inv.amount, 0)

                  return (
                    <div key={column.id} className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", column.color)} />
                          <span className="font-medium text-sm">{column.title}</span>
                          <Badge variant="secondary" className="text-xs">
                            {columnInvoices.length}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground px-1">{formatCurrency(columnTotal)}</div>
                      <div
                        className={cn(
                          "min-h-[600px] space-y-2 p-2 rounded-lg border-2 border-dashed transition-colors",
                          dropTarget === column.id ? "border-primary bg-primary/5" : "border-transparent",
                        )}
                        onDragOver={(e) => handleDragOver(e, column.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, column.id)}
                      >
                        {columnInvoices.map((invoice) => {
                          const StatusIcon = statusConfig[invoice.status]?.icon
                          const paidPercentage = (invoice.paid / invoice.amount) * 100

                          return (
                            <AnimatedCard
                              key={invoice.id}
                              delay={0}
                              className={cn(
                                "cursor-move hover:shadow-lg transition-shadow",
                                draggedInvoice === invoice.id && "opacity-50",
                              )}
                              draggable
                              onDragStart={() => handleDragStart(invoice.id)}
                            >
                              <CardContent className="p-3 space-y-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="font-bold text-xs text-muted-foreground">{invoice.invoiceNumber}</p>
                                      {invoice.recurringInvoice && (
                                        <Badge variant="outline" className="text-[10px] h-4 px-1">
                                          <Repeat className="h-2 w-2 mr-0.5" />
                                          Recurring
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="font-semibold text-sm">{invoice.client}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{invoice.project}</p>
                                  </div>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedInvoice(invoice)
                                        }}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                      <DialogHeader>
                                        <DialogTitle>Invoice Details - {selectedInvoice?.invoiceNumber}</DialogTitle>
                                      </DialogHeader>
                                      {selectedInvoice && (
                                        <div className="space-y-6 py-4">
                                          <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                              <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Client</p>
                                                <div className="flex items-center gap-2">
                                                  <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                      src={selectedInvoice.clientLogo || "/placeholder.svg"}
                                                    />
                                                    <AvatarFallback>
                                                      {selectedInvoice.client.substring(0, 2)}
                                                    </AvatarFallback>
                                                  </Avatar>
                                                  <div>
                                                    <p className="font-medium">{selectedInvoice.client}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                      {selectedInvoice.clientEmail}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                                  Project
                                                </p>
                                                <p className="font-medium">{selectedInvoice.project}</p>
                                                <p className="text-xs text-muted-foreground">
                                                  {selectedInvoice.projectId}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                                  Payment Terms
                                                </p>
                                                <p className="font-medium">{selectedInvoice.paymentTerms}</p>
                                              </div>
                                            </div>
                                            <div className="space-y-4">
                                              <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                  <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Issue Date
                                                  </p>
                                                  <p className="font-medium">{formatDate(selectedInvoice.issueDate)}</p>
                                                </div>
                                                <div>
                                                  <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Due Date
                                                  </p>
                                                  <p className="font-medium">{formatDate(selectedInvoice.dueDate)}</p>
                                                </div>
                                              </div>
                                              {selectedInvoice.paidDate && (
                                                <div>
                                                  <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Paid Date
                                                  </p>
                                                  <p className="font-medium text-emerald-500">
                                                    {formatDate(selectedInvoice.paidDate)}
                                                  </p>
                                                </div>
                                              )}
                                              <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                                  Payment Method
                                                </p>
                                                <Badge>{selectedInvoice.paymentMethod}</Badge>
                                              </div>
                                              <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                                                <Badge className={statusConfig[selectedInvoice.status]?.color}>
                                                  {statusConfig[selectedInvoice.status]?.label}
                                                </Badge>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="border-t pt-4">
                                            <p className="font-medium mb-3">Line Items</p>
                                            <div className="space-y-2">
                                              {selectedInvoice.items.map((item) => (
                                                <div
                                                  key={item.id}
                                                  className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
                                                >
                                                  <div className="flex-1">
                                                    <p className="font-medium text-sm">{item.description}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                      {item.quantity} × {formatCurrency(item.rate)}
                                                      {item.taxable && (
                                                        <span className="ml-2 text-blue-500">(Taxable)</span>
                                                      )}
                                                    </p>
                                                  </div>
                                                  <p className="font-bold">{formatCurrency(item.amount)}</p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div className="border-t pt-4">
                                            <div className="space-y-2 max-w-xs ml-auto">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span className="font-medium">
                                                  {formatCurrency(
                                                    selectedInvoice.amount -
                                                      selectedInvoice.tax +
                                                      selectedInvoice.discount,
                                                  )}
                                                </span>
                                              </div>
                                              {selectedInvoice.discount > 0 && (
                                                <div className="flex items-center justify-between text-sm">
                                                  <span className="text-muted-foreground">Discount</span>
                                                  <span className="font-medium text-emerald-500">
                                                    -{formatCurrency(selectedInvoice.discount)}
                                                  </span>
                                                </div>
                                              )}
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span className="font-medium">
                                                  {formatCurrency(selectedInvoice.tax)}
                                                </span>
                                              </div>
                                              <div className="flex items-center justify-between text-base font-bold pt-2 border-t">
                                                <span>Total</span>
                                                <span className="text-primary">
                                                  {formatCurrency(selectedInvoice.amount)}
                                                </span>
                                              </div>
                                              {selectedInvoice.paid > 0 && (
                                                <div className="flex items-center justify-between text-sm pt-2 border-t">
                                                  <span className="text-emerald-500 font-medium">Amount Paid</span>
                                                  <span className="font-bold text-emerald-500">
                                                    {formatCurrency(selectedInvoice.paid)}
                                                  </span>
                                                </div>
                                              )}
                                              {selectedInvoice.paid < selectedInvoice.amount && (
                                                <div className="flex items-center justify-between text-sm">
                                                  <span className="text-red-500 font-medium">Amount Due</span>
                                                  <span className="font-bold text-red-500">
                                                    {formatCurrency(selectedInvoice.amount - selectedInvoice.paid)}
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>

                                          {(selectedInvoice.notes || selectedInvoice.internalNotes) && (
                                            <div className="border-t pt-4 space-y-3">
                                              {selectedInvoice.notes && (
                                                <div>
                                                  <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Invoice Notes
                                                  </p>
                                                  <p className="text-sm bg-muted/50 p-3 rounded-lg">
                                                    {selectedInvoice.notes}
                                                  </p>
                                                </div>
                                              )}
                                              {selectedInvoice.internalNotes && (
                                                <div>
                                                  <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Internal Notes (Private)
                                                  </p>
                                                  <p className="text-sm bg-amber-500/10 p-3 rounded-lg text-amber-600 dark:text-amber-400">
                                                    {selectedInvoice.internalNotes}
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          )}

                                          {selectedInvoice.attachments && selectedInvoice.attachments.length > 0 && (
                                            <div className="border-t pt-4">
                                              <p className="text-sm font-medium text-muted-foreground mb-2">
                                                Attachments
                                              </p>
                                              <div className="flex flex-wrap gap-2">
                                                {selectedInvoice.attachments.map((file, idx) => (
                                                  <Badge
                                                    key={idx}
                                                    variant="outline"
                                                    className="cursor-pointer hover:bg-muted"
                                                  >
                                                    <FileText className="h-3 w-3 mr-1" />
                                                    {file}
                                                  </Badge>
                                                ))}
                                              </div>
                                            </div>
                                          )}

                                          <div className="flex gap-2 pt-4 border-t">
                                            <Button variant="outline" className="flex-1 bg-transparent">
                                              <Mail className="mr-2 h-4 w-4" />
                                              Send Reminder
                                            </Button>
                                            <Button variant="outline" className="flex-1 bg-transparent">
                                              <Printer className="mr-2 h-4 w-4" />
                                              Print
                                            </Button>
                                            <Button variant="outline" className="flex-1 bg-transparent">
                                              <Download className="mr-2 h-4 w-4" />
                                              Download PDF
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </DialogContent>
                                  </Dialog>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-bold">{formatCurrency(invoice.amount)}</span>
                                  </div>
                                  {invoice.paid > 0 && (
                                    <>
                                      <Progress value={paidPercentage} className="h-1" />
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-emerald-500">Paid: {formatCurrency(invoice.paid)}</span>
                                        <span className="text-muted-foreground">{paidPercentage.toFixed(0)}%</span>
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="flex items-center justify-between text-xs pt-2 border-t">
                                  <span className="text-muted-foreground">Due: {formatDate(invoice.dueDate)}</span>
                                  <Badge variant="secondary" className="text-[10px] h-4">
                                    {invoice.category}
                                  </Badge>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <Badge variant="outline" className="text-[10px]">
                                    {invoice.paymentMethod}
                                  </Badge>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-3 w-3" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="mr-2 h-3 w-3" />
                                        Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Mail className="mr-2 h-3 w-3" />
                                        Send
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-3 w-3" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-500">
                                        <Trash2 className="mr-2 h-3 w-3" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </CardContent>
                            </AnimatedCard>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInvoices.map((invoice, idx) => {
                  const StatusIcon = statusConfig[invoice.status]?.icon
                  const paidPercentage = (invoice.paid / invoice.amount) * 100

                  return (
                    <AnimatedCard key={invoice.id} delay={idx * 0.05}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-bold text-sm text-muted-foreground mb-1">{invoice.invoiceNumber}</p>
                            <p className="font-semibold text-lg">{invoice.client}</p>
                            <p className="text-sm text-muted-foreground">{invoice.project}</p>
                          </div>
                          <Badge className={statusConfig[invoice.status]?.color}>
                            {statusConfig[invoice.status]?.label}
                          </Badge>
                        </div>

                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Total Amount</span>
                            <span className="font-bold text-lg">{formatCurrency(invoice.amount)}</span>
                          </div>
                          {invoice.paid > 0 && (
                            <>
                              <Progress value={paidPercentage} className="h-2" />
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-emerald-500 font-medium">
                                  Paid: {formatCurrency(invoice.paid)}
                                </span>
                                <span className="text-muted-foreground">{paidPercentage.toFixed(0)}%</span>
                              </div>
                            </>
                          )}
                          {invoice.paid < invoice.amount && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-red-500 font-medium">
                                Due: {formatCurrency(invoice.amount - invoice.paid)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t text-xs">
                          <div>
                            <p className="text-muted-foreground">Issue Date</p>
                            <p className="font-medium">{formatDate(invoice.issueDate)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Due Date</p>
                            <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {invoice.paymentMethod}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {invoice.category}
                            </Badge>
                            {invoice.recurringInvoice && (
                              <Badge variant="outline" className="text-xs">
                                <Repeat className="h-2 w-2 mr-1" />
                                Recurring
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                                onClick={() => setSelectedInvoice(invoice)}
                              >
                                <Eye className="mr-2 h-3 w-3" />
                                View
                              </Button>
                            </DialogTrigger>
                            {/* Dialog content same as kanban view */}
                          </Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </AnimatedCard>
                  )
                })}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <AnimatedCard delay={0}>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Invoice #</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Client</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Project</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Amount</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Paid</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Due Date</th>
                          <th className="text-left p-3 text-xs font-medium text-muted-foreground">Payment</th>
                          <th className="text-right p-3 text-xs font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice) => {
                          const paidPercentage = (invoice.paid / invoice.amount) * 100
                          const StatusIcon = statusConfig[invoice.status]?.icon

                          return (
                            <tr key={invoice.id} className="border-b hover:bg-muted/30 transition-colors">
                              <td className="p-3">
                                <p className="font-mono text-sm font-medium">{invoice.invoiceNumber}</p>
                                {invoice.recurringInvoice && (
                                  <Badge variant="outline" className="text-[10px] h-4 mt-1">
                                    <Repeat className="h-2 w-2 mr-0.5" />
                                    Recurring
                                  </Badge>
                                )}
                              </td>
                              <td className="p-3">
                                <p className="font-medium">{invoice.client}</p>
                                <p className="text-xs text-muted-foreground">{invoice.clientEmail}</p>
                              </td>
                              <td className="p-3">
                                <p className="text-sm">{invoice.project}</p>
                                <Badge variant="secondary" className="text-[10px] mt-1">
                                  {invoice.category}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <p className="font-bold">{formatCurrency(invoice.amount)}</p>
                                {invoice.tax > 0 && (
                                  <p className="text-xs text-muted-foreground">+{formatCurrency(invoice.tax)} tax</p>
                                )}
                              </td>
                              <td className="p-3">
                                <p className="font-medium text-emerald-500">{formatCurrency(invoice.paid)}</p>
                                <Progress value={paidPercentage} className="h-1 mt-1 w-20" />
                              </td>
                              <td className="p-3">
                                <Badge className={statusConfig[invoice.status]?.color}>
                                  {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
                                  {statusConfig[invoice.status]?.label}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <p className="text-sm">{formatDate(invoice.dueDate)}</p>
                                {invoice.paidDate && (
                                  <p className="text-xs text-emerald-500">Paid: {formatDate(invoice.paidDate)}</p>
                                )}
                              </td>
                              <td className="p-3">
                                <Badge variant="outline" className="text-xs">
                                  {invoice.paymentMethod}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center justify-end gap-1">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => setSelectedInvoice(invoice)}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    {/* Dialog content same as kanban view */}
                                  </Dialog>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <MoreHorizontal className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-3 w-3" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="mr-2 h-3 w-3" />
                                        Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Mail className="mr-2 h-3 w-3" />
                                        Send
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-3 w-3" />
                                        Download PDF
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-500">
                                        <Trash2 className="mr-2 h-3 w-3" />
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
                  </div>
                </CardContent>
              </AnimatedCard>
            )}
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Income Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor all revenue streams and payment receipts</p>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Record Income
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <AnimatedCard delay={0}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <CircleDollarSign className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Income</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(
                          income.filter((i) => i.status === "received").reduce((sum, i) => sum + i.amount, 0),
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Repeat className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Recurring</p>
                      <p className="text-xl font-bold">{formatCurrency(recurringRevenue)}</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Banknote className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">One-Time</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(
                          income
                            .filter((i) => !i.recurring && i.status === "received")
                            .reduce((sum, i) => sum + i.amount, 0),
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(
                          income.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0),
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.1}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Description</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Client</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Category</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Tax</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Payment Method</th>
                        <th className="text-right p-3 text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIncome.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <p className="text-sm font-medium">{formatDate(item.date)}</p>
                          </td>
                          <td className="p-3">
                            <p className="font-medium text-sm">{item.description}</p>
                            <p className="text-xs text-muted-foreground">{item.project}</p>
                            {item.recurring && (
                              <Badge variant="outline" className="text-[10px] h-4 mt-1">
                                <Repeat className="h-2 w-2 mr-0.5" />
                                Recurring
                              </Badge>
                            )}
                          </td>
                          <td className="p-3">
                            <p className="text-sm">{item.client}</p>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-emerald-500">{formatCurrency(item.amount)}</p>
                          </td>
                          <td className="p-3">
                            <p className="text-sm text-muted-foreground">{formatCurrency(item.taxAmount)}</p>
                          </td>
                          <td className="p-3">
                            {item.status === "received" ? (
                              <Badge className="bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Received
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-500/10 text-amber-500">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {item.paymentMethod}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-3 w-3" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-3 w-3" />
                                    View Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500">
                                    <Trash2 className="mr-2 h-3 w-3" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Expense Management</h3>
                <p className="text-sm text-muted-foreground">
                  Track and approve business expenses with detailed categorization
                </p>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <AnimatedCard delay={0}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Expenses</p>
                      <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold">{formatCurrency(pendingExpenses)}</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Repeat className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Recurring</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(expenses.filter((e) => e.recurring).reduce((sum, e) => sum + e.amount, 0))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Awaiting Approval</p>
                      <p className="text-xl font-bold">
                        {expenses.filter((e) => e.approvalStatus === "pending").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.1}>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Description</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Vendor</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Category</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Department</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Approval</th>
                        <th className="text-right p-3 text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense) => (
                        <tr key={expense.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <p className="text-sm font-medium">{formatDate(expense.date)}</p>
                          </td>
                          <td className="p-3">
                            <p className="font-medium text-sm">{expense.description}</p>
                            {expense.project && <p className="text-xs text-blue-500">{expense.project}</p>}
                            {expense.recurring && (
                              <Badge variant="outline" className="text-[10px] h-4 mt-1">
                                <Repeat className="h-2 w-2 mr-0.5" />
                                {expense.recurringFrequency}
                              </Badge>
                            )}
                          </td>
                          <td className="p-3">
                            <p className="text-sm">{expense.vendor}</p>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary" className="text-xs">
                              {expense.category}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <p className="text-sm text-muted-foreground">{expense.department}</p>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-red-500">{formatCurrency(expense.amount)}</p>
                            {expense.taxDeductible && (
                              <p className="text-[10px] text-emerald-500 flex items-center gap-1 mt-0.5">
                                <CheckCircle2 className="h-2 w-2" />
                                Tax Deductible
                              </p>
                            )}
                          </td>
                          <td className="p-3">
                            {expense.status === "paid" ? (
                              <Badge className="bg-emerald-500/10 text-emerald-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Paid
                              </Badge>
                            ) : expense.status === "pending" ? (
                              <Badge className="bg-amber-500/10 text-amber-500">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            ) : (
                              <Badge className="bg-blue-500/10 text-blue-500">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Pending Approval
                              </Badge>
                            )}
                          </td>
                          <td className="p-3">
                            {expense.approvalStatus === "approved" ? (
                              <div className="flex flex-col">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-emerald-500/10 text-emerald-500 w-fit"
                                >
                                  Approved
                                </Badge>
                                <p className="text-[10px] text-muted-foreground mt-0.5">by {expense.approvedBy}</p>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-500">
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setSelectedExpense(expense)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Expense Details</DialogTitle>
                                  </DialogHeader>
                                  {selectedExpense && (
                                    <div className="space-y-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                                          <p className="font-medium">{selectedExpense.description}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Amount</p>
                                          <p className="font-bold text-2xl text-red-500">
                                            {formatCurrency(selectedExpense.amount)}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Vendor</p>
                                          <p className="font-medium">{selectedExpense.vendor}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Category</p>
                                          <Badge>{selectedExpense.category}</Badge>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                                          <p className="font-medium">{formatDate(selectedExpense.date)}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Payment Method
                                          </p>
                                          <Badge variant="outline">{selectedExpense.paymentMethod}</Badge>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Department</p>
                                          <p className="font-medium">{selectedExpense.department}</p>
                                        </div>
                                        {selectedExpense.project && (
                                          <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Project</p>
                                            <Badge variant="secondary">{selectedExpense.project}</Badge>
                                          </div>
                                        )}
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Payment Status
                                          </p>
                                          <Badge
                                            className={
                                              selectedExpense.status === "paid"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-amber-500/10 text-amber-500"
                                            }
                                          >
                                            {selectedExpense.status === "paid" ? "Paid" : "Pending Payment"}
                                          </Badge>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Approval Status
                                          </p>
                                          <Badge
                                            variant="outline"
                                            className={
                                              selectedExpense.approvalStatus === "approved"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-amber-500/10 text-amber-500"
                                            }
                                          >
                                            {selectedExpense.approvalStatus === "approved"
                                              ? "Approved"
                                              : "Pending Approval"}
                                          </Badge>
                                        </div>
                                      </div>

                                      {selectedExpense.approvedBy && (
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Approved By</p>
                                          <p className="font-medium">{selectedExpense.approvedBy}</p>
                                        </div>
                                      )}

                                      {selectedExpense.notes && (
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                                          <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedExpense.notes}</p>
                                        </div>
                                      )}

                                      <div className="flex items-center gap-2">
                                        <Checkbox checked={selectedExpense.recurring} disabled />
                                        <Label className="text-sm">
                                          Recurring expense{" "}
                                          {selectedExpense.recurringFrequency &&
                                            `(${selectedExpense.recurringFrequency})`}
                                        </Label>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <Checkbox checked={selectedExpense.taxDeductible} disabled />
                                        <Label className="text-sm">Tax deductible</Label>
                                      </div>

                                      {selectedExpense.receiptUrl && (
                                        <div className="pt-4 border-t">
                                          <Button variant="outline" className="w-full bg-transparent">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Receipt ({selectedExpense.receiptUrl})
                                          </Button>
                                        </div>
                                      )}

                                      {selectedExpense.approvalStatus === "pending" && (
                                        <div className="flex gap-2 pt-4 border-t">
                                          <Button
                                            variant="outline"
                                            className="flex-1 text-red-500 hover:text-red-600 bg-transparent"
                                          >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                          </Button>
                                          <Button className="flex-1">
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Approve
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-3 w-3" />
                                    Edit
                                  </DropdownMenuItem>
                                  {expense.approvalStatus === "pending" && (
                                    <>
                                      <DropdownMenuItem>
                                        <CheckCircle2 className="mr-2 h-3 w-3" />
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-500">
                                        <XCircle className="mr-2 h-3 w-3" />
                                        Reject
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {expense.receiptUrl && (
                                    <DropdownMenuItem>
                                      <FileText className="mr-2 h-3 w-3" />
                                      View Receipt
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500">
                                    <Trash2 className="mr-2 h-3 w-3" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Financial Reports & Analytics</h3>
              <p className="text-sm text-muted-foreground">Comprehensive financial analysis and reporting tools</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard delay={0}>
                <CardHeader>
                  <CardTitle>Revenue Breakdown by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.1}>
                <CardHeader>
                  <CardTitle>Payment Methods Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie data={paymentMethodData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {paymentMethodData.map((method) => (
                      <div key={method.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: method.color }} />
                        <span className="text-sm text-muted-foreground">{method.name}</span>
                        <span className="text-sm font-medium ml-auto">{formatCurrency(method.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedCard delay={0.2}>
                <CardHeader>
                  <CardTitle>Key Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Avg Invoice Value</span>
                    </div>
                    <span className="font-bold">{formatCurrency(avgInvoiceValue)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Profit Margin</span>
                    </div>
                    <span className="font-bold text-purple-500">{profitMargin}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm">Total Invoiced</span>
                    </div>
                    <span className="font-bold">{formatCurrency(totalInvoiced)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Collection Rate</span>
                    </div>
                    <span className="font-bold">{((totalRevenue / totalInvoiced) * 100).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3} className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Budget Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budgetData.map((budget) => {
                    const percentage = (budget.spent / budget.budget) * 100
                    const isOverBudget = percentage > 100
                    const isNearLimit = percentage > 80 && percentage <= 100

                    return (
                      <div key={budget.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{budget.category}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(budget.spent)} of {formatCurrency(budget.budget)}
                            </p>
                          </div>
                          <Badge
                            variant={isOverBudget ? "destructive" : isNearLimit ? "outline" : "secondary"}
                            className="text-xs"
                          >
                            {percentage.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={cn("h-2", isOverBudget && "bg-red-500/20")}
                        />
                      </div>
                    )
                  })}
                </CardContent>
              </AnimatedCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
