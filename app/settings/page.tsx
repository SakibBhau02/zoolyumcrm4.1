"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Users,
  Mail,
  Key,
  Smartphone,
  LogOut,
  Trash2,
  Upload,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationSetting {
  id: string
  title: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
}

const initialNotifications: NotificationSetting[] = [
  {
    id: "1",
    title: "New Lead Assigned",
    description: "Get notified when a new lead is assigned to you",
    email: true,
    push: true,
    sms: false,
  },
  {
    id: "2",
    title: "Task Reminders",
    description: "Receive reminders for upcoming task deadlines",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "3",
    title: "Project Updates",
    description: "Get updates when project status changes",
    email: true,
    push: false,
    sms: false,
  },
  {
    id: "4",
    title: "Client Messages",
    description: "Notifications for new client communications",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "5",
    title: "Team Mentions",
    description: "Get notified when someone mentions you",
    email: false,
    push: true,
    sms: false,
  },
  {
    id: "6",
    title: "Weekly Reports",
    description: "Receive weekly summary reports",
    email: true,
    push: false,
    sms: false,
  },
]

const teamMembers = [
  { id: "1", name: "John Doe", email: "john@agencyflow.com", role: "Admin", avatar: "JD" },
  { id: "2", name: "Sarah Mitchell", email: "sarah@agencyflow.com", role: "Manager", avatar: "SM" },
  { id: "3", name: "Emily Chen", email: "emily@agencyflow.com", role: "Member", avatar: "EC" },
  { id: "4", name: "James Wilson", email: "james@agencyflow.com", role: "Member", avatar: "JW" },
]

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState("profile")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  const toggleNotification = (id: string, type: "email" | "push" | "sms") => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              [type]: !n[type],
            }
          : n,
      ),
    )
  }

  const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "company", label: "Company", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "team", label: "Team Access", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and application preferences</p>
          </div>
          <Button onClick={handleSave} disabled={saveStatus === "saving"} className="gap-2">
            {saveStatus === "saving" ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Saving...
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <AnimatedCard delay={100} className="lg:w-64 shrink-0 h-fit" hover={false}>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {settingsSections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animate-in fade-in slide-in-from-left-2",
                      activeTab === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </AnimatedCard>

          {/* Content Area */}
          <div className="flex-1 space-y-6">
            {activeTab === "profile" && (
              <>
                <AnimatedCard delay={200}>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Information</CardTitle>
                    <CardDescription>Update your personal details and profile picture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="bg-primary/20 text-primary text-xl">JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Upload className="w-4 h-4" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" className="bg-secondary border-0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" className="bg-secondary border-0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john@agencyflow.com"
                          className="bg-secondary border-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" className="bg-secondary border-0" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          className="bg-secondary border-0 min-h-[100px]"
                          defaultValue="Lead Developer at AgencyFlow with 5+ years of experience in web development."
                        />
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={300}>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Settings</CardTitle>
                    <CardDescription>Configure your timezone and language preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="pst">
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </>
            )}

            {activeTab === "company" && (
              <AnimatedCard delay={200}>
                <CardHeader>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                  <CardDescription>Manage your agency's details and branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">Recommended: 256x256px</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="AgencyFlow Digital" className="bg-secondary border-0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="website" defaultValue="agencyflow.com" className="bg-secondary border-0 pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="marketing">
                        <SelectTrigger className="bg-secondary border-0">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Digital Marketing</SelectItem>
                          <SelectItem value="design">Design Agency</SelectItem>
                          <SelectItem value="development">Development Agency</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        className="bg-secondary border-0"
                        defaultValue="123 Marketing Street, Suite 500&#10;San Francisco, CA 94105"
                      />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            )}

            {activeTab === "notifications" && (
              <AnimatedCard delay={200}>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Preferences</CardTitle>
                  <CardDescription>Choose how and when you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
                      <div className="col-span-1">Notification</div>
                      <div className="flex items-center justify-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Bell className="w-3.5 h-3.5" />
                        Push
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        SMS
                      </div>
                    </div>

                    {notifications.map((notification, i) => (
                      <div
                        key={notification.id}
                        className="grid grid-cols-4 gap-4 py-3 items-center animate-in fade-in slide-in-from-bottom-2 duration-300"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={notification.email}
                            onCheckedChange={() => toggleNotification(notification.id, "email")}
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={notification.push}
                            onCheckedChange={() => toggleNotification(notification.id, "push")}
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            checked={notification.sms}
                            onCheckedChange={() => toggleNotification(notification.id, "sms")}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            )}

            {activeTab === "security" && (
              <>
                <AnimatedCard delay={200}>
                  <CardHeader>
                    <CardTitle className="text-lg">Password & Authentication</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            type="password"
                            className="bg-secondary border-0 pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div />
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className="bg-secondary border-0"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="bg-secondary border-0"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      Update Password
                    </Button>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={300}>
                  <CardHeader>
                    <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-success/20">
                          <Shield className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Currently enabled via authenticator app</p>
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success border-0">Enabled</Badge>
                    </div>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={400}>
                  <CardHeader>
                    <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <div className="flex items-center gap-4">
                        <LogOut className="w-5 h-5 text-destructive" />
                        <div>
                          <p className="font-medium">Sign Out All Devices</p>
                          <p className="text-sm text-muted-foreground">Sign out from all active sessions</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        Sign Out All
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <div className="flex items-center gap-4">
                        <Trash2 className="w-5 h-5 text-destructive" />
                        <div>
                          <p className="font-medium">Delete Account</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </>
            )}

            {activeTab === "appearance" && (
              <AnimatedCard delay={200}>
                <CardHeader>
                  <CardTitle className="text-lg">Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Light", "Dark", "System"].map((theme, i) => (
                        <button
                          key={theme}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-all text-center animate-in fade-in zoom-in duration-300",
                            theme === "Dark" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
                          )}
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          <div
                            className={cn(
                              "w-full h-16 rounded-lg mb-2",
                              theme === "Light"
                                ? "bg-white border"
                                : theme === "Dark"
                                  ? "bg-zinc-900 border border-zinc-700"
                                  : "bg-gradient-to-r from-white to-zinc-900 border",
                            )}
                          />
                          <span className="text-sm font-medium">{theme}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Accent Color</Label>
                    <div className="flex gap-3">
                      {[
                        { name: "Blue", color: "bg-blue-500" },
                        { name: "Purple", color: "bg-purple-500" },
                        { name: "Green", color: "bg-green-500" },
                        { name: "Orange", color: "bg-orange-500" },
                        { name: "Pink", color: "bg-pink-500" },
                      ].map((accent, i) => (
                        <button
                          key={accent.name}
                          className={cn(
                            "w-10 h-10 rounded-full transition-all animate-in zoom-in duration-200",
                            accent.color,
                            accent.name === "Blue" && "ring-2 ring-offset-2 ring-offset-background ring-primary",
                          )}
                          style={{ animationDelay: `${i * 50}ms` }}
                          title={accent.name}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-sm text-muted-foreground">Reduce spacing in the interface</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Animations</p>
                        <p className="text-sm text-muted-foreground">Enable smooth animations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sidebar Collapsed by Default</p>
                        <p className="text-sm text-muted-foreground">Start with collapsed sidebar</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            )}

            {activeTab === "team" && (
              <AnimatedCard delay={200}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Team Access</CardTitle>
                    <CardDescription>Manage team members and their permissions</CardDescription>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Users className="w-4 h-4" />
                    Invite Member
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member, i) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary/20 text-primary">{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="w-[120px] bg-secondary border-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            )}

            {activeTab === "billing" && (
              <>
                <AnimatedCard delay={200}>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Plan</CardTitle>
                    <CardDescription>Manage your subscription and billing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-primary/20 to-chart-3/20 border border-primary/30">
                      <div>
                        <Badge className="bg-primary text-primary-foreground mb-2">Pro Plan</Badge>
                        <h3 className="text-2xl font-bold">$49/month</h3>
                        <p className="text-sm text-muted-foreground mt-1">Billed monthly • Renews Jan 1, 2025</p>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        Upgrade Plan
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      {[
                        { label: "Team Members", value: "8/10", used: 80 },
                        { label: "Projects", value: "28/50", used: 56 },
                        { label: "Storage", value: "4.2/10 GB", used: 42 },
                        { label: "API Calls", value: "8.5K/20K", used: 42 },
                      ].map((item, i) => (
                        <div
                          key={item.label}
                          className="p-4 rounded-lg bg-secondary/50 animate-in fade-in zoom-in duration-300"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="font-bold mt-1">{item.value}</p>
                          <div className="w-full h-1.5 rounded-full bg-secondary mt-2">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${item.used}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={300}>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-background">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                        </div>
                      </div>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={400}>
                  <CardHeader>
                    <CardTitle className="text-lg">Billing History</CardTitle>
                    <CardDescription>Download past invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { date: "Dec 1, 2024", amount: "$49.00", status: "Paid" },
                        { date: "Nov 1, 2024", amount: "$49.00", status: "Paid" },
                        { date: "Oct 1, 2024", amount: "$49.00", status: "Paid" },
                      ].map((invoice, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-secondary">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{invoice.date}</p>
                              <p className="text-xs text-muted-foreground">{invoice.amount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-success/20 text-success border-0">{invoice.status}</Badge>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
