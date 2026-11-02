// All site content lives here. Edit this file to update projects, experience, tools and links.

export const profile = {
  name: "Usman Zaffar",
  short: "uz",
  email: "732.usman@gmail.com",
  location: "Edison, NJ",
  intro:
    "Identity and access management (IAM) analyst with nearly 3 years of hands-on access management across physical access control, account support and SIEM monitoring. Hands on with Active Directory, Entra ID, Okta, MFA and single sign-on.",
  badge: "Open to IAM analyst and administrator roles · Edison, NJ",
  photo: "assets/img/usman.jpg",
  photoAlt: "Portrait of Usman Zaffar",
  facts: [
    ["EDUCATION", "B.S. Information Technology", "NJIT · 3.8 GPA · Summer 2027"],
    ["CERTIFICATION", "CompTIA Security+", "SC-300 in progress"],
    ["IAM SUPPORT", "Identity & Access Support Technician", "Geeks On Site · Current"],
    ["ACCESS CONTROL", "Access Control Analyst", "Metro One · 2023 to 2025"],
  ],
  contactLine: "Open to IAM analyst, identity administrator and access management roles.",
  github: "https://github.com/73256Usman",
  linkedin: "https://www.linkedin.com/in/usmanzaffar/",
  resumes: {
    iam: "resume/Usman-Zaffar-IAM-Resume.pdf",
    it: "resume/Usman-Zaffar-IAM-Resume.pdf", // one resume for both views
  },
};

// Emphasis that changes when the visitor flips the IAM / IT switch: tagline, projects, tools, key skills,
// lab map and process steps. Job titles, experience, About, facts and contact text are the same in both views.
export const tracks = {
  iam: {
    label: "IAM",
    prompt: "usman@portfolio:~$ whoami --track iam",
    tagline: "IDENTITY AND ACCESS MANAGEMENT",
    pillars: [
      ["01 / AUTHENTICATE", "Prove who someone is."],
      ["02 / AUTHORIZE", "Give the right access, no more."],
      ["03 / GOVERN", "Review it, rotate it, remove it."],
    ],
    strip: ["IAM", "ENTRA ID", "OKTA", "ACTIVE DIRECTORY"],
    workTitle: "Identity and access projects.",
    workIntro:
      "Labs and projects I have built and run myself. Open a card to see what I did.",
    capTitle: "The access lifecycle.",
    capIntro: "The steps I follow when someone joins, changes roles or leaves.",
    cycle: ["Request", "Provision", "Authenticate", "Review", "Remediate", "Remove"],
    caps: [
      {
        n: "01",
        title: "Provision and onboard",
        text: "Create the account, put it in the right groups, and set up MFA and sign in.",
      },
      {
        n: "02",
        title: "Authenticate and authorize",
        text: "Check who someone is, then give only the access their role needs.",
      },
      {
        n: "03",
        title: "Review and remove",
        text: "Audit who has access, fix what should not be there, and disable leavers.",
      },
    ],
    expTitle: "Work experience.",
    contactTitle: "Let's connect.",
  },
  it: {
    label: "IT",
    prompt: "usman@portfolio:~$ whoami --track it",
    tagline: "IAM BUILT ON IT SYSTEMS AND SUPPORT",
    pillars: [
      ["01 / SUPPORT", "Get people working again."],
      ["02 / ADMINISTER", "Users, devices and policy."],
      ["03 / AUTOMATE", "Script the repeat work."],
    ],
    strip: ["ACTIVE DIRECTORY", "WINDOWS", "MICROSOFT 365", "POWERSHELL"],
    workTitle: "IT projects and labs.",
    workIntro:
      "Labs and projects I have built and run myself. Open a card to see what I did.",
    capTitle: "The support cycle.",
    capIntro: "The steps I follow on a support request, from the first call to the follow up.",
    cycle: ["Intake", "Diagnose", "Resolve", "Verify", "Document", "Prevent"],
    caps: [
      {
        n: "01",
        title: "Intake and diagnose",
        text: "Ask the right questions and find what is actually causing the problem.",
      },
      {
        n: "02",
        title: "Resolve and restore",
        text: "Fix it and check with the user that they can get back to work.",
      },
      {
        n: "03",
        title: "Document and prevent",
        text: "Write up the fix and script the problems that keep coming back.",
      },
    ],
    expTitle: "Work experience.",
    contactTitle: "Let's connect.",
  },
};

