// All site content lives here. Edit this file to update projects, experience, tools and links.

export const profile = {
  name: "Usman Zaffar",
  short: "uz",
  email: "732.usman@gmail.com",
  location: "Edison, NJ",
  intro:
    "NJIT Information Technology senior with CompTIA Security+, nearly two years in security operations, and hands-on IT support experience.",
  badge: "Open to work · Edison, NJ",
  facts: [
    ["EDUCATION", "B.S. Information Technology", "NJIT · 3.8 GPA · Summer 2027"],
    ["CERTIFICATION", "CompTIA Security+", "Earned"],
    ["SECURITY", "Security Operations Analyst", "Metro One · 2023 to 2025"],
    ["IT SUPPORT", "Level 2 IT Technician", "Geeks On Site · Current"],
  ],
  contactLine:
    "Open to SOC analyst, security analyst, help desk and IT support roles.",
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
    tagline: "SECURITY OPERATIONS AND BLUE TEAM",
    pillars: [
      ["01 / DETECT", "Turn raw logs into signal."],
      ["02 / INVESTIGATE", "Follow the evidence end to end."],
      ["03 / HARDEN", "Fix it, rescan it, prove it."],
    ],
    badge: "NJIT B.S. Information Technology · Class of 2027 · Security+",
    strip: ["SOC", "BLUE TEAM", "VULN MGMT", "AI SECURITY"],
    workTitle: "Security projects and labs.",
    workIntro:
      "Labs and projects I have built and run myself. Open a card to see what I did.",
    capTitle: "The security cycle.",
    capIntro: "The steps I follow on an incident, from the first alert to the follow up.",
    cycle: ["Detect", "Triage", "Investigate", "Contain", "Recover", "Improve"],
    caps: [
      {
        n: "01",
        title: "Detect and triage",
        text: "Sort real threats from background noise and decide what to look at first.",
      },
      {
        n: "02",
        title: "Investigate and respond",
        text: "Work out how far it reaches, contain it, and write down every step.",
      },
      {
        n: "03",
        title: "Harden and verify",
        text: "Fix the cause, then test again to make sure it worked.",
      },
    ],
    expTitle: "Work experience.",
    contactTitle: "Let's connect.",
  },
  it: {
    label: "IT",
    prompt: "usman@portfolio:~$ whoami --track it",
    tagline: "IT SUPPORT AND SYSTEMS ADMINISTRATION",
    pillars: [
      ["01 / SUPPORT", "Get people working again."],
      ["02 / ADMINISTER", "Users, devices and policy."],
      ["03 / AUTOMATE", "Script the repeat work."],
    ],
    badge: "NJIT B.S. Information Technology · Class of 2027 · Security+",
    strip: ["HELP DESK", "WINDOWS", "MACOS", "ACTIVE DIRECTORY"],
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

// track: "cyber" | "it" | "both". "both" shows on either side of the toggle.
// Optional: add  links: [{ label: "View on GitHub", url: "https://github.com/..." }]  to any project
// and the links appear inside the expanded card. See docs/EDITING-GUIDE.md.
export const projects = [
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
    tools: ["Wazuh", "Detection", "Detection rules"],
  },
  {
    id: "nessus",
    title: "Vulnerability Scanning with Nessus",
    meta: "Home lab",
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
    tags: ["Blue team", "Phishing"],
    flow: ["Alert", "Packet capture", "Pivot", "Write-up"],
    summary:
      "Guided SOC investigations that build the habits an analyst uses every day.",
    did: [
      "Hunted threats through logs and telemetry.",
      "Analyzed traffic in Wireshark to follow suspicious activity.",
      "Investigated phishing emails and documented the findings.",
    ],
    tools: ["Wireshark", "Detection", "Threat hunting"],
  },
  {
    id: "secure-ai",
    title: "Secure AI Agent Lab",
    meta: "In progress · 2026",
    track: "cyber",
    tags: ["AI security", "Python"],
    flow: ["Vulnerable agent", "Attacks", "Hardening", "Retest"],
    summary:
      "A Python lab around AI agent security: build an agent that can use tools, attack it, then rebuild it with proper controls.",
    did: [
      "Building a deliberately vulnerable agent that can call tools.",
      "Planning attacks against it, then a hardened rebuild to compare results.",
      "Following the structure of the public AI Security Projects collection on secure AI agents.",
    ],
    tools: ["Python", "Scripting", "API security"],
  },
  {
    id: "kali-lab",
    title: "Cybersecurity Home Lab",
    meta: "Virtual lab",
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
    meta: "Isolated lab",
    track: "cyber",
    tags: ["Blue team", "Malware"],
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
    meta: "Defensive research",
    track: "cyber",
    tags: ["Hardware", "Blue team"],
    flow: ["Build", "Observe", "Detect", "Defend"],
    summary:
      "A functional hardware keylogger built to understand physical attack paths and how to defend against them.",
    did: [
      "Built the device to study how physical implants behave.",
      "Looked at how device control, logging and user awareness reduce the risk.",
      "Used the project to get better at thinking about endpoint protection.",
    ],
    tools: ["Hardware security", "Endpoint protection", "Device control"],
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
  cyber: ["All work", "Blue team", "Red team", "Vuln management", "AI security", "Identity", "Automation"],
  it: ["All work", "Help desk", "Windows", "Automation", "Development"],
};

export const toolkit = [
  // [name, group, tracks, icon file in assets/icons]
  ["Wazuh", "Detection", "cyber", "eye"],
  ["Nessus", "Detection", "cyber", "scan"],
  ["Wireshark", "Detection", "cyber", "wireshark"],
  ["Nmap", "Offensive", "cyber", "network"],
  ["Metasploit", "Offensive", "cyber", "metasploit"],
  ["Hydra", "Offensive", "cyber", "key"],
  ["Kali Linux", "Offensive", "cyber", "kali"],
  ["DVWA", "Offensive", "cyber", "bug"],
  ["TryHackMe", "Training", "cyber", "tryhackme"],
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
  cyber: [
    "Security monitoring",
    "Incident response",
    "SIEM and log analysis",
    "Phishing analysis",
    "Vulnerability management",
    "Threat hunting",
    "Active Directory",
    "MFA and SSO",
    "NIST and OWASP",
    "Report writing",
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
  cyber: ["All tools", "Detection", "Offensive", "Training", "Systems", "Scripting", "Dev and AI"],
  it: ["All tools", "Systems", "Support", "Scripting", "Dev and AI"],
};

export const experience = [
  {
    id: "geeks",
    logo: "org-geeks",
    dates: "Nov 2025 to Present",
    kind: "Contract · 1099",
    role: "On-call IT Technician (Level 2)",
    org: "Geeks On Site",
    place: "Client sites",
    stat: ["4 to 5", "on-call jobs per week"],
    bullets: [
      "Resolve 4 to 5 on-call service jobs a week for Windows and macOS clients.",
      "Remove viruses and malware, install operating systems, and troubleshoot issues.",
      "Work independently across a variety of client environments.",
    ],
  },
  {
    id: "ios-exp",
    logo: "org-ios",
    dates: "2025 to Present",
    kind: "Self-employed",
    role: "Independent iOS App Developer",
    org: "Apple App Store",
    place: "Independent",
    stat: ["Multiple", "apps published"],
    bullets: [
      "Design, build and publish iOS apps independently.",
      "Maintain the apps and release updates.",
    ],
  },
  {
    id: "metro",
    logo: "org-metro",
    dates: "Nov 2023 to Aug 2025",
    kind: "Security operations",
    role: "Security Operations Analyst",
    org: "Metro One",
    place: "Edison, NJ · Amazon warehouse site",
    stat: ["150+", "access events per shift"],
    bullets: [
      "Monitored 150+ access events per shift across 4 entry points for a site of 200+ employees.",
      "Investigated incidents using logs and surveillance data, wrote detailed reports, and escalated unusual activity per incident response procedures.",
      "Trained new analysts on tools and SOPs and kept documentation current.",
    ],
  },
  {
    id: "mastercard",
    logo: "org-mastercard",
    dates: "Nov 2025",
    kind: "Virtual job simulation · Forage",
    role: "Cybersecurity Analyst Simulation",
    org: "Mastercard",
    place: "Online",
    stat: ["Phishing", "analysis and response"],
    bullets: [
      "Completed Mastercard's cybersecurity analyst job simulation.",
      "Analyzed phishing emails and identified spoofed senders and risky user behavior.",
      "Recommended containment steps such as credential resets and access reviews.",
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
  "I'm a senior at NJIT studying Information Technology, and I hold CompTIA Security+. I've worked in security operations and in hands-on IT support, and I'm looking for a role that uses both.",
  "At Metro One I monitored access and investigated incidents at a busy warehouse. Right now I work on call as a Level 2 technician and build iOS apps on my own. At home I run labs for Active Directory, Wazuh, Nessus and AI agent security.",
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
    name: "Microsoft Azure Fundamentals (AZ-900)",
    logo: "org-microsoft",
    issuer: "Microsoft",
    area: "Cloud",
    status: "Planned",
    earned: false,
  },
];

export const labsList = ["TryHackMe rooms", "Home labs on GitHub", "NJIT coursework labs"];
