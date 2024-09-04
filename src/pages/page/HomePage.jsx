import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./header";
import MainBox from "../component/mainbox";
import "../css/HomePage.css";
import "../css/mainbox.css";

const HomePage = () => {
    const [isVisible, setIsVisible] = useState([false, false, false]);
    const boxRefs = useRef([]);
    const mainImageRef = useRef(null);
    const contentRefs = useRef([]); // CM_content와 CM_content2에 대한 ref 추가

    useEffect(() => {
        const observerOptions = {
            threshold: 0.7 // 요소가 70% 이상 보이면 트리거
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === mainImageRef.current) {
                        entry.target.classList.add('visible');
                    } else {
                        const index = boxRefs.current.indexOf(entry.target);
                        const contentIndex = contentRefs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setIsVisible((prev) => {
                                const newVisible = [...prev];
                                newVisible[index] = true;
                                return newVisible;
                            });
                        }
                        if (contentIndex !== -1) {
                            entry.target.classList.add('visible');
                        }
                    }
                }
            });
        }, observerOptions);

        // 요소들을 관찰 시작
        boxRefs.current.forEach((box) => {
            if (box) observer.observe(box);
        });

        contentRefs.current.forEach((content) => {
            if (content) observer.observe(content);
        });

        if (mainImageRef.current) {
            observer.observe(mainImageRef.current);
        }

        return () => {
            // 관찰 해제
            boxRefs.current.forEach((box) => {
                if (box) observer.unobserve(box);
            });
            contentRefs.current.forEach((content) => {
                if (content) observer.unobserve(content);
            });
            if (mainImageRef.current) {
                observer.unobserve(mainImageRef.current);
            }
        };
    }, []);

    return (
        <div className="Homepage">
            <Header />
            <div ref={mainImageRef} className="Homepage_Mainimage">
                <p>COUPLE SHARE</p>
            </div>
            <div className="Homepage_flex">
                <div ref={(el) => (boxRefs.current[0] = el)} className="Homepage_mainbox">
                    <MainBox title="Couple Matching" name="Go to match" link="/CoupleMatching"
                             className={isVisible[0] ? 'visible' : ''}/>
                    <div ref={(el) => (contentRefs.current[0] = el)} className="CM_content"></div>
                </div>
                <div ref={(el) => (boxRefs.current[1] = el)} className="Homepage_mainbox">
                    <div ref={(el) => (contentRefs.current[1] = el)} className="CM_content2"></div>
                    <MainBox title="Status" name="Go to status" link="/" className={isVisible[1] ? 'visible' : ''}/>
                </div>
                <div ref={(el) => (boxRefs.current[2] = el)} className="Homepage_mainbox">
                    <MainBox title="MyPage" name="Go to mypage" link="/mypage"
                             className={isVisible[2] ? 'visible' : ''}/>
                </div>
            </div>
            <div ref={(el) => (contentRefs.current[2] = el)} className="Homepage_introduce">
                <p>Make Your Own CouplePage</p>
                <button className="Couplepage_createbutton"><Link to="/">Create CouplePage</Link></button>
            </div>
        </div>
    );
};

export default HomePage;