// track: "iam" | "it" | "both", or a list such as ["iam", "it"]. "both" shows in every view.
// Optional: add  links: [{ label: "View on GitHub", url: "https://github.com/..." }]  to any project
// and the links appear inside the expanded card. See docs/EDITING-GUIDE.md.
export const projects = [
  {
    id: "iam-entra",
    title: "Entra ID, MFA and Conditional Access",
    meta: "Identity lab · hybrid identity",
    track: "iam",
    tags: ["Identity", "Cloud"],
    flow: ["Sync users", "Require MFA", "Set policies", "Test and log"],
    summary:
      "On-premises Active Directory connected to Microsoft Entra ID, with MFA and Conditional Access policies tested against real sign-ins.",
    did: [
      "Synced 15 test users from Active Directory to Entra ID with Entra Connect.",
      "Created 4 Conditional Access policies: MFA for admins, MFA for all users, block sign-ins from outside the United States, and block legacy authentication.",
      "Ran each policy in report-only mode first, then enabled it and tested it with the What If tool and real sign-ins.",
      "Created a break-glass admin account that is excluded from the policies, and checked the matching entries in the sign-in logs.",
    ],
    tools: ["Entra ID", "Entra Connect", "Conditional Access", "MFA", "Active Directory"],
  },
  {
    id: "iam-sso",
    title: "Okta SSO and API Security",
    meta: "Identity lab · OAuth 2.0",
    track: "iam",
    tags: ["Identity", "SSO and API"],
    flow: ["Okta setup", "SAML and OIDC", "Token checks", "Negative tests"],
    summary:
      "Single sign-on with Okta and a test API that only accepts valid, correctly scoped tokens.",
    did: [
      "Set up Okta with test users, roles and MFA.",
      "Registered a SAML app and an OIDC client that uses the authorization code flow with PKCE.",
      "Secured a test API so every request is checked for the token's issuer, audience, signature, expiry and scopes.",
      "Ran 6 negative tests (no token, expired, wrong audience, missing scope, tampered and valid) and all 6 returned the expected result.",
    ],
    tools: ["Okta", "SAML", "OIDC", "OAuth 2.0", "JWT", "Postman"],
  },
  {
    id: "iam-jml",
    title: "Joiner-Mover-Leaver Automation",
    meta: "Identity lab · PowerShell",
    track: "iam",
    tags: ["Identity", "Automation"],
    flow: ["HR file", "Role mapping", "Create or change", "Audit log"],
    summary:
      "A PowerShell script that handles new hires, role changes and departures from an HR file.",
    did: [
      "Mapped each department and title to Active Directory groups in a role mapping file.",
      "Joiners get an account in the right OU, a temporary password and the right groups. Movers swap groups. Leavers are disabled and moved to a disabled OU.",
      "Added a dry run mode, safe reruns and an audit log that never records passwords.",
      "Ran it on 20 test account changes: 10 joiners, 5 movers and 5 leavers.",
    ],
    tools: ["PowerShell", "Active Directory", "RBAC", "Audit logging"],
  },
  {
    id: "iam-pam",
    title: "Privileged Access Controls",
    meta: "Identity lab · least privilege",
    track: "iam",
    tags: ["Identity", "Privileged access"],
    flow: ["Inventory", "Separate admins", "Rotate", "Vault"],
    summary:
      "Reducing standing admin access and showing least privilege in practice, mapped to NIST 800-53 AC-2, AC-5 and AC-6.",
    did: [
      "Cut standing privileged group membership with separate admin accounts, Protected Users and Group Policy logon limits.",
      "Set up Windows LAPS to rotate local admin passwords and confirmed the old password stopped working.",
      "Used time-limited group membership for just-in-time access and confirmed it expired on its own.",
      "Set up HashiCorp Vault with a short-lived, one-path policy and showed it was denied everywhere else, with audit logs for both.",
    ],
    tools: ["Windows LAPS", "HashiCorp Vault", "Group Policy", "Active Directory"],
  },
  {
    id: "iam-review",
    title: "Access Review and Governance",
    meta: "Identity lab · governance",
    track: "iam",
    tags: ["Identity", "Governance"],
    flow: ["Seed issues", "Find them", "Fix and ticket", "Report"],
    summary:
      "A full access review cycle from finding to ticket to fix to report, with before and after numbers.",
    did: [
      "Planted orphaned accounts, excess privileges, separation-of-duties conflicts, dormant accounts and an ownerless service account.",
      "Wrote a script that flagged all 13 findings and produced a review sheet for each manager.",
      "Fixed every finding, tracked them in ServiceNow, and reported the results in a Power BI dashboard.",
      "Wrote four procedures: joiner-mover-leaver, privileged access, access review and audit evidence.",
    ],
    tools: ["PowerShell", "ServiceNow", "Power BI", "Separation of duties", "NIST 800-53"],
  },
  {
    id: "ios-auth",
    title: "Authentication in My iOS Apps",
    meta: "Self-employed · 2025 to present",
    track: "iam",
    tags: ["Identity", "Development"],
    flow: ["Sign in", "Roles", "Backend", "Release"],
    summary:
      "Two iOS apps on the App Store, built mainly to practice identity and authentication.",
    did: [
      "Added Sign in with Apple and Google OAuth login.",
      "Used Supabase and a Linux server with security controls for the backend API and user database.",
      "Gave each user role-based permissions on a need-to-know basis.",
      "Protected user data with Face ID using Apple's LocalAuthentication framework.",
    ],
    tools: ["Sign in with Apple", "Google OAuth", "Supabase", "Face ID", "Linux"],
  },
  {
    id: "ad-lab",
    title: "Active Directory Home Lab",
    meta: "Virtual lab",
    track: "both",
    tags: ["Identity", "Windows", "Group Policy"],
    flow: ["Domain controller", "Join workstations", "Users and groups", "Group Policy"],
    summary:
      "A small Windows domain built from scratch in virtual machines, used as the base for most of my other labs.",
    did: [
      "Stood up a domain controller and joined Windows workstations to the domain.",
      "Created users and groups and applied Group Policy to control how endpoints behave.",
      "Reused the environment as the target for detection and vulnerability work.",
    ],
    tools: ["Windows Server", "Active Directory", "Group Policy", "VirtualBox"],
  },
  {
    id: "wazuh",
    title: "Wazuh Detection Lab",
    meta: "Home lab",
    track: "iam",
    tags: ["Blue team", "SIEM"],
    flow: ["Agents", "Telemetry", "Alerts", "Custom rules"],
    summary:
      "Monitoring for the Active Directory lab, with simulated attacks used to test whether anything actually gets caught.",
    did: [
      "Ran Wazuh agents on the lab endpoints and investigated the alerts they raised.",
      "Wrote custom detection rules for simulated attacks.",
      "Used each simulated attack to check that the alerts were clear and useful.",
    ],
    tools: ["Wazuh", "Detection", "Detection rules"],
  },
  {
    id: "helpdesk",
    title: "IT Help Desk Home Lab",
    meta: "Simulated environment",
    track: "it",
    tags: ["Help desk", "Windows"],
    flow: ["Ticket", "Diagnose", "Resolve", "Document"],
    summary:
      "A simulated help desk environment for practicing support and administration across Windows systems.",
    did: [
      "Built a Windows environment with Active Directory and Windows Server.",
      "Practiced support, system administration and troubleshooting.",
      "Handled issues the way a help desk would.",
    ],
    tools: ["Windows Server", "Active Directory", "Troubleshooting"],
  },
  {
    id: "automation",
    title: "Python, PowerShell & Cron Automation",
    meta: "Coursework and labs · ongoing",
    track: "both",
    tags: ["Automation", "Scripting"],
    flow: ["Repeat task", "Script it", "Schedule it", "Verify"],
    summary:
      "Small scripts that remove repeat work, from lab tasks to scheduled jobs.",
    did: [
      "Wrote Python and PowerShell scripts for routine tasks.",
      "Scheduled jobs with cron.",
      "Used Claude Code and Codex daily to build and review code faster.",
    ],
    tools: ["Python", "Scripting", "Cron", "Git"],
  },
  {
    id: "ios",
    title: "Independent iOS Apps",
    meta: "Self-employed · 2025 to present",
    track: "it",
    tags: ["Development", "Shipping"],
    flow: ["Idea", "Build", "Test", "App Store"],
    summary:
      "Apps I design, build and publish myself, handled end to end from first idea to release.",
    did: [
      "Published multiple apps on the Apple App Store.",
      "Designed, built and released the apps myself.",
      "Maintain the apps and ship updates.",
    ],
    tools: ["iOS development", "App Store Connect", "Git"],
  },
];

