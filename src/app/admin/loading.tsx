export default function AdminLoading() {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/50">Fetching Admin Data</p>
        </div>
    );
}
