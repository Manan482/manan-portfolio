export const personalInfo = {
  name: "Manan A Mahajan",
  shortName: "Manan",
  brandLogo: "MANAN.DEV",
  heroSubtitle: "Software Development Engineer & Architect",
  roles: [
    "Software Development Engineer",
    "Java / Spring Specialist",
    "Cloud & DevOps Architect",
    "Creative Web Developer"
  ],
  bio: "B.Tech Computer Science student at VIT Vellore ('27) and aspiring Software Development Engineer with deep expertise in Java, Spring Boot, MongoDB, Microservices architecture, AWS cloud computing, and award-winning frontend design.",
  email: "mananmahajan31@gmail.com",
  phone: "+91 6364533214",
  location: "Hubballi, Karnataka, India",
  college: "Vellore Institute of Technology (VIT), Vellore",
  cgpa: "7.87 / 10",
  socials: {
    whatsapp: "https://wa.me/916364533214?text=Hi%20Manan,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!",
    linkedin: "https://www.linkedin.com/in/manan-mahajan-30bb0228a/",
    github: "https://github.com/Manan482",
    instagram: "https://www.instagram.com/manan.mahajan.944?igsi=aHF6YzB5N25kcDdl",
    researchPaper: "https://www.ijprems.com/ijprems-paper/international-vs-national-learning-pros-and-cons"
  },
  images: {
    heroReal: "/assets/manan_hero_real.png",
    heroIronMan: "/assets/manan_hero_ironman.png",
    cutout: "/assets/manan_hero_real.png",
    studio: "/assets/manan_portrait_studio.jpg",
    topAngle: "/assets/manan_portrait_topangle.jpg",
    avatar: "/assets/manan_avatar_3d.jpg",
    avatar3d: "/assets/manan_avatar_3d.jpg"
  }
};

export const technicalSkills = [
  {
    category: "Languages",
    skills: ["Java (Advanced)", "Python", "C++", "JavaScript (ES6+)", "SQL", "HTML5/CSS3"]
  },
  {
    category: "Frameworks & Backend",
    skills: ["Spring Boot", "Spring Framework", "React.js", "Node.js", "Express.js", "FastAPI"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda)", "CI/CD Pipelines", "Git / GitHub"]
  },
  {
    category: "Databases & Architecture",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Database Design", "NoSQL", "Microservices"]
  },
  {
    category: "Core Engineering",
    skills: ["Data Structures & Algorithms", "OOP & Design Patterns", "System Design", "REST API Design", "JUnit Testing", "Agile & Scrum"]
  }
];