export const filters = {
  iam: ["All work", "Identity", "SSO and API", "Privileged access", "Governance", "Automation", "Blue team"],
  it: ["All work", "Help desk", "Windows", "Automation", "Development"],
};

export const toolkit = [
  // [name, group, tracks, icon file in assets/icons]  (tracks: "both", one track, or a list)
  ["Microsoft Entra ID", "Identity", "iam", "cloud"],
  ["Okta", "Identity", "iam", "key"],
  ["Conditional Access", "Identity", "iam", "shield"],
  ["Postman", "Identity", "iam", "terminal"],
  ["Windows LAPS", "Privileged access", "iam", "shield"],
  ["HashiCorp Vault", "Privileged access", "iam", "package"],
  ["ServiceNow", "Governance", "iam", "clipboard"],
  ["Power BI", "Governance", "iam", "boxes"],
  ["Wazuh", "Detection", "iam", "eye"],
  ["Microsoft 365", "Systems", "both", "cloud"],
  ["Intune", "Systems", "it", "laptop"],
  ["Active Directory", "Systems", "both", "users"],
  ["Group Policy", "Systems", "both", "folder"],
  ["Windows Server", "Systems", "both", "server"],
  ["Windows 10 / 11", "Systems", "it", "windows"],
  ["macOS", "Systems", "it", "macos"],
  ["VirtualBox", "Systems", "both", "virtualbox"],
  ["OS imaging", "Support", "it", "harddrive"],
  ["Asset tracking", "Support", "it", "clipboard"],
  ["Printers", "Support", "it", "printer"],
  ["Python", "Scripting", "both", "python"],
  ["PowerShell", "Scripting", "both", "powershell"],
  ["Bash and cron", "Scripting", "both", "bash"],
  ["Git and GitHub", "Dev and AI", "both", "github"],
  ["Claude Code", "Dev and AI", "both", "claude"],
  ["Codex", "Dev and AI", "both", "terminal"],
];

