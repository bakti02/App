import {
  PlanTier,
  AddOnItem,
  TeamMember,
  InvoiceItem,
  CloudConnection,
  CloudAsset,
  ActionItem,
  RiskFinding,
  ComplianceFramework,
  EvidenceRecord,
  PqcAsset,
  ApiKeyItem
} from '../types';

export const PLANS_DATA: PlanTier[] = [
  {
    id: 'free',
    name: 'Starter Cloud',
    subtitle: 'Essential discovery & single-cloud audit',
    monthlyPrice: 0,
    annualPrice: 0,
    isCurrent: true,
    buttonLabel: 'Paket Saat Ini',
    buttonVariant: 'outline',
    features: [
      'Discovery hingga 1 Cloud Account (AWS/GCP)',
      'Pemindaian Kerentanan 100 Asset bulanan',
      'Dasar WAF & Rule Set OWASP Top 10',
      'Laporan Compliance Snapshot (CIS Benchmark)',
      'Hardware 2FA / YubiKey Authentication',
      'Ekspor Log & Insiden CSV'
    ]
  },
  {
    id: 'plus',
    name: 'Secure & Trust Pro',
    subtitle: 'Multi-cloud posture & automated compliance',
    badge: 'PALING POPULER',
    badgeType: 'popular',
    monthlyPrice: 12,
    annualPrice: 10,
    isCurrent: false,
    buttonLabel: 'Upgrade Sekarang',
    buttonVariant: 'primary',
    features: [
      'Semua fitur Starter Cloud',
      'Multi-Cloud Discovery tak terbatas (AWS, Azure, GCP)',
      'Visualisasi Attack Path Graph interaktif',
      'Automated Evidence Collection untuk SOC 2 & ISO 27001',
      'Manajemen Kunci KMS & Secrets Vault',
      'SOAR Automated Incident Playbooks',
      'Integrasi SIEM (Splunk, Datadog, Slack, GitHub)',
      'Dukungan Teknis Prioritas 24/7'
    ]
  },
  {
    id: 'premium',
    name: 'Quantum Fortress',
    subtitle: 'Full spectrum posture + Post-Quantum (PQC) readiness',
    badge: 'ENTERPRISE DEPLOYMENT',
    badgeType: 'valuable',
    monthlyPrice: 16,
    annualPrice: 13,
    isCurrent: false,
    buttonLabel: 'Upgrade Sekarang',
    buttonVariant: 'primary',
    features: [
      'Semua fitur Secure & Trust Pro',
      'PQC Readiness Analyzer & CBOM Inventory',
      'PQC Migration Sandbox (ML-KEM-768 & ML-DSA-65)',
      'Akses PQC Developer API & Client SDK',
      'Kepatuhan Regulasi UU PDP No. 27/2022 & GDPR',
      'AI Delegated Threat Intelligence & Mitigation',
      'Dedicated Customer Success Architect',
      'SLA Jaminan Ketersediaan 99.99%'
    ]
  }
];

export const ADDONS_DATA: AddOnItem[] = [
  {
    id: 'ai-addon',
    title: 'NusaSec-AI Threat Intelligence Engine ($4/bln)',
    subtitle: 'Analisis ancaman Zero-Day bertenaga AI dengan rekomendasi hotfix dan mitigasi otomatis.',
    badge: 'REKOMENDASI AI',
    monthlyPrice: 4,
    annualPrice: 3.5,
    iconType: 'ai-rainbow',
    isAdded: true
  },
  {
    id: 'pqc-migration-addon',
    title: 'PQC Quantum Migration Sandbox ($2/bln)',
    subtitle: 'Simulasi transisi kriptografi post-quantum dengan snapshot perbandingan before/after.',
    monthlyPrice: 2,
    annualPrice: 1.8,
    iconType: 'assistant-dark',
    isAdded: false
  }
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: '1',
    name: 'Nurlaela Azwini',
    email: 'nurlaelaazwini66@gmail.com',
    role: 'SOC Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    mfaVerified: true,
    clearanceLevel: 'Level 4 (Top Secret)'
  },
  {
    id: '2',
    name: 'Alex Morgan',
    email: 'alex.morgan@nusasec.cloud',
    role: 'SecOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    mfaVerified: true,
    clearanceLevel: 'Level 3 (Secret)'
  },
  {
    id: '3',
    name: 'Sarah Connor',
    email: 'sarah.c@nusasec.cloud',
    role: 'Compliance Auditor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    mfaVerified: true,
    clearanceLevel: 'Level 2 (Auditor)'
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'david.chen@partner.nusasec.dev',
    role: 'Viewer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    status: 'invited',
    mfaVerified: false,
    clearanceLevel: 'Level 1 (Read Only)'
  }
];

