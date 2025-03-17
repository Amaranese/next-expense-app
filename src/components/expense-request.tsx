"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Transaction = {
  type: "income" | "expense"
  amount: number
  category: string
}

export default function ExpenseRequest() {
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const [chartData, setChartData] = useState<ChartData<"bar", number[], string>>({
    labels: [],
    datasets: [],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#1f2937",
        }
      },
      title: {
        display: true,
        text: "Ingresos y Gastos por Categoría",
        color: isDark ? "#e5e7eb" : "#1f2937",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? "#9ca3af" : "#4b5563",
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        }
      },
      x: {
        ticks: {
          color: isDark ? "#9ca3af" : "#4b5563",
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        }
      }
    },
  }

  useEffect(() => {
    // Simular datos de transacciones
    const transactions: Transaction[] = [
      { type: "income", amount: 3000, category: "Salario" },
      { type: "expense", amount: 1000, category: "Vivienda" },
      { type: "expense", amount: 500, category: "Alimentación" },
      { type: "expense", amount: 300, category: "Transporte" },
      { type: "income", amount: 500, category: "Freelance" },
      { type: "expense", amount: 200, category: "Entretenimiento" },
    ]

    const categories = [...new Set(transactions.map((t) => t.category))]
    const incomeData = categories.map((cat) =>
      transactions.filter((t) => t.type === "income" && t.category === cat).reduce((sum, t) => sum + t.amount, 0),
    )
    const expenseData = categories.map((cat) =>
      transactions.filter((t) => t.type === "expense" && t.category === cat).reduce((sum, t) => sum + t.amount, 0),
    )

    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Ingresos",
          data: incomeData,
          backgroundColor: isDark ? "rgba(75, 192, 192, 0.8)" : "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Gastos",
          data: expenseData,
          backgroundColor: isDark ? "rgba(255, 99, 132, 0.8)" : "rgba(255, 99, 132, 0.6)",
        },
      ],
    })
  }, [isDark])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Resumen Financiero</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={options} data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}

