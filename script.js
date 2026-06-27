const script = [
    // Slide 1 & 2 - Introduction State
    { speaker: "System", text: "are you ready ?", image: "imgs/slide1_bg.png" },
    { speaker: "System", text: "Ron J sent a message!", image: "imgs/1.mp4", showChoices: true },
    
    // --- BRANCH 1: Read Message ---
    // Reusing 1.mp4 through 4.mp4 sequentially across all slides
    // --- BRANCH 1: Read Message ---
    { speaker: "Ron J", text: "All I want to say is.... I'm sorry.", image: "imgs/2.mp4", branch: 1 },
    { speaker: "Ron J", text: "So feel ko lang no, parang ang awkward ng mga nangyayare since yun nga inaasar ka nila sa ibang tao sa harap ko which is okay lang naman. Wala naman akong karapatan e.", image: "imgs/3.mp4", branch: 1 },
    { speaker: "Ron J", text: "Mabilis lng ako maglakad kase magaan paa ko, ganon ako kase may sarili akong dahilan. Pero ni isa don walang dahilan kase shinip ka kay ganto o ganyan. Ewan ko if ganon naiisip mo pero sana wag.", image: "imgs/4.mp4", branch: 1 },
    { speaker: "Ron J", text: "Sorry kase feel ko dahil sakin e parang nalilimitahan mo yung bawat galaw mo, or na fefeel bad ka if shiniship ka sa iba. Pero the thing is I don't care tbh. Live ur life to the fullest and enjoy it, andito lang naman ako palagi bilang kaibigan mo.", image: "imgs/1.mp4", branch: 1 },
    { speaker: "Ron J", text: "Hindi porket mabilis ako maglakad e ibig sabihin may iba na kong iniisip about sa mga ships sayo. All I want to say is wala okay lang, okay lang naman saken di naman ako na aaragabyado or selos.", image: "imgs/2.mp4", branch: 1 },
    { speaker: "Ron J", text: "Okay na 'ko sa kung anong meron sa'tin at gagawin ko 'yong kayamanan, matagal na 'kong hindi umaasa pero hindi ko naman sinabing hindi na 'ko maghihintay.", image: "imgs/3.mp4", branch: 1 },
    { speaker: "Ron J", text: "Alam ko naman na hindi naman ako ung gusto mo at hindi ko pa tanggap yon pero wala naman akong magagawa na kundi tanggapin e, pero hindi ibig sabihin na gusto kita e di kana mag eenjoy ng time with other males.", image: "imgs/4.mp4", branch: 1 },
    { speaker: "Ron J", text: "Ngapala wala akong inaantay o hinihingi na kapalit pag nililibre ko kayo, hindi ko alam bakit pag ako nanlilibre sayo ayaw mo pero sa iba gusto mo e, dun palang as in masakit kahit as a friend.", image: "imgs/1.mp4", branch: 1 },
    { speaker: "Ron J", text: "so ayun lang, sana na clear ko lahat. Masaya ako sayo na may kaibigan kang much better and hindi kupal like me, masaya akong nakikita kang masaya. Dun lang okay na ko, masaya ako for you and please always be happy:)", image: "imgs/2.mp4", branch: 1 },
    { speaker: "Ron J", text: "sorry if limited mga mp.4 ko, ulit ulit kase wala na 'ko magawa.", image: "imgs/2.mp4", branch: 1 },
    { speaker: "Ron J", text: "I'll block u sa soc meds siguro pag sinipag ako para ano ewan bakit pero feel ko isa yon sa mga way na maayos, if need mo ko in person lapitan mo lang ako wag ka mahiya okay. Sana di maging awkward ung mga nangyare.", image: "imgs/1.mp4", branch: 1 },
    { speaker: "System", text: "In summary, wala gusto 'ko lang sumaya ka ng walang iniisip na may masasaktan or what, ayo'ko namang parang ma feel mo na para kang may kinemerut (bf) pero di naman talaga kayo and wala naman talagang meron sainyo tapos ganto pa umasta para namang tanga. So ayun gusto 'ko lang ma enjoy mo buhay mo. Wala sanang awkwardness and also please live ur life to the fullest.", image: "imgs/1.mp4", branch: 1 },
    { speaker: "Ron J", text: "Good Bye, thankyou, goodluck and always ingat Zhi, Tal, Batal, and Maasim:D", image: "imgs/4.mp4", isFinal: true, branch: 1 },
    
    // --- BRANCH 2: Close It ---
    { speaker: "System", text: "Terminal transmission closed gracefully.", image: "imgs/slide1_bg.png", isFinal: true, branch: 2 }
];

