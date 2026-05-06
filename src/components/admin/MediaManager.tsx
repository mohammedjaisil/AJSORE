'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Media } from '@/types';
import { uploadMedia, deleteMedia } from '@/actions/media';
import { useToast } from '@/lib/toast-store';

interface MediaManagerProps {
    initialMedia: Media[];
}

export default function MediaManager({ initialMedia }: MediaManagerProps) {
    const { addToast } = useToast();
    const [media, setMedia] = useState<Media[]>(initialMedia);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            await uploadFiles(Array.from(e.target.files));
        }
    };

    const uploadFiles = async (files: File[]) => {
        setIsUploading(true);
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        const res = await uploadMedia(formData);
        if (res.success) {
            if (res.failures && res.failures.length > 0) {
                addToast(`Uploaded ${res.data?.length} files, but ${res.failures.length} failed.`, 'error');
            } else {
                addToast("Successfully uploaded all files!", 'success');
            }
            if (res.data) {
                setMedia(prev => [...(res.data as Media[]), ...prev]);
            }
        } else {
            addToast("Upload failed: " + (res.error || "Unknown error"), 'error');
        }
        setIsUploading(false);
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} files?`)) return;

        const res = await deleteMedia(selectedIds);
        if (res.success) {
            addToast(`Successfully deleted ${selectedIds.length} files`, 'success');
            setMedia(media.filter(m => !selectedIds.includes(m.id)));
            setSelectedIds([]);
        } else {
            addToast("Failed to delete some files", 'error');
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === media.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(media.map(m => m.id));
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await uploadFiles(Array.from(e.dataTransfer.files));
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#f0f0f0]">
                <div className="space-y-1">
                    <h2 className="text-heading">Media library</h2>
                    <p className="text-label">Upload and manage images and videos</p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleDelete}
                            className="bg-white text-red-500 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-50 transition-all flex items-center gap-2 border border-[#e5e5e5]"
                        >
                            Delete ({selectedIds.length})
                        </button>
                    )}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="bg-[#1a1a1a] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isUploading ? 'Uploading...' : 'Upload files'}
                    </button>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*,application/pdf"
                    />
                </div>
            </div>

            {/* Drop Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive ? 'border-indigo-500 bg-indigo-50/30' : 'border-[#e5e5e5] bg-[#fafafa] hover:border-[#dcdcdc]'
                }`}
            >
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm mx-auto border border-[#e5e5e5]">📁</div>
                    <div className="space-y-1">
                        <p className="text-lg font-bold text-[#1a1a1a] tracking-tight">Upload files</p>
                        <p className="text-label text-[#9c9c9c]">Images, videos and documents (Max 10MB)</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 py-2 border-b border-[#f0f0f0]">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={selectedIds.length === media.length && media.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded-md border-[#e5e5e5] text-[#1a1a1a] focus:ring-black cursor-pointer"
                    />
                    <span className="text-label text-[#4a4a4a] group-hover:text-[#1a1a1a]">Select all</span>
                </label>
                <span className="text-label text-[#9c9c9c] ml-auto">{media.length} files</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {media.map((item) => (
                    <div
                        key={item.id}
                        className={`group relative aspect-square rounded-xl border overflow-hidden transition-all bg-white ${
                            selectedIds.includes(item.id) ? 'ring-2 ring-indigo-500 border-indigo-500 shadow-lg' : 'border-[#e5e5e5] hover:border-[#1a1a1a]'
                        }`}
                    >
                        {/* Checkbox Overlay */}
                        <div className={`absolute top-3 left-3 z-20 transition-all ${selectedIds.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                                className="w-4 h-4 rounded-md border-[#e5e5e5] text-indigo-600 focus:ring-indigo-500 shadow-sm cursor-pointer"
                            />
                        </div>

                        {/* Preview */}
                        <div className="w-full h-full p-2">
                            <div className="w-full h-full rounded-lg overflow-hidden bg-[#fafafa] flex items-center justify-center relative">
                                {item.file_type === 'image' ? (
                                    <Image
                                        src={item.file_url}
                                        alt={item.file_name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-3xl">{item.file_type === 'video' ? '🎬' : '📄'}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">{item.file_type}</span>
                                    </div>
                                )}

                                {/* Info Overlay on Hover */}
                                <div className="absolute inset-x-0 bottom-0 bg-white/95 border-t border-[#f0f0f0] p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-[10px] font-bold text-[#1a1a1a] truncate mb-0.5">{item.file_name}</p>
                                    <p className="text-label text-[#9c9c9c]">{formatSize(item.file_size)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {media.length === 0 && (
                <div className="py-24 text-center bg-[#fafafa] rounded-xl border border-dashed border-[#e5e5e5]">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm mx-auto border border-[#e5e5e5] opacity-20 mb-4">🖼️</div>
                    <p className="text-lg font-bold text-[#1a1a1a] tracking-tight">No media found</p>
                    <p className="text-label text-[#9c9c9c]">Start by uploading some files</p>
                </div>
            )}
        </div>
    );
}
