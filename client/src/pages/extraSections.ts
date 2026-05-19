import type { Section } from "./sectionTypes";

export const extraSections: Section[] = [
  // ── Bonus F ──
  {
    title: "加餐F：用户说要考虑一下",
    subtitle: "打破拖延，制造立即行动的理由",
    content: [
      "考虑一下 = 即将流失，需要立即给出新理由。",
      "用库存紧张 + 今日发货双重压力打破拖延。",
      "结尾给一个简单的行动指令，降低决策成本。",
    ],
    psychology: ["没有急迫感", "担心买了后悔", "想等等看有没有更好的"],
    signals: ["用户说'等等''再想想''过几天'是高危流失信号"],
    antipattern: "不要说'好的，您慢慢考虑'——这等于主动放弃成交。",
    scripts: {
      en: `Of course, take your time! 😊\n\nJust a heads up though:\n⚠️ This flavor only has 3 units left in stock\n⏰ Today's shipping cutoff is 3PM\n\nIf you order now, it arrives in 2-3 days.\nIf you wait... it might be gone 😅\n\nShall I reserve one for you? Just say YES 👇`,
      ro: `Bineînțeles, ia-ți timp! 😊\n\nDoar o mică atenționare:\n⚠️ Această aromă mai are doar 3 unități în stoc\n⏰ Termenul de expediere de azi este ora 15:00\n\nDacă comanzi acum, ajunge în 2-3 zile.\nDacă aștepți... s-ar putea să nu mai fie 😅\n\nSă îți rezerv una? Spune doar DA 👇`,
      pl: `Oczywiście, zastanów się! 😊\n\nTylko mała uwaga:\n⚠️ Ten smak ma już tylko 3 sztuki w magazynie\n⏰ Dzisiejszy termin wysyłki to 15:00\n\nJeśli zamówisz teraz, dotrze za 2-3 dni.\nJeśli poczekasz... może go nie być 😅\n\nMam zarezerwować dla Ciebie? Napisz TAK 👇`,
      hu: `Persze, gondold át! 😊\n\nCsak egy gyors figyelmeztetés:\n⚠️ Ebből az ízből már csak 3 darab van raktáron\n⏰ A mai szállítási határidő 15:00\n\nHa most rendelsz, 2-3 napon belül megérkezik.\nHa vársz... lehet, hogy elfogy 😅\n\nRezerváljak neked egyet? Csak írj IGEN-t 👇`,
      pt: `Claro, pensa bem! 😊\n\nSó um aviso:\n⚠️ Este sabor só tem 3 unidades em stock\n⏰ O prazo de envio de hoje é às 15h\n\nSe encomendares agora, chega em 2-3 dias.\nSe esperares... pode já não haver 😅\n\nReservo um para ti? Só diz SIM 👇`,
      cs: `Samozřejmě, rozmysli si to! 😊\n\nJen rychlé upozornění:\n⚠️ Tato příchuť má na skladě jen 3 kusy\n⏰ Dnešní uzávěrka odesílání je ve 15:00\n\nPokud objednáš teď, dorazí za 2-3 dny.\nPokud počkáš... může být pryč 😅\n\nMám ti jeden rezervovat? Stačí napsat ANO 👇`,
    },
    zh: `当然，您慢慢考虑！😊\n\n不过提醒一下：\n⚠️ 这个口味库存只剩3个了\n⏰ 今天发货截止时间是下午3点\n\n现在下单2-3天就到。\n等的话可能就没了 😅\n\n要我帮您留一个吗？回复YES就好 👇`,
    tag: "催单",
    tagColor: "bg-orange-500/20 text-orange-400",
    bonus: true,
  },

  // ── Bonus G ──
  {
    title: "加餐G：用户问能不能便宜一点",
    subtitle: "不降价，给额外价值，维护定价体系",
    content: [
      "不要直接降价，会破坏定价体系。",
      "用赠品/加量代替降价，感知价值更高。",
      "强调 COD 本身就是最大的优惠。",
    ],
    psychology: ["想占便宜", "觉得还有降价空间", "测试你的底线"],
    signals: ["讨价还价是购买意愿强的信号，不要放弃"],
    antipattern: "不要说'这已经是最低价了'——显得生硬，用户会反感。",
    scripts: {
      en: `I wish I could, but our prices are already at factory cost 😊\n\nHowever, I can do something special for you:\n🎁 Order the 3-pack today and I'll add a FREE flavor sampler\n\nThat's extra value worth €8 — just for you!\n\nAnd of course, Cash on Delivery — zero risk 💪`,
      ro: `Mi-aș dori, dar prețurile noastre sunt deja la costul de fabrică 😊\n\nTotuși, pot face ceva special pentru tine:\n🎁 Comandă pachetul de 3 azi și adaug un SAMPLER DE AROME GRATUIT\n\nValoare extra de 40 lei — doar pentru tine!\n\nȘi desigur, plată la livrare — zero risc 💪`,
      pl: `Chciałbym, ale nasze ceny są już na poziomie kosztu fabrycznego 😊\n\nJednak mogę zrobić coś specjalnego dla Ciebie:\n🎁 Zamów pakiet 3 dzisiaj a dodam DARMOWY PRÓBNIK SMAKÓW\n\nDodatkowa wartość 35 zł — tylko dla Ciebie!\n\nI oczywiście, płatność przy odbiorze — zero ryzyka 💪`,
      hu: `Bárcsak tehetném, de áraink már gyári költségen vannak 😊\n\nAzonban tehetek valami különlegeset neked:\n🎁 Rendelj ma 3-as csomagot és adok egy INGYENES ÍZMINTÁT\n\nExtra érték 3 000 Ft — csak neked!\n\nÉs persze, utánvétes fizetés — nulla kockázat 💪`,
      pt: `Gostava de poder, mas os nossos preços já estão ao custo de fábrica 😊\n\nNo entanto, posso fazer algo especial para ti:\n🎁 Encomenda o pack de 3 hoje e adiciono um AMOSTRADOR DE SABORES GRÁTIS\n\nValor extra de €8 — só para ti!\n\nE claro, pagamento na entrega — zero risco 💪`,
      cs: `Přál bych si, ale naše ceny jsou již na výrobních nákladech 😊\n\nNicméně mohu pro tebe udělat něco speciálního:\n🎁 Objednej dnes 3-kusový balíček a přidám ZDARMA VZOREK PŘÍCHUTÍ\n\nExtra hodnota 200 Kč — jen pro tebe!\n\nA samozřejmě, platba při doručení — nulové riziko 💪`,
    },
    zh: `我也希望能便宜，但我们的价格已经是出厂成本了 😊\n\n不过我可以为您做一件特别的事：\n🎁 今天买3件装，我额外赠送一个口味试用装\n\n价值¥60的额外赠品——专门为您！\n\n当然，货到付款——零风险 💪`,
    tag: "异议",
    tagColor: "bg-pink-500/20 text-pink-400",
    bonus: true,
  },

  // ── Bonus H ──
  {
    title: "加餐H：用户已下单但迟迟未签收",
    subtitle: "主动联系，消除顾虑，防止最后一刻拒收",
    content: [
      "派送前主动联系，比等用户联系效果好10倍。",
      "确认地址和时间，让用户感觉被重视。",
      "提前告知金额，避免快递员上门时找不到零钱。",
    ],
    psychology: ["可能已经忘记了", "可能在犹豫要不要拒收", "需要被提醒和确认"],
    signals: ["订单超过48小时未签收是高危拒收信号"],
    antipattern: "不要只发快递单号，要主动问用户是否方便签收。",
    scripts: {
      en: `Hi [Name]! 👋\n\nYour CLOUD VAPE package is arriving very soon!\n\nJust confirming:\n📍 Address: [ADDRESS]\n💰 Amount to prepare: [AMOUNT] cash\n📞 Courier will call before arriving\n\nIs everything OK on your end? 😊`,
      ro: `Bună [Nume]! 👋\n\nColetul tău CLOUD VAPE ajunge foarte curând!\n\nDoar confirm:\n📍 Adresă: [ADRESĂ]\n💰 Sumă de pregătit: [SUMĂ] lei cash\n📞 Curierul va suna înainte să ajungă\n\nEste totul în regulă la tine? 😊`,
      pl: `Cześć [Imię]! 👋\n\nTwoja paczka CLOUD VAPE przybywa bardzo wkrótce!\n\nTylko potwierdzam:\n📍 Adres: [ADRES]\n💰 Kwota do przygotowania: [KWOTA] zł gotówki\n📞 Kurier zadzwoni przed przybyciem\n\nCzy wszystko w porządku po Twojej stronie? 😊`,
      hu: `Szia [Név]! 👋\n\nA CLOUD VAPE csomagod hamarosan megérkezik!\n\nCsak megerősítem:\n📍 Cím: [CÍM]\n💰 Előkészítendő összeg: [ÖSSZEG] Ft készpénz\n📞 A futár érkezés előtt hív\n\nMinden rendben nálad? 😊`,
      pt: `Olá [Nome]! 👋\n\nO teu pacote CLOUD VAPE está a chegar muito em breve!\n\nSó a confirmar:\n📍 Morada: [MORADA]\n💰 Valor a preparar: [VALOR] € em dinheiro\n📞 O estafeta liga antes de chegar\n\nEstá tudo bem do teu lado? 😊`,
      cs: `Ahoj [Jméno]! 👋\n\nTvůj balíček CLOUD VAPE přijde velmi brzy!\n\nJen potvrzuji:\n📍 Adresa: [ADRESA]\n💰 Částka k přípravě: [ČÁSTKA] Kč v hotovosti\n📞 Kurýr zavolá před příjezdem\n\nJe u tebe vše v pořádku? 😊`,
    },
    zh: `嗨 [姓名]！👋\n\n您的 CLOUD VAPE 包裹很快就到了！\n\n确认一下：\n📍 地址：[地址]\n💰 需要准备现金：[金额]\n📞 快递员到达前会先打电话\n\n您那边一切都好吗？😊`,
    tag: "提醒",
    tagColor: "bg-amber-500/20 text-amber-400",
    bonus: true,
  },

  // ── Bonus I ──
  {
    title: "加餐I：用户问有没有其他口味",
    subtitle: "把询问口味变成加购机会",
    content: [
      "询问口味 = 购买意愿极强的信号。",
      "发口味菜单，引导用户选多个。",
      "用'搭配套餐'话术推动多件成交。",
    ],
    psychology: ["已经决定要买了", "在挑选最喜欢的口味", "可能会买多个"],
    signals: ["询问口味是最强的购买信号，立即推套餐"],
    scripts: {
      en: `Great taste in vapes! 😄 Here are our top flavors:\n\n🍉 Watermelon Ice — #1 bestseller\n🍓 Strawberry Kiwi — sweet & fruity\n🍋 Lemon Mint — refreshing\n🍇 Grape Ice — smooth & cool\n🥭 Mango Peach — tropical hit\n🍑 Peach Ice — summer favorite\n\n💡 Pro tip: Many customers get 3 different flavors to try them all!\n\nWhich ones catch your eye? 👀`,
      ro: `Gust excelent în vape-uri! 😄 Iată aromele noastre top:\n\n🍉 Pepene cu Gheață — #1 bestseller\n🍓 Căpșuni Kiwi — dulce & fructat\n🍋 Lămâie Mentă — răcoritor\n🍇 Struguri cu Gheață — fin & rece\n🥭 Mango Piersică — hit tropical\n🍑 Piersică cu Gheață — favorita verii\n\n💡 Sfat pro: Mulți clienți iau 3 arome diferite să le încerce pe toate!\n\nCare îți atrag atenția? 👀`,
      pl: `Świetny gust w vape'ach! 😄 Oto nasze top smaki:\n\n🍉 Arbuz z Lodem — #1 bestseller\n🍓 Truskawka Kiwi — słodki & owocowy\n🍋 Cytryna Mięta — orzeźwiający\n🍇 Winogrono z Lodem — gładki & chłodny\n🥭 Mango Brzoskwinia — tropikalny hit\n🍑 Brzoskwinia z Lodem — ulubieniec lata\n\n💡 Pro tip: Wielu klientów bierze 3 różne smaki żeby wszystkie wypróbować!\n\nKtóre Cię przyciągają? 👀`,
      hu: `Remek ízlés a vape-ekben! 😄 Íme a top ízeink:\n\n🍉 Görögdinnye Jéggel — #1 bestseller\n🍓 Eper Kivi — édes & gyümölcsös\n🍋 Citrom Menta — frissítő\n🍇 Szőlő Jéggel — sima & hűvös\n🥭 Mangó Őszibarack — trópusi sláger\n🍑 Őszibarack Jéggel — nyári kedvenc\n\n💡 Pro tipp: Sok vevő 3 különböző ízt vesz hogy mindet kipróbálja!\n\nMelyek ragadják meg a figyelmed? 👀`,
      pt: `Ótimo gosto em vapes! 😄 Aqui estão os nossos sabores top:\n\n🍉 Melancia com Gelo — #1 mais vendido\n🍓 Morango Kiwi — doce & frutado\n🍋 Limão Menta — refrescante\n🍇 Uva com Gelo — suave & fresco\n🥭 Manga Pêssego — hit tropical\n🍑 Pêssego com Gelo — favorito do verão\n\n💡 Dica pro: Muitos clientes levam 3 sabores diferentes para experimentar todos!\n\nQuais te chamam a atenção? 👀`,
      cs: `Skvělý vkus ve vape! 😄 Zde jsou naše top příchutě:\n\n🍉 Meloun s Ledem — #1 bestseller\n🍓 Jahoda Kiwi — sladká & ovocná\n🍋 Citron Máta — osvěžující\n🍇 Hrozno s Ledem — jemné & chladné\n🥭 Mango Broskev — tropický hit\n🍑 Broskev s Ledem — letní favorit\n\n💡 Pro tip: Mnoho zákazníků bere 3 různé příchutě aby je všechny vyzkoušeli!\n\nKteré tě zaujmou? 👀`,
    },
    zh: `眼光不错！😄 这是我们的热门口味：\n\n🍉 西瓜冰 — #1 畅销款\n🍓 草莓奇异果 — 甜蜜果香\n🍋 柠檬薄荷 — 清爽提神\n🍇 葡萄冰 — 顺滑清凉\n🥭 芒果蜜桃 — 热带风情\n🍑 蜜桃冰 — 夏日最爱\n\n💡 小技巧：很多客户会选3种不同口味一起尝试！\n\n哪几款吸引您？👀`,
    tag: "报价",
    tagColor: "bg-blue-500/20 text-blue-400",
    bonus: true,
  },

  // ── Bonus J ──
  {
    title: "加餐J：用户问发货多久到",
    subtitle: "把物流问题变成下单催化剂",
    content: [
      "物流问题是下单前最后一个顾虑。",
      "给出具体时间，消除不确定感。",
      "强调今天下单今天发，制造紧迫感。",
    ],
    psychology: ["想知道多久能用到", "担心等太久", "在对比其他卖家的速度"],
    signals: ["问物流时间说明已经准备下单了，立即给出明确答案并收单"],
    scripts: {
      en: `Great question! Here's our delivery timeline:\n\n🚀 Order before 3PM → Ships TODAY\n📦 Standard delivery: 2-3 working days\n🗺️ Your area: usually [X] days\n\nTracking number sent right after shipping!\n\nIf you order NOW, you could have it by [DAY] 🎯\n\nReady to go? Just send me your address! 👇`,
      ro: `Întrebare bună! Iată termenele noastre de livrare:\n\n🚀 Comandă înainte de 15:00 → Expediem AZI\n📦 Livrare standard: 2-3 zile lucrătoare\n🗺️ Zona ta: de obicei [X] zile\n\nNumărul de tracking trimis imediat după expediere!\n\nDacă comanzi ACUM, îl poți avea până [ZI] 🎯\n\nGata? Trimite-mi adresa ta! 👇`,
      pl: `Świetne pytanie! Oto nasze terminy dostawy:\n\n🚀 Zamów przed 15:00 → Wysyłamy DZIŚ\n📦 Standardowa dostawa: 2-3 dni robocze\n🗺️ Twój obszar: zazwyczaj [X] dni\n\nNumer śledzenia wysłany zaraz po wysyłce!\n\nJeśli zamówisz TERAZ, możesz mieć to do [DZIEŃ] 🎯\n\nGotowy? Wyślij mi swój adres! 👇`,
      hu: `Jó kérdés! Íme a szállítási határidőink:\n\n🚀 Rendelj 15:00 előtt → MA szállítjuk\n📦 Normál kézbesítés: 2-3 munkanap\n🗺️ A te területed: általában [X] nap\n\nNyomkövetési szám azonnal küldve szállítás után!\n\nHa MOST rendelsz, [NAP]-ra megkaphatod 🎯\n\nKész? Csak küldd el a címed! 👇`,
      pt: `Boa pergunta! Aqui estão os nossos prazos de entrega:\n\n🚀 Encomenda antes das 15h → Enviamos HOJE\n📦 Entrega padrão: 2-3 dias úteis\n🗺️ A tua área: normalmente [X] dias\n\nNúmero de rastreamento enviado logo após o envio!\n\nSe encomendares AGORA, podes tê-lo até [DIA] 🎯\n\nPronto? Só envia-me a tua morada! 👇`,
      cs: `Skvělá otázka! Zde jsou naše dodací lhůty:\n\n🚀 Objednej před 15:00 → Odesíláme DNES\n📦 Standardní doručení: 2-3 pracovní dny\n🗺️ Tvoje oblast: obvykle [X] dní\n\nČíslo sledování odesláno hned po odeslání!\n\nPokud objednáš TEĎ, můžeš to mít do [DEN] 🎯\n\nPřipraven? Stačí mi poslat adresu! 👇`,
    },
    zh: `好问题！我们的发货时效：\n\n🚀 下午3点前下单 → 今天发货\n📦 标准配送：2-3个工作日\n🗺️ 您所在地区：通常[X]天\n\n发货后立即发送快递单号！\n\n如果您现在下单，[日期]就能收到 🎯\n\n准备好了吗？把地址发给我就好！👇`,
    tag: "收单",
    tagColor: "bg-emerald-500/20 text-emerald-400",
    bonus: true,
  },

  // ── Bonus K ──
  {
    title: "加餐K：用户说朋友买过但不好用",
    subtitle: "化解负面口碑，用体验差异重建信任",
    content: [
      "不要否定用户朋友的体验。",
      "用口味/使用方式差异解释，给台阶。",
      "提供试用方案降低顾虑。",
    ],
    psychology: ["被朋友的负面体验影响", "担心买了也不好用", "需要一个理由相信你"],
    antipattern: "不要说'你朋友买的是假货'——会激怒用户。",
    scripts: {
      en: `I'm sorry to hear that 😔\n\nHonestly, vape experience can vary a lot depending on:\n🔹 The flavor chosen (some are stronger)\n🔹 How it's used (draw speed matters)\n🔹 Whether it was stored properly\n\nHere's what I suggest:\n✅ Start with our #1 flavor: Watermelon Ice\n✅ Cash on Delivery — if you don't like it, just don't pay\n\nNo risk at all! Want to give it a try? 😊`,
      ro: `Îmi pare rău să aud asta 😔\n\nSincer, experiența cu vape-ul poate varia mult în funcție de:\n🔹 Aroma aleasă (unele sunt mai puternice)\n🔹 Cum este folosit (viteza de tragere contează)\n🔹 Dacă a fost depozitat corect\n\nIată ce sugerez:\n✅ Începe cu aroma noastră #1: Pepene cu Gheață\n✅ Plată la livrare — dacă nu îți place, pur și simplu nu plătești\n\nZero risc! Vrei să încerci? 😊`,
      pl: `Przykro mi to słyszeć 😔\n\nSzczerze, doświadczenie z vape może się bardzo różnić w zależności od:\n🔹 Wybranego smaku (niektóre są mocniejsze)\n🔹 Sposobu użytkowania (szybkość zaciągania ma znaczenie)\n🔹 Czy był prawidłowo przechowywany\n\nOto co sugeruję:\n✅ Zacznij od naszego smaku #1: Arbuz z Lodem\n✅ Płatność przy odbiorze — jeśli nie podoba ci się, po prostu nie płacisz\n\nZero ryzyka! Chcesz spróbować? 😊`,
      hu: `Sajnálom hallani ezt 😔\n\nŐszintén, a vape élmény nagyon változhat attól függően:\n🔹 A választott íztől (néhány erősebb)\n🔹 Hogyan használják (a szívás sebessége számít)\n🔹 Megfelelően tárolták-e\n\nÍme mit javaslok:\n✅ Kezdd a #1 ízünkkel: Görögdinnye Jéggel\n✅ Utánvétes fizetés — ha nem tetszik, egyszerűen nem fizetsz\n\nNulla kockázat! Szeretnéd kipróbálni? 😊`,
      pt: `Lamento ouvir isso 😔\n\nHonestamente, a experiência com vape pode variar muito dependendo de:\n🔹 O sabor escolhido (alguns são mais fortes)\n🔹 Como é usado (a velocidade de inalação importa)\n🔹 Se foi armazenado corretamente\n\nAqui está o que sugiro:\n✅ Começa com o nosso sabor #1: Melancia com Gelo\n✅ Pagamento na entrega — se não gostares, simplesmente não pagas\n\nZero risco! Queres experimentar? 😊`,
      cs: `Je mi líto to slyšet 😔\n\nUpřímně, zážitek z vape se může hodně lišit v závislosti na:\n🔹 Zvolené příchuti (některé jsou silnější)\n🔹 Způsobu použití (rychlost potahování záleží)\n🔹 Zda bylo správně skladováno\n\nNavrhuji:\n✅ Začni naší #1 příchutí: Meloun s Ledem\n✅ Platba při doručení — pokud se ti nelíbí, prostě nezaplatíš\n\nNulové riziko! Chceš to zkusit? 😊`,
    },
    zh: `听到这个很遗憾 😔\n\n说实话，电子烟的体验差异很大，取决于：\n🔹 选择的口味（有些口味更强烈）\n🔹 使用方式（抽吸速度很重要）\n🔹 是否正确储存\n\n我的建议：\n✅ 从我们的#1口味开始：西瓜冰\n✅ 货到付款——如果不喜欢，不用付钱\n\n完全零风险！想试试吗？😊`,
    tag: "异议",
    tagColor: "bg-pink-500/20 text-pink-400",
    bonus: true,
  },

  // ── Bonus L ──
  {
    title: "加餐L：首单成交后立即追加销售",
    subtitle: "趁热打铁，成交后30分钟内追加",
    content: [
      "刚成交的客户购买意愿最高，立即追加。",
      "用'顺便'话术降低追加的压力感。",
      "提供捆绑优惠，让追加显得更划算。",
    ],
    psychology: ["刚做了决定，处于购买高峰期", "愿意相信你了", "担心漏掉好东西"],
    signals: ["成交后30分钟是追加销售的黄金窗口"],
    scripts: {
      en: `By the way, since you're already ordering... 😊\n\nWe have a special deal running TODAY only:\n\n🎁 Add a 2nd product for just +€15\n(normally €29 separately)\n\nSame delivery, same courier — no extra shipping!\n\nWant to add one? Just tell me which flavor 👇`,
      ro: `Apropo, deoarece oricum comanzi... 😊\n\nAvem o ofertă specială care rulează DOAR AZI:\n\n🎁 Adaugă un al 2-lea produs pentru doar +75 lei\n(normal 149 lei separat)\n\nAceeași livrare, același curier — fără transport suplimentar!\n\nVrei să adaugi unul? Spune-mi ce aromă 👇`,
      pl: `Przy okazji, skoro już zamawiasz... 😊\n\nMamy specjalną ofertę działającą TYLKO DZIŚ:\n\n🎁 Dodaj 2. produkt za zaledwie +65 zł\n(normalnie 130 zł osobno)\n\nTa sama dostawa, ten sam kurier — bez dodatkowej wysyłki!\n\nChcesz dodać jeden? Powiedz mi jaki smak 👇`,
      hu: `Egyébként, mivel már rendelsz... 😊\n\nVan egy különleges ajánlatunk ami CSAK MA fut:\n\n🎁 Adj hozzá egy 2. terméket csak +5 500 Ft-ért\n(normálisan 10 900 Ft külön)\n\nUgyanolyan szállítás, ugyanolyan futár — nincs extra szállítási díj!\n\nSzeretné hozzáadni? Csak mondd meg melyik ízt 👇`,
      pt: `A propósito, já que estás a encomendar... 😊\n\nTemos uma oferta especial a decorrer SÓ HOJE:\n\n🎁 Adiciona um 2º produto por apenas +€15\n(normalmente €29 separado)\n\nMesma entrega, mesmo estafeta — sem envio extra!\n\nQueres adicionar um? Só me diz qual sabor 👇`,
      cs: `Mimochodem, protože už objednáváš... 😊\n\nMáme speciální nabídku platnou JEN DNES:\n\n🎁 Přidej 2. produkt za pouhých +360 Kč\n(normálně 720 Kč zvlášť)\n\nStejné doručení, stejný kurýr — žádné extra poštovné!\n\nChceš přidat jeden? Jen mi řekni jakou příchuť 👇`,
    },
    zh: `顺便说一下，既然您已经在下单了... 😊\n\n我们今天有个特别优惠：\n\n🎁 再加一件只需+¥100\n（单独购买要¥210）\n\n同一个快递，同一个快递员——不需要额外运费！\n\n要加一个吗？告诉我您想要哪个口味 👇`,
    tag: "套餐",
    tagColor: "bg-purple-500/20 text-purple-400",
    bonus: true,
  },

  // ── Bonus M ──
  {
    title: "加餐M：用户收货后分享好评",
    subtitle: "把好评转化为转介绍和复购双赢",
    content: [
      "好评是最好的转介绍机会。",
      "立即给出转介绍奖励，趁热打铁。",
      "同时推下一次购买，形成复购循环。",
    ],
    psychology: ["心情好，愿意分享", "对品牌有好感", "可能会推荐给朋友"],
    signals: ["收到好评后立即回复，不要超过1小时"],
    scripts: {
      en: `That's amazing to hear! 🎉\n\nSo glad you're loving it! 😊\n\nHere's a little thank you from us:\n🎁 Your referral code: FRIEND20\n→ Share with friends → they get 20% OFF\n→ You get a FREE product on their first order!\n\nAlso, your next order is ready whenever you are:\n🔥 New flavors just arrived this week!\n\nWant to see what's new? 👀`,
      ro: `E minunat să aud asta! 🎉\n\nMă bucur că îți place! 😊\n\nIată un mic mulțumesc din partea noastră:\n🎁 Codul tău de referral: FRIEND20\n→ Împărtășește cu prietenii → ei primesc 20% REDUCERE\n→ Tu primești un produs GRATUIT la prima lor comandă!\n\nDe asemenea, următoarea ta comandă e gata când ești:\n🔥 Arome noi tocmai au sosit această săptămână!\n\nVrei să vezi ce e nou? 👀`,
      pl: `To wspaniale słyszeć! 🎉\n\nCieszę się, że ci się podoba! 😊\n\nOto małe podziękowanie od nas:\n🎁 Twój kod polecający: FRIEND20\n→ Udostępnij znajomym → oni dostają 20% ZNIŻKI\n→ Ty dostajesz DARMOWY produkt przy ich pierwszym zamówieniu!\n\nTakże twoje następne zamówienie jest gotowe kiedy będziesz:\n🔥 Nowe smaki właśnie przybyły w tym tygodniu!\n\nChcesz zobaczyć co nowego? 👀`,
      hu: `Csodálatos hallani! 🎉\n\nAnnyira örülök, hogy szereted! 😊\n\nÍme egy kis köszönet tőlünk:\n🎁 A te ajánlói kódod: FRIEND20\n→ Oszd meg barátaiddal → ők 20% KEDVEZMÉNYT kapnak\n→ Te INGYENES terméket kapsz az első rendelésükre!\n\nEmellett a következő rendelésed kész amikor te:\n🔥 Új ízek érkeztek ezen a héten!\n\nSzeretné látni mi az új? 👀`,
      pt: `É incrível ouvir isso! 🎉\n\nFico tão contente que estás a adorar! 😊\n\nAqui está um pequeno obrigado da nossa parte:\n🎁 O teu código de referência: FRIEND20\n→ Partilha com amigos → eles recebem 20% DESCONTO\n→ Tu recebes um produto GRÁTIS na primeira encomenda deles!\n\nTambém, a tua próxima encomenda está pronta quando quiseres:\n🔥 Novos sabores chegaram esta semana!\n\nQueres ver o que há de novo? 👀`,
      cs: `Je skvělé to slyšet! 🎉\n\nJsem tak rád, že se ti líbí! 😊\n\nZde je malé poděkování od nás:\n🎁 Tvůj referral kód: FRIEND20\n→ Sdílej s přáteli → oni dostávají 20% SLEVU\n→ Ty dostáváš ZDARMA produkt při jejich první objednávce!\n\nTaké tvoje příští objednávka je připravena kdykoli budeš:\n🔥 Nové příchutě právě dorazily tento týden!\n\nChceš vidět co je nového? 👀`,
    },
    zh: `听到这个太棒了！🎉\n\n很高兴您喜欢！😊\n\n这是我们的一点小感谢：\n🎁 您的推荐码：FRIEND20\n→ 分享给朋友 → 他们享受20%折扣\n→ 您在他们首单后获得一个免费产品！\n\n另外，您的下一次购买随时准备好了：\n🔥 本周刚到新口味！\n\n想看看有什么新品吗？👀`,
    tag: "复购",
    tagColor: "bg-rose-500/20 text-rose-400",
    bonus: true,
  },

  // ── Bonus N ──
  {
    title: "加餐N：用户说在其他地方看到更便宜",
    subtitle: "价值对比，不打价格战",
    content: [
      "不要急于降价，先了解对方在哪里看到的。",
      "用品质/服务/COD安全感做差异化。",
      "如果确实无法匹配，给出附加价值。",
    ],
    psychology: ["在货比三家", "想要最低价", "可能是真的看到了，也可能是在试探"],
    antipattern: "不要说'那你去买那个吧'——失去成交机会。",
    scripts: {
      en: `Interesting! 🤔 Can I ask where you saw it cheaper?\n\nHere's what makes us different:\n✅ COD — you pay ONLY when you receive\n✅ 24h customer support on WhatsApp\n✅ Guaranteed original or full refund\n✅ Same-day shipping before 3PM\n\nSome sellers are cheaper because they ship fakes.\nWith us, if it's not right — you simply don't pay 💪\n\nIs the peace of mind worth it to you? 😊`,
      ro: `Interesant! 🤔 Pot întreba unde ai văzut mai ieftin?\n\nIată ce ne diferențiază:\n✅ Plată la livrare — plătești DOAR când primești\n✅ Suport clienți 24h pe WhatsApp\n✅ Original garantat sau ramburs complet\n✅ Expediere în aceeași zi înainte de 15:00\n\nUnii vânzători sunt mai ieftini pentru că trimit falsuri.\nLa noi, dacă nu e corect — pur și simplu nu plătești 💪\n\nMerită liniștea sufletească pentru tine? 😊`,
      pl: `Interesujące! 🤔 Czy mogę zapytać gdzie widziałeś taniej?\n\nOto co nas wyróżnia:\n✅ Płatność przy odbiorze — płacisz TYLKO gdy otrzymasz\n✅ Wsparcie klienta 24h na WhatsApp\n✅ Gwarantowany oryginał lub pełny zwrot\n✅ Wysyłka tego samego dnia przed 15:00\n\nNiektórzy sprzedawcy są tańsi bo wysyłają podróbki.\nU nas, jeśli nie jest w porządku — po prostu nie płacisz 💪\n\nCzy spokój ducha jest dla Ciebie wart tego? 😊`,
      hu: `Érdekes! 🤔 Megkérdezhetem hol láttad olcsóbban?\n\nÍme mi különböztet meg minket:\n✅ Utánvétes fizetés — CSAK akkor fizetsz, amikor megkapod\n✅ 24h ügyfélszolgálat WhatsApp-on\n✅ Garantált eredeti vagy teljes visszatérítés\n✅ Aznapi szállítás 15:00 előtt\n\nNéhány eladó azért olcsóbb mert hamisítványokat küld.\nNálunk, ha nem stimmel — egyszerűen nem fizetsz 💪\n\nMegéri neked a nyugalom? 😊`,
      pt: `Interessante! 🤔 Posso perguntar onde viste mais barato?\n\nAqui está o que nos diferencia:\n✅ Pagamento na entrega — pagas APENAS quando recebes\n✅ Suporte ao cliente 24h no WhatsApp\n✅ Original garantido ou reembolso total\n✅ Envio no mesmo dia antes das 15h\n\nAlguns vendedores são mais baratos porque enviam falsificações.\nConnosco, se não estiver certo — simplesmente não pagas 💪\n\nVale a pena a tranquilidade para ti? 😊`,
      cs: `Zajímavé! 🤔 Mohu se zeptat kde jsi to viděl levněji?\n\nZde je co nás odlišuje:\n✅ Platba při doručení — platíš POUZE když dostaneš\n✅ Zákaznická podpora 24h na WhatsApp\n✅ Garantovaný originál nebo plná refundace\n✅ Odesílání ve stejný den před 15:00\n\nNěkteří prodejci jsou levnější protože posílají padělky.\nU nás, pokud to není v pořádku — prostě nezaplatíš 💪\n\nStojí ti za to klid? 😊`,
    },
    zh: `有意思！🤔 可以问一下您在哪里看到更便宜的吗？\n\n我们的不同之处：\n✅ 货到付款——只有收到货才付钱\n✅ WhatsApp 24小时客服\n✅ 保证正品，否则全额退款\n✅ 下午3点前下单当天发货\n\n有些卖家便宜是因为发假货。\n我们这里，如果不对——您直接不用付钱 💪\n\n这份安心感对您来说值得吗？😊`,
    tag: "异议",
    tagColor: "bg-pink-500/20 text-pink-400",
    bonus: true,
  },

  // ── Bonus O ──
  {
    title: "加餐O：用户问能不能退货",
    subtitle: "把退货顾虑变成成交的最后推力",
    content: [
      "用户问退货 = 已经想买了，只差最后一个安心。",
      "用 COD 逻辑解释退货是多余的担心。",
      "给出明确的退货政策，消除最后顾虑。",
    ],
    psychology: ["担心买了不喜欢", "想要有保障", "这是成交前最后一个问题"],
    signals: ["问退货政策是成交前最后一步，立即给出清晰答案然后收单"],
    scripts: {
      en: `Great question! Here's the thing though 😊\n\nWith Cash on Delivery, you actually don't need to worry about returns:\n\n✅ When the courier arrives, OPEN the package first\n✅ Check the product right there\n✅ If anything is wrong — just refuse it. Don't pay a cent.\n\nYou're 100% protected before you even pay!\n\nSo... shall we go ahead and place your order? 😄`,
      ro: `Întrebare bună! Dar iată lucrul 😊\n\nCu Plata la Livrare, nu trebuie să îți faci griji pentru returnări:\n\n✅ Când curierul ajunge, DESCHIDE coletul mai întâi\n✅ Verifică produsul chiar acolo\n✅ Dacă ceva nu e în regulă — refuză-l. Nu plăti niciun bănuț.\n\nEști 100% protejat înainte să plătești!\n\nDeci... mergem mai departe cu comanda ta? 😄`,
      pl: `Świetne pytanie! Ale oto rzecz 😊\n\nZ Płatnością przy Odbiorze, właściwie nie musisz martwić się o zwroty:\n\n✅ Gdy kurier przyjedzie, najpierw OTWÓRZ paczkę\n✅ Sprawdź produkt na miejscu\n✅ Jeśli coś jest nie tak — po prostu odmów. Nie płać ani grosza.\n\nJesteś 100% chroniony zanim zapłacisz!\n\nWięc... idziemy dalej z Twoim zamówieniem? 😄`,
      hu: `Jó kérdés! De itt a dolog 😊\n\nUtánvétes fizetéssel valójában nem kell aggódnod a visszaküldések miatt:\n\n✅ Amikor a futár megérkezik, először NYISD FEL a csomagot\n✅ Ellenőrizd a terméket ott helyben\n✅ Ha valami nem stimmel — egyszerűen utasítsd vissza. Ne fizess egy fillért sem.\n\n100%-ban védve vagy mielőtt fizetnél!\n\nSzóval... folytatjuk a rendelésedet? 😄`,
      pt: `Boa pergunta! Mas aqui está a coisa 😊\n\nCom Pagamento na Entrega, na verdade não precisas de te preocupar com devoluções:\n\n✅ Quando o estafeta chegar, ABRE o pacote primeiro\n✅ Verifica o produto ali mesmo\n✅ Se algo estiver errado — recusa-o. Não pagares um cêntimo.\n\nEstás 100% protegido antes de pagares!\n\nEntão... avançamos com a tua encomenda? 😄`,
      cs: `Skvělá otázka! Ale tady je věc 😊\n\nS Platbou při Doručení se vlastně nemusíš starat o vrácení:\n\n✅ Když kurýr dorazí, nejprve OTEVŘI balíček\n✅ Zkontroluj produkt přímo tam\n✅ Pokud je něco špatně — prostě ho odmítni. Nezaplať ani korunu.\n\nJsi 100% chráněn ještě před zaplacením!\n\nTak... jdeme dál s tvou objednávkou? 😄`,
    },
    zh: `好问题！不过是这样的 😊\n\n货到付款的情况下，您其实根本不需要担心退货：\n\n✅ 快递员到的时候，先开箱检查\n✅ 当场验货\n✅ 如果有任何问题——直接拒收，一分钱不用付\n\n您在付款之前就已经100%受到保护了！\n\n那么……我们现在下单吗？😄`,
    tag: "信任",
    tagColor: "bg-yellow-500/20 text-yellow-400",
    bonus: true,
  },
];
