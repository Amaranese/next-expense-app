"use client"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-600 h-32 relative">
            <div className="absolute -bottom-16 left-6">
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-4">
              <button className="bg-white text-blue-600 px-4 py-1 rounded-md text-sm font-medium">
                Cambiar portada
              </button>
            </div>
          </div>
          
          <div className="pt-20 px-6 pb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">Usuario Ejemplo</h2>
                <p className="text-gray-600">usuario@ejemplo.com</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Editar perfil
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Información personal</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value="Usuario Ejemplo"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value="usuario@ejemplo.com"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value="+1 234 567 890"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de registro
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value="01/01/2023"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 