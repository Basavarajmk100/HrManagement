// --- ROUTING LOGIC ---
function navigate(page) {
  document
    .querySelectorAll(".page-view")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");
  window.scrollTo(0, 0);
  triggerAvatarCheck();
}

// --- HERO SLIDESHOW ---
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;
setInterval(() => {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 5000);

// --- AI MATRIX LOGIC (With 8 Industries, Scrolling, & Fixed Display) ---
// Advanced AI Board Data (Expanded Industries & Icons)
const aiData = [
  {
    id: "tech",
    icon: "ph-cpu",
    title: "Tech & SaaS",
    floatIcon: "ph-code",
    vulns: [
      "Unstructured onboarding disrupting sprints.",
      "High burnout reducing retention.",
      "Data fragmentation across Slack/Jira.",
    ],
    solution:
      "Fractional HR executes seamless onboarding workflows. ESS portal integrated for autonomous leave management. Virtual CHRO deployed for strategic pathing.",
    metric: "85% reduction in admin time",
  },
  {
    id: "gig",
    icon: "ph-moped",
    title: "Logistics & Gig",
    floatIcon: "ph-truck",
    vulns: [
      "Massive liability under Social Security Code.",
      "Remote attendance tracking failures.",
      "High contractor turnover.",
    ],
    solution:
      "Flexi-Workforce engine deploys geo-tagged mobile check-ins. Automated calculation of hourly wages and exact PF/ESIC deductions for gig workers.",
    metric: "100% Social Security compliance",
  },
  {
    id: "health",
    icon: "ph-heartbeat",
    title: "Healthcare",
    floatIcon: "ph-first-aid",
    vulns: [
      "Complex 24/7 shift overlap scheduling.",
      "High burnout among nursing staff.",
      "Strict data privacy/documentation needs.",
    ],
    solution:
      "Dynamic shift management dashboard. Corporate wellness tracking integrated into ESS. Centralized, encrypted secure vault for credentials.",
    metric: "Zero shift-gap errors",
  },
  {
    id: "mfg",
    icon: "ph-factory",
    title: "Manufacturing",
    floatIcon: "ph-hard-hat",
    vulns: [
      "OSHWC Code safety compliance tracking.",
      "Manual wage calculations for factory floor.",
      "Grievance logging inefficiencies.",
    ],
    solution:
      "Dedicated expert manages structural allowance caps to satisfy Wage Code. AI Shield tracks factory floor ER incidents auditably.",
    metric: "Complete Tribunal Protection",
  },
  {
    id: "ecommerce",
    icon: "ph-shopping-cart",
    title: "E-commerce",
    floatIcon: "ph-package",
    vulns: [
      "High seasonal temp-worker turnover.",
      "Complex hourly and milestone payouts.",
      "Inventory staff scheduling conflicts.",
    ],
    solution:
      "Rapid onboarding pipeline for temp staff. Expert execution of milestone-based payroll disbursements avoiding Labour Code violations.",
    metric: "Zero seasonal hiring delays",
  },
  {
    id: "edu",
    icon: "ph-graduation-cap",
    title: "Education",
    floatIcon: "ph-books",
    vulns: [
      "Complex academic calendar leave tracking.",
      "Contract management for visiting faculty.",
      "POSH Compliance mandates.",
    ],
    solution:
      "Academic-specific shared leave calendars. AI generates compliant visiting faculty contracts. Integrated POSH training modules and officers.",
    metric: "100% POSH Audit Pass Rate",
  },
  {
    id: "realestate",
    icon: "ph-buildings",
    title: "Real Estate",
    floatIcon: "ph-blueprint",
    vulns: [
      "Commission-heavy payroll tracking.",
      "Dispersed sales agent attendance.",
      "High compliance risk in construction staff.",
    ],
    solution:
      "Automated commission tracking tied to HR structure. Geo-tagged attendance for on-site sales agents. Strict OSHWC safety checks for field staff.",
    metric: "Flawless Commission Payroll",
  },
  {
    id: "hospitality",
    icon: "ph-martini",
    title: "Hospitality",
    floatIcon: "ph-bed",
    vulns: [
      "24/7 rotational shift headaches.",
      "Service charge & tip disbursement math.",
      "High attrition and grievance rates.",
    ],
    solution:
      "Shift management dashboard prevents operational gaps. Experts handle complex tip disbursement payroll math. Auditable Case Tracking for staff grievances.",
    metric: "Zero tip-disbursement errors",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.getElementById("industry-tabs");
  const outputContainer = document.getElementById("ai-output");
  const titleDisplay = document.getElementById("dash-title");
  const scanner = document.getElementById("ai-scanner");
  const scanText = document.getElementById("scan-text");
  const graphicsContainer = document.getElementById("ai-bg-graphics");

  // Build Industry Tabs
  aiData.forEach((ind, index) => {
    const btn = document.createElement("button");
    btn.className = `ai-tab w-full text-left p-4 rounded-2xl font-bold flex items-center gap-4 text-slate-600 hover:bg-white/50 ${index === 0 ? "active" : ""}`;
    btn.innerHTML = `
                    <div class="ai-icon-bg w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white shadow-sm transition-colors text-slate-400">
                        <i class="ph-bold ${ind.icon}"></i>
                    </div>
                    <span class="text-lg">${ind.title}</span>
                `;

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".ai-tab")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      triggerScan(ind);
    });
    tabsContainer.appendChild(btn);
  });

  // Initial Load
  triggerScan(aiData[0], true);

  function triggerScan(data, isInitial = false) {
    const currentContent = outputContainer.querySelector(".ai-content");
    if (currentContent) currentContent.classList.remove("show");

    titleDisplay.innerText = `${data.title} Architecture`;

    // Handle Floating Vector Graphics Generation
    graphicsContainer.innerHTML = `
                    <i class="ph-fill ${data.floatIcon} absolute text-slate-100/10 text-[150px] -top-10 -left-10 animate-[floatIcon_6s_infinite]"></i>
                    <i class="ph-fill ${data.icon} absolute text-brand-500/5 text-[250px] bottom-0 -right-10 animate-[floatIcon_8s_infinite_reverse]"></i>
                `;

    if (!isInitial) {
      scanner.classList.add("scanning");
      scanText.innerText = "EXTRACTING INDUSTRY VULNERABILITIES...";
      setTimeout(
        () => (scanText.innerText = "MAPPING COMPLIANCE PROTOCOLS..."),
        600,
      );
      setTimeout(
        () => (scanText.innerText = "GENERATING HRAAS SOLUTION..."),
        1200,
      );
    }

    setTimeout(
      () => {
        if (!isInitial) scanner.classList.remove("scanning");

        const vHTML = data.vulns
          .map(
            (v) =>
              `<li class="flex gap-3 text-sm text-slate-400 mb-3"><i class="ph-fill ph-warning-circle text-red-400 text-xl shrink-0"></i> <span>${v}</span></li>`,
          )
          .join("");

        outputContainer.innerHTML = `
                        <div class="ai-content flex flex-col gap-6">
                            <div class="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative z-10">
                                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Detected Vulnerabilities</h4>
                                <ul class="font-mono">${vHTML}</ul>
                            </div>
                            <div class="bg-slate-800 border border-brand-500/30 p-6 rounded-2xl relative overflow-hidden shadow-xl z-10">
                                <div class="absolute -right-10 -top-10 w-32 h-32 bg-brand-500/20 blur-2xl rounded-full"></div>
                                <h4 class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-4 relative z-10">Execution Protocol</h4>
                                <div class="flex items-start gap-3 relative z-10 mb-6">
                                    <i class="ph-fill ph-check-circle text-green-400 text-xl shrink-0 mt-0.5"></i>
                                    <p class="text-slate-300 text-sm leading-relaxed font-medium">${data.solution}</p>
                                </div>
                                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-sm font-bold shadow-md relative z-10 border border-brand-400">
                                    <i class="ph-bold ph-trend-up text-lg"></i> ${data.metric}
                                </div>
                            </div>
                        </div>
                    `;

        setTimeout(
          () =>
            outputContainer.querySelector(".ai-content").classList.add("show"),
          50,
        );
      },
      isInitial ? 0 : 1800,
    );
  }
});

