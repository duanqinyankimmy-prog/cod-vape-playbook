/**
 * 签收后复购激活模块 — RepurchaseModule
 * 8个时间节点 × 6语言话术 × 中文对照
 * 设计：绿色复购漏斗，时间轴视觉流
 */

import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp, RefreshCw, MessageCircle, BookOpen, Clock, Star, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import type { LangKey } from "./sectionTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RepurchaseNode {
  id: string;
  timing: string;           // 发送时机
  timingEn: string;
  goal: string;             // 本节点目标
  conversionRate: string;   // 预计转化率
  keyTactic: string;        // 核心策略一句话
  tips: string[];           // 操作要点
  psychology: string[];     // 用户心理
  scripts: Record<LangKey, string>;
  zh: string;
  color: "green" | "blue" | "orange" | "purple" | "rose" | "teal" | "amber" | "indigo";
}

// ─── Color map ────────────────────────────────────────────────────────────────

const COLOR_MAP = {
  green:  { bg: "bg-emerald-50",  border: "border-emerald-200 hover:border-emerald-300", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", bar: "bg-emerald-500", header: "text-emerald-700", icon: "text-emerald-500" },
  blue:   { bg: "bg-blue-50",     border: "border-blue-200 hover:border-blue-300",       badge: "bg-blue-100 text-blue-700",       dot: "bg-blue-500",    bar: "bg-blue-500",    header: "text-blue-700",    icon: "text-blue-500" },
  orange: { bg: "bg-orange-50",   border: "border-orange-200 hover:border-orange-300",   badge: "bg-orange-100 text-orange-700",   dot: "bg-orange-500",  bar: "bg-orange-500",  header: "text-orange-700",  icon: "text-orange-500" },
  purple: { bg: "bg-purple-50",   border: "border-purple-200 hover:border-purple-300",   badge: "bg-purple-100 text-purple-700",   dot: "bg-purple-500",  bar: "bg-purple-500",  header: "text-purple-700",  icon: "text-purple-500" },
  rose:   { bg: "bg-rose-50",     border: "border-rose-200 hover:border-rose-300",       badge: "bg-rose-100 text-rose-700",       dot: "bg-rose-500",    bar: "bg-rose-500",    header: "text-rose-700",    icon: "text-rose-500" },
  teal:   { bg: "bg-teal-50",     border: "border-teal-200 hover:border-teal-300",       badge: "bg-teal-100 text-teal-700",       dot: "bg-teal-500",    bar: "bg-teal-500",    header: "text-teal-700",    icon: "text-teal-500" },
  amber:  { bg: "bg-amber-50",    border: "border-amber-200 hover:border-amber-300",     badge: "bg-amber-100 text-amber-700",     dot: "bg-amber-500",   bar: "bg-amber-500",   header: "text-amber-700",   icon: "text-amber-500" },
  indigo: { bg: "bg-indigo-50",   border: "border-indigo-200 hover:border-indigo-300",   badge: "bg-indigo-100 text-indigo-700",   dot: "bg-indigo-500",  bar: "bg-indigo-500",  header: "text-indigo-700",  icon: "text-indigo-500" },
};

// ─── Language metadata ────────────────────────────────────────────────────────

const LANG_META: Record<LangKey, { label: string; flag: string }> = {
  en: { label: "English",   flag: "🇬🇧" },
  ro: { label: "Română",    flag: "🇷🇴" },
  pl: { label: "Polski",    flag: "🇵🇱" },
  hu: { label: "Magyar",    flag: "🇭🇺" },
  pt: { label: "Português", flag: "🇵🇹" },
  cs: { label: "Čeština",   flag: "🇨🇿" },
};

// ─── Repurchase nodes data ────────────────────────────────────────────────────

const repurchaseNodes: RepurchaseNode[] = [
  {
    id: "T+1",
    timing: "签收后 24 小时内",
    timingEn: "Within 24h of delivery",
    goal: "确认体验，建立情感连接",
    conversionRate: "28%",
    keyTactic: "主动关心体验感受，不急于推销，先建立情感账户",
    tips: [
      "签收后24小时内发送，趁热打铁。",
      "问开放式问题，让用户自己说好。",
      "不要立即推销，先建立情感连接。",
    ],
    psychology: ["刚收到货，新鲜感最强", "如果体验好，愿意分享", "这时候最容易建立品牌好感"],
    scripts: {
      en: `Hey [Name]! 👋\n\nJust checking in — did your CLOUD VAPE arrive okay? 📦\n\nHow's the [FLAVOR] treating you so far? 😊\n\nWe put a lot of care into every order, so your feedback means the world to us!\n\nAnything you love? Anything we can improve? 🙏`,
      ro: `Hei [Nume]! 👋\n\nVerific doar — a ajuns bine CLOUD VAPE-ul tău? 📦\n\nCum te descurci cu [AROMĂ] până acum? 😊\n\nPunem multă grijă în fiecare comandă, deci feedback-ul tău înseamnă enorm pentru noi!\n\nCeva ce iubești? Ceva ce putem îmbunătăți? 🙏`,
      pl: `Hej [Imię]! 👋\n\nSprawdzam tylko — czy CLOUD VAPE dotarł w porządku? 📦\n\nJak Ci idzie z [SMAKIEM] do tej pory? 😊\n\nWkładamy dużo troski w każde zamówienie, więc Twoja opinia wiele dla nas znaczy!\n\nCoś co kochasz? Coś co możemy poprawić? 🙏`,
      hu: `Szia [Név]! 👋\n\nCsak ellenőrzöm — megérkezett rendben a CLOUD VAPE? 📦\n\nHogy megy az [ÍZ] eddig? 😊\n\nSok gondot fordítunk minden rendelésre, szóval a visszajelzésed sokat jelent nekünk!\n\nValami amit szeretsz? Valami amit javíthatunk? 🙏`,
      pt: `Ei [Nome]! 👋\n\nSó a verificar — o teu CLOUD VAPE chegou bem? 📦\n\nComo está a correr com o [SABOR] até agora? 😊\n\nPomos muito cuidado em cada encomenda, por isso o teu feedback significa muito para nós!\n\nAlgo que adoras? Algo que podemos melhorar? 🙏`,
      cs: `Hej [Jméno]! 👋\n\nJen kontroluji — dorazil CLOUD VAPE v pořádku? 📦\n\nJak se ti daří s [PŘÍCHUTÍ] zatím? 😊\n\nVkládáme hodně péče do každé objednávky, takže tvá zpětná vazba pro nás hodně znamená!\n\nNěco co miluješ? Něco co můžeme zlepšit? 🙏`,
    },
    zh: `嗨 [姓名]！👋\n\n只是来确认一下——您的 CLOUD VAPE 顺利到了吗？📦\n\n[口味] 用起来感觉怎么样？😊\n\n我们在每个订单上都投入了很多心思，所以您的反馈对我们意义重大！\n\n有什么您喜欢的？有什么我们可以改进的？🙏`,
    color: "green",
  },
  {
    id: "T+3",
    timing: "签收后 3 天",
    timingEn: "3 days after delivery",
    goal: "趁体验高峰期推新口味",
    conversionRate: "35%",
    keyTactic: "用户体验进入高峰期，用新口味好奇心驱动复购",
    tips: [
      "3天是用户体验最佳时期，复购意愿最强。",
      "推荐与当前口味互补的新口味。",
      "给出限时优惠，制造行动理由。",
    ],
    psychology: ["已经爱上了，想尝试更多", "好奇其他口味是什么感觉", "这时候最容易接受推荐"],
    scripts: {
      en: `Hey [Name]! 😊\n\nBet you're loving the [FLAVOR] by now! 🔥\n\nI wanted to share something exciting — we just got 3 new flavors in:\n\n🆕 Blueberry Lemon — tangy & sweet\n🆕 Passion Fruit Ice — exotic & cool  \n🆕 Lychee Rose — floral & refreshing\n\nCustomers who loved [FLAVOR] are going CRAZY for Blueberry Lemon!\n\n🎁 Special for you: 2nd order gets FREE shipping\n\nWant to try one? 👀`,
      ro: `Hei [Nume]! 😊\n\nPariez că iubești deja [AROMA]! 🔥\n\nVreau să îți împărtășesc ceva interesant — tocmai am primit 3 arome noi:\n\n🆕 Afine Lămâie — acru & dulce\n🆕 Fructul Pasiunii cu Gheață — exotic & rece\n🆕 Lychee Trandafir — floral & răcoritor\n\nClienții care au iubit [AROMA] înnebunesc după Afine Lămâie!\n\n🎁 Special pentru tine: a 2-a comandă primește livrare GRATUITĂ\n\nVrei să încerci una? 👀`,
      pl: `Hej [Imię]! 😊\n\nZakładam, że już kochasz [SMAK]! 🔥\n\nChciałem podzielić się czymś ekscytującym — właśnie dostaliśmy 3 nowe smaki:\n\n🆕 Jagoda Cytryna — kwaśny & słodki\n🆕 Marakuja z Lodem — egzotyczny & chłodny\n🆕 Liczi Róża — kwiatowy & orzeźwiający\n\nKlienci, którzy kochali [SMAK] szaleją za Jagodą Cytryną!\n\n🎁 Specjalnie dla Ciebie: 2. zamówienie z DARMOWĄ wysyłką\n\nChcesz spróbować? 👀`,
      hu: `Szia [Név]! 😊\n\nFogadom, hogy már imádod a [ÍZ]-t! 🔥\n\nMeg akartam osztani valami izgalmasat — épp kaptunk 3 új ízt:\n\n🆕 Áfonya Citrom — savanykás & édes\n🆕 Maracuja Jéggel — egzotikus & hűvös\n🆕 Lychee Rózsa — virágos & frissítő\n\nAzok az ügyfelek akik szerették a [ÍZ]-t megőrülnek az Áfonya Citromért!\n\n🎁 Különleges neked: 2. rendelés INGYENES szállítással\n\nSzeretné kipróbálni? 👀`,
      pt: `Ei [Nome]! 😊\n\nAposto que já estás a adorar o [SABOR]! 🔥\n\nQueria partilhar algo emocionante — acabámos de receber 3 novos sabores:\n\n🆕 Mirtilo Limão — azedo & doce\n🆕 Maracujá com Gelo — exótico & fresco\n🆕 Lichia Rosa — floral & refrescante\n\nOs clientes que adoraram [SABOR] estão loucos com o Mirtilo Limão!\n\n🎁 Especial para ti: 2ª encomenda com envio GRÁTIS\n\nQueres experimentar? 👀`,
      cs: `Hej [Jméno]! 😊\n\nVsadím, že už miluješ [PŘÍCHUŤ]! 🔥\n\nChtel jsem sdílet něco vzrušujícího — právě jsme dostali 3 nové příchutě:\n\n🆕 Borůvka Citron — kyselá & sladká\n🆕 Marakuja s Ledem — exotická & chladná\n🆕 Lychee Růže — květinová & osvěžující\n\nZákazníci kteří milovali [PŘÍCHUŤ] se zbláznili po Borůvce Citronu!\n\n🎁 Speciálně pro tebe: 2. objednávka s BEZPLATNÝM doručením\n\nChceš zkusit? 👀`,
    },
    zh: `嗨 [姓名]！😊\n\n相信您现在已经爱上 [口味] 了！🔥\n\n我想分享一些令人兴奋的消息——我们刚到了3款新口味：\n\n🆕 蓝莓柠檬 — 酸甜交织\n🆕 百香果冰 — 异域清凉\n🆕 荔枝玫瑰 — 花香清爽\n\n喜欢 [口味] 的顾客都疯狂爱上了蓝莓柠檬！\n\n🎁 专属优惠：第2单免运费\n\n想试试吗？👀`,
    color: "blue",
  },
  {
    id: "T+7",
    timing: "签收后 7 天",
    timingEn: "7 days after delivery",
    goal: "用量提醒 + 套餐升级",
    conversionRate: "42%",
    keyTactic: "电子烟消耗快，7天时用量提醒是最自然的复购触发点",
    tips: [
      "7天是大多数用户用量过半的时间点。",
      "用'快用完了吧'制造自然的复购对话。",
      "推多件套餐，提高客单价。",
    ],
    psychology: ["用量确实快用完了，正在考虑补货", "不想断货，有囤货心理", "这时候推套餐最容易接受"],
    scripts: {
      en: `Hey [Name]! 😄\n\nYour vape must be getting low by now... 😅\n\nDon't get caught without your favorite flavor!\n\n📦 Smart move: Stock up with our Value Pack:\n✅ 3-pack — save 15%\n✅ 5-pack — save 25% + FREE flavor\n✅ Mix & match different flavors!\n\nCash on Delivery as always 💪\n\nWhich pack works for you? 👇`,
      ro: `Hei [Nume]! 😄\n\nVape-ul tău trebuie să se termine curând... 😅\n\nNu te prinde fără aroma ta preferată!\n\n📦 Mișcare inteligentă: Aprovizionează-te cu Pachetul Valoare:\n✅ Pachet 3 — economisești 15%\n✅ Pachet 5 — economisești 25% + aromă GRATUITĂ\n✅ Mix & match arome diferite!\n\nPlată la livrare ca întotdeauna 💪\n\nCe pachet ți se potrivește? 👇`,
      pl: `Hej [Imię]! 😄\n\nTwój vape musi się już kończyć... 😅\n\nNie daj się zaskoczyć bez ulubionego smaku!\n\n📦 Mądry ruch: Zaopatrz się w Pakiet Wartości:\n✅ Pakiet 3 — oszczędzasz 15%\n✅ Pakiet 5 — oszczędzasz 25% + DARMOWY smak\n✅ Mix & match różnych smaków!\n\nPłatność przy odbiorze jak zawsze 💪\n\nKtóry pakiet Ci odpowiada? 👇`,
      hu: `Szia [Név]! 😄\n\nA vape-ed már biztosan fogyóban van... 😅\n\nNe kapjon el kedvenc íz nélkül!\n\n📦 Okos lépés: Töltsd fel készleted az Értékcsomaggal:\n✅ 3-as csomag — 15% megtakarítás\n✅ 5-ös csomag — 25% megtakarítás + INGYENES íz\n✅ Mix & match különböző ízek!\n\nUtánvétes fizetés mint mindig 💪\n\nMelyik csomag felel meg neked? 👇`,
      pt: `Ei [Nome]! 😄\n\nO teu vape deve estar a acabar... 😅\n\nNão fiques sem o teu sabor favorito!\n\n📦 Movimento inteligente: Abastece-te com o Pack Valor:\n✅ Pack 3 — poupa 15%\n✅ Pack 5 — poupa 25% + sabor GRÁTIS\n✅ Mix & match sabores diferentes!\n\nPagamento na entrega como sempre 💪\n\nQual pack funciona para ti? 👇`,
      cs: `Hej [Jméno]! 😄\n\nTvůj vape musí být skoro prázdný... 😅\n\nNenech se přistihnout bez oblíbené příchutě!\n\n📦 Chytrý tah: Doplň zásoby naší Hodnotovou sadou:\n✅ Sada 3 — ušetříš 15%\n✅ Sada 5 — ušetříš 25% + ZDARMA příchuť\n✅ Mix & match různé příchutě!\n\nPlatba při doručení jako vždy 💪\n\nKterá sada ti vyhovuje? 👇`,
    },
    zh: `嗨 [姓名]！😄\n\n您的电子烟应该快用完了吧... 😅\n\n别让自己断货！\n\n📦 聪明的选择：囤货套餐：\n✅ 3件装 — 节省15%\n✅ 5件装 — 节省25% + 赠品口味\n✅ 可以混搭不同口味！\n\n货到付款，一如既往 💪\n\n哪个套餐适合您？👇`,
    color: "orange",
  },
  {
    id: "T+14",
    timing: "签收后 14 天",
    timingEn: "14 days after delivery",
    goal: "老客户专属优惠 + 情感维系",
    conversionRate: "38%",
    keyTactic: "用'老客户专属'身份感激活复购，让客户感到被重视",
    tips: [
      "14天是用户开始考虑下一次购买的时间点。",
      "用'老客户专属'话术强化身份认同。",
      "给出真实的专属优惠，不要虚假折扣。",
    ],
    psychology: ["已经建立了品牌信任", "希望被认可为老客户", "对专属优惠有特殊感觉"],
    scripts: {
      en: `Hey [Name]! 🌟\n\nIt's been 2 weeks since your first order — you're officially a CLOUD VAPE VIP now! 🎉\n\nAs a thank you, here's your exclusive loyalty offer:\n\n🏆 VIP CODE: VIP15\n→ 15% OFF your next order\n→ Valid for 5 days only\n→ Stacks with bundle discounts!\n\nYou've earned it! 💪\n\nReady to restock? 👇`,
      ro: `Hei [Nume]! 🌟\n\nAu trecut 2 săptămâni de la prima ta comandă — ești oficial VIP CLOUD VAPE acum! 🎉\n\nCa mulțumire, iată oferta ta exclusivă de loialitate:\n\n🏆 COD VIP: VIP15\n→ 15% REDUCERE la următoarea comandă\n→ Valabil doar 5 zile\n→ Se cumulează cu reducerile la pachete!\n\nAi meritat-o! 💪\n\nGata să reaprovizionezi? 👇`,
      pl: `Hej [Imię]! 🌟\n\nMinęły 2 tygodnie od pierwszego zamówienia — jesteś oficjalnie VIP CLOUD VAPE teraz! 🎉\n\nJako podziękowanie, oto Twoja ekskluzywna oferta lojalnościowa:\n\n🏆 KOD VIP: VIP15\n→ 15% ZNIŻKI na następne zamówienie\n→ Ważny tylko 5 dni\n→ Łączy się z rabatami na pakiety!\n\nZasłużyłeś na to! 💪\n\nGotowy do uzupełnienia? 👇`,
      hu: `Szia [Név]! 🌟\n\n2 hete volt az első rendelésed — most már hivatalosan CLOUD VAPE VIP vagy! 🎉\n\nKöszönetképpen itt az exkluzív hűségajánlatod:\n\n🏆 VIP KÓD: VIP15\n→ 15% KEDVEZMÉNY a következő rendelésre\n→ Csak 5 napig érvényes\n→ Kombinálható csomag kedvezményekkel!\n\nMegérdemelted! 💪\n\nKész feltölteni? 👇`,
      pt: `Ei [Nome]! 🌟\n\nPassaram 2 semanas desde a tua primeira encomenda — és oficialmente VIP CLOUD VAPE agora! 🎉\n\nComo agradecimento, aqui está a tua oferta exclusiva de fidelidade:\n\n🏆 CÓDIGO VIP: VIP15\n→ 15% DESCONTO na próxima encomenda\n→ Válido apenas 5 dias\n→ Acumula com descontos de pack!\n\nMereceste! 💪\n\nPronto para reabastecer? 👇`,
      cs: `Hej [Jméno]! 🌟\n\nUplynuly 2 týdny od tvé první objednávky — jsi nyní oficiálně CLOUD VAPE VIP! 🎉\n\nJako poděkování, zde je tvá exkluzivní věrnostní nabídka:\n\n🏆 VIP KÓD: VIP15\n→ 15% SLEVA na příští objednávku\n→ Platí pouze 5 dní\n→ Kombinuje se se slevami na sady!\n\nZasloužil sis to! 💪\n\nPřipraven doplnit zásoby? 👇`,
    },
    zh: `嗨 [姓名]！🌟\n\n距离您第一次下单已经2周了——您现在正式成为 CLOUD VAPE VIP！🎉\n\n作为感谢，这是您的专属忠诚优惠：\n\n🏆 VIP码：VIP15\n→ 下次购买享15%折扣\n→ 仅5天有效\n→ 可与套餐折扣叠加！\n\n您赢得了这个！💪\n\n准备好补货了吗？👇`,
    color: "purple",
  },
  {
    id: "T+30",
    timing: "签收后 30 天",
    timingEn: "30 days after delivery",
    goal: "季节/节日限定话题激活沉默客户",
    conversionRate: "22%",
    keyTactic: "用时事/季节话题重新建立联系，避免直接推销显得突兀",
    tips: [
      "30天是客户开始沉默的临界点。",
      "用季节/节日话题作为自然的对话切入点。",
      "不要直接推销，先重建联系再引导购买。",
    ],
    psychology: ["可能已经忘记了品牌", "需要一个自然的重新联系理由", "直接推销会被忽略"],
    scripts: {
      en: `Hey [Name]! 👋 Long time no chat!\n\nHope you've been well! 😊\n\nJust wanted to share — we just launched our [SEASON] collection:\n\n🌸 Spring Special: Cherry Blossom Ice (NEW)\n☀️ Summer Hit: Tropical Punch (NEW)\n\nAlso, we're running a limited offer this month:\n🎁 Buy 2 get 1 FREE — this week only!\n\nMissed having you around 😄\nWant to see the full new lineup?`,
      ro: `Hei [Nume]! 👋 De mult nu am mai vorbit!\n\nSper că ai fost bine! 😊\n\nVreau doar să împărtășesc — tocmai am lansat colecția noastră de [SEZON]:\n\n🌸 Special de Primăvară: Cireș cu Gheață (NOU)\n☀️ Hit de Vară: Punch Tropical (NOU)\n\nDe asemenea, avem o ofertă limitată luna aceasta:\n🎁 Cumperi 2 primești 1 GRATUIT — doar această săptămână!\n\nNe-ai lipsit 😄\nVrei să vezi noua linie completă?`,
      pl: `Hej [Imię]! 👋 Dawno się nie odzywałeś!\n\nMam nadzieję, że dobrze się czujesz! 😊\n\nChciałem tylko podzielić się — właśnie uruchomiliśmy naszą kolekcję [SEZON]:\n\n🌸 Wiosenny Specjał: Wiśnia z Lodem (NOWY)\n☀️ Letni Hit: Tropikalny Punch (NOWY)\n\nTakże, prowadzimy ograniczoną ofertę w tym miesiącu:\n🎁 Kup 2 dostań 1 GRATIS — tylko w tym tygodniu!\n\nBrakowało nam Ciebie 😄\nChcesz zobaczyć pełną nową linię?`,
      hu: `Szia [Név]! 👋 Régóta nem csevéltünk!\n\nRemélem jól voltál! 😊\n\nCsak meg akartam osztani — épp elindítottuk a [ÉVSZAK] kollekciónkat:\n\n🌸 Tavaszi Különlegesség: Cseresznyevirág Jéggel (ÚJ)\n☀️ Nyári Sláger: Trópusi Punch (ÚJ)\n\nEmellett, korlátozott ajánlatot futtatunk ebben a hónapban:\n🎁 Vegyél 2-t kapj 1-et INGYEN — csak ezen a héten!\n\nHiányoztál 😄\nSzeretné látni a teljes új kínálatot?`,
      pt: `Ei [Nome]! 👋 Há muito que não falamos!\n\nEspero que estejas bem! 😊\n\nSó queria partilhar — acabámos de lançar a nossa coleção de [ESTAÇÃO]:\n\n🌸 Especial de Primavera: Flor de Cerejeira com Gelo (NOVO)\n☀️ Hit de Verão: Punch Tropical (NOVO)\n\nTambém, estamos a correr uma oferta limitada este mês:\n🎁 Compra 2 leva 1 GRÁTIS — só esta semana!\n\nSaudades tuas 😄\nQueres ver a nova linha completa?`,
      cs: `Hej [Jméno]! 👋 Dlouho jsme si nepovídali!\n\nDoufám, že jsi byl v pořádku! 😊\n\nJen jsem chtěl sdílet — právě jsme spustili naši [SEZÓNA] kolekci:\n\n🌸 Jarní Speciál: Třešňový Květ s Ledem (NOVÝ)\n☀️ Letní Hit: Tropický Punch (NOVÝ)\n\nTaké provozujeme limitovanou nabídku tento měsíc:\n🎁 Kup 2 dostaneš 1 ZDARMA — jen tento týden!\n\nChyběls nám 😄\nChceš vidět celou novou řadu?`,
    },
    zh: `嗨 [姓名]！👋 好久不见！\n\n希望您一切都好！😊\n\n只是想分享一下——我们刚刚推出了[季节]系列：\n\n🌸 春季特供：樱花冰（新品）\n☀️ 夏日爆款：热带宾治（新品）\n\n另外，本月有限时优惠：\n🎁 买2送1——仅限本周！\n\n好久没联系了 😄\n想看看完整的新品阵容吗？`,
    color: "teal",
  },
  {
    id: "T+60",
    timing: "签收后 60 天（沉默唤醒）",
    timingEn: "60 days — win-back campaign",
    goal: "用强力优惠唤醒沉默客户",
    conversionRate: "18%",
    keyTactic: "沉默60天的客户需要强力刺激，用'我们想念您'情感牌+大力度优惠",
    tips: [
      "60天沉默客户是最后的挽回机会。",
      "用情感化语言，不要只发优惠码。",
      "给出明确的到期时间，制造紧迫感。",
    ],
    psychology: ["可能已经转向竞争对手", "需要一个强烈的理由回来", "情感化的消息比纯促销更有效"],
    scripts: {
      en: `Hey [Name]... 👋\n\nIt's been a while and we genuinely miss you! 😢\n\nWe've been working hard on new things and wanted you to be the first to know:\n\n🆕 5 new flavors launched\n📦 Faster delivery (now 1-2 days!)\n💰 New pricing — even better value\n\nAnd because we miss you:\n🎁 COMEBACK CODE: MISS20\n→ 20% OFF — expires in 72 hours\n\nWe'd love to have you back 🙏`,
      ro: `Hei [Nume]... 👋\n\nA trecut ceva timp și îți ducem dorul cu adevărat! 😢\n\nAm muncit din greu la lucruri noi și am vrut să fii primul care știe:\n\n🆕 5 arome noi lansate\n📦 Livrare mai rapidă (acum 1-2 zile!)\n💰 Prețuri noi — și mai bun raport calitate-preț\n\nȘi pentru că îți ducem dorul:\n🎁 COD REVENIRE: MISS20\n→ 20% REDUCERE — expiră în 72 ore\n\nNe-ar plăcea să te avem înapoi 🙏`,
      pl: `Hej [Imię]... 👋\n\nMinęło trochę czasu i naprawdę za Tobą tęsknimy! 😢\n\nCiężko pracowaliśmy nad nowymi rzeczami i chcieliśmy żebyś był pierwszym który wie:\n\n🆕 5 nowych smaków uruchomionych\n📦 Szybsza dostawa (teraz 1-2 dni!)\n💰 Nowe ceny — jeszcze lepsza wartość\n\nI ponieważ za Tobą tęsknimy:\n🎁 KOD POWROTU: MISS20\n→ 20% ZNIŻKI — wygasa za 72 godziny\n\nChcielibyśmy mieć Cię z powrotem 🙏`,
      hu: `Szia [Név]... 👋\n\nEgy ideje nem hallottunk egymásról és őszintén hiányzol! 😢\n\nKeményen dolgoztunk új dolgokon és azt akartuk, hogy te legyél az első aki tudja:\n\n🆕 5 új íz bevezetése\n📦 Gyorsabb szállítás (most 1-2 nap!)\n💰 Új árak — még jobb érték\n\nÉs mert hiányzol:\n🎁 VISSZATÉRÉSI KÓD: MISS20\n→ 20% KEDVEZMÉNY — 72 óra múlva lejár\n\nSzeretnénk visszakapni téged 🙏`,
      pt: `Ei [Nome]... 👋\n\nJá passou algum tempo e temos genuinamente saudades tuas! 😢\n\nTemos trabalhado arduamente em coisas novas e queríamos que fosses o primeiro a saber:\n\n🆕 5 novos sabores lançados\n📦 Entrega mais rápida (agora 1-2 dias!)\n💰 Novos preços — ainda melhor valor\n\nE porque temos saudades:\n🎁 CÓDIGO REGRESSO: MISS20\n→ 20% DESCONTO — expira em 72 horas\n\nAdoraríamos ter-te de volta 🙏`,
      cs: `Hej [Jméno]... 👋\n\nUplynulo nějakou dobu a opravdu ti chybíš! 😢\n\nTvrdě jsme pracovali na nových věcech a chtěli jsme abys byl první kdo to ví:\n\n🆕 5 nových příchutí spuštěno\n📦 Rychlejší doručení (nyní 1-2 dny!)\n💰 Nové ceny — ještě lepší hodnota\n\nA protože ti chybíš:\n🎁 KÓD NÁVRATU: MISS20\n→ 20% SLEVA — vyprší za 72 hodin\n\nRádi bychom tě zpět 🙏`,
    },
    zh: `嗨 [姓名]... 👋\n\n已经有一段时间了，我们真的很想念您！😢\n\n我们一直在努力推出新东西，想让您第一个知道：\n\n🆕 5款新口味上线\n📦 更快的配送（现在1-2天！）\n💰 新定价——更超值\n\n因为我们想念您：\n🎁 回归码：MISS20\n→ 20%折扣——72小时后到期\n\n我们希望您回来 🙏`,
    color: "rose",
  },
  {
    id: "REF",
    timing: "签收满意后 — 转介绍激活",
    timingEn: "After positive feedback — referral activation",
    goal: "把满意客户变成品牌推广者",
    conversionRate: "45%（转介绍成功率）",
    keyTactic: "满意客户是最好的销售员，用双向奖励机制激活转介绍",
    tips: [
      "在客户表达满意后立即发送，不要超过1小时。",
      "双向奖励：推荐人和被推荐人都有好处。",
      "让推荐流程简单，只需分享一个链接或码。",
    ],
    psychology: ["愿意帮助朋友省钱", "希望自己也能获益", "分享好东西是社交本能"],
    scripts: {
      en: `So glad you're loving it! 🎉\n\nHere's how to share the love AND earn free products:\n\n🎁 YOUR REFERRAL CODE: [NAME]20\n\nHow it works:\n→ Share your code with friends\n→ They get 20% OFF their first order\n→ You get 1 FREE product for each friend who orders!\n\nNo limit on how many friends you refer 🔥\n\nJust copy and share:\n"Hey! I've been using CLOUD VAPE and it's amazing 🔥 Use my code [NAME]20 for 20% off your first order! Cash on delivery available 😊"`,
      ro: `Mă bucur că îți place! 🎉\n\nIată cum să răspândești dragostea ȘI să câștigi produse gratuite:\n\n🎁 CODUL TĂU DE REFERRAL: [NUME]20\n\nCum funcționează:\n→ Împărtășește codul cu prietenii\n→ Ei primesc 20% REDUCERE la prima comandă\n→ Tu primești 1 produs GRATUIT pentru fiecare prieten care comandă!\n\nFără limită la câți prieteni recomanzi 🔥\n\nCopiază și distribuie:\n"Hei! Folosesc CLOUD VAPE și e uimitor 🔥 Folosește codul meu [NUME]20 pentru 20% reducere la prima comandă! Plată la livrare disponibilă 😊"`,
      pl: `Cieszę się, że ci się podoba! 🎉\n\nOto jak dzielić się miłością I zarabiać darmowe produkty:\n\n🎁 TWÓJ KOD POLECAJĄCY: [IMIĘ]20\n\nJak to działa:\n→ Udostępnij kod znajomym\n→ Oni dostają 20% ZNIŻKI na pierwsze zamówienie\n→ Ty dostajesz 1 DARMOWY produkt za każdego znajomego który zamówi!\n\nBez limitu ile znajomych polecisz 🔥\n\nSkopiuj i udostępnij:\n"Hej! Używam CLOUD VAPE i jest niesamowity 🔥 Użyj mojego kodu [IMIĘ]20 na 20% zniżki na pierwsze zamówienie! Płatność przy odbiorze dostępna 😊"`,
      hu: `Annyira örülök, hogy szereted! 🎉\n\nÍgy oszd meg a szeretetet ÉS keress ingyenes termékeket:\n\n🎁 A TE AJÁNLÓI KÓDOD: [NÉV]20\n\nHogy működik:\n→ Oszd meg a kódot barátaiddal\n→ Ők 20% KEDVEZMÉNYT kapnak az első rendelésre\n→ Te 1 INGYENES terméket kapsz minden barátért aki rendel!\n\nNincs korlát hány barátot ajánlhatsz 🔥\n\nMásold és oszd meg:\n"Szia! A CLOUD VAPE-t használom és elképesztő 🔥 Használd a kódomat [NÉV]20 az első rendelésre 20% kedvezményért! Utánvétes fizetés elérhető 😊"`,
      pt: `Fico tão contente que estás a adorar! 🎉\n\nAqui está como partilhar o amor E ganhar produtos grátis:\n\n🎁 O TEU CÓDIGO DE REFERÊNCIA: [NOME]20\n\nComo funciona:\n→ Partilha o teu código com amigos\n→ Eles recebem 20% DESCONTO na primeira encomenda\n→ Tu recebes 1 produto GRÁTIS por cada amigo que encomendar!\n\nSem limite em quantos amigos referes 🔥\n\nCopia e partilha:\n"Ei! Tenho usado o CLOUD VAPE e é incrível 🔥 Usa o meu código [NOME]20 para 20% de desconto na primeira encomenda! Pagamento na entrega disponível 😊"`,
      cs: `Jsem tak rád, že se ti líbí! 🎉\n\nZde je jak sdílet lásku A vydělávat bezplatné produkty:\n\n🎁 TVŮJ REFERRAL KÓD: [JMÉNO]20\n\nJak to funguje:\n→ Sdílej kód s přáteli\n→ Oni dostávají 20% SLEVU na první objednávku\n→ Ty dostáváš 1 ZDARMA produkt za každého přítele který objedná!\n\nŽádný limit na to kolik přátel doporučíš 🔥\n\nZkopíruj a sdílej:\n"Hej! Používám CLOUD VAPE a je úžasný 🔥 Použij můj kód [JMÉNO]20 na 20% slevu na první objednávku! Platba při doručení k dispozici 😊"`,
    },
    zh: `很高兴您喜欢！🎉\n\n这是如何分享好东西并赚取免费产品的方法：\n\n🎁 您的推荐码：[姓名]20\n\n运作方式：\n→ 把您的码分享给朋友\n→ 他们首单享20%折扣\n→ 每有一个朋友下单，您获得1个免费产品！\n\n推荐朋友数量无上限 🔥\n\n复制分享：\n"嗨！我一直在用 CLOUD VAPE，太棒了 🔥 用我的码 [姓名]20 首单享20%折扣！支持货到付款 😊"`,
    color: "amber",
  },
  {
    id: "UPSELL",
    timing: "首单成交后 30 分钟内",
    timingEn: "Within 30 min of first order confirmation",
    goal: "黄金窗口期追加同单商品",
    conversionRate: "52%",
    keyTactic: "订单确认后30分钟是追加购买的黄金窗口，同单追加无额外运费",
    tips: [
      "订单确认后立即发送，不要超过30分钟。",
      "强调同单追加不需要额外运费。",
      "推荐互补口味，而不是同款重复。",
    ],
    psychology: ["刚刚做了购买决定，购买情绪最高", "同单追加感觉'不亏'", "不想再次等待快递"],
    scripts: {
      en: `Hey [Name]! Your order is confirmed ✅\n\nQuick question before we pack it:\n\nWould you like to add another flavor to the SAME shipment?\n\n🚀 No extra shipping cost!\n🍓 Strawberry Kiwi — pairs perfectly with your order\n🍋 Lemon Mint — great for daytime use\n\nJust say "ADD [FLAVOR]" and I'll include it!\n\nWe're packing your order in the next 30 mins ⏰`,
      ro: `Hei [Nume]! Comanda ta este confirmată ✅\n\nÎntrebare rapidă înainte să o ambalăm:\n\nAi vrea să adaugi o altă aromă la ACEEAȘI expediere?\n\n🚀 Fără cost suplimentar de livrare!\n🍓 Căpșuni Kiwi — se potrivește perfect cu comanda ta\n🍋 Lămâie Mentă — excelent pentru uz în timpul zilei\n\nSpune doar "ADAUGĂ [AROMĂ]" și o includ!\n\nAmbalăm comanda ta în următoarele 30 min ⏰`,
      pl: `Hej [Imię]! Twoje zamówienie jest potwierdzone ✅\n\nSzybkie pytanie zanim je spakujemy:\n\nChciałbyś dodać kolejny smak do TEJ SAMEJ przesyłki?\n\n🚀 Bez dodatkowych kosztów wysyłki!\n🍓 Truskawka Kiwi — idealnie pasuje do Twojego zamówienia\n🍋 Cytryna Mięta — świetna do użytku w ciągu dnia\n\nPowiedz tylko "DODAJ [SMAK]" a włączę to!\n\nPakujemy Twoje zamówienie w ciągu następnych 30 min ⏰`,
      hu: `Szia [Név]! A rendelésed megerősítve ✅\n\nGyors kérdés mielőtt becsomagolnánk:\n\nSzeretné hozzáadni egy másik ízt UGYANAHHOZ a szállítmányhoz?\n\n🚀 Nincs extra szállítási költség!\n🍓 Eper Kivi — tökéletesen illik a rendelésedhez\n🍋 Citrom Menta — remek nappali használatra\n\nCsak mondd "HOZZÁAD [ÍZ]" és belefoglalom!\n\nA következő 30 percben csomagoljuk a rendelésed ⏰`,
      pt: `Ei [Nome]! A tua encomenda está confirmada ✅\n\nPergunta rápida antes de embalarmos:\n\nGostarias de adicionar outro sabor à MESMA remessa?\n\n🚀 Sem custo extra de envio!\n🍓 Morango Kiwi — combina perfeitamente com a tua encomenda\n🍋 Limão Menta — ótimo para uso diurno\n\nSó diz "ADICIONAR [SABOR]" e incluo!\n\nEstamos a embalar a tua encomenda nos próximos 30 min ⏰`,
      cs: `Hej [Jméno]! Tvoje objednávka je potvrzena ✅\n\nRychlá otázka než to zabalíme:\n\nChtěl bys přidat další příchuť ke STEJNÉ zásilce?\n\n🚀 Žádné extra náklady na dopravu!\n🍓 Jahoda Kiwi — dokonale se hodí k tvé objednávce\n🍋 Citron Máta — skvělá pro denní použití\n\nStačí říct "PŘIDAT [PŘÍCHUŤ]" a zahrnu to!\n\nBalíme tvou objednávku v příštích 30 min ⏰`,
    },
    zh: `嗨 [姓名]！您的订单已确认 ✅\n\n打包前快速问一下：\n\n您想在同一个包裹里加一个口味吗？\n\n🚀 不需要额外运费！\n🍓 草莓奇异果——和您的订单完美搭配\n🍋 柠檬薄荷——白天使用的好选择\n\n只需说"加 [口味]"，我就帮您加上！\n\n我们将在接下来30分钟内打包您的订单 ⏰`,
    color: "indigo",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("话术已复制");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("复制失败");
    }
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-150"
    >
      {copied ? <><Check size={12} className="text-emerald-500" />已复制</> : <><Copy size={12} />复制</>}
    </button>
  );
}