export const INVOICES_DATA: InvoiceItem[] = [
  {
    id: 'INV-2026-003',
    date: '19 Agu 2026',
    amount: '$16.00',
    plan: 'Quantum Fortress Plan',
    status: 'Paid',
    downloadUrl: '#'
  },
  {
    id: 'INV-2026-002',
    date: '01 Jul 2026',
    amount: '$12.00',
    plan: 'Secure & Trust Pro Plan',
    status: 'Paid',
    downloadUrl: '#'
  },
  {
    id: 'INV-2026-001',
    date: '01 Jun 2026',
    amount: '$0.00',
    plan: 'Starter Cloud Tier',
    status: 'Paid',
    downloadUrl: '#'
  }
];

// Cloud Connections
export const CLOUD_CONNECTIONS_DATA: CloudConnection[] = [
  {
    accountId: 'conn-aws-01',
    provider: 'aws',
    accountRef: '9482-1049-5501',
    name: 'AWS Primary Production (ap-southeast-1)',
    credentialMode: 'role_ref',
    identityStatus: 'VALIDATED',
    lastValidatedAt: '10 menit lalu',
    regionCount: 3,
    assetCount: 642
  },
  {
    accountId: 'conn-gcp-02',
    provider: 'gcp',
    accountRef: 'nusasec-core-prod-88',
    name: 'GCP Kubernetes Cluster & BigQuery',
    credentialMode: 'service_account',
    identityStatus: 'VALIDATED',
    lastValidatedAt: '25 menit lalu',
    regionCount: 2,
    assetCount: 388
  },
  {
    accountId: 'conn-azure-03',
    provider: 'azure',
    accountRef: 'sub-f8401-291b',
    name: 'Azure Entra ID & Active Directory',
    credentialMode: 'role_ref',
    identityStatus: 'VALIDATED',
    lastValidatedAt: '1 jam lalu',
    regionCount: 1,
    assetCount: 180
  },
  {
    accountId: 'conn-cf-04',
    provider: 'cloudflare',
    accountRef: 'zone-nusasec-global',
    name: 'Cloudflare Edge WAF & DNS Anycast',
    credentialMode: 'api_key',
    identityStatus: 'VALIDATED',
    lastValidatedAt: '5 menit lalu',
    regionCount: 275,
    assetCount: 34
  }
];

// Cloud Assets
export const CLOUD_ASSETS_DATA: CloudAsset[] = [
  {
    id: 'ast-001',
    scanId: 'scn-9901',
    provider: 'aws',
    assetType: 'AWS::ECS::Service',
    externalId: 'arn:aws:ecs:ap-southeast-1:core-api-gw',
    name: 'core-api-gateway-prod',
    region: 'ap-southeast-1 (Jakarta)',
    riskScore: 24,
    sensitivity: 'CONFIDENTIAL',
    status: 'PROTECTED'
  },
  {
    id: 'ast-002',
    scanId: 'scn-9902',
    provider: 'aws',
    assetType: 'AWS::RDS::DBInstance',
    externalId: 'rds:ap-southeast-1:postgres-primary',
    name: 'prod-customer-db-primary',
    region: 'ap-southeast-1 (Jakarta)',
    riskScore: 82,
    sensitivity: 'RESTRICTED',
    status: 'AT_RISK'
  },
  {
    id: 'ast-003',
    scanId: 'scn-9903',
    provider: 'gcp',
    assetType: 'GKE::Cluster::NodePool',
    externalId: 'gke/asia-southeast1/pqc-compute-v2',
    name: 'pqc-engine-worker-pool',
    region: 'asia-southeast1',
    riskScore: 12,
    sensitivity: 'INTERNAL',
    status: 'PROTECTED'
  },
  {
    id: 'ast-004',
    scanId: 'scn-9904',
    provider: 'cloudflare',
    assetType: 'Cloudflare::WAF::CustomRuleset',
    externalId: 'cf-zone-waf-id-8821',
    name: 'edge-ddos-shield-global',
    region: 'Global Edge',
    riskScore: 5,
    sensitivity: 'PUBLIC',
    status: 'PROTECTED'
  }
];

