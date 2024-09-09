import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CoupleMatched.css';
import CoupleProfile from "../component/CoupleProfile";
import Header from "./header";

function CoupleMatched({ userProfile, partnerProfile }) {
    const navigate = useNavigate();

    // 개인 프로필 화면으로 이동하는 핸들러
    const handleProfileClick = (profileId) => {
        navigate(`/profile/${profileId}`);
    };

    return (
        <div className="CMn-container">
            <Header/>
            <div className="CMn-SubContainer">

            <div className="CMn-celebration-message">
                <h1>축하합니다! 커플로 매칭되었습니다!</h1> {/* 상단 축하 메시지 */}
            </div>

            {/* 양쪽에 개인 프로필 화면 */}
            <div className="CMn-profiles">

                {/* 사용자 프로필 */}
                <div className="CMn-profile" onClick={() => handleProfileClick(userProfile.id)}>
                    {/*<img src={userProfile.image} alt={userProfile.name} className="CM-profile-image" />*/}
                    {/*<h2>{userProfile.name}</h2>*/}
                    <button className="CMn-profile-button">내 프로필 보기</button>
                </div>

                {/* 파트너 프로필 */}
                <div className="CMn-profile" onClick={() => handleProfileClick(partnerProfile.id)}>
                    {/*<img src={partnerProfile.image} alt={partnerProfile.name} className="CM-profile-image" />*/}
                    {/*<h2>{partnerProfile.name}</h2>*/}
                    <button className="CMn-profile-button">파트너 프로필 보기</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CoupleMatched;

