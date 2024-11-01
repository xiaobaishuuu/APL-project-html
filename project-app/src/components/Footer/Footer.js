import React from "react";
import './Footer.css'

//this is an easy part,just do it okay? only html, no need in jsx
export default function Footer(){
    return (
    <footer>
        <div className="guide">
            <h2>玩家指南</h2>
            <ol>
                <li>點擊卡片即可顯示後面的物體。</li>
                <li>記住所顯示物體的位置。</li>
                <li>嘗試找到並點擊具有相同物件的匹配卡片。</li>
                <li>如果兩張牌匹配,它們將保持翻轉狀態。如果沒有,他們就會翻回去。</li>
                <li>配對所有對子即可完成遊戲!</li>
            </ol>
        </div>
        <div className="aboutus">
            <h2>關於我們</h2>
            <p>我們是一支充滿熱情的遊戲開發團隊,相信有趣學習的力量。 物件配對遊戲是我們在享受樂趣的同時增 強記憶力的舉措之一。 享受遊戲吧!</p>
        </div>
        <h1>© 用於應用學習科-模組5作業</h1>
    </footer>
   );
}