// Action Items
export const ACTION_ITEMS_DATA: ActionItem[] = [
  {
    id: 'ACT-101',
    title: 'Rotasi KMS Master Key & Enforce AES-256 GCM',
    category: 'SECURITY',
    priority: 'P0 - CRITICAL',
    severity: 'CRITICAL',
    status: 'OPEN',
    owner: 'Nurlaela Azwini (SOC Admin)',
    source: 'KMS Key Policy Audit',
    sourceId: 'kms-policy-881',
    dueAt: 'Hari ini, 23:59 WIB',
    recommendedAction: 'Jalankan rotasi otomatis KMS dan cabut versi key lama setelah verifikasi dekripsi.',
    blocker: 'Memerlukan maintenance window 10 menit'
  },
  {
    id: 'ACT-102',
    title: 'Perbarui Rule WAF untuk Mitigasi CVE-2024-3400',
    category: 'SECURITY',
    priority: 'P1 - HIGH',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    owner: 'Alex Morgan (SecOps)',
    source: 'NusaSec-AI Threat Engine',
    sourceId: 'cve-2024-3400-rule',
    dueAt: 'Besok, 12:00 WIB',
    recommendedAction: 'Deploy virtual patch Rule #942100 pada Edge Gateway.'
  },
  {
    id: 'ACT-103',
    title: 'Unggah Bukti Attestation SOC 2 Type II Periode Q3',
    category: 'COMPLIANCE',
    priority: 'P2 - MEDIUM',
    severity: 'MEDIUM',
    status: 'OPEN',
    owner: 'Sarah Connor (Auditor)',
    source: 'Trust Audit Engine',
    sourceId: 'soc2-evd-q3',
    dueAt: '25 Agu 2026',
    recommendedAction: 'Upload laporan audit independen berformat PDF terverifikasi hash SHA256.'
  },
  {
    id: 'ACT-104',
    title: 'Simulasi Migrasi Algoritma KEM RSA-2048 ke ML-KEM-768',
    category: 'QUANTUM',
    priority: 'P2 - MEDIUM',
    severity: 'MEDIUM',
    status: 'DONE',
    owner: 'Nurlaela Azwini',
    source: 'Quantum Migration Center',
    sourceId: 'pqc-plan-04',
    dueAt: 'Selesai',
    recommendedAction: 'Benchmark handshake latensi sebelum promosi ke production.'
  }
];

// Risk Findings
export const RISK_FINDINGS_DATA: RiskFinding[] = [
  {
    id: 'FND-8821',
    cve: 'CVE-2024-3400',
    title: 'Command Injection pada Header Proxy Otentikasi',
    cvss: 9.8,
    severity: 'CRITICAL',
    asset: 'core-api-gateway-prod',
    provider: 'aws',
    exposureVector: 'Internet Ingress → Port 443 → Header Parser',
    status: 'OPEN',
    businessCriticality: 'CRITICAL',
    remediationPlan: 'Terapkan filter WAF virtual hotfix dan validasi strict RFC-7230 headers.',
    detectedAt: '15 menit lalu'
  },
  {
    id: 'FND-8820',
    cve: 'CWE-319',
    title: 'Port Database RDS Terbuka ke Public Subnet',
    cvss: 8.4,
    severity: 'HIGH',
    asset: 'prod-customer-db-primary',
    provider: 'aws',
    exposureVector: 'VPC Ingress 0.0.0.0/0 → Port 5432',
    status: 'IN_REMEDIATION',
    businessCriticality: 'CRITICAL',
    remediationPlan: 'Ubah Security Group RDS menjadi private VPC subnet dan gunakan bastion host.',
    detectedAt: '1 jam lalu'
  },
  {
    id: 'FND-8819',
    cve: 'PQC-ALG-01',
    title: 'Penggunaan Sertifikat TLS Legacy RSA-2048 rentan Shor Algorithm',
    cvss: 6.2,
    severity: 'MEDIUM',
    asset: 'pqc-engine-worker-pool',
    provider: 'gcp',
    exposureVector: 'Internal Microservices mTLS',
    status: 'OPEN',
    businessCriticality: 'HIGH',
    remediationPlan: 'Migrasikan cert ke Hybrid KEM (ECDH X25519 + ML-KEM-768).',
    detectedAt: '3 jam lalu'
  }
];

// Compliance Frameworks
export const COMPLIANCE_FRAMEWORKS_DATA: ComplianceFramework[] = [
  {
    id: 'fw-soc2',
    code: 'SOC 2 Type II',
    name: 'Trust Services Criteria (Security, Availability, Confidentiality)',
    jurisdiction: 'Global / AICPA',
    totalRules: 84,
    passedRules: 81,
    failedRules: 1,
    unknownRules: 2,
    complianceScore: 96.4,
    evidenceCoverage: 95.0,
    status: 'COMPLIANT',
    lastAudit: '12 Agu 2026'
  },
  {
    id: 'fw-iso27001',
    code: 'ISO/IEC 27001:2022',
    name: 'Information Security Management System (ISMS)',
    jurisdiction: 'International ISO',
    totalRules: 93,
    passedRules: 88,
    failedRules: 3,
    unknownRules: 2,
    complianceScore: 94.6,
    evidenceCoverage: 92.5,
    status: 'COMPLIANT',
    lastAudit: '08 Agu 2026'
  },
  {
    id: 'fw-uupdp',
    code: 'UU PDP No. 27/2022',
    name: 'Undang-Undang Pelindungan Data Pribadi Indonesia',
    jurisdiction: 'Indonesia (Kominfo)',
    totalRules: 52,
    passedRules: 50,
    failedRules: 0,
    unknownRules: 2,
    complianceScore: 96.1,
    evidenceCoverage: 98.0,
    status: 'COMPLIANT',
    lastAudit: '18 Agu 2026'
  },
  {
    id: 'fw-gdpr',
    code: 'EU GDPR',
    name: 'General Data Protection Regulation & Cross-Border Transfer',
    jurisdiction: 'European Union',
    totalRules: 60,
    passedRules: 56,
    failedRules: 2,
    unknownRules: 2,
    complianceScore: 93.3,
    evidenceCoverage: 91.0,
    status: 'COMPLIANT',
    lastAudit: '01 Agu 2026'
  }
];

