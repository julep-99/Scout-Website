import React, { useState } from "react";
import {
  Mail,
  BarChart3,
  Settings,
  Home,
  Check,
  X,
  Calendar,
  Users,
  Send,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface Email {
  id: number;
  title: string;
  recipient: string;
  date?: string;
  scheduled?: string;
  count: number;
}

interface ChangeRequest {
  id: number;
  requester: string;
  change: string;
  from?: string;
  to?: string;
  date: string;
}

interface Insight {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
}

export default function CouncilDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [timeFilter, setTimeFilter] = useState("2-weeks");

  const sentEmails: Email[] = [
    {
      id: 1,
      title: "September Pack Meeting Prep",
      recipient: "Den Leaders",
      date: "2026-01-15",
      count: 47,
    },
    {
      id: 2,
      title: "Advancement Deadline Reminder",
      recipient: "Cubmasters",
      date: "2026-01-12",
      count: 12,
    },
    {
      id: 3,
      title: "Popcorn Sales Kickoff",
      recipient: "Committee Chairs",
      date: "2026-01-08",
      count: 15,
    },
    {
      id: 4,
      title: "New Family Welcome",
      recipient: "All Leaders",
      date: "2026-01-06",
      count: 74,
    },
  ];

  const upcomingEmails: Email[] = [
    {
      id: 1,
      title: "Blue & Gold Banquet Planning",
      recipient: "Cubmasters",
      scheduled: "2026-01-22",
      count: 12,
    },
    {
      id: 2,
      title: "Tiger Den Activity Ideas",
      recipient: "Tiger Den Leaders",
      scheduled: "2026-01-25",
      count: 8,
    },
    {
      id: 3,
      title: "Recharter Reminder",
      recipient: "Committee Chairs",
      scheduled: "2026-01-28",
      count: 15,
    },
  ];

  const changeRequests: ChangeRequest[] = [
    {
      id: 1,
      requester: "Pack 245",
      change: "Update Cubmaster email",
      from: "john@email.com",
      to: "sarah@email.com",
      date: "2026-01-17",
    },
    {
      id: 2,
      requester: "Pack 112",
      change: "Add new Den Leader",
      to: "mike@email.com",
      date: "2026-01-16",
    },
    {
      id: 3,
      requester: "Pack 387",
      change: "Remove Committee Chair",
      from: "lisa@email.com",
      date: "2026-01-15",
    },
  ];

  const insights: Insight[] = [
    {
      label: "Avg. Open Rate",
      value: "67%",
      trend: "+5%",
      icon: Mail,
    },
    { label: "Active Recipients", value: "428", trend: "+12", icon: Users },
    { label: "Emails This Month", value: "18", trend: "+3", icon: Send },
    {
      label: "Engagement Score",
      value: "8.4/10",
      trend: "+0.3",
      icon: TrendingUp,
    },
  ];

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "emails", label: "Emails", icon: Mail },
    { id: "insights", label: "Insights", icon: BarChart3 },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">Council Hub</h1>
          <p className="text-blue-100 text-sm mt-1">Email Management</p>
        </div>

        <nav className="p-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-white text-blue-900 font-semibold shadow-md"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={() => setActivePage("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activePage === "settings"
                ? "bg-white text-blue-900 font-semibold shadow-md"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <Settings size={20} />
            <span>Account Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activePage === "home" && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Dashboard Overview
              </h2>
              <p className="text-slate-600 mt-1">
                Manage your council communications and track engagement
              </p>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {insights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">
                          {insight.label}
                        </p>
                        <p className="text-3xl font-bold text-slate-900 mt-2">
                          {insight.value}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp size={16} className="mr-1" />
                      {insight.trend}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Emails Sent */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Recent Emails Sent
                    </h3>
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1-week">Past Week</option>
                      <option value="2-weeks">Past 2 Weeks</option>
                      <option value="1-month">Past Month</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-slate-200">
                  {sentEmails.map((email) => (
                    <div
                      key={email.id}
                      className="p-6 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">
                            {email.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            To: {email.recipient} ({email.count} recipients)
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm whitespace-nowrap ml-4">
                          <Calendar size={16} />
                          {email.date && formatDate(email.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Scheduled Emails */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Upcoming Scheduled Emails
                  </h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {upcomingEmails.map((email) => (
                    <div
                      key={email.id}
                      className="p-6 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">
                            {email.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            To: {email.recipient} ({email.count} recipients)
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm whitespace-nowrap ml-4">
                          <Calendar size={16} />
                          {email.scheduled && formatDate(email.scheduled)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Change Requests */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  Pending Change Requests
                </h3>
              </div>
              <div className="divide-y divide-slate-200">
                {changeRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-6 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded">
                            {request.requester}
                          </span>
                          <h4 className="font-semibold text-slate-900">
                            {request.change}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          {request.from && `From: ${request.from}`}
                          {request.from && request.to && " → "}
                          {request.to && `To: ${request.to}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-slate-500 text-sm whitespace-nowrap">
                          {formatDate(request.date)}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-green-100 rounded-lg transition text-green-600">
                            <Check size={18} />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition text-red-600">
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePage === "emails" && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Email Management
            </h2>
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600">
                Email management interface coming soon
              </p>
            </div>
          </div>
        )}

        {activePage === "insights" && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Insights & Analytics
            </h2>
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <BarChart3 size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600">Detailed insights coming soon</p>
            </div>
          </div>
        )}

        {activePage === "settings" && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Account Settings
            </h2>
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <Settings size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600">Settings interface coming soon</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
