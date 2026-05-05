+   1 // Language Switch Functionality
+   2 let currentLang = 'zh';
+   3 
+   4 const translations = {
+   5     zh: {
+   6         nav: {
+   7             about: '关于我们',
+   8             project: '核心项目',
+   9             team: '团队',
+  10             structure: '组织架构',
+  11             contact: '联系我们'
+  12         }
+  13     },
+  14     en: {
+  15         nav: {
+  16             about: 'About',
+  17             project: 'Project',
+  18             team: 'Team',
+  19             structure: 'Organization',
+  20             contact: 'Contact'
+  21         }
+  22     }
+  23 };
+  24 
+  25 // Initialize language switching
+  26 document.addEventListener('DOMContentLoaded', function() {
+  27     const langSwitch = document.getElementById('langSwitch');
+  28     const menuToggle = document.getElementById('menuToggle');
+  29     const navMenu = document.querySelector('.nav-menu');
+  30     const navbar = document.querySelector('.navbar');
+  31 
+  32     // Language switch
+  33     langSwitch.addEventListener('click', function() {
+  34         currentLang = currentLang === 'zh' ? 'en' : 'zh';
+  35         updateLanguage();
+  36         langSwitch.querySelector('.lang-text').textContent = currentLang === 'zh' ? 'EN' : '中文';
+  37     });
+  38 
+  39     // Mobile menu toggle
+  40     menuToggle.addEventListener('click', function() {
+  41         navMenu.classList.toggle('active');
+  42         this.classList.toggle('active');
+  43     });
+  44 
+  45     // Close mobile menu when clicking on a link
+  46     document.querySelectorAll('.nav-menu a').forEach(link => {
+  47         link.addEventListener('click', () => {
+  48             navMenu.classList.remove('active');
+  49             menuToggle.classList.remove('active');
+  50         });
+  51     });
+  52 
+  53     // Navbar scroll effect
+  54     window.addEventListener('scroll', function() {
+  55         if (window.scrollY > 50) {
+  56             navbar.classList.add('scrolled');
+  57         } else {
+  58             navbar.classList.remove('scrolled');
+  59         }
+  60     });
+  61 
+  62     // Smooth scroll for anchor links
+  63     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
+  64         anchor.addEventListener('click', function(e) {
+  65             e.preventDefault();
+  66             const target = document.querySelector(this.getAttribute('href'));
+  67             if (target) {
+  68                 const offsetTop = target.offsetTop - 80;
+  69                 window.scrollTo({
+  70                     top: offsetTop,
+  71                     behavior: 'smooth'
+  72                 });
+  73             }
+  74         });
+  75     });
+  76 
+  77     // Form submission
+  78     const contactForm = document.getElementById('contactForm');
+  79     if (contactForm) {
+  80         contactForm.addEventListener('submit', function(e) {
+  81             e.preventDefault();
+  82             const submitBtn = this.querySelector('button[type="submit"]');
+  83             const originalText = submitBtn.textContent;
+  84             
+  85             submitBtn.textContent = currentLang === 'zh' ? '发送中...' : 'Sending...';
+  86             submitBtn.disabled = true;
+  87 
+  88             // Simulate form submission
+  89             setTimeout(() => {
+  90                 alert(currentLang === 'zh' 
+  91                     ? '消息已发送！我们会尽快与您联系。' 
+  92                     : 'Message sent! We will contact you soon.');
+  93                 this.reset();
+  94                 submitBtn.textContent = originalText;
+  95                 submitBtn.disabled = false;
+  96             }, 1500);
+  97         });
+  98     }
+  99 
+ 100     // Intersection Observer for animations
+ 101     const observerOptions = {
+ 102         threshold: 0.1,
+ 103         rootMargin: '0px 0px -100px 0px'
+ 104     };
+ 105 
+ 106     const observer = new IntersectionObserver(function(entries) {
+ 107         entries.forEach(entry => {
+ 108             if (entry.isIntersecting) {
+ 109                 entry.target.style.opacity = '1';
+ 110                 entry.target.style.transform = 'translateY(0)';
+ 111             }
+ 112         });
+ 113     }, observerOptions);
+ 114 
+ 115     // Observe elements for animation
+ 116     document.querySelectorAll('.about-card, .team-card, .structure-node, .project-showcase').forEach(el => {
+ 117         el.style.opacity = '0';
+ 118         el.style.transform = 'translateY(30px)';
+ 119         el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
+ 120         observer.observe(el);
+ 121     });
+ 122 
+ 123     // Parallax effect for hero section
+ 124     window.addEventListener('scroll', function() {
+ 125         const scrolled = window.pageYOffset;
+ 126         const heroParticles = document.querySelector('.hero-particles');
+ 127         if (heroParticles && scrolled < window.innerHeight) {
+ 128             heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
+ 129         }
+ 130     });
+ 131 
+ 132     // Counter animation for statistics
+ 133     function animateCounter(element, target, duration = 2000) {
+ 134         let current = 0;
+ 135         const increment = target / (duration / 16);
+ 136         const timer = setInterval(() => {
+ 137             current += increment;
+ 138             if (current >= target) {
+ 139                 element.textContent = target + '%';
+ 140                 clearInterval(timer);
+ 141             } else {
+ 142                 element.textContent = Math.floor(current) + '%';
+ 143             }
+ 144         }, 16);
+ 145     }
+ 146 
+ 147     // Observe statistics
+ 148     const statsObserver = new IntersectionObserver(function(entries) {
+ 149         entries.forEach(entry => {
+ 150             if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
+ 151                 const number = entry.target.textContent.replace('%', '');
+ 152                 entry.target.textContent = '0%';
+ 153                 animateCounter(entry.target, parseInt(number));
+ 154                 entry.target.classList.add('animated');
+ 155             }
+ 156         });
+ 157     }, { threshold: 0.5 });
+ 158 
+ 159     document.querySelectorAll('.data-number').forEach(el => {
+ 160         statsObserver.observe(el);
+ 161     });
+ 162 });
+ 163 
+ 164 // Update language for all elements
+ 165 function updateLanguage() {
+ 166     document.querySelectorAll('[data-en][data-zh]').forEach(element => {
+ 167         const key = currentLang === 'en' ? 'data-en' : 'data-zh';
+ 168         element.textContent = element.getAttribute(key);
+ 169     });
+ 170 
+ 171     // Update placeholders
+ 172     document.querySelectorAll('[data-placeholder-en][data-placeholder-zh]').forEach(element => {
+ 173         const key = currentLang === 'en' ? 'data-placeholder-en' : 'data-placeholder-zh';
+ 174         element.setAttribute('placeholder', element.getAttribute(key));
+ 175     });
+ 176 
+ 177     // Update document title
+ 178     document.title = currentLang === 'zh' 
+ 179         ? 'Open Technology Hub | 开放技术枢纽'
+ 180         : 'Open Technology Hub | OTH';
+ 181 
+ 182     // Update HTML lang attribute
+ 183     document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
+ 184 }
+ 185 
+ 186 // Dynamic background particles
+ 187 function createParticle() {
+ 188     const particle = document.createElement('div');
+ 189     particle.className = 'particle';
+ 190     particle.style.cssText = `
+ 191         position: absolute;
+ 192         width: 2px;
+ 193         height: 2px;
+ 194         background: rgba(118, 185, 0, 0.5);
+ 195         border-radius: 50%;
+ 196         pointer-events: none;
+ 197         left: ${Math.random() * 100}%;
+ 198         top: ${Math.random() * 100}%;
+ 199         animation: float ${5 + Math.random() * 10}s linear infinite;
+ 200     `;
+ 201     return particle;
+ 202 }
+ 203 
+ 204 // Add dynamic particles to hero
+ 205 const heroParticles = document.querySelector('.hero-particles');
+ 206 if (heroParticles) {
+ 207     for (let i = 0; i < 20; i++) {
+ 208         setTimeout(() => {
+ 209             heroParticles.appendChild(createParticle());
+ 210         }, i * 100);
+ 211     }
+ 212 }
+ 213 
+ 214 // Add floating animation keyframes dynamically
+ 215 const style = document.createElement('style');
+ 216 style.textContent = `
+ 217     @keyframes float {
+ 218         0% {
+ 219             transform: translate(0, 0);
+ 220             opacity: 0;
+ 221         }
+ 222         10% {
+ 223             opacity: 1;
+ 224         }
+ 225         90% {
+ 226             opacity: 1;
+ 227         }
+ 228         100% {
+ 229             transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
+ 230             opacity: 0;
+ 231         }
+ 232     }
+ 233 `;
+ 234 document.head.appendChild(style);
+ 235 
+ 236 // Loading animation
+ 237 window.addEventListener('load', function() {
+ 238     document.body.style.opacity = '0';
+ 239     setTimeout(() => {
+ 240         document.body.style.transition = 'opacity 0.5s ease';
+ 241         document.body.style.opacity = '1';
+ 242     }, 100);
+ 243 });
+ 244 
+ 245 // Easter egg: Konami code
+ 246 let konamiCode = [];
+ 247 const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
+ 248 
+ 249 document.addEventListener('keydown', function(e) {
+ 250     konamiCode.push(e.key);
+ 251     konamiCode = konamiCode.slice(-10);
+ 252     
+ 253     if (konamiCode.join(',') === konamiPattern.join(',')) {
+ 254         document.body.style.animation = 'rainbow 2s linear infinite';
+ 255         setTimeout(() => {
+ 256             document.body.style.animation = '';
+ 257         }, 5000);
+ 258     }
+ 259 });
+ 260 
+ 261 const rainbowStyle = document.createElement('style');
+ 262 rainbowStyle.textContent = `
+ 263     @keyframes rainbow {
+ 264         0% { filter: hue-rotate(0deg); }
+ 265         100% { filter: hue-rotate(360deg); }
+ 266     }
+ 267 `;
+ 268 document.head.appendChild(rainbowStyle);
+ 269 
+ 270 // Performance optimization: Lazy load images
+ 271 if ('IntersectionObserver' in window) {
+ 272     const imageObserver = new IntersectionObserver((entries, observer) => {
+ 273         entries.forEach(entry => {
+ 274             if (entry.isIntersecting) {
+ 275                 const img = entry.target;
+ 276                 if (img.dataset.src) {
+ 277                     img.src = img.dataset.src;
+ 278                     img.classList.remove('lazy');
+ 279                     imageObserver.unobserve(img);
+ 280                 }
+ 281             }
+ 282         });
+ 283     });
+ 284 
+ 285     document.querySelectorAll('img.lazy').forEach(img => {
+ 286         imageObserver.observe(img);
+ 287     });
+ 288 }
+ 289 
+ 290 // Add cursor trail effect (subtle)
+ 291 let cursorTrail = [];
+ 292 const maxTrailLength = 10;
+ 293 
+ 294 document.addEventListener('mousemove', function(e) {
+ 295     if (window.innerWidth > 768) { // Only on desktop
+ 296         cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
+ 297         cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
+ 298         
+ 299         if (cursorTrail.length > maxTrailLength) {
+ 300             cursorTrail.shift();
+ 301         }
+ 302     }
+ 303 });
+ 304 
+ 305 // Cleanup on page unload
+ 306 window.addEventListener('beforeunload', function() {
+ 307     // Clear any intervals or timeouts
+ 308     observer?.disconnect();
+ 309     statsObserver?.disconnect();
+ 310 });
