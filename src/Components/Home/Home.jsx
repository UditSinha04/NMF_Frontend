import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
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
        let animationFrameId;
        let isImagesLoaded = false;

        function getImageSetHeight() {
            const imgs = leftRef.current?.querySelectorAll('img');
            if (!imgs || imgs.length < sideImages.length) return 0;
            let height = 0;
            for (let i = 0; i < sideImages.length; i++) {
                height += imgs[i].offsetHeight + 16;
            }
            return height;
        }

        function checkImagesLoaded(callback) {
            const imgs = leftRef.current?.querySelectorAll('img');
            if (!imgs) return;
            let loaded = 0;
            imgs.forEach(img => {
                if (img.complete) {
                    loaded++;
                } else {
                    img.onload = () => {
                        loaded++;
                        if (loaded === imgs.length) callback();
                    };
                }
            });
            if (loaded === imgs.length) callback();
        }

        function startScroll() {
            imageSetHeight.current = getImageSetHeight();
            isImagesLoaded = true;
            animate();
        }

        const scrollSpeed = 0.5;

        function scrollImages(ref) {
            if (!ref.current || !imageSetHeight.current) return;
            ref.current.scrollTop += scrollSpeed;
            if (ref.current.scrollTop >= imageSetHeight.current) {
                ref.current.scrollTop = ref.current.scrollTop - imageSetHeight.current;
            }
        }

        function animate() {
            if (isImagesLoaded) {
                scrollImages(leftRef);
                scrollImages(rightRef);
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        checkImagesLoaded(startScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [sideImages]);

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

            {/* Center Content */}
            <div className="flex-1 flex flex-col justify-center items-center px-4 py-6">
                <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-center">NIRMALA MOHAN FOUNDATION</h1>
                <div className="max-w-4xl space-y-6 text-lg text-gray-700 text-justify">
                    <p>
                        Nirmala Mohan Foundation is a registered charitable trust started by Prof. (Dr) Srikanth Shastry and his elder brothers Ravikanth Shastry,  Shashikanth Shastry and elder sister Shastry Kalpana  on their parents name.
                    </p>
                    <p>    
                        The ambition of starting this foundation is to conduct Women health awareness programmes, proper education on Menstrual hygiene among school and college girls, conduct medical and dental health camps in  Kamareddy District.
                    </p>
                    <p>
                        Kamareddy is a district in Telangana state of India.  Being a district headquarter, majority of the  people living in and around the district are not aware of screening tests like MAMMOGRAM and PAP SMEAR test, which help to diagnose and prevent Breast and Cervical cancer in females. Our foundation aims to conduct medical health camps in Kamareddy town and surrounding villages and educate people about the health issues and methods to treat them.
                    </p>
                    <p>
                        Health and Education are crucial pillars of a healthy and strong nation. Majority people do not undergo routine health checkup and screening tests because most of them fear test results and cannot afford treatment expenses.  With the help of our foundation we will educate people about screening programmes and other health associated issues and also conduct the screening tests at highly affordable costs.

                    </p>
                    <p>
                        Menstruation is a normal physiological process of females at their reproductive age. However, it is surrounded with social taboos and supernatural beliefs. The poor knowledge and understanding of menstruation may lead to unsafe hygienic practice that inturn increases the risk of reproductive and genito-urinary tract infections, cervical cancer, school drop-out, poor academic performance and overall poor quality of life. Despite such clinical and academic effects, the knowledge and hygienic practice of adolescent girls towards menstruation is not well addressed in many parts of our country, particularly among school adolescent girls. Therefore, our foundation also aims to assess the knowledge and educate menstrual hygiene practice among adolescent school girls in Kamareddy and surrounding villages.

                    </p>
                    <p>
                        Majority of adolescent school girls have poor knowledge regarding menstruation and their hygienic practices. This demonstrates a need to design acceptable awareness creation and advocacy programmes to improve the knowledge and promote safe hygienic practice of adolescent school girls during menstruation.

                    </p>
                    <p>
                        From our foundation we will provide SANITARY NAPKINS to school and college girls for FREE OF COST and educate them about menstrual hygieneic methods.
                    </p>
                    <p className='italic font-semibold'>
                        Join us in our journey to create a better world. Together, we can make hope a reality for many.
                    </p>
                </div>
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