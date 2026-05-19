/**
 * Design Philosophy: WhatsApp Immersive (方案 C)
 * - Deep dark background (#0B141A) + WhatsApp green (#25D366) accent
 * - Simulated WhatsApp chat bubbles for scripts
 * - Step cards with left logic / right chat bubble layout
 * - Space Grotesk (EN titles) + Noto Sans SC (CN body)
 * - Staggered entrance animations, copy-to-clipboard interaction
 */

import { useState } from "react";
import { Check, Copy, MessageCircle, TrendingUp, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

const sections = [
  {
    title: "第一步：用户进入 WhatsApp",
    subtitle: "3秒建立信任",
    content: [
      "用户第一反应：像不像骗子。",
      "先建立安全感，而不是介绍产品。",
    ],
    script: `Hello 👋\nWelcome to CLOUD VAPE\n\n✅ Original Products\n✅ Fast Shipping\n✅ Cash on Delivery\n✅ Delivery in 24-72h\n\nWhich flavor do you want? 🔥`,
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
    script: `This model is very popular now 🔥\n\n1 pcs — €29\n2 pcs — €39\n3 pcs — €49 ⭐ Best Seller\n\n✅ Original\n✅ Fast shipping\n✅ Cash on Delivery`,
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
    script: `Yes 👍\n\nYou only pay when the package arrives.\n\nNo online payment needed.`,
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
    script: `🔥 This flavor is selling very fast today\n⏰ The discount ends tonight\n🚚 If you order now, we can ship today`,
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
    script: `Most customers choose 3 pcs 👍\n\nThe shipping cost is almost the same and the price is much better.`,
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
    script: `Perfect 👍\n\nPlease send:\n\nFull Name:\nPhone Number:\nCity:\nFull Address:\nPostal Code:\n\nWe will ship your order today 🚚`,
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
    script: `Your order has been confirmed ✅\n\nWe will prepare the package today 🚚`,
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
    script: `Your package has been shipped 📦\n\nDelivery usually takes 1-3 working days.`,
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
    script: `Your package will arrive today 🚚\n\nPlease keep your phone available.`,
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
    script: `Hi 👋\n\nHow is the flavor? 🔥\n\nThis week we still have promo packs available.`,
    tag: "复购",
    tagColor: "bg-rose-500/20 text-rose-400",
  },
];

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
      title="复制话术"
    >
      {copied ? (
        <><Check size={13} className="text-emerald-400" /> 已复制</>
      ) : (
        <><Copy size={13} /> 复制话术</>
      )}
    </button>
  );
}

function StepCard({ section, index }: { section: typeof sections[0]; index: number }) {
  return (
    <div
      className={`animate-fade-in-up stagger-${Math.min(index + 1, 10)} bg-[#111B21] rounded-2xl overflow-hidden border border-white/8 hover:border-[#25D366]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.08)]`}
    >
      {/* Card header */}
      <div className="px-6 py-4 border-b border-white/8 flex items-center gap-4 bg-[#0B141A]/60">
        <div className="step-badge">{index + 1}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-700 text-white leading-tight" style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif" }}>
              {section.title}
            </h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${section.tagColor}`}>
              {section.tag}
            </span>
          </div>
          <p className="text-sm text-white/50 mt-0.5">{section.subtitle}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left: Logic */}
        <div className="p-6 border-r border-white/8">
          <h3 className="text-xs font-600 uppercase tracking-widest text-[#25D366] mb-4">
            实战逻辑
          </h3>
          <ul className="space-y-3">
            {section.content.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center flex-shrink-0">
                  <Check size={9} className="text-[#25D366]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Script (WhatsApp bubble) */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-600 uppercase tracking-widest text-[#25D366]">
              高转化话术
            </h3>
            <CopyButton text={section.script} />
          </div>

          {/* Simulated WhatsApp chat window */}
          <div className="rounded-xl overflow-hidden bg-[#0B141A] border border-white/6">
            {/* WhatsApp header bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#202C33] border-b border-white/8">
              <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle size={12} className="text-[#0B141A]" />
              </div>
              <span className="text-xs text-white/60 font-medium">CLOUD VAPE</span>
              <div className="ml-auto flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span className="text-[10px] text-[#25D366]">online</span>
              </div>
            </div>
            {/* Chat area */}
            <div className="p-4 min-h-[80px]">
              <div className="flex justify-end">
                <div className="bubble-out max-w-[85%] px-3 py-2">
                  <pre
                    className="text-xs text-white/90 whitespace-pre-wrap leading-relaxed"
                    style={{ fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace" }}
                  >
                    {section.script}
                  </pre>
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-white/40">✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0B141A" }}>
      {/* Header / Hero */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,211,102,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative">
          {/* Badge */}
          <div className="animate-fade-in-up flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] text-sm font-medium">
              <MessageCircle size={14} />
              WhatsApp COD 实战手册
            </span>
          </div>

          {/* Title */}
          <div className="animate-fade-in-up stagger-1 text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans SC', sans-serif", fontWeight: 800 }}
            >
              东欧 COD 电子烟
              <br />
              <span style={{ color: "#25D366" }}>WhatsApp 完整成交步骤</span>
            </h1>
            <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              降低被骗感 → 建立真实感 → 制造热销感 → 推动立即下单 → 降低拒收 → 做复购
            </p>
          </div>

          {/* Core principles */}
          <div className="animate-fade-in-up stagger-2 grid sm:grid-cols-3 gap-4 mt-12">
            {[
              {
                icon: <Shield size={20} />,
                title: "核心1：降低风险",
                desc: "不断强调 COD / Pay when received",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20",
              },
              {
                icon: <TrendingUp size={20} />,
                title: "核心2：建立信任",
                desc: "回复快、像真人、强调热销",
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
              },
              {
                icon: <Zap size={20} />,
                title: "核心3：推动下单",
                desc: "制造库存感和时效感",
                color: "text-orange-400",
                bg: "bg-orange-500/10 border-orange-500/20",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`animate-fade-in-up stagger-${i + 3} rounded-2xl p-5 border ${item.bg} flex items-start gap-4`}
              >
                <div className={`mt-0.5 ${item.color}`}>{item.icon}</div>
                <div>
                  <h3 className={`font-700 text-sm ${item.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-5">
        {sections.map((section, index) => (
          <StepCard key={index} section={section} index={index} />
        ))}
      </div>

      {/* Formula footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="animate-fade-in-up rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #005C4B 0%, #128C7E 50%, #25D366 100%)",
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
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

          <div className="grid sm:grid-cols-2 gap-6 relative">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-700 text-white/90 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ❌ 错误方式
              </h3>
              <div className="space-y-2.5 text-white/70 text-sm">
                <p>一直介绍产品参数</p>
                <p>长篇介绍品牌故事</p>
                <p>只发价格</p>
                <p>等用户主动下单</p>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-700 text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ✅ 正确方式
              </h3>
              <div className="space-y-2.5 text-white text-sm">
                <p>强调 COD 安全感</p>
                <p>建立真实商家感</p>
                <p>制造热销与库存压力</p>
                <p>主动推动立即成交</p>
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
