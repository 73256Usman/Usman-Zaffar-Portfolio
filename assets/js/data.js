// All site content lives here. Edit this file to update projects, experience, tools and links.

export const profile = {
  name: "Usman Zaffar",
  short: "uz",
  email: "732.usman@gmail.com",
  location: "Edison, NJ",
  github: "https://github.com/73256Usman",
  linkedin: "https://www.linkedin.com/in/usmanzaffar/",
  resumes: {
    cyber: "resume/Usman-Zaffar-Cybersecurity-Resume.pdf",
    it: "resume/Usman-Zaffar-IT-Resume.pdf",
  },
};

// Text that changes when the visitor flips the Cyber / IT switch.
export const tracks = {
  cyber: {
    label: "Cyber",
    prompt: "usman@portfolio:~$ whoami --track cyber",
    tagline: "DETECT. INVESTIGATE. DEFEND.",
    intro:
      "Security analyst in training with real operations experience. I build labs, watch the alerts, and write up what I find.",
    pillars: [
      ["01 / DETECT", "Turn raw logs into signal."],
      ["02 / INVESTIGATE", "Follow the evidence end to end."],
      ["03 / HARDEN", "Fix it, rescan it, prove it."],
    ],
    badge: "NJIT B.S. Information Technology · Security+ · 2027",
    strip: ["SOC", "BLUE TEAM", "VULN MGMT", "AI SECURITY"],
    workTitle: "Labs. Evidence. Detections.",
    workIntro:
      "Home labs, coursework and research. Each one shows the setup, what I did and the tools involved.",
    capTitle: "How I work.",
    caps: [
      {
        n: "01",
        title: "Detection & monitoring",
        text: "Wazuh agents, alert triage and custom rules for simulated attacks.",
        tags: ["Wazuh", "SIEM", "Log analysis", "Threat hunting"],
      },
      {
        n: "02",
        title: "Investigation & response",
        text: "Phishing, packet captures and malware in isolated VMs, written up clearly.",
        tags: ["Phishing analysis", "Wireshark", "Incident response", "Malware analysis"],
      },
      {
        n: "03",
        title: "Vulnerability & hardening",
        text: "Scan, fix, rescan. Identity, endpoints and Windows domain security.",
        tags: ["Nessus", "Active Directory", "Group Policy", "CVE / CVSS"],
      },
    ],
    expTitle: "Operations. Support. Delivery.",
    aboutTitle: "Security is a habit.",
    contactTitle: "Let's talk security.",
    contactLine:
      "Open to SOC analyst, security analyst and entry level AI security roles.",
  },
  it: {
    label: "IT",
    prompt: "usman@portfolio:~$ whoami --track it",
    tagline: "SUPPORT. FIX. DOCUMENT.",
    intro:
      "IT technician who fixes real problems for real clients. Windows, macOS, Active Directory and the automation that saves everyone time.",
    pillars: [
      ["01 / SUPPORT", "Get people working again."],
      ["02 / ADMINISTER", "Users, devices and policy."],
      ["03 / AUTOMATE", "Script the repeat work."],
    ],
    badge: "NJIT B.S. Information Technology · Security+ · 2027",
    strip: ["HELP DESK", "WINDOWS", "MACOS", "ACTIVE DIRECTORY"],
    workTitle: "Systems. Fixes. Automation.",
    workIntro:
      "Home labs, client work and apps I have shipped. Each one shows the setup, what I did and the tools involved.",
    capTitle: "How I work.",
    caps: [
      {
        n: "01",
        title: "Support & troubleshooting",
        text: "On-call jobs for Windows and macOS clients, from virus removal to OS installs.",
        tags: ["Windows", "macOS", "Troubleshooting", "Printers"],
      },
      {
        n: "02",
        title: "Administration",
        text: "Domain controllers, users, groups, Group Policy and endpoint management.",
        tags: ["Active Directory", "Group Policy", "Microsoft 365", "Intune"],
      },
      {
        n: "03",
        title: "Automation & delivery",
        text: "Python, PowerShell and cron jobs, plus iOS apps shipped to the App Store.",
        tags: ["Python", "PowerShell", "Cron", "OS imaging"],
      },
    ],
    expTitle: "Support. Systems. Shipping.",
    aboutTitle: "Fix it. Then document it.",
    contactTitle: "Let's get to work.",
    contactLine:
      "Open to help desk, desktop support, service desk and IT technician roles.",
  },
};

