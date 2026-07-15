/**
 * 客户取消挽回模块 — CancelRecovery
 * 独立面板，展示6大取消场景 + 对应多语言挽回话术
 * Design: 红色预警 → 橙色行动 → 绿色成功的视觉流
 */

import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp, AlertTriangle, RefreshCw, MessageCircle, BookOpen } from "lucide-react";
import { toast } from "sonner";
import type { LangKey } from "./sectionTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecoveryCase {
  id: string;
  trigger: string;          // 取消触发场景
  triggerEn: string;        // English label
  risk: "high" | "medium" | "low";
  riskLabel: string;
  strategy: string[];       // 挽回策略要点
  psychology: string[];     // 此时用户心理
  scripts: Record<LangKey, string>;
  zh: string;
  successRate: string;      // 预计挽回成功率
  tag: string;
}

// ─── Recovery cases data ──────────────────────────────────────────────────────

const recoveryCases: RecoveryCase[] = [
  {
    id: "RC-1",
    trigger: "用户说：我不要了 / 取消吧",
    triggerEn: "Customer says: cancel / don't want it",
    risk: "high",
    riskLabel: "高风险",
    strategy: [
      "不要立即答应取消，先问原因。",
      "根据原因给出针对性解决方案。",
      "用小让步（折扣/赠品）挽回，不要直接取消。",
    ],
    psychology: ["可能只是冲动说取消", "可能有具体顾虑未被解决", "给台阶下就会留下"],
    scripts: {
      en: `Oh no, I'm sorry to hear that! 😔\n\nBefore I cancel, can I ask what happened?\n\n❓ Was it the price?\n❓ Did something come up?\n❓ Are you worried about the delivery?\n\nI really want to make this right for you 🙏\nLet me see what I can do to help!`,
      ro: `Oh nu, îmi pare rău să aud asta! 😔\n\nÎnainte să anulez, pot întreba ce s-a întâmplat?\n\n❓ A fost prețul?\n❓ A apărut ceva?\n❓ Ești îngrijorat de livrare?\n\nVreau cu adevărat să rezolv asta pentru tine 🙏\nLasă-mă să văd ce pot face să ajut!`,
      pl: `O nie, przykro mi to słyszeć! 😔\n\nZanim anuluję, mogę zapytać co się stało?\n\n❓ Czy to była cena?\n❓ Czy coś wypadło?\n❓ Martwisz się o dostawę?\n\nNaprawdę chcę to naprawić dla Ciebie 🙏\nPozwól mi zobaczyć co mogę zrobić żeby pomóc!`,
      hu: `Ó nem, sajnálom hallani! 😔\n\nMielőtt lemondanám, megkérdezhetem mi történt?\n\n❓ Az ár volt?\n❓ Valami közbejött?\n❓ Aggódsz a szállítás miatt?\n\nValóban szeretném ezt rendbe hozni neked 🙏\nLássuk mit tehetek a segítségért!`,
      pt: `Oh não, lamento ouvir isso! 😔\n\nAntes de cancelar, posso perguntar o que aconteceu?\n\n❓ Foi o preço?\n❓ Surgiu alguma coisa?\n❓ Estás preocupado com a entrega?\n\nRealmente quero resolver isto para ti 🙏\nDeixa-me ver o que posso fazer para ajudar!`,
      cs: `Ach ne, je mi líto to slyšet! 😔\n\nNež zruším, mohu se zeptat co se stalo?\n\n❓ Byla to cena?\n❓ Něco se přihodilo?\n❓ Máš obavy z doručení?\n\nOpravdu to chci pro tebe napravit 🙏\nNechte mě vidět co mohu udělat pro pomoc!`,
        lv: `Ach ne, je mi líto to slyšet! 😔\n\nNež zruším, mohu se zeptat co se stalo?\n\n❓ Byla to cena?\n❓ Něco se přihodilo?\n❓ Máš obavy z piegāde?\n\nTiešām to chci pro tebe napravit 🙏\nNechte mě vidět co mohu udělat pro palīdzība!`,
        lt: `Ach ne, je mi líto to slyšet! 😔\n\nNež zruším, mohu se zeptat co se stalo?\n\n❓ Byla to kaina?\n❓ Něco se přihodilo?\n❓ Máš obavy z pristatymas?\n\nTikrai to chci pro tebe napravit 🙏\nNechte mě vidět co mohu udělat pro pagalba!`,
        sk: `Ach ne, je mi líto to slyšet! 😔\n\nNež zruším, mohu se zeptat co se stalo?\n\n❓ Byla to cena?\n❓ Něco se přihodilo?\n❓ Máš obavy z doručenýie?\n\nNaozaj to chci pro tebe napravit 🙏\nNechte mě vidět co mohu udělat pro pomoc!`,
        hr: `Ach ne, je mi líto to slyšet! 😔\n\nNež zruším, mohu se zeptat co se stalo?\n\n❓ Byla to cijena?\n❓ Něco se přihodilo?\n❓ Máš obavy z dostaava?\n\nStvarno to chci pro tebe napravit 🙏\nNechte mě vidět co mohu udělat pro pomoc!`,
        es: `Ach ne, je mi líto to slyšet! 😔\n\nNež zruším, mohu se zeptat co se stalo?\n\n❓ Byla to precio?\n❓ Něco se přihodilo?\n❓ Máš obavy z entrega?\n\nRealmente to chci pro tebe napravit 🙏\nNechte mě vidět co mohu udělat pro ayuda!`,
    },
    zh: `哦不，听到这个很遗憾！😔\n\n在取消之前，我可以问一下发生了什么吗？\n\n❓ 是价格的问题吗？\n❓ 是有什么事情突然发生了？\n❓ 是担心快递的问题吗？\n\n我真的很想为您解决这个问题 🙏\n让我看看我能做什么来帮助您！`,
    successRate: "65%",
    tag: "主动取消",
  },
  {
    id: "RC-2",
    trigger: "用户说：我已经在别处买了",
    triggerEn: "Customer says: bought elsewhere",
    risk: "high",
    riskLabel: "高风险",
    strategy: [
      "接受事实，保持友好，留下好印象。",
      "种下复购种子，下次还来。",
      "询问是哪里买的，了解竞争对手。",
    ],
    psychology: ["已经做了决定，不想被说服", "但如果体验不好，下次可能回来"],
    scripts: {
      en: `No worries at all! 😊\n\nI hope you enjoy it wherever you got it from!\n\nJust so you know — we're always here if you need:\n✅ A backup supply\n✅ Different flavors\n✅ Better price next time\n\nFeel free to message me anytime 👋\n\nP.S. — What flavor did you end up getting? 😄`,
      ro: `Nicio problemă! 😊\n\nSper că te bucuri de el de oriunde l-ai luat!\n\nDoar să știi — suntem mereu aici dacă ai nevoie de:\n✅ Aprovizionare de rezervă\n✅ Arome diferite\n✅ Preț mai bun data viitoare\n\nScrie-mi oricând 👋\n\nP.S. — Ce aromă ai luat până la urmă? 😄`,
      pl: `Żaden problem! 😊\n\nMam nadzieję, że będziesz zadowolony gdziekolwiek to kupiłeś!\n\nTylko żebyś wiedział — zawsze tu jesteśmy jeśli potrzebujesz:\n✅ Zapasowego zaopatrzenia\n✅ Innych smaków\n✅ Lepszej ceny następnym razem\n\nPisz do mnie kiedy chcesz 👋\n\nP.S. — Jaki smak ostatecznie wziąłeś? 😄`,
      hu: `Semmi gond! 😊\n\nRemélem élvezed bárhonnan is vetted!\n\nCsak hogy tudd — mindig itt vagyunk ha szükséged van:\n✅ Tartalék készletre\n✅ Különböző ízekre\n✅ Jobb árra legközelebb\n\nÍrj bármikor 👋\n\nU.i. — Milyen ízt vettél végül? 😄`,
      pt: `Sem problema! 😊\n\nEspero que gostes seja onde for que compraste!\n\nSó para saberes — estamos sempre aqui se precisares de:\n✅ Fornecimento de reserva\n✅ Sabores diferentes\n✅ Melhor preço da próxima vez\n\nManda mensagem quando quiseres 👋\n\nP.S. — Que sabor acabaste por escolher? 😄`,
      cs: `Žádný problém! 😊\n\nDoufám, že si to užiješ odkudkoliv jsi to koupil!\n\nJen abys věděl — jsme tu vždy pokud budeš potřebovat:\n✅ Záložní zásobu\n✅ Různé příchutě\n✅ Lepší cenu příště\n\nNapiš mi kdykoliv 👋\n\nP.S. — Jakou příchuť sis nakonec vzal? 😄`,
        lv: `Žádný problēma! 😊\n\nDoufám, že si to užiješ odkudkoliv jsi to koupil!\n\nTikai abys věděl — jsme tu vienmēr ja budeš potřebovat:\n✅ Záložní zásobu\n✅ Různé garšas\n✅ Labāks cenu příště\n\nNapiš mi kdykoliv 👋\n\nP.S. — Jakou garša sis visbeidzot vzal? 😄`,
        lt: `Žádný problema! 😊\n\nDoufám, že si to užiješ odkudkoliv jsi to koupil!\n\nTik abys věděl — jsme tu visada jei budeš potřebovat:\n✅ Záložní zásobu\n✅ Různé skoniai\n✅ Geresnis cenu příště\n\nNapiš mi kdykoliv 👋\n\nP.S. — Jakou skonis sis galiausiai vzal? 😄`,
        sk: `Žádný problém! 😊\n\nDoufám, že si to užiješ odkudkoliv jsi to koupil!\n\nLen abys věděl — jsme tu vždy ak budeš potřebovat:\n✅ Záložní zásobu\n✅ Různé príchute\n✅ Lepší cenu příště\n\nNapiš mi kdykoliv 👋\n\nP.S. — Jakou príchuť sis nakoniec vzal? 😄`,
        hr: `Žádný problem! 😊\n\nDoufám, že si to užiješ odkudkoliv jsi to koupil!\n\nSamo abys věděl — jsme tu uvijek ako budeš potřebovat:\n✅ Záložní zásobu\n✅ Různé okusi\n✅ Bolji cenu příště\n\nNapiš mi kdykoliv 👋\n\nP.S. — Jakou okus sis na kraju vzal? 😄`,
        es: `Žádný problema! 😊\n\nDoufám, že si to užiješ odkudkoliv jsi to koupil!\n\nSolo abys věděl — jsme tu siempre si budeš potřebovat:\n✅ Záložní zásobu\n✅ Různé sabores\n✅ Mejor cenu příště\n\nNapiš mi kdykoliv 👋\n\nP.S. — Jakou sabor sis finalmente vzal? 😄`,
    },
    zh: `完全没问题！😊\n\n希望您在哪里买的都能满意！\n\n只是让您知道——如果您需要以下情况，我们随时在这里：\n✅ 备用货源\n✅ 不同口味\n✅ 下次更好的价格\n\n随时给我发消息 👋\n\nP.S. — 您最终买了什么口味？😄`,
    successRate: "25%",
    tag: "已他处购买",
  },
  {
    id: "RC-3",
    trigger: "用户说：我没钱了 / 最近手头紧",
    triggerEn: "Customer says: no money / tight budget",
    risk: "medium",
    riskLabel: "中风险",
    strategy: [
      "不要施压，表示理解。",
      "提供更低门槛的入门选项（1件装）。",
      "设置未来跟进时间点，不要就此放弃。",
    ],
    psychology: ["真的没钱，或者在找借口", "需要被理解，不需要被推销"],
    scripts: {
      en: `Totally understand! Life happens 😊\n\nNo pressure at all!\n\nJust so you know — we also have a single pack option:\n📦 1 pc — only €29 (Cash on Delivery)\n\nOr I can check back with you next week?\nSometimes timing is everything 😄\n\nEither way, I'm here whenever you're ready 👋`,
      ro: `Înțeleg perfect! Viața e viață 😊\n\nFără presiune!\n\nDoar să știi — avem și opțiunea de o singură bucată:\n📦 1 buc — doar 149 lei (Plată la Livrare)\n\nSau pot reveni săptămâna viitoare?\nUneori totul ține de moment 😄\n\nOricum, sunt aici când ești gata 👋`,
      pl: `Doskonale rozumiem! Życie bywa różne 😊\n\nBez presji!\n\nTylko żebyś wiedział — mamy też opcję jednej sztuki:\n📦 1 szt — tylko 130 zł (Płatność przy Odbiorze)\n\nAlbo mogę wrócić do Ciebie w przyszłym tygodniu?\nCzasem wszystko zależy od momentu 😄\n\nTak czy inaczej, jestem tu gdy będziesz gotowy 👋`,
      hu: `Teljesen értem! Az élet ilyen 😊\n\nSemmi nyomás!\n\nCsak hogy tudd — van egyes darabos opciónk is:\n📦 1 db — csak 10 900 Ft (Utánvétes Fizetés)\n\nVagy visszaírhatok jövő héten?\nNéha minden az időzítésen múlik 😄\n\nMindkét esetben itt vagyok amikor kész vagy 👋`,
      pt: `Percebo perfeitamente! A vida é assim 😊\n\nSem pressão!\n\nSó para saberes — também temos opção de peça única:\n📦 1 un — apenas €29 (Pagamento na Entrega)\n\nOu posso voltar a contactar-te na próxima semana?\nÀs vezes tudo depende do momento 😄\n\nDe qualquer forma, estou aqui quando estiveres pronto 👋`,
      cs: `Naprosto chápu! Život je takový 😊\n\nŽádný tlak!\n\nJen abys věděl — máme i možnost jednoho kusu:\n📦 1 ks — jen 720 Kč (Platba při Doručení)\n\nNebo se mohu ozvat příští týden?\nNěkdy záleží na načasování 😄\n\nTak či onak, jsem tu až budeš připraven 👋`,
        lv: `Naprosto chápu! Život je takový 😊\n\nŽádný tlak!\n\nTikai abys věděl — máme i možnost jednoho kusu:\n📦 1 gab — tikai 720 Kč (Samaksa piegadē)\n\nNebo se mohu ozvat příští týdiena?\nNěkdy záleží na načasování 😄\n\nTak či onak, jsem tu až budeš sagatavojieten 👋`,
        lt: `Naprosto chápu! Život je takový 😊\n\nŽádný tlak!\n\nTik abys věděl — máme i možnost jednoho kusu:\n📦 1 vnt — tik 720 Kč (Mokejimas pristatant)\n\nNebo se mohu ozvat příští týdiena?\nNěkdy záleží na načasování 😄\n\nTak či onak, jsem tu až budeš paruoškiteen 👋`,
        sk: `Naprosto chápu! Život je takový 😊\n\nŽádný tlak!\n\nLen abys věděl — máme i možnost jednoho kusu:\n📦 1 ks — len 720 Kč (Platba pri doručenýie)\n\nNebo se mohu ozvat příští týdeň?\nNěkdy záleží na načasování 😄\n\nTak či onak, jsem tu až budeš pripraven 👋`,
        hr: `Naprosto chápu! Život je takový 😊\n\nŽádný tlak!\n\nSamo abys věděl — máme i možnost jednoho kusu:\n📦 1 kom — samo 720 Kč (Plaćanje pri isporuci)\n\nNebo se mohu ozvat příští týdan?\nNěkdy záleží na načasování 😄\n\nTak či onak, jsem tu až budeš pripremien 👋`,
        es: `Naprosto entiendo! Život je takový 😊\n\nŽádný tlak!\n\nSolo abys věděl — máme i možnost jednoho kusu:\n📦 1 un — solo 720 Kč (Pago contra reembolso)\n\nNebo se mohu ozvat příští týdía?\nNěkdy záleží na načasování 😄\n\nTak či onak, jsem tu až budeš preparaen 👋`,
    },
    zh: `完全理解！生活就是这样 😊\n\n完全没有压力！\n\n只是让您知道——我们也有单件选项：\n📦 1个 — 只需¥210（货到付款）\n\n或者我下周再联系您？\n有时候时机就是一切 😄\n\n无论如何，我随时在这里等您准备好 👋`,
    successRate: "40%",
    tag: "预算不足",
  },
  {
    id: "RC-4",
    trigger: "用户说：快递太慢了 / 我等不了",
    triggerEn: "Customer says: delivery too slow",
    risk: "medium",
    riskLabel: "中风险",
    strategy: [
      "道歉 + 给出具体解决方案。",
      "如果已发货，提供快递单号安抚。",
      "如果未发货，承诺优先处理。",
    ],
    psychology: ["急需用品", "对等待感到焦虑", "需要确定性，不是道歉"],
    scripts: {
      en: `I'm really sorry about the wait! 😔\n\nLet me check your order right now...\n\n📦 Status: [SHIPPED / PROCESSING]\n🚚 Tracking: [NUMBER]\n📅 Expected: [DATE]\n\nI've flagged your order as PRIORITY ⭐\nOur team will push this through ASAP!\n\nI'll update you personally every day until it arrives 🙏`,
      ro: `Îmi pare foarte rău pentru așteptare! 😔\n\nLasă-mă să verific comanda ta chiar acum...\n\n📦 Status: [EXPEDIAT / ÎN PROCESARE]\n🚚 Tracking: [NUMĂR]\n📅 Estimat: [DATA]\n\nAm marcat comanda ta ca PRIORITARĂ ⭐\nEchipa noastră va grăbi procesul!\n\nTe voi actualiza personal în fiecare zi până ajunge 🙏`,
      pl: `Bardzo przepraszam za czekanie! 😔\n\nPozwól, że sprawdzę Twoje zamówienie teraz...\n\n📦 Status: [WYSŁANE / W REALIZACJI]\n🚚 Śledzenie: [NUMER]\n📅 Szacowane: [DATA]\n\nOznaczyłem Twoje zamówienie jako PRIORYTETOWE ⭐\nNasz zespół przyspieszy to jak najszybciej!\n\nBędę Cię osobiście aktualizować każdego dnia aż dotrze 🙏`,
      hu: `Nagyon sajnálom a várakozást! 😔\n\nHadd ellenőrizzem a rendelésed most...\n\n📦 Állapot: [FELADVA / FELDOLGOZÁS ALATT]\n🚚 Nyomkövetés: [SZÁM]\n📅 Várható: [DÁTUM]\n\nPRIORITÁSOS jelölést adtam a rendelésednek ⭐\nCsapatunk a lehető leghamarabb feldolgozza!\n\nSzemélyesen frissítelek minden nap amíg megérkezik 🙏`,
      pt: `Lamento muito a espera! 😔\n\nDeixa-me verificar a tua encomenda agora...\n\n📦 Estado: [ENVIADO / EM PROCESSAMENTO]\n🚚 Rastreamento: [NÚMERO]\n📅 Previsto: [DATA]\n\nMarquei a tua encomenda como PRIORITÁRIA ⭐\nA nossa equipa vai acelerar isto o mais rápido possível!\n\nVou atualizar-te pessoalmente todos os dias até chegar 🙏`,
      cs: `Moc se omlouvám za čekání! 😔\n\nNechte mě zkontrolovat tvou objednávku hned...\n\n📦 Stav: [ODESLÁNO / VE ZPRACOVÁNÍ]\n🚚 Sledování: [ČÍSLO]\n📅 Očekáváno: [DATUM]\n\nOznačil jsem tvou objednávku jako PRIORITNÍ ⭐\nNáš tým to urychlí co nejdříve!\n\nBudu tě osobně každý den aktualizovat dokud nedorazí 🙏`,
        lv: `Moc se omlouvám za čekání! 😔\n\nNechte mě zkontrolovat tvou objednávku uzreiz...\n\n📦 Stav: [ODESLÁNO / VE ZPRACOVÁNÍ]\n🚚 Izsekošana: [ČÍSLO]\n📅 Očekáváno: [DATUM]\n\nOznačil jsem tvou objednávku jako PRIORITNÍ ⭐\nNáš tým to urychlí co nejdříve!\n\nBudu tě osobně katrs diena aktualizovat dokud nedorazí 🙏`,
        lt: `Moc se omlouvám za čekání! 😔\n\nNechte mě zkontrolovat tvou objednávku iš karto...\n\n📦 Stav: [ODESLÁNO / VE ZPRACOVÁNÍ]\n🚚 Sekimas: [ČÍSLO]\n📅 Očekáváno: [DATUM]\n\nOznačil jsem tvou objednávku jako PRIORITNÍ ⭐\nNáš tým to urychlí co nejdříve!\n\nBudu tě osobně kiekvienas diena aktualizovat dokud nedorazí 🙏`,
        sk: `Moc se omlouvám za čekání! 😔\n\nNechte mě zkontrolovat tvou objednávku hneď...\n\n📦 Stav: [ODESLÁNO / VE ZPRACOVÁNÍ]\n🚚 Sledovanie: [ČÍSLO]\n📅 Očekáváno: [DATUM]\n\nOznačil jsem tvou objednávku jako PRIORITNÍ ⭐\nNáš tým to urychlí co nejdříve!\n\nBudu tě osobně každý deň aktualizovat dokud nedorazí 🙏`,
        hr: `Moc se omlouvám za čekání! 😔\n\nNechte mě zkontrolovat tvou objednávku odmah...\n\n📦 Stav: [ODESLÁNO / VE ZPRACOVÁNÍ]\n🚚 Praćenje: [ČÍSLO]\n📅 Očekáváno: [DATUM]\n\nOznačil jsem tvou objednávku jako PRIORITNÍ ⭐\nNáš tým to urychlí co nejdříve!\n\nBudu tě osobně svaki dan aktualizovat dokud nedorazí 🙏`,
        es: `Moc se omlouvám za čekání! 😔\n\nNechte mě zkontrolovat tvou objednávku enseguida...\n\n📦 Stav: [ODESLÁNO / VE ZPRACOVÁNÍ]\n🚚 Seguimiento: [ČÍSLO]\n📅 Očekáváno: [DATUM]\n\nOznačil jsem tvou objednávku jako PRIORITNÍ ⭐\nNáš tým to urychlí co nejdříve!\n\nBudu tě osobně cada día aktualizovat dokud nedorazí 🙏`,
    },
    zh: `非常抱歉让您等待！😔\n\n让我现在立即查看您的订单...\n\n📦 状态：[已发货 / 处理中]\n🚚 快递单号：[单号]\n📅 预计到达：[日期]\n\n我已将您的订单标记为优先处理 ⭐\n我们的团队会尽快跟进！\n\n在包裹到达之前，我每天都会亲自给您更新进度 🙏`,
    successRate: "55%",
    tag: "物流投诉",
  },
  {
    id: "RC-5",
    trigger: "用户说：我老婆/家人不让买",
    triggerEn: "Customer says: family doesn't allow",
    risk: "low",
    riskLabel: "低风险",
    strategy: [
      "幽默处理，不要强推。",
      "给出一个'偷偷买'的理由（小包装、无品牌外包装）。",
      "或者推荐送礼场景转移焦点。",
    ],
    psychology: ["真实阻力来自家庭", "需要一个合理化购买的理由", "可能会偷偷买"],
    scripts: {
      en: `Haha, I understand completely! 😄\n\nGood news though:\n📦 Our packaging is 100% discreet\n→ Plain brown box, no brand name outside\n→ Looks like any regular package\n\nAlso — our vapes are much less smell than cigarettes 😉\nMaybe that helps the conversation at home?\n\nEither way, I'm here when the time is right 😊`,
      ro: `Haha, înțeleg complet! 😄\n\nVești bune totuși:\n📦 Ambalajul nostru este 100% discret\n→ Cutie maro simplă, fără nume de brand în exterior\n→ Arată ca orice pachet obișnuit\n\nDe asemenea — vape-urile noastre miros mult mai puțin decât țigările 😉\nPoate asta ajută conversația acasă?\n\nOricum, sunt aici când e momentul potrivit 😊`,
      pl: `Haha, doskonale rozumiem! 😄\n\nDobre wieści jednak:\n📦 Nasze opakowanie jest w 100% dyskretne\n→ Zwykłe brązowe pudełko, bez nazwy marki na zewnątrz\n→ Wygląda jak każda zwykła paczka\n\nTakże — nasze vape'y śmierdzą znacznie mniej niż papierosy 😉\nMoże to pomoże w rozmowie w domu?\n\nTak czy inaczej, jestem tu gdy nadejdzie właściwy moment 😊`,
      hu: `Haha, teljesen értem! 😄\n\nJó hír azonban:\n📦 A csomagolásunk 100% diszkrét\n→ Egyszerű barna doboz, kívül nincs márkanév\n→ Úgy néz ki mint bármely normál csomag\n\nEmellett — a vape-ünk sokkal kevésbé szagos mint a cigaretta 😉\nTalán ez segít az otthoni beszélgetésben?\n\nMindkét esetben itt vagyok amikor eljön a megfelelő pillanat 😊`,
      pt: `Haha, percebo completamente! 😄\n\nBoas notícias no entanto:\n📦 A nossa embalagem é 100% discreta\n→ Caixa castanha simples, sem nome de marca no exterior\n→ Parece qualquer pacote normal\n\nAlém disso — os nossos vapes cheiram muito menos que cigarros 😉\nTalvez isso ajude a conversa em casa?\n\nDe qualquer forma, estou aqui quando for a altura certa 😊`,
      cs: `Haha, naprosto chápu! 😄\n\nDobré zprávy nicméně:\n📦 Naše balení je 100% diskrétní\n→ Obyčejná hnědá krabice, zvenku žádný název značky\n→ Vypadá jako jakýkoliv normální balíček\n\nTaké — naše vape voní mnohem méně než cigarety 😉\nMožná to pomůže rozhovoru doma?\n\nTak či onak, jsem tu až přijde správný čas 😊`,
        lv: `Haha, naprosto chápu! 😄\n\nDobré zprávy nekasmazāk:\n📦 Naše iepakojums je 100% diskrétní\n→ Obyčejná hnědá krabice, zvenku žádný název značky\n→ Vypadá jako jakýkoliv normální pakete\n\nArī — naše vape voní daudz mazāk než cigarety 😉\nVarbūt to pomůže rozhovoru doma?\n\nTak či onak, jsem tu až přijde správný čas 😊`,
        lt: `Haha, naprosto chápu! 😄\n\nDobré zprávy niekomažiau:\n📦 Naše pakavimas je 100% diskrétní\n→ Obyčejná hnědá krabice, zvenku žádný název značky\n→ Vypadá jako jakýkoliv normální paketas\n\nTaip pat — naše vape voní daug mažiau než cigarety 😉\nGalbut to pomůže rozhovoru doma?\n\nTak či onak, jsem tu až přijde správný čas 😊`,
        sk: `Haha, naprosto chápu! 😄\n\nDobré zprávy ničmenej:\n📦 Naše balenie je 100% diskrétní\n→ Obyčejná hnědá krabice, zvenku žádný název značky\n→ Vypadá jako jakýkoliv normální balík\n\nTiež — naše vape voní oveľa menej než cigarety 😉\nMožno to pomůže rozhovoru doma?\n\nTak či onak, jsem tu až přijde správný čas 😊`,
        hr: `Haha, naprosto chápu! 😄\n\nDobré zprávy ništamanje:\n📦 Naše pakiranje je 100% diskrétní\n→ Obyčejná hnědá krabice, zvenku žádný název značky\n→ Vypadá jako jakýkoliv normální paket\n\nTakoer — naše vape voní mnogo manje než cigarety 😉\nMožda to pomůže rozhovoru doma?\n\nTak či onak, jsem tu až přijde správný čas 😊`,
        es: `Haha, naprosto entiendo! 😄\n\nDobré zprávy nadamenos:\n📦 Naše embalaje je 100% diskrétní\n→ Obyčejná hnědá krabice, zvenku žádný název značky\n→ Vypadá jako jakýkoliv normální paquete\n\nTambién — naše vape voní mucho menos než cigarety 😉\nQuizás to pomůže rozhovoru doma?\n\nTak či onak, jsem tu až přijde správný čas 😊`,
    },
    zh: `哈哈，完全理解！😄\n\n不过有个好消息：\n📦 我们的包装是100%低调的\n→ 普通棕色纸箱，外面没有品牌名称\n→ 看起来就像普通快递\n\n另外——我们的电子烟比香烟味道小多了 😉\n也许这有助于在家里的对话？\n\n无论如何，我在合适的时候等您 😊`,
    successRate: "35%",
    tag: "家庭阻力",
  },
  {
    id: "RC-6",
    trigger: "用户说：我再想想 / 过几天再说",
    triggerEn: "Customer says: let me think / maybe later",
    risk: "medium",
    riskLabel: "中风险",
    strategy: [
      "不要催，给出一个具体的回来理由。",
      "设置一个'到期'时间点，制造轻微紧迫感。",
      "3天后主动跟进一次，不要超过2次。",
    ],
    psychology: ["没有足够的购买动力", "需要一个具体的理由现在行动", "可能只是在拖延"],
    scripts: {
      en: `Of course, no rush! 😊\n\nJust a heads up — I'm holding a special price for you:\n🎁 Current offer: 3-pack for [PRICE]\n⏰ This price expires in 48 hours\n\nAfter that it goes back to full price.\n\nI'll remind you once before it expires 😊\nNo pressure — just want to make sure you don't miss out!`,
      ro: `Bineînțeles, fără grabă! 😊\n\nDoar o atenționare — îți păstrez un preț special:\n🎁 Oferta actuală: 3 buc pentru [PREȚ]\n⏰ Acest preț expiră în 48 de ore\n\nDupă aceea revine la prețul întreg.\n\nTe voi reaminti o dată înainte să expire 😊\nFără presiune — vreau doar să te asigur că nu ratezi!`,
      pl: `Oczywiście, bez pośpiechu! 😊\n\nTylko informacja — trzymam dla Ciebie specjalną cenę:\n🎁 Aktualna oferta: 3 szt za [CENA]\n⏰ Ta cena wygasa za 48 godzin\n\nPotem wraca do pełnej ceny.\n\nPrzypomnę Ci raz przed wygaśnięciem 😊\nBez presji — chcę tylko upewnić się, że nie przegapisz!`,
      hu: `Persze, semmi sietség! 😊\n\nCsak egy figyelmeztetés — tartok neked egy különleges árat:\n🎁 Jelenlegi ajánlat: 3 db [ÁR]-ért\n⏰ Ez az ár 48 óra múlva lejár\n\nUtána visszamegy a teljes árra.\n\nEgyszer emlékeztetlek lejárat előtt 😊\nNincs nyomás — csak biztosítani akarom, hogy ne maradj le!`,
      pt: `Claro, sem pressa! 😊\n\nSó um aviso — estou a guardar um preço especial para ti:\n🎁 Oferta atual: 3 un por [PREÇO]\n⏰ Este preço expira em 48 horas\n\nDepois volta ao preço normal.\n\nVou lembrar-te uma vez antes de expirar 😊\nSem pressão — só quero garantir que não perdes!`,
      cs: `Samozřejmě, bez spěchu! 😊\n\nJen upozornění — držím pro tebe speciální cenu:\n🎁 Aktuální nabídka: 3 ks za [CENA]\n⏰ Tato cena vyprší za 48 hodin\n\nPotom se vrátí na plnou cenu.\n\nJednou tě připomenu před vypršením 😊\nŽádný tlak — jen chci zajistit, abys nepropásl!`,
        lv: `Protams, bez spěchu! 😊\n\nTikai upozornění — držím pro tebe īpaša cenu:\n🎁 Aktuální piedāvājums: 3 gab za [CENA]\n⏰ Tato cena vyprší za 48 stundas\n\nPotom se vrátí na plnou cenu.\n\nJednou tě připomenu před vypršením 😊\nŽádný tlak — tikai chci zajistit, abys nepropásl!`,
        lt: `Žinoma, bez spěchu! 😊\n\nTik upozornění — držím pro tebe speciali cenu:\n🎁 Aktuální pasiūlymas: 3 vnt za [CENA]\n⏰ Tato kaina vyprší za 48 valandų\n\nPotom se vrátí na plnou cenu.\n\nJednou tě připomenu před vypršením 😊\nŽádný tlak — tik chci zajistit, abys nepropásl!`,
        sk: `Samozrejme, bez spěchu! 😊\n\nLen upozornění — držím pro tebe špeciálna cenu:\n🎁 Aktuální ponuka: 3 ks za [CENA]\n⏰ Tato cena vyprší za 48 hodín\n\nPotom se vrátí na plnou cenu.\n\nJednou tě připomenu před vypršením 😊\nŽádný tlak — len chci zajistit, abys nepropásl!`,
        hr: `Naravno, bez spěchu! 😊\n\nSamo upozornění — držím pro tebe posebna cenu:\n🎁 Aktuální ponuda: 3 kom za [CENA]\n⏰ Tato cijena vyprší za 48 sati\n\nPotom se vrátí na plnou cenu.\n\nJednou tě připomenu před vypršením 😊\nŽádný tlak — samo chci zajistit, abys nepropásl!`,
        es: `Por supuesto, bez spěchu! 😊\n\nSolo upozornění — držím pro tebe especial cenu:\n🎁 Aktuální oferta: 3 un za [CENA]\n⏰ Tato precio vyprší za 48 horas\n\nPotom se vrátí na plnou cenu.\n\nJednou tě připomenu před vypršením 😊\nŽádný tlak — solo chci zajistit, abys nepropásl!`,
    },
    zh: `当然，不着急！😊\n\n只是提醒一下——我为您保留了一个特别价格：\n🎁 当前优惠：3件装 [价格]\n⏰ 这个价格48小时后到期\n\n之后会恢复原价。\n\n到期前我会提醒您一次 😊\n没有压力——只是想确保您不会错过！`,
    successRate: "50%",
    tag: "延迟决策",
  },
];