// --- AVATAR LOGIC (Exact files mapped to JPG/AVIF, Dynamic Typing, Fallback applied) ---
const avatarWidget = document.getElementById("hr-avatar-widget");
const avatarImg = document.getElementById("avatar-img");
const bubble = document.getElementById("guide-bubble");
const bubbleContainer = document.getElementById("hr-bubble-container");
let typeInterval;

const avatarFiles = {
  welcoming: "images/girl-updated.png",
  explaining: "images/girl-updated.png",
  analytical: "images/girl-updated.png",
  presenting: "images/girl-updated.png",
  coding: "images/girl-updated.png",
};

const dialogueMap = {
  "page-home": {
    text: "Welcome to itsmyhr! I'm your dedicated Fractional HR Expert.",
    img: avatarFiles.welcoming,
    pos: "pos-br",
  },
  "service-need": {
    text: "Software is just a tool. I actually execute the payroll and admin for you.",
    img: avatarFiles.explaining,
    pos: "pos-bl",
  },
  "ai-board": {
    text: "Select your industry, and watch our AI map out the compliance protocols.",
    img: avatarFiles.analytical,
    pos: "pos-mr",
  },
  features: {
    text: "These are the vibrant capabilities I manage for you daily.",
    img: avatarFiles.presenting,
    pos: "pos-bl",
  },
  contact: {
    text: "Ready to upgrade? Request a pilot demo and let's get started.",
    img: avatarFiles.welcoming,
    pos: "pos-br",
  },
  "page-about": {
    text: "Backed by Kinsoft Technologies. We built the engine from the ground up.",
    img: avatarFiles.coding,
    pos: "pos-br",
  },
};

