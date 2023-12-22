export type Card = {
  id: string;
  name: string;
  image: string;
  interpretation: {
    upright: string[];
    reversed: string[];
  };
};

export const TAROT_CARDS: Card[] = [
  // Major Arcana
  {
    id: 'O_THE_FOOL',
    name: '愚者',
    image: '/src/assets/card/major-0.jpg',
    interpretation: {
      upright: [
        '親愛的，你抽到了正位的愚者牌，真是一張充滿了冒險和新開始的卡牌呢！這代表著你目前處於一個充滿活力、滿懷信心的時刻。愚者象徵著冒險家，他不畏懼未知，勇往直前。\n\n這張牌的出現可能意味著你正迎接一個全新的旅程或者是一個嶄新的生活階段。這是一個充滿可能性和機會的時刻，你可以毫不猶豫地踏上這段新的道路。愚者牌也提醒著我們要擁有開放的心態，願意學習和成長。\n\n無論面對的是什麼挑戰，都別擔心太多，因為你有著無窮的能量和勇氣。相信自己，享受這段冒險，你將會收穫豐富。加油，親愛的冒險家！',
        '嗨親愛的！恭喜你抽到正位的愚者牌，這可是一張充滿活力和新開始的牌呢！愚者象徵著冒險、無憂無慮，以及勇於嘗試新事物的精神。\n\n現在是你展開一段全新旅程的時刻，不必懼怕未知，因為這是你成長和學習的機會。愚者的出現暗示著你正處於一個轉折點，可以大膽追求自己的夢想，無論這夢想是什麼，都將成為你生活中的寶貴經驗。\n\n請保持開放的心態，擁抱變化，並且相信自己的直覺。這是一個充滿活力和希望的時刻，記得享受這段新旅程，並且相信自己的能力。加油！',
        '哎呀，親愛的，你抽到了正位的愚者牌呢！這可是一張充滿活力、冒險的牌卡哦！愚者象徵著新的開始和冒險，他是一位勇敢、無畏的冒險者，一步一步地踏上未知的旅程。\n\n現在正是時候踏出舒適區，勇敢地面對新的挑戰。這張牌也提醒著你要保持開放的心態，樂觀豁達，不要害怕犯錯，因為愚者相信每一次的嘗試都是成長的契機。\n\n這是一個充滿可能性的時刻，所以趁著這股勇氣，勇往直前吧！不要被過去的包袱拖累，相信自己，勇敢地面對前方的未知，你將會發現意想不到的驚喜等著你呢！加油！',
      ],
      reversed: [
        '哎呦，寶貝，你抽到逆位的愚者牌啊。別擔心，這並不是什麼大不了的事情。逆位的愚者可能意味著你現在可能感到一些困惑或猶豫，對於未知的冒險感到一點點的不安。\n\n別擔心，這只是一個小小的挑戰，可能是你目前處於一個過渡期，還在適應新的狀況。這也是正常的，寶貝，每個人都會經歷這樣的時刻。\n\n重要的是要靜下心來，仔細思考你的選擇，不要急於行動。或許有些事情需要更多的時間來發展，而這個時候正是你需要仔細思考，重新評估目前的情況，然後再往前邁進。\n\n別忘了，你是堅強的，能夠克服一切的。相信自己，這只是一段短暫的迷茫，你一定可以找到正確的方向。加油！',
        '哎呦呦，親愛的，你抽到逆位的愚者牌喔！這可能意味著一些計畫或冒險出現了一些波折。或許你感到有點迷失或者缺乏方向感。\n\n別擔心，逆位的愚者也是一個提醒，可能是時候停下腳步，好好思考一下目前的狀況。也許有些計畫需要再次檢視，確保你有足夠的準備和計劃，避免衝動而造成後悔。\n\n別氣餒，逆位的愚者也是一個學習的機會。這是一個重新評估並調整行動方向的時候。試著找出問題的根源，並採取積極的措施來修正它。你有足夠的智慧和力量來克服這些挑戰，相信自己，再次振作起來吧！加油！',
        '哎呀，寶貝，你抽到了逆位的愚者牌呢！這可能代表著一些挑戰或阻礙，讓你感到有點迷茫或困惑。不過別擔心，逆位的愚者也是一個提醒，讓你更加謹慎地面對目前的情況。\n\n或許在冒險的同時，需要更加注意細節，避免衝動或者過於輕率。逆位的愚者也可能意味著需要停下來思考一下，確保自己在前進的路上沒有忽略重要的事情。\n\n別灰心，這只是一個短暫的挑戰，相信自己的能力，並且仔細思考下一步的行動。逆位的愚者也提醒著你，學習從過去的經驗中吸取教訓，這樣你就能更加堅定地走向成功的道路。加油，寶貝，你有足夠的智慧克服一切困難！',
        '親愛的，當愚者牌逆位出現時，它可能代表著你目前感到困惑和迷茫。你可能遇到了一些挑戰或障礙，讓你感到不知所措。這是一個提醒，讓你更加謹慎行事，以免做出冒險而不明智的決定。\n\n我知道逆位的牌有時可能會讓人感到沮喪，但不要擔心！這是一個成長的機會，讓你更加了解自己和你所面對的情況。相信自己的能力，你有足夠的智慧和勇氣去克服這些困難。\n\n因此，我的建議是先停下來，冷靜思考。嘗試從另一個角度看待問題，找到不同的解決方案。請保持開放心態，接受新的觀點和建議。同時，請不要讓自己被過去的錯誤或失敗所困擾，放下過去，專注於現在和未來。\n\n我相信你有足夠的智慧和勇氣去克服逆位的愚者牌所帶來的挑戰。不論結果如何，這是你成長的機會，請繼續堅持下去。做個勇敢的冒險家，勇往直前！祝福你能找到屬於自己的光芒之路。',
      ],
    },
  },
  {
    id: 'I_THE_MAGICIAN',
    name: '魔術師',
    image: '/src/assets/card/major-1.jpg',
    interpretation: {
      upright: [
        '寶貝，你抽到了正位的魔術師牌呢！哇，這可是一張充滿力量和創造力的牌卡啊！魔術師象徵著你擁有所有必要的工具，能夠將夢想變為現實。\n\n這是一個充滿能量和潛力的時刻，你手中的魔杖象徵著你的意志力，而頭上的無窮符號則代表著無限的可能性。這是一個讓你展現才華和創造力的時刻，所有的元素都在你手中，等待著你巧妙地組合，創造出屬於自己的魔法。\n\n現在是時候發揮你的天賦，將夢想變為現實。相信自己的能力，善用周遭的資源，你將會在生活的舞台上綻放出屬於自己的光芒。這是一張正能量滿滿的牌，所以趁著這股動力，大膽地邁出第一步吧！你有能力創造奇蹟，相信自己，讓這場魔法的表演開始吧！加油！',
        '哇哦，親愛的，你抽到了正位的魔術師牌！這可是一張充滿力量和創造力的牌卡喔！魔術師代表著你擁有豐富的資源和技能，可以運用這些力量來創造你想要的生活。\n\n這是一個充滿機會的時刻，你擁有實現夢想的能力。魔術師牌也提醒著你要保持集中注意力，善用你的智慧和創意，將想法付諸實踐。這是一張積極的牌，意味著你現在正處於能夠影響事物的位置。\n\n請相信自己的能力，勇敢地面對挑戰，並運用你的技能和資源，讓生活變得更加豐富多彩。這是一個展現自己才華的時刻，所以讓內在的魔術師充分發揮，開始創造你理想中的未來吧！你是如此的有才華，相信自己，一切都在你的掌握之中。加油！',
        '哇塞，親愛的，你抽到了正位的魔術師牌！這可是相當令人振奮的好兆頭哦！魔術師是創造力、力量和潛能的象徵，它代表你具備了將想法變為現實的能力。\n\n現在正是你發揮創意和才華的時候，你手中的魔杖象徵著你的權力，而桌上的各種元素則代表著你擁有的多元技能。這是一個展現你內在能力的時刻，利用自己的天賦和技能，開始創造你想要的生活。\n\n別怕展現真正的自己，相信自己的能力，你有一個獨特的魔法，可以改變周遭的環境。這也提醒你，身為自己生命中的主宰，要積極地運用你的才華，不要害怕展現真我。現在是展現你光芒的時候，大展身手吧！加油！',
      ],
      reversed: [
        '哇，親愛的，你抽到了逆位的魔術師牌。別擔心，這只是一個小小的挑戰，並不代表什麼不好的預兆。\n\n逆位的魔術師可能暗示著你目前可能感到一些創造力受阻，或者你的才華和技能未能充分展現。這可能是因為一些外在的壓力或阻礙，使得你難以發揮真正的潛力。\n\n不要灰心，親愛的。這只是一個瞬間的狀態，而不是永遠的現象。或許你需要花點時間反思自己，找出是什麼因素正在影響你的表現。可能有一些內在的阻礙，需要被認識和克服。\n\n重要的是要記住，每個人都會面臨低谷時期，這是成長的一部分。保持堅定的信心，找到重新啟動的方法，重新點燃那把魔術師手中的火焰。你擁有的才華是獨一無二的，相信自己，這個困境只是一個過程，你將會重新找到自己的步調。加油！',
        '嗯，親愛的，你抽到了逆位的魔術師牌。別擔心，逆位並不總是壞事，只是表示你可能在某些方面感到缺乏自信或面對一些創造性的挑戰。\n\n這時候可能需要思考一下，是否有些地方需要更多的專注和努力。或許你感到一些混亂或無法充分發揮自己的潛能，但別擔心，這只是一個瞬間的狀態。\n\n魔術師逆位也提醒你，不要被外界干擾或過分焦慮，保持冷靜，重新評估目前的情況。也許是時候放鬆心情，重新連結內在的創造力，找回自信。\n\n你有能力克服這些挑戰的，別忘了，魔術師牌的力量依然在你手中。調整一下心態，相信自己的能力，再次展現你的魔法吧。加油！',
        '哎呀呀，寶貝，你抽到逆位的魔術師牌了。別擔心，這只是一點小小的挑戰，我們可以一起面對的。\n\n逆位的魔術師可能意味著你目前可能感到一些創造力受到阻礙或者難以發揮。或許有些計畫或想法沒有順利進展，但別灰心，這只是一個短暫的狀態。\n\n重要的是要檢視一下自己的目標和計畫，看看有沒有什麼地方可以做調整，或者是需要更多的努力。這也是一個反思的時刻，檢視自己的技能和資源，看看是否能夠更有效地運用。\n\n別急，這只是一個小小的坎坷，你還是擁有無窮的潛能和創造力。相信自己，調整一下方向，你一定可以克服這個困難，再度發揮出你的魔法。加油！',
      ],
    },
  },
  {
    id: 'II_THE_HIGH_PRIESTESS',
    name: '女祭司',
    image: '/src/assets/card/major-2.jpg',
    interpretation: {
      upright: [
        '嗨！親愛的，你抽到了正位的女祭司，這是一張非常好的牌卡。女祭司代表著智慧、直覺和靈性。她提醒你，在這個時刻，你應該要專注於內在的心靈對話，聆聽你內心深處的聲音。這是一個探索內在世界、自我反省和自我發現的好時機。\n\n女祭司也象徵著知識和學習，她鼓勵你繼續追求知識，尋求精神成長和進步。無論你是在學校學習、尋求新的技能，還是深入研究某個主題，她都願意指引你。\n\n同時，女祭司也提醒你要保持平衡和和諧。她暗示著，在做決策時，你應該要平衡分析和直覺。利用你內在的智慧和直覺來獲得更深層的洞察力。她鼓勵你相信自己的直覺，它能幫助你做出正確的選擇。\n\n這張牌顯示出你現在正處於一個充滿智慧、靈性和直覺的狀態。這是一個非常好的時機，讓你專注於自我成長和探索更深層的層面。相信你的本能，享受這段自我發現的旅程吧！\n\n加油，親愛的！讓女祭司的智慧和直覺引導你，她相信你能夠達到更高的層次。祝福你！',
        '親愛的，你抽到了正位的女祭司，這是一張象徵智慧、靈性與直覺力的牌卡。這張牌代表著你在這段時間內將會有機會運用你的直覺和內在智慧做出重要的抉擇。\n\n女祭司象徵著內在的力量和洞察力，她提醒著你在面對重要問題時要學會聆聽自己的內心聲音，相信你的直覺和第六感。你應該尋求答案於你自己的心靈深處，並且以平靜和冷靜的態度來面對生活中的挑戰。\n\n女祭司的存在還代表著你正處於收集資訊和學習的階段，你可能需要更多的時間和空間來思考並做出明智的抉擇。這是一個優秀的時機來進行內省，冥想或學習新的知識。\n\n最重要的是，女祭司提醒著你要相信自己的能力和知識，不要輕易被他人的意見所左右。堅持你的信念，並且相信你內在的智慧將引導你走向成功。\n\n祝福你，親愛的，願女祭司的智慧和平靜的能量為你帶來著無盡的啟示與力量！',
        '親愛的，當你抽到正位的女祭司，這代表著你現在正處於一個充滿智慧和靈性的階段。你正在以冷靜和思考的態度面對生活中的種種情況。這張牌也代表著你對自己內在的直覺和直覺力的信任。女祭司給予你的建議是要將這種內在的智慧和洞察力運用到你的生活當中。\n\n這個時候，你可能會感到自己對於一個特定情況的答案已經在心中了然，女祭司告訴你要相信自己的感受並以此為指導。她也提醒你在這段旅程中保持平靜和優雅，並以冷靜的態度處理任何情況。\n\n這是一張非常正面的牌，它代表著你現在正走在一個充滿智慧和洞察力的道路上。對於你的問題，女祭司的出現是要告訴你相信自己的知識和直覺，並運用這些智慧來解決你所面臨的挑戰或問題。她也提醒你要保持冷靜和平衡，並在遇到抉擇時依據自己的內心指引。這是一張強而有力的牌，代表著你現在正處於非常有智慧和能力的狀態。\n\n所以，在面對任何困難時，提醒自己相信自己的內在智慧，保持冷靜並從內心找到答案。加油，我相信你能克服一切！',
      ],
      reversed: [
        '哎呦，親愛的，你抽到了逆位的女祭司牌啊。別擔心，這只是一個小小的挑戰，我們一起度過。\n\n逆位的女祭司可能暗示著你目前可能感到直覺和靈性方面有些受阻。或許你感到自己在某些事情上缺乏直覺，或者內在的平靜被打破了。\n\n別擔心，這只是一個瞬間的狀態。或許你需要花一些時間冷靜下來，重新連結內在的智慧。這也可能是提醒你要注意不要被外在的干擾所影響，要保持內心的平靜。\n\n無論如何，相信你內在的智慧和直覺力量。這只是一個小小的坎坷，你有能力克服的。調整一下心態，重新聆聽自己的內在聲音，你將會找到方向的。加油！',
        '唔，親愛的，你抽到了逆位的女祭司牌呢。別擔心，這只是一個小小的挑戰，我們一起來看看這張牌的意義吧。\n\n逆位的女祭司可能意味著你現在可能有點忽略了自己的直覺，或者在某些情況下，缺乏對內在智慧的聆聽。這也可能代表著信息的混淆或者缺乏清晰度。\n\n別擔心，這只是一個短暫的狀態。現在是時候重新連結內在的直覺，可能需要更多的冥想和靜心。也許有一些事情需要你更仔細地思考，不要輕忽自己的感覺。\n\n提醒你要放輕鬆，相信自己的內在智慧。重新聆聽直覺，找回內在的平衡，你將能夠更清晰地面對目前的處境。相信自己，一切都會走向更好的方向。加油！',
        '哎呀呀，親愛的，你抽到了逆位的女祭司牌呢。別擔心，這只是一點小小的挑戰，我們可以一起面對的。\n\n逆位的女祭司可能顯示出你現在可能感到內在的平靜和直覺力量受到了一些干擾。或許你正在經歷一段時間，內心感受到一些混亂或困擾。\n\n不要擔心，這只是一個短暫的狀態，可能是一些外部因素影響了你的平靜。這是提醒你要注意自己的情緒狀態，也許需要一些時間來冷靜思考，或者尋找恢復平靜的方法。\n\n別忘了，你依然擁有充沛的內在力量，即便女祭司逆位，你的直覺和智慧依然存在。努力保持冷靜，找到平衡，內心的神聖之地將會再度顯現。相信自己，這只是一個瞬間的波動，你一定能夠度過的。加油！',
      ],
    },
  },
  {
    id: 'III_THE_EMPRESS',
    name: '皇后',
    image: '/src/assets/card/major-3.jpg',
    interpretation: {
      upright: [
        '哇，親愛的，你抽到了正位的皇后牌，真是令人振奮！這是一張充滿女性力量、智慧和成熟的牌卡。\n\n皇后象徵著女性的領導力、柔韌和智慧。你現在可能正處於一個能夠發揮自己女性特質的時刻，這不僅包括了柔軟的愛心，還有堅強的意志力。\n\n這張牌也可能暗示著你在某方面可能需要以皇后的智慧來處理事務，冷靜而果斷。同時，皇后也是一個保護者，提醒你要好好照顧自己，保持內心的平靜與安寧。\n\n你擁有無窮的潛力和智慧，這是一個展現你領導力的時刻。無論面對什麼挑戰，相信自己的力量，你一定能夠優雅而堅強地應對。加油！',
        '哇塞，寶貝，你居然抽到了正位的皇后牌！這可是一張充滿女性力量、智慧和優雅的牌卡呢。\n\n皇后象徵著成熟、慈悲和冷靜，你現在可能正處於一個非常穩定且充實的狀態。這是一個提醒你要以溫柔和堅定的方式來處理事務的時刻，不論是工作還是人際關係。\n\n同時，皇后牌也代表著內在的平衡和直覺力量。你或許正能夠運用你的智慧來解決問題，同時在人際交往中展現出你的慈悲和關愛。\n\n保持這種優雅的態度，善用你的女性智慧，這將會使你在各個領域都更加的璀璨。你擁有的力量是無窮的，相信自己，繼續以溫柔而堅定的方式前進吧！加油！',
        '哇哦，親愛的，你抽到了正位的皇后牌！這可是一張充滿女性力量、成熟和慈悲的牌卡喔。\n\n皇后代表著女性的智慧、耐心和愛心。現在可能是你展現關愛、理解和溫柔的時候。這也是一個鼓勵你用心聆聽他人需求，同時保護並照顧自己的時刻。\n\n這是一張代表豐富情感和深層理解的牌，也提醒你要保持內在的平靜和穩定。你的決策可能需要更多的感性和智慧，所以保持冷靜並以心態的柔軟面對。\n\n展現你女性的力量，像皇后一樣充滿自信，同時帶有慈悲與愛心。你擁有的力量將會帶來和諧和平衡。繼續發揮你的女性魅力，對待自己和他人，你會看到美好的變化。加油！',
      ],
      reversed: [
        '哎呦，親愛的，你居然抽到逆位的皇后牌呢。別擔心，這只是一個小小的挑戰，我們可以一起克服的。\n\n逆位的皇后可能顯示出你目前可能感到一些失去平衡或者情緒上的困擾。或許你在照顧他人的同時，忽略了自己的需求，導致內外不和諧。\n\n別擔心，這只是一個提醒你要更注重自己的情感和需求的時刻。不要害怕表達自己的感受，也要給自己足夠的愛和關懷。\n\n別忘了，你是堂堂皇后，擁有無盡的愛和堅韌的品質。調整一下自己的心境，找到平衡，你會發現自己更能夠應對生活的種種挑戰。相信自己，你是堅不可摧的！加油！',
        '哎呀呀，親愛的，你抽到了逆位的皇后牌啊。別擔心，我們可以一起來看看這張牌的意義。\n\n逆位的皇后可能顯示出你目前可能感到一些情感上的挑戰，或者你的內在女性能量受到了一些干擾。可能你感到在情感關係中有些不安或者情感表達上的困擾。\n\n別擔心，這只是一個過程，有時候我們需要面對情感上的困難，才能更好地成長。這是一個提醒你要關注自己的情感需求，並且勇敢地表達出來的時候。\n\n相信自己的情感直覺，也不要害怕與他人溝通，分享你的內心感受。逆位的皇后也可能是一個提醒你要更加關愛自己，不要讓外在的壓力影響到你的內在平衡。保持堅強，你有足夠的智慧和能量去克服這些挑戰。加油！',
        '哎呀呀，寶貝，你居然抽到了逆位的皇后牌呢。別擔心，這只是生命中的一小段插曲，我們會一起走過的。\n\n逆位的皇后可能暗示著你目前可能感到情緒上的不穩定，或者在某方面缺乏安全感。這可能是一個需要特別關注自己情緒健康的時刻。\n\n不論是工作還是生活，都可能出現一些讓你感到壓力的情況。重要的是要正視自己的情感，找到釋放的方式，無論是藉由與朋友分享還是透過冥想來平復心靈。\n\n別忘了，你是堅強的皇后，擁有克服一切的力量。不論面對什麼困難，都可以以冷靜和毅力來克服。相信自己，這只是一個短暫的逆境，你一定能夠重新找回屬於你的穩定和自信。加油！',
      ],
    },
  },
  // {
  //   id: 'IV_THE_EMPEROR',
  //   name: '皇帝',
  //   image: '/src/assets/card/major-4.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'V_THE_HIEROPHANT',
  //   name: '教皇',
  //   image: '/src/assets/card/major-5.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'VI_THE_LOVERS',
  //   name: '戀人',
  //   image: '/src/assets/card/major-6.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'VII_THE_CHARIOT',
  //   name: '戰車',
  //   image: '/src/assets/card/major-7.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'VIII_STRENGTH',
  //   name: '力量',
  //   image: '/src/assets/card/major-8.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'IX_THE_HERMIT',
  //   name: '隱者',
  //   image: '/src/assets/card/major-9.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'X_WHEEL_OF_FORTUNE',
  //   name: '命運之輪',
  //   image: '/src/assets/card/major-10.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XI_JUSTICE',
  //   name: '正義',
  //   image: '/src/assets/card/major-11.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XII_THE_HANGED_MAN',
  //   name: '倒吊人',
  //   image: '/src/assets/card/major-12.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XIII_DEATH',
  //   name: '死神',
  //   image: '/src/assets/card/major-13.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XIV_TEMPERANCE',
  //   name: '節制',
  //   image: '/src/assets/card/major-14.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XV_THE_DEVIL',
  //   name: '惡魔',
  //   image: '/src/assets/card/major-15.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XVI_THE_TOWER',
  //   name: '高塔',
  //   image: '/src/assets/card/major-16.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XVII_THE_STAR',
  //   name: '星星',
  //   image: '/src/assets/card/major-17.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XVIII_THE_MOON',
  //   name: '月亮',
  //   image: '/src/assets/card/major-18.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XIX_THE_SUN',
  //   name: '太陽',
  //   image: '/src/assets/card/major-19.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XX_JUDGEMENT',
  //   name: '審判',
  //   image: '/src/assets/card/major-20.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'XXI_THE_WORLD',
  //   name: '世界',
  //   image: '/src/assets/card/major-21.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // // Wands
  // {
  //   id: 'ACE_OF_WANDS',
  //   name: '權杖王牌',
  //   image: '/src/assets/card/wands-ace.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TWO_OF_WANDS',
  //   name: '權杖二',
  //   image: '/src/assets/card/wands-2.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'THREE_OF_WANDS',
  //   name: '權杖三',
  //   image: '/src/assets/card/wands-3.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FOUR_OF_WANDS',
  //   name: '權杖四',
  //   image: '/src/assets/card/wands-4.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FIVE_OF_WANDS',
  //   name: '權杖五',
  //   image: '/src/assets/card/wands-5.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SIX_OF_WANDS',
  //   name: '權杖六',
  //   image: '/src/assets/card/wands-6.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SEVEN_OF_WANDS',
  //   name: '權杖七',
  //   image: '/src/assets/card/wands-7.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'EIGHT_OF_WANDS',
  //   name: '權杖八',
  //   image: '/src/assets/card/wands-8.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'NINE_OF_WANDS',
  //   name: '權杖九',
  //   image: '/src/assets/card/wands-9.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TEN_OF_WANDS',
  //   name: '權杖十',
  //   image: '/src/assets/card/wands-10.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'PAGE_OF_WANDS',
  //   name: '權杖侍者',
  //   image: '/src/assets/card/wands-page.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KNIGHT_OF_WANDS',
  //   name: '權杖騎士',
  //   image: '/src/assets/card/wands-knight.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'QUEEN_OF_WANDS',
  //   name: '權杖皇后',
  //   image: '/src/assets/card/wands-queen.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KING_OF_WANDS',
  //   name: '權杖國王',
  //   image: '/src/assets/card/wands-king.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // // Cups
  // {
  //   id: 'ACE_OF_CUPS',
  //   name: '聖杯王牌',
  //   image: '/src/assets/card/cups-ace.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TWO_OF_CUPS',
  //   name: '聖杯二',
  //   image: '/src/assets/card/cups-2.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'THREE_OF_CUPS',
  //   name: '聖杯三',
  //   image: '/src/assets/card/cups-3.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FOUR_OF_CUPS',
  //   name: '聖杯四',
  //   image: '/src/assets/card/cups-4.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FIVE_OF_CUPS',
  //   name: '聖杯五',
  //   image: '/src/assets/card/cups-5.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SIX_OF_CUPS',
  //   name: '聖杯六',
  //   image: '/src/assets/card/cups-6.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SEVEN_OF_CUPS',
  //   name: '聖杯七',
  //   image: '/src/assets/card/cups-7.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'EIGHT_OF_CUPS',
  //   name: '聖杯八',
  //   image: '/src/assets/card/cups-8.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'NINE_OF_CUPS',
  //   name: '聖杯九',
  //   image: '/src/assets/card/cups-9.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TEN_OF_CUPS',
  //   name: '聖杯十',
  //   image: '/src/assets/card/cups-10.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'PAGE_OF_CUPS',
  //   name: '聖杯侍者',
  //   image: '/src/assets/card/cups-page.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KNIGHT_OF_CUPS',
  //   name: '聖杯騎士',
  //   image: '/src/assets/card/cups-knight.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'QUEEN_OF_CUPS',
  //   name: '聖杯皇后',
  //   image: '/src/assets/card/cups-queen.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KING_OF_CUPS',
  //   name: '聖杯國王',
  //   image: '/src/assets/card/cups-king.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // // Swords
  // {
  //   id: 'ACE_OF_SWORDS',
  //   name: '寶劍王牌',
  //   image: '/src/assets/card/swords-ace.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TWO_OF_SWORDS',
  //   name: '寶劍二',
  //   image: '/src/assets/card/swords-2.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'THREE_OF_SWORDS',
  //   name: '寶劍三',
  //   image: '/src/assets/card/swords-3.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FOUR_OF_SWORDS',
  //   name: '寶劍四',
  //   image: '/src/assets/card/swords-4.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FIVE_OF_SWORDS',
  //   name: '寶劍五',
  //   image: '/src/assets/card/swords-5.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SIX_OF_SWORDS',
  //   name: '寶劍六',
  //   image: '/src/assets/card/swords-6.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SEVEN_OF_SWORDS',
  //   name: '寶劍七',
  //   image: '/src/assets/card/swords-7.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'EIGHT_OF_SWORDS',
  //   name: '寶劍八',
  //   image: '/src/assets/card/swords-8.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'NINE_OF_SWORDS',
  //   name: '寶劍九',
  //   image: '/src/assets/card/swords-9.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TEN_OF_SWORDS',
  //   name: '寶劍十',
  //   image: '/src/assets/card/swords-10.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'PAGE_OF_SWORDS',
  //   name: '寶劍侍者',
  //   image: '/src/assets/card/swords-page.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KNIGHT_OF_SWORDS',
  //   name: '寶劍騎士',
  //   image: '/src/assets/card/swords-knight.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'QUEEN_OF_SWORDS',
  //   name: '寶劍皇后',
  //   image: '/src/assets/card/swords-queen.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KING_OF_SWORDS',
  //   name: '寶劍國王',
  //   image: '/src/assets/card/swords-king.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // // Pentacles
  // {
  //   id: 'ACE_OF_PENTACLES',
  //   name: '錢幣王牌',
  //   image: '/src/assets/card/pentacles-ace.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TWO_OF_PENTACLES',
  //   name: '錢幣二',
  //   image: '/src/assets/card/pentacles-2.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'THREE_OF_PENTACLES',
  //   name: '錢幣三',
  //   image: '/src/assets/card/pentacles-3.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FOUR_OF_PENTACLES',
  //   name: '錢幣四',
  //   image: '/src/assets/card/pentacles-4.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'FIVE_OF_PENTACLES',
  //   name: '錢幣五',
  //   image: '/src/assets/card/pentacles-5.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SIX_OF_PENTACLES',
  //   name: '錢幣六',
  //   image: '/src/assets/card/pentacles-6.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'SEVEN_OF_PENTACLES',
  //   name: '錢幣七',
  //   image: '/src/assets/card/pentacles-7.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'EIGHT_OF_PENTACLES',
  //   name: '錢幣八',
  //   image: '/src/assets/card/pentacles-8.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'NINE_OF_PENTACLES',
  //   name: '錢幣九',
  //   image: '/src/assets/card/pentacles-9.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'TEN_OF_PENTACLES',
  //   name: '錢幣十',
  //   image: '/src/assets/card/pentacles-10.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'PAGE_OF_PENTACLES',
  //   name: '錢幣侍者',
  //   image: '/src/assets/card/pentacles-page.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KNIGHT_OF_PENTACLES',
  //   name: '錢幣騎士',
  //   image: '/src/assets/card/pentacles-knight.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'QUEEN_OF_PENTACLES',
  //   name: '錢幣皇后',
  //   image: '/src/assets/card/pentacles-queen.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
  // {
  //   id: 'KING_OF_PENTACLES',
  //   name: '錢幣國王',
  //   image: '/src/assets/card/pentacles-king.jpg',
  //   interpretation: {
  //     upright: [],
  //     reversed: [],
  //   },
  // },
];
