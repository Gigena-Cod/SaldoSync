import React, { useState } from "react";
import { IoMdAdd, IoMdInformationCircle } from "react-icons/io";
import AddCardModal from "./components/AddCardModal";
import Card from "./components/Card/Card";

export default function Tarjetas() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Content */}
      <div className="p-8  w-full mx-auto">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Mis Tarjetas</h2>
            <p className="text-slate-500 mt-1">
              Administra tus tarjetas de débito y crédito vinculadas.
            </p>
          </div>

          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add</span>
            Agregar Nueva Tarjeta
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta 1 */}
          <Card
            type="Visa Débito"
            holder="NAUEL GONZALEZ"
            number="4582"
            balance="$45.000,00"
            gradient="from-slate-900 to-slate-700"
          />

          {/* Tarjeta 2 */}
          <Card
            type="Mastercard Crédito"
            holder="CAMILA SUAREZ"
            number="8812"
            limit="$250.000"
            closing="22 Oct"
            gradient="from-indigo-600 to-purple-700"
            credit
          />

          {/* Tarjeta 3 */}
          <Card
            type="Visa Crédito"
            holder="NAUEL GONZALEZ"
            number="1024"
            limit="$500.000"
            closing="15 Nov"
            gradient="from-blue-900 via-blue-800 to-indigo-900"
            credit
          />

          {/* Botón agregar */}
          <button 
            onClick={handleAddCardClick}
            className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 min-h-[340px] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all group"
          >
            <div className="size-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all shadow-sm mb-4">
              <IoMdAdd className="text-3xl" />
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300">
              Vincular otra tarjeta
            </p>
            <p className="text-xs text-slate-500 mt-1">Crédito o Débito</p>
          </button>
        </div>

        {/* Seguridad */}
        <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-4">
          <IoMdInformationCircle className="text-primary" />
          <div>
            <h4 className="text-sm font-bold">Seguridad de tus datos</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Nunca compartas los 16 dígitos ni el código CVV de tus tarjetas.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddCardModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

