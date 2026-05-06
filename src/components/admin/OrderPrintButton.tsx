'use client';

import React from 'react';

const OrderPrintButton = () => {
    return (
        <button 
            type="button"
            onClick={() => window.print()} 
            className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-gray-900 transition-all flex items-center gap-2 shadow-sm"
        >
            <span>🖨️</span> Print Invoice
        </button>
    );
};

export default OrderPrintButton;
