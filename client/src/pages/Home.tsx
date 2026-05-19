/**
 * Design Philosophy: WhatsApp Immersive (方案 C) — Enhanced
 * - Deep dark background (#0B141A) + WhatsApp green (#25D366) accent
 * - Simulated WhatsApp chat bubbles for scripts
 * - Features: Language toggle (EN/RO/PL), Step progress tracker, Script editor, Tag filter
 * - Space Grotesk (EN titles) + Noto Sans SC (CN body)
 * - Staggered entrance animations, copy-to-clipboard interaction
 */

import { useState, useCallback } from "react";
import {
  Check,
  Copy,
  MessageCircle,
  TrendingUp,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Globe,
  BarChart2,
  Edit3,
  X,
  RotateCcw,
  Search,
} from "lucide-react";
import { toast } from "sonner";

// ─── Data ────────────────────────────────────────────────────────────────────

type LangKey = "en" | "ro" | "pl";

interface Section {
  title: string;
  subtitle: string;
  content: string[];
  scripts: Record<LangKey, string>;
  tag: string;
  tagColor: string;
}

const sections: Section[] = [
  {
    title: "第一步：用户进入 WhatsApp",
    subtitle: "3秒建立信任",
    content: [
      "用户第一反应：像不像骗子。",
      "先建立安全感，而不是介绍产品。",
    ],
    scripts: {
      en: `Hello 👋\nWelcome to CLOUD VAPE\n\n✅ Original Products\n✅ Fast Shipping\n✅ Cash on Delivery\n✅ Delivery in 24-72h\n\nWhich flavor do you want? 🔥`,
      ro: `Bună 👋\nBun venit la CLOUD VAPE\n\n✅ Produse Originale\n✅ Livrare Rapidă\n✅ Plată la Livrare\n✅ Livrare în 24-72h\n\nCe aromă dorești? 🔥`,
      pl: `Cześć 👋\nWitaj w CLOUD VAPE\n\n✅ Oryginalne Produkty\n✅ Szybka Wysyłka\n✅ Płatność przy Odbiorze\n✅ Dostawa w 24-72h\n\nJaki smak chcesz? 🔥`,
    },
    tag: "破冰",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "第二步：用户咨询价格",
    subtitle: "热销感 → 套餐 → COD",
    content: [
      "不要只发价格。",
      "正确顺序：热销感 → 套餐 → COD → 推动下单。",
    ],
    scripts: {
      en: `This model is very popular now 🔥\n\n1 pcs — €29\n2 pcs — €39\n3 pcs — €49 ⭐ Best Seller\n\n✅ Original\n✅ Fast shipping\n✅ Cash on Delivery`,
      ro: `Acest model este foarte popular acum 🔥\n\n1 buc — 149 lei\n2 buc — 199 lei\n3 buc — 249 lei ⭐ Cel mai vândut\n\n✅ Original\n✅ Livrare rapidă\n✅ Plată la livrare`,
      pl: `Ten model jest teraz bardzo popularny 🔥\n\n1 szt — 130 zł\n2 szt — 170 zł\n3 szt — 210 zł ⭐ Bestseller\n\n✅ Oryginalny\n✅ Szybka wysyłka\n✅ Płatność przy odbiorze`,
    },
    tag: "报价",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "第三步：用户开始犹豫",
    subtitle: "用短句建立信任",
    content: [
      "用户担心被骗，不是担心参数。",
      "用短句建立信任。",
    ],
    scripts: {
      en: `Yes 👍\n\nYou only pay when the package arrives.\n\nNo online payment needed.`,
      ro: `Da 👍\n\nPlătești doar când coletul ajunge la tine.\n\nNu este nevoie de plată online.`,
      pl: `Tak 👍\n\nPłacisz tylko gdy paczka dotrze do Ciebie.\n\nBez płatności online.`,
    },
    tag: "信任",
    tagColor: "bg-yellow-500/20 text-yellow-400",
  },
  {
    title: "第四步：制造成交压力",
    subtitle: "库存感 + 时间感 + 发货感",
    content: [
      "用户不是不买，而是拖延。",
      "制造库存感、时间感、发货感。",
    ],
    scripts: {
      en: `🔥 This flavor is selling very fast today\n⏰ The discount ends tonight\n🚚 If you order now, we can ship today`,
      ro: `🔥 Această aromă se vinde foarte repede azi\n⏰ Reducerea expiră în această seară\n🚚 Dacă comanzi acum, putem expedia azi`,
      pl: `🔥 Ten smak sprzedaje się dziś bardzo szybko\n⏰ Zniżka kończy się dziś wieczorem\n🚚 Jeśli zamówisz teraz, możemy wysłać dziś`,
    },
    tag: "催单",
    tagColor: "bg-orange-500/20 text-orange-400",
  },
  {
    title: "第五步：强推套餐",
    subtitle: "提高利润核心",
    content: [
      "东欧 COD 利润核心是多件成交。",
      '用"别人都这样买"推动。',
    ],
    scripts: {
      en: `Most customers choose 3 pcs 👍\n\nThe shipping cost is almost the same and the price is much better.`,
      ro: `Majoritatea clienților aleg 3 bucăți 👍\n\nCostul de livrare este aproape același, dar prețul este mult mai bun.`,
      pl: `Większość klientów wybiera 3 sztuki 👍\n\nKoszt wysyłki jest prawie taki sam, a cena jest znacznie lepsza.`,
    },
    tag: "套餐",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "第六步：收地址成交",
    subtitle: "直接收地址，不要闲聊",
    content: [
      "用户问发货/库存时，直接收地址。",
      "不要继续闲聊。",
    ],
    scripts: {
      en: `Perfect 👍\n\nPlease send:\n\nFull Name:\nPhone Number:\nCity:\nFull Address:\nPostal Code:\n\nWe will ship your order today 🚚`,
      ro: `Perfect 👍\n\nTe rog trimite:\n\nNume Complet:\nNumăr de Telefon:\nOraș:\nAdresă Completă:\nCod Poștal:\n\nVom expedia comanda ta azi 🚚`,
      pl: `Świetnie 👍\n\nProszę podaj:\n\nPełne Imię i Nazwisko:\nNumer Telefonu:\nMiasto:\nPełny Adres:\nKod Pocztowy:\n\nWyślemy Twoje zamówienie dziś 🚚`,
    },
    tag: "收单",
    tagColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "第七步：确认订单",
    subtitle: "强化已经下单的心理",
    content: [
      '强化"已经下单"的心理。',
      "降低后悔和拒收。",
    ],
    scripts: {
      en: `Your order has been confirmed ✅\n\nWe will prepare the package today 🚚`,
      ro: `Comanda ta a fost confirmată ✅\n\nVom pregăti coletul azi 🚚`,
      pl: `Twoje zamówienie zostało potwierdzone ✅\n\nPrzygotujemy paczkę dziś 🚚`,
    },
    tag: "确认",
    tagColor: "bg-teal-500/20 text-teal-400",
  },
  {
    title: "第八步：发货后跟进",
    subtitle: "持续建立真实感",
    content: [
      "持续建立真实感。",
      "降低 COD 拒收。",
    ],
    scripts: {
      en: `Your package has been shipped 📦\n\nDelivery usually takes 1-3 working days.`,
      ro: `Coletul tău a fost expediat 📦\n\nLivrarea durează de obicei 1-3 zile lucrătoare.`,
      pl: `Twoja paczka została wysłana 📦\n\nDostawa zajmuje zazwyczaj 1-3 dni robocze.`,
    },
    tag: "发货",
    tagColor: "bg-sky-500/20 text-sky-400",
  },
  {
    title: "第九步：派送当天提醒",
    subtitle: "明显降低拒收率",
    content: [
      "派送提醒能明显降低拒收率。",
      "提前让客户准备现金。",
    ],
    scripts: {
      en: `Your package will arrive today 🚚\n\nPlease keep your phone available.`,
      ro: `Coletul tău va ajunge azi 🚚\n\nTe rugăm să fii disponibil la telefon.`,
      pl: `Twoja paczka dotrze dziś 🚚\n\nProszę być dostępnym pod telefonem.`,
    },
    tag: "提醒",
    tagColor: "bg-amber-500/20 text-amber-400",
  },
  {
    title: "第十步：签收后做复购",
    subtitle: "真正赚钱靠复购",
    content: [
      "真正赚钱靠复购。",
      "3-7天后跟进。",
    ],
    scripts: {
      en: `Hi 👋\n\nHow is the flavor? 🔥\n\nThis week we still have promo packs available.`,
      ro: `Bună 👋\n\nCum este aroma? 🔥\n\nAceastă săptămână mai avem pachete promoționale disponibile.`,
      pl: `Cześć 👋\n\nJak smak? 🔥\n\nW tym tygodniu mamy jeszcze dostępne pakiety promocyjne.`,
    },
    tag: "复购",
    tagColor: "bg-rose-500/20 text-rose-400",
  },
];