export const projects = [
  {
    id: "sheet-pilot",
    title: "Sheet-Pilot",
    category: "Data Workspace & Formula Engine",
    tag: "TypeScript • Canvas • AST",
    accentColor: "#10b981",
    summary: "High-performance tabular data workspace with PR-style cell diffing, AST-based Excel formula engine, automated data sanitization, and living .xlsx export.",
    description: "Engineered a 100% local-first high-performance tabular data workspace. Implemented an AST-based Excel formula evaluation engine, PR-style cell-level diffing, automated data sanitization algorithms, and living .xlsx export capabilities with zero external server dependency.",
    tech: ["TypeScript", "React", "HTML5 Canvas", "AST Parser", "Excel Engine", "Local-First"],
    highlight: "100% Local-First Engine with AST-Based Excel Formula Parsing & Cell Diffing",
    github: "https://github.com/Manan482/Sheet-Pilot",
    live: "https://github.com/Manan482/Sheet-Pilot"
  },
  {
    id: "customer-churn-ai",
    title: "Customer Churn & Revenue Impact AI",
    category: "Predictive ML & Financial Analytics",
    tag: "Python • Scikit-Learn • ML",
    accentColor: "#ec4899",
    summary: "AI platform predicting customer churn probability, risk tier segmentation, and estimating potential financial revenue loss.",
    description: "Developed an AI-powered platform to predict customer churn, segment users by risk matrix, and estimate projected revenue loss. Built predictive machine learning classification models, financial risk-at-large analytics, and interactive decision dashboards.",
    tech: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "FastAPI", "Financial Analytics"],
    highlight: "Predictive Churn Risk Classification with Automated Revenue-at-Risk Quantifier",
    github: "https://github.com/Manan482/Customer-Churn-Revenue-Impact-AI",
    live: "https://github.com/Manan482/Customer-Churn-Revenue-Impact-AI"
  },
  {
    id: "social-media-analyzer",
    title: "Social Media Content Analyzer",
    category: "AI & NLP Platform",
    tag: "Python • FastAPI • NLP",
    accentColor: "#3b82f6",
    summary: "OCR-based multi-platform engagement scoring across 5 networks with automated viral hook generation and cross-platform publishing strategies.",
    description: "An advanced, interactive, and production-ready Social Media Content Analyzer that ingests documents and media, performs deep multi-dimensional engagement scoring across 5 major platforms (X, LinkedIn, Instagram, Threads, Facebook), and generates viral hooks and platform-specific publishing strategies with automated test coverage.",
    tech: ["Python", "FastAPI", "PyPDF", "Tesseract OCR", "NLP", "Pydantic", "TypeScript"],
    highlight: "Multi-Platform Engagement Scoring across 5 Major Social Networks",
    github: "https://github.com/Manan482/Social-Media-Content-Analyzer",
    live: "https://github.com/Manan482/Social-Media-Content-Analyzer"
  },
  {
    id: "violence-detection",
    title: "Real-Time Violence Detection System",
    category: "Computer Vision & Deep Learning",
    tag: "OpenCV • CNNs • Python",
    accentColor: "#ef4444",
    summary: "Real-time surveillance AI pipeline achieving 85% violence detection accuracy across dynamic live video feeds.",
    description: "A real-time violence detection system in live surveillance video feeds. Implemented Haar Cascade classifiers, optical flow motion analysis, and convolutional neural networks (CNNs) for multi-person activity recognition and dynamic threat classification, achieving 85% accuracy across 10+ live test streams.",
    tech: ["Python", "OpenCV", "Deep Learning (CNN)", "Optical Flow", "Haar Cascades", "Surveillance AI"],
    highlight: "85% Threat Detection Accuracy across Live Dynamic Video Streams",
    github: "https://github.com/Manan482/Violence-detection-in-live-video-",
    live: "https://github.com/Manan482/Violence-detection-in-live-video-"
  },
  {
    id: "sneakom-ecommerce",
    title: "Sneakom — E-Commerce Footwear Platform",
    category: "Full Stack Commerce",
    tag: "JavaScript • Responsive Web",
    accentColor: "#f59e0b",
    summary: "Online sneaker e-commerce purchasing platform with interactive catalog, category filtering, dynamic shopping cart, and smooth UI.",
    description: "An interactive online sneaker purchasing platform featuring a responsive product catalogue, category-based dynamic filtering, stateful shopping cart orchestration, product showcase cards, and streamlined checkout user experience.",
    tech: ["HTML5", "CSS3", "JavaScript", "REST APIs", "State Management", "Responsive UI"],
    highlight: "Responsive 3D Shoe Cards & Zero-Lag Shopping Cart Sync",
    github: "https://github.com/Manan482/Sneakom",
    live: "https://github.com/Manan482/Sneakom"
  },
  {
    id: "microservices-banking",
    title: "Enterprise Banking Microservices Engine",
    category: "Distributed Backend Systems",
    tag: "Java 21 • Spring Boot • Docker",
    accentColor: "#8b5cf6",
    summary: "Resilient financial microservice architecture with transactional integrity, MongoDB persistence, and JUnit automation.",
    description: "Architected a scalable enterprise microservices backend leveraging Spring Boot and MongoDB. Built isolated REST APIs, transaction isolation, comprehensive JUnit unit testing suites, and automated Dockerized service mesh deployment for high-reliability financial operations.",
    tech: ["Java 21", "Spring Boot", "Spring Data", "MongoDB", "JUnit", "Docker", "AWS"],
    highlight: "Sub-50ms Transaction Processing & High-Throughput REST APIs",
    github: "https://github.com/Manan482",
    live: "https://github.com/Manan482"
  }
];

