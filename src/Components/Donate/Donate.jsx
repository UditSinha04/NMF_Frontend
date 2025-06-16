import React, { useState, useRef, useEffect } from 'react';

function Donate() {
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        amount: ''
    });
    const [showQR, setShowQR] = useState(false);

    // For auto-scrolling side images
    const [sideImages, setSideImages] = useState([]);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const imageSetHeight = useRef(0);

    // Fetch images from backend
    useEffect(() => {
        fetch('http://localhost:5000/api/gallery')
            .then(res => res.json())
            .then(data => setSideImages(data))
            .catch(() => setSideImages([]));
    }, []);

    useEffect(() => {
        if (sideImages.length === 0) return;
        const handleImagesLoaded = () => {
            if (leftRef.current) {
                const imgs = leftRef.current.querySelectorAll('img');
                let height = 0;
                for (let i = 0; i < sideImages.length; i++) {
                    height += imgs[i].offsetHeight + 16;
                }
                imageSetHeight.current = height;
            }
        };

        const imgs = leftRef.current?.querySelectorAll('img') || [];
        let loaded = 0;
        imgs.forEach(img => {
            if (img.complete) {
                loaded++;
            } else {
                img.onload = () => {
                    loaded++;
                    if (loaded === imgs.length) handleImagesLoaded();
                };
            }
        });
        if (loaded === imgs.length && imgs.length > 0) handleImagesLoaded();

        const scrollSpeed = 0.5;
        let animationFrameId;

        function scrollImages(ref) {
            if (!ref.current || !imageSetHeight.current) return;
            ref.current.scrollTop += scrollSpeed;
            if (ref.current.scrollTop >= imageSetHeight.current) {
                ref.current.scrollTop = ref.current.scrollTop - imageSetHeight.current;
            }
        }

        function animate() {
            scrollImages(leftRef);
            scrollImages(rightRef);
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [sideImages.length]);

    const renderImages = (side) => (
        <>
            {sideImages.map((src, idx) => (
                <img
                    key={side + '-img-' + idx}
                    src={src}
                    alt={`${side}-img-${idx}`}
                    className="w-28 h-28 object-cover rounded shadow mb-4"
                    draggable={false}
                />
            ))}
            {sideImages.map((src, idx) => (
                <img
                    key={side + '-img-dup-' + idx}
                    src={src}
                    alt={`${side}-img-dup-${idx}`}
                    className="w-28 h-28 object-cover rounded shadow mb-4"
                    draggable={false}
                />
            ))}
        </>
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send data to backend
        const response = await fetch('http://localhost:5000/api/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                address: form.address,
                phone: form.phone
            })
        });
        if (response.ok) {
            setShowQR(true);
            setForm({ name: '', address: '', phone: '', amount: '' });
        } else {
            alert('Failed to submit donation. Please try again.');
        }
    };

    const handleClose = () => {
        setShowQR(false);
    };

    return (
        <div className="flex min-h-screen bg-[#f6f6e9]">
            {/* Left Side Images (auto-scroll) */}
            <div
                ref={leftRef}
                className="flex flex-col items-center gap-0 p-2 overflow-hidden"
                style={{ height: '100vh', minWidth: '6.5rem', scrollbarWidth: 'none' }}
            >
                <div className="flex flex-col">
                    {renderImages('left')}
                </div>
            </div>

            {/* Center Form */}
            <div className="flex-1 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-300 p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
                >
                    <h2 className=" text-2xl font-bold text-center mb-4">Donate to Our Charity</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        minLength={10}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
                    >
                        Proceed
                    </button>
                </form>
                {showQR && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <h3 className="underline text-xl font-semibold mb-4">Scan to Pay</h3>
                            <h2 className="text-lg mb-4">Please take a Screenshot of the Transaction.</h2>
                            <img
                                src="/Images/UPI_QR.jpg"
                                alt="QR Code"
                                className="w-96 h-96 mb-4"
                            />
                            <button
                                onClick={handleClose}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side Images (auto-scroll) */}
            <div
                ref={rightRef}
                className="flex flex-col items-center gap-0 p-2 overflow-hidden"
                style={{ height: '100vh', minWidth: '6.5rem', scrollbarWidth: 'none' }}
            >
                <div className="flex flex-col">
                    {renderImages('right')}
                </div>
            </div>
        </div>
    );
}

export default Donate;