const ALL_TAGS = ["全部", ...Array.from(new Set(sections.map((s) => s.tag)))];

const LANG_LABELS: Record<LangKey, string> = {
  en: "English",
  ro: "Română",
  pl: "Polski",
};

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
        bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150"
    >
      {copied ? (
        <><Check size={13} className="text-emerald-400" />已复制</>
      ) : (
        <><Copy size={13} />复制话术</>
      )}
    </button>
  );
}

interface StepCardProps {
  section: Section;
  index: number;
  lang: LangKey;
  completed: boolean;
  onToggleComplete: () => void;
  customScript: string | null;
  onSaveScript: (s: string) => void;
  onResetScript: () => void;
}

function StepCard({
  section,
  index,
  lang,
  completed,
  onToggleComplete,
  customScript,
  onSaveScript,
  onResetScript,
}: StepCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const displayScript = customScript ?? section.scripts[lang];

  const startEdit = () => {
    setDraft(displayScript);
    setEditing(true);
  };
  const saveEdit = () => {
    onSaveScript(draft);
    setEditing(false);
    toast.success("话术已保存");
  };
  const cancelEdit = () => setEditing(false);

  return (
    <div
      className={`animate-fade-in-up stagger-${Math.min(index + 1, 10)} rounded-2xl overflow-hidden border transition-all duration-300
        ${completed
          ? "border-[#25D366]/50 shadow-[0_0_20px_rgba(37,211,102,0.10)]"
          : "border-white/8 hover:border-[#25D366]/25 hover:shadow-[0_0_30px_rgba(37,211,102,0.07)]"
        }`}
      style={{ background: "#111B21" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 border-b border-white/8 flex items-center gap-3 cursor-pointer select-none"
        style={{ background: "rgba(11,20,26,0.6)" }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Step badge / complete toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-200
            ${completed
              ? "bg-[#25D366] text-[#0B141A] shadow-[0_0_12px_rgba(37,211,102,0.5)]"
              : "bg-[#25D366] text-[#0B141A]"
            }`}
          title={completed ? "标记为未完成" : "标记为已完成"}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {completed ? <Check size={16} strokeWidth={3} /> : index + 1}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2
              className={`text-base font-700 leading-tight transition-colors duration-200 ${completed ? "text-white/50 line-through" : "text-white"}`}
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
            >
              {section.title}
            </h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${section.tagColor}`}>
              {section.tag}
            </span>
            {customScript && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-violet-500/20 text-violet-400">
                已自定义
              </span>
            )}
          </div>
          <p className="text-xs text-white/45 mt-0.5">{section.subtitle}</p>
        </div>

        <div className="text-white/30 flex-shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <div className="grid lg:grid-cols-2 gap-0 step-card-grid">
          {/* Left: Logic */}
          <div className="p-5 border-r border-white/8">
            <h3 className="text-[10px] font-600 uppercase tracking-widest text-[#25D366] mb-3">
              实战逻辑
            </h3>
            <ul className="space-y-2.5">
              {section.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-white/70 leading-relaxed">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#25D366]/15 border border-[#25D366]/35 flex items-center justify-center flex-shrink-0">
                    <Check size={8} className="text-[#25D366]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Script */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-600 uppercase tracking-widest text-[#25D366]">
                高转化话术
              </h3>
              <div className="flex items-center gap-2">
                {customScript && (
                  <button
                    onClick={onResetScript}
                    className="copy-btn flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium
                      bg-white/8 hover:bg-white/15 text-white/50 hover:text-white/80 transition-all duration-150"
                    title="恢复默认话术"
                  >
                    <RotateCcw size={11} />
                    恢复默认
                  </button>
                )}
                <button
                  onClick={startEdit}
                  className="copy-btn flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium
                    bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 hover:text-violet-300 transition-all duration-150"
                  title="编辑话术"
                >
                  <Edit3 size={11} />
                  编辑
                </button>
                <CopyButton text={displayScript} />
              </div>
            </div>

            {/* WhatsApp window */}
            <div className="rounded-xl overflow-hidden bg-[#0B141A] border border-white/6">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#202C33] border-b border-white/8">
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={10} className="text-[#0B141A]" />
                </div>
                <span className="text-xs text-white/60 font-medium">CLOUD VAPE</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span className="text-[10px] text-[#25D366]">online</span>
                </div>
              </div>

              {/* Chat area */}
              <div className="p-3 min-h-[70px]">
                {editing ? (
                  <div className="space-y-2">
                    <textarea
                      className="w-full bg-[#202C33] text-white/90 text-xs rounded-lg p-3 border border-white/10 focus:border-[#25D366]/50 outline-none resize-none leading-relaxed"
                      style={{ fontFamily: "'JetBrains Mono', monospace", minHeight: "120px" }}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-white/8 hover:bg-white/15 text-white/60 hover:text-white transition-all"
                      >
                        <X size={11} />取消
                      </button>
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-all"
                      >
                        <Check size={11} />保存
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bubble-out max-w-[88%] px-3 py-2">
                      <pre
                        className="text-xs text-white/90 whitespace-pre-wrap leading-relaxed"
                        style={{ fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace" }}
                      >
                        {displayScript}
                      </pre>
                      <div className="flex justify-end mt-1">
                        <span className="text-[10px] text-white/40">✓✓</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressPanel({
  completed,
  total,
  onReset,
}: {
  completed: number;
  total: number;
  onReset: () => void;
}) {
  const pct = Math.round((completed / total) * 100);
  return (
    <div className="rounded-2xl border border-white/8 p-5 bg-[#111B21]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className="text-[#25D366]" />
          <span className="text-sm font-600 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            今日成交进度
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/50">
            <span className="text-[#25D366] font-700">{completed}</span> / {total} 步
          </span>
          <button
            onClick={onReset}
            className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
          >
            <RotateCcw size={11} />
            重置
          </button>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 progress-shimmer"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-white/35 text-right">{pct}% 完成</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<LangKey>("en");
  const [activeTag, setActiveTag] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [customScripts, setCustomScripts] = useState<Record<number, string>>({});

  const toggleComplete = useCallback((idx: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const saveScript = useCallback((idx: number, script: string) => {
    setCustomScripts((prev) => ({ ...prev, [idx]: script }));
  }, []);

  const resetScript = useCallback((idx: number) => {
    setCustomScripts((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
    toast.success("已恢复默认话术");
  }, []);

  const resetProgress = () => {
    setCompletedSteps(new Set());
    toast.success("进度已重置");
  };

  const filteredSections = sections
    .map((s, i) => ({ ...s, originalIndex: i }))
    .filter((s) => {
      const matchTag = activeTag === "全部" || s.tag === activeTag;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.scripts[lang].toLowerCase().includes(q);
      return matchTag && matchSearch;
    });

  return (
    <div className="min-h-screen" style={{ background: "#0B141A" }}>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,211,102,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative">
          {/* Badge */}
          <div className="animate-fade-in-up flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] text-sm font-medium">
              <MessageCircle size={14} />
              WhatsApp COD 实战手册 · 东欧市场
            </span>
          </div>

          {/* Title */}
          <div className="animate-fade-in-up stagger-1 text-center mb-10">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}
            >
              东欧 COD 电子烟
              <br />
              <span style={{ color: "#25D366" }}>WhatsApp 完整成交步骤</span>
            </h1>
            <p
              className="text-base text-white/50 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              降低被骗感 → 建立真实感 → 制造热销感 → 推动立即下单 → 降低拒收 → 做复购
            </p>
          </div>

          {/* Core principles */}
          <div className="animate-fade-in-up stagger-2 grid sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: <Shield size={18} />, title: "核心1：降低风险", desc: "不断强调 COD / Pay when received", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { icon: <TrendingUp size={18} />, title: "核心2：建立信任", desc: "回复快、像真人、强调热销", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { icon: <Zap size={18} />, title: "核心3：推动下单", desc: "制造库存感和时效感", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-4 border ${item.bg} flex items-start gap-3`}>
                <div className={`mt-0.5 flex-shrink-0 ${item.color}`}>{item.icon}</div>
                <div>
                  <h3 className={`font-700 text-sm ${item.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/45 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Toolbar ── */}
          <div className="animate-fade-in-up stagger-3 flex flex-wrap gap-3 items-center">
            {/* Language switcher */}
            <div className="flex items-center gap-1 bg-[#111B21] border border-white/8 rounded-xl p-1">
              <Globe size={13} className="text-white/40 ml-1.5 mr-0.5" />
              {(["en", "ro", "pl"] as LangKey[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all duration-150 ${
                    lang === l
                      ? "bg-[#25D366] text-[#0B141A]"
                      : "text-white/50 hover:text-white hover:bg-white/8"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-[#111B21] border border-white/8 rounded-xl px-3 py-2 flex-1 min-w-[160px] max-w-xs">
              <Search size={13} className="text-white/35 flex-shrink-0" />
              <input
                type="text"
                placeholder="搜索步骤或话术…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white/80 placeholder-white/30 outline-none w-full"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-white/30 hover:text-white/60">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Tag filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-600 transition-all duration-150 border ${
                    activeTag === tag
                      ? "bg-[#25D366] text-[#0B141A] border-[#25D366]"
                      : "bg-transparent text-white/45 border-white/10 hover:border-white/25 hover:text-white/70"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Progress panel */}
        <div className="mb-5">
          <ProgressPanel
            completed={completedSteps.size}
            total={sections.length}
            onReset={resetProgress}
          />
        </div>

        {/* Step cards */}
        {filteredSections.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
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

      {/* ── Formula footer ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="animate-fade-in-up rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #005C4B 0%, #128C7E 50%, #25D366 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
          <h2
            className="text-2xl sm:text-3xl font-800 text-white mb-8 relative"
            style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}
          >
            东欧 COD 真正的成交公式
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 relative">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5">
              <h3 className="text-base font-700 text-white/90 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ❌ 错误方式
              </h3>
              <div className="space-y-2 text-white/65 text-sm">
                {["一直介绍产品参数", "长篇介绍品牌故事", "只发价格", "等用户主动下单"].map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5">
              <h3 className="text-base font-700 text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ✅ 正确方式
              </h3>
              <div className="space-y-2 text-white text-sm">
                {["强调 COD 安全感", "建立真实商家感", "制造热销与库存压力", "主动推动立即成交"].map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center relative">
            <p
              className="text-2xl sm:text-3xl font-800 text-white"
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}
            >
              信任感 ＞ 产品参数
            </p>
            <p className="text-lg mt-2 text-white/75" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              COD 安全感 ＞ 品牌故事
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
