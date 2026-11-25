/**
 * Nomad Genetics — High-End Precision Oncology Platform
 * Inspirado en la puerta de entrada de quangdinh.im y el diseño profesional de segmentsix.de
 */
(() => {
  'use strict';

  const CONTACTO = {
    whatsapp: '525579949420',
    correo: 'ger.genomica@nomadgenetics.com',
    telefono: '+52 55 7994 9420'
  };

  let playPipelineVideo = () => {};

  /* ==========================================================================
     Sintetizador de Audio Sci-Fi Web Audio API (Puro, sin dependencias)
     ========================================================================== */
  class SciFiAudio {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playStartChime() {
      try {
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const freqs = [220, 329.63, 440, 659.25, 880];

        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.06);

          gain.gain.setValueAtTime(0.001, t + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.08, t + idx * 0.06 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t + idx * 0.06);
          osc.stop(t + idx * 0.06 + 1.25);
        });
      } catch (err) {}
    }

    playNodeClick() {
      try {
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(1040, t + 0.08);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(0.06, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.36);
      } catch (err) {}
    }
  }

  const audioFX = new SciFiAudio();

  /* ==========================================================================
     1. Inicialización Directa del Portal (Secuenciador inicial retirado)
     ========================================================================== */
  function initSequencerGate() {
    document.body.classList.remove('intro-active');
  }

  /* ==========================================================================
     2. ADN VERTICAL 3D EN ULTRA-HD CON THREE.JS (PBR + Raycasting + Partículas)
     ========================================================================== */
    const CANCER_NODES_CONFIG = [
    { name: 'Mama', color: '#F43F5E', count: 16, spec: 'Aprobaciones FDA en ERBB2, PIK3CA, AKT1, ESR1' },
    { name: 'Pulmón', color: '#00F0FF', count: 16, spec: 'Aprobaciones FDA en EGFR, ALK, ROS1, KRAS, BRAF, MET' },
    { name: 'Colorrectal', color: '#10B981', count: 17, spec: 'Aprobaciones FDA en KRAS, NRAS, BRAF V600E, MSI-H' },
    { name: 'Próstata', color: '#F59E0B', count: 16, spec: 'Aprobaciones FDA en BRCA1/2, ATM, HRR' },
    { name: 'Ovario', color: '#EC4899', count: 16, spec: 'Aprobaciones FDA en BRCA1/2, HRD' },
    { name: 'Páncreas', color: '#8B5CF6', count: 16, spec: 'Línea germinal y somática amplia' },
    { name: 'Gástrico', color: '#38BDF8', count: 16, spec: 'HER2, CLDN18, MSI, TMB', displayName: 'Cáncer gástrico' },
    { name: 'Melanoma', color: '#FB923C', count: 16, spec: 'Aprobaciones FDA en BRAF V600E', displayName: 'Melanoma' },
    { name: 'Vías biliares', color: '#06B6D4', count: 15, spec: 'Aprobaciones FDA en fusiones FGFR2' },
    { name: 'Cerebro', color: '#A855F7', count: 16, spec: 'Aprobaciones FDA en glioma BRAF y 1p19q' },
    { name: 'Renal', color: '#34D399', count: 16, spec: 'Perfil somático amplio', displayName: 'Cáncer renal' },
    { name: 'Sarcomas', color: '#FBBF24', count: 16, spec: 'Detección de fusiones complejas ARN', displayName: 'Sarcoma' },
    { name: 'Hematológicos', color: '#EF4444', count: 1, spec: 'FoundationOne® Heme (406 ADN + 265 ARN)', displayName: 'Cáncer hematológico' },
    { name: 'Otros tumores sólidos', color: '#6366F1', count: 16, spec: 'Indicación agnóstica (NTRK, MSI-H, TMB-H)', displayName: 'Cáncer en otros tejidos' }
  ];

  function initHDThreeJSDNA() {
    const canvas = document.getElementById('verticalDnaCanvas');
    const tooltip = document.getElementById('dnaHoloTooltip');
    if (!canvas) return;

    if (window.THREE) {
      initThreeEngine(canvas, tooltip);
    }
  }

  function initThreeEngine(canvas, tooltip) {
    const THREE = window.THREE;
    const parent = canvas.parentElement;

    let width = parent.offsetWidth || 440;
    let height = parent.offsetHeight || 720;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 52);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Luces
    const ambientLight = new THREE.AmbientLight(0x0a1628, 2.0);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00F0FF, 3.5, 90);
    cyanLight.position.set(-20, 20, 30);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8B5CF6, 3.5, 90);
    violetLight.position.set(20, -20, 30);
    scene.add(violetLight);

    const centerGlow = new THREE.PointLight(0x00FFA3, 2.0, 50);
    centerGlow.position.set(0, 0, 15);
    scene.add(centerGlow);

    // Grupo de rotación del ADN
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const totalNodes = CANCER_NODES_CONFIG.length;
    const helixHeight = 42;
    const radius = 9.2;
    const turns = 2.4;

    const interactiveSpheres = [];
    const orbitalRings = [];

    const strandAPoints = [];
    const strandBPoints = [];

    for (let i = 0; i < totalNodes; i++) {
      const data = CANCER_NODES_CONFIG[i];
      const t = i / (totalNodes - 1);
      const angle = t * Math.PI * 2 * turns;
      const y = -helixHeight / 2 + t * helixHeight;

      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;

      const xB = -Math.cos(angle) * radius;
      const zB = -Math.sin(angle) * radius;

      const posA = new THREE.Vector3(xA, y, zA);
      const posB = new THREE.Vector3(xB, y, zB);

      strandAPoints.push(posA);
      strandBPoints.push(posB);

      // Peldaño 3D (Base pair)
      const rungDist = posA.distanceTo(posB);
      const rungGeo = new THREE.CylinderGeometry(0.22, 0.22, rungDist, 16);
      const rungMat = new THREE.MeshStandardMaterial({
        color: 0x38BDF8,
        emissive: 0x0284C7,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const rungMesh = new THREE.Mesh(rungGeo, rungMat);
      rungMesh.position.copy(posA).add(posB).multiplyScalar(0.5);
      rungMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), posB.clone().sub(posA).normalize());
      dnaGroup.add(rungMesh);

      // Esfera tumoral HD ("Bolita de cáncer")
      const sphereGeo = new THREE.SphereGeometry(1.65, 32, 32);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(data.color),
        emissive: new THREE.Color(data.color),
        emissiveIntensity: 0.5,
        roughness: 0.12,
        metalness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.copy(posA);
      sphereMesh.userData = {
        nodeData: data,
        origScale: 1.0,
        colorHex: data.color,
        index: i
      };

      // Anillo orbital que rota alrededor de la bolita
      const ringGeo = new THREE.TorusGeometry(2.4, 0.06, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        transparent: true,
        opacity: 0.75
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      ringMesh.rotation.y = (i * 0.4);
      sphereMesh.add(ringMesh);
      orbitalRings.push(ringMesh);

      dnaGroup.add(sphereMesh);
      interactiveSpheres.push(sphereMesh);

      // Esfera opuesta en la hebra B
      const counterSphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const counterMat = new THREE.MeshStandardMaterial({
        color: 0x8B5CF6,
        emissive: 0x8B5CF6,
        emissiveIntensity: 0.4,
        roughness: 0.3
      });
      const counterMesh = new THREE.Mesh(counterSphereGeo, counterMat);
      counterMesh.position.copy(posB);
      dnaGroup.add(counterMesh);
    }

    // Hebras continuas de la doble hélice
    const curveA = new THREE.CatmullRomCurve3(strandAPoints);
    const curveB = new THREE.CatmullRomCurve3(strandBPoints);

    const tubeGeoA = new THREE.TubeGeometry(curveA, 120, 0.32, 12, false);
    const tubeMatA = new THREE.MeshPhysicalMaterial({
      color: 0x00F0FF,
      emissive: 0x00F0FF,
      emissiveIntensity: 0.55,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0
    });
    const tubeMeshA = new THREE.Mesh(tubeGeoA, tubeMatA);
    dnaGroup.add(tubeMeshA);

    const tubeGeoB = new THREE.TubeGeometry(curveB, 120, 0.28, 12, false);
    const tubeMatB = new THREE.MeshPhysicalMaterial({
      color: 0x8B5CF6,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0
    });
    const tubeMeshB = new THREE.Mesh(tubeGeoB, tubeMatB);
    dnaGroup.add(tubeMeshB);

    // Campo de partículas estelares bioluminiscentes alrededor
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 44;
      particlePos[p + 1] = (Math.random() - 0.5) * 60;
      particlePos[p + 2] = (Math.random() - 0.5) * 35;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.45,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    dnaGroup.add(particlePoints);

    // Raycasting & Interacción
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredSphere = null;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    function onPointerMove(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((clientY - rect.top) / canvas.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        dnaGroup.rotation.y += deltaX * 0.008;
        dnaGroup.rotation.x += deltaY * 0.005;

        previousMousePosition = { x: clientX, y: clientY };
      }
    }

    canvas.addEventListener('mousemove', e => onPointerMove(e.clientX, e.clientY), { passive: true });
    canvas.addEventListener('mousedown', e => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch support optimizado para smartphones y tablets
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };

    canvas.addEventListener('touchstart', e => {
      if (e.touches.length > 0) {
        isDragging = true;
        touchStartTime = Date.now();
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    canvas.addEventListener('touchend', e => {
      isDragging = false;
      const duration = Date.now() - touchStartTime;
      const changedTouch = e.changedTouches && e.changedTouches[0];
      if (changedTouch && duration < 380) {
        const dist = Math.hypot(changedTouch.clientX - touchStartPos.x, changedTouch.clientY - touchStartPos.y);
        if (dist < 18 && hoveredSphere) {
          audioFX.playNodeClick();
          const nodeName = hoveredSphere.userData.nodeData.name;
          selectCancerNode(nodeName);

          // Pulso visual en 3D
          hoveredSphere.scale.set(1.5, 1.5, 1.5);
          setTimeout(() => {
            if (hoveredSphere) hoveredSphere.scale.set(1.15, 1.15, 1.15);
          }, 220);
        }
      }
    }, { passive: true });

    // Clic en la esfera de cáncer
    canvas.addEventListener('click', () => {
      if (hoveredSphere) {
        audioFX.playNodeClick();
        const nodeName = hoveredSphere.userData.nodeData.name;
        selectCancerNode(nodeName);

        // Pulso visual en 3D
        hoveredSphere.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => {
          hoveredSphere.scale.set(1.15, 1.15, 1.15);
        }, 220);
      }
    });

    // Resize
    window.addEventListener('resize', () => {
      width = parent.offsetWidth || 440;
      height = parent.offsetHeight || 720;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Bucle de animación 60 FPS
    function animate() {
      requestAnimationFrame(animate);

      if (!isDragging) {
        dnaGroup.rotation.y += 0.009;
        dnaGroup.rotation.x *= 0.96;
      }

      orbitalRings.forEach(ring => {
        ring.rotation.z += 0.035;
      });

      particlePoints.rotation.y += 0.002;

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveSpheres);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hoveredSphere !== hit) {
          if (hoveredSphere) {
            hoveredSphere.scale.set(1, 1, 1);
            hoveredSphere.material.emissiveIntensity = 0.5;
          }
          hoveredSphere = hit;
          hoveredSphere.scale.set(1.3, 1.3, 1.3);
          hoveredSphere.material.emissiveIntensity = 1.0;
          canvas.style.cursor = 'pointer';

          if (tooltip) {
            const data = hit.userData.nodeData;
            tooltip.innerHTML = `
              <span class="tooltip-cancer-title">${data.displayName || ('Cáncer de ' + data.name)}</span>
              <span class="tooltip-count-badge">[${data.count} Pruebas]</span>
              <div style="font-size:10px; color:#94A3B8; margin-top:2px;">${data.spec}</div>
            `;
            tooltip.classList.add('is-visible');
          }
        }

        if (tooltip && hoveredSphere) {
          const worldPos = new THREE.Vector3();
          hoveredSphere.getWorldPosition(worldPos);
          worldPos.project(camera);

          const screenX = (worldPos.x * 0.5 + 0.5) * width;
          const screenY = (-worldPos.y * 0.5 + 0.5) * height;

          tooltip.style.left = `${screenX}px`;
          tooltip.style.top = `${screenY}px`;
        }
      } else {
        if (hoveredSphere) {
          hoveredSphere.scale.set(1, 1, 1);
          hoveredSphere.material.emissiveIntensity = 0.5;
          hoveredSphere = null;
          canvas.style.cursor = 'default';
          if (tooltip) tooltip.classList.remove('is-visible');
        }
      }

      // Sincronizar selección activa
      interactiveSpheres.forEach(sphere => {
        const isSelected = window.stateGenomics && window.stateGenomics.cancer === sphere.userData.nodeData.name;
        if (isSelected && sphere !== hoveredSphere) {
          sphere.scale.set(1.22, 1.22, 1.22);
          sphere.material.emissiveIntensity = 1.1;
        } else if (!isSelected && sphere !== hoveredSphere) {
          sphere.scale.set(1, 1, 1);
          sphere.material.emissiveIntensity = 0.5;
        }
      });

      renderer.render(scene, camera);
    }

    animate();
  }

  /* ==========================================================================
     3. Catálogo de 17 Pruebas Clínicas
     ========================================================================== */
  const DATA = window.CATALOGO_DATA || {};
  const ALL_TESTS = Array.isArray(DATA.pruebas) ? DATA.pruebas : [];
  const SOLID_CANCERS = DATA.tipos_cancer?.solidos || [
    'Pulmón', 'Mama', 'Colorrectal', 'Próstata', 'Ovario', 'Páncreas',
    'Gástrico', 'Melanoma', 'Vías biliares', 'Cerebro', 'Renal', 'Sarcomas', 'Otros tumores sólidos'
  ];

  window.stateGenomics = {
    perspective: 'patient', // 'patient' | 'doctor'
    cancer: '',             // '' = Todos, o tumor seleccionado
    biomarker: '',
    q: '',
    cur: null
  };

  const norm = str => (str || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const stripHtml = html => (html || '').replace(/<[^>]+>/g, '').trim();

  function testMatches(t) {
    const s = window.stateGenomics;

    // Biomarcador
    if (s.biomarker) {
      const bioTarget = norm(s.biomarker);
      const docSearch = norm(JSON.stringify(t.medico || {}) + ' ' + (t.complementos || []).join(' ') + ' ' + (t.genes || ''));
      if (!docSearch.includes(bioTarget)) return false;
    }

    // Tipo de Cáncer
    if (s.cancer) {
      if (s.cancer === 'Hematológicos') {
        if (!t.tipos_cancer || !t.tipos_cancer['Hematológicos']) return false;
      } else {
        const hasSpec = t.tipos_cancer && Boolean(t.tipos_cancer[s.cancer]);
        const appliesSolid = t.aplica_todos_solidos && SOLID_CANCERS.includes(s.cancer);
        if (!hasSpec && !appliesSolid) return false;
      }
    }

    // Buscador
    if (s.q) {
      const words = norm(s.q).split(/\s+/).filter(Boolean);
      const corpus = norm([
        t.nombre, t.marca, t.frase, t.muestra, t.panel, t.genes, t.entrega,
        Object.keys(t.tipos_cancer || {}).join(' '),
        Object.values(t.tipos_cancer || {}).join(' '),
        t.paciente?.titulo,
        (t.paciente?.parrafos || []).join(' '),
        (t.paciente?.puntos || []).join(' '),
        JSON.stringify(t.medico || {})
      ].join(' '));
      if (!words.every(w => corpus.includes(w))) return false;
    }

    return true;
  }

  function getWhatsAppUrl(t) {
    const msg = `Hola Nomad Genetics, deseo solicitar información y cotización sobre la prueba oncológica: ${t.nombre} (${t.panel || ''}).`;
    return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  function renderCardHTML(t, idx) {
    const s = window.stateGenomics;
    const brandName = t.marca || 'Nomad Genetics';
    const isFDA = t.etiqueta && t.etiqueta.tipo === 'ok';

    const badgeHTML = t.etiqueta
      ? `<span class="luxury-badge ${isFDA ? 'luxury-badge--fda' : 'luxury-badge--ldt'}">
           <span class="badge-dot"></span>${t.etiqueta.texto}
         </span>`
      : '';

    let cancerIndicator = '';
    if (s.cancer) {
      if (t.tipos_cancer && t.tipos_cancer[s.cancer]) {
        cancerIndicator = `<div class="card-indication-pill">✓ Indicación ${s.cancer}: ${t.tipos_cancer[s.cancer]}</div>`;
      } else if (t.aplica_todos_solidos && SOLID_CANCERS.includes(s.cancer)) {
        cancerIndicator = `<div class="card-indication-pill">✓ Válido en tumores sólidos (${s.cancer})</div>`;
      }
    }

    let dynamicBody = '';
    if (s.perspective === 'patient') {
      const headline = t.paciente?.titulo || t.frase || 'Información de orientación para tu tratamiento.';
      const bullet1 = t.muestra_grupo ? `<strong>Muestra:</strong> ${t.muestra_grupo}` : '';
      const bullet2 = t.paciente?.puntos?.[0] ? stripHtml(t.paciente.puntos[0]) : `Estudio amplio de ${t.genes || 'múltiples'} genes`;
      const bullet3 = `<strong>Entrega de resultados:</strong> ${t.entrega || '21 días hábiles'}`;

      dynamicBody = `
        <div class="card-view-mode">
          <div class="mode-tag mode-tag--patient">👤 PERSPECTIVA PACIENTE</div>
          <h4 class="luxury-card-headline">${headline}</h4>
          <ul class="luxury-card-bullets">
            ${bullet1 ? `<li>${bullet1}</li>` : ''}
            ${bullet2 ? `<li>${bullet2}</li>` : ''}
            ${bullet3 ? `<li>${bullet3}</li>` : ''}
          </ul>
        </div>
      `;
    } else {
      const scenario = t.medico?.secciones?.find(sec => sec.titulo === 'Escenario clínico')?.texto || t.frase;
      dynamicBody = `
        <div class="card-view-mode">
          <div class="mode-tag mode-tag--doctor">🔬 PERSPECTIVA ESPECIALISTA</div>
          <div class="telemetry-bar">
            <div><span>MUESTRA</span><b>${t.muestra_grupo || t.muestra}</b></div>
            <div><span>GENES</span><b>${t.genes || 'N/A'}</b></div>
            <div><span>TAT</span><b>21 DÍAS</b></div>
          </div>
          <div class="scenario-text">${scenario ? scenario.slice(0, 135) + '...' : 'Perfil somático amplio para selección de terapias.'}</div>
        </div>
      `;
    }

    return `
      <article class="luxury-test-card" data-index="${idx}">
        <div class="card-header-row">
          <span class="card-brand-tag">${brandName}</span>
          ${badgeHTML}
        </div>

        <h3 class="luxury-card-title">${t.nombre}</h3>
        <p class="luxury-card-panel">${t.panel}</p>

        ${cancerIndicator}
        ${dynamicBody}

        <div class="luxury-card-actions">
          <button type="button" class="btn-luxury-outline" data-open="${idx}">
            Ver Ficha Técnica
          </button>
          <a class="btn-luxury-solid" href="${getWhatsAppUrl(t)}" target="_blank" rel="noopener">
            Solicitar Estudio
          </a>
        </div>
      </article>
    `;
  }

  function renderCatalog() {
    const listEl = document.getElementById('testsContainer');
    const resultCountEl = document.getElementById('filterResultsCount');
    const cancerFocusEl = document.getElementById('dnaSelectedCancerTitle');
    const s = window.stateGenomics;

    if (!listEl) return;

    const matched = ALL_TESTS.filter(testMatches);

    if (s.cancer) {
      matched.sort((a, b) => {
        const aSpec = a.tipos_cancer && Boolean(a.tipos_cancer[s.cancer]) ? 1 : 0;
        const bSpec = b.tipos_cancer && Boolean(b.tipos_cancer[s.cancer]) ? 1 : 0;
        return bSpec - aSpec;
      });
    }

    if (cancerFocusEl) {
      cancerFocusEl.innerHTML = s.cancer
        ? `Mostrando pruebas para: <span class="highlight-neon">${s.cancer}</span>`
        : `Explorando todas las pruebas del atlas`;
    }

    if (resultCountEl) {
      resultCountEl.innerHTML = `<strong>${matched.length}</strong> ${matched.length === 1 ? 'estudio disponible' : 'estudios disponibles'}`;
    }

    if (matched.length === 0) {
      listEl.innerHTML = `
        <div class="luxury-empty-state">
          <h4>Sin coincidencias genómicas</h4>
          <p>Ningún estudio coincide con los parámetros seleccionados. Haz clic en "Restablecer" para ver todas las pruebas del catálogo.</p>
          <button type="button" class="btn-luxury-solid" id="btnResetFilters">Restablecer filtros</button>
        </div>
      `;
    } else {
      let html = '<div class="luxury-cards-stream">';
      matched.forEach(t => {
        const originalIndex = ALL_TESTS.indexOf(t);
        html += renderCardHTML(t, originalIndex);
      });
      html += '</div>';
      listEl.innerHTML = html;
    }

    // Actualizar botones de perspectiva
    document.querySelectorAll('[data-perspective]').forEach(btn => {
      const active = btn.getAttribute('data-perspective') === s.perspective;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    // Actualizar chips de cáncer
    document.querySelectorAll('[data-cancer]').forEach(btn => {
      const active = btn.getAttribute('data-cancer') === s.cancer;
      btn.classList.toggle('is-active', active);
    });

    // Actualizar biomarcadores
    document.querySelectorAll('[data-biomarker]').forEach(btn => {
      const active = btn.getAttribute('data-biomarker') === s.biomarker;
      btn.classList.toggle('is-active', active);
    });
  }

  function selectCancerNode(cancerName) {
    const s = window.stateGenomics;
    s.cancer = (s.cancer === cancerName) ? '' : cancerName;
    renderCatalog();

    const testSection = document.getElementById('testsContainer');
    if (window.innerWidth < 900 && testSection) {
      testSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ==========================================================================
     4. Modal Ficha Técnica
     ========================================================================== */
  function renderModalBody(t) {
    const bodyEl = document.getElementById('modalTestBody');
    const s = window.stateGenomics;
    if (!bodyEl) return;

    let html = '';

    const stat1 = `<div class="modal-telemetry-box"><span class="m-label">MUESTRA REQUERIDA</span><span class="m-val">${t.muestra_grupo || t.muestra}</span></div>`;
    const stat2 = `<div class="modal-telemetry-box"><span class="m-label">TIEMPO DE ENTREGA</span><span class="m-val">${t.entrega || '21 días hábiles'}</span></div>`;
    const stat3 = s.perspective === 'doctor'
      ? `<div class="modal-telemetry-box"><span class="m-label">GENES ANALIZADOS</span><span class="m-val">${t.genes || 'N/A'}</span></div>`
      : '';

    html += `<div class="modal-telemetry-grid">${stat1}${stat2}${stat3}</div>`;

    const cancerChips = [
      t.aplica_todos_solidos ? '<span class="modal-cancer-tag modal-cancer-tag--all">Todos los tumores sólidos</span>' : '',
      ...Object.keys(t.tipos_cancer || {}).map(c => `<span class="modal-cancer-tag modal-cancer-tag--spec">${c}</span>`)
    ].filter(Boolean).join('');

    html += `
      <div class="modal-section">
        <h4 class="modal-sec-title">INDICACIONES Y TUMORES COMPATIBLES</h4>
        <div class="modal-tags-row">${cancerChips}</div>
      </div>
    `;

    if (s.perspective === 'patient') {
      html += `
        <div class="modal-section">
          <h3 class="modal-patient-headline">${t.paciente?.titulo || 'Información de valor para tu salud.'}</h3>
          ${(t.paciente?.parrafos || []).map(p => `<p class="modal-p">${p}</p>`).join('')}
        </div>

        <div class="modal-section">
          <h4 class="modal-sec-title">¿QUÉ SIGNIFICA PARA TI ESTA PRUEBA?</h4>
          <ul class="modal-bullets">
            ${(t.paciente?.puntos || []).map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `;
    } else {
      (t.medico?.secciones || []).forEach(sec => {
        let secContent = '';
        if (sec.texto) secContent += `<p class="modal-p">${sec.texto}</p>`;
        if (sec.parrafos) secContent += sec.parrafos.map(p => `<p class="modal-p">${p}</p>`).join('');
        if (sec.items) {
          secContent += `<ul class="modal-bullets">${sec.items.map(it => {
            const itemText = typeof it === 'object' ? (it.texto || '') : it;
            const subHtml = (it && it.sub && it.sub.length)
              ? `<ul class="modal-sub-bullets">${it.sub.map(s => `<li>${s}</li>`).join('')}</ul>`
              : '';
            return `<li>${itemText}${subHtml}</li>`;
          }).join('')}</ul>`;
        }
        html += `
          <div class="modal-section">
            <h4 class="modal-sec-title">${sec.titulo}</h4>
            ${secContent}
          </div>
        `;
      });
    }

    bodyEl.innerHTML = html;
  }

  function openTestModal(idx) {
    const t = ALL_TESTS[idx];
    if (!t) return;
    window.stateGenomics.cur = t;

    const modal = document.getElementById('testDetailModal');
    const titleEl = document.getElementById('modalTestTitle');
    const panelEl = document.getElementById('modalTestPanel');
    const tagEl = document.getElementById('modalTestTag');
    const waBtn = document.getElementById('modalTestWhatsApp');

    if (titleEl) titleEl.textContent = t.nombre;
    if (panelEl) panelEl.textContent = `${t.marca || 'Nomad'} // ${t.panel || ''}`;
    if (tagEl) tagEl.textContent = t.etiqueta?.texto || 'PERFIL MOLECULAR';
    if (waBtn) waBtn.href = getWhatsAppUrl(t);

    renderModalBody(t);

    if (modal && typeof modal.showModal === 'function') {
      modal.showModal();
      document.body.classList.add('modal-open');
    }
  }

  function closeTestModal() {
    const modal = document.getElementById('testDetailModal');
    if (modal && typeof modal.close === 'function') {
      modal.close();
      document.body.classList.remove('modal-open');
    }
  }

  /* ==========================================================================
     5. Inicialización de Controles e Interacciones
     ========================================================================== */
  function initControls() {
    // Perspectiva
    document.querySelectorAll('[data-perspective]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.stateGenomics.perspective = btn.getAttribute('data-perspective');
        renderCatalog();
      });
    });

    // Chips de Cáncer
    const cancersContainer = document.getElementById('cancersChipsContainer');
    if (cancersContainer) {
      cancersContainer.addEventListener('click', e => {
        const chip = e.target.closest('[data-cancer]');
        if (!chip) return;
        selectCancerNode(chip.getAttribute('data-cancer'));
      });
    }

    // Biomarcadores
    const biomarkersContainer = document.getElementById('biomarkersContainer');
    if (biomarkersContainer) {
      biomarkersContainer.addEventListener('click', e => {
        const chip = e.target.closest('[data-biomarker]');
        if (!chip) return;
        const b = chip.getAttribute('data-biomarker');
        window.stateGenomics.biomarker = (window.stateGenomics.biomarker === b) ? '' : b;
        renderCatalog();
      });
    }

    // Buscador
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        window.stateGenomics.q = searchInput.value.trim();
        renderCatalog();
      });
    }

    // Delegación en contenedor de pruebas
    const testsContainer = document.getElementById('testsContainer');
    if (testsContainer) {
      testsContainer.addEventListener('click', e => {
        if (e.target.id === 'btnResetFilters') {
          window.stateGenomics.cancer = '';
          window.stateGenomics.biomarker = '';
          window.stateGenomics.q = '';
          if (searchInput) searchInput.value = '';
          renderCatalog();
          return;
        }

        const openBtn = e.target.closest('[data-open]');
        if (openBtn) {
          const idx = parseInt(openBtn.getAttribute('data-open'), 10);
          if (!isNaN(idx)) openTestModal(idx);
        }
      });
    }

    // Tabs del Modal
    const tabPat = document.getElementById('modalTabPat');
    const tabDoc = document.getElementById('modalTabDoc');
    if (tabPat) {
      tabPat.addEventListener('click', () => {
        window.stateGenomics.perspective = 'patient';
        tabPat.classList.add('is-active');
        if (tabDoc) tabDoc.classList.remove('is-active');
        if (window.stateGenomics.cur) renderModalBody(window.stateGenomics.cur);
      });
    }
    if (tabDoc) {
      tabDoc.addEventListener('click', () => {
        window.stateGenomics.perspective = 'doctor';
        tabDoc.classList.add('is-active');
        if (tabPat) tabPat.classList.remove('is-active');
        if (window.stateGenomics.cur) renderModalBody(window.stateGenomics.cur);
      });
    }

    // Cierre del Modal
    const modalCloseBtn = document.getElementById('modalTestClose');
    const modal = document.getElementById('testDetailModal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTestModal);
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeTestModal();
      });
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeTestModal();
    });

    // Contact Form
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (form && status) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        status.innerHTML = '<span style="color:#00F0FF;">Transmitiendo solicitud médica al centro de coordinación...</span>';
        const data = Object.fromEntries(new FormData(form).entries());
        const waMsg = `Hola Nomad Genetics, mi nombre es ${data.nombre || ''}. Correo: ${data.correo || ''}. Mensaje: ${data.mensaje || ''}`;
        const waLink = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(waMsg)}`;

        setTimeout(() => {
          status.innerHTML = `
            <span style="color:#00FFA3; font-weight:700;">✓ Solicitud recibida con éxito.</span>
            <br><a href="${waLink}" target="_blank" rel="noopener" style="color:#00F0FF; text-decoration:underline;">
              Haz clic aquí para continuar de inmediato por WhatsApp
            </a>
          `;
          form.reset();
        }, 400);
      });
    }

    renderCatalog();
  }

  
  function initPipelineVideo() {
    const video = document.querySelector('.pipeline-movie-player');
    if (!video) return;

    // Configuración estricta de video silenciado en bucle
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.loop = true;

    // Garantizar que no se emita sonido bajo ninguna circunstancia
    video.addEventListener('volumechange', () => {
      if (!video.muted || video.volume > 0) {
        video.muted = true;
        video.volume = 0;
      }
    });

    const play = () => {
      video.muted = true;
      video.volume = 0;
      video.loop = true;
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    playPipelineVideo = play;

    // Reinicio forzado para bucle infinito sin interrupción
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      play();
    });

    // Reanudar automáticamente si el navegador pausó el video
    video.addEventListener('pause', () => {
      if (!document.hidden) {
        setTimeout(play, 150);
      }
    });

    // Intentar reproducción en eventos de carga de metadatos
    play();
    video.addEventListener('loadedmetadata', play, { once: true });
    video.addEventListener('canplay', play, { once: true });

    // Cuando el usuario interactúa con la página (scroll, click, toque)
    const onUserActive = () => {
      play();
    };
    window.addEventListener('scroll', onUserActive, { passive: true });
    window.addEventListener('click', onUserActive, { passive: true });
    window.addEventListener('touchstart', onUserActive, { passive: true });

    // Cuando la pestaña vuelve a ser visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) play();
    });

    // Observador de intersección: al aproximarse a la sección, asegurar reproducción
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            play();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(video);
    }

    // Intervalo de vigilancia: cada 2 segundos corrobora que se mantenga en reproducción
    setInterval(() => {
      if (video && video.paused && !document.hidden) {
        play();
      }
    }, 2000);
  }

  /* ==========================================================================
     Carrusel Fotográfico del Hero (Imágenes 2.1 a 2.3)
     ========================================================================== */
  function initHeroGalleryCarousel() {
    const carousel = document.getElementById('heroGalleryCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.hero-carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('heroCarouselPrev');
    const nextBtn = document.getElementById('heroCarouselNext');

    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;
    const intervalTime = 4200; // Transición automática cada 4.2 segundos

    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('is-active');
        } else {
          slide.classList.remove('is-active');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(nextSlide, intervalTime);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startTimer();
      });
    });

    // Pausar al pasar el cursor para leer cómodamente
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    // Soporte táctil swipe para móviles
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopTimer();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startTimer();
    }, { passive: true });

    startTimer();
  }

  /* ==========================================================================
     Mel – Asistente Virtual Clínica de Nomad Genetics
     ========================================================================== */
  function initMelChatbot() {
    const GROQ_API_KEY = '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';
    const GROQ_MODEL   = 'openai/gpt-oss-120b';

    /* ── DOM ─────────────────────────────────────────────────────────────── */
    const widget          = document.getElementById('melFloatingWidget');
    const chatWindow      = document.getElementById('melChatWindow');
    const openBtn         = document.getElementById('melOpenChatBtn');
    const closeBtn        = document.getElementById('melCloseChatBtn');
    const form            = document.getElementById('melChatForm');
    const input           = document.getElementById('melTextInput');
    const messagesEl      = document.getElementById('melMessagesContainer');
    const typingEl        = document.getElementById('melTypingIndicator');
    const voiceToggle     = document.getElementById('melVoiceToggle');
    const voiceWaves      = document.getElementById('melVoiceWaves');
    const micBtn          = document.getElementById('melMicBtn');
    const stopSpeechBtn   = document.getElementById('melStopSpeechBtn');
    const voiceStatusText = document.getElementById('melVoiceStatusText');
    const statusIndicator = document.getElementById('melStatusIndicator');
    const tooltip         = document.getElementById('melLauncherTooltip');

    if (!widget || !chatWindow || !openBtn) return; // Mel HTML not present

    /* ── Estado ──────────────────────────────────────────────────────────── */
    let voiceEnabled = true;
    let isRecording  = false;
    let recognition  = null;
    let conversationHistory = [];
    let greeted = false;

    /* ── Sistema Prompt ──────────────────────────────────────────────────── */
    function buildSystemPrompt() {
      let testList = '';
      if (window.CATALOGO_DATA && window.CATALOGO_DATA.pruebas) {
        window.CATALOGO_DATA.pruebas.forEach(p => {
          testList += `- ${p.nombre}${p.genes ? ' (' + p.genes + ' genes)' : ''}\n`;
        });
      } else {
        testList = `- FoundationOne CDx (324 genes)\n- FoundationOne Heme\n- FoundationOne Liquid CDx\n- FoundationOne Monitor\n- Tempus xT\n- Tempus xR\n- Tempus xT+xR\n- Tempus xE\n- Tempus xF\n- Tempus xF+\n- Tempus xM MRD\n- Guardant360 CDx\n- Guardant360 CDx Expanded\n- Guardant Reveal\n- Onco IDX Tissue\n- Invitae Multi-Cancer Panel\n`;
      }
      return `Eres Mel, la especialista virtual clínica de Nomad Genetics, plataforma de oncología de precisión en México.

