"use client"
import CardDetails from "@/components/card-details"
import FinancialChart from "@/components/expense-request"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestión de Gastos</h1>
          <ThemeToggle />
        </div>
        <CardDetails />
        <FinancialChart />
      </div>
    </main>
  )
}