export const services = [
  {
    id: "backend-microservices",
    title: "Microservices & Cloud Backend",
    tag: "Corporate",
    color: "#648c11",
    description: "High-performance enterprise backend systems built on Java 21, Spring Boot, MongoDB, and AWS cloud infrastructure with automated CI/CD pipelines.",
    summary: "High-performance enterprise backend systems built on Java 21, Spring Boot, MongoDB, and AWS cloud infrastructure with automated CI/CD pipelines.",
    points: [
      "Decoupled Microservice Architectures",
      "Spring Boot RESTful & GraphQL APIs",
      "High-Throughput Database Design (MongoDB/SQL)",
      "Automated Docker & AWS CI/CD Pipelines",
      "Robust JUnit & Mockito Test Automation"
    ],
    deliverables: [
      "Decoupled Microservice Architectures",
      "Spring Boot RESTful & GraphQL APIs",
      "High-Throughput Database Design (MongoDB/SQL)",
      "Automated Docker & AWS CI/CD Pipelines",
      "Robust JUnit & Mockito Test Automation"
    ]
  },
  {
    id: "ai-computer-vision",
    title: "AI & Computer Vision Systems",
    tag: "Intelligence",
    color: "#1d4ed8",
    description: "Production-ready machine learning, natural language processing, and real-time computer vision pipelines powered by OpenCV and CNNs.",
    summary: "Production-ready machine learning, natural language processing, and real-time computer vision pipelines powered by OpenCV and CNNs.",
    points: [
      "Real-time Video Threat & Motion Detection",
      "OCR Document & Media Parsing (Tesseract)",
      "Multi-Platform Engagement Scoring Engines",
      "FastAPI Async ML Model Serving",
      "High-Accuracy Neural Network Fine-Tuning"
    ],
    deliverables: [
      "Real-time Video Threat & Motion Detection",
      "OCR Document & Media Parsing (Tesseract)",
      "Multi-Platform Engagement Scoring Engines",
      "FastAPI Async ML Model Serving",
      "High-Accuracy Neural Network Fine-Tuning"
    ]
  },
  {
    id: "fullstack-platforms",
    title: "Full-Stack Web Applications",
    tag: "Engineering",
    color: "#b45309",
    description: "Modern, responsive, end-to-end web applications crafted with React, Node.js, Express, and high-speed data flow architectures.",
    summary: "Modern, responsive, end-to-end web applications crafted with React, Node.js, Express, and high-speed data flow architectures.",
    points: [
      "Responsive React Component Libraries",
      "Secure JWT & OAuth Authentication Systems",
      "Interactive E-Commerce & Checkout Portals",
      "Dynamic State Management & RESTful Sync",
      "Cross-Platform Performance Optimization"
    ],
    deliverables: [
      "Responsive React Component Libraries",
      "Secure JWT & OAuth Authentication Systems",
      "Interactive E-Commerce & Checkout Portals",
      "Dynamic State Management & RESTful Sync",
      "Cross-Platform Performance Optimization"
    ]
  },
  {
    id: "creative-frontend",
    title: "Awwwards-Level Creative UI",
    tag: "Motion & Craft",
    color: "#7e22ce",
    description: "Bespoke digital experiences featuring cinematic GSAP animations, 3D math transformations, custom sound design, and butter-smooth scrolling.",
    summary: "Bespoke digital experiences featuring cinematic GSAP animations, 3D math transformations, custom sound design, and butter-smooth scrolling.",
    points: [
      "Smooth Kinetic Scrolling (Lenis & GSAP)",
      "3D Spatial Card Carousels & Physics Reticles",
      "Interactive Audio Feedback (Web Audio API)",
      "High-Contrast Glassmorphism & Micro-Interactions",
      "Pixel-Perfect Mobile-First Responsive Design"
    ],
    deliverables: [
      "Smooth Kinetic Scrolling (Lenis & GSAP)",
      "3D Spatial Card Carousels & Physics Reticles",
      "Interactive Audio Feedback (Web Audio API)",
      "High-Contrast Glassmorphism & Micro-Interactions",
      "Pixel-Perfect Mobile-First Responsive Design"
    ]
  }
];

export const educationList = [
  {
    institution: "Vellore Institute of Technology (VIT), Vellore",
    degree: "B.Tech in Computer Science and Engineering",
    period: "August 2023 – May 2027",
    score: "CGPA: 7.87 / 10",
    location: "Vellore, Tamil Nadu",
    highlights: [
      "Focus on Distributed Systems, Advanced Data Structures, Object-Oriented Architecture, and Machine Learning.",
      "Developing high-throughput microservices in Java 21, Spring Boot, and Docker.",
      "Active participant in technical symposiums, research publications, and coding challenges."
    ]
  },
  {
    institution: "Vidyaniketan P.U. Science College, Hubballi",
    degree: "Pre-University Course (PCMB)",
    period: "June 2021 – March 2023",
    score: "Score: 93.16%",
    location: "Hubballi, Karnataka",
    highlights: [
      "Graduated with Distinction in Physics, Chemistry, and Mathematics (93.16%).",
      "Rigorous foundations in analytical mathematics and scientific computing."
    ]
  },
  {
    institution: "KLE Society's English Medium CBSE School, Hubballi",
    degree: "Class 10 CBSE Board Examination",
    period: "Graduated: 2021",
    score: "Score: 89.8%",
    location: "Hubballi, Karnataka",
    highlights: [
      "Distinction with excellence in Science and Mathematics (89.8%).",
      "Foundational computer science problem-solving and scholastic achievements."
    ]
  }
];

export const certifications = [
  {
    title: "Oracle Cloud Infrastructure 2024 Data Science Professional",
    issuer: "Oracle",
    date: "2024",
    credentialId: "OCI-DS-2024",
    link: "https://education.oracle.com"
  },
  {
    title: "IBM DevOps and Software Engineering: Agile & Design Thinking",
    issuer: "IBM / Coursera",
    date: "2024",
    credentialId: "IBM-AGILE-2024",
    link: "https://coursera.org"
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    credentialId: "GOOG-SEC-2024",
    link: "https://coursera.org"
  }
];