PERSONALIDAD: Eres mujer, cálida, empática, profesional y muy humana. Tu tono es cercano, claro y natural, en español latinoamericano (México). Nunca suenas robótica.

REGLAS DE FORMATO Y LECTURA (OBLIGATORIAS):
1. NUNCA uses emojis ni emoticonos en tus respuestas (la voz humana del sistema no debe pronunciarlos).
2. NUNCA uses símbolos complejos como barras dobles (//), hashtags (#), corchetes ([ ]), flechas ni asteriscos excesivos.
3. Escribe en texto fluido y conversacional, con párrafos limpios y puntuación estándar (puntos y comas) para que la voz humana fluya con pausas naturales.
4. Nunca menciones precios en tus respuestas. Explica que la cotización y cobertura se coordinan directamente por WhatsApp.
5. Recomienda siempre consultar con el médico oncólogo tratante.
6. Mantén tus respuestas concisas: máximo 2 o 3 párrafos claros y directos.
7. Si el usuario se identifica como médico, puedes usar terminología molecular y clínica avanzada.
8. Cuando recomiendes una prueba, invita amablemente a verla en el catálogo tocando la opción Catálogo del menú.

TU MISIÓN:
1. Orientar a pacientes y médicos para seleccionar la prueba genómica adecuada según tipo de tumor, muestra disponible (sangre para biopsia líquida, tejido tumoral FFPE en bloque de parafina) y objetivos clínicos (diagnóstico, seguimiento, enfermedad mínima residual MRD o estudio hereditario).
2. Guiar al usuario por la página: Atlas ADN 3D (sección de pruebas con esferas tumorales), Catálogo interactivo, App Móvil Nomad, Pipeline del proceso y Contacto.
3. Informar que Nomad Genetics realiza todos los trámites con aseguradoras mexicanas (GNP, SURA, AXA, MetLife, BUPA, Inbursa, BBVA, Zurich, Banorte, Mapfre, Plan Seguro, Mediproses, Seguros Monterrey) para cobertura directa o reembolso. Cuando el usuario pregunte por trámites con aseguradoras o cobertura de pólizas, indícale expresamente comunicarse directamente por WhatsApp al 55 3999 7925 (línea exclusiva para trámites y cobertura con aseguradoras).
4. Para asesoría general, recolección de muestras o dudas sobre pruebas, invitar a comunicarse por WhatsApp al 55 7994 9420.

CATÁLOGO (17 pruebas):
${testList}
GUÍA RÁPIDA DE SELECCIÓN:
- Tumor sólido con tejido disponible: FoundationOne CDx, Tempus xT, Onco IDX Tissue.
- Biopsia líquida en sangre: Guardant360 CDx, FoundationOne Liquid CDx, Tempus xF o xF+.
- Hematológicos: FoundationOne Heme.
- Seguimiento y mínima residual: Guardant Reveal, Tempus xM MRD.
- Fusiones génicas y ARN: Tempus xR, Tempus xT con xR.
- Riesgo hereditario: Invitae Multi-Cancer Panel.`;
    }

    /* ── Abrir / Cerrar ──────────────────────────────────────────────────── */
    function openChat() {
      chatWindow.classList.add('is-open');
      chatWindow.setAttribute('aria-hidden', 'false');
      widget.style.display = 'none';
      input.focus();
      scrollBottom();
      if (voiceEnabled && !greeted) {
        greeted = true;
        setTimeout(() => speakText('¡Hola! Soy Mel, tu especialista virtual en Nomad Genetics. ¿En qué te puedo ayudar hoy?'), 500);
      }
    }

    function closeChat() {
      chatWindow.classList.remove('is-open');
      chatWindow.setAttribute('aria-hidden', 'true');
      widget.style.display = 'flex';
      stopSpeech();
    }

    openBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });

    // Auto-ocultar tooltip
    if (tooltip) setTimeout(() => { tooltip.style.opacity = '0'; tooltip.style.pointerEvents = 'none'; }, 6000);

    /* ── Envío de mensajes ───────────────────────────────────────────────── */
    form.addEventListener('submit', e => { e.preventDefault(); handleSend(input.value.trim()); });

    document.querySelectorAll('.mel-suggest-chip').forEach(chip => {
      chip.addEventListener('click', () => handleSend(chip.dataset.query || chip.textContent.trim()));
    });

    async function handleSend(text) {
      if (!text) return;

      // Ocultar chips tras primer mensaje
      const chips = document.getElementById('melQuickSuggestions');
      if (chips) chips.style.display = 'none';

      appendMsg('user', text);
      input.value = '';
      scrollBottom();

      typingEl.style.display = 'flex';
      if (statusIndicator) statusIndicator.textContent = 'Mel está analizando...';

      conversationHistory.push({ role: 'user', content: text });

      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: 'system', content: buildSystemPrompt() },
              ...conversationHistory
            ],
            max_tokens: 450,
            temperature: 0.72
          })
        });

        const data = await res.json();
        const reply = (data.choices && data.choices[0] && data.choices[0].message)
          ? data.choices[0].message.content
          : 'Lo siento, no pude procesar tu consulta. Por favor contáctanos por WhatsApp.';

        conversationHistory.push({ role: 'assistant', content: reply });
        typingEl.style.display = 'none';
        if (statusIndicator) statusIndicator.textContent = 'En línea · Asesor Clínico';

        appendMsg('mel', reply, true);
        scrollBottom();
        if (voiceEnabled) speakText(reply);

      } catch (err) {
        typingEl.style.display = 'none';
        if (statusIndicator) statusIndicator.textContent = 'En línea · Asesor Clínico';
        appendMsg('mel', 'Hubo un error de conexión. Por favor escríbenos por WhatsApp al +52 55 7994 9420.', true);
        scrollBottom();
      }
    }

    /* ── Render de burbujas ──────────────────────────────────────────────── */
    function appendMsg(role, text, showListen = false) {
      const row = document.createElement('div');
      row.className = `mel-message-row ${role}`;

      // Markdown-lite: **negrita**, saltos de línea
      const html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        .split('\n')
        .filter(l => l.trim())
        .map(l => `<p>${l}</p>`)
        .join('');

      const listenHtml = showListen
        ? `<button type="button" class="btn-msg-listen" aria-label="Escuchar respuesta"><span>🔊</span> Escuchar</button>`
        : '';

      row.innerHTML = `<div class="mel-msg-bubble">${html}${listenHtml}</div>`;

      if (showListen) {
        row.querySelector('.btn-msg-listen').addEventListener('click', () => speakText(text));
      }

      messagesEl.appendChild(row);
    }

    function scrollBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    /* ── Sanitizador de texto para locución humana (Cero emojis ni símbolos) ── */
    function cleanTextForHumanSpeech(raw) {
      if (!raw) return '';
      let clean = raw;

      // 1. Quitar bloques de código y etiquetas HTML
      clean = clean.replace(/```[\s\S]*?```/g, ' ');
      clean = clean.replace(/`([^`]+)`/g, '$1');
      clean = clean.replace(/<[^>]+>/g, ' ');

      // 2. Quitar enlaces y URLs
      clean = clean.replace(/https?:\/\/\S+/gi, ' ');
      clean = clean.replace(/www\.\S+/gi, ' ');

      // 3. Limpiar hashtags (#pruebas -> pruebas, #catalogo -> catálogo)
      clean = clean.replace(/#([a-zA-ZáéíóúñÁÉÍÓÚÑ0-9_-]+)/g, '$1');

      // 4. Limpiar prefijo internacional para que no lea 'más cincuenta y dos'
      clean = clean.replace(/\+52\s*/g, '');

      // 5. Reemplazar diagonales entre palabras por 'o' (ej. ADN/ARN -> ADN o ARN)
      clean = clean.replace(/([a-zA-ZáéíóúñÁÉÍÓÚÑ0-9]+)\s*\/\s*([a-zA-ZáéíóúñÁÉÍÓÚÑ0-9]+)/g, '$1 o $2');
      clean = clean.replace(/[\/\\]+/g, ' ');

      // 6. Eliminar absolutamente TODOS los emojis y emoticonos Unicode
      clean = clean.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{FE0E}\u{FE0F}\u{200D}\u{20E3}]/gu, ' ');

      // 7. Eliminar sintaxis markdown (negritas, cursivas, tachados)
      clean = clean.replace(/\*\*([^*]+)\*\*/g, '$1');
      clean = clean.replace(/\*([^*]+)\*/g, '$1');
      clean = clean.replace(/__([^_]+)__/g, '$1');
      clean = clean.replace(/_([^_]+)_/g, '$1');
      clean = clean.replace(/~~([^~]+)~~/g, '$1');

      // 8. Eliminar viñetas, guiones y numeraciones de lista al inicio
      clean = clean.replace(/^[ \t]*[-*•–—►][ \t]+/gm, ' ');
      clean = clean.replace(/^[ \t]*\d+[\.\)][ \t]+/gm, ' ');

      // 9. Quitar corchetes, paréntesis y llaves conservando las palabras interiores
      clean = clean.replace(/[\[\]\(\)\{\}]/g, ' ');

      // 10. Eliminar cualquier símbolo especial que el lector pueda pronunciar
      clean = clean.replace(/[*#_~<>\^|»«\"“”'‘’`•▪▫▶►▼▲–—+=%&$@]/g, ' ');

      // 11. Normalizar saltos de línea a pausas con punto
      clean = clean.replace(/\r?\n+/g, '. ');
      clean = clean.replace(/\s+/g, ' ');

      // 12. Limpiar puntuación repetida
      clean = clean.replace(/\s+([,\.!\?:;])/g, '$1');
      clean = clean.replace(/([,\.!\?:;])\1+/g, '$1');
      clean = clean.replace(/\.\s*\./g, '.');

      return clean.trim().substring(0, 950);
    }

    /* ── TTS (Voz de Mujer Latina y Muy Humana) ────────────────────────────── */
    function speakText(text) {
      if (!voiceEnabled || !window.speechSynthesis) return;
      stopSpeech();

      // Sanitización completa antes de reproducir
      const clean = cleanTextForHumanSpeech(text);
      if (!clean) return;

      const utt   = new SpeechSynthesisUtterance(clean);
      utt.lang    = 'es-MX';
      utt.rate    = 0.98;   // Cadencia conversacional humana, cálida y pausada
      utt.pitch   = 1.10;   // Tono femenino cálido, empático y natural
      utt.volume  = 1.0;

      // Detección de voces masculinas para descarte estricto
      const isMaleVoice = v => {
        const name = (v.name || '').toLowerCase();
        return /\b(male|hombre|pablo|raul|raúl|jorge|alvaro|álvaro|diego|enrique|carlos|miguel|gonzalo|david|manuel|alberto|pedro|julio|mateo|ignacio|andrés|andres|tomas|tomás|fernando|ricardo|sebastian|sebastián)\b/i.test(name) ||
               /desktop.*(pablo|raul|jorge)/i.test(name);
      };

      // Detección de acento de España para penalización
      const isSpainVoice = v => {
        const name = (v.name || '').toLowerCase();
        const lang = (v.lang || '').toLowerCase();
        return lang === 'es-es' || /\b(spain|españa|castilian|castellano|helena)\b/i.test(name);
      };

      // Nombres típicamente femeninos
      const isFemaleName = v => {
        const name = (v.name || '').toLowerCase();
        return /\b(dalia|sabina|paulina|larissa|salome|salomé|sofia|sofía|camila|paola|lupe|paloma|mia|mía|andrea|valentina|marina|jimena|ximena|karina|daniela|monica|mónica|female|mujer)\b/i.test(name) ||
               /estados unidos/i.test(name);
      };

      // Selección de la mejor voz femenina latina
      const selectVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        const scoreVoice = v => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();

          // Si no es español, descartar
          if (!lang.startsWith('es')) return -9999;

          // Si es voz masculina, descartar totalmente
          if (isMaleVoice(v)) return -5000;

          let score = 0;

          // Preferencia primordial: acento mexicano y latinoamericano
          if (lang === 'es-mx' || lang === 'es_mx') score += 1000;
          else if (lang === 'es-419' || lang === 'es-us' || lang === 'es-co') score += 800;
          else if (lang.startsWith('es-') && lang !== 'es-es') score += 600;

          // Voces femeninas latinas de alta calidad natural
          if (/\bdalia\b/i.test(name)) score += 1500; // La mejor voz mexicana natural en Windows/Edge
          if (/\bsabina\b/i.test(name)) score += 1400; // Sabina (México)
          if (/\bpaulina\b/i.test(name)) score += 1300; // Paulina (México en Apple/Google)
          if (/\b(larissa|salome|salomé|camila|sofia|sofía|paola)\b/i.test(name)) score += 1100;
          if (/estados unidos/i.test(name) && /google/i.test(name)) score += 1200; // Google español de EE.UU. (latina femenina)

          // Voces neuronales/naturales modernas
          if (/natural|neural|online/i.test(name)) score += 600;
          if (isFemaleName(v)) score += 400;

          // Penalización drástica para acento de España
          if (isSpainVoice(v)) score -= 1500;
          if (/compact/i.test(name)) score -= 400;

          return score;
        };

        const sorted = voices
          .filter(v => (v.lang || '').toLowerCase().startsWith('es'))
          .map(v => ({ voice: v, score: scoreVoice(v) }))
          .sort((a, b) => b.score - a.score);

        return (sorted.length > 0 && sorted[0].score > -4000) ? sorted[0].voice : null;
      };

      const applyAndSpeak = () => {
        const best = selectVoice();
        if (best) utt.voice = best;

        utt.onstart = () => {
          if (voiceWaves)      voiceWaves.classList.add('is-speaking');
          if (stopSpeechBtn)   stopSpeechBtn.style.display = 'inline-flex';
          if (voiceStatusText) voiceStatusText.textContent = 'Mel está hablando...';
        };
        utt.onend = utt.onerror = () => {
          if (voiceWaves)      voiceWaves.classList.remove('is-speaking');
          if (stopSpeechBtn)   stopSpeechBtn.style.display = 'none';
          if (voiceStatusText) voiceStatusText.textContent = voiceEnabled ? 'Mel · Voz latina activa' : 'Voz desactivada';
        };
        window.speechSynthesis.speak(utt);
      };

      // Si las voces aún no han cargado, aguardar el evento
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = applyAndSpeak;
      } else {
        applyAndSpeak();
      }
    }

    function stopSpeech() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (voiceWaves)      voiceWaves.classList.remove('is-speaking');
      if (stopSpeechBtn)   stopSpeechBtn.style.display = 'none';
      if (voiceStatusText) voiceStatusText.textContent = voiceEnabled ? 'Mel · Voz latina activa' : 'Voz desactivada';
    }

    // Toggle voz
    if (voiceToggle) {
      voiceToggle.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        voiceToggle.classList.toggle('is-active', voiceEnabled);
        const on  = voiceToggle.querySelector('.icon-voice-on');
        const off = voiceToggle.querySelector('.icon-voice-off');
        if (on)  on.style.display  = voiceEnabled ? '' : 'none';
        if (off) off.style.display = voiceEnabled ? 'none' : '';
        if (!voiceEnabled) stopSpeech();
        if (voiceStatusText) voiceStatusText.textContent = voiceEnabled ? 'Mel · Voz latina activa' : 'Voz desactivada';
      });
    }

    // Botón detener voz
    if (stopSpeechBtn) stopSpeechBtn.addEventListener('click', stopSpeech);

    /* ── Dictado (STT) ───────────────────────────────────────────────────── */
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
          alert('Tu navegador no soporta dictado por voz. Usa Chrome para esta función.');
          return;
        }

        if (isRecording) {
          recognition && recognition.stop();
          return;
        }

        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SR();
        recognition.lang = 'es-MX';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          isRecording = true;
          micBtn.classList.add('is-recording');
          input.placeholder = 'Escuchando...';
        };
        recognition.onresult = e => {
          const transcript = e.results[0][0].transcript;
          input.value = transcript;
          input.focus();
        };
        recognition.onend = recognition.onerror = () => {
          isRecording = false;
          micBtn.classList.remove('is-recording');
          input.placeholder = 'Escribe o pregunta a Mel...';
        };

        recognition.start();
      });
    }

    // Botones "Escuchar" del mensaje inicial en HTML
    document.querySelectorAll('#melMessagesContainer .btn-msg-listen').forEach(btn => {
      btn.addEventListener('click', () => {
        const bubble = btn.closest('.mel-msg-bubble');
        if (!bubble) return;
        const txt = Array.from(bubble.querySelectorAll('p')).map(p => p.textContent).join(' ');
        speakText(txt);
      });
    });
  }

  /* ── Banner de Consentimiento de Cookies ─────────────────────────────── */
  function initCookieConsent() {
    const toast = document.getElementById('cookieConsentToast');
    if (!toast) return;

    // Verificar si ya se otorgó consentimiento previo
    const consent = localStorage.getItem('nomad_cookies_consent');
    if (consent) return;

    // Mostrar el banner de manera sutil tras 1.2 segundos
    setTimeout(() => {
      toast.classList.add('is-visible');
    }, 1200);

    function hideToast(preference) {
      try {
        localStorage.setItem('nomad_cookies_consent', preference);
      } catch (err) {}
      toast.classList.remove('is-visible');
    }

    const btnAccept = document.getElementById('btnAcceptCookies');
    const btnMinimal = document.getElementById('btnNecessaryCookies');
    const btnClose = document.getElementById('cookieToastClose');

    if (btnAccept) btnAccept.addEventListener('click', () => hideToast('all'));
    if (btnMinimal) btnMinimal.addEventListener('click', () => hideToast('necessary'));
    if (btnClose) btnClose.addEventListener('click', () => hideToast('dismissed'));
  }

  /* ── Arranque del portal ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initSequencerGate();
    initHDThreeJSDNA();
    initControls();
    initPipelineVideo();
    initHeroGalleryCarousel();
    initMelChatbot();
    initCookieConsent();
  });
})();
