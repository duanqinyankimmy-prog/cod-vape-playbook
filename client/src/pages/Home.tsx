/**
 * Design Philosophy: WhatsApp Immersive (方案 C) — v4 Full Multilingual
 * - 11 languages: EN / RO / PL / HU / PT / CS / ES / HR / SK / LT / LV + Chinese (ZH) reference column
 * - Expanded scripts: 10 main steps + 41 bonus scenarios (51 total)
 * - Each step shows: 实战逻辑 | 话术 (selected lang) | 中文对照
 * - Features: lang switcher, tag filter, search, progress tracker, script editor
 */

import { useState, useCallback } from "react";
import {
  Check, Copy, MessageCircle, TrendingUp, Shield, Zap,
  ChevronDown, ChevronUp, Globe, BarChart2, Edit3,
  X, RotateCcw, Search, BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { extraSections } from "./extraSections";
import { extraSections2 } from "./extraSections2";
import type { LangKey, Section } from "./sectionTypes";
import CancelRecovery from "./CancelRecovery";
import RepurchaseModule from "./RepurchaseModule";

// ─── Language metadata ────────────────────────────────────────────────────────

const LANG_META: Record<LangKey, { label: string; flag: string; market: string }> = {
  en: { label: "英语",     flag: "🇬🇧", market: "通用" },
  ro: { label: "罗马尼亚语", flag: "🇷🇴", market: "罗马尼亚" },
  pl: { label: "波兰语",   flag: "🇵🇱", market: "波兰" },
  hu: { label: "匈牙利语", flag: "🇭🇺", market: "匈牙利" },
  pt: { label: "葡萄牙语", flag: "🇵🇹", market: "葡萄牙" },
  cs: { label: "捷克语",   flag: "🇨🇿", market: "捷克" },
  es: { label: "西班牙语", flag: "🇪🇸", market: "西班牙" },
  hr: { label: "克罗地亚语", flag: "🇭🇷", market: "克罗地亚" },
  sk: { label: "斯洛伐克语", flag: "🇸🇰", market: "斯洛伐克" },
  lt: { label: "立陶宛语", flag: "🇱🇹", market: "立陶宛" },
  lv: { label: "拉脱维亚语", flag: "🇱🇻", market: "拉脱维亚" },
};

// ─── All sections ─────────────────────────────────────────────────────────────

const sections: Section[] = [
  // ── Step 1 ──
  {
    title: "第一步：用户进入 WhatsApp",
    subtitle: "3秒建立信任，先安全感后产品",
    content: [
      "用户第一反应：像不像骗子。",
      "先建立安全感，而不是介绍产品。",
      "回复速度要在1分钟内，越快越好。",
    ],
    scripts: {
      en: `Hello 👋 Welcome to CLOUD VAPE\n\n✅ 100% Original Products\n✅ Fast Shipping (24-72h)\n✅ Cash on Delivery — Pay when it arrives\n✅ Easy Returns\n\nWhich flavor are you looking for? 🔥`,
      ro: `Bună 👋 Bun venit la CLOUD VAPE\n\n✅ Produse 100% Originale\n✅ Livrare Rapidă (24-72h)\n✅ Plată la Livrare — Plătești când ajunge\n✅ Returnare Ușoară\n\nCe aromă cauți? 🔥`,
      pl: `Cześć 👋 Witaj w CLOUD VAPE\n\n✅ 100% Oryginalne Produkty\n✅ Szybka Wysyłka (24-72h)\n✅ Płatność przy Odbiorze — Płacisz gdy dotrze\n✅ Łatwe Zwroty\n\nJakiego smaku szukasz? 🔥`,
      hu: `Szia 👋 Üdvözlünk a CLOUD VAPE-nél\n\n✅ 100% Eredeti Termékek\n✅ Gyors Szállítás (24-72h)\n✅ Utánvétes Fizetés — Fizetsz amikor megérkezik\n✅ Könnyű Visszaküldés\n\nMilyen ízet keresel? 🔥`,
      pt: `Olá 👋 Bem-vindo à CLOUD VAPE\n\n✅ Produtos 100% Originais\n✅ Envio Rápido (24-72h)\n✅ Pagamento na Entrega — Paga quando chegar\n✅ Devoluções Fáceis\n\nQue sabor estás à procura? 🔥`,
      cs: `Ahoj 👋 Vítej v CLOUD VAPE\n\n✅ 100% Originální Produkty\n✅ Rychlé Doručení (24-72h)\n✅ Platba při Doručení — Platíš až dorazí\n✅ Snadné Vrácení\n\nJakou příchuť hledáš? 🔥`,
        lv: `Sveiki 👋 Laipni lugti CLOUD VAPE\n\n✅ 100% originali produkti\n✅ Ātra piegāde (24-72h)\n✅ Samaksa piegadē — Maksajat tikai kad pienāk\n✅ Vienkārša atgriešana\n\nKādu garšu meklējat? 🔥`,
        lt: `Sveiki 👋 Sveiki atvyke i CLOUD VAPE\n\n✅ 100% originalus produktai\n✅ Greitas pristatymas (24-72h)\n✅ Mokejimas pristatant — Mokate tik kai atvyksta\n✅ Lengvas grazinimas\n\nKokio skonio ieškomate? 🔥`,
        sk: `Ahoj 👋 Vitaj v CLOUD VAPE\n\n✅ 100% originálne produkty\n✅ Rýchle doručenýie (24-72h)\n✅ Platba pri doručenýie — Platíš až keď dorazí\n✅ Jednoduché vrátenie\n\nAkú príchuť hľadáš? 🔥`,
        hr: `Bok 👋 Dobrodošao u CLOUD VAPE\n\n✅ 100% originalni proizvodi\n✅ Brza dostaava (24-72h)\n✅ Plaćanje pri isporuci — Plaćaš kada stigne\n✅ Jednostavan povrat\n\nKoji okus tražiš? 🔥`,
        es: `Hola 👋 Bienvenido a CLOUD VAPE\n\n✅ 100% Productos Originales\n✅ Envío Rápido (24-72h)\n✅ Pago contra reembolso — Pagas cuando llega\n✅ Devoluciones Fáciles\n\n¿Qué sabor buscas? 🔥`,
    },
    zh: `你好 👋 欢迎来到 CLOUD VAPE\n\n✅ 100% 正品\n✅ 快速发货（24-72小时）\n✅ 货到付款 — 收到再付\n✅ 轻松退换\n\n你在找什么口味？🔥`,
    psychology: ["会不会被骗", "能不能货到付款", "有没有真实发货", "回复是不是机器人"],
    tag: "破冰",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },

  // ── Step 2 ──
  {
    title: "第二步：用户咨询价格",
    subtitle: "热销感 → 套餐 → COD → 推动下单",
    content: [
      "不要只发价格，先制造热销感。",
      "套餐定价让3件看起来最划算。",
      "结尾强调 COD，消除付款顾虑。",
    ],
    scripts: {
      en: `This model is 🔥 HOT right now!\n\n📦 1 pcs — €29\n📦 2 pcs — €39  (save €19)\n📦 3 pcs — €49  ⭐ BEST VALUE\n\n✅ Original  ✅ Fast shipping  ✅ Cash on Delivery\n\nMost customers go with 3 — same shipping, better price 😊`,
      ro: `Acest model este 🔥 SUPER POPULAR acum!\n\n📦 1 buc — 149 lei\n📦 2 buc — 199 lei  (economisești 99 lei)\n📦 3 buc — 249 lei  ⭐ CEL MAI BUN PREȚ\n\n✅ Original  ✅ Livrare rapidă  ✅ Plată la livrare\n\nMajoritatea clienților aleg 3 — aceeași livrare, preț mai bun 😊`,
      pl: `Ten model jest 🔥 MEGA POPULARNY teraz!\n\n📦 1 szt — 130 zł\n📦 2 szt — 170 zł  (oszczędzasz 90 zł)\n📦 3 szt — 210 zł  ⭐ NAJLEPSZA CENA\n\n✅ Oryginalny  ✅ Szybka wysyłka  ✅ Płatność przy odbiorze\n\nWiększość klientów bierze 3 — ta sama wysyłka, lepsza cena 😊`,
      hu: `Ez a modell 🔥 NAGYON NÉPSZERŰ most!\n\n📦 1 db — 10 900 Ft\n📦 2 db — 14 900 Ft  (megtakarítasz 6 900 Ft-ot)\n📦 3 db — 18 900 Ft  ⭐ LEGJOBB ÁR\n\n✅ Eredeti  ✅ Gyors szállítás  ✅ Utánvétes fizetés\n\nA legtöbb vevő 3-at vesz — ugyanolyan szállítás, jobb ár 😊`,
      pt: `Este modelo está 🔥 A VENDER MUITO agora!\n\n📦 1 un — €29\n📦 2 un — €39  (poupa €19)\n📦 3 un — €49  ⭐ MELHOR VALOR\n\n✅ Original  ✅ Envio rápido  ✅ Pagamento na entrega\n\nA maioria dos clientes leva 3 — mesmo envio, melhor preço 😊`,
      cs: `Tento model je 🔥 SUPER POPULÁRNÍ teď!\n\n📦 1 ks — 720 Kč\n📦 2 ks — 980 Kč  (ušetříš 460 Kč)\n📦 3 ks — 1 220 Kč  ⭐ NEJLEPŠÍ CENA\n\n✅ Originální  ✅ Rychlé doručení  ✅ Platba při doručení\n\nVětšina zákazníků bere 3 — stejné doručení, lepší cena 😊`,
        lv: `Tento model je 🔥 SUPER POPULÁRNÍ tagad!\n\n📦 1 gab — 720 Kč\n📦 2 gab — 980 Kč  (ietaupīsiet 460 Kč)\n📦 3 gab — 1 220 Kč  ⭐ NEJLEPŠÍ CENA\n\n✅ Oriģināls  ✅ Rychlé piegāde  ✅ Samaksa piegadē\n\nVětšina klientsů bere 3 — tas pats piegāde, labāks cena 😊`,
        lt: `Tento model je 🔥 SUPER POPULÁRNÍ dabar!\n\n📦 1 vnt — 720 Kč\n📦 2 vnt — 980 Kč  (sutaupysite 460 Kč)\n📦 3 vnt — 1 220 Kč  ⭐ NEJLEPŠÍ CENA\n\n✅ Originalus  ✅ Rychlé pristatymas  ✅ Mokejimas pristatant\n\nVětšina klientasů bere 3 — tas pats pristatymas, geresnis kaina 😊`,
        sk: `Tento model je 🔥 SUPER POPULÁRNÍ teraz!\n\n📦 1 ks — 720 Kč\n📦 2 ks — 980 Kč  (ušetríš 460 Kč)\n📦 3 ks — 1 220 Kč  ⭐ NEJLEPŠÍ CENA\n\n✅ Originálny  ✅ Rychlé doručenýie  ✅ Platba pri doručenýie\n\nVětšina zákazníků bere 3 — rovnaké doručenýie, lepší cena 😊`,
        hr: `Tento model je 🔥 SUPER POPULÁRNÍ sada!\n\n📦 1 kom — 720 Kč\n📦 2 kom — 980 Kč  (uštediš 460 Kč)\n📦 3 kom — 1 220 Kč  ⭐ NEJLEPŠÍ CENA\n\n✅ Originalan  ✅ Rychlé dostaava  ✅ Plaćanje pri isporuci\n\nVětšina kupaců bere 3 — isto dostaava, bolji cijena 😊`,
        es: `Tento model je 🔥 SUPER POPULÁRNÍ ahora!\n\n📦 1 un — 720 Kč\n📦 2 un — 980 Kč  (ahorras 460 Kč)\n📦 3 un — 1 220 Kč  ⭐ NEJLEPŠÍ CENA\n\n✅ Original  ✅ Rychlé entrega  ✅ Pago contra reembolso\n\nVětšina clienteů bere 3 — mismo entrega, mejor precio 😊`,
    },
    zh: `这款现在 🔥 超级热销！\n\n📦 1个 — ¥210\n📦 2个 — ¥280（省¥140）\n📦 3个 — ¥350 ⭐ 最超值\n\n✅ 正品  ✅ 快速发货  ✅ 货到付款\n\n大多数客户选3个——运费一样，价格更划算 😊`,
    tag: "报价",
    tagColor: "bg-blue-500/20 text-blue-400",
  },

  // ── Step 3 ──
  {
    title: "第三步：用户开始犹豫",
    subtitle: "短句建立信任，消除被骗顾虑",
    content: [
      "用户担心被骗，不是担心参数。",
      "用最短的话强调 COD 安全感。",
      "不要长篇大论，3句话解决问题。",
    ],
    scripts: {
      en: `No worries at all 😊\n\nYou ONLY pay when the courier hands you the package.\n\nNo online payment. No risk. 100% safe. ✅`,
      ro: `Nicio grijă 😊\n\nPlătești DOAR când curierul îți înmânează coletul.\n\nFără plată online. Fără risc. 100% sigur. ✅`,
      pl: `Żadnych obaw 😊\n\nPłacisz TYLKO gdy kurier wręczy Ci paczkę.\n\nBez płatności online. Bez ryzyka. 100% bezpieczne. ✅`,
      hu: `Semmi gond 😊\n\nCSAK akkor fizetsz, amikor a futár átadja a csomagot.\n\nNincs online fizetés. Nincs kockázat. 100% biztonságos. ✅`,
      pt: `Sem preocupações 😊\n\nSÓ pagas quando o estafeta te entregar o pacote.\n\nSem pagamento online. Sem risco. 100% seguro. ✅`,
      cs: `Žádné obavy 😊\n\nPlatíš POUZE když ti kurýr předá balíček.\n\nŽádná online platba. Žádné riziko. 100% bezpečné. ✅`,
        lv: `Nekādu raižu 😊\n\nMaksajat TIKAI když ti kurjers předá pakete.\n\nBez tiešsaistes maksajuma. Bez riska. 100% droši. ✅`,
        lt: `Jokiu rupesčiu 😊\n\nMokate TIK když ti kurjeris předá paketas.\n\nJokio mokejimo internetu. Jokios rizikas. 100% saugu. ✅`,
        sk: `Žiadne obavy 😊\n\nPlatíš IBA když ti kuriér předá balík.\n\nŽiadna online platba. Žiadne riziko. 100% bezpečné. ✅`,
        hr: `Nema brige 😊\n\nPlaćaš SAMO když ti dostaavljač předá paket.\n\nBez online plaćanja. Bez rizika. 100% sigurno. ✅`,
        es: `Sin preocupaciones 😊\n\nPagas SOLO když ti repartidor předá paquete.\n\nSin pago online. Sin riesgo. 100% seguro. ✅`,
    },
    zh: `完全不用担心 😊\n\n你只需要在快递员把包裹交到你手上时付款。\n\n不需要网上支付。没有风险。100% 安全。✅`,
    psychology: ["会不会先付款被骗", "这个商家靠不靠谱", "这个产品是真的吗"],
    antipattern: "不要长篇介绍公司历史和资质。用户真正担心的是：先付款被骗。",
    tag: "信任",
    tagColor: "bg-yellow-500/20 text-yellow-400",
  },

  // ── Step 4 ──
  {
    title: "第四步：制造成交压力",
    subtitle: "库存感 + 时间感 + 发货感三合一",
    content: [
      "用户不是不买，而是拖延。",
      "三个压力点同时出现效果最好。",
      "不要用假促销，用真实的发货时效。",
    ],
    scripts: {
      en: `⚠️ Quick update:\n\n🔥 This flavor is almost sold out today\n⏰ Our promo price ends at midnight\n🚚 Orders placed NOW ship same day\n\nDo you want me to reserve one for you? 👇`,
      ro: `⚠️ Update rapid:\n\n🔥 Această aromă e aproape epuizată azi\n⏰ Prețul promoțional expiră la miezul nopții\n🚚 Comenzile plasate ACUM se expediază în aceeași zi\n\nVrei să îți rezerv una? 👇`,
      pl: `⚠️ Szybka aktualizacja:\n\n🔥 Ten smak prawie się wyprzedał dziś\n⏰ Nasza cena promocyjna kończy się o północy\n🚚 Zamówienia złożone TERAZ wysyłamy tego samego dnia\n\nChcesz żebym zarezerwował dla Ciebie? 👇`,
      hu: `⚠️ Gyors frissítés:\n\n🔥 Ez az íz ma majdnem elfogyott\n⏰ Az akciós ár éjfélkor lejár\n🚚 A MOST leadott rendeléseket aznap szállítjuk\n\nRezerváljak neked egyet? 👇`,
      pt: `⚠️ Atualização rápida:\n\n🔥 Este sabor está quase esgotado hoje\n⏰ O nosso preço promocional termina à meia-noite\n🚚 Encomendas feitas AGORA são enviadas no mesmo dia\n\nQueres que reserve um para ti? 👇`,
      cs: `⚠️ Rychlá aktualizace:\n\n🔥 Tato příchuť je dnes skoro vyprodaná\n⏰ Naše promo cena končí o půlnoci\n🚚 Objednávky zadané TEĎKA posíláme tentýž den\n\nChceš, abych ti jeden rezervoval? 👇`,
        lv: `⚠️ Ātra atjaunināšana:\n\n🔥 Šī garša šodien ir gandrīz izpārdota\n⏰ Mūsu promo cena beidzas pusnaktī\n🚚 Pasūtījumi veikti TAGAD tiek sūtīti tajā pašā dienā\n\nVai vēlaties, lai rezervētu vienu jums? 👇`,
        lt: `⚠️ Greitas atnaujinimas:\n\n🔥 Šis skonis šiandien beveik išparduotas\n⏰ Musu akcijos kaina baigiasi vidurnakti\n🚚 Uzsakymai pateikti DABAR siunčiami ta pacia diena\n\nNorite, kad rezervuočiau viena jums? 👇`,
        sk: `⚠️ Rýchla aktualizácia:\n\n🔥 Táto príchuť je dnes takmer vypredaná\n⏰ Naša promo cena končí o polnoci\n🚚 Objednávky zadané TERAZ posielame v ten istý deň\n\nChceš, aby som ti jedeň rezervoval? 👇`,
        hr: `⚠️ Brzo ažuriranje:\n\n🔥 Ovaj okus je danas gotovo rasprodan\n⏰ Naša promo cijena završava u ponoć\n🚚 Narudžbe od SADA šaljemo isti dan\n\nŽeliš da ti rezerviram jedan? 👇`,
        es: `⚠️ Actualización rápida:\n\n🔥 Este sabor está casi agotado hoy\n⏰ Nuestro precio promo termina a medianoche\n🚚 Los pedidos de AHORA se envían el mismo día\n\n¿Quieres que te reserve uno? 👇`,
    },
    zh: `⚠️ 快速提醒：\n\n🔥 这个口味今天快卖完了\n⏰ 促销价格今晚零点截止\n🚚 现在下单今天就发货\n\n要我帮你留一个吗？👇`,
    tag: "催单",
    tagColor: "bg-orange-500/20 text-orange-400",
  },

  // ── Step 5 ──
  {
    title: "第五步：强推套餐",
    subtitle: "社会认同 + 价值对比 = 多件成交",
    content: [
      "东欧 COD 利润核心是多件成交。",
      '用"别人都这样买"制造社会认同。',
      "用运费对比强化3件的价值感。",
    ],
    scripts: {
      en: `Just so you know 👍\n\n90% of our customers choose the 3-pack.\n\nReason: shipping is the same price, so 3 pcs = much better value per piece.\n\nAnd if you love the flavor, you won't run out! 😄`,
      ro: `Să știi 👍\n\n90% din clienții noștri aleg pachetul de 3.\n\nMotiv: livrarea costă la fel, deci 3 buc = valoare mult mai bună per bucată.\n\nȘi dacă îți place aroma, nu rămâi fără! 😄`,
      pl: `Żebyś wiedział 👍\n\n90% naszych klientów wybiera pakiet 3 sztuk.\n\nPowód: wysyłka kosztuje tyle samo, więc 3 szt = znacznie lepsza wartość za sztukę.\n\nA jeśli polubisz smak, nie skończy ci się! 😄`,
      hu: `Csak hogy tudd 👍\n\nVevőink 90%-a a 3 darabos csomagot választja.\n\nOk: a szállítás ugyanannyiba kerül, tehát 3 db = sokkal jobb ár darabonként.\n\nÉs ha szereted az ízt, nem fogy el! 😄`,
      pt: `Para teres uma ideia 👍\n\n90% dos nossos clientes escolhem o pack de 3.\n\nRazão: o envio custa o mesmo, então 3 un = muito melhor valor por unidade.\n\nE se adorares o sabor, não ficas sem! 😄`,
      cs: `Jen pro info 👍\n\n90% našich zákazníků si bere balíček 3 kusů.\n\nDůvod: doprava stojí stejně, takže 3 ks = mnohem lepší hodnota za kus.\n\nA pokud ti příchuť zachutná, nedojde ti! 😄`,
        lv: `Tikai informācijai 👍\n\n90% našich klientu izvēlas 3 vienību paketi.\n\nDůvod: piegāde maksā tikpat, tātad 3 gab = daudz labāka vērtība par vienību.\n\nUn ja garša patīk, tā nebeigsies! 😄`,
        lt: `Tik informacijai 👍\n\n90% našich klientu pasirenka 3 vienetu paketa.\n\nDůvod: pristatymas kainuoja tiek pat, taigi 3 vnt = daug geresnė verte uz vienetą.\n\nIr jei jums patiks skonis, jo netrūks! 😄`,
        sk: `Len pre info 👍\n\n90% našich zákazníkov si berie balík 3 kusov.\n\nDůvod: doprava stojí rovnako, takže 3 ks = oveľa lepšia hodnota za kus.\n\nA ak ti príchuť zachutná, nedôjde ti! 😄`,
        hr: `Samo za info 👍\n\n90% našich kupaca uzima paket od 3 komada.\n\nDůvod: dostaava košta isto, dakle 3 kom = puno bolja vrijednost po komadu.\n\nI ako ti se okus svidi, neće ti ponestati! 😄`,
        es: `Solo para que sepas 👍\n\n90% našich de los clientes eligen el pack de 3.\n\nDůvod: el envío cuesta lo mismo, así que 3 un = mucho mejor valor por unidad.\n\nY si te gusta el sabor, no se te acabará! 😄`,
    },
    zh: `告诉你一个情况 👍\n\n我们90%的客户都选3件装。\n\n原因：运费一样，所以3件=每件更划算。\n\n而且如果你喜欢这个口味，就不会用完了！😄`,
    signals: ["COD 运费高，单件利润低", "多件才真正赚錢", "用社会认同推动多件成交"],
    tag: "套餐",
    tagColor: "bg-purple-500/20 text-purple-400",
  },

  // ── Step 6 ──
  {
    title: "第六步：收地址成交",
    subtitle: "直接收地址，不要继续闲聊",
    content: [
      "用户问发货/库存时，直接收地址。",
      "不要继续闲聊，进入收单模式。",
      "格式要清晰，减少用户填写错误。",
    ],
    scripts: {
      en: `Great choice! 🎉\n\nTo ship your order today, please send me:\n\n👤 Full Name:\n📱 Phone Number:\n🏙️ City:\n🏠 Full Address:\n📮 Postal Code:\n\nI'll confirm everything right away! ✅`,
      ro: `Alegere excelentă! 🎉\n\nPentru a expedia comanda ta azi, te rog trimite-mi:\n\n👤 Nume Complet:\n📱 Număr de Telefon:\n🏙️ Oraș:\n🏠 Adresă Completă:\n📮 Cod Poștal:\n\nConfirm totul imediat! ✅`,
      pl: `Świetny wybór! 🎉\n\nAby wysłać Twoje zamówienie dziś, proszę podaj mi:\n\n👤 Pełne Imię i Nazwisko:\n📱 Numer Telefonu:\n🏙️ Miasto:\n🏠 Pełny Adres:\n📮 Kod Pocztowy:\n\nPotwierdzę wszystko od razu! ✅`,
      hu: `Remek választás! 🎉\n\nA mai szállításhoz kérlek küldd el:\n\n👤 Teljes Név:\n📱 Telefonszám:\n🏙️ Város:\n🏠 Teljes Cím:\n📮 Irányítószám:\n\nAzonnal megerősítem! ✅`,
      pt: `Ótima escolha! 🎉\n\nPara enviar hoje, por favor envia-me:\n\n👤 Nome Completo:\n📱 Número de Telefone:\n🏙️ Cidade:\n🏠 Morada Completa:\n📮 Código Postal:\n\nConfirmo tudo imediatamente! ✅`,
      cs: `Skvělá volba! 🎉\n\nPro dnešní odeslání mi prosím pošli:\n\n👤 Celé Jméno:\n📱 Telefonní Číslo:\n🏙️ Město:\n🏠 Celá Adresa:\n📮 PSČ:\n\nHned vše potvrdím! ✅`,
        lv: `Lieliska izvēle! 🎉\n\nLai nosūtītu šodien, lūdzu nosūtiet man:\n\n👤 Pilns Vārds:\n📱 Tālrunisa Numurs:\n🏙️ Pilsēta:\n🏠 Pilna Adrese:\n📮 PSČ:\n\nUzreiz visu apstiprināšu! ✅`,
        lt: `Puikus pasirinkimas! 🎉\n\nNoredami išsiusti šiandien, prasome atsiusti:\n\n👤 Pilnas Vardas:\n📱 Telefonaso Numeris:\n🏙️ Miestas:\n🏠 Pilnas Adresass:\n📮 PSČ:\n\nIš karto viska patvirtinsiu! ✅`,
        sk: `Skvelá voľba! 🎉\n\nPre dnešné odoslanie mi prosím pošli:\n\n👤 Celé Meno:\n📱 Telefónne Číslo:\n🏙️ Mesto:\n🏠 Celá Adresa:\n📮 PSČ:\n\nHneď všetko potvrdím! ✅`,
        hr: `Odličan izbor! 🎉\n\nZa slanje danas, molim pošalji mi:\n\n👤 Puno Ime:\n📱 Broj Telefona:\n🏙️ Grad:\n🏠 Puna Adresa:\n📮 PSČ:\n\nOdmah ću sve potvrditi! ✅`,
        es: `¡Excelente elección! 🎉\n\nPara enviarlo hoy, por favor envíame:\n\n👤 Nombre Completo:\n📱 Número de Teléfono:\n🏙️ Ciudad:\n🏠 Dirección Completa:\n📮 PSČ:\n\nConfirmo todo enseguida! ✅`,
    },
    zh: `好的！🎉\n\n为了今天发货，请告诉我：\n\n👤 全名：\n📱 手机号：\n🏙️ 城市：\n🏠 详细地址：\n📮 邮政编码：\n\n我马上确认！✅`,
    signals: ["还有货吗？", "今天能发吗？", "多久到？", "怎么下单？"],
    tag: "收单",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },

  // ── Step 7 ──
  {
    title: "第七步：确认订单",
    subtitle: "强化已下单心理，降低后悔和拒收",
    content: [
      '强化"已经下单"的心理锚点。',
      "让客户感觉包裹已经在路上了。",
      "加入预计到达时间增加真实感。",
    ],
    scripts: {
      en: `✅ Order Confirmed!\n\nYour package is being prepared now 📦\nExpected delivery: 2-3 working days 🚚\n\nWe'll send you a tracking update once shipped.\n\nThank you for choosing CLOUD VAPE! 🙏`,
      ro: `✅ Comandă Confirmată!\n\nColetul tău este pregătit acum 📦\nLivrare estimată: 2-3 zile lucrătoare 🚚\n\nÎți vom trimite actualizare de tracking după expediere.\n\nMulțumim că ai ales CLOUD VAPE! 🙏`,
      pl: `✅ Zamówienie Potwierdzone!\n\nTwoja paczka jest teraz przygotowywana 📦\nSzacowana dostawa: 2-3 dni robocze 🚚\n\nWyślemy Ci aktualizację śledzenia po wysyłce.\n\nDziękujemy za wybór CLOUD VAPE! 🙏`,
      hu: `✅ Rendelés Megerősítve!\n\nA csomagod most készül 📦\nVárható kézbesítés: 2-3 munkanap 🚚\n\nKüldünk egy nyomkövetési frissítést a feladás után.\n\nKöszönjük, hogy a CLOUD VAPE-t választottad! 🙏`,
      pt: `✅ Encomenda Confirmada!\n\nO teu pacote está a ser preparado agora 📦\nEntrega prevista: 2-3 dias úteis 🚚\n\nEnviaremos uma atualização de rastreamento após o envio.\n\nObrigado por escolheres a CLOUD VAPE! 🙏`,
      cs: `✅ Objednávka Potvrzena!\n\nTvůj balíček se právě připravuje 📦\nOčekávané doručení: 2-3 pracovní dny 🚚\n\nPo odeslání ti pošleme aktualizaci sledování.\n\nDíky, že jsi zvolil CLOUD VAPE! 🙏`,
        lv: `✅ Pasūtījums Apstiprināts!\n\nJūsu pakete šobrīd tiek sagatavota 📦\nParedzamā piegāde: 2-3 darba dienas 🚚\n\nPēc nosūtīšanas atsūtīsim izsekošanas atjauninājumu.\n\nPaldies, ka izvēlējāties CLOUD VAPE! 🙏`,
        lt: `✅ Uzsakymas Patvirtintas!\n\nJusu paketas šiuo metu ruošiamas 📦\nNumatomas pristatymas: 2-3 darbo dienos 🚚\n\nPo išsiuntimo atsiusime sekimo atnaujinima.\n\nDekojame, kad pasirinkote CLOUD VAPE! 🙏`,
        sk: `✅ Objednávka Potvrdeňá!\n\nTvoj balík sa práve pripravuje 📦\nOčakávané doručenýie: 2-3 pracovné dni 🚚\n\nPo odoslaní ti pošleme aktualizáciu sledovania.\n\nĎakujeme, že si zvolil CLOUD VAPE! 🙏`,
        hr: `✅ Narudžba Potvrđena!\n\nTvoj paket se upravo priprema 📦\nOčekivana dostaava: 2-3 radna dana 🚚\n\nNakon slanja poslati ćemo ti ažuriranje praćenja.\n\nHvala što si odabrao CLOUD VAPE! 🙏`,
        es: `✅ ¡Pedido Confirmado!\n\nTu paquete se está preparando ahora 📦\nEntrega prevista: 2-3 días laborables 🚚\n\nTe enviaremos seguimiento tras el envío.\n\nGracias por elegir CLOUD VAPE! 🙏`,
    },
    zh: `✅ 订单已确认！\n\n您的包裹正在打包中 📦\n预计到达：2-3个工作日 🚚\n\n发货后我们会发送快递单号给您。\n\n感谢选择 CLOUD VAPE！🙏`,
    signals: ["持续联系用户", "强化已经下单心理", "增加真实发货感"],
    tag: "确认",
    tagColor: "bg-teal-500/20 text-teal-400",
  },

  // ── Step 8 ──
  {
    title: "第八步：发货后跟进",
    subtitle: "发快递单号，持续建立真实感",
    content: [
      "发货后立即通知，建立真实感。",
      "附上快递单号或快递公司名称。",
      "告知大概到达时间，降低焦虑。",
    ],
    scripts: {
      en: `Your order is on its way! 🚚\n\nTracking: [TRACKING_NUMBER]\nCarrier: [CARRIER_NAME]\n\nYou can track it here: [TRACKING_LINK]\n\nExpected arrival: [DATE] 📅\n\nAny questions, just message me! 😊`,
      ro: `Comanda ta este în drum! 🚚\n\nTracking: [NUMĂR_TRACKING]\nCurier: [NUME_CURIER]\n\nPoți urmări aici: [LINK_TRACKING]\n\nSosire estimată: [DATA] 📅\n\nOrice întrebări, scrie-mi! 😊`,
      pl: `Twoje zamówienie jest w drodze! 🚚\n\nŚledzenie: [NUMER_ŚLEDZENIA]\nKurier: [NAZWA_KURIERA]\n\nMożesz śledzić tutaj: [LINK_ŚLEDZENIA]\n\nOczekiwane przybycie: [DATA] 📅\n\nJakieś pytania, napisz mi! 😊`,
      hu: `A rendelésed úton van! 🚚\n\nNyomkövetés: [NYOMKÖVETÉSI_SZÁM]\nFutár: [FUTÁR_NEVE]\n\nKövesd nyomon itt: [NYOMKÖVETÉSI_LINK]\n\nVárható érkezés: [DÁTUM] 📅\n\nBármilyen kérdés esetén írj! 😊`,
      pt: `A tua encomenda está a caminho! 🚚\n\nRastreamento: [NÚMERO_RASTREAMENTO]\nTransportadora: [NOME_TRANSPORTADORA]\n\nPodes rastrear aqui: [LINK_RASTREAMENTO]\n\nChegada prevista: [DATA] 📅\n\nQualquer dúvida, manda mensagem! 😊`,
      cs: `Tvoje objednávka je na cestě! 🚚\n\nSledování: [ČÍSLO_SLEDOVÁNÍ]\nDopravce: [NÁZEV_DOPRAVCE]\n\nMůžeš sledovat zde: [ODKAZ_SLEDOVÁNÍ]\n\nOčekávaný příjezd: [DATUM] 📅\n\nJakékoliv dotazy, napiš mi! 😊`,
        lv: `Jūsu pasūtījums ir ceļā! 🚚\n\nIzsekošana: [ČÍSLO_SLEDOVÁNÍ]\nPārvadātājs: [NÁZEV_DOPRAVCE]\n\nVarat izsekot šeit: [ODKAZ_SLEDOVÁNÍ]\n\nParedzamais ierašanās laiks: [DATUM] 📅\n\nJebkuri jautājumi, rakstiet man! 😊`,
        lt: `Jusu uzsakymas pakeliui! 🚚\n\nSekimas: [ČÍSLO_SLEDOVÁNÍ]\nVezėjas: [NÁZEV_DOPRAVCE]\n\nGalite sekti čia: [ODKAZ_SLEDOVÁNÍ]\n\nNumatomas atvykimas: [DATUM] 📅\n\nBet kokiu klausimu, rašykite man! 😊`,
        sk: `Tvoja objednávka je na ceste! 🚚\n\nSledovanie: [ČÍSLO_SLEDOVÁNÍ]\nDopravca: [NÁZEV_DOPRAVCE]\n\nMôžeš sledovať tu: [ODKAZ_SLEDOVÁNÍ]\n\nOčakávaný príchod: [DATUM] 📅\n\nAkékoľvek otázky, napíš mi! 😊`,
        hr: `Tvoja narudžba je na putu! 🚚\n\nPraćenje: [ČÍSLO_SLEDOVÁNÍ]\nPrijevoznik: [NÁZEV_DOPRAVCE]\n\nMožeš pratiti ovdje: [ODKAZ_SLEDOVÁNÍ]\n\nOčekivani dolazak: [DATUM] 📅\n\nBilo kakva pitanja, piši mi! 😊`,
        es: `¡Tu pedido está en camino! 🚚\n\nSeguimiento: [ČÍSLO_SLEDOVÁNÍ]\nTransportista: [NÁZEV_DOPRAVCE]\n\nPuedes rastrearlo aquí: [ODKAZ_SLEDOVÁNÍ]\n\nLlegada prevista: [DATUM] 📅\n\nCualquier duda, escríbeme! 😊`,
    },
    zh: `您的订单已发出！🚚\n\n快递单号：[快递单号]\n快递公司：[快递公司]\n\n查询链接：[查询链接]\n\n预计到达：[日期] 📅\n\n有任何问题随时联系我！😊`,
    signals: ["发货后立即通知，建立真实感", "附上快递单号或快递公司名称", "告知大概到达时间，降低焦虑"],
    tag: "发货",
    tagColor: "bg-sky-500/20 text-sky-400",
  },

  // ── Step 9 ──
  {
    title: "第九步：派送当天提醒",
    subtitle: "提前通知准备现金，明显降低拒收率",
    content: [
      "派送提醒是降低拒收率最有效的动作。",
      "提前让客户准备好现金。",
      "强调今天到，制造期待感。",
    ],
    scripts: {
      en: `Hi! 👋 Great news!\n\nYour CLOUD VAPE order is out for delivery TODAY 🚚\n\nPlease:\n✅ Keep your phone on\n✅ Have [AMOUNT] cash ready for the courier\n✅ Be available at your address\n\nEnjoy your new vape! 🔥`,
      ro: `Bună! 👋 Vești bune!\n\nComanda ta CLOUD VAPE este în livrare AZI 🚚\n\nTe rugăm:\n✅ Păstrează telefonul pornit\n✅ Pregătește [SUMĂ] lei cash pentru curier\n✅ Fii disponibil la adresa ta\n\nBucură-te de noul tău vape! 🔥`,
      pl: `Cześć! 👋 Świetne wieści!\n\nTwoje zamówienie CLOUD VAPE jest dziś dostarczane 🚚\n\nProszę:\n✅ Trzymaj telefon włączony\n✅ Przygotuj [KWOTA] zł gotówki dla kuriera\n✅ Bądź dostępny pod swoim adresem\n\nCiesz się nowym vape'em! 🔥`,
      hu: `Szia! 👋 Jó hírek!\n\nA CLOUD VAPE rendelésed MA kézbesítés alatt van 🚚\n\nKérjük:\n✅ Tartsd bekapcsolva a telefonod\n✅ Készíts elő [ÖSSZEG] Ft készpénzt a futárnak\n✅ Légy elérhető a címeden\n\nÉlvezd az új vape-ed! 🔥`,
      pt: `Olá! 👋 Boas notícias!\n\nA tua encomenda CLOUD VAPE está em entrega HOJE 🚚\n\nPor favor:\n✅ Mantém o telemóvel ligado\n✅ Tem [VALOR] € em dinheiro para o estafeta\n✅ Está disponível no teu endereço\n\nDesfruta do teu novo vape! 🔥`,
      cs: `Ahoj! 👋 Skvělé zprávy!\n\nTvoje objednávka CLOUD VAPE je dnes doručována 🚚\n\nProsím:\n✅ Nech telefon zapnutý\n✅ Připrav [ČÁSTKA] Kč hotovost pro kurýra\n✅ Buď dostupný na své adrese\n\nUžij si nový vape! 🔥`,
        lv: `Ahoj! 👋 Lieliskas ziņas!\n\nJūsu CLOUD VAPE pasūtījums šodien tiek piegādāts 🚚\n\nLūdzu:\n✅ Turiet tālruni ieslēgtu\n✅ Sagatavojiet [ČÁSTKA] Kč skaidru naudu kurjeram\n✅ Esiet pieejams savā adresē\n\nBaudiet savu jauno vape! 🔥`,
        lt: `Ahoj! 👋 Puikios naujienos!\n\nJusu CLOUD VAPE uzsakymas šiandien pristatomas 🚚\n\nPrašau:\n✅ Laikykite telefonasa ijungta\n✅ Paruoškite [ČÁSTKA] Kč grynaisiais kurjeriui\n✅ Bukite pasiekiami savo adresu\n\nMegaukites nauju vape! 🔥`,
        sk: `Ahoj! 👋 Skvelé správy!\n\nTvoja objednávka CLOUD VAPE sa dnes doručuje 🚚\n\nProsím:\n✅ Nechaj telefón zapnutý\n✅ Priprav [ČÁSTKA] Kč hotovosť pre kuriéra\n✅ Buď dosťupný na svojej adrese\n\nUžívaj si nový vape! 🔥`,
        hr: `Ahoj! 👋 Sjajne vijesti!\n\nTvoja narudžba CLOUD VAPE se danas dostaavlja 🚚\n\nMolim:\n✅ Drži telefon uključen\n✅ Pripremi [ČÁSTKA] Kč gotovinu za dostaavljača\n✅ Budi dostaupan na svojoj adresi\n\nUživaj u novom vapeu! 🔥`,
        es: `Ahoj! 👋 ¡Buenas noticias!\n\nTu pedido CLOUD VAPE está en reparto HOY 🚚\n\nPor favor:\n✅ Ten el teléfono encendido\n✅ Prepara [ČÁSTKA] Kč en efectivo para el repartidor\n✅ Está disponible en tu dirección\n\nDisfruta tu nuevo vape! 🔥`,
    },
    zh: `嗨！👋 好消息！\n\n您的 CLOUD VAPE 订单今天配送 🚚\n\n请：\n✅ 保持手机开机\n✅ 准备好 [金额] 现金给快递员\n✅ 在家等候\n\n享受您的新电子烟！🔥`,
    psychology: ["客户可能已忘记订单", "派送当天提前告知最有效", "让客户提前准备现金是降低拒收的核心动作"],
    tag: "提醒",
    tagColor: "bg-amber-500/20 text-amber-400",
  },

  // ── Step 10 ──
  {
    title: "第十步：签收后做复购",
    subtitle: "3-7天后跟进，真正赚钱靠复购",
    content: [
      "真正赚钱靠复购，不是首单。",
      "3-7天后跟进，问使用体验。",
      "给专属折扣码，降低复购门槛。",
    ],
    scripts: {
      en: `Hey [Name]! 👋\n\nHow are you enjoying the vape? 😊\n\nWe just got NEW flavors in stock 🔥\n\nAs a returning customer, here's your exclusive discount:\n🎁 Code: VAPE15 → 15% OFF your next order\n\nValid this week only! Want to see the new flavors? 👇`,
      ro: `Hei [Nume]! 👋\n\nCum îți place vape-ul? 😊\n\nTocmai am primit AROME NOI în stoc 🔥\n\nCa client fidel, iată reducerea ta exclusivă:\n🎁 Cod: VAPE15 → 15% REDUCERE la următoarea comandă\n\nValabil doar această săptămână! Vrei să vezi aromele noi? 👇`,
      pl: `Hej [Imię]! 👋\n\nJak ci się podoba vape? 😊\n\nWłaśnie dostaliśmy NOWE smaki na stanie 🔥\n\nJako stały klient, oto twój ekskluzywny rabat:\n🎁 Kod: VAPE15 → 15% ZNIŻKI na następne zamówienie\n\nWażny tylko w tym tygodniu! Chcesz zobaczyć nowe smaki? 👇`,
      hu: `Hé [Név]! 👋\n\nHogy tetszik a vape? 😊\n\nÉppen kaptunk ÚJ ízeket készletre 🔥\n\nVisszatérő vevőként itt a kizárólagos kedvezményed:\n🎁 Kód: VAPE15 → 15% KEDVEZMÉNY a következő rendelésre\n\nCsak ezen a héten érvényes! Szeretnéd látni az új ízeket? 👇`,
      pt: `Ei [Nome]! 👋\n\nComo estás a gostar do vape? 😊\n\nAcabámos de receber NOVOS sabores em stock 🔥\n\nComo cliente fiel, aqui está o teu desconto exclusivo:\n🎁 Código: VAPE15 → 15% DESCONTO na próxima encomenda\n\nVálido só esta semana! Queres ver os novos sabores? 👇`,
      cs: `Hej [Jméno]! 👋\n\nJak ti chutná vape? 😊\n\nPrávě jsme dostali NOVÉ příchutě na sklad 🔥\n\nJako věrný zákazník máš exkluzivní slevu:\n🎁 Kód: VAPE15 → 15% SLEVA na příští objednávku\n\nPlatí jen tento týden! Chceš vidět nové příchutě? 👇`,
        lv: `Hej [Vārds]! 👋\n\nJak ti chutná vape? 😊\n\nTikko saņēmām JAUNAS garšas noliktavā 🔥\n\nJako uzticīgs klients máš ekskluzīvs slevu:\n🎁 Kods: VAPE15 → 15% SLEVA na příští objednávku\n\nPlatí tikai tento týdiena! Vai vēlaties redzēt jaunās garšas? 👇`,
        lt: `Hej [Vardas]! 👋\n\nJak ti chutná vape? 😊\n\nKa tik gavome NAUJU skoniu i sandeli 🔥\n\nJako ištikimas klientas máš išskirtinis slevu:\n🎁 Kodas: VAPE15 → 15% SLEVA na příští objednávku\n\nPlatí tik tento týdiena! Norite pamatyti naujus skonius? 👇`,
        sk: `Hej [Meno]! 👋\n\nJak ti chutná vape? 😊\n\nPráve sme dosťali NOVÉ príchute na sklad 🔥\n\nJako verný zákazník máš exkluzívny slevu:\n🎁 Kód: VAPE15 → 15% SLEVA na příští objednávku\n\nPlatí len tento týdeň! Chceš vidieť nové príchute? 👇`,
        hr: `Hej [Ime]! 👋\n\nJak ti chutná vape? 😊\n\nUpravo smo dobili NOVE okuse na zalihu 🔥\n\nJako vjeran kupac máš ekskluzivno slevu:\n🎁 Kod: VAPE15 → 15% SLEVA na příští objednávku\n\nPlatí samo tento týdan! Želiš vidjeti nove okuse? 👇`,
        es: `Hej [Nombre]! 👋\n\nJak ti chutná vape? 😊\n\nAcabamos de recibir NUEVOS sabores en stock 🔥\n\nJako fiel cliente máš exclusivo slevu:\n🎁 Código: VAPE15 → 15% SLEVA na příští objednávku\n\nPlatí solo tento týdía! ¿Quieres ver los nuevos sabores? 👇`,
    },
    zh: `嗨 [姓名]！👋\n\n电子烟用得怎么样？😊\n\n我们刚到了新口味 🔥\n\n作为老客户，这是您的专属优惠：\n🎁 优惠码：VAPE15 → 下单立减15%\n\n本周有效！想看看新口味吗？👇`,
    signals: ["真正赚钱靠复购，不是首单", "3-7天后跟进，不要直接推销", "先问体验再推活动"],
    tag: "复购",
    tagColor: "bg-rose-500/20 text-rose-400",
  },

  // ─── BONUS SCENARIOS ──────────────────────────────────────────────────────

  {
    title: "加餐A：用户说太贵了",
    subtitle: "价值重构 + COD 安全感化解价格异议",
    content: [
      "不要直接降价，先重构价值。",
      "用每天成本对比让价格显得合理。",
      "再次强调 COD 零风险。",
    ],
    scripts: {
      en: `I totally understand 😊\n\nLet me put it this way:\n3 pcs = €49 ÷ 90 days = less than €0.55/day\n\nThat's cheaper than a coffee ☕\n\nAnd remember — you pay ZERO upfront.\nOnly cash when it arrives. 100% risk-free ✅`,
      ro: `Înțeleg perfect 😊\n\nLasă-mă să îți explic altfel:\n3 buc = 249 lei ÷ 90 zile = mai puțin de 2.8 lei/zi\n\nMai ieftin decât o cafea ☕\n\nȘi ține minte — plătești ZERO în avans.\nDoar cash când ajunge. 100% fără risc ✅`,
      pl: `Doskonale rozumiem 😊\n\nPozwól, że to ujmę inaczej:\n3 szt = 210 zł ÷ 90 dni = mniej niż 2.3 zł/dzień\n\nTaniej niż kawa ☕\n\nI pamiętaj — płacisz ZERO z góry.\nTylko gotówka gdy dotrze. 100% bez ryzyka ✅`,
      hu: `Teljesen értem 😊\n\nHadd fogalmazzam meg másképp:\n3 db = 18 900 Ft ÷ 90 nap = kevesebb mint 210 Ft/nap\n\nOlcsóbb mint egy kávé ☕\n\nÉs ne feledd — NULLÁT fizetsz előre.\nCsak készpénz amikor megérkezik. 100% kockázatmentes ✅`,
      pt: `Percebo perfeitamente 😊\n\nDeixa-me colocar de outra forma:\n3 un = €49 ÷ 90 dias = menos de €0.55/dia\n\nMais barato que um café ☕\n\nE lembra — pagas ZERO adiantado.\nSó dinheiro quando chegar. 100% sem risco ✅`,
      cs: `Naprosto chápu 😊\n\nDovolte mi to říct jinak:\n3 ks = 1 220 Kč ÷ 90 dní = méně než 14 Kč/den\n\nLevnější než káva ☕\n\nA pamatuj — platíš NULA předem.\nJen hotovost když dorazí. 100% bez rizika ✅`,
        lv: `Naprosto chápu 😊\n\nDovolte mi to říct jinak:\n3 gab = 1 220 Kč ÷ 90 dienas = mazāk než 14 Kč/diena\n\nLētāks než káva ☕\n\nA pamatuj — platíš NULA předem.\nTikai skaidra nauda když dorazí. 100% bez rizika ✅`,
        lt: `Naprosto chápu 😊\n\nDovolte mi to říct jinak:\n3 vnt = 1 220 Kč ÷ 90 dienų = mažiau než 14 Kč/diena\n\nPigesnis než káva ☕\n\nA pamatuj — platíš NULA předem.\nTik grynaisiais když dorazí. 100% bez rizika ✅`,
        sk: `Naprosto chápu 😊\n\nDovolte mi to říct jinak:\n3 ks = 1 220 Kč ÷ 90 dní = menej než 14 Kč/deň\n\nLacnejší než káva ☕\n\nA pamatuj — platíš NULA předem.\nLen hotovosť když dorazí. 100% bez rizika ✅`,
        hr: `Naprosto chápu 😊\n\nDovolte mi to říct jinak:\n3 kom = 1 220 Kč ÷ 90 dana = manje než 14 Kč/dan\n\nJeftiniji než káva ☕\n\nA pamatuj — platíš NULA předem.\nSamo gotovina když dorazí. 100% bez rizika ✅`,
        es: `Naprosto entiendo 😊\n\nDovolte mi to říct jinak:\n3 un = 1 220 Kč ÷ 90 días = menos než 14 Kč/día\n\nMás barato než káva ☕\n\nA pamatuj — platíš NULA předem.\nSolo efectivo když dorazí. 100% bez rizika ✅`,
    },
    zh: `完全理解您的想法 😊\n\n换个角度看：\n3个 = ¥350 ÷ 90天 = 每天不到¥4\n\n比一杯奶茶还便宜 ☕\n\n而且记住——您不需要提前付任何钱。\n收到货再付现金。100% 零风险 ✅`,
    tag: "异议",
    tagColor: "bg-pink-500/20 text-pink-400",
    bonus: true,
  },

  {
    title: "加餐B：用户收货后拒绝付款",
    subtitle: "冷静处理，保住关系，争取二次机会",
    content: [
      "不要情绪化，保持专业态度。",
      "给出一个台阶，让用户有理由接受。",
      "记录此号码，下次要求预付定金。",
    ],
    scripts: {
      en: `Hi, I understand 😊\n\nNo problem at all — please just return the package to the courier unopened.\n\nIf you change your mind, I'm always here.\nNext time I can offer you a special deal 🎁\n\nHave a great day! 👋`,
      ro: `Bună, înțeleg 😊\n\nNicio problemă — te rog doar returnează coletul curierului neoprit.\n\nDacă te răzgândești, sunt mereu aici.\nData viitoare îți pot oferi o ofertă specială 🎁\n\nO zi bună! 👋`,
      pl: `Cześć, rozumiem 😊\n\nŻaden problem — proszę tylko zwróć paczkę kurierowi nieotwartą.\n\nJeśli zmienisz zdanie, zawsze tu jestem.\nNastępnym razem mogę zaoferować specjalną ofertę 🎁\n\nMiłego dnia! 👋`,
      hu: `Szia, értem 😊\n\nSemmi gond — kérlek csak add vissza a csomagot a futárnak bontatlanul.\n\nHa meggondolod magad, mindig itt vagyok.\nLegközelebb különleges ajánlatot tudok adni 🎁\n\nSzép napot! 👋`,
      pt: `Olá, percebo 😊\n\nSem problema — por favor devolve o pacote ao estafeta sem abrir.\n\nSe mudares de ideias, estou sempre aqui.\nDa próxima vez posso oferecer um negócio especial 🎁\n\nBom dia! 👋`,
      cs: `Ahoj, chápu 😊\n\nŽádný problém — prosím jen vrať balíček kurýrovi neotevřený.\n\nPokud si to rozmyslíš, jsem vždy tady.\nPříště ti mohu nabídnout speciální deal 🎁\n\nHezký den! 👋`,
        lv: `Ahoj, chápu 😊\n\nŽádný problēma — lūdzu tikai vrať pakete kurjersovi neotevřený.\n\nJa si to rozmyslíš, jsem vienmēr tady.\nPříště ti mohu nabídnout īpaša deal 🎁\n\nHezký diena! 👋`,
        lt: `Ahoj, chápu 😊\n\nŽádný problema — prašau tik vrať paketas kurjerisovi neotevřený.\n\nJei si to rozmyslíš, jsem visada tady.\nPříště ti mohu nabídnout speciali deal 🎁\n\nHezký diena! 👋`,
        sk: `Ahoj, chápu 😊\n\nŽádný problém — prosím len vrať balík kuriérovi neotevřený.\n\nAk si to rozmyslíš, jsem vždy tady.\nPříště ti mohu nabídnout špeciálna deal 🎁\n\nHezký deň! 👋`,
        hr: `Ahoj, chápu 😊\n\nŽádný problem — molim samo vrať paket dostaavljačovi neotevřený.\n\nAko si to rozmyslíš, jsem uvijek tady.\nPříště ti mohu nabídnout posebna deal 🎁\n\nHezký dan! 👋`,
        es: `Ahoj, entiendo 😊\n\nŽádný problema — por favor solo vrať paquete repartidorovi neotevřený.\n\nSi si to rozmyslíš, jsem siempre tady.\nPříště ti mohu nabídnout especial deal 🎁\n\nHezký día! 👋`,
    },
    zh: `你好，我理解 😊\n\n完全没问题——请把包裹原封不动退还给快递员就好。\n\n如果您改变主意，我随时在这里。\n下次我可以给您一个特别优惠 🎁\n\n祝您愉快！👋`,
    tag: "拒收",
    tagColor: "bg-red-500/20 text-red-400",
    bonus: true,
  },

  {
    title: "加餐C：用户询问真假/正品",
    subtitle: "用证据说话，不要只说是正品",
    content: [
      "不要只说是正品，要提供证据。",
      "发仓库视频/开箱视频效果最好。",
      "强调 COD 本身就是最好的保障。",
    ],
    scripts: {
      en: `Great question! 👍\n\nAll our products are 100% original:\n✅ We buy directly from authorized distributors\n✅ Every product has a QR verification code\n✅ You can check authenticity on the brand's website\n\nAnd the best proof? 👇\nYou pay ONLY when you receive it.\nIf it's fake — don't pay. Simple as that! 💪`,
      ro: `Întrebare bună! 👍\n\nToate produsele noastre sunt 100% originale:\n✅ Cumpărăm direct de la distribuitori autorizați\n✅ Fiecare produs are cod QR de verificare\n✅ Poți verifica autenticitatea pe site-ul brandului\n\nȘi cea mai bună dovadă? 👇\nPlătești DOAR când primești.\nDacă e fals — nu plătești. Simplu! 💪`,
      pl: `Świetne pytanie! 👍\n\nWszystkie nasze produkty są w 100% oryginalne:\n✅ Kupujemy bezpośrednio od autoryzowanych dystrybutorów\n✅ Każdy produkt ma kod QR do weryfikacji\n✅ Możesz sprawdzić autentyczność na stronie marki\n\nA najlepszy dowód? 👇\nPłacisz TYLKO gdy otrzymasz.\nJeśli jest fałszywy — nie płacisz. Proste! 💪`,
      hu: `Jó kérdés! 👍\n\nMinden termékünk 100% eredeti:\n✅ Közvetlenül engedélyezett forgalmazóktól vásárolunk\n✅ Minden terméknek van QR ellenőrző kódja\n✅ A márka weboldalán ellenőrizheted a hitelességet\n\nÉs a legjobb bizonyíték? 👇\nCsak akkor fizetsz, amikor megkapod.\nHa hamis — nem fizetsz. Ilyen egyszerű! 💪`,
      pt: `Boa pergunta! 👍\n\nTodos os nossos produtos são 100% originais:\n✅ Compramos diretamente de distribuidores autorizados\n✅ Cada produto tem código QR de verificação\n✅ Podes verificar a autenticidade no site da marca\n\nE a melhor prova? 👇\nPagas APENAS quando recebes.\nSe for falso — não pagas. Simples assim! 💪`,
      cs: `Skvělá otázka! 👍\n\nVšechny naše produkty jsou 100% originální:\n✅ Nakupujeme přímo od autorizovaných distributorů\n✅ Každý produkt má QR ověřovací kód\n✅ Pravost si můžeš ověřit na webu značky\n\nA nejlepší důkaz? 👇\nPlatíš POUZE když dostaneš.\nPokud je falešný — neplatíš. Jednoduché! 💪`,
        lv: `Skvělá otázka! 👍\n\nVšechny naše produkty jsou 100% oriģināls:\n✅ Nakupujeme přímo od autorizovaných distributorů\n✅ Katrs produkt má QR pārbaudiovací kods\n✅ Pravost si můžeš pārbaudīt na webu značky\n\nA labākais důkaz? 👇\nMaksajat TIKAI když pietiekamianeš.\nJa je viltots — neplatíš. Jednoduché! 💪`,
        lt: `Skvělá otázka! 👍\n\nVšechny naše produkty jsou 100% originalus:\n✅ Nakupujeme přímo od autorizovaných distributorů\n✅ Kiekvienas produkt má QR patikrinkovací kodas\n✅ Pravost si můžeš patikrinti na webu značky\n\nA geriausias důkaz? 👇\nMokate TIK když pakankamaianeš.\nJei je netikras — neplatíš. Jednoduché! 💪`,
        sk: `Skvělá otázka! 👍\n\nVšechny naše produkty jsou 100% originálny:\n✅ Nakupujeme přímo od autorizovaných distributorů\n✅ Každý produkt má QR overovací kód\n✅ Pravost si můžeš overiť na webu značky\n\nA najlepší důkaz? 👇\nPlatíš IBA když dosťaneš.\nAk je falošný — neplatíš. Jednoduché! 💪`,
        hr: `Skvělá otázka! 👍\n\nVšechny naše produkty jsou 100% originalan:\n✅ Nakupujeme přímo od autorizovaných distributorů\n✅ Svaki produkt má QR provjeriovací kod\n✅ Pravost si můžeš provjeriti na webu značky\n\nA najbolji důkaz? 👇\nPlaćaš SAMO když dostaaneš.\nAko je lažan — neplatíš. Jednoduché! 💪`,
        es: `Skvělá otázka! 👍\n\nVšechny naše produkty jsou 100% original:\n✅ Nakupujeme přímo od autorizovaných distributorů\n✅ Cada produkt má QR verificaovací código\n✅ Pravost si můžeš verificar na webu značky\n\nA el mejor důkaz? 👇\nPagas SOLO když bastanteaneš.\nSi je falso — neplatíš. Jednoduché! 💪`,
    },
    zh: `好问题！👍\n\n我们所有产品都是100%正品：\n✅ 直接从授权经销商进货\n✅ 每件产品都有防伪二维码\n✅ 可在品牌官网验证真伪\n\n最好的证明？👇\n您只需要在收到货时付款。\n如果是假货——不用付钱。就这么简单！💪`,
    tag: "验真",
    tagColor: "bg-cyan-500/20 text-cyan-400",
    bonus: true,
  },

  {
    title: "加餐D：用户长时间不回复",
    subtitle: "温和唤醒，不要催促，给出新理由",
    content: [
      "不要发你还在吗这种催促消息。",
      "给出一个新的理由让用户回复。",
      "最多跟进2次，避免被拉黑。",
    ],
    scripts: {
      en: `Hey! 👋 Just checking in 😊\n\nWe just got a NEW flavor you might love:\n🍓 Strawberry Watermelon — just arrived!\n\nAlso, our 3-pack promo is still running this week.\n\nLet me know if you have any questions! 🔥`,
      ro: `Hei! 👋 Doar o verificare 😊\n\nTocmai am primit o AROMĂ NOUĂ care ți-ar putea plăcea:\n🍓 Căpșuni Pepene — tocmai a sosit!\n\nDe asemenea, promoția noastră 3-pack rulează încă această săptămână.\n\nSpune-mi dacă ai întrebări! 🔥`,
      pl: `Hej! 👋 Tylko sprawdzam 😊\n\nWłaśnie dostaliśmy NOWY smak, który możesz pokochać:\n🍓 Truskawka Arbuz — właśnie przyszedł!\n\nTakże nasza promocja 3-pack trwa jeszcze w tym tygodniu.\n\nDaj znać jeśli masz pytania! 🔥`,
      hu: `Hé! 👋 Csak ellenőrzöm 😊\n\nÉppen kaptunk egy ÚJ ízt, amit szerethetsz:\n🍓 Eper Görögdinnye — éppen megérkezett!\n\nEmellett a 3-as csomag promónk még ezen a héten fut.\n\nSzólj ha kérdésed van! 🔥`,
      pt: `Ei! 👋 Só a verificar 😊\n\nAcabámos de receber um NOVO sabor que podes adorar:\n🍓 Morango Melancia — acabou de chegar!\n\nTambém, a nossa promoção de 3 unidades ainda está a decorrer esta semana.\n\nDiz-me se tiveres alguma dúvida! 🔥`,
      cs: `Hej! 👋 Jen se ptám 😊\n\nPrávě jsme dostali NOVOU příchuť, která by se ti mohla líbit:\n🍓 Jahoda Meloun — právě dorazila!\n\nTaké naše 3-kusová promo stále běží tento týden.\n\nDej vědět pokud máš otázky! 🔥`,
        lv: `Hej! 👋 Tikai se ptám 😊\n\nPrávě jsme pietiekamiali NOVOU garša, která by se ti mohla líbit:\n🍓 Jahoda Meloun — právě dorazila!\n\nArī naše 3-kusová promo stále běží tento týdiena.\n\nDej vědět ja máš otázky! 🔥`,
        lt: `Hej! 👋 Tik se ptám 😊\n\nPrávě jsme pakankamaiali NOVOU skonis, která by se ti mohla líbit:\n🍓 Jahoda Meloun — právě dorazila!\n\nTaip pat naše 3-kusová promo stále běží tento týdiena.\n\nDej vědět jei máš otázky! 🔥`,
        sk: `Hej! 👋 Len se ptám 😊\n\nPrávě jsme dosťali NOVOU príchuť, která by se ti mohla líbit:\n🍓 Jahoda Meloun — právě dorazila!\n\nTiež naše 3-kusová promo stále běží tento týdeň.\n\nDej vědět ak máš otázky! 🔥`,
        hr: `Hej! 👋 Samo se ptám 😊\n\nPrávě jsme dostaali NOVOU okus, která by se ti mohla líbit:\n🍓 Jahoda Meloun — právě dorazila!\n\nTakoer naše 3-kusová promo stále běží tento týdan.\n\nDej vědět ako máš otázky! 🔥`,
        es: `Hej! 👋 Solo se ptám 😊\n\nPrávě jsme bastanteali NOVOU sabor, která by se ti mohla líbit:\n🍓 Jahoda Meloun — právě dorazila!\n\nTambién naše 3-kusová promo stále běží tento týdía.\n\nDej vědět si máš otázky! 🔥`,
    },
    zh: `嗨！👋 来问一下 😊\n\n我们刚到了一款你可能会喜欢的新口味：\n🍓 草莓西瓜——刚到货！\n\n另外，我们的3件套优惠本周还在进行中。\n\n有任何问题随时告诉我！🔥`,
    tag: "唤醒",
    tagColor: "bg-violet-500/20 text-violet-400",
    bonus: true,
  },

  {
    title: "加餐E：节假日促销话术",
    subtitle: "节日氛围 + 限时优惠 = 冲动消费高峰",
    content: [
      "节假日是冲动消费最高峰。",
      "用节日氛围包装促销，不显得强推。",
      "限时+限量双重压力效果最好。",
    ],
    scripts: {
      en: `🎉 Happy [HOLIDAY]!\n\nTo celebrate, we're running a SPECIAL OFFER:\n\n🎁 Buy 2 get 1 FREE\n🚚 Free shipping today only\n💰 Cash on Delivery as always\n\nThis offer expires at midnight tonight!\n\nWant to grab yours before it's gone? 👇`,
      ro: `🎉 [SĂRBĂTOARE] Fericit!\n\nPentru a sărbători, avem o OFERTĂ SPECIALĂ:\n\n🎁 Cumperi 2 primești 1 GRATUIT\n🚚 Livrare gratuită doar azi\n💰 Plată la livrare ca întotdeauna\n\nOferta expiră la miezul nopții!\n\nVrei să îl iei înainte să se termine? 👇`,
      pl: `🎉 Wesołego [ŚWIĘTO]!\n\nAby świętować, mamy SPECJALNĄ OFERTĘ:\n\n🎁 Kup 2 dostań 1 GRATIS\n🚚 Darmowa wysyłka tylko dziś\n💰 Płatność przy odbiorze jak zawsze\n\nOferta wygasa o północy!\n\nChcesz wziąć swój zanim zniknie? 👇`,
      hu: `🎉 Boldog [ÜNNEP]!\n\nAz ünneplés alkalmából KÜLÖNLEGES AJÁNLATUNK van:\n\n🎁 Vegyél 2-t kapj 1-et INGYEN\n🚚 Ingyenes szállítás csak ma\n💰 Utánvétes fizetés mint mindig\n\nAz ajánlat éjfélkor lejár!\n\nSzeretné megszerezni mielőtt elfogy? 👇`,
      pt: `🎉 Feliz [FERIADO]!\n\nPara celebrar, temos uma OFERTA ESPECIAL:\n\n🎁 Compra 2 leva 1 GRÁTIS\n🚚 Envio grátis só hoje\n💰 Pagamento na entrega como sempre\n\nA oferta expira à meia-noite!\n\nQueres o teu antes de acabar? 👇`,
      cs: `🎉 Šťastný [SVÁTEK]!\n\nPro oslavu máme SPECIÁLNÍ NABÍDKU:\n\n🎁 Kup 2 dostaneš 1 ZDARMA\n🚚 Doprava zdarma jen dnes\n💰 Platba při doručení jako vždy\n\nNabídka vyprší o půlnoci!\n\nChceš si vzít svůj než zmizí? 👇`,
        lv: `🎉 Šťastný [SVÁTEK]!\n\nPro oslavu máme SPECIÁLNÍ NABÍDKU:\n\n🎁 Kup 2 pietiekamianeš 1 ZDARMA\n🚚 Piegāde bezmaksas tikai šodien\n💰 Samaksa piegadē jako vienmēr\n\nPiedāvājums vyprší o pusnaktsi!\n\nChceš si vzít svůj než zmizí? 👇`,
        lt: `🎉 Šťastný [SVÁTEK]!\n\nPro oslavu máme SPECIÁLNÍ NABÍDKU:\n\n🎁 Kup 2 pakankamaianeš 1 ZDARMA\n🚚 Pristatymas nemokamai tik šiandien\n💰 Mokejimas pristatant jako visada\n\nPasiūlymas vyprší o vidurnaktisi!\n\nChceš si vzít svůj než zmizí? 👇`,
        sk: `🎉 Šťastný [SVÁTEK]!\n\nPro oslavu máme SPECIÁLNÍ NABÍDKU:\n\n🎁 Kup 2 dosťaneš 1 ZDARMA\n🚚 Doprava zadarmo len dnes\n💰 Platba pri doručenýie jako vždy\n\nPonuka vyprší o polnoci!\n\nChceš si vzít svůj než zmizí? 👇`,
        hr: `🎉 Šťastný [SVÁTEK]!\n\nPro oslavu máme SPECIÁLNÍ NABÍDKU:\n\n🎁 Kup 2 dostaaneš 1 ZDARMA\n🚚 Dostaava besplatno samo danas\n💰 Plaćanje pri isporuci jako uvijek\n\nPonuda vyprší o ponoci!\n\nChceš si vzít svůj než zmizí? 👇`,
        es: `🎉 Šťastný [SVÁTEK]!\n\nPro oslavu máme SPECIÁLNÍ NABÍDKU:\n\n🎁 Kup 2 bastanteaneš 1 ZDARMA\n🚚 Envío gratis solo hoy\n💰 Pago contra reembolso jako siempre\n\nOferta vyprší o medianochei!\n\nChceš si vzít svůj než zmizí? 👇`,
    },
    zh: `🎉 [节日]快乐！\n\n为了庆祝，我们有特别优惠：\n\n🎁 买2送1\n🚚 今天免运费\n💰 货到付款一如既往\n\n优惠今晚零点截止！\n\n想在卖完之前抢到吗？👇`,
    tag: "节促",
    tagColor: "bg-yellow-500/20 text-yellow-400",
    bonus: true,
  },
];

// Merge base sections with extra high-conversion scenarios
const allSections: Section[] = [...sections, ...extraSections, ...extraSections2];

const ALL_TAGS = ["全部", "主流程", ...Array.from(new Set(allSections.map((s) => s.tag)))];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("话术已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("复制失败，请手动复制");
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="copy-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-150"
    >
      {copied ? <><Check size={13} className="text-emerald-400" />已复制</> : <><Copy size={13} />复制</>}
    </button>
  );
}

