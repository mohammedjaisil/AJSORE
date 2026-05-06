'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { createOrder } from '@/actions/orders';
import { useToast } from '@/lib/toast-store';

type CheckoutStep = 'shipping' | 'payment' | 'review';
type PaymentMethod = 'card' | 'razorpay' | 'paypal' | 'cod';

interface FormFields {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    coupon: string;
}

const COUPONS: Record<string, number> = {
    'SAVE10': 10,
    'buykko20': 20,
    'WELCOME15': 15,
};

const Checkout: React.FC = () => {
    const { cart, getCartTotal, clearCart, formatPrice, user } = useCartStore();
    const { addToast } = useToast();
    const router = useRouter();
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState('');
    const cartTotal = getCartTotal();
    const finalTotal = cartTotal * (1 - discount / 100);

    const [fields, setFields] = useState<FormFields>({
        email: user?.email || '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        coupon: '',
    });

    const [errors, setErrors] = useState<Partial<FormFields>>({});

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const setField = (field: keyof FormFields, value: string) =>
        setFields(prev => ({ ...prev, [field]: value }));

    const handleBlur = (field: keyof FormFields) => {
        const value = fields[field];
        let error = '';
        if (!value && field !== 'coupon' && field !== 'cardNumber' && field !== 'expiry' && field !== 'cvv') {
            error = 'Required';
        } else if (field === 'email' && !validateEmail(value)) {
            error = 'Invalid email';
        } else if (field === 'zipCode' && value.length < 4) {
            error = 'Invalid PIN';
        }
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const applyCoupon = () => {
        const code = fields.coupon.trim().toUpperCase();
        if (COUPONS[code]) {
            setDiscount(COUPONS[code]);
            setCouponApplied(code);
            addToast(`Coupon applied! ${COUPONS[code]}% off 🎉`, 'success');
        } else {
            addToast('Invalid coupon code.', 'error');
        }
    };

    const isStepValid = (currentStep: CheckoutStep) => {
        if (currentStep === 'shipping') {
            return fields.email && validateEmail(fields.email) && fields.firstName && fields.lastName
                && fields.phone && fields.address && fields.city && fields.zipCode;
        }
        if (currentStep === 'payment') {
            if (paymentMethod === 'cod' || paymentMethod === 'razorpay' || paymentMethod === 'paypal') return true;
            return fields.cardNumber && fields.expiry && fields.cvv;
        }
        return true;
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const orderData = {
                user_email: fields.email,
                user_name: `${fields.firstName} ${fields.lastName}`,
                total: finalTotal,
                shipping_address: {
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    phone: fields.phone,
                    address: fields.address,
                    city: fields.city,
                    state: fields.state,
                    zipCode: fields.zipCode,
                },
                payment_info: {
                    method: paymentMethod,
                    last4: paymentMethod === 'card' ? fields.cardNumber.slice(-4) : null,
                    coupon: couponApplied || null,
                    discount: discount || null,
                },
                items: cart,
            };

            const result = await createOrder(orderData);

            if (result.success) {
                clearCart();
                router.push('/order-confirmation');
            } else {
                addToast(result.error || 'Failed to place order. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            addToast('An unexpected error occurred. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { id: 'shipping', label: 'Delivery', icon: '📦' },
        { id: 'payment', label: 'Payment', icon: '💳' },
        { id: 'review', label: 'Review', icon: '✅' },
    ];

    if (cart.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F9F9F9] px-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm mb-8">🛒</div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Your cart is empty</h1>
                <p className="text-text-muted text-sm max-w-xs text-center mb-10 leading-relaxed">
                    Discovery is just a click away. Explore our curated collection of premium essentials.
                </p>
                <Link href="/shop" className="bg-black text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                    Start Exploring
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-16">
                <div className="mb-16">
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">
                        <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
                        <span>/</span>
                        <span className="text-black">Checkout</span>
                    </nav>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-main uppercase">
                        Checkout
                    </h1>
                </div>

                {/* Progress Indicator */}
                <div className="mb-20 max-w-2xl">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2" />
                        <div
                            className="absolute top-1/2 left-0 h-[1px] bg-black -translate-y-1/2 transition-all duration-700"
                            style={{ width: step === 'shipping' ? '0%' : step === 'payment' ? '50%' : '100%' }}
                        />
                        {steps.map((s, i) => {
                            const currentIdx = steps.findIndex(x => x.id === step);
                            const isDone = currentIdx > i;
                            const isActive = step === s.id;
                            return (
                                <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${isActive ? 'bg-black text-white shadow-xl shadow-black/20 scale-110' : isDone ? 'bg-accent-sage text-white' : 'bg-white border border-gray-100 text-text-muted'}`}>
                                        {isDone ? '✓' : i + 1}
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-text-muted'}`}>
                                        {s.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left — Form Area */}
                    <div className="lg:col-span-8">
                        {/* STEP 1: SHIPPING */}
                        {step === 'shipping' && (
                            <div className="bg-white rounded-5xl p-8 sm:p-12 space-y-12 border border-gray-50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tight">Shipping Details</h2>
                                    <p className="text-text-muted text-sm">Where should we deliver your premium essentials?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="johndoe@example.com"
                                            className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none"
                                            value={fields.email}
                                            onChange={(e) => setField('email', e.target.value)}
                                            onBlur={() => handleBlur('email')}
                                        />
                                        {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">First Name</label>
                                        <input type="text" placeholder="John" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none" value={fields.firstName} onChange={(e) => setField('firstName', e.target.value)} onBlur={() => handleBlur('firstName')} />
                                        {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.firstName}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Last Name</label>
                                        <input type="text" placeholder="Doe" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none" value={fields.lastName} onChange={(e) => setField('lastName', e.target.value)} onBlur={() => handleBlur('lastName')} />
                                        {errors.lastName && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.lastName}</p>}
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Phone Number</label>
                                        <input type="tel" placeholder="+91 98765 43210" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none" value={fields.phone} onChange={(e) => setField('phone', e.target.value)} onBlur={() => handleBlur('phone')} />
                                        {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.phone}</p>}
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Street Address</label>
                                        <input type="text" placeholder="123 Luxury Avenue, Penthouse 1" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none" value={fields.address} onChange={(e) => setField('address', e.target.value)} onBlur={() => handleBlur('address')} />
                                        {errors.address && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.address}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">City</label>
                                        <input type="text" placeholder="Mumbai" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none" value={fields.city} onChange={(e) => setField('city', e.target.value)} onBlur={() => handleBlur('city')} />
                                        {errors.city && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.city}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">PIN Code</label>
                                        <input type="text" placeholder="400001" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none" value={fields.zipCode} onChange={(e) => setField('zipCode', e.target.value)} onBlur={() => handleBlur('zipCode')} />
                                        {errors.zipCode && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.zipCode}</p>}
                                    </div>
                                </div>

                                <button
                                    onClick={() => isStepValid('shipping') && setStep('payment')}
                                    disabled={!isStepValid('shipping')}
                                    className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-all disabled:opacity-30 transform active:scale-95 shadow-xl shadow-black/10"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {/* STEP 2: PAYMENT */}
                        {step === 'payment' && (
                            <div className="bg-white rounded-5xl p-8 sm:p-12 space-y-12 border border-gray-50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tight">Payment Method</h2>
                                    <p className="text-text-muted text-sm">Select your preferred payment option.</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { id: 'card', label: 'Card', icon: '💳' },
                                        { id: 'razorpay', label: 'UPI / Net', icon: '🏦' },
                                        { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                                        { id: 'cod', label: 'Cash', icon: '💵' },
                                    ].map(method => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                                            className={`flex flex-col items-center justify-center p-6 rounded-4xl border transition-all gap-3 ${paymentMethod === method.id ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 bg-[#F9F9F9] text-text-muted hover:border-black hover:text-black'}`}
                                        >
                                            <span className="text-2xl">{method.icon}</span>
                                            <span className="text-[9px] font-bold uppercase tracking-widest">{method.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-mono tracking-widest outline-none focus:bg-white focus:border-black transition-all"
                                                value={fields.cardNumber}
                                                onChange={(e) => setField('cardNumber', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Expiry Date</label>
                                                <input type="text" placeholder="MM / YY" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-mono outline-none focus:bg-white focus:border-black transition-all" value={fields.expiry} onChange={(e) => setField('expiry', e.target.value)} />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">CVV</label>
                                                <input type="password" placeholder="•••" className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-mono outline-none focus:bg-white focus:border-black transition-all" value={fields.cvv} onChange={(e) => setField('cvv', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button onClick={() => setStep('shipping')} className="px-10 py-5 rounded-full border border-gray-200 text-[11px] font-bold uppercase tracking-widest hover:border-black transition-all transform active:scale-95">Back</button>
                                    <button
                                        onClick={() => isStepValid('payment') && setStep('review')}
                                        disabled={!isStepValid('payment')}
                                        className="flex-1 bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-all disabled:opacity-30 transform active:scale-95 shadow-xl shadow-black/10"
                                    >
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: REVIEW */}
                        {step === 'review' && (
                            <form onSubmit={handlePlaceOrder} className="bg-white rounded-5xl p-8 sm:p-12 space-y-12 border border-gray-50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tight">Review & Confirm</h2>
                                    <p className="text-text-muted text-sm">Almost there. Please review your order details.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-[#F9F9F9] rounded-4xl p-8 space-y-4">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest">Shipping To</h4>
                                            <button type="button" onClick={() => setStep('shipping')} className="text-[9px] font-bold uppercase text-accent-sage hover:underline">Edit</button>
                                        </div>
                                        <div className="text-sm space-y-1">
                                            <p className="font-bold">{fields.firstName} {fields.lastName}</p>
                                            <p className="text-text-muted leading-relaxed">{fields.address}, {fields.city}, {fields.zipCode}</p>
                                            <p className="text-text-muted">{fields.phone}</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#F9F9F9] rounded-4xl p-8 space-y-4">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest">Payment Method</h4>
                                            <button type="button" onClick={() => setStep('payment')} className="text-[9px] font-bold uppercase text-accent-sage hover:underline">Edit</button>
                                        </div>
                                        <div className="text-sm space-y-1">
                                            <p className="font-bold uppercase">{paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod}</p>
                                            <p className="text-text-muted">{paymentMethod === 'card' ? `Ending in ···· ${fields.cardNumber.slice(-4)}` : 'Secure Transaction'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Order Summary</h4>
                                    <div className="divide-y divide-gray-100 border border-gray-100 rounded-3xl overflow-hidden">
                                        {cart.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-6 p-6 hover:bg-gray-50 transition-all">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F9F9F9] shrink-0 border border-gray-50">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold uppercase tracking-tight">{item.name}</p>
                                                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep('payment')} className="px-10 py-5 rounded-full border border-gray-200 text-[11px] font-bold uppercase tracking-widest hover:border-black transition-all transform active:scale-95">Back</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-all disabled:opacity-30 transform active:scale-95 shadow-xl shadow-black/10"
                                    >
                                        {isSubmitting ? 'Processing...' : `Place Order — ${formatPrice(finalTotal)}`}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right — Sidebar Summary */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                        <div className="bg-black text-white rounded-5xl p-10 space-y-10 shadow-2xl shadow-black/20">
                            <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-6">Summary</h2>
                            
                            <div className="space-y-6 max-h-[300px] overflow-y-auto no-scrollbar">
                                {cart.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold uppercase tracking-tight opacity-80 line-clamp-1">{item.name}</p>
                                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-[10px] font-bold">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Coupon Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="SAVE10"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-[10px] font-bold uppercase outline-none focus:border-white/30 transition-all"
                                        value={fields.coupon}
                                        onChange={(e) => setField('coupon', e.target.value.toUpperCase())}
                                        disabled={!!couponApplied}
                                    />
                                    <button
                                        type="button"
                                        onClick={applyCoupon}
                                        className="bg-white text-black px-6 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 space-y-4">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/50">
                                    <span>Subtotal</span>
                                    <span className="text-white">{formatPrice(cartTotal)}</span>
                                </div>
                                {couponApplied && (
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-accent-sage">
                                        <span>Discount ({discount}%)</span>
                                        <span>-{formatPrice(cartTotal * discount / 100)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/50">
                                    <span>Shipping</span>
                                    <span className="text-accent-sage">FREE</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-4xl font-bold tracking-tight">{formatPrice(finalTotal)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-4xl p-8 border border-gray-50 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#F9F9F9] flex items-center justify-center text-xl">🛡️</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</p>
                                <p className="text-[9px] text-text-muted font-medium mt-0.5">256-bit SSL Encrypted Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