function typeWriter(text) {
  clearInterval(typeInterval);
  bubble.innerHTML = "";
  let i = 0;
  typeInterval = setInterval(() => {
    if (i < text.length) {
      bubble.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 30);
}

// Extremely robust fallback mechanism to ensure the avatar is NEVER broken

function triggerAvatarCheck() {
  const sections = [
    "page-home",
    "service-need",
    "ai-board",
    "features",
    "contact",
    "page-about",
  ];
  let currentActive = null;

  for (const id of sections) {
    const el = document.getElementById(id);
    if (
      el &&
      el.getBoundingClientRect().top < window.innerHeight * 0.5 &&
      el.getBoundingClientRect().bottom > 0
    ) {
      if (
        el.closest(".page-view").classList.contains("active") ||
        el.classList.contains("active")
      ) {
        currentActive = id;
      }
    }
  }

  if (currentActive && dialogueMap[currentActive]) {
    const config = dialogueMap[currentActive];

    if (bubbleContainer.getAttribute("data-current") === currentActive) return;
    bubbleContainer.setAttribute("data-current", currentActive);

    bubbleContainer.classList.remove("show");

    setTimeout(() => {
      avatarWidget.className = `hr-avatar-widget ${config.pos}`;
      avatarImg.src = config.img;
      bubbleContainer.classList.add("show");
      typeWriter(config.text);
    }, 400);
  }
}

window.addEventListener("scroll", triggerAvatarCheck);

// Initial Trigger
setTimeout(() => {
  bubbleContainer.setAttribute("data-current", "page-home");
  avatarImg.src = avatarFiles.welcoming;
  bubbleContainer.classList.add("show");
  typeWriter(dialogueMap["page-home"].text);
}, 1000);

// Modal Logic
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Trigger Infographic bar animations inside the opened modal
  setTimeout(() => {
    const bars = modal.querySelectorAll(".modal-bar");
    bars.forEach((bar) => {
      bar.style.width = bar.getAttribute("data-width");
    });
  }, 100); // slight delay for smooth visual
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scrolling

  // Reset Infographic bars so they animate again next time
  setTimeout(() => {
    const bars = modal.querySelectorAll(".modal-bar");
    bars.forEach((bar) => {
      bar.style.width = "0";
    });
  }, 400); // wait for modal closing transition
}

// Close modal when clicking outside the content area
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal(this.id);
    }
  });
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal-overlay.active");
    if (activeModal) {
      closeModal(activeModal.id);
    }
  }
});
