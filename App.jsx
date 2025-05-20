import React, { useState } from 'react';
import axios from 'axios';

function App() {
    // 1. Form state
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    // 2. Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultStatus, setResultStatus] = useState(null);
    const [resultMessage, setResultMessage] = useState('');

    // 3. Basic validation
    const isValid =
        cardName.trim().length > 0 &&
        /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber) &&
        /^\d{2}\/\d{2}$/.test(expiry) &&
        /^\d{3,4}$/.test(cvc);

    // 4. Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResultStatus(null);
        setResultMessage('');

        try {
            const payload = {
                cardName,
                cardNumber,
                expiry,
                cvc,
                userId: 'demo-user-001',
                merchantId: 'demo-merchant-1',
            };
            const { data } = await axios.post(
                'https://bank.example.com/api/precheck',
                payload
            );

            if (data.status === 'approved') {
                setResultStatus('approved');
                setResultMessage('✅ Approved! You may now pay.');
            } else if (data.status === 'pending') {
                setResultStatus('pending');
                setResultMessage(
                    '🔒 Pending: Please confirm the transaction on your portal.'
                );
            } else {
                setResultStatus('declined');
                setResultMessage(
                    '❌ Declined: Bank is not allowing this transaction.'
                );
            }
        } catch (err) {
            setResultStatus('declined');
            setResultMessage('⚠️ Error contacting bank. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Payment Details
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Cardholder Name</label>
                        <input
                            type="text"
                            name="cardName"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Expiry</label>
                            <input
                                type="text"
                                name="expiry"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">CVC/CVV</label>
                            <input
                                type="text"
                                name="cvc"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="123"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting ? 'Processing…' : 'Continue to Payment'}
                    </button>

                    {resultStatus && (
                        <p
                            className={`mt-4 text-center ${resultStatus === 'approved'
                                    ? 'text-green-600'
                                    : resultStatus === 'pending'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                }`}
                        >
                            {resultMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default App;