interface StepCardProps {
  section: Section;
  index: number;
  lang: LangKey;
  showZh: boolean;
  completed: boolean;
  onToggleComplete: () => void;
  customScript: string | null;
  onSaveScript: (s: string) => void;
  onResetScript: () => void;
}

function StepCard({ section, index, lang, showZh, completed, onToggleComplete, customScript, onSaveScript, onResetScript }: StepCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const displayScript = customScript ?? section.scripts[lang];

  const startEdit = () => { setDraft(displayScript); setEditing(true); };
  const saveEdit = () => { onSaveScript(draft); setEditing(false); toast.success("话术已保存"); };
  const cancelEdit = () => setEditing(false);

  return (
    <div
      className={`animate-fade-in-up stagger-${Math.min(index + 1, 10)} rounded-2xl overflow-hidden border transition-all duration-300
        ${section.bonus ? "border-dashed border-slate-200 hover:border-slate-300" : completed
          ? "border-[#128C7E]/50 shadow-[0_4px_20px_rgba(18,140,126,0.12)]"
          : "border-slate-200 hover:border-[#128C7E]/30 hover:shadow-[0_4px_20px_rgba(18,140,126,0.08)]"
        }`}
      style={{ background: section.bonus ? "#F8FAFC" : "#FFFFFF" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 border-b border-slate-100 flex items-center gap-3 cursor-pointer select-none"
        style={{ background: "rgba(248,250,252,0.95)" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-200
            ${completed ? "bg-[#128C7E] text-white shadow-[0_0_12px_rgba(18,140,126,0.4)]" : "bg-[#128C7E] text-white"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {completed ? <Check size={15} strokeWidth={3} /> : section.bonus ? "+" : index + 1}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2
              className={`text-base font-700 leading-tight transition-colors duration-200 ${completed ? "text-slate-400 line-through" : "text-slate-800"}`}
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
            >
              {section.title}
            </h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${section.tagColor}`}>{section.tag}</span>
            {section.bonus && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">加餐</span>}
            {customScript && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-violet-500/20 text-violet-400">已自定义</span>}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{section.subtitle}</p>
        </div>

        <div className="text-slate-400 flex-shrink-0">{expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</div>
      </div>

      {/* Body */}
      {expanded && (
        <div>
          {/* Logic + insights row */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-100 space-y-3">
            {/* 实战逻辑 */}
            <div>
              <h3 className="text-[10px] font-600 uppercase tracking-widest text-[#128C7E] mb-2">实战逻辑</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                    <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[#128C7E]/15 border border-[#128C7E]/35 flex items-center justify-center flex-shrink-0">
                      <Check size={7} className="text-[#128C7E]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 用户心理 */}
            {section.psychology && section.psychology.length > 0 && (
              <div>
                <h3 className="text-[10px] font-600 uppercase tracking-widest text-blue-400 mb-2">用户心理</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {section.psychology.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-xs text-blue-600">
                      <span className="text-blue-400 text-[10px]">💭</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 成交信号 / 核心目标 */}
            {section.signals && section.signals.length > 0 && (
              <div>
                <h3 className="text-[10px] font-600 uppercase tracking-widest text-orange-400 mb-2">成交信号 / 核心目标</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {section.signals.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-xs text-orange-600">
                      <span className="text-orange-400 text-[10px]">⚡</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 错误方式 */}
            {section.antipattern && (
              <div className="rounded-lg px-3 py-2 bg-red-50 border border-red-200">
                <span className="text-[10px] font-600 uppercase tracking-widest text-red-400 mr-2">❌ 错误方式</span>
                <span className="text-xs text-red-600">{section.antipattern}</span>
              </div>
            )}
          </div>

          {/* Script + ZH side by side */}
          <div className={`grid gap-0 ${showZh ? "lg:grid-cols-2" : "grid-cols-1"}`}>
            {/* Script panel */}
            <div className={`p-5 ${showZh ? "border-r border-slate-100" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-600 uppercase tracking-widest text-[#128C7E]">
                  {LANG_META[lang].flag} {LANG_META[lang].label} 话术
                </h3>
                <div className="flex items-center gap-1.5">
                  {customScript && (
                    <button onClick={onResetScript} className="copy-btn flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all">
                      <RotateCcw size={10} />恢复
                    </button>
                  )}
                  <button onClick={startEdit} className="copy-btn flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs bg-violet-50 hover:bg-violet-100 text-violet-600 transition-all">
                    <Edit3 size={10} />编辑
                  </button>
                  <CopyButton text={displayScript} />
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#F0F2F5] border border-slate-200">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#128C7E] border-b border-[#128C7E]/20">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={10} className="text-white" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">CLOUD VAPE</span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span className="text-[10px] text-green-300">online</span>
                  </div>
                </div>
                <div className="p-3 min-h-[60px]">
                  {editing ? (
                    <div className="space-y-2">
                      <textarea
                        className="w-full bg-white text-slate-800 text-xs rounded-lg p-3 border border-slate-200 focus:border-[#128C7E]/50 outline-none resize-none leading-relaxed"
                        style={{ fontFamily: "'JetBrains Mono', monospace", minHeight: "110px" }}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all">
                          <X size={10} />取消
                        </button>
                        <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-[#128C7E]/15 hover:bg-[#128C7E]/25 text-[#128C7E] transition-all">
                          <Check size={10} />保存
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="bubble-out max-w-[90%] px-3 py-2">
                        <pre className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace" }}>
                          {displayScript}
                        </pre>
                        <div className="flex justify-end mt-1"><span className="text-[10px] text-slate-400">✓✓</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chinese reference panel */}
            {showZh && (
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] font-600 uppercase tracking-widest text-amber-400">🇨🇳 中文对照</h3>
                  <CopyButton text={section.zh} />
                </div>
                <div className="rounded-xl overflow-hidden bg-[#F0F2F5] border border-slate-200">
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-500 border-b border-amber-400/20">
                    <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={10} className="text-white" />
                    </div>
                    <span className="text-xs text-white/90 font-medium">中文参考译文</span>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-start">
                      <div className="bubble-in max-w-[90%] px-3 py-2">
                        <pre className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                          {section.zh}
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
  );
}

function ProgressPanel({ completed, total, onReset }: { completed: number; total: number; onReset: () => void }) {
  const pct = Math.round((completed / total) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart2 size={15} className="text-[#128C7E]" />
          <span className="text-sm font-600 text-slate-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>今日成交进度</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            <span className="text-[#128C7E] font-700">{completed}</span> / {total} 步
          </span>
          <button onClick={onReset} className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
            <RotateCcw size={10} />重置
          </button>
        </div>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500 progress-shimmer" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 text-xs text-slate-400 text-right">{pct}% 完成</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<LangKey>("en");
  const [showZh, setShowZh] = useState(true);
  const [activeTag, setActiveTag] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [customScripts, setCustomScripts] = useState<Record<number, string>>({});

  const toggleComplete = useCallback((idx: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }, []);

  const saveScript = useCallback((idx: number, script: string) => {
    setCustomScripts((prev) => ({ ...prev, [idx]: script }));
  }, []);

  const resetScript = useCallback((idx: number) => {
    setCustomScripts((prev) => { const next = { ...prev }; delete next[idx]; return next; });
    toast.success("已恢复默认话术");
  }, []);

  const filteredSections = allSections
    .map((s, i) => ({ ...s, originalIndex: i }))
    .filter((s) => {
      if (activeTag === "主流程") return !s.bonus;
      if (activeTag !== "全部" && s.tag !== activeTag) return false;
      const q = searchQuery.toLowerCase();
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.scripts[lang].toLowerCase().includes(q) ||
        s.zh.toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-screen" style={{ background: "#F0F2F5" }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(18,140,126,0.10) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 relative">
          <div className="animate-fade-in-up flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#128C7E]/30 bg-[#128C7E]/10 text-[#128C7E] text-sm font-medium">
              <MessageCircle size={14} />
              WhatsApp COD 实战手册 · 东欧市场 · 51套话术
            </span>
          </div>

          <div className="animate-fade-in-up stagger-1 text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-800 text-slate-800 leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}>
              东欧 COD 电子烟<br />
              <span style={{ color: "#128C7E" }}>WhatsApp 完整成交步骤</span>
            </h1>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              降低被骗感 → 建立真实感 → 制造热销感 → 推动立即下单 → 降低拒收 → 做复购
            </p>
          </div>

          {/* Core principles */}
          <div className="animate-fade-in-up stagger-2 grid sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: <Shield size={16} />, title: "核心1：降低风险", desc: "不断强调 COD / Pay when received", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { icon: <TrendingUp size={16} />, title: "核心2：建立信任", desc: "回复快、像真人、强调热销", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { icon: <Zap size={16} />, title: "核心3：推动下单", desc: "制造库存感和时效感", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-4 border ${item.bg} flex items-start gap-3`}>
                <div className={`mt-0.5 flex-shrink-0 ${item.color}`}>{item.icon}</div>
                <div>
                  <h3 className={`font-700 text-sm ${item.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="animate-fade-in-up stagger-3 space-y-3">
            {/* Row 1: language + ZH toggle + search */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Language switcher — two rows */}
              <div className="flex flex-col gap-1 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
                <div className="flex items-center gap-1 flex-wrap">
                  <Globe size={12} className="text-slate-400 ml-0.5 mr-0.5 flex-shrink-0" />
                  {(["en", "ro", "pl", "hu", "pt", "cs", "es", "hr", "sk", "lt", "lv"] as LangKey[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-2 py-1 rounded-lg text-xs font-600 transition-all duration-150 flex items-center gap-1 whitespace-nowrap ${lang === l ? "bg-[#128C7E] text-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
                      style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                      title={LANG_META[l].market}
                    >
                      <span>{LANG_META[l].flag}</span>
                      <span>{LANG_META[l].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ZH toggle */}
              <button
                onClick={() => setShowZh((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-600 border transition-all duration-150 ${showZh ? "bg-amber-50 border-amber-400 text-amber-600" : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300"}`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                🇨🇳 中文对照 {showZh ? "开" : "关"}
              </button>

              {/* Search */}
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 flex-1 min-w-[160px] max-w-xs shadow-sm">
                <Search size={12} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="搜索步骤或话术…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-slate-700 placeholder-slate-300 outline-none w-full"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-slate-300 hover:text-slate-500"><X size={11} /></button>}
              </div>
            </div>

            {/* Row 2: tag filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-600 transition-all duration-150 border ${activeTag === tag ? "bg-[#128C7E] text-white border-[#128C7E]" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"}`}
                  style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
                >
                  {tag}
                </button>
              ))}
              <span className="text-xs text-slate-400 ml-1">共 {filteredSections.length} 条</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mb-4">
          <ProgressPanel completed={completedSteps.size} total={allSections.length} onReset={() => { setCompletedSteps(new Set()); toast.success("进度已重置"); }} />
        </div>

        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Search size={30} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">没有找到匹配的步骤</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <StepCard
                key={section.originalIndex}
                section={section}
                index={section.originalIndex}
                lang={lang}
                showZh={showZh}
                completed={completedSteps.has(section.originalIndex)}
                onToggleComplete={() => toggleComplete(section.originalIndex)}
                customScript={customScripts[section.originalIndex] ?? null}
                onSaveScript={(s) => saveScript(section.originalIndex, s)}
                onResetScript={() => resetScript(section.originalIndex)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Repurchase Activation Module */}
      <RepurchaseModule lang={lang} showZh={showZh} />

      {/* Cancel Recovery Module */}
      <CancelRecovery lang={lang} showZh={showZh} />

      {/* Formula footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="animate-fade-in-up rounded-3xl p-8 sm:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #075E54 0%, #128C7E 50%, #25D366 100%)" }}>
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
          <h2 className="text-2xl sm:text-3xl font-800 text-white mb-8 relative" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}>
            东欧 COD 真正的成交公式
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 relative">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5">
              <h3 className="text-base font-700 text-white/90 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>❌ 错误方式</h3>
              <div className="space-y-2 text-white/75 text-sm">
                {["一直介绍产品参数", "长篇介绍品牌故事", "只发价格", "等用户主动下单", "被拒收后情绪化回复"].map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5">
              <h3 className="text-base font-700 text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>✅ 正确方式</h3>
              <div className="space-y-2 text-white text-sm">
                {["强调 COD 安全感", "建立真实商家感", "制造热销与库存压力", "主动推动立即成交", "派送当天提醒降低拒收"].map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/25 text-center relative">
            <p className="text-2xl sm:text-3xl font-800 text-white" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}>
              信任感 ＞ 产品参数
            </p>
            <p className="text-lg mt-2 text-white/75" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              COD 安全感 ＞ 品牌故事 ＞ 价格优惠
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
