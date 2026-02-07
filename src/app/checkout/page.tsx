'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface FormFields {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

const Checkout: React.FC = () => {
    const { cart, getCartTotal, clearCart, formatPrice } = useCartStore();
    const router = useRouter();
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
    const cartTotal = getCartTotal();

    const [fields, setFields] = useState<FormFields>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [errors, setErrors] = useState<Partial<FormFields>>({});

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleBlur = (field: keyof FormFields) => {
        const value = fields[field];
        let error = '';

        if (!value) {
            error = 'This field is required';
        } else if (field === 'email' && !validateEmail(value)) {
            error = 'Invalid email address';
        } else if (field === 'zipCode' && value.length < 5) {
            error = 'Invalid ZIP code';
        }

        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const isStepValid = (currentStep: CheckoutStep) => {
        if (currentStep === 'shipping') {
            return fields.email && validateEmail(fields.email) && fields.firstName && fields.lastName && fields.address && fields.city && fields.zipCode;
        }
        if (currentStep === 'payment') {
            if (paymentMethod !== 'card') return true;
            return fields.cardNumber && fields.expiry && fields.cvv;
        }
        return true;
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid('review')) {
            // Simulate order placement
            clearCart();
            router.push('/order-confirmation');
        }
    };

    const steps = [
        { id: 'shipping', label: 'Shipping' },
        { id: 'payment', label: 'Payment' },
        { id: 'review', label: 'Review' }
    ];

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Your cart is empty</h2>
                <Link href="/shop" className="inline-block bg-[#005d32] text-white px-8 py-3 rounded-full font-bold">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
            {/* Progress Indicator */}
            <div className="mb-12">
                <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-[#005d32] -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: step === 'shipping' ? '0%' : step === 'payment' ? '50%' : '100%' }}
                    />
                    {steps.map((s, i) => (
                        <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${step === s.id ? 'bg-[#005d32] text-white ring-4 ring-[#005d32]/20' :
                                        (steps.findIndex(x => x.id === step) > i ? 'bg-[#005d32] text-white' : 'bg-white border-2 border-gray-100 text-gray-400')
                                    }`}
                            >
                                {steps.findIndex(x => x.id === step) > i ? '✓' : i + 1}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step === s.id ? 'text-[#005d32]' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Main Form Area */}
                <div className="lg:col-span-2 space-y-8">
                    {step === 'shipping' && (
                        <div className="bg-white border rounded-[2.5rem] p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-left duration-500">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Shipping Details</h2>
                                <Link href="/login" className="text-xs font-bold text-[#005d32] hover:underline">Log in for faster checkout</Link>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className={`w-full bg-gray-50 border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-100' : 'border-gray-100 focus:ring-[#005d32]/10 focus:bg-white'}`}
                                        value={fields.email}
                                        onChange={(e) => setFields({ ...fields, email: e.target.value })}
                                        onBlur={() => handleBlur('email')}
                                    />
                                    {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">{errors.email}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="Jane"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all"
                                            value={fields.firstName}
                                            onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
                                            onBlur={() => handleBlur('firstName')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all"
                                            value={fields.lastName}
                                            onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
                                            onBlur={() => handleBlur('lastName')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Street Address</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="123 Tech Lane"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all"
                                            value={fields.address}
                                            onChange={(e) => setFields({ ...fields, address: e.target.value })}
                                            onBlur={() => handleBlur('address')}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFields({ ...fields, address: '1600 Amphitheatre Pkwy', city: 'Mountain View', zipCode: '94043' })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#005d32] uppercase hover:underline"
                                        >
                                            Autofill Demo
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
                                        <input
                                            type="text"
                                            placeholder="San Francisco"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all"
                                            value={fields.city}
                                            onChange={(e) => setFields({ ...fields, city: e.target.value })}
                                            onBlur={() => handleBlur('city')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ZIP Code</label>
                                        <input
                                            type="text"
                                            placeholder="94103"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all"
                                            value={fields.zipCode}
                                            onChange={(e) => setFields({ ...fields, zipCode: e.target.value })}
                                            onBlur={() => handleBlur('zipCode')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => isStepValid('shipping') && setStep('payment')}
                                disabled={!isStepValid('shipping')}
                                className="w-full bg-[#005d32] text-white py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#004a28] shadow-xl shadow-[#005d32]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="bg-white border rounded-[2.5rem] p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep('shipping')} className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { id: 'card', label: 'Card', icon: '💳' },
                                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                                    { id: 'apple', label: 'Pay', icon: '🍎' }
                                ].map(method => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(method.id as any)}
                                        className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-2 ${paymentMethod === method.id ? 'border-[#005d32] bg-[#f3f9f6] text-[#005d32]' : 'border-gray-50 bg-gray-50/50 text-gray-400 hover:border-gray-200'}`}
                                    >
                                        <span className="text-2xl">{method.icon}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === 'card' ? (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all font-mono"
                                            value={fields.cardNumber}
                                            onChange={(e) => setFields({ ...fields, cardNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all font-mono"
                                                value={fields.expiry}
                                                onChange={(e) => setFields({ ...fields, expiry: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV</label>
                                            <input
                                                type="password"
                                                placeholder="***"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all font-mono"
                                                value={fields.cvv}
                                                onChange={(e) => setFields({ ...fields, cvv: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-bold">You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} to complete your purchase.</p>
                                </div>
                            )}

                            <button
                                onClick={() => isStepValid('payment') && setStep('review')}
                                disabled={!isStepValid('payment')}
                                className="w-full bg-[#005d32] text-white py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#004a28] shadow-xl shadow-[#005d32]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                            >
                                Review Order
                            </button>
                        </div>
                    )}

                    {step === 'review' && (
                        <div className="bg-white border rounded-[2.5rem] p-8 md:p-12 space-y-10 animate-in zoom-in duration-500">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep('payment')} className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Review Order</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-[#005d32]">Shipping Address</h3>
                                        <button onClick={() => setStep('shipping')} className="text-[10px] font-black uppercase text-gray-400 hover:underline">Edit</button>
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">
                                        <p className="font-black text-gray-900">{fields.firstName} {fields.lastName}</p>
                                        <p>{fields.address}</p>
                                        <p>{fields.city}, {fields.zipCode}</p>
                                        <p className="mt-2 text-gray-400">{fields.email}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-[#005d32]">Payment Method</h3>
                                        <button onClick={() => setStep('payment')} className="text-[10px] font-black uppercase text-gray-400 hover:underline">Edit</button>
                                    </div>
                                    <div className="text-sm font-medium text-gray-700 flex items-center gap-3">
                                        <span className="text-2xl">
                                            {paymentMethod === 'card' ? '💳' : paymentMethod === 'paypal' ? '🅿️' : '🍎'}
                                        </span>
                                        <div>
                                            <p className="font-black text-gray-900 uppercase tracking-tighter">
                                                {paymentMethod === 'card' ? `Ending in ${fields.cardNumber.slice(-4)}` : paymentMethod.toUpperCase()}
                                            </p>
                                            <p className="text-xs text-gray-400">Secure transaction encrypted</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#005d32]">Order Summary</h3>
                                <div className="divide-y border rounded-3xl overflow-hidden">
                                    {cart.map((item, idx) => (
                                        <div key={`${item.id}-${idx}`} className="flex items-center gap-4 p-4 bg-white">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                                                <img src={item.image} alt={item.name} className="max-h-full mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                                                <p className="text-[10px] text-gray-400 uppercase font-black">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-xs font-black text-[#005d32]">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-[#005d32] text-white py-6 rounded-full font-black uppercase tracking-widest text-base hover:bg-[#004a28] shadow-2xl shadow-[#005d32]/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Place Your Order — {formatPrice(cartTotal)}
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar Order Summary */}
                <div className="space-y-6 lg:sticky lg:top-28">
                    <div className="bg-white border rounded-[2rem] p-8 space-y-6 shadow-sm">
                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter border-b pb-4">In Your Bag</h2>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl p-3 flex items-center justify-center shrink-0">
                                        <img src={item.image} alt={item.name} className="max-h-full mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">{item.name}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-[9px] text-gray-400 font-black uppercase">Qty: {item.quantity}</p>
                                            <p className="text-xs font-black text-[#005d32]">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-3">
                            <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-[#005d32]">FREE</span>
                            </div>
                            <div className="flex justify-between text-gray-900 text-xl font-black pt-2 uppercase tracking-tighter">
                                <span>Total</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-200/50 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🛡️</span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Security Assured</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Your transaction is secured with bank-level encryption. We do not store your full card details.</p>
                        <div className="flex gap-4 opacity-30 grayscale pt-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
        </div>
    );
};

export default Checkout;
