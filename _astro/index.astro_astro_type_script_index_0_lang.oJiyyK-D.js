const x=document.getElementById("social-links"),b=document.getElementById("projects-grid"),g=document.getElementById("skills-grid");let d=null,r=localStorage.getItem("portfolio_lang")||"es";const f={React:"fa-brands fa-react text-[#61DAFB]","React Native":"fa-brands fa-react text-[#61DAFB]","Node.js":"fa-brands fa-node-js text-[#339933]","C++":"fa-solid fa-code text-[#239120]",CSS:"fa-solid fa-code text-[#239120]",HTML:"fa-solid fa-code text-[#239120]",scala:"fa-solid fa-code text-[#239120]",Minimax:"fa-solid fa-chess-knight text-[#10A37F]",Python:"fa-brands fa-python text-[#3776AB]",Flask:"fa-solid fa-flask text-[#000000] dark:text-white",Java:"fa-brands fa-java text-[#ED8B00]",JavaScript:"fa-brands fa-js text-[#F7DF1E]",TypeScript:"fa-solid fa-code text-[#3178C6]",Docker:"fa-brands fa-docker text-[#2496ED]",AWS:"fa-brands fa-aws text-[#FF9900]",Git:"fa-brands fa-git-alt text-[#F05032]",Angular:"fa-brands fa-angular text-[#DD0031]",Kotlin:"fa-brands fa-android text-[#7F52FF]","Jetpack Compose":"fa-solid fa-mobile-screen text-[#4285F4]","Android Studio":"fa-brands fa-android text-[#3DDC84]",Astro:"fa-solid fa-rocket text-[#FF5D01]",TailwindCSS:"fa-solid fa-wind text-[#06B6D4]",Nextjs:"fa-solid fa-n text-white","Spring Boot":"fa-solid fa-leaf text-[#6DB33F]",PostgreSQL:"fa-solid fa-database text-[#336791]","PL/pgSQL":"fa-solid fa-database text-[#336791]",Firebase:"fa-solid fa-fire text-[#FFCA28]",Figma:"fa-brands fa-figma text-[#F24E1E]",Blockbench:"fa-solid fa-cube text-[#38BDF8]","Modelado 3D":"fa-solid fa-cubes text-[#38BDF8]","3D Modeling":"fa-solid fa-cubes text-[#38BDF8]","UI/UX Design":"fa-solid fa-pen-nib text-[#F24E1E]",pandas:"fa-solid fa-table text-[#150458]",NumPy:"fa-solid fa-cube text-[#013243]","Análisis de Datos":"fa-solid fa-chart-bar text-[#10A37F]","Data Analysis":"fa-solid fa-chart-bar text-[#10A37F]",Microservicios:"fa-solid fa-cubes-stacked text-[#729FCF]","Netflix Eureka":"fa-solid fa-magnifying-glass text-[#E50914]","API Gateway":"fa-solid fa-door-open text-[#FF9900]","IA Generativa":"fa-solid fa-brain text-[#10A37F]","Jupyter Notebooks":"fa-solid fa-book text-[#F37626]","Minecraft Fabric API":"fa-solid fa-hammer text-[#ED8B00]","Minecraft Forge API":"fa-solid fa-hammer text-[#ED8B00]","Prompt Engineering":"fa-solid fa-terminal text-[#10A37F]","C#":"fa-solid fa-code text-[#239120]",".NET":"fa-brands fa-microsoft text-[#512BD4]",Flutter:"fa-brands fa-flutter text-[#02569B]",Dart:"fa-solid fa-code text-[#0175C2]",SQLite:"fa-solid fa-database text-[#003B57]",Expo:"fa-solid fa-mobile-screen-button text-[#000020]",Express:"fa-brands fa-node-js text-[#000000] dark:text-white",Electron:"fa-brands fa-react text-[#47848F]","Vue 3":"fa-brands fa-vuejs text-[#4FC08D]",Vite:"fa-solid fa-bolt text-[#646CFF]"};function m(e,l){return`
        <a href="${e.url}" target="_blank" rel="noreferrer"
           class="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-950/50 px-5 py-4 text-sm text-neutral-300 transition-all hover:border-blue-500 hover:bg-blue-500/5 hover:text-white">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-lg transition-transform group-hover:scale-110" style="color: ${e.color}">
            <i class="${e.iconClass}"></i>
          </div>
          <div class="flex-1">
            <span class="block font-semibold">${e.name}</span>
            <span class="text-xs text-neutral-500">${l.visitProfile}</span>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square text-xs text-neutral-600 transition-colors group-hover:text-blue-400"></i>
        </a>`}function p(e){const l=e.achievements.slice(0,2).map(n=>`<li class="flex items-start gap-2">
        <i class="fa-solid fa-check text-blue-500 mt-1 text-[10px]"></i>
        <span>${n}</span>
      </li>`).join(""),a=e.technologies.map(n=>`<span class="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[10px] text-neutral-300 hover:border-neutral-600 transition-colors">
            <i class="${f[n]||"fa-solid fa-microchip text-neutral-400"} text-xs"></i>
            ${n}
          </span>`).join(""),t=e.technologies[0],s=f[t]||"fa-solid fa-folder-open",o=e.images?e.images.map((n,c)=>`
          <div class="relative group/img flex-shrink-0 w-28 h-18 rounded-lg overflow-hidden border border-neutral-700/30 transition-all hover:border-blue-500/50 hover:scale-[1.04] cursor-pointer" onclick="event.stopPropagation();openLightbox('${e.title.replace(/'/g,"\\'")}', ${c})">
            <img src="${n}" alt="${e.title}" class="w-full h-full object-cover" loading="lazy" />
          </div>`).join(""):"",i=o?`<div class="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">${o}</div>`:"";return`
        <article class="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
          ${e.url?`<a href="${e.url}" target="_blank" rel="noreferrer" class="absolute inset-0 z-10" aria-label="Ver proyecto ${e.title}"></a>`:""}
          
          <div class="relative z-0 flex flex-col h-full">
            <div class="flex items-start justify-between">
              <div class="rounded-lg bg-blue-500/10 p-3 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <i class="${s} text-xl"></i>
              </div>
              <div class="flex gap-2 relative z-20">
                ${e.links?e.links.map(n=>`
                  <a href="${n.url}" target="_blank" rel="noreferrer" class="flex h-8 px-3 items-center justify-center rounded-full bg-neutral-800/50 text-neutral-400 transition-all hover:bg-neutral-700 hover:text-white group-hover:bg-neutral-800 group-hover:text-white" title="${n.name}">
                    <span class="text-[10px] uppercase font-bold mr-2 tracking-wider">${n.name}</span> <i class="${n.icon||"fa-brands fa-github"} text-sm"></i>
                  </a>
                `).join(""):`
                  <a href="${e.url}" target="_blank" rel="noreferrer" class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/50 text-neutral-400 transition-all hover:bg-neutral-700 hover:text-white group-hover:bg-neutral-800 group-hover:text-white" title="Ver código">
                    <i class="fa-brands fa-github text-lg"></i>
                  </a>
                `}
              </div>
            </div>
            
            <h3 class="mt-5 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">${e.title}</h3>
            <p class="mt-2 font-mono text-[10px] uppercase tracking-wider text-blue-500/80">${e.role}</p>
            ${i}
            <p class="mt-4 text-sm leading-relaxed text-neutral-400">${e.description}</p>
            <ul class="mt-6 space-y-2 text-xs text-neutral-500">${l}</ul>
            <div class="mt-auto pt-6 flex flex-wrap gap-2 relative z-20">${a}</div>
          </div>
        </article>`}function h(e){const l=e.skills.map(s=>`<div class="group/skill flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 transition-all hover:border-neutral-600 hover:bg-neutral-800">
            <i class="${f[s]||"fa-solid fa-check text-neutral-600"} transition-transform group-hover/skill:scale-125"></i>
            <span class="text-sm font-medium text-neutral-300 group-hover/skill:text-white">${s}</span>
          </div>`).join("");let a="fa-solid fa-layer-group";const t=e.name.toLowerCase();return t.includes("lenguaj")||t.includes("language")?a="fa-solid fa-terminal":t.includes("front")?a="fa-solid fa-display":t.includes("back")?a="fa-solid fa-server":t.includes("diseño")||t.includes("design")?a="fa-solid fa-pen-nib":t.includes("dato")||t.includes("data")?a="fa-solid fa-database":t.includes("devops")?a="fa-solid fa-infinity":(t.includes("móvil")||t.includes("mobile"))&&(a="fa-solid fa-mobile-screen-button"),`
        <article class="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-6 backdrop-blur-sm transition-all hover:bg-neutral-900/30">
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <i class="${a} text-lg"></i>
            </div>
            <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-white">${e.name}</h3>
          </div>
          <div class="grid grid-cols-2 gap-3">${l}</div>
        </article>`}function u(){if(!d)return;const e=d[r],l=e.info,a=e.projects,t=e.ui;document.getElementById("ui-subtitle").textContent=t.subtitle,document.getElementById("name").textContent=l.fullTexts.name,document.getElementById("role").textContent=l.fullTexts.role,document.getElementById("location").textContent=l.fullTexts.location,document.getElementById("project-count").textContent=`${a.length} ${t.projectsCount}`,document.getElementById("ui-contact").textContent=t.contact,document.getElementById("ui-skills").textContent=t.skills,document.getElementById("ui-projects").textContent=t.projects,document.getElementById("ui-copyright").innerHTML=t.copyright.replace("{year}",new Date().getFullYear());const s=document.getElementById("btn-es"),o=document.getElementById("btn-en");r==="es"?(s.className="rounded-full px-3 py-1 text-xs font-medium transition-all text-white bg-blue-600",o.className="rounded-full px-3 py-1 text-xs font-medium transition-all text-neutral-400 hover:text-white",document.documentElement.lang="es"):(o.className="rounded-full px-3 py-1 text-xs font-medium transition-all text-white bg-blue-600",s.className="rounded-full px-3 py-1 text-xs font-medium transition-all text-neutral-400 hover:text-white",document.documentElement.lang="en"),x.innerHTML=l.socialLinks.map(i=>m(i,t)).join(""),b.innerHTML=a.map(p).join(""),g.innerHTML=l.skillCategories.map(h).join("")}window.switchLanguage=function(e){r!==e&&(r=e,localStorage.setItem("portfolio_lang",e),u())};async function v(){try{d=await(await fetch("/data/i18n.json")).json(),u()}catch(e){console.error("Error cargando el portfolio:",e)}}v();