function NodeCard({ node, lang, showZh, isLast }: { node: RepurchaseNode; lang: LangKey; showZh: boolean; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const c = COLOR_MAP[node.color];

  return (
    <div className="flex gap-4">
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: "32px" }}>
        <div className={`w-8 h-8 rounded-full ${c.dot} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <Clock size={13} className="text-white" />
        </div>
        {!isLast && <div className="w-0.5 flex-1 mt-1 bg-slate-200 min-h-[20px]" />}
      </div>

      {/* Card */}
      <div className={`flex-1 mb-4 rounded-2xl overflow-hidden border transition-all duration-300 bg-white ${c.border}`}>
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center gap-3 cursor-pointer select-none ${c.bg}`}
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.badge}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {node.id}
              </span>
              <span className="text-xs text-slate-500 font-medium">{node.timing}</span>
              <span className="text-xs text-slate-400 italic hidden sm:inline">{node.timingEn}</span>
            </div>
            <h3 className={`text-sm font-700 ${c.header} leading-snug`} style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}>
              {node.goal}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{node.keyTactic}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-400 hidden sm:block">转化率 <span className="font-bold text-slate-600">{node.conversionRate}</span></span>
            <div className="text-slate-400">{expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</div>
          </div>
        </div>

        {/* Body */}
        {expanded && (
          <div className="border-t border-slate-100">
            {/* Tips + psychology */}
            <div className="px-5 pt-4 pb-3 border-b border-slate-100 space-y-3">
              <div>
                <h4 className={`text-[10px] font-600 uppercase tracking-widest mb-2 ${c.icon}`}>操作要点</h4>
                <ul className="flex flex-col gap-1.5">
                  {node.tips.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${c.bg} border ${c.border.split(" ")[0]}`}>
                        <Check size={7} className={c.icon} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-600 uppercase tracking-widest text-blue-400 mb-2">用户心理</h4>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {node.psychology.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-blue-600">
                      <span className="text-blue-400 text-[10px]">💭</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Script + ZH */}
            <div className={`grid gap-0 ${showZh ? "lg:grid-cols-2" : "grid-cols-1"}`}>
              <div className={`p-5 ${showZh ? "border-r border-slate-100" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-[10px] font-600 uppercase tracking-widest ${c.icon}`}>
                    {LANG_META[lang].flag} {LANG_META[lang].label} 话术
                  </h4>
                  <CopyBtn text={node.scripts[lang]} />
                </div>
                <div className="rounded-xl overflow-hidden bg-[#F0F2F5] border border-slate-200">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#128C7E]">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={10} className="text-white" />
                    </div>
                    <span className="text-xs text-white/90 font-medium">CLOUD VAPE</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <span className="text-[10px] text-green-300">online</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-end">
                      <div className="bubble-out max-w-[90%] px-3 py-2">
                        <pre className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace" }}>
                          {node.scripts[lang]}
                        </pre>
                        <div className="flex justify-end mt-1"><span className="text-[10px] text-slate-400">✓✓</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showZh && (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[10px] font-600 uppercase tracking-widest text-amber-400">🇨🇳 中文对照</h4>
                    <CopyBtn text={node.zh} />
                  </div>
                  <div className="rounded-xl overflow-hidden bg-[#F0F2F5] border border-slate-200">
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-500">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={10} className="text-white" />
                      </div>
                      <span className="text-xs text-white/90 font-medium">中文参考译文</span>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-start">
                        <div className="bubble-in max-w-[90%] px-3 py-2">
                          <pre className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                            {node.zh}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function RepurchaseModule({ lang, showZh }: { lang: LangKey; showZh: boolean }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Section header */}
      <div className="rounded-3xl overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #064E3B 0%, #059669 50%, #34D399 100%)" }}>
        <div className="px-6 sm:px-8 py-7 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
          <div className="flex items-start gap-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-800 text-white" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}>
                  签收后复购激活模块
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">8 个时间节点</span>
              </div>
              <p className="text-sm text-emerald-100 leading-relaxed">
                签收只是开始——系统化的复购跟进可以让 LTV（客户终身价值）提升 3-5 倍
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 relative">
            {[
              { icon: <TrendingUp size={14} />, label: "平均复购率",    value: "35%",  sub: "系统跟进后" },
              { icon: <Clock size={14} />,       label: "最佳首次跟进", value: "24h",  sub: "签收后" },
              { icon: <Star size={14} />,        label: "7天转化率",    value: "42%",  sub: "用量提醒" },
              { icon: <Users size={14} />,       label: "转介绍成功率", value: "45%",  sub: "满意客户" },
            ].map((s, i) => (
              <div key={i} className="bg-black/20 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="flex justify-center text-emerald-300 mb-1">{s.icon}</div>
                <div className="text-xl font-800 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>{s.value}</div>
                <div className="text-xs text-white/80 font-medium">{s.label}</div>
                <div className="text-[10px] text-emerald-200 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="pl-0">
        {repurchaseNodes.map((node, i) => (
          <NodeCard key={node.id} node={node} lang={lang} showZh={showZh} isLast={i === repurchaseNodes.length - 1} />
        ))}
      </div>

      {/* Bottom tip */}
      <div className="mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <h4 className="text-xs font-700 text-emerald-700 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          🔑 复购黄金法则
        </h4>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-emerald-700">
          <div className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">1.</span>
            <span>首单成交后30分钟内追加同单商品，转化率高达52%，是最高效的增收手段</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">2.</span>
            <span>签收后7天用量提醒是最自然的复购触发点，不要等用户主动来找你</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">3.</span>
            <span>满意客户的转介绍价值 = 3-5个新客户，用双向奖励机制激活口碑传播</span>
          </div>
        </div>
      </div>
    </section>
  );
}
