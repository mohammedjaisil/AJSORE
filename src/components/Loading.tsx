export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-[999] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative">
                {/* Main Spinner */}
                <div className="w-16 h-16 rounded-full border-4 border-[#005d32]/10 border-t-[#005d32] animate-spin" />

                {/* Inner Pulsing Circle */}
                <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#005d32] animate-pulse opacity-20" />
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#005d32] animate-pulse">
                    Loading
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Preparing your experience...
                </p>
            </div>

            {/* Branding */}
            <div className="absolute bottom-12 font-black text-xl italic tracking-tighter text-gray-200">
                AJ STORE
            </div>
        </div>
    );
}
