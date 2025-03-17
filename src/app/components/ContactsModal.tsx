"use client";

import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function ContactsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "groups">("contacts");

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Jordy Broke",
      email: "jbroke2@gmail.com",
      avatar: "/avatars/jordy.jpg",
    },
    {
      id: "2",
      name: "Tamara Junior",
      email: "tamaraj@gmail.com",
      avatar: "/avatars/tamara.jpg",
    },
    {
      id: "3",
      name: "Terry McGuire",
      email: "mcterryg@gmail.com",
      avatar: "/avatars/terry.jpg",
    },
    {
      id: "4",
      name: "John Bahil",
      email: "jbahil8@gmail.com",
      avatar: "/avatars/john.jpg",
    },
  ];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-50 transition-all duration-300 flex items-center justify-center"
        aria-label="Abrir contactos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      </button>

      {/* Modal de contactos */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
            {/* Pestañas */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "contacts"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("contacts")}
              >
                Contacts
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "groups"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("groups")}
              >
                Groups
              </button>
            </div>

            {/* Contenido */}
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-4">
                11 CONTACTS
              </div>

              {/* Lista de contactos */}
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          {contact.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                      </div>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm">
                      Send
                    </button>
                  </div>
                ))}
              </div>

              {/* Botón de añadir contacto */}
              <button className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md">
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 