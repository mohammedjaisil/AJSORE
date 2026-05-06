export default function AdminLoading() {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#005d32]/10 border-t-[#005d32] animate-spin mb-4" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#005d32]/60">Loading...</p>
        </div>
    );
}