let currentIndex = 0;
let currentBranch = 0; 
let typingTimer;

const dialogueEl = document.getElementById("dialogue");
const speakerEl = document.getElementById("speaker-name");
const sceneImgEl = document.getElementById("scene-img");
const sceneVideoEl = document.getElementById("scene-video");
const choicesEl = document.getElementById("choices");
const arrowEl = document.getElementById("arrow");
const textBoxEl = document.getElementById("text-box");
const titleOverlayEl = document.getElementById("title-overlay");
const choice1Btn = document.getElementById("choice-1");
const choice2Btn = document.getElementById("choice-2");
const gameContainer = document.getElementById("game-container");
const exitScreen = document.getElementById("exit-screen");

function typeText(text) {
    dialogueEl.innerHTML = "";
    let i = 0;
    clearInterval(typingTimer);
    typingTimer = setInterval(() => {
        if (i < text.length) {
            dialogueEl.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingTimer);
        }
    }, 20);
}

function nextScript() {
    if (script[currentIndex].showChoices && currentBranch === 0) return;

    if (script[currentIndex].isFinal) {
        triggerExit();
        return;
    }

    if (currentIndex === 0 && titleOverlayEl) {
        titleOverlayEl.style.opacity = "0";
        setTimeout(() => titleOverlayEl.style.display = "none", 500);
    }

    currentIndex++;

    while (currentIndex < script.length && script[currentIndex].branch && script[currentIndex].branch !== currentBranch) {
        currentIndex++;
    }

    if (currentIndex < script.length) {
        updateUI();
    }
}

function updateUI() {
    const currentLine = script[currentIndex];
    speakerEl.innerText = currentLine.speaker;
    
    if (currentLine.image) {
        const isVideo = currentLine.image.endsWith('.mp4');
        
        if (isVideo) {
            sceneImgEl.style.display = "none";
            sceneVideoEl.style.display = "block";
            
            if (sceneVideoEl.getAttribute('src') !== currentLine.image) {
                sceneVideoEl.src = currentLine.image;
                sceneVideoEl.play().catch(err => console.log("Video setup loop feedback:", err));
            }
        } else {
            sceneVideoEl.style.display = "none";
            sceneVideoEl.pause();
            sceneVideoEl.removeAttribute('src'); 
            sceneImgEl.style.display = "block";
            sceneImgEl.src = currentLine.image;
        }
    }
    
    typeText(currentLine.text);

    if (currentLine.showChoices) {
        choicesEl.style.display = "flex";
        arrowEl.style.display = "none";
    } else {
        choicesEl.style.display = "none";
        arrowEl.style.display = "block";
        arrowEl.innerText = currentLine.isFinal ? "❌ Exit Game" : "▼ Click to continue";
    }
}

function makeChoice(branchId) {
    currentBranch = branchId;
    nextScript();
}

function triggerExit() {
    gameContainer.style.display = "none";
    exitScreen.style.display = "flex";
}

textBoxEl.addEventListener("click", nextScript);
choice1Btn.addEventListener("click", (e) => { e.stopPropagation(); makeChoice(1); });
choice2Btn.addEventListener("click", (e) => { e.stopPropagation(); makeChoice(2); });

updateUI();