// track: "cyber" | "it" | "both". "both" shows on either side of the toggle.
export const projects = [
  {
    id: "ad-lab",
    title: "Active Directory Home Lab",
    meta: "Virtual lab · 2025",
    track: "both",
    tags: ["Identity", "Windows Server", "Group Policy"],
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
    meta: "Home lab · 2025",
    track: "cyber",
    tags: ["Blue team", "SIEM"],
    flow: ["Agents", "Telemetry", "Alerts", "Custom rules"],
    summary:
      "Monitoring for the Active Directory lab, with simulated attacks used to test whether anything actually gets caught.",
    did: [
      "Ran Wazuh agents on the lab endpoints and investigated the alerts they raised.",
      "Wrote custom detection rules for simulated attacks.",
      "Used each simulated attack to check that the alerts were clear and useful.",
    ],
    tools: ["Wazuh", "Windows endpoints", "Detection rules"],
  },
  {
    id: "nessus",
    title: "Vulnerability Scanning with Nessus",
    meta: "Home lab · 2025",
    track: "cyber",
    tags: ["Vuln management"],
    flow: ["Scan", "Prioritize", "Remediate", "Rescan"],
    summary:
      "A full scan, fix and verify cycle against my own lab, the same loop a vulnerability management team runs.",
    did: [
      "Scanned the lab with Nessus Essentials.",
      "Worked through the findings and fixed them.",
      "Rescanned to confirm the issues were actually closed.",
    ],
    tools: ["Nessus Essentials", "CVE / CVSS", "Windows hardening"],
  },
  {
    id: "thm",
    title: "TryHackMe SOC Investigations",
    meta: "Hands-on rooms · ongoing",
    track: "cyber",
    tags: ["Blue team", "Forensics"],
    flow: ["Alert", "Packet capture", "Pivot", "Write-up"],
    summary:
      "Guided SOC style investigations that build the day to day habits of an analyst.",
    did: [
      "Hunted threats through logs and telemetry.",
      "Analyzed traffic in Wireshark to follow suspicious activity.",
      "Investigated phishing emails and documented the findings.",
    ],
    tools: ["Wireshark", "TryHackMe", "Threat hunting"],
  },
  {
    id: "secure-ai",
    title: "Secure AI Agent Lab",
    meta: "In progress · 2026",
    track: "cyber",
    tags: ["AI security", "Python"],
    flow: ["Vulnerable agent", "Attacks", "Hardening", "Retest"],
    summary:
      "A Python lab around AI agent security: build a tool using agent, attack it, then rebuild it with proper controls.",
    did: [
      "Building a deliberately vulnerable agent that can call tools.",
      "Planning attacks against it, then a hardened rebuild to compare results.",
      "Following the structure of the public AI Security Projects collection on secure AI agents.",
    ],
    tools: ["Python", "LLM agents", "API security"],
  },
  {
    id: "kali-lab",
    title: "Cybersecurity Home Lab",
    meta: "Virtual lab · 2025",
    track: "cyber",
    tags: ["Red team", "Network security"],
    flow: ["Isolate", "Scan", "Exploit", "Snapshot"],
    summary:
      "An isolated attack and defense network used to practice the full cycle safely.",
    did: [
      "Built a VirtualBox lab with Kali Linux as the attacker and Metasploitable2 and DVWA as targets.",
      "Practiced scanning, exploitation, password testing and traffic analysis.",
      "Kept the network isolated and used snapshots to reset between runs.",
    ],
    tools: ["Kali Linux", "Nmap", "Metasploit", "Hydra", "Wireshark"],
  },
  {
    id: "malware",
    title: "Malware Analysis in VMs",
    meta: "Isolated lab · 2025",
    track: "cyber",
    tags: ["Blue team", "Forensics"],
    flow: ["Isolate", "Detonate", "Observe", "Document"],
    summary:
      "Safe analysis of malicious samples inside disposable virtual machines.",
    did: [
      "Analyzed samples only inside isolated virtual machines.",
      "Observed how the samples behaved.",
      "Documented what I found.",
    ],
    tools: ["Virtual machines", "Sandboxing", "Analysis notes"],
  },
  {
    id: "usb",
    title: "USB Hardware Keylogger Research",
    meta: "Defensive research · 2025",
    track: "cyber",
    tags: ["Hardware", "Endpoint"],
    flow: ["Build", "Observe", "Detect", "Defend"],
    summary:
      "A functional hardware keylogger built to understand physical attack paths and how to defend against them.",
    did: [
      "Built the device to study how physical implants behave.",
      "Looked at how device control, logging and awareness training reduce the risk.",
      "Used the project to sharpen my endpoint protection thinking.",
    ],
    tools: ["Hardware security", "Endpoint protection", "Device control"],
  },
  {
    id: "helpdesk",
    title: "IT Help Desk Home Lab",
    meta: "Simulated environment · 2025",
    track: "it",
    tags: ["Help desk", "Windows"],
    flow: ["Ticket", "Diagnose", "Resolve", "Document"],
    summary:
      "A simulated help desk environment for practicing support and administration across Windows systems.",
    did: [
      "Built a Windows environment with Active Directory and Windows Server.",
      "Practiced real world support skills, system administration and troubleshooting.",
      "Worked across Windows based systems the way a help desk would.",
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
    tools: ["Python", "PowerShell", "Cron", "Git"],
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
  cyber: ["All work", "Blue team", "Red team", "Vuln management", "AI security", "Forensics"],
  it: ["All work", "Help desk", "Windows", "Automation", "Development"],
};

export const toolkit = [
  // [name, group, tracks]
  ["Wazuh", "Detection", "cyber"],
  ["Nessus", "Detection", "cyber"],
  ["Wireshark", "Detection", "cyber"],
  ["Nmap", "Offensive", "cyber"],
  ["Metasploit", "Offensive", "cyber"],
  ["Hydra", "Offensive", "cyber"],
  ["Kali Linux", "Offensive", "cyber"],
  ["DVWA", "Offensive", "cyber"],
  ["TryHackMe", "Detection", "cyber"],
  ["Microsoft 365", "Systems", "both"],
  ["Intune", "Systems", "it"],
  ["Active Directory", "Systems", "both"],
  ["Group Policy", "Systems", "both"],
  ["Windows Server", "Systems", "both"],
  ["Windows 10 / 11", "Systems", "it"],
  ["macOS", "Systems", "it"],
  ["VirtualBox", "Systems", "both"],
  ["OS imaging", "Systems", "it"],
  ["Asset tracking", "Systems", "it"],
  ["Printers", "Systems", "it"],
  ["Python", "Languages", "both"],
  ["PowerShell", "Languages", "both"],
  ["Bash and cron", "Languages", "both"],
  ["Git and GitHub", "Languages", "both"],
  ["Claude Code", "Languages", "both"],
  ["Codex", "Languages", "both"],
];

export const methods = {
  cyber: [
    "MFA",
    "SSO",
    "SAML",
    "OAuth",
    "CVE / CVSS",
    "NIST framework",
    "OWASP",
    "Phishing analysis",
    "Incident response",
    "Log analysis",
    "Risk assessment",
  ],
  it: [
    "Ticket documentation",
    "Root cause troubleshooting",
    "Account and access management",
    "Patching and updates",
    "Endpoint management",
    "Customer communication",
    "SOP writing",
  ],
};

export const toolFilters = {
  cyber: ["All tools", "Detection", "Offensive", "Systems", "Languages"],
  it: ["All tools", "Systems", "Languages"],
};

export const experience = [
  {
    id: "geeks",
    dates: "Nov 2025 to Present",
    kind: "Contract · 1099",
    role: "On-call IT Technician (Level 2)",
    org: "Geeks On Site",
    place: "Client sites",
    stat: ["4 to 5", "on-call jobs per week"],
    bullets: {
      it: [
        "Complete 4 to 5 on-call service jobs a week for Windows and macOS clients.",
        "Handle OS installs, troubleshooting and day to day fixes on site.",
        "Explain what went wrong and what was done in plain language.",
      ],
      cyber: [
        "Remove viruses and malware from client Windows and macOS machines.",
        "Triage infected systems on site and restore them to a clean working state.",
        "Install and reinstall operating systems for clients.",
      ],
    },
  },
  {
    id: "ios-exp",
    dates: "2025 to Present",
    kind: "Self-employed",
    role: "Independent iOS App Developer",
    org: "Apple App Store",
    place: "Independent",
    stat: ["Multiple", "apps published"],
    bullets: {
      it: [
        "Design, build and publish iOS apps on my own.",
        "Maintain the apps and ship updates.",
        "Use Git and AI coding tools daily to move faster.",
      ],
      cyber: [
        "Build and publish iOS apps end to end, including release and updates.",
        "Use Git and AI coding tools daily.",
      ],
    },
  },
  {
    id: "mastercard",
    dates: "Nov 2025",
    kind: "Virtual job simulation · Forage",
    role: "Cybersecurity Analyst Simulation",
    org: "Mastercard",
    place: "Online",
    stat: ["M365", "phishing analysis"],
    bullets: {
      it: [
        "Worked through a Mastercard security awareness simulation as a security analyst.",
        "Reviewed Microsoft 365 phishing scenarios and recommended responses.",
      ],
      cyber: [
        "Analyzed malicious emails and simulations, spotting spoofed senders and risky user behavior.",
        "Investigated compromised accounts and recommended containment such as credential resets and access reviews.",
        "Reported weaknesses and proposed targeted mitigations.",
      ],
    },
  },
  {
    id: "metro",
    dates: "Nov 2023 to Aug 2025",
    kind: "Full time",
    role: "Security Operations Analyst",
    org: "Metro One",
    place: "Edison, NJ · Amazon warehouse site",
    stat: ["150+", "access events per shift"],
    bullets: {
      cyber: [
        "Monitored 150+ access events per shift across 4 entry points for a site of 200+ employees.",
        "Investigated incidents using system activity, access logs and surveillance data, and wrote detailed reports.",
        "Escalated unusual activity following incident response procedures.",
        "Kept policy compliance on track through documentation and system reviews, and trained new analysts on tools and SOPs.",
      ],
      it: [
        "Worked with physical security systems that run on IT infrastructure.",
        "Managed access at high risk vendor lanes and four entry points.",
        "Kept documentation and SOPs current and trained new analysts on the tools.",
      ],
    },
  },
];

export const education = [
  {
    school: "New Jersey Institute of Technology",
    degree: "B.S. Information Technology",
    note: "Concentrations in Cybersecurity, Network & Information Systems, and Database Management",
    dates: "Expected Summer 2027",
    extra: "3.8 GPA",
  },
  {
    school: "Middlesex College",
    degree: "A.S. Business Information Systems",
    note: "Completed",
    dates: "Jun 2025",
    extra: "",
  },
];

export const skillGroups = {
  cyber: [
    ["Security operations", "Log analysis, alert triage, incident reports, access monitoring"],
    ["Offense and testing", "Nmap, Metasploit, Hydra, DVWA, Kali Linux"],
    ["Identity and frameworks", "MFA, SSO, SAML, OAuth, CVE / CVSS, NIST, OWASP"],
    ["Automation", "Python, PowerShell, cron jobs"],
  ],
  it: [
    ["Support", "Windows, macOS, virus removal, OS installs, printers"],
    ["Administration", "Active Directory, Group Policy, Microsoft 365, Intune"],
    ["Operations", "OS imaging, asset and inventory tracking, documentation"],
    ["Automation", "Python, PowerShell, cron jobs"],
  ],
};

export const bio = {
  cyber: [
    "I am a senior at NJIT studying Information Technology with a Cybersecurity concentration. Before school was done I was already working in security operations, watching access events at a busy warehouse site and writing up incidents.",
    "Outside of work I build labs: a Windows domain, Wazuh monitoring, Nessus scans, and an AI agent security project I am working on now. I like the loop of break it, detect it, fix it and prove it.",
  ],
  it: [
    "I am a senior at NJIT studying Information Technology. Right now I work on call for Geeks On Site, fixing Windows and macOS problems for clients, and I publish my own iOS apps on the side.",
    "I enjoy the practical side of IT: getting someone unstuck, building a domain that behaves, and scripting the boring parts so they never come back.",
  ],
};

export const credentials = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    area: "Cybersecurity",
    status: "Earned",
    earned: true,
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    area: "Cloud",
    status: "Planned",
    earned: false,
  },
];

export const labsList = ["TryHackMe rooms", "Home labs on GitHub", "NJIT coursework labs"];
