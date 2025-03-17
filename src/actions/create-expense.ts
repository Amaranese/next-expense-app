"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Definir el tipo de transacción
type TransactionFormData = {
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
};

export async function createTransaction(formData: TransactionFormData) {
  try {
    // Verificar si la categoría existe
    let category = await prisma.category.findUnique({
      where: {
        name: formData.category,
      },
    });

    // Si la categoría no existe, crearla
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: formData.category,
        },
      });
    }

    // Crear el gasto o ingreso
    const expense = await prisma.expense.create({
      data: {
        title: formData.description,
        amount: formData.type === "income" ? formData.amount : -formData.amount, // Negativo para gastos
        description: formData.description,
        date: new Date(formData.date),
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/");

    return { success: true, data: expense };
  } catch (error) {
    console.error("Error al crear la transacción:", error);
    return { success: false, error: "Error al crear la transacción" };
  }
}
