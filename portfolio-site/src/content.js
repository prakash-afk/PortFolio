// ─────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT
//  Edit this single file to update any section of the site
// ─────────────────────────────────────────────────────────

export const PORTFOLIO = {
  // ── Identity ─────────────────────────────────────────
  name:     'Prakash Kumar',
  initials: 'PK',
  badge:    'AI/ML · GenAI · Backend',
  headline: 'AI/ML Engineer | GenAI & Backend',
  heroDesc:
    'I build end-to-end AI systems combining GenAI, RAG, machine learning, and backend engineering from data and retrieval pipelines to production APIs and usable applications.',
  resume:   '/resume.pdf',

  // ── Floating hero chips ───────────────────────────────
  chips: [
    {
      title: 'GenAI',
      items: ['RAG', 'LLMs', 'LangChain'],
      lines: ['GenAI', 'RAG', 'LLMs', 'LangChain'],
      iconType: 'brain',
      floatClass: 'float-1',
      pos: 'top-[6%]  left-[3%]',
    },
    {
      title: 'AI/ML',
      items: ['XGBoost', 'Scikit-learn', 'NLP'],
      lines: ['AI/ML', 'XGBoost', 'Scikit-learn', 'NLP'],
      iconType: 'cpu',
      floatClass: 'float-2',
      pos: 'top-[6%]  right-[3%]',
    },
    {
      title: 'Backend',
      items: ['FastAPI', 'REST APIs', 'Docker'],
      lines: ['Backend', 'FastAPI', 'REST APIs', 'Docker'],
      iconType: 'cloud',
      floatClass: 'float-3',
      pos: 'bottom-[20%] left-[0%]',
    },
    {
      title: 'Data',
      items: ['Pinecone', 'MongoDB', 'MySQL'],
      lines: ['Data', 'Pinecone', 'MongoDB', 'MySQL'],
      iconType: 'layers',
      floatClass: 'float-4',
      pos: 'bottom-[20%] right-[0%]',
    },
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
    heading:      'Building AI Systems Beyond the Model',
    body:
      "I'm a Computer Science Engineering student specializing in AI & ML, focused on building practical AI systems using GenAI, RAG, machine learning, and backend engineering. I enjoy taking ideas from data and retrieval pipelines to production APIs and usable applications.",
    buttonText:   'Explore My Work',
    cards: [
      {
        icon:  'target',
        title: 'My Goal',
        desc:  'Build reliable AI/ML systems that solve practical problems and move beyond experimentation into real applications.',
      },
      {
        icon:  'lightbulb',
        title: 'What I Do',
        desc:  'Build ML and GenAI applications using RAG, LLMs, vector search, FastAPI, and modern backend technologies.',
      },
      {
        icon:  'focus',
        title: 'Current Focus',
        desc:  'GenAI, RAG, LLM applications, vector databases, FastAPI, and AI system design.',
      },
      {
        icon:  'book',
        title: 'Beyond Tech',
        desc:  'I enjoy solving engineering problems, understanding systems deeply, and continuously improving through hands-on projects.',
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
      tags: ['Machine Learning', 'Backend', 'XGBoost'],
      shortDescription: 'Automated credit-risk assessment using XGBoost with 0.984 ROC-AUC on 50K+ records.',
      desc: 'Automated credit-risk assessment using XGBoost with 0.984 ROC-AUC on 50K+ records.',
      tech: ['Python', 'XGBoost', 'Pandas', 'FastAPI', 'React.js', 'Docker'],
      technology: ['Python', 'XGBoost', 'Pandas', 'FastAPI', 'React.js', 'Docker'],
      problem: 'Manual loan decisioning is slow and inconsistent across large applicant datasets.',
      approach: 'Evaluated 5+ ML models, engineered financial risk features, and containerized the full pipeline with Docker.',
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
      result: 'Reduced quota-related upload failures and implemented RBAC restricting uploads to authorized users.',
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
      tags: ['Backend', 'REST API', 'MongoDB'],
      shortDescription: 'Personal finance tracker with JWT authentication, REST APIs, real-time dashboards, and budget-threshold alerts.',
      desc: 'Personal finance tracker with JWT authentication, REST APIs, real-time dashboards, and budget-threshold alerts.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      technology: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      problem: 'Budget alerts usually fire only after overspending rather than before it happens.',
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
      year:        '2023 – 2027',
      cgpa:        'CGPA: 8.02 / 10',
      logo:        '/smit-logo.png',
    },
  ],

  // ── Contact ───────────────────────────────────────────
  contact: {
    heading: "Let's Connect",
    desc:    "I'm open to AI/ML internships and engineering opportunities where I can build intelligent systems that solve real-world problems and scale.",
    email:   'pr1624300@gmail.com',
  },
};
