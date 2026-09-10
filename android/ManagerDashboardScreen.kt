/**
 * KoylaSetu — Manager Dashboard & Inspection Center
 * Coal India Limited / Ministry of Coal
 * AI-Based Smart Governance and Compliance Monitoring Platform
 *
 * Production-Ready Jetpack Compose (Material 3) Implementation
 * Target: Android 14+ / API 34 / Ruggedized Mining Tablets & Handsets
 *
 * Architecture: Single-activity, single-screen composable with hoisted state & event lambdas.
 * All touch targets >= 48.dp per Material 3 accessibility guidelines.
 */

package com.koylasetu.manager.ui.dashboard

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

// ═══════════════════════════════════════════════════════════════════
// SECTION 1: DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════

object CoalIndiaTokens {
    // Primary Palette
    val CoalBlue = Color(0xFF003366)
    val CoalBlueDark = Color(0xFF00264D)
    val CoalBlueLight = Color(0xFF1A4D80)
    val CoalBlueSurface = Color(0xFF0A3D6B)

    // Industrial Accents
    val IndustrialGold = Color(0xFFD97706)
    val IndustrialGoldLight = Color(0xFFF59E0B)
    val IndustrialGoldSurface = Color(0xFFFEF3C7)

    // Background & Surface
    val BackgroundSurface = Color(0xFFF8FAFC)
    val CardSurface = Color(0xFFFFFFFF)
    val ElevatedSurface = Color(0xFFF1F5F9)

    // Borders
    val BorderCrisp = Color(0xFFE2E8F0)
    val BorderSubtle = Color(0xFFF1F5F9)

    // Severity
    val CriticalRed = Color(0xFFDC2626)
    val CriticalRedBg = Color(0xFFFEF2F2)
    val CriticalRedBorder = Color(0xFFFECACA)

    val WarningAmber = Color(0xFFD97706)
    val WarningAmberBg = Color(0xFFFFFBEB)
    val WarningAmberBorder = Color(0xFFFDE68A)

    val VerifiedGreen = Color(0xFF059669)
    val VerifiedGreenBg = Color(0xFFECFDF5)
    val VerifiedGreenBorder = Color(0xFFA7F3D0)

    val InfoBlue = Color(0xFF2563EB)
    val InfoBlueBg = Color(0xFFEFF6FF)
    val InfoBlueBorder = Color(0xFFBFDBFE)

    val MutedSlate = Color(0xFF64748B)
    val TextPrimary = Color(0xFF0F172A)
    val TextSecondary = Color(0xFF475569)
    val TextTertiary = Color(0xFF94A3B8)

    // Elevation
    val ShadowColor = Color(0x1A000000)
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 2: DOMAIN MODELS & ENUMS
// ═══════════════════════════════════════════════════════════════════

enum class Severity {
    CRITICAL, WARNING, NORMAL;

    val color: Color
        get() = when (this) {
            CRITICAL -> CoalIndiaTokens.CriticalRed
            WARNING -> CoalIndiaTokens.WarningAmber
            NORMAL -> CoalIndiaTokens.VerifiedGreen
        }

    val backgroundColor: Color
        get() = when (this) {
            CRITICAL -> CoalIndiaTokens.CriticalRedBg
            WARNING -> CoalIndiaTokens.WarningAmberBg
            NORMAL -> CoalIndiaTokens.VerifiedGreenBg
        }

    val borderColor: Color
        get() = when (this) {
            CRITICAL -> CoalIndiaTokens.CriticalRedBorder
            WARNING -> CoalIndiaTokens.WarningAmberBorder
            NORMAL -> CoalIndiaTokens.VerifiedGreenBorder
        }

    val label: String
        get() = when (this) {
            CRITICAL -> "CRITICAL"
            WARNING -> "WARNING"
            NORMAL -> "NORMAL"
        }
}

enum class InspectionStatus {
    COMPLETED, IN_PROGRESS, SCHEDULED, OVERDUE;

    val label: String
        get() = when (this) {
            COMPLETED -> "Completed"
            IN_PROGRESS -> "In Progress"
            SCHEDULED -> "Scheduled"
            OVERDUE -> "Overdue"
        }

    val color: Color
        get() = when (this) {
            COMPLETED -> CoalIndiaTokens.VerifiedGreen
            IN_PROGRESS -> CoalIndiaTokens.InfoBlue
            SCHEDULED -> CoalIndiaTokens.MutedSlate
            OVERDUE -> CoalIndiaTokens.CriticalRed
        }
}

enum class FilterCategory(val icon: ImageVector, val label: String) {
    ALL(Icons.Filled.GridView, "All"),
    HAZARDS(Icons.Filled.Warning, "Hazards"),
    INSPECTIONS(Icons.Outlined.Assignment, "Inspections"),
    MAINTENANCE(Icons.Filled.Build, "Maintenance"),
    GIS(Icons.Filled.PinDrop, "GIS")
}

data class KpiMetric(
    val id: String,
    val label: String,
    val value: String,
    val icon: ImageVector,
    val severity: Severity,
    val tintColor: Color,
    val tintBackground: Color,
    val subtitle: String = ""
)

data class AiInsight(
    val id: String,
    val title: String,
    val category: String,
    val location: String,
    val severity: Severity,
    val confidenceScore: Int,
    val description: String,
    val actionType: String, // "review", "dispatch", "escalate"
    val sensorTag: String = "",
    val isPulsing: Boolean = false
)

data class InspectionItem(
    val id: String,
    val code: String,
    val title: String,
    val location: String,
    val inspector: String,
    val inspectorId: String,
    val date: String,
    val status: InspectionStatus,
    val severity: Severity,
    val categoryIcon: ImageVector,
    val categoryLabel: String,
    val observationsCount: Int
)

data class ManagerDashboardUiState(
    val subsidiaryTag: String = "WCL",
    val mineName: String = "Kamptee Colliery",
    val pitLabel: String = "Pit 4",
    val managerName: String = "Amit Sharma",
    val managerInitials: String = "AS",
    val isOnline: Boolean = true,
    val notificationCount: Int = 7,
    val kpiMetrics: List<KpiMetric> = emptyList(),
    val aiInsights: List<AiInsight> = emptyList(),
    val inspections: List<InspectionItem> = emptyList(),
    val activeFilter: FilterCategory = FilterCategory.ALL,
    val isLoading: Boolean = false,
    val isEmergencyActive: Boolean = false
)

// ═══════════════════════════════════════════════════════════════════
// SECTION 3: SAMPLE / PREVIEW DATA FACTORY
// ═══════════════════════════════════════════════════════════════════

object ManagerDashboardData {
    fun createSampleState(): ManagerDashboardUiState = ManagerDashboardUiState(
        subsidiaryTag = "WCL",
        mineName = "Kamptee Colliery",
        pitLabel = "Pit 4",
        managerName = "Amit Sharma",
        managerInitials = "AS",
        isOnline = true,
        notificationCount = 7,
        kpiMetrics = listOf(
            KpiMetric(
                id = "kpi-compliance",
                label = "Compliance",
                value = "86%",
                icon = Icons.Filled.VerifiedUser,
                severity = Severity.WARNING,
                tintColor = CoalIndiaTokens.WarningAmber,
                tintBackground = CoalIndiaTokens.WarningAmberBg,
                subtitle = "At Risk"
            ),
            KpiMetric(
                id = "kpi-high-risk",
                label = "High Risks",
                value = "8",
                icon = Icons.Filled.Warning,
                severity = Severity.CRITICAL,
                tintColor = CoalIndiaTokens.CriticalRed,
                tintBackground = CoalIndiaTokens.CriticalRedBg,
                subtitle = "Active"
            ),
            KpiMetric(
                id = "kpi-open-actions",
                label = "Open Actions",
                value = "12",
                icon = Icons.Filled.AssignmentLate,
                severity = Severity.WARNING,
                tintColor = CoalIndiaTokens.IndustrialGold,
                tintBackground = CoalIndiaTokens.IndustrialGoldSurface,
                subtitle = "3 Overdue"
            ),
            KpiMetric(
                id = "kpi-overdue",
                label = "Overdue",
                value = "3",
                icon = Icons.Filled.Schedule,
                severity = Severity.CRITICAL,
                tintColor = CoalIndiaTokens.CriticalRed,
                tintBackground = CoalIndiaTokens.CriticalRedBg,
                subtitle = "Escalated"
            ),
            KpiMetric(
                id = "kpi-workforce",
                label = "Workforce",
                value = "96%",
                icon = Icons.Filled.Groups,
                severity = Severity.NORMAL,
                tintColor = CoalIndiaTokens.VerifiedGreen,
                tintBackground = CoalIndiaTokens.VerifiedGreenBg,
                subtitle = "806/840"
            ),
            KpiMetric(
                id = "kpi-inspections",
                label = "Inspections",
                value = "5",
                icon = Icons.Filled.Checklist,
                severity = Severity.WARNING,
                tintColor = CoalIndiaTokens.InfoBlue,
                tintBackground = CoalIndiaTokens.InfoBlueBg,
                subtitle = "Pending"
            )
        ),
        aiInsights = listOf(
            AiInsight(
                id = "AI-VENT-01",
                title = "Ventilator Fault Detected",
                category = "Ventilation & Gas Safety",
                location = "Pit 4 · Tailgate 4B",
                severity = Severity.CRITICAL,
                confidenceScore = 94,
                description = "Airflow 8.2 m³/s (req ≥ 12.0). CH₄ at 0.82%.",
                actionType = "review",
                sensorTag = "FLW-04 / SN-994",
                isPulsing = true
            ),
            AiInsight(
                id = "AI-HAUL-02",
                title = "Dumper Speed Exceedance",
                category = "Heavy Machinery Safety",
                location = "Haul Road B · Ramp",
                severity = Severity.WARNING,
                confidenceScore = 89,
                description = "4 dumpers at 28 km/h on 1:16 incline (max 20).",
                actionType = "dispatch",
                sensorTag = "GPS Telematics",
                isPulsing = false
            ),
            AiInsight(
                id = "AI-CONT-03",
                title = "DGMS Permit Expiry Alert",
                category = "Contractor Compliance",
                location = "South Quarry · Magazine",
                severity = Severity.CRITICAL,
                confidenceScore = 91,
                description = "Explosives magazine license expires in 5 days.",
                actionType = "review",
                sensorTag = "PESO Registry",
                isPulsing = true
            ),
            AiInsight(
                id = "AI-SLOPE-04",
                title = "InSAR Slope Displacement",
                category = "Ground Stability",
                location = "OB Dump 2 · East",
                severity = Severity.WARNING,
                confidenceScore = 87,
                description = "4.8mm displacement / 72h. Pore pressure 142 kPa.",
                actionType = "dispatch",
                sensorTag = "PZ-04 / SAR",
                isPulsing = false
            )
        ),
        inspections = listOf(
            InspectionItem(
                id = "INS-2024-WCL-44",
                code = "WCL-44",
                title = "Underground Ventilation & Gas Safety Audit",
                location = "Pit 4, Seam III",
                inspector = "R. K. Mahapatra",
                inspectorId = "DGMS-SR",
                date = "08 Sep",
                status = InspectionStatus.COMPLETED,
                severity = Severity.CRITICAL,
                categoryIcon = Icons.Filled.Air,
                categoryLabel = "Fans",
                observationsCount = 3
            ),
            InspectionItem(
                id = "INS-2024-WCL-45",
                code = "WCL-45",
                title = "CHP Fire Suppression & Pyrometer Audit",
                location = "CHP-1 Transfer",
                inspector = "Sunil Verma",
                inspectorId = "SO-02",
                date = "09 Sep",
                status = InspectionStatus.IN_PROGRESS,
                severity = Severity.WARNING,
                categoryIcon = Icons.Filled.LocalFireDepartment,
                categoryLabel = "Fire",
                observationsCount = 1
            ),
            InspectionItem(
                id = "INS-2024-WCL-46",
                code = "WCL-46",
                title = "Haul Road Berm Stability Survey",
                location = "Haul Road B",
                inspector = "Amit Desai",
                inspectorId = "FI-03",
                date = "10 Sep",
                status = InspectionStatus.SCHEDULED,
                severity = Severity.NORMAL,
                categoryIcon = Icons.Filled.Terrain,
                categoryLabel = "Berm",
                observationsCount = 0
            ),
            InspectionItem(
                id = "INS-2024-WCL-47",
                code = "WCL-47",
                title = "33kV Transformer Relay Check",
                location = "Substation",
                inspector = "V. Rao",
                inspectorId = "EE-01",
                date = "05 Sep",
                status = InspectionStatus.COMPLETED,
                severity = Severity.NORMAL,
                categoryIcon = Icons.Filled.ElectricalServices,
                categoryLabel = "Elec",
                observationsCount = 1
            ),
            InspectionItem(
                id = "INS-2024-WCL-48",
                code = "WCL-48",
                title = "Explosives Magazine & Blasting Crew",
                location = "South Quarry",
                inspector = "Anil Sharma",
                inspectorId = "AM-02",
                date = "04 Sep",
                status = InspectionStatus.OVERDUE,
                severity = Severity.CRITICAL,
                categoryIcon = Icons.Filled.Construction,
                categoryLabel = "Blast",
                observationsCount = 2
            )
        )
    )
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: ROOT COMPOSABLE — MANAGER DASHBOARD SCREEN
// ═══════════════════════════════════════════════════════════════════

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ManagerDashboardScreen(
    uiState: ManagerDashboardUiState,
    onSearchClick: () -> Unit = {},
    onLanguageClick: () -> Unit = {},
    onNotificationClick: () -> Unit = {},
    onProfileClick: () -> Unit = {},
    onKpiClick: (KpiMetric) -> Unit = {},
    onAiInsightReview: (AiInsight) -> Unit = {},
    onAiInsightDispatch: (AiInsight) -> Unit = {},
    onInspectApprove: (InspectionItem) -> Unit = {},
    onInspectEscalate: (InspectionItem) -> Unit = {},
    onInspectViewEvidence: (InspectionItem) -> Unit = {},
    onFilterSelect: (FilterCategory) -> Unit = {},
    onEmergencyDispatch: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    val haptic = LocalHapticFeedback.current

    Scaffold(
        modifier = modifier
            .fillMaxSize()
            .background(CoalIndiaTokens.BackgroundSurface),
        topBar = {
            TopCommandBar(
                subsidiaryTag = uiState.subsidiaryTag,
                mineName = uiState.mineName,
                pitLabel = uiState.pitLabel,
                managerInitials = uiState.managerInitials,
                isOnline = uiState.isOnline,
                notificationCount = uiState.notificationCount,
                onSearchClick = onSearchClick,
                onLanguageClick = onLanguageClick,
                onNotificationClick = onNotificationClick,
                onProfileClick = onProfileClick
            )
        },
        bottomBar = {
            BottomDockFilterBar(
                activeFilter = uiState.activeFilter,
                onFilterSelect = onFilterSelect
            )
        },
        floatingActionButton = {
            EmergencySosFab(
                isActive = uiState.isEmergencyActive,
                onClick = {
                    haptic.performHapticFeedback(HapticFeedbackType.LongPress)
                    onEmergencyDispatch()
                }
            )
        },
        floatingActionButtonPosition = FabPosition.End,
        containerColor = CoalIndiaTokens.BackgroundSurface
    ) { contentPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(contentPadding),
            contentPadding = PaddingValues(bottom = 80.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // ─── 1. GREETING & STATUS (ANDROID MOBILE APP SPEC) ─
            item {
                ManagerGreetingSection(
                    managerName = uiState.managerName,
                    isOnline = uiState.isOnline
                )
            }

            // ─── 2. CURRENT SHIFT HERO CARD ─────────────────
            item {
                CurrentShiftHeroCard(
                    shiftTime = "06:00 - 14:00",
                    collieryName = uiState.mineName,
                    timeLeft = "04h 42m left",
                    statusLabel = "On Schedule"
                )
            }

            // ─── 3. MY DAY (3-CARD ICON GRID) ───────────────
            item {
                MyDayOverviewSection(
                    attendance = "Present",
                    shiftName = "Morning Shift",
                    pendingTasks = uiState.aiInsights.count { it.severity == Severity.CRITICAL } + 1
                )
            }

            // ─── 4. MY PRIORITIES ───────────────────────────
            item {
                MyPrioritiesSection()
            }

            // ─── EXECUTIVE KPI TILES ────────────────────────
            item {
                SectionHeader(
                    title = "Executive Summary",
                    icon = Icons.Filled.Dashboard
                )
            }
            item {
                ExecutiveKpiGrid(
                    metrics = uiState.kpiMetrics,
                    onKpiClick = onKpiClick
                )
            }

            // ─── AI GOVERNANCE & ATTENTION STRIP ────────────
            item {
                SectionHeader(
                    title = "AI Governance Alerts",
                    icon = Icons.Filled.Psychology,
                    badgeCount = uiState.aiInsights.count { it.severity == Severity.CRITICAL }
                )
            }
            item {
                AiGovernanceStrip(
                    insights = uiState.aiInsights,
                    onReview = onAiInsightReview,
                    onDispatch = onAiInsightDispatch
                )
            }

            // ─── LIVE INSPECTION FEED ───────────────────────
            item {
                SectionHeader(
                    title = "Inspection Feed",
                    icon = Icons.Filled.Checklist,
                    badgeCount = uiState.inspections.count {
                        it.status == InspectionStatus.OVERDUE
                    }
                )
            }
            items(
                items = uiState.inspections,
                key = { it.id }
            ) { inspection ->
                InspectionFeedCard(
                    item = inspection,
                    onApprove = { onInspectApprove(inspection) },
                    onEscalate = { onInspectEscalate(inspection) },
                    onViewEvidence = { onInspectViewEvidence(inspection) }
                )
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: TOP COMMAND BAR
// ═══════════════════════════════════════════════════════════════════

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun TopCommandBar(
    subsidiaryTag: String,
    mineName: String,
    pitLabel: String,
    managerInitials: String,
    isOnline: Boolean,
    notificationCount: Int,
    onSearchClick: () -> Unit,
    onLanguageClick: () -> Unit,
    onNotificationClick: () -> Unit,
    onProfileClick: () -> Unit
) {
    // Pulsing green dot animation
    val infiniteTransition = rememberInfiniteTransition(label = "onlinePulse")
    val pulseAlpha by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 0.3f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulseAlpha"
    )

    Surface(
        color = CoalIndiaTokens.CoalBlue,
        shadowElevation = 4.dp
    ) {
        Column {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .statusBarsPadding()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                // ── Left: Subsidiary Tag + Mine Title ──
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.weight(1f)
                ) {
                    // Subsidiary badge
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = CoalIndiaTokens.IndustrialGold,
                        modifier = Modifier.padding(end = 10.dp)
                    ) {
                        Text(
                            text = subsidiaryTag,
                            color = Color.White,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Black,
                            letterSpacing = 1.sp,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }

                    Column {
                        Text(
                            text = "$mineName · $pitLabel",
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.SemiBold,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }

                // ── Right: Utility Icons + Avatar ──
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    // Search
                    IconButton(
                        onClick = onSearchClick,
                        modifier = Modifier.size(48.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Search,
                            contentDescription = "Search",
                            tint = Color.White.copy(alpha = 0.85f),
                            modifier = Modifier.size(22.dp)
                        )
                    }

                    // Language Globe
                    IconButton(
                        onClick = onLanguageClick,
                        modifier = Modifier.size(48.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Language,
                            contentDescription = "Language",
                            tint = Color.White.copy(alpha = 0.85f),
                            modifier = Modifier.size(22.dp)
                        )
                    }

                    // Notification Bell with badge
                    IconButton(
                        onClick = onNotificationClick,
                        modifier = Modifier.size(48.dp)
                    ) {
                        BadgedBox(
                            badge = {
                                if (notificationCount > 0) {
                                    Badge(
                                        containerColor = CoalIndiaTokens.CriticalRed,
                                        contentColor = Color.White
                                    ) {
                                        Text(
                                            text = if (notificationCount > 9) "9+"
                                            else notificationCount.toString(),
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }
                            }
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Notifications,
                                contentDescription = "Notifications",
                                tint = Color.White.copy(alpha = 0.85f),
                                modifier = Modifier.size(22.dp)
                            )
                        }
                    }

                    // Manager Avatar with pulsing online dot
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clickable(onClick = onProfileClick),
                        contentAlignment = Alignment.Center
                    ) {
                        Surface(
                            shape = CircleShape,
                            color = CoalIndiaTokens.CoalBlueLight,
                            border = BorderStroke(2.dp, Color.White.copy(alpha = 0.4f)),
                            modifier = Modifier.size(38.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(
                                    text = managerInitials,
                                    color = Color.White,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        // Pulsing green online indicator
                        if (isOnline) {
                            Box(
                                modifier = Modifier
                                    .align(Alignment.BottomEnd)
                                    .offset(x = (-2).dp, y = (-2).dp)
                                    .size(12.dp)
                                    .clip(CircleShape)
                                    .background(CoalIndiaTokens.VerifiedGreen.copy(alpha = pulseAlpha))
                                    .border(
                                        width = 2.dp,
                                        color = CoalIndiaTokens.CoalBlue,
                                        shape = CircleShape
                                    )
                            )
                        }
                    }
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 6: SECTION HEADER COMPOSABLE
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun SectionHeader(
    title: String,
    icon: ImageVector,
    badgeCount: Int = 0
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = CoalIndiaTokens.CoalBlue,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = title,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = CoalIndiaTokens.TextPrimary,
            letterSpacing = 0.5.sp
        )
        if (badgeCount > 0) {
            Spacer(modifier = Modifier.width(8.dp))
            Surface(
                shape = RoundedCornerShape(10.dp),
                color = CoalIndiaTokens.CriticalRedBg,
                border = BorderStroke(1.dp, CoalIndiaTokens.CriticalRedBorder)
            ) {
                Text(
                    text = "$badgeCount",
                    color = CoalIndiaTokens.CriticalRed,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                )
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 7: EXECUTIVE KPI TILES (2x3 Grid)
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun ExecutiveKpiGrid(
    metrics: List<KpiMetric>,
    onKpiClick: (KpiMetric) -> Unit
) {
    val rows = metrics.chunked(3)

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        rows.forEach { rowMetrics ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                rowMetrics.forEach { metric ->
                    KpiTile(
                        metric = metric,
                        onClick = { onKpiClick(metric) },
                        modifier = Modifier.weight(1f)
                    )
                }
                // Fill remaining space if row has fewer than 3 items
                repeat(3 - rowMetrics.size) {
                    Spacer(modifier = Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
private fun KpiTile(
    metric: KpiMetric,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    // Entrance animation
    var visible by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) {
        delay(100)
        visible = true
    }

    AnimatedVisibility(
        visible = visible,
        enter = fadeIn(animationSpec = tween(400)) +
                slideInVertically(
                    initialOffsetY = { it / 4 },
                    animationSpec = tween(400, easing = FastOutSlowInEasing)
                )
    ) {
        Surface(
            modifier = modifier
                .height(110.dp)
                .clickable(onClick = onClick),
            shape = RoundedCornerShape(14.dp),
            color = CoalIndiaTokens.CardSurface,
            border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
            shadowElevation = 2.dp
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(12.dp),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                // Icon with tinted background
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(metric.tintBackground),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = metric.icon,
                        contentDescription = null,
                        tint = metric.tintColor,
                        modifier = Modifier.size(20.dp)
                    )
                }

                Column {
                    Text(
                        text = metric.value,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Black,
                        color = CoalIndiaTokens.TextPrimary,
                        lineHeight = 24.sp
                    )
                    Text(
                        text = metric.label,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        color = CoalIndiaTokens.TextSecondary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            // Subtitle badge at top-right
            if (metric.subtitle.isNotEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.TopEnd
                ) {
                    Surface(
                        shape = RoundedCornerShape(
                            topStart = 0.dp,
                            topEnd = 14.dp,
                            bottomStart = 8.dp,
                            bottomEnd = 0.dp
                        ),
                        color = metric.tintBackground,
                    ) {
                        Text(
                            text = metric.subtitle,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = metric.tintColor,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                        )
                    }
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 8: AI GOVERNANCE & ATTENTION STRIP
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun AiGovernanceStrip(
    insights: List<AiInsight>,
    onReview: (AiInsight) -> Unit,
    onDispatch: (AiInsight) -> Unit
) {
    LazyRow(
        modifier = Modifier.fillMaxWidth(),
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(items = insights, key = { it.id }) { insight ->
            AiInsightCard(
                insight = insight,
                onReview = { onReview(insight) },
                onDispatch = { onDispatch(insight) }
            )
        }
    }
}

@Composable
private fun AiInsightCard(
    insight: AiInsight,
    onReview: () -> Unit,
    onDispatch: () -> Unit
) {
    // Pulsing hazard indicator
    val infiniteTransition = rememberInfiniteTransition(label = "hazardPulse_${insight.id}")
    val hazardAlpha by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = if (insight.isPulsing) 0.4f else 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "hazardAlpha"
    )

    val borderColor = insight.severity.borderColor
    val bgColor = insight.severity.backgroundColor
    val accentColor = insight.severity.color

    Surface(
        modifier = Modifier
            .width(300.dp)
            .wrapContentHeight(),
        shape = RoundedCornerShape(14.dp),
        color = bgColor,
        border = BorderStroke(1.5.dp, borderColor),
        shadowElevation = 3.dp
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // Header: Severity badge + Confidence
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Pulsing severity badge
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = accentColor.copy(alpha = hazardAlpha)
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(
                            imageVector = if (insight.severity == Severity.CRITICAL)
                                Icons.Filled.ErrorOutline else Icons.Filled.Warning,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(14.dp)
                        )
                        Text(
                            text = insight.severity.label,
                            color = Color.White,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Black,
                            letterSpacing = 0.8.sp
                        )
                    }
                }

                // Confidence score
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = CoalIndiaTokens.CoalBlue.copy(alpha = 0.1f)
                ) {
                    Text(
                        text = "AI ${insight.confidenceScore}%",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.CoalBlue,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            // Title
            Text(
                text = insight.title,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = CoalIndiaTokens.TextPrimary,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                lineHeight = 18.sp
            )

            // Location chip
            Surface(
                shape = RoundedCornerShape(8.dp),
                color = CoalIndiaTokens.ElevatedSurface,
                border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Filled.PinDrop,
                        contentDescription = null,
                        tint = CoalIndiaTokens.MutedSlate,
                        modifier = Modifier.size(14.dp)
                    )
                    Text(
                        text = insight.location,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        color = CoalIndiaTokens.TextSecondary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            // Description
            Text(
                text = insight.description,
                fontSize = 12.sp,
                color = CoalIndiaTokens.TextSecondary,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                lineHeight = 16.sp
            )

            // Sensor tag
            if (insight.sensorTag.isNotEmpty()) {
                Text(
                    text = "📡 ${insight.sensorTag}",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Medium,
                    color = CoalIndiaTokens.TextTertiary
                )
            }

            // Action buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // Review button
                FilledTonalButton(
                    onClick = onReview,
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.filledTonalButtonColors(
                        containerColor = CoalIndiaTokens.CoalBlue,
                        contentColor = Color.White
                    )
                ) {
                    Icon(
                        imageVector = Icons.Filled.RateReview,
                        contentDescription = null,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Review",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                // Dispatch button
                OutlinedButton(
                    onClick = onDispatch,
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp),
                    shape = RoundedCornerShape(10.dp),
                    border = BorderStroke(1.5.dp, accentColor),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = accentColor
                    )
                ) {
                    Icon(
                        imageVector = Icons.Filled.Send,
                        contentDescription = null,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Dispatch",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 9: LIVE INSPECTION FEED CARDS
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun InspectionFeedCard(
    item: InspectionItem,
    onApprove: () -> Unit,
    onEscalate: () -> Unit,
    onViewEvidence: () -> Unit
) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        shape = RoundedCornerShape(14.dp),
        color = CoalIndiaTokens.CardSurface,
        border = BorderStroke(
            1.dp,
            if (item.status == InspectionStatus.OVERDUE) CoalIndiaTokens.CriticalRedBorder
            else CoalIndiaTokens.BorderCrisp
        ),
        shadowElevation = 2.dp
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // ── Row 1: Category avatar + Title + Severity badge ──
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.Top,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Category icon avatar
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(
                            when (item.severity) {
                                Severity.CRITICAL -> CoalIndiaTokens.CriticalRedBg
                                Severity.WARNING -> CoalIndiaTokens.WarningAmberBg
                                Severity.NORMAL -> CoalIndiaTokens.InfoBlueBg
                            }
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = item.categoryIcon,
                        contentDescription = item.categoryLabel,
                        tint = when (item.severity) {
                            Severity.CRITICAL -> CoalIndiaTokens.CriticalRed
                            Severity.WARNING -> CoalIndiaTokens.WarningAmber
                            Severity.NORMAL -> CoalIndiaTokens.InfoBlue
                        },
                        modifier = Modifier.size(24.dp)
                    )
                }

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = item.title,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.TextPrimary,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis,
                        lineHeight = 17.sp
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Filled.PinDrop,
                            contentDescription = null,
                            tint = CoalIndiaTokens.TextTertiary,
                            modifier = Modifier.size(12.dp)
                        )
                        Text(
                            text = item.location,
                            fontSize = 11.sp,
                            color = CoalIndiaTokens.TextSecondary
                        )
                    }
                }

                // Severity badge
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = item.severity.backgroundColor,
                    border = BorderStroke(1.dp, item.severity.borderColor)
                ) {
                    Text(
                        text = item.severity.label,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Black,
                        color = item.severity.color,
                        letterSpacing = 0.5.sp,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                    )
                }
            }

            // ── Row 2: Metadata chips ──
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Inspection code tag
                MetadataChip(
                    text = item.code,
                    icon = Icons.Filled.Tag,
                    backgroundColor = CoalIndiaTokens.CoalBlue.copy(alpha = 0.08f),
                    textColor = CoalIndiaTokens.CoalBlue
                )

                // Inspector micro-chip
                MetadataChip(
                    text = item.inspectorId,
                    icon = Icons.Filled.Person,
                    backgroundColor = CoalIndiaTokens.ElevatedSurface,
                    textColor = CoalIndiaTokens.TextSecondary
                )

                // Status chip
                MetadataChip(
                    text = item.status.label,
                    icon = Icons.Filled.Circle,
                    iconSize = 8.dp,
                    backgroundColor = item.status.color.copy(alpha = 0.1f),
                    textColor = item.status.color
                )

                Spacer(modifier = Modifier.weight(1f))

                // Date
                Text(
                    text = item.date,
                    fontSize = 11.sp,
                    color = CoalIndiaTokens.TextTertiary,
                    fontWeight = FontWeight.Medium
                )
            }

            // Observations count
            if (item.observationsCount > 0) {
                Text(
                    text = "${item.observationsCount} observation(s) recorded",
                    fontSize = 11.sp,
                    color = CoalIndiaTokens.TextSecondary,
                    fontWeight = FontWeight.Medium
                )
            }

            // ── Row 3: Inline action icon bar ──
            HorizontalDivider(
                color = CoalIndiaTokens.BorderSubtle,
                thickness = 1.dp
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Approve
                InspectionActionButton(
                    icon = Icons.Filled.CheckCircle,
                    label = "Approve",
                    tint = CoalIndiaTokens.VerifiedGreen,
                    onClick = onApprove
                )

                // Reassign / Escalate
                InspectionActionButton(
                    icon = Icons.Filled.SwapHoriz,
                    label = "Escalate",
                    tint = CoalIndiaTokens.IndustrialGold,
                    onClick = onEscalate
                )

                // View Sensor Evidence
                InspectionActionButton(
                    icon = Icons.Filled.Sensors,
                    label = "Evidence",
                    tint = CoalIndiaTokens.CoalBlue,
                    onClick = onViewEvidence
                )
            }
        }
    }
}

@Composable
private fun MetadataChip(
    text: String,
    icon: ImageVector,
    backgroundColor: Color,
    textColor: Color,
    iconSize: Dp = 12.dp
) {
    Surface(
        shape = RoundedCornerShape(6.dp),
        color = backgroundColor
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(3.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = textColor,
                modifier = Modifier.size(iconSize)
            )
            Text(
                text = text,
                fontSize = 10.sp,
                fontWeight = FontWeight.SemiBold,
                color = textColor
            )
        }
    }
}

@Composable
private fun InspectionActionButton(
    icon: ImageVector,
    label: String,
    tint: Color,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 8.dp)
            .defaultMinSize(minWidth = 48.dp, minHeight = 48.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = label,
            tint = tint,
            modifier = Modifier.size(22.dp)
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = label,
            fontSize = 10.sp,
            fontWeight = FontWeight.Medium,
            color = tint
        )
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 10: BOTTOM DOCK & FILTER BAR
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun BottomDockFilterBar(
    activeFilter: FilterCategory,
    onFilterSelect: (FilterCategory) -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = CoalIndiaTokens.CardSurface,
        shadowElevation = 8.dp,
        border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .navigationBarsPadding()
                .padding(horizontal = 12.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            FilterCategory.entries.forEach { category ->
                val isActive = category == activeFilter
                val animatedColor by animateColorAsState(
                    targetValue = if (isActive) CoalIndiaTokens.CoalBlue
                    else CoalIndiaTokens.MutedSlate,
                    animationSpec = tween(300),
                    label = "filterColor"
                )

                Surface(
                    modifier = Modifier
                        .height(48.dp)
                        .clickable { onFilterSelect(category) },
                    shape = RoundedCornerShape(12.dp),
                    color = if (isActive) CoalIndiaTokens.CoalBlue.copy(alpha = 0.1f)
                    else Color.Transparent
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Icon(
                            imageVector = category.icon,
                            contentDescription = category.label,
                            tint = animatedColor,
                            modifier = Modifier.size(20.dp)
                        )
                        if (isActive) {
                            Text(
                                text = category.label,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = animatedColor
                            )
                        }
                    }
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 11: SOS / EMERGENCY FLOATING ACTION BUTTON
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun EmergencySosFab(
    isActive: Boolean,
    onClick: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "sosPulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 1.08f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "sosPulseScale"
    )
    val glowAlpha by infiniteTransition.animateFloat(
        initialValue = 0.3f,
        targetValue = 0.7f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "sosGlowAlpha"
    )

    Box(contentAlignment = Alignment.Center) {
        // Outer glow ring
        Box(
            modifier = Modifier
                .size(72.dp)
                .clip(CircleShape)
                .background(
                    CoalIndiaTokens.CriticalRed.copy(alpha = glowAlpha * 0.3f)
                )
        )

        // Main FAB
        LargeFloatingActionButton(
            onClick = onClick,
            shape = CircleShape,
            containerColor = CoalIndiaTokens.CriticalRed,
            contentColor = Color.White,
            elevation = FloatingActionButtonDefaults.largeElevation(
                defaultElevation = 6.dp,
                pressedElevation = 12.dp
            ),
            modifier = Modifier.size(64.dp)
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Filled.Warning,
                    contentDescription = "SOS Emergency Inspection",
                    modifier = Modifier.size(26.dp)
                )
                Text(
                    text = "SOS",
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 1.sp
                )
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 11B: ANDROID MOBILE SPEC SECTIONS (MATCHING WORKER DESIGN)
// ═══════════════════════════════════════════════════════════════════

@Composable
private fun ManagerGreetingSection(
    managerName: String,
    isOnline: Boolean
) {
    val infiniteTransition = rememberInfiniteTransition(label = "pulseTransition")
    val pulseAlpha by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 0.3f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulseAlpha"
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = "Good morning, ${managerName.split(" ").firstOrNull() ?: "Amit"}",
            fontSize = 28.sp,
            fontWeight = FontWeight.Black,
            color = CoalIndiaTokens.TextPrimary,
            letterSpacing = (-0.5).sp
        )

        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = CoalIndiaTokens.VerifiedGreenBg,
                border = BorderStroke(1.dp, CoalIndiaTokens.VerifiedGreenBorder)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(CoalIndiaTokens.VerifiedGreen.copy(alpha = if (isOnline) pulseAlpha else 1f))
                    )
                    Text(
                        text = "Online",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.VerifiedGreen
                    )
                }
            }

            Surface(
                shape = RoundedCornerShape(16.dp),
                color = CoalIndiaTokens.InfoBlueBg,
                border = BorderStroke(1.dp, CoalIndiaTokens.InfoBlueBorder)
            ) {
                Text(
                    text = "Pit Head · Duty",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = CoalIndiaTokens.InfoBlue,
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                )
            }
        }
    }
}

@Composable
private fun CurrentShiftHeroCard(
    shiftTime: String,
    collieryName: String,
    timeLeft: String,
    statusLabel: String
) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        shape = RoundedCornerShape(24.dp),
        color = Color.White,
        border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
        shadowElevation = 4.dp
    ) {
        Column {
            // Top accent bar
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .background(Color(0xFF136C4B))
            )

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    // Clock icon in rounded squarish box
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Color(0xFF136C4B),
                        modifier = Modifier.size(56.dp)
                    ) {
                        Box(contentAlignment = Alignment.Center) {
                            Icon(
                                imageVector = Icons.Filled.Schedule,
                                contentDescription = null,
                                tint = CoalIndiaTokens.IndustrialGold,
                                modifier = Modifier.size(28.dp)
                            )
                        }
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "CURRENT SHIFT",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = CoalIndiaTokens.TextTertiary,
                            letterSpacing = 1.sp
                        )
                        Text(
                            text = shiftTime,
                            fontSize = 22.sp,
                            fontWeight = FontWeight.Black,
                            color = CoalIndiaTokens.TextPrimary
                        )
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp),
                            modifier = Modifier.padding(top = 2.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Place,
                                contentDescription = null,
                                tint = Color(0xFF136C4B),
                                modifier = Modifier.size(14.dp)
                            )
                            Text(
                                text = collieryName,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = CoalIndiaTokens.TextSecondary
                            )
                        }
                    }
                }

                HorizontalDivider(color = CoalIndiaTokens.BorderSubtle, thickness = 1.dp)

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Time left badge
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = CoalIndiaTokens.WarningAmberBg,
                        border = BorderStroke(1.dp, CoalIndiaTokens.WarningAmberBorder)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Filled.Schedule,
                                contentDescription = null,
                                tint = CoalIndiaTokens.WarningAmber,
                                modifier = Modifier.size(14.dp)
                            )
                            Text(
                                text = timeLeft,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Black,
                                color = CoalIndiaTokens.WarningAmber
                            )
                        }
                    }

                    // Status badge
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = CoalIndiaTokens.VerifiedGreenBg,
                        border = BorderStroke(1.dp, CoalIndiaTokens.VerifiedGreenBorder)
                    ) {
                        Text(
                            text = statusLabel,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = CoalIndiaTokens.VerifiedGreen,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun MyDayOverviewSection(
    attendance: String,
    shiftName: String,
    pendingTasks: Int
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text(
            text = "MY DAY",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = CoalIndiaTokens.TextTertiary,
            letterSpacing = 1.sp
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            // Tile 1: Attendance
            Surface(
                modifier = Modifier
                    .weight(1f)
                    .height(105.dp),
                shape = RoundedCornerShape(20.dp),
                color = Color.White,
                border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
                shadowElevation = 2.dp
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Shield,
                        contentDescription = null,
                        tint = CoalIndiaTokens.VerifiedGreen,
                        modifier = Modifier.size(26.dp)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "ATTENDANCE",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.TextTertiary,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = attendance,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Black,
                        color = CoalIndiaTokens.TextPrimary
                    )
                }
            }

            // Tile 2: Shift
            Surface(
                modifier = Modifier
                    .weight(1f)
                    .height(105.dp),
                shape = RoundedCornerShape(20.dp),
                color = Color.White,
                border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
                shadowElevation = 2.dp
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Filled.Schedule,
                        contentDescription = null,
                        tint = Color(0xFF136C4B),
                        modifier = Modifier.size(26.dp)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "SHIFT",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.TextTertiary,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = shiftName,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Black,
                        color = CoalIndiaTokens.TextPrimary,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            // Tile 3: Tasks with Red Badge Dot
            Surface(
                modifier = Modifier
                    .weight(1f)
                    .height(105.dp),
                shape = RoundedCornerShape(20.dp),
                color = Color.White,
                border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
                shadowElevation = 2.dp
            ) {
                Box(modifier = Modifier.fillMaxSize()) {
                    // Red pulsing indicator in corner
                    if (pendingTasks > 0) {
                        Box(
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .padding(8.dp)
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(CoalIndiaTokens.CriticalRed)
                        )
                    }

                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(10.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            imageVector = Icons.Filled.Checklist,
                            contentDescription = null,
                            tint = CoalIndiaTokens.WarningAmber,
                            modifier = Modifier.size(26.dp)
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "TASKS",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = CoalIndiaTokens.TextTertiary,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "$pendingTasks Pending",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Black,
                            color = CoalIndiaTokens.TextPrimary
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun MyPrioritiesSection() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Text(
            text = "MY PRIORITIES",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = CoalIndiaTokens.TextTertiary,
            letterSpacing = 1.sp
        )

        // Priority 1: Training / Critical Safety
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            color = Color.White,
            border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
            shadowElevation = 2.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = CoalIndiaTokens.WarningAmberBg,
                    border = BorderStroke(1.dp, CoalIndiaTokens.WarningAmberBorder),
                    modifier = Modifier.size(48.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(
                            imageVector = Icons.Filled.Warning,
                            contentDescription = null,
                            tint = CoalIndiaTokens.WarningAmber,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                }

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "CRITICAL SAFETY",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.WarningAmber,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = "Ventilation Fan #2 Vibration",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Black,
                        color = CoalIndiaTokens.TextPrimary
                    )
                }

                Icon(
                    imageVector = Icons.Filled.ChevronRight,
                    contentDescription = null,
                    tint = CoalIndiaTokens.TextTertiary,
                    modifier = Modifier.size(20.dp)
                )
            }
        }

        // Priority 2: Corrective Action
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            color = Color.White,
            border = BorderStroke(1.dp, CoalIndiaTokens.BorderCrisp),
            shadowElevation = 2.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = CoalIndiaTokens.InfoBlueBg,
                    border = BorderStroke(1.dp, CoalIndiaTokens.InfoBlueBorder),
                    modifier = Modifier.size(48.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(
                            imageVector = Icons.Filled.Build,
                            contentDescription = null,
                            tint = CoalIndiaTokens.CoalBlue,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                }

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "CORRECTIVE ACTION",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = CoalIndiaTokens.CoalBlue,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = "Replace Worn Out Safety Rope",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Black,
                        color = CoalIndiaTokens.TextPrimary
                    )
                }

                Icon(
                    imageVector = Icons.Filled.ChevronRight,
                    contentDescription = null,
                    tint = CoalIndiaTokens.TextTertiary,
                    modifier = Modifier.size(20.dp)
                )
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 12: COMPLIANCE GAUGE (BONUS COMPOSABLE)
// ═══════════════════════════════════════════════════════════════════

@Composable
fun ComplianceGauge(
    percentage: Float,
    label: String,
    color: Color,
    modifier: Modifier = Modifier,
    size: Dp = 100.dp,
    strokeWidth: Dp = 10.dp
) {
    val animatedPercentage by animateFloatAsState(
        targetValue = percentage,
        animationSpec = tween(1200, easing = FastOutSlowInEasing),
        label = "gaugeAnim"
    )

    val sweepAngle = animatedPercentage / 100f * 270f

    Box(
        modifier = modifier.size(size),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val canvasSize = this.size
            val radius = (canvasSize.minDimension - strokeWidth.toPx()) / 2f
            val center = Offset(canvasSize.width / 2f, canvasSize.height / 2f)

            // Background track
            drawArc(
                color = CoalIndiaTokens.BorderCrisp,
                startAngle = 135f,
                sweepAngle = 270f,
                useCenter = false,
                style = Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Round),
                topLeft = Offset(
                    center.x - radius,
                    center.y - radius
                ),
                size = androidx.compose.ui.geometry.Size(radius * 2, radius * 2)
            )

            // Active arc
            drawArc(
                color = color,
                startAngle = 135f,
                sweepAngle = sweepAngle,
                useCenter = false,
                style = Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Round),
                topLeft = Offset(
                    center.x - radius,
                    center.y - radius
                ),
                size = androidx.compose.ui.geometry.Size(radius * 2, radius * 2)
            )
        }

        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "${animatedPercentage.toInt()}%",
                fontSize = 18.sp,
                fontWeight = FontWeight.Black,
                color = CoalIndiaTokens.TextPrimary
            )
            Text(
                text = label,
                fontSize = 9.sp,
                fontWeight = FontWeight.Medium,
                color = CoalIndiaTokens.TextTertiary,
                textAlign = TextAlign.Center
            )
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 13: @PREVIEW
// ═══════════════════════════════════════════════════════════════════

@Preview(
    name = "Manager Dashboard — Full Screen",
    showBackground = true,
    showSystemUi = true,
    device = "spec:width=411dp,height=891dp,dpi=420"
)
@Composable
private fun ManagerDashboardPreview() {
    MaterialTheme {
        ManagerDashboardScreen(
            uiState = ManagerDashboardData.createSampleState()
        )
    }
}

@Preview(
    name = "Manager Dashboard — Tablet Landscape",
    showBackground = true,
    showSystemUi = true,
    device = "spec:width=1280dp,height=800dp,dpi=240"
)
@Composable
private fun ManagerDashboardTabletPreview() {
    MaterialTheme {
        ManagerDashboardScreen(
            uiState = ManagerDashboardData.createSampleState()
        )
    }
}

@Preview(name = "Compliance Gauge", showBackground = true)
@Composable
private fun ComplianceGaugePreview() {
    MaterialTheme {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            ComplianceGauge(
                percentage = 86f,
                label = "Compliance",
                color = CoalIndiaTokens.WarningAmber
            )
            ComplianceGauge(
                percentage = 96f,
                label = "Workforce",
                color = CoalIndiaTokens.VerifiedGreen
            )
            ComplianceGauge(
                percentage = 94f,
                label = "Production",
                color = CoalIndiaTokens.CoalBlue
            )
        }
    }
}
