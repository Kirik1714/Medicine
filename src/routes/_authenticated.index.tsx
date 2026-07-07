/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";
import { ChevronDown, Star, Pause, AlertTriangle } from "lucide-react";
import { useDashboard } from "../features/medications/hooks/useDashboard";
import { ErrorState } from "../shared/components/ErrorState";
import { DashboardSkeleton } from "../features/medications/components/MedicationSkeleton";

export const Route = createFileRoute("/_authenticated/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const {
    medications,
    isLoading,
    error,
    selectedPeriod,
    setSelectedPeriod,
    isDropdownOpen,
    setIsDropdownOpen,
    stats,
  } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !medications || !stats) {
    return (
      <ErrorState
        title="Dashboard Analytics Error"
        message="Failed to process real-time indicators from clinical operations cache."
      />
    );
  }

  return (
    <div className="w-full space-y-6 text-sm bg-slate-50/40 p-4 rounded-2xl transition-colors duration-200 overflow-hidden">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Testing Dashboard
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Uncover insights into your testing processes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">

        <div className="lg:col-span-7 flex flex-col space-y-6 w-full">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-4 rounded-xl flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-500 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-xs leading-tight">
                  {stats.awaitingMedName}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  Awaiting results
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-4 rounded-xl flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shrink-0">
                <Pause className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-xs leading-tight">
                  {stats.activeVaccinesCount} active vaccines
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  On hold
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-4 rounded-xl flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-xs leading-tight">
                  {stats.failedCount} products
                </h3>
                <p className="text-[10px] text-rose-500 dark:text-rose-400 font-medium">
                  Out of stock
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl p-6 shadow-2xs flex flex-col justify-between flex-1 min-h-[440px]">
            <div className="flex justify-between items-start relative shrink-0">
              <div>
                <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                  Total tests
                </h2>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Testing results received in all areas
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
                >
                  {selectedPeriod}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 py-1 text-xs text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => {
                        setSelectedPeriod("June 1 - 30, 2026");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      June 1 - 30, 2026
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex-1 text-[10px] font-medium mt-4 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stats.totalTestsData}
                  margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="0"
                    stroke="#f1f5f9"
                    horizontal={false}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94a3b8" }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={false} />
                  <Tooltip />
                  <Area
                    type="linear"
                    dataKey="completed"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#colorLine1)"
                    fillOpacity={0.03}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#38bdf8"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="colorLine1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full flex-1">
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl p-4 shadow-2xs flex flex-col justify-between h-full min-h-[210px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white">
                      Total tested drugs
                    </h3>
                    <span className="text-[9px] font-bold bg-orange-50 dark:bg-orange-950/40 text-orange-500 px-1.5 py-0.5 rounded-full">
                      {stats.totalDrugsChange.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Last 7 days
                  </p>
                </div>
                <span className="text-base font-bold text-slate-800 dark:text-white leading-tight">
                  {stats.totalTestedDrugsCount.toLocaleString()}
                </span>
              </div>

              <div className="w-full h-16 flex items-center justify-center my-1">
                <ResponsiveContainer width="60%" height="100%">
                  <BarChart data={stats.barChartData} barSize={3} barGap={0}>
                    <Bar dataKey="completed" stackId="a" fill="#3b82f6" />
                    <Bar
                      dataKey="awaiting"
                      stackId="a"
                      fill="#e0e8ff"
                      radius={[1.5, 1.5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1 text-[11px] font-medium pt-1.5 border-t border-slate-50 dark:border-slate-700/40">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="w-2.5 h-1.5 rounded-xs bg-[#3b82f6]" />{" "}
                    Completed
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">
                    {stats.completedPercent}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="w-2.5 h-1.5 rounded-xs bg-[#e0e8ff]" />{" "}
                    Awaiting results
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">
                    {stats.awaitingPercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl p-4 shadow-2xs flex flex-col justify-between h-full min-h-[210px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white">
                      Drug approval rates
                    </h3>
                    <span className="text-[9px] font-bold bg-orange-50 dark:bg-orange-950/40 text-orange-500 px-1.5 py-0.5 rounded-full">
                      +{stats.approvalRateChange.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Last 7 days
                  </p>
                </div>
                <span className="text-base font-bold text-slate-800 dark:text-white leading-tight">
                  {stats.approvedDrugsCount.toLocaleString()}
                </span>
              </div>

              <div className="w-full h-24 text-[10px] font-medium mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.approvalRatesData}
                    margin={{ top: 5, right: 0, left: 0, bottom: 15 }}
                  >
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={{ stroke: "#f1f5f9" }}
                      tick={(props) => {
                        const { x, y, payload } = props;
                        const anchor = payload.index === 0 ? "start" : "end";
                        return (
                          <text
                            x={x}
                            y={Number(y) || 0}
                            fill="#94a3b8"
                            textAnchor={anchor}
                            className="text-[10px]"
                          >
                            {payload.value}
                          </text>
                        );
                      }}
                      interval={0}
                    />
                    <Line
                      type="linear"
                      dataKey="blueVal"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="linear"
                      dataKey="grayVal"
                      stroke="#e2e8f0"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full flex-1">
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl p-4 shadow-2xs flex flex-col justify-between h-full min-h-[210px]">
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white">
                  Testing process
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  Last 7 days
                </p>
              </div>
              <div className="w-full h-20 relative flex items-center justify-center my-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.testingProcessData}
                      cx="50%"
                      cy="50%"
                      innerRadius={24}
                      outerRadius={32}
                      paddingAngle={3}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {stats.successRate}%
                  </span>
                </div>
              </div>
              <div className="space-y-0.5 text-[10px] font-medium pt-1 border-t border-slate-50 dark:border-slate-700/40">
                {stats.testingProcessData.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      {item.name}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl p-4 shadow-2xs flex flex-col justify-between h-full min-h-[210px]">
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white">
                  Success rate
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">
                  Global efficiency metrics
                </p>
              </div>

              <div className="w-full h-20 relative flex items-center justify-center overflow-hidden my-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 5, bottom: 0 }}>
                    <Pie
                      data={stats.peopleTestedData}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={40}
                      outerRadius={50}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-1 text-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {stats.successRate}%
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-[11px] font-medium pt-1.5 border-t border-slate-50 dark:border-slate-700/40">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-2.5 h-1.5 rounded-xs bg-[#2563eb]" />{" "}
                    Passed formulas
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">
                    {stats.successRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-2.5 h-1.5 rounded-xs bg-[#eff6ff]" />{" "}
                    Retesting required
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">
                    {100 - stats.successRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
