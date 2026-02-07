'use client';

import React, { useState, useRef } from 'react';
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
            window.location.reload();
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Media Library</h2>
                <div className="flex items-center gap-3">
                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleDelete}
                            className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                            <span>🗑️</span> Delete ({selectedIds.length})
                        </button>
                    )}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="bg-[#005d32] text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#004a28] transition-all shadow-lg shadow-[#005d32]/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        <span>{isUploading ? '⌛' : '📤'}</span> {isUploading ? 'Uploading...' : 'Upload Files'}
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
                className={`relative border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all ${dragActive ? 'border-[#005d32] bg-[#f3f9f6]' : 'border-gray-200 bg-gray-50'
                    }`}
            >
                <div className="space-y-4">
                    <div className="text-4xl">📁</div>
                    <div>
                        <p className="text-lg font-black text-gray-900 uppercase tracking-tighter">Drag & Drop Files Here</p>
                        <p className="text-sm text-gray-400 font-medium mt-1">Images, Videos and Documents (Max 10MB)</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 py-4 border-b">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={selectedIds.length === media.length && media.length > 0}
                        onChange={toggleSelectAll}
                        className="w-5 h-5 rounded-lg border-gray-300 text-[#005d32] focus:ring-[#005d32]"
                    />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Select All</span>
                </label>
                <span className="text-xs font-black text-gray-300 uppercase tracking-widest ml-auto">{media.length} items in library</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {media.map((item) => (
                    <div
                        key={item.id}
                        className={`group relative aspect-square rounded-[2rem] border overflow-hidden transition-all bg-white hover:shadow-xl ${selectedIds.includes(item.id) ? 'ring-4 ring-[#005d32] border-transparent' : 'border-gray-100'
                            }`}
                    >
                        {/* Checkbox Overlay */}
                        <div className={`absolute top-4 left-4 z-10 transition-opacity ${selectedIds.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                                className="w-5 h-5 rounded-lg border-gray-300 text-[#005d32] focus:ring-[#005d32] shadow-sm"
                            />
                        </div>

                        {/* Preview */}
                        <div className="w-full h-full p-2">
                            <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-50 flex items-center justify-center relative">
                                {item.file_type === 'image' ? (
                                    <Image
                                        src={item.file_url}
                                        alt={item.file_name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                                        className="object-cover"
                                    />

                                ) : item.file_type === 'video' ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-3xl">🎬</span>
                                        <span className="text-[10px] font-black uppercase text-gray-400">Video</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-3xl">📄</span>
                                        <span className="text-[10px] font-black uppercase text-gray-400">PDF</span>
                                    </div>
                                )}

                                {/* Info Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-[9px] text-white font-black uppercase tracking-widest">
                                    <p className="truncate mb-1">{item.file_name}</p>
                                    <p className="text-gray-300">{formatSize(item.file_size)}</p>
                                    <p className="text-gray-400 mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {media.length === 0 && (
                <div className="py-24 text-center space-y-4 bg-gray-50 rounded-[2.5rem] border-2 border-dashed">
                    <span className="text-5xl block">🖼️</span>
                    <div>
                        <p className="text-gray-900 font-black uppercase tracking-tighter">Library is Empty</p>
                        <p className="text-gray-400 font-medium text-sm">Upload your first media assets for your store.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