export const methods = {
  iam: [
    "Identity and access management",
    "MFA and SSO",
    "SAML, OIDC and OAuth 2.0",
    "Conditional Access",
    "Role-based access control",
    "Joiner-mover-leaver",
    "Access reviews",
    "Separation of duties",
    "Privileged access",
    "Least privilege",
    "Secrets management",
    "NIST 800-53",
  ],
  it: [
    "Help desk and desktop support",
    "Windows and macOS troubleshooting",
    "Active Directory and Group Policy",
    "Microsoft 365 and Intune",
    "OS imaging",
    "Asset tracking",
    "Malware removal",
    "Scripting and automation",
    "Documentation and SOPs",
  ],
};

export const toolFilters = {
  iam: ["All tools", "Identity", "Privileged access", "Governance", "Detection", "Systems", "Scripting", "Dev and AI"],
  it: ["All tools", "Systems", "Support", "Scripting", "Dev and AI"],
};

export const experience = [
  {
    id: "geeks",
    logo: "org-geeks",
    dates: "Nov 2025 to Present",
    kind: "Contract · 1099",
    role: "Identity & Access Support Technician",
    org: "Geeks On Site",
    place: "Client sites",
    stat: ["About 30", "user accounts created"],
    bullets: [
      "Create user accounts (about 30) in Active Directory and Microsoft 365, set permissions, and reset passwords for home and small business clients.",
      "Set up Microsoft multi-factor authentication (MFA) and single sign-on (SSO) on client accounts, and secure routers and Wi-Fi.",
      "Set up users, permissions and Group Policy in Active Directory for IT client firms, keeping accounts organized and secure.",
      "Handle about 16 onsite client calls per month on Windows and macOS.",
    ],
  },
  {
    id: "ios-exp",
    logo: "org-ios",
    dates: "2025 to Present",
    kind: "Self-employed",
    role: "Identity and Authentication iOS Developer",
    org: "Apple App Store",
    place: "Independent",
    stat: ["2", "iOS apps published"],
    bullets: [
      "Build and publish iOS apps with Sign in with Apple and Google OAuth login, backed by Supabase and a Linux server with security controls.",
      "Enforce role-based access in the API on a need-to-know basis, so each user only gets the permissions they need.",
      "Protect user data with Face ID biometric authentication using Apple's LocalAuthentication framework.",
    ],
  },
  {
    id: "metro",
    logo: "org-metro",
    dates: "Nov 2023 to Aug 2025",
    kind: "Access control",
    role: "Access Control Analyst",
    org: "Metro One",
    place: "Edison, NJ · Amazon warehouse site",
    stat: ["150+", "access events per shift"],
    bullets: [
      "Monitored 150+ access events per shift (door openings and badge swipes) across 4 entry points and vendor lanes at a site of 200+ employees.",
      "Investigated alerts with SIEM notes and camera footage, reconstructed incidents from access logs, wrote incident reports, and escalated to the team.",
      "Handled about 12 Tier 1 tickets per week, doing password resets and escalating account lockouts.",
      "Created and issued 100+ pre-approved ID badges to onboarding workers, and trained 3+ new analysts on access monitoring.",
    ],
  },
];

