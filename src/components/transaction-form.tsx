"use client"

import type React from "react"
import { useState } from "react"
import { PlusCircle, MinusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTransaction } from "@/actions/create-expense"
import { toast } from "sonner"

interface TransactionFormProps {
  onSubmit?: () => void
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!amount || !description || !category) {
      toast.error("Por favor completa todos los campos")
      setIsSubmitting(false)
      return
    }

    try {
      // Llamar a la acción del servidor
      const result = await createTransaction({
        type: transactionType,
        amount: Number.parseFloat(amount),
        description,
        category,
        date: new Date().toISOString().split("T")[0],
      })

      if (result.success) {
        toast.success("Transacción guardada correctamente")
        
        // Reset form
        setAmount("")
        setDescription("")
        setCategory("")
        
        // Si hay una función onSubmit proporcionada, llamarla
        if (onSubmit) {
          onSubmit()
        }
      } else {
        toast.error(result.error || "Error al guardar la transacción")
      }
    } catch (error) {
      toast.error("Error al procesar la transacción")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border dark:border-gray-700 rounded-md p-4 text-gray-900 dark:text-gray-100">
      <div className="space-y-2">
        <Label>Tipo de transacción</Label>
        <RadioGroup
          defaultValue="expense"
          className="flex gap-4"
          value={transactionType}
          onValueChange={(value) => setTransactionType(value as "income" | "expense")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="flex items-center gap-1 cursor-pointer">
              <PlusCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
              Ingreso
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="flex items-center gap-1 cursor-pointer">
              <MinusCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
              Gasto
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Monto</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Housing">Vivienda</SelectItem>
              <SelectItem value="Food">Alimentación</SelectItem>
              <SelectItem value="Transport">Transporte</SelectItem>
              <SelectItem value="Entertainment">Entretenimiento</SelectItem>
              <SelectItem value="Work">Trabajo</SelectItem>
              <SelectItem value="Other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          placeholder="Descripción de la transacción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : transactionType === "income" ? "Agregar Ingreso" : "Agregar Gasto"}
      </Button>
    </form>
  )
} 