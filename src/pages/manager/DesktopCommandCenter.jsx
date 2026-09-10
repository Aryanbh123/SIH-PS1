/**
 * KoylaSetu — Desktop Operations Command Center
 * Coal India / Ministry of Coal — GSAP-Animated Web Portal Companion
 * 
 * Production-grade desktop dashboard with:
 * - Real-time alert banner with radar pulse animations
 * - Staggered KPI tile entrance (power2.out, stagger: 0.06)
 * - Interactive SVG compliance gauge with animated tween (0% → 94%)
 * - GSAP timeline-driven slide-over telemetry drawer
 * - Live inspection feed with micro-animations
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Shield, AlertTriangle, Activity, Users, ClipboardCheck, Clock,
  Search, Globe, Bell, ChevronRight, MapPin, Eye, Send, CheckCircle,
  XCircle, ArrowUpRight, TrendingUp, TrendingDown, Radio, Cpu,
  Thermometer, Wind, Gauge, Zap, Construction, HardHat, X,
  BarChart3, FileText, Layers, Wrench, Map as MapIcon,
  ChevronDown, MoreHorizontal, ExternalLink, RefreshCw
} from 'lucide-react';

// Import mock data from existing project
import {
  mockMineDetails, mockExecutiveKPIs, mockAttentionItems,
  mockAiGovernanceInsights, mockInspections, mockCorrectiveActions,
  mockRiskCategories, mockWorkforceData, mockGisMineZones
} from '../../data/mockManagerData';

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════ */

const TOKENS = {
  coalBlue: '#003366',
  coalBlueDark: '#00264D',
  coalBlueLight: '#1A4D80',
  coalBlueSurface: '#0A3D6B',
  industrialGold: '#D97706',
  industrialGoldLight: '#F59E0B',
  industrialGoldSurface: '#FEF3C7',
  background: '#F8FAFC',
  cardSurface: '#FFFFFF',
  elevatedSurface: '#F1F5F9',
  borderCrisp: '#E2E8F0',
  criticalRed: '#DC2626',
  criticalRedBg: '#FEF2F2',
  warningAmber: '#D97706',
  warningAmberBg: '#FFFBEB',
  verifiedGreen: '#059669',
  verifiedGreenBg: '#ECFDF5',
  infoBlue: '#2563EB',
  infoBlueBg: '#EFF6FF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  mutedSlate: '#64748B',
};

/* ═══════════════════════════════════════════════════════════════
   SVG COMPLIANCE GAUGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function ComplianceGauge({ percentage, label, color, size = 140 }) {
  const arcRef = useRef(null);
  const textRef = useRef(null);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius * 0.75; // 270-degree arc
  const center = size / 2;

  useEffect(() => {
    if (!arcRef.current || !textRef.current) return;

    const targetOffset = circumference - (percentage / 100) * circumference;

    // Animate the SVG arc
    gsap.fromTo(arcRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: targetOffset,
        duration: 1.8,
        ease: 'power2.out',
        delay: 0.4
      }
    );

    // Animate the counter text
    const obj = { val: 0 };
    gsap.to(obj, {
      val: percentage,
      duration: 1.8,
      ease: 'power2.out',
      delay: 0.4,
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(obj.val)}%`;
        }
      }
    });
  }, [percentage, circumference]);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-[135deg]">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={TOKENS.borderCrisp}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
        />
        {/* Active arc */}
        <circle
          ref={arcRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span ref={textRef} className="text-2xl font-black" style={{ color: TOKENS.textPrimary }}>0%</span>
        <span className="text-xs font-medium" style={{ color: TOKENS.textTertiary }}>{label}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RADAR PULSE COMPONENT (for alert badges)
   ═══════════════════════════════════════════════════════════════ */

function RadarPulse({ color = TOKENS.criticalRed, size = 10 }) {
  const pulseRef = useRef(null);

  useEffect(() => {
    if (!pulseRef.current) return;
    gsap.to(pulseRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: 'power1.out'
    });
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size * 2, height: size * 2 }}>
      <span
        ref={pulseRef}
        className="absolute rounded-full"
        style={{ width: size, height: size, backgroundColor: color, opacity: 0.6 }}
      />
      <span
        className="relative rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TELEMETRY DRAWER (GSAP Timeline-driven slide-over)
   ═══════════════════════════════════════════════════════════════ */

function TelemetryDrawer({ isOpen, onClose, inspection }) {
  const overlayRef = useRef(null);
  const drawerRef = useRef(null);
  const contentRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    // Build the GSAP timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(drawerRef.current, {
      x: 0,
      duration: 0.45,
      ease: 'power3.out'
    }, '-=0.2')
    .fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.06,
        ease: 'power2.out'
      },
      '-=0.15'
    );

    tlRef.current = tl;

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      if (overlayRef.current) overlayRef.current.style.pointerEvents = 'auto';
      tlRef.current.play();
    } else {
      tlRef.current.reverse().then(() => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none';
      });
    }
  }, [isOpen]);

  // Find related corrective actions & sensor data from the AI insights
  const relatedInsight = mockAiGovernanceInsights.find(
    ai => ai.relatedInspectionId === inspection?.id
  );
  const relatedAction = mockCorrectiveActions.find(
    a => a.inspectionId === inspection?.id
  );

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, pointerEvents: 'none' }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-50 h-full overflow-y-auto shadow-2xl"
        style={{
          width: '540px',
          transform: 'translateX(100%)',
          backgroundColor: TOKENS.background
        }}
      >
        {/* Drawer Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: TOKENS.coalBlue }}
        >
          <div className="flex items-center gap-3">
            <Activity className="text-white" size={20} />
            <div>
              <h3 className="text-white font-bold text-sm">Telemetry & Sensor Evidence</h3>
              <p className="text-white/60 text-xs">{inspection?.id || 'N/A'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            <X className="text-white" size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div ref={contentRef} className="p-6 space-y-5">
          {/* Inspection Summary */}
          <div
            className="rounded-xl p-4 border"
            style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
          >
            <h4 className="font-bold text-sm mb-2" style={{ color: TOKENS.textPrimary }}>
              {inspection?.title || 'Inspection Details'}
            </h4>
            <div className="flex items-center gap-2 text-xs" style={{ color: TOKENS.textSecondary }}>
              <MapPin size={12} />
              <span>{inspection?.location || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: TOKENS.textSecondary }}>
              <HardHat size={12} />
              <span>{inspection?.inspector || 'N/A'}</span>
            </div>
          </div>

          {/* Sensor Readings Grid */}
          {relatedInsight?.sensorReadings && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: TOKENS.mutedSlate }}>
                Live Sensor Readings
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(relatedInsight.sensorReadings).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-xl p-3 border"
                    style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge size={14} style={{ color: TOKENS.coalBlue }} />
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: TOKENS.textTertiary }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <span className="text-lg font-black" style={{ color: TOKENS.textPrimary }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Finding */}
          {relatedInsight && (
            <div
              className="rounded-xl p-4 border-l-4"
              style={{
                backgroundColor: relatedInsight.riskLevel === 'High' ? TOKENS.criticalRedBg : TOKENS.warningAmberBg,
                borderColor: relatedInsight.riskLevel === 'High' ? TOKENS.criticalRed : TOKENS.warningAmber
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} style={{ color: TOKENS.coalBlue }} />
                <span className="text-xs font-bold" style={{ color: TOKENS.coalBlue }}>
                  AI Finding — {relatedInsight.confidenceScore}% Confidence
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: TOKENS.textSecondary }}>
                {relatedInsight.finding}
              </p>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: TOKENS.textTertiary }}>
                {relatedInsight.reason}
              </p>
            </div>
          )}

          {/* Corrective Action */}
          {relatedAction && (
            <div
              className="rounded-xl p-4 border"
              style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: TOKENS.textPrimary }}>
                  Corrective Action: {relatedAction.id}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: relatedAction.status === 'Overdue' ? TOKENS.criticalRedBg :
                      relatedAction.status === 'Awaiting Verification' ? TOKENS.warningAmberBg : TOKENS.infoBlueBg,
                    color: relatedAction.status === 'Overdue' ? TOKENS.criticalRed :
                      relatedAction.status === 'Awaiting Verification' ? TOKENS.warningAmber : TOKENS.infoBlue
                  }}
                >
                  {relatedAction.status}
                </span>
              </div>
              <p className="text-xs" style={{ color: TOKENS.textSecondary }}>
                {relatedAction.title}
              </p>
              <p className="text-xs mt-2" style={{ color: TOKENS.textTertiary }}>
                Assigned to: {relatedAction.assignedTo} ({relatedAction.assignedRole})
              </p>
              <p className="text-xs" style={{ color: TOKENS.textTertiary }}>
                Deadline: {relatedAction.deadline}
              </p>

              {/* Evidence block */}
              {relatedAction.evidence && (
                <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: TOKENS.elevatedSurface }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={12} style={{ color: TOKENS.verifiedGreen }} />
                    <span className="text-xs font-semibold" style={{ color: TOKENS.verifiedGreen }}>
                      Evidence Submitted
                    </span>
                  </div>
                  {relatedAction.evidence.documents?.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <span className="text-xs" style={{ color: TOKENS.textSecondary }}>📎 {doc.name}</span>
                      <span className="text-[10px]" style={{ color: TOKENS.textTertiary }}>({doc.size})</span>
                    </div>
                  ))}
                  <p className="text-xs mt-2 italic" style={{ color: TOKENS.textTertiary }}>
                    {relatedAction.evidence.fieldNotes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Inspection Findings */}
          {inspection?.findings?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: TOKENS.mutedSlate }}>
                Inspection Findings
              </h4>
              <div className="space-y-2">
                {inspection.findings.map((finding, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
                  >
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-0.5"
                      style={{ backgroundColor: TOKENS.coalBlue + '15', color: TOKENS.coalBlue }}>
                      {i + 1}
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: TOKENS.textSecondary }}>
                      {finding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN DESKTOP COMMAND CENTER
   ═══════════════════════════════════════════════════════════════ */

export default function DesktopCommandCenter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [alertIndex, setAlertIndex] = useState(0);

  // GSAP refs
  const headerRef = useRef(null);
  const kpiGridRef = useRef(null);
  const alertBannerRef = useRef(null);
  const insightCardsRef = useRef(null);
  const inspectionListRef = useRef(null);
  const gaugeContainerRef = useRef(null);

  // ── Staggered entrance animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out'
      });

      // KPI tiles staggered entrance
      if (kpiGridRef.current) {
        gsap.from(kpiGridRef.current.children, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.2
        });
      }

      // AI insight cards stagger
      if (insightCardsRef.current) {
        gsap.from(insightCardsRef.current.children, {
          opacity: 0,
          x: 40,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.5
        });
      }

      // Inspection list stagger
      if (inspectionListRef.current) {
        gsap.from(inspectionListRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.7
        });
      }

      // Gauge container entrance
      if (gaugeContainerRef.current) {
        gsap.from(gaugeContainerRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: 'back.out(1.4)',
          delay: 0.4
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // ── Alert banner rotation animation ──
  useEffect(() => {
    if (!alertBannerRef.current) return;

    const pulseEl = alertBannerRef.current.querySelector('.alert-glow');
    if (pulseEl) {
      gsap.to(pulseEl, {
        opacity: 0.6,
        scale: 1.05,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Rotate alerts every 5s
    const interval = setInterval(() => {
      setAlertIndex(prev => (prev + 1) % mockAttentionItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ── Alert index transition animation ──
  useEffect(() => {
    if (!alertBannerRef.current) return;
    const textEl = alertBannerRef.current.querySelector('.alert-text');
    if (textEl) {
      gsap.fromTo(textEl,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [alertIndex]);

  const handleInspectionClick = useCallback((inspection) => {
    setSelectedInspection(inspection);
    setDrawerOpen(true);
  }, []);

  const currentAlert = mockAttentionItems[alertIndex];

  const filterTabs = [
    { id: 'all', icon: Layers, label: 'All' },
    { id: 'hazards', icon: AlertTriangle, label: 'Hazards' },
    { id: 'inspections', icon: ClipboardCheck, label: 'Inspections' },
    { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
    { id: 'gis', icon: MapIcon, label: 'GIS' },
  ];

  const severityColor = (sev) => {
    if (sev === 'High' || sev === 'Critical') return TOKENS.criticalRed;
    if (sev === 'Medium' || sev === 'Warning') return TOKENS.warningAmber;
    return TOKENS.verifiedGreen;
  };

  const statusColor = (status) => {
    if (status === 'Overdue') return TOKENS.criticalRed;
    if (status === 'Completed') return TOKENS.verifiedGreen;
    if (status === 'In Progress') return TOKENS.infoBlue;
    return TOKENS.mutedSlate;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: TOKENS.background }}>

      {/* ─── REAL-TIME ALERT BANNER ─── */}
      <div
        ref={alertBannerRef}
        className="relative overflow-hidden border-b"
        style={{
          backgroundColor: currentAlert.severity === 'Critical' ? '#450a0a' : '#451a03',
          borderColor: currentAlert.severity === 'Critical' ? TOKENS.criticalRed + '30' : TOKENS.warningAmber + '30'
        }}
      >
        <div className="alert-glow absolute inset-0" style={{
          background: `radial-gradient(ellipse at 20% 50%, ${
            currentAlert.severity === 'Critical' ? TOKENS.criticalRed : TOKENS.warningAmber
          }15 0%, transparent 70%)`
        }} />

        <div className="relative flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <RadarPulse color={currentAlert.severity === 'Critical' ? TOKENS.criticalRed : TOKENS.warningAmber} size={8} />
            <span
              className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded"
              style={{
                backgroundColor: currentAlert.severity === 'Critical' ? TOKENS.criticalRed : TOKENS.warningAmber,
                color: '#fff'
              }}
            >
              {currentAlert.priority}
            </span>
            <span className="alert-text text-sm font-medium text-white/90 max-w-2xl truncate">
              {currentAlert.what}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">{currentAlert.when}</span>
            <div className="flex gap-1">
              {mockAttentionItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setAlertIndex(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === alertIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                    transform: i === alertIndex ? 'scale(1.3)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── TOP COMMAND BAR ─── */}
      <header
        ref={headerRef}
        className="border-b shadow-sm"
        style={{ backgroundColor: TOKENS.coalBlue }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Branding */}
          <div className="flex items-center gap-4">
            <div
              className="px-2.5 py-1 rounded text-[11px] font-black tracking-widest"
              style={{ backgroundColor: TOKENS.industrialGold, color: '#fff' }}
            >
              WCL
            </div>
            <div>
              <h1 className="text-white font-bold text-base tracking-tight">
                {mockMineDetails.name} · Pit 4
              </h1>
              <p className="text-white/50 text-[11px]">
                Operations Command Center — {mockMineDetails.subsidiary}
              </p>
            </div>
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-lg hover:bg-white/10 transition-colors" style={{ minWidth: 44, minHeight: 44 }}>
              <Search className="text-white/70" size={18} />
            </button>
            <button className="p-2.5 rounded-lg hover:bg-white/10 transition-colors" style={{ minWidth: 44, minHeight: 44 }}>
              <Globe className="text-white/70" size={18} />
            </button>
            <button className="relative p-2.5 rounded-lg hover:bg-white/10 transition-colors" style={{ minWidth: 44, minHeight: 44 }}>
              <Bell className="text-white/70" size={18} />
              <span
                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: TOKENS.criticalRed }}
              >
                7
              </span>
            </button>
            <div className="ml-2 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white border-2"
                style={{ backgroundColor: TOKENS.coalBlueLight, borderColor: 'rgba(255,255,255,0.3)' }}
              >
                AS
              </div>
              <div className="hidden lg:block">
                <p className="text-white text-xs font-semibold">{mockMineDetails.manager.name}</p>
                <p className="text-white/40 text-[10px]">Mine Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT GRID ─── */}
      <main className="p-6 space-y-6">

        {/* ── EXECUTIVE KPI TILES ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} style={{ color: TOKENS.coalBlue }} />
              <h2 className="text-sm font-bold tracking-wide" style={{ color: TOKENS.textPrimary }}>
                Executive Summary
              </h2>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: TOKENS.coalBlue }}>
              View Details <ChevronRight size={14} />
            </button>
          </div>

          <div ref={kpiGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Compliance Health */}
            <KpiTile
              icon={Shield} label="Compliance" value={`${mockExecutiveKPIs.complianceScore}%`}
              subtitle={mockExecutiveKPIs.complianceStatus}
              tint={TOKENS.warningAmber} tintBg={TOKENS.warningAmberBg}
            />
            {/* High Risks */}
            <KpiTile
              icon={AlertTriangle} label="High Risks" value={mockExecutiveKPIs.highRiskIssues}
              subtitle="Active"
              tint={TOKENS.criticalRed} tintBg={TOKENS.criticalRedBg}
            />
            {/* Open Actions */}
            <KpiTile
              icon={ClipboardCheck} label="Open Actions" value={mockExecutiveKPIs.openCorrectiveActions}
              subtitle={`${mockExecutiveKPIs.overdueActions} Overdue`}
              tint={TOKENS.industrialGold} tintBg={TOKENS.industrialGoldSurface}
            />
            {/* Overdue */}
            <KpiTile
              icon={Clock} label="Overdue" value={mockExecutiveKPIs.overdueActions}
              subtitle="Escalated"
              tint={TOKENS.criticalRed} tintBg={TOKENS.criticalRedBg}
            />
            {/* Workforce */}
            <KpiTile
              icon={Users} label="Workforce" value={`${mockExecutiveKPIs.workforcePresentPct}%`}
              subtitle={`${mockExecutiveKPIs.presentWorkforce}/${mockExecutiveKPIs.totalWorkforce}`}
              tint={TOKENS.verifiedGreen} tintBg={TOKENS.verifiedGreenBg}
            />
            {/* Inspections */}
            <KpiTile
              icon={ClipboardCheck} label="Inspections" value={mockExecutiveKPIs.pendingInspections}
              subtitle="Pending"
              tint={TOKENS.infoBlue} tintBg={TOKENS.infoBlueBg}
            />
          </div>
        </section>

        {/* ── MAIN TWO-COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT COLUMN (2/3): AI Insights + Inspections ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* AI GOVERNANCE ATTENTION STRIP */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu size={16} style={{ color: TOKENS.coalBlue }} />
                  <h2 className="text-sm font-bold tracking-wide" style={{ color: TOKENS.textPrimary }}>
                    AI Governance Alerts
                  </h2>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: TOKENS.criticalRedBg, color: TOKENS.criticalRed }}
                  >
                    {mockAiGovernanceInsights.filter(i => i.riskLevel === 'High').length} Critical
                  </span>
                </div>
                <button className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: TOKENS.coalBlue }}>
                  All Insights <ExternalLink size={12} />
                </button>
              </div>

              <div ref={insightCardsRef} className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
                {mockAiGovernanceInsights.map(insight => (
                  <AiInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </section>

            {/* LIVE INSPECTION FEED */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ClipboardCheck size={16} style={{ color: TOKENS.coalBlue }} />
                  <h2 className="text-sm font-bold tracking-wide" style={{ color: TOKENS.textPrimary }}>
                    Inspection Feed
                  </h2>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: TOKENS.criticalRedBg,
                      color: TOKENS.criticalRed
                    }}
                  >
                    {mockInspections.filter(i => i.status === 'Overdue').length} Overdue
                  </span>
                </div>
                {/* Filter pills */}
                <div className="flex items-center gap-1">
                  {filterTabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveFilter(tab.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? TOKENS.coalBlue + '12' : 'transparent',
                          color: isActive ? TOKENS.coalBlue : TOKENS.textTertiary,
                          minHeight: 36
                        }}
                      >
                        <Icon size={14} />
                        <span className="hidden md:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div ref={inspectionListRef} className="space-y-3">
                {mockInspections.map(inspection => (
                  <div
                    key={inspection.id}
                    onClick={() => handleInspectionClick(inspection)}
                    className="group rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: TOKENS.cardSurface,
                      borderColor: inspection.status === 'Overdue' ? TOKENS.criticalRed + '30' : TOKENS.borderCrisp
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Category icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: inspection.severity === 'High' ? TOKENS.criticalRedBg :
                            inspection.severity === 'Medium' ? TOKENS.warningAmberBg : TOKENS.infoBlueBg
                        }}
                      >
                        {inspection.id.includes('44') ? <Wind size={20} style={{ color: severityColor(inspection.severity) }} /> :
                         inspection.id.includes('45') ? <Thermometer size={20} style={{ color: severityColor(inspection.severity) }} /> :
                         inspection.id.includes('46') ? <Layers size={20} style={{ color: severityColor(inspection.severity) }} /> :
                         inspection.id.includes('47') ? <Zap size={20} style={{ color: severityColor(inspection.severity) }} /> :
                         <Construction size={20} style={{ color: severityColor(inspection.severity) }} />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-sm font-bold truncate" style={{ color: TOKENS.textPrimary }}>
                            {inspection.title}
                          </h3>
                          <span
                            className="text-[10px] font-black tracking-wide px-2 py-0.5 rounded flex-shrink-0"
                            style={{
                              backgroundColor: severityColor(inspection.severity) + '15',
                              color: severityColor(inspection.severity)
                            }}
                          >
                            {inspection.severity.toUpperCase()}
                          </span>
                        </div>

                        {/* Metadata row */}
                        <div className="flex items-center gap-3 flex-wrap mt-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: TOKENS.coalBlue + '10', color: TOKENS.coalBlue }}>
                            {inspection.id}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]" style={{ color: TOKENS.textSecondary }}>
                            <MapPin size={10} /> {inspection.location}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]" style={{ color: TOKENS.textSecondary }}>
                            <HardHat size={10} /> {inspection.inspector}
                          </span>
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: statusColor(inspection.status) + '15',
                              color: statusColor(inspection.status)
                            }}
                          >
                            {inspection.status}
                          </span>
                        </div>

                        {/* Findings preview */}
                        {inspection.findings?.length > 0 && (
                          <p className="text-xs mt-2 truncate" style={{ color: TOKENS.textTertiary }}>
                            {inspection.findings[0]}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button className="p-2 rounded-lg hover:bg-green-50 transition-colors" title="Approve" style={{ minWidth: 36, minHeight: 36 }}>
                          <CheckCircle size={16} style={{ color: TOKENS.verifiedGreen }} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-amber-50 transition-colors" title="Escalate" style={{ minWidth: 36, minHeight: 36 }}>
                          <ArrowUpRight size={16} style={{ color: TOKENS.warningAmber }} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Telemetry" style={{ minWidth: 36, minHeight: 36 }}>
                          <Activity size={16} style={{ color: TOKENS.coalBlue }} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── RIGHT COLUMN (1/3): Gauges + Risk Categories + Zones ── */}
          <div className="space-y-6">

            {/* COMPLIANCE GAUGES */}
            <section
              ref={gaugeContainerRef}
              className="rounded-xl border p-5"
              style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: TOKENS.mutedSlate }}>
                Compliance Meters
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative flex items-center justify-center">
                  <ComplianceGauge
                    percentage={mockExecutiveKPIs.complianceScore}
                    label="Compliance"
                    color={TOKENS.warningAmber}
                    size={120}
                  />
                </div>
                <div className="relative flex items-center justify-center">
                  <ComplianceGauge
                    percentage={mockExecutiveKPIs.workforcePresentPct}
                    label="Workforce"
                    color={TOKENS.verifiedGreen}
                    size={120}
                  />
                </div>
                <div className="relative flex items-center justify-center">
                  <ComplianceGauge
                    percentage={mockExecutiveKPIs.productionTargetPct}
                    label="Production"
                    color={TOKENS.coalBlue}
                    size={120}
                  />
                </div>
              </div>
            </section>

            {/* RISK CATEGORIES */}
            <section
              className="rounded-xl border p-5"
              style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: TOKENS.mutedSlate }}>
                  Risk Categories
                </h3>
                <RefreshCw size={14} style={{ color: TOKENS.textTertiary }} className="cursor-pointer hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="space-y-3">
                {mockRiskCategories.map(cat => (
                  <div key={cat.id} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold truncate flex-1 mr-2" style={{ color: TOKENS.textPrimary }}>
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold"
                          style={{ color: severityColor(cat.level) }}
                        >
                          {cat.score}
                        </span>
                        <span className="text-[10px]" style={{
                          color: cat.trend.includes('+') ? TOKENS.criticalRed :
                            cat.trend.includes('-') ? TOKENS.verifiedGreen : TOKENS.textTertiary
                        }}>
                          {cat.trend.includes('+') ? <TrendingUp size={12} className="inline" /> :
                           cat.trend.includes('-') ? <TrendingDown size={12} className="inline" /> : null}
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: TOKENS.elevatedSurface }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.score}%`,
                          backgroundColor: severityColor(cat.level)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ACTIVE MINE ZONES */}
            <section
              className="rounded-xl border p-5"
              style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: TOKENS.mutedSlate }}>
                Active Mine Zones
              </h3>
              <div className="space-y-2">
                {mockGisMineZones.slice(0, 4).map(zone => (
                  <div
                    key={zone.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all hover:shadow-sm"
                    style={{
                      borderColor: TOKENS.borderCrisp,
                      backgroundColor: zone.riskLevel === 'High' ? TOKENS.criticalRedBg + '80' : 'transparent'
                    }}
                  >
                    <RadarPulse
                      color={zone.riskLevel === 'High' ? TOKENS.criticalRed :
                        zone.riskLevel === 'Medium' ? TOKENS.warningAmber : TOKENS.verifiedGreen}
                      size={6}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: TOKENS.textPrimary }}>
                        {zone.name}
                      </p>
                      <p className="text-[10px] truncate" style={{ color: TOKENS.textTertiary }}>
                        {zone.activeWorkers} workers · {zone.type}
                      </p>
                    </div>
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: severityColor(zone.riskLevel) + '15',
                        color: severityColor(zone.riskLevel)
                      }}
                    >
                      {zone.riskScore}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* WORKFORCE SUMMARY */}
            <section
              className="rounded-xl border p-5"
              style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: TOKENS.mutedSlate }}>
                Shift Coverage
              </h3>
              <div className="space-y-3">
                {mockWorkforceData.shifts.map(shift => (
                  <div key={shift.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {shift.active && <RadarPulse color={TOKENS.verifiedGreen} size={5} />}
                      {!shift.active && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: TOKENS.textTertiary + '30' }} />}
                      <div>
                        <p className="text-xs font-semibold" style={{ color: TOKENS.textPrimary }}>
                          {shift.name}
                        </p>
                        <p className="text-[10px]" style={{ color: TOKENS.textTertiary }}>
                          {shift.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold" style={{ color: TOKENS.verifiedGreen }}>
                      {shift.coverage}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ─── SOS EMERGENCY BUTTON (Fixed Bottom-Right) ─── */}
      <SosButton />

      {/* ─── TELEMETRY DRAWER ─── */}
      <TelemetryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        inspection={selectedInspection}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function KpiTile({ icon: Icon, label, value, subtitle, tint, tintBg }) {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col justify-between h-[110px] cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ backgroundColor: TOKENS.cardSurface, borderColor: TOKENS.borderCrisp }}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: tintBg }}>
          <Icon size={18} style={{ color: tint }} />
        </div>
        {subtitle && (
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: tintBg, color: tint }}>
            {subtitle}
          </span>
        )}
      </div>
      <div>
        <p className="text-xl font-black leading-tight" style={{ color: TOKENS.textPrimary }}>{value}</p>
        <p className="text-[11px] font-medium" style={{ color: TOKENS.textSecondary }}>{label}</p>
      </div>
    </div>
  );
}

function AiInsightCard({ insight }) {
  const cardRef = useRef(null);

  // Pulsing hazard glow on critical cards
  useEffect(() => {
    if (insight.riskLevel !== 'High' || !cardRef.current) return;
    const glowEl = cardRef.current.querySelector('.insight-glow');
    if (glowEl) {
      gsap.to(glowEl, {
        opacity: 0.8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, [insight.riskLevel]);

  const tint = insight.riskLevel === 'High' ? TOKENS.criticalRed : TOKENS.warningAmber;
  const tintBg = insight.riskLevel === 'High' ? TOKENS.criticalRedBg : TOKENS.warningAmberBg;

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[300px] rounded-xl border p-4 space-y-3 cursor-pointer transition-all duration-200 hover:shadow-lg"
      style={{ backgroundColor: tintBg, borderColor: tint + '30' }}
    >
      {/* Pulsing glow overlay */}
      <div
        className="insight-glow absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${tint}08 0%, transparent 60%)`,
          opacity: 0.4
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RadarPulse color={tint} size={6} />
          <span
            className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded"
            style={{ backgroundColor: tint, color: '#fff' }}
          >
            {insight.riskLevel.toUpperCase()}
          </span>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: TOKENS.coalBlue + '10', color: TOKENS.coalBlue }}>
          AI {insight.confidenceScore}%
        </span>
      </div>

      {/* Title */}
      <h4 className="relative text-sm font-bold leading-snug" style={{ color: TOKENS.textPrimary }}>
        {insight.finding.length > 60 ? insight.finding.substring(0, 60) + '...' : insight.finding}
      </h4>

      {/* Location chip */}
      <div className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
        style={{ backgroundColor: TOKENS.elevatedSurface, border: `1px solid ${TOKENS.borderCrisp}` }}>
        <MapPin size={12} style={{ color: TOKENS.mutedSlate }} />
        <span className="text-[11px] font-medium truncate" style={{ color: TOKENS.textSecondary }}>
          {insight.area}
        </span>
      </div>

      {/* Action buttons */}
      <div className="relative flex gap-2 pt-1">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: TOKENS.coalBlue, minHeight: 40 }}
        >
          <Eye size={14} /> Review
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all hover:brightness-95"
          style={{ borderColor: tint, color: tint, minHeight: 40 }}
        >
          <Send size={14} /> Dispatch
        </button>
      </div>
    </div>
  );
}

function SosButton() {
  const btnRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    if (!pulseRef.current) return;
    gsap.to(pulseRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: 'power1.out'
    });
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-30">
      <div className="relative">
        <div
          ref={pulseRef}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: TOKENS.criticalRed, opacity: 0.3 }}
        />
        <button
          ref={btnRef}
          className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center text-white font-black shadow-xl transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: TOKENS.criticalRed }}
          title="Emergency Inspection"
        >
          <AlertTriangle size={22} />
          <span className="text-[8px] tracking-widest mt-0.5">SOS</span>
        </button>
      </div>
    </div>
  );
}