// ─── Language metadata (local copy) ──────────────────────────────────────────

const LANG_META: Record<LangKey, { label: string; flag: string }> = {
  en: { label: "English",    flag: "🇬🇧" },
  ro: { label: "Română",     flag: "🇷🇴" },
  pl: { label: "Polski",     flag: "🇵🇱" },
  hu: { label: "Magyar",     flag: "🇭🇺" },
  pt: { label: "Português",  flag: "🇵🇹" },
  cs: { label: "Čeština",    flag: "🇨🇿" },
  es: { label: "Español",    flag: "🇪🇸" },
  hr: { label: "Hrvatski",   flag: "🇭🇷" },
  sk: { label: "Slovenčina", flag: "🇸🇰" },
  lt: { label: "Lietuvių",   flag: "🇱🇹" },
  lv: { label: "Latviešu",   flag: "🇱🇻" },
};

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

const RISK_STYLE = {
  high:   { badge: "bg-red-100 text-red-600 border-red-200",    bar: "bg-red-400",    dot: "bg-red-400",    border: "border-red-200 hover:border-red-300" },
  medium: { badge: "bg-orange-100 text-orange-600 border-orange-200", bar: "bg-orange-400", dot: "bg-orange-400", border: "border-orange-200 hover:border-orange-300" },
  low:    { badge: "bg-yellow-100 text-yellow-700 border-yellow-200", bar: "bg-yellow-400", dot: "bg-yellow-400", border: "border-yellow-200 hover:border-yellow-300" },
};

