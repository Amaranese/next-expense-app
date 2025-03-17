"use server";

import { prisma } from "@/lib/prisma";

// Importar el tipo Transaction para asegurar compatibilidad
import type { Transaction } from "@/components/card-details";

export async function getTransactions() {
  try {
    // Obtener todas las transacciones con sus categorías
    const expenses = await prisma.expense.findMany({
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    // Transformar los datos al formato esperado por el componente
    const transactions: Transaction[] = expenses.map((expense) => ({
      id: String(expense.id),
      type: expense.amount >= 0 ? "income" as const : "expense" as const,
      amount: Math.abs(expense.amount),
      description: expense.title,
      category: expense.category?.name || "Sin categoría",
      date: expense.date.toISOString().split('T')[0], // Formato YYYY-MM-DD
    }));

    return { success: true, data: transactions };
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    return { success: false, error: "Error al obtener las transacciones" };
  }
} 