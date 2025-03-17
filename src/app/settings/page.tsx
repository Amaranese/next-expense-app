"use client"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Configuración</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Preferencias de la cuenta</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moneda predeterminada
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="USD">USD - Dólar estadounidense</option>
                <option value="EUR">EUR - Euro</option>
                <option value="MXN">MXN - Peso mexicano</option>
                <option value="COP">COP - Peso colombiano</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tema
              </label>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-200 rounded-md">Claro</button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-md">Oscuro</button>
                <button className="px-4 py-2 bg-gray-300 rounded-md">Sistema</button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notificaciones
              </label>
              <div className="flex items-center">
                <input type="checkbox" id="notifications" className="mr-2" />
                <label htmlFor="notifications">Recibir notificaciones de gastos</label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 