export const education = [
  {
    school: "New Jersey Institute of Technology",
    logo: "org-njit",
    degree: "B.S. Information Technology",
    note: "Concentrations in Cybersecurity, Network & Information Systems, and Database Management",
    dates: "Expected Summer 2027",
    extra: "3.8 GPA",
  },
  {
    school: "Middlesex College",
    logo: "org-middlesex",
    degree: "A.S. Business Information Systems",
    note: "Completed",
    dates: "Jun 2025",
    extra: "",
  },
];

export const skillGroups = [
  ["Security operations", "Log analysis, alert triage, incident reports, access monitoring, Wazuh, Nessus, Wireshark"],
  ["Support and administration", "Windows, macOS, Active Directory, Group Policy, Microsoft 365, Intune, OS imaging"],
  ["Testing and frameworks", "Nmap, Metasploit, Hydra, Kali Linux, MFA, SSO, SAML, OAuth, CVE / CVSS, NIST, OWASP"],
  ["Automation and development", "Python, PowerShell, cron jobs, Git, iOS development"],
];

export const aboutTitle = "About me.";

export const bio = [
  "I'm an identity and access management analyst. For nearly three years I've worked on access: monitoring 150+ access events a shift at Metro One, issuing badges, handling password resets and lockouts, and now setting up accounts, MFA and single sign-on for clients at Geeks On Site.",
  "At home I built an identity lab with Active Directory, Entra ID and Okta that covers MFA, Conditional Access, SSO, joiner-mover-leaver automation, privileged access and access reviews. I hold CompTIA Security+, I'm working toward Microsoft's SC-300 identity and access certification, and I'm a senior at NJIT studying Information Technology.",
];

export const credentials = [
  {
    name: "CompTIA Security+",
    logo: "org-comptia",
    issuer: "CompTIA",
    area: "Cybersecurity",
    status: "Earned",
    earned: true,
  },
  {
    name: "Microsoft Identity and Access Administrator (SC-300)",
    logo: "org-microsoft",
    issuer: "Microsoft",
    area: "Identity and access",
    status: "In progress",
    earned: false,
  },
];

export const labsList = ["TryHackMe rooms", "Home labs on GitHub", "NJIT coursework labs"];
