"use server";

import { prisma } from "@/lib/prisma";

export async function getTotals() {
  try {
    // Obtener todas las transacciones
    const expenses = await prisma.expense.findMany();

    // Calcular totales
    const totalIncome = expenses
      .filter(expense => expense.amount >= 0)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const totalExpenses = expenses
      .filter(expense => expense.amount < 0)
      .reduce((sum, expense) => sum + Math.abs(expense.amount), 0);
    
    const balance = totalIncome - totalExpenses;
    const spendPercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

    return { 
      success: true, 
      data: {
        totalIncome,
        totalExpenses,
        balance,
        spendPercentage
      }
    };
  } catch (error) {
    console.error("Error al obtener los totales:", error);
    return { success: false, error: "Error al obtener los totales" };
  }
} 