// Evidence Records
export const EVIDENCE_RECORDS_DATA: EvidenceRecord[] = [
  {
    id: 'evd-001',
    filename: 'soc2_type_ii_audit_report_2026_signed.pdf',
    contentType: 'application/pdf',
    sizeBytes: 4194304,
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    kind: 'soc2_attestation',
    status: 'VERIFIED',
    uploadedBy: 'Sarah Connor',
    createdAt: '12 Agu 2026',
    freshness: 'FRESH'
  },
  {
    id: 'evd-002',
    filename: 'penetration_test_q3_external_firm.pdf',
    contentType: 'application/pdf',
    sizeBytes: 8388608,
    sha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    kind: 'pen_test',
    status: 'VERIFIED',
    uploadedBy: 'Alex Morgan',
    createdAt: '15 Agu 2026',
    freshness: 'FRESH'
  },
  {
    id: 'evd-003',
    filename: 'pqc_cryptographic_benchmark_mlkem768.pdf',
    contentType: 'application/pdf',
    sizeBytes: 2097152,
    sha256: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    kind: 'pqc_benchmark',
    status: 'VERIFIED',
    uploadedBy: 'Nurlaela Azwini',
    createdAt: '18 Agu 2026',
    freshness: 'FRESH'
  }
];

// PQC Assets
export const PQC_ASSETS_DATA: PqcAsset[] = [
  {
    id: 'pqc-01',
    name: 'TLS 1.3 Key Exchange for API Gateway',
    currentAlgorithm: 'ECDH X25519 (Classical)',
    algorithmType: 'KEM',
    targetAlgorithm: 'ML-KEM-768 (Kyber-768)',
    quantumVulnerability: 'HIGH_RISK',
    migrationPhase: 'SIMULATED',
    cbomRef: 'cbom:api-gw:kem-01',
    workload: 'Production Edge Ingress'
  },
  {
    id: 'pqc-02',
    name: 'JWT Token Signing Authority Key',
    currentAlgorithm: 'RSA-4096 (Classical)',
    algorithmType: 'SIGNATURE',
    targetAlgorithm: 'ML-DSA-65 (Dilithium-3)',
    quantumVulnerability: 'HIGH_RISK',
    migrationPhase: 'PLANNED',
    cbomRef: 'cbom:auth:sig-02',
    workload: 'OAuth2 Authentication Core'
  },
  {
    id: 'pqc-03',
    name: 'Customer Database Column Encryption Salt',
    currentAlgorithm: 'AES-256 GCM (Symmetric)',
    algorithmType: 'SYMMETRIC',
    targetAlgorithm: 'AES-256 GCM (Quantum Resistant with Grover)',
    quantumVulnerability: 'QUANTUM_SAFE',
    migrationPhase: 'MIGRATED',
    cbomRef: 'cbom:db:sym-03',
    workload: 'Postgres RDS Storage Vault'
  }
];

// API Keys
export const API_KEYS_DATA: ApiKeyItem[] = [
  {
    id: 'key-01',
    name: 'NusaSec Production Core Agent',
    keyPrefix: 'nsk_live_94f8***',
    keyHash: 'sha256:7b92...88a1',
    environment: 'PRODUCTION',
    scopes: ['telemetry:write', 'pqc:compute', 'assets:read'],
    lastUsed: '2 menit lalu',
    createdAt: '01 Agu 2026',
    expiresAt: '01 Agu 2027',
    status: 'ACTIVE'
  },
  {
    id: 'key-02',
    name: 'CI/CD GitHub Actions Security Scanner',
    keyPrefix: 'nsk_ci_44b1***',
    keyHash: 'sha256:1a82...33fe',
    environment: 'PRODUCTION',
    scopes: ['compliance:audit', 'evidence:upload'],
    lastUsed: '1 jam lalu',
    createdAt: '10 Agu 2026',
    expiresAt: '10 Agu 2027',
    status: 'ACTIVE'
  }
];
