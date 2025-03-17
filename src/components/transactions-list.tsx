import { PlusCircle, MinusCircle } from "lucide-react"
import type { Transaction } from "./card-details"
import { getTransactions } from "@/actions/get-transactions"
import { useEffect, useState } from "react"

interface TransactionsListProps {
  refreshTrigger?: number;
}

export function TransactionsList({ refreshTrigger = 0 }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true)
        const result = await getTransactions()
        
        if (result.success && result.data) {
          setTransactions(result.data)
        } else {
          setError(result.error || "Error al cargar las transacciones")
        }
      } catch (err) {
        setError("Error al cargar las transacciones")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [refreshTrigger])

  if (loading) {
    return <div className="py-4 text-center">Cargando transacciones...</div>
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>
  }

  if (transactions.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No hay transacciones registradas</div>
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            {transaction.type === "income" ? (
              <PlusCircle className="h-5 w-5 text-green-500" />
            ) : (
              <MinusCircle className="h-5 w-5 text-red-500" />
            )}
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">
                {transaction.category} • {transaction.date}
              </p>
            </div>
          </div>
          <span className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
            {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
} 