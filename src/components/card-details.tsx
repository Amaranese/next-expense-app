import type React from "react"
import { useState, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TransactionForm } from "./transaction-form"
import { TransactionsList } from "@/components/transactions-list"
import { getTotals } from "@/actions/get-totals"

// Define transaction type
export type Transaction = {
  id: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  date: string
}

export default function CardDetails() {
  // Estado para los totales
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    spendPercentage: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCounter, setRefreshCounter] = useState(0)

  // Cargar los totales al montar el componente
  useEffect(() => {
    async function fetchTotals() {
      try {
        setIsLoading(true)
        const result = await getTotals()
        
        if (result.success && result.data) {
          setTotals(result.data)
        }
      } catch (err) {
        console.error("Error al cargar los totales:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTotals()
  }, [])

  // Handle new transaction
  const handleNewTransaction = async () => {
    // Después de agregar una nueva transacción, actualizar los totales
    const result = await getTotals()
    if (result.success && result.data) {
      setTotals(result.data)
    }
    // Incrementar el contador para refrescar la lista de transacciones
    setRefreshCounter(prev => prev + 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="p-5 text-center">Cargando datos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px]">
          {/* Left side - Form and transactions */}
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-lg">Registro de ingresos y gastos</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Actions</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Transaction form */}
            <TransactionForm onSubmit={handleNewTransaction} />

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Balance total</span>
                <span className={`font-medium ${totals.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${totals.balance.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Resumen</span>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Ingresos:</span>
                    <span className="font-medium text-green-600">${totals.totalIncome.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Gastos:</span>
                    <span className="font-medium text-red-600">${totals.totalExpenses.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Progress value={totals.spendPercentage} className="h-2" />
            </div>

            {/* Transactions list */}
            <div className="mt-6">
              <h3 className="font-medium mb-3">Transacciones recientes</h3>
              <TransactionsList refreshTrigger={refreshCounter} />
            </div>
          </div>

          {/* Right side - Card preview */}
          <div className="bg-blue-100 p-5 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Balance</h3>
              <Badge
                className={`${totals.balance >= 0 ? "bg-green-600" : "bg-red-600"} text-white hover:${totals.balance >= 0 ? "bg-green-700" : "bg-red-700"}`}
              >
                ${totals.balance.toFixed(2)}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="bg-white/80 rounded-md p-3">
                <h4 className="text-sm font-medium mb-1">Ingresos totales</h4>
                <p className="text-green-600 font-bold">${totals.totalIncome.toFixed(2)}</p>
              </div>

              <div className="bg-white/80 rounded-md p-3">
                <h4 className="text-sm font-medium mb-1">Gastos totales</h4>
                <p className="text-red-600 font-bold">${totals.totalExpenses.toFixed(2)}</p>
              </div>

              <div className="text-xs text-center mt-4">
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