function applyBrand(text: string, brand: string): string {
  const DEFAULT_BRAND = "CLOUD VAPE";
  if (!brand.trim() || brand.trim() === DEFAULT_BRAND) return text;
  return text.replace(/CLOUD VAPE/g, brand.trim());
}

function RecoveryCard({ rc, lang, showZh, brandName }: { rc: RecoveryCase; lang: LangKey; showZh: boolean; brandName: string }) {
  const [expanded, setExpanded] = useState(false);
  const style = RISK_STYLE[rc.risk];

  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-300 bg-white ${style.border}`}>
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-3 cursor-pointer select-none"
        style={{ background: "rgba(254,252,252,0.98)" }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Risk indicator */}
        <div className={`w-2 h-10 rounded-full flex-shrink-0 ${style.bar}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-xs font-bold text-slate-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{rc.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${style.badge}`}>{rc.riskLabel}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">{rc.tag}</span>
            <span className="text-xs text-slate-400">挽回率 <span className="font-bold text-slate-600">{rc.successRate}</span></span>
          </div>
          <h3 className="text-sm font-700 text-slate-800 leading-snug" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}>
            {rc.trigger}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 italic">{rc.triggerEn}</p>
        </div>

        <div className="text-slate-400 flex-shrink-0">{expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</div>
      </div>

      {/* Body */}
      {expanded && (
        <div className="border-t border-slate-100">
          {/* Strategy + psychology */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-100 space-y-3">
            <div>
              <h4 className="text-[10px] font-600 uppercase tracking-widest text-[#128C7E] mb-2">挽回策略</h4>
              <ul className="flex flex-col gap-1.5">
                {rc.strategy.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                    <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[#128C7E]/15 border border-[#128C7E]/35 flex items-center justify-center flex-shrink-0">
                      <Check size={7} className="text-[#128C7E]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-600 uppercase tracking-widest text-blue-400 mb-2">用户心理</h4>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                {rc.psychology.map((item, i) => (
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
            {/* Script panel */}
            <div className={`p-5 ${showZh ? "border-r border-slate-100" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[10px] font-600 uppercase tracking-widest text-[#128C7E]">
                  {LANG_META[lang].flag} {LANG_META[lang].label} 挽回话术
                </h4>
                <CopyBtn text={applyBrand(rc.scripts[lang], brandName)} />
              </div>
              <div className="rounded-xl overflow-hidden bg-[#F0F2F5] border border-slate-200">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#128C7E]">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={10} className="text-white" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">{brandName.trim() || "CLOUD VAPE"}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span className="text-[10px] text-green-300">online</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-end">
                    <div className="bubble-out max-w-[90%] px-3 py-2">
                      <pre className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace" }}>
                        {applyBrand(rc.scripts[lang], brandName)}
                      </pre>
                      <div className="flex justify-end mt-1"><span className="text-[10px] text-slate-400">✓✓</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chinese reference */}
            {showZh && (
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[10px] font-600 uppercase tracking-widest text-amber-400">🇨🇳 中文对照</h4>
                  <CopyBtn text={applyBrand(rc.zh, brandName)} />
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
                          {applyBrand(rc.zh, brandName)}
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

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function CancelRecovery({ lang, showZh, brandName }: { lang: LangKey; showZh: boolean; brandName: string }) {
  const [activeRisk, setActiveRisk] = useState<"全部" | "high" | "medium" | "low">("全部");

  const filtered = recoveryCases.filter((rc) => activeRisk === "全部" || rc.risk === activeRisk);

  const counts = {
    high:   recoveryCases.filter((r) => r.risk === "high").length,
    medium: recoveryCases.filter((r) => r.risk === "medium").length,
    low:    recoveryCases.filter((r) => r.risk === "low").length,
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Section header */}
      <div className="rounded-3xl overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, #7F1D1D 0%, #DC2626 50%, #EF4444 100%)" }}>
        <div className="px-6 sm:px-8 py-7 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
          <div className="flex items-start gap-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-800 text-white" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}>
                  客户取消挽回模块
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">6 大场景</span>
              </div>
              <p className="text-sm text-red-100 leading-relaxed">
                客户说"不要了"不等于真的放弃——正确的挽回话术可以挽救 35-65% 的取消订单
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-5 relative">
            {[
              { label: "高风险场景", count: counts.high,   color: "bg-red-900/40",    text: "text-red-200",    sub: "需立即挽回" },
              { label: "中风险场景", count: counts.medium, color: "bg-orange-900/40", text: "text-orange-200", sub: "有机会挽回" },
              { label: "低风险场景", count: counts.low,    color: "bg-yellow-900/40", text: "text-yellow-200", sub: "耐心跟进" },
            ].map((s, i) => (
              <div key={i} className={`${s.color} backdrop-blur-sm rounded-xl p-3 text-center`}>
                <div className={`text-2xl font-800 ${s.text}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>{s.count}</div>
                <div className="text-xs text-white/80 font-medium">{s.label}</div>
                <div className={`text-[10px] ${s.text} mt-0.5`}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <AlertTriangle size={13} className="text-slate-400" />
        <span className="text-xs text-slate-400 mr-1">按风险筛选：</span>
        {(["全部", "high", "medium", "low"] as const).map((r) => {
          const labels = { "全部": "全部场景", high: "🔴 高风险", medium: "🟠 中风险", low: "🟡 低风险" };
          return (
            <button
              key={r}
              onClick={() => setActiveRisk(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-600 transition-all duration-150 border ${
                activeRisk === r
                  ? "bg-slate-700 text-white border-slate-700"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
            >
              {labels[r]}
            </button>
          );
        })}
        <span className="text-xs text-slate-400 ml-1">共 {filtered.length} 个场景</span>
      </div>

      {/* Recovery cards */}
      <div className="space-y-3">
        {filtered.map((rc) => (
          <RecoveryCard key={rc.id} rc={rc} lang={lang} showZh={showZh} brandName={brandName} />
        ))}
      </div>

      {/* Bottom tip */}
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <h4 className="text-xs font-700 text-amber-700 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          ⚡ 挽回黄金法则
        </h4>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-amber-700">
          <div className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">1.</span>
            <span>先问原因，不要直接接受取消——70%的取消是可以挽回的</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">2.</span>
            <span>用小让步（赠品/折扣）而不是大幅降价——维护定价体系</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold flex-shrink-0">3.</span>
            <span>最多跟进2次，超过2次会被拉黑——保持专业和尊重</span>
          </div>
        </div>
      </div>
    </section>
  );
}
