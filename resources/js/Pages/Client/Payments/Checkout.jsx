import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';

export default function Checkout({ auth, invoice, paystackPublicKey }) {
    const [paymentMethod, setPaymentMethod] = useState('paystack');
    
    // Bank Transfer Form
    const { data, setData, post, processing, errors } = useForm({
        proof: null,
    });

    const handleBankTransfer = (e) => {
        e.preventDefault();
        post(`/client/invoices/${invoice.id}/bank-transfer`);
    };

    // Initiate Paystack Payment Flow
    const initiatePaystack = () => {
        router.post(`/client/invoices/${invoice.id}/paystack`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title={`Checkout Invoice #${invoice.id}`} />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Payment</h2>
                    
                    {/* Invoice Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Invoice Reference:</span>
                            <span className="font-semibold text-gray-900">INV-{String(invoice.id).padStart(4, '0')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Description:</span>
                            <span className="font-medium text-gray-900">{invoice.description}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                            <span className="text-lg font-bold text-gray-900">Amount:</span>
                            <span className="text-xl font-bold text-gray-700">₦{parseFloat(invoice.amount).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                            <span className="text-lg font-bold text-gray-900">Total + Gateway Fee:</span>
                            <span className="text-2xl font-bold text-indigo-600">
                                ₦{(() => {
                                    const amount = parseFloat(invoice.amount);
                                    let total = amount < 2500 ? amount / (1 - 0.015) : (amount + 100) / (1 - 0.015);
                                    let fee = total - amount;
                                    if (fee > 2000) fee = 2000;
                                    return (amount + fee).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                })()}
                            </span>
                        </div>
                    </div>

                    {invoice.status === 'paid' ? (
                        <div className="bg-green-50 text-green-800 p-4 rounded-md text-center font-medium border border-green-200">
                            This invoice has been paid. Thank you!
                        </div>
                    ) : invoice.status === 'pending_confirmation' ? (
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md text-center font-medium border border-yellow-200">
                            Your payment is currently being verified. We will notify you once it is approved.
                        </div>
                    ) : (
                        <div>
                            {/* Payment Method Tabs */}
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => setPaymentMethod('paystack')}
                                    className={`w-1/2 py-3 font-medium text-sm text-center border-b-2 ${paymentMethod === 'paystack' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Pay with Card (Paystack)
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('bank_transfer')}
                                    className={`w-1/2 py-3 font-medium text-sm text-center border-b-2 ${paymentMethod === 'bank_transfer' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Bank Transfer
                                </button>
                            </div>

                            {/* Paystack View */}
                            {paymentMethod === 'paystack' && (
                                <div className="text-center py-6">
                                    <p className="text-gray-600 mb-6">Securely pay using your credit or debit card via Paystack.</p>
                                    <button
                                        onClick={initiatePaystack}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            )}

                            {/* Bank Transfer View */}
                            {paymentMethod === 'bank_transfer' && (
                                <form onSubmit={handleBankTransfer} className="space-y-6">
                                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
                                        <h4 className="font-semibold text-blue-900 mb-2">Our Bank Details</h4>
                                        <p className="text-sm text-blue-800">Bank: Guarantee Trust Bank (GTB)</p>
                                        <p className="text-sm text-blue-800">Account Name: Studio99 Digital</p>
                                        <p className="text-sm font-mono text-blue-900 mt-1">0123456789</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Upload Receipt / Proof of Payment</label>
                                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label htmlFor="proof-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input 
                                                            id="proof-upload" 
                                                            name="proof" 
                                                            type="file" 
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={e => setData('proof', e.target.files[0])}
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                                {data.proof && (
                                                    <p className="text-sm text-green-600 font-medium mt-2">{data.proof.name}</p>
                                                )}
                                            </div>
                                        </div>
                                        {errors.proof && <p className="mt-1 text-sm text-red-600">{errors.proof}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || !data.proof}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none disabled:opacity-50"
                                    >
                                        {processing ? 'Uploading...' : 'Submit Proof of Payment'}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
