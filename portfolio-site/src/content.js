// ─────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT
//  Edit this single file to update any section of the site
// ─────────────────────────────────────────────────────────

export const PORTFOLIO = {
  // ── Identity ─────────────────────────────────────────
  name:     'Prakash Kumar',
  initials: 'PK',
  badge:    'CS Student | AI & ML Enthusiast',
  headline: 'Aspiring AI/ML Engineer',
  heroDesc:
    'I build intelligent systems using AI/ML, GenAI and backend technologies. Focused on solving practical problems through technology.',

  // ── Floating hero chips ───────────────────────────────
  chips: [
    { lines: ['GenAI', 'RAG', 'LangChain'],         iconType: 'brain',   floatClass: 'float-1', pos: 'top-[6%]  left-[3%]' },
    { lines: ['AI/ML', 'LLMs', 'Pinecone'],          iconType: 'cpu',     floatClass: 'float-2', pos: 'top-[6%]  right-[3%]' },
    { lines: ['FastAPI', 'Docker', 'Python'],         iconType: 'cloud',   floatClass: 'float-3', pos: 'bottom-[20%] left-[0%]' },
    { lines: ['Building', 'AI Systems', 'For Impact'],iconType: 'bar',     floatClass: 'float-4', pos: 'bottom-[20%] right-[0%]' },
  ],

  // ── Social ────────────────────────────────────────────
  social: {
    github:   'https://github.com/prakash-afk',
    linkedin: 'https://www.linkedin.com/in/prakash-kumar-cse',
    email:    'pr1624300@gmail.com',
  },

  // ── About cards ──────────────────────────────────────
  about: {
    sectionLabel: 'ABOUT ME',
    heading:      'Turning Ideas into Real-World Solutions',
    body:
      "I'm a Computer Science Engineering student at Sikkim Manipal Institute of Technology, specializing in AI & ML. I enjoy building practical AI applications, working with real datasets, and turning ideas into useful solutions.",
    cards: [
      {
        icon:  'target',
        title: 'My Goal',
        desc:  'To become an AI/ML engineer and build impactful products.',
      },
      {
        icon:  'lightbulb',
        title: 'What I Do',
        desc:  'Develop AI/ML projects, explore GenAI and work on real-world problems.',
      },
      {
        icon:  'focus',
        title: 'Current Focus',
        desc:  'GenAI, RAG, LangChain, FastAPI and building AI systems.',
      },
      {
        icon:  'book',
        title: 'Beyond Tech',
        desc:  'I enjoy learning, solving problems, and continuously improving my skills.',
      },
    ],
  },

  // ── Skills (only tools used in a real project) ────────
  skills: [
    { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'C++',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'FastAPI',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'TensorFlow',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'LangChain',   icon: null },
    { name: 'RAG',         icon: null },
    { name: 'Pinecone',    icon: null },
    { name: 'XGBoost',     icon: null },
  ],

  // ── Projects ──────────────────────────────────────────
  projects: [
    {
      id: 1,
      name: 'Intelligent Loan Approval System',
      title: 'Intelligent Loan Approval System',
      tags: ['Machine Learning', 'Full-Stack'],
      shortDescription: 'Automated credit-risk assessment using XGBoost — 0.984 ROC-AUC on 50K+ records.',
      desc: 'Automated credit-risk assessment using XGBoost — 0.984 ROC-AUC on 50K+ records.',
      tech: ['Python', 'XGBoost', 'Pandas', 'FastAPI', 'React.js', 'Docker'],
      technology: ['Python', 'XGBoost', 'Pandas', 'FastAPI', 'React.js', 'Docker'],
      problem: 'Manual loan decisioning is slow and inconsistent across large applicant datasets.',
      approach: 'Evaluated 5+ ML models, engineered financial risk features, containerized full pipeline with Docker.',
      result: '0.984 ROC-AUC and 92.6% accuracy on 50K+ records with real-time scoring via FastAPI.',
      githubUrl: 'https://github.com/prakash-afk/Loan-Prediction-Model',
      github: 'https://github.com/prakash-afk/Loan-Prediction-Model',
      liveUrl: 'https://loan-prediction-model-sigma.vercel.app',
      demo: 'https://loan-prediction-model-sigma.vercel.app',
      thumbnail: '/images/loan-system.png',
    },
    {
      id: 2,
      name: 'Healthcare RAG Chatbot',
      title: 'Healthcare RAG Chatbot',
      tags: ['GenAI', 'RAG', 'Backend'],
      shortDescription: 'Role-aware RAG assistant answering document-grounded medical queries with strict RBAC.',
      desc: 'Role-aware RAG assistant answering document-grounded medical queries with strict RBAC.',
      tech: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'Gemini', 'MongoDB'],
      technology: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'Gemini', 'MongoDB'],
      problem: 'Need for an accurate, document-grounded healthcare assistant with strict access controls.',
      approach: 'Role-aware RAG pipeline over PDF corpora using recursive chunking and Pinecone vector retrieval.',
      result: 'Reduced quota-related upload failures; implemented RBAC restricting uploads to authorized users only.',
      githubUrl: 'https://github.com/prakash-afk/Healthcare-RAG-Chatbot',
      github: 'https://github.com/prakash-afk/Healthcare-RAG-Chatbot',
      liveUrl: '',
      demo: '',
      thumbnail: '/images/healthcare-rag.png',
    },
    {
      id: 3,
      name: 'Plant Disease Detection',
      title: 'Plant Disease Detection',
      tags: ['Computer Vision', 'Deep Learning'],
      shortDescription: 'CNN-based multi-class classifier for early plant disease identification from leaf images.',
      desc: 'CNN-based multi-class classifier for early plant disease identification from leaf images.',
      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      technology: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      problem: 'Farmers identify plant diseases too late, causing preventable crop losses.',
      approach: 'Designed and trained a CNN on plant leaf image datasets with preprocessing via OpenCV.',
      result: 'Accurate multi-class disease classification from leaf images with a lightweight deployable model.',
      githubUrl: 'https://github.com/prakash-afk/Plant_Disease_Detection',
      github: 'https://github.com/prakash-afk/Plant_Disease_Detection',
      liveUrl: '',
      demo: '',
      thumbnail: '/images/plant-disease.jpg',
    },
    {
      id: 4,
      name: 'Full-Stack Expense Tracker',
      title: 'Full-Stack Expense Tracker',
      tags: ['Full-Stack', 'Backend'],
      shortDescription: 'Personal finance tracker with JWT auth, real-time dashboards and budget-threshold alerts.',
      desc: 'Personal finance tracker with JWT auth, real-time dashboards and budget-threshold alerts.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      technology: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      problem: 'No alert system that fires before overspending — only after it happens.',
      approach: 'Tiered budget-alert system with per-user REST APIs and JWT authentication.',
      result: 'Mobile-friendly UI with real-time dashboards and predictive budget threshold alerts.',
      githubUrl: 'https://github.com/prakash-afk/Expense-Tracker',
      github: 'https://github.com/prakash-afk/Expense-Tracker',
      liveUrl: '',
      demo: '',
      thumbnail: '/images/expense-tracker.png',
    },
  ],

  // ── Certifications & Achievements ────────────────────
  certificates: [
    {
      id: 'oracle-ai',
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle University',
      year: '2025',
      image: '/certificates/oracle-ai.jpg',
      badge: 'Certified Associate',
    },
    {
      id: 'deloitte-da',
      title: 'Deloitte Data Analytics Job Simulation',
      issuer: 'Deloitte',
      year: '2026',
      image: '/certificates/deloitte.jpg',
      badge: 'Job Simulation',
    },
    {
      id: 'pwc-advisory',
      title: 'PwC Advisory Launchpad Program',
      issuer: 'PwC AC India',
      year: '2026',
      image: '/certificates/pwc.jpg',
      badge: 'Launchpad Program',
    },
    {
      id: 'gdsc-web',
      title: 'GDSC Web Development Bootcamp',
      issuer: 'Google Developer Student Clubs',
      year: '2024',
      image: '/certificates/gdsc.jpg',
      badge: 'Web Development',
    },
    {
      id: 'dsa-phase1',
      title: 'DSA Phase 1 Bootcamp',
      issuer: 'EnCoders & ACCESS (SMIT)',
      year: '2024',
      image: '/certificates/dsa.jpg',
      badge: 'Algorithms',
    },
  ],

  // ── Education ─────────────────────────────────────────
  education: [
    {
      degree:      'B.Tech in Computer Science & Engineering (AI & ML)',
      institution: 'Sikkim Manipal Institute of Technology (SMIT)',
      year:        '2023 – Present',
      cgpa:        'CGPA: 8.02 / 10',
      logo:        '/smit-logo.png',
    },
  ],

  // ── Contact ───────────────────────────────────────────
  contact: {
    heading: "Let's Connect",
    desc:    'Open to internships, projects and conversations about AI. Send a message and I\'ll reply soon.',
    email:   'pr1624300@gmail.com',
  },
};
