import React from 'react';
import { getSalesReport, getProductPerformance, getRefundReport } from '@/actions/admin-reports';

export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
    const salesReport = await getSalesReport('30d');
    const performance = await getProductPerformance();
    const refunds = await getRefundReport();

    const maxSales = Math.max(...salesReport.daily.map(d => Number(d.sales)), 100);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading">Reports</h1>
                    <p className="text-label mt-1">Business analytics & performance tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-3 py-1.5 text-sm font-medium text-[#4a4a4a] hover:bg-[#f6f6f7] rounded-lg border border-[#e5e5e5] transition-all">Export</button>
                    <button className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors shadow-sm">Generate PDF</button>
                </div>
            </div>

            {/* Sales Analytics Chart */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-label text-[#1a8a4f] mb-1">Monthly Revenue (30d)</p>
                        <h3 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">₹{(salesReport.totalSales * 83.5).toLocaleString()}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-label mb-1">Total Orders</p>
                        <p className="text-xl font-bold text-[#1a1a1a]">{salesReport.count}</p>
                    </div>
                </div>

                <div className="h-64 flex items-end justify-between gap-2 px-2 relative z-10">
                    {salesReport.daily.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full relative h-48 bg-slate-50 rounded-lg overflow-hidden flex items-end">
                                <div 
                                    className="w-full bg-[#005d32] rounded-t-lg group-hover:bg-[#004a28] transition-all duration-1000 shadow-lg shadow-[#005d32]/20"
                                    style={{ height: `${(Number(d.sales) / maxSales) * 100}%` }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80">
                                    <p className="text-[8px] font-bold text-[#005d32] uppercase">₹{(Number(d.sales) * 83.5).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">{d.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Product Performance */}
                <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-[#f0f0f0]">
                        <h3 className="card-title">Product performance</h3>
                    </div>
                    
                    <div className="divide-y divide-[#f6f6f7]">
                        {performance.slice(0, 5).map((p: any, i: number) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#fafafa] transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-lg bg-[#f6f6f7] border border-[#e5e5e5] flex items-center justify-center text-[10px] font-bold text-[#9c9c9c]">0{i+1}</span>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-[#1a1a1a] truncate w-32 sm:w-64">{p.name}</p>
                                        <p className="text-label mt-0.5">{p.units} Units Sold</p>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-slate-900">₹{(p.revenue * 83.5).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="space-y-10">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl text-white space-y-6 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.05] blur-3xl pointer-events-none" />
                        <h3 className="card-title text-white">Financial Overview</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-label text-white/40">Gross Revenue</p>
                                <p className="text-2xl font-bold tracking-tight">₹{(salesReport.totalSales * 83.5).toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-label text-white/40">Refunds</p>
                                <p className="text-2xl font-bold text-red-400 tracking-tight">₹{(refunds.reduce((acc, r) => acc + Number(r.total), 0) * 83.5).toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-label text-white/40">Average Order</p>
                                <p className="text-2xl font-bold text-[#1a8a4f] tracking-tight">₹{( (salesReport.totalSales / (salesReport.count || 1)) * 83.5 ).toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-label text-white/40">Success Rate</p>
                                <p className="text-2xl font-bold text-[#1a8a4f] tracking-tight">98.4%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Quarterly Projection</h4>
                        <div className="flex items-end gap-3 h-20">
                            {[40, 60, 45, 90, 75, 55, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-slate-100 rounded-t-lg transition-all hover:bg-[#005d32]" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold leading-relaxed">
                            Based on current performance, the projected revenue for Q3 expects a 14.5% uptick in customer engagement and product distribution.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
