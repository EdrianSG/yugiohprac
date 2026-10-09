/* Yu-Gi-Oh AR: carta del Mago Oscuro, seguimiento y ataque demostrativo. */
'use strict';

// Reproduce la animación integrada "Take 001" sin otra librería externa.
AFRAME.registerComponent('play-idle-animation', {
  init: function () {
    this.mixer = null;
    this.onLoaded = () => {
      const model = this.el.getObject3D('mesh');
      const clips = model && model.animations;
      if (model && clips && clips.length) {
        this.mixer = new THREE.AnimationMixer(model);
        this.mixer.clipAction(clips[0]).play();
        console.info('[Yu-Gi-Oh AR] Animación original del modelo activada:', clips[0].name);
      }
    };
    this.el.addEventListener('model-loaded', this.onLoaded);
    if (this.el.getObject3D('mesh')) this.onLoaded();
  },
  tick: function (_time, delta) {
    if (this.mixer && delta > 0) this.mixer.update(Math.min(delta / 1000, 0.1));
  },
  remove: function () {
    this.el.removeEventListener('model-loaded', this.onLoaded);
    if (this.mixer) this.mixer.stopAllAction();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('a-scene');
  const target = document.getElementById('image-target');
  const model = document.getElementById('magician-model');
  const statusText = document.getElementById('status-text');
  const attackButton = document.getElementById('attack-button');
  const attackRig = document.getElementById('attack-rig');
  const effect = document.getElementById('attack-effect');
  const help = document.getElementById('help-dialog');

  let detected = false;
  let loaded = false;
  let attacking = false;
  let attackTimeout = null;
  let ready = false;

  const status = (message) => { statusText.textContent = message; };
  const refreshButton = () => { attackButton.disabled = !detected || !loaded || attacking; };

  document.getElementById('help-button').addEventListener('click', () => help.classList.add('open'));
  document.getElementById('close-help').addEventListener('click', () => help.classList.remove('open'));
  help.addEventListener('click', event => { if (event.target === help) help.classList.remove('open'); });

  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    status('Para activar la cámara, usa HTTPS o localhost y un navegador compatible.');
  }

  model.addEventListener('model-loaded', () => {
    loaded = true;
    refreshButton();
    if (detected) status('¡Mago Oscuro invocado!');
    else if (ready) status('Cámara lista. Enfoca la carta Mago Oscuro.');
    console.info('[Yu-Gi-Oh AR] Modelo cargado');
  });
  model.addEventListener('model-error', event => {
    loaded = false;
    refreshButton();
    status('El modelo 3D no cargó. Comprueba assets/mago_oscuro.glb.');
    console.error('[Yu-Gi-Oh AR] Error de modelo', event);
  });
  scene.addEventListener('arReady', () => {
    ready = true;
    status(loaded ? 'Cámara lista. Enfoca la carta Mago Oscuro.' : 'Cámara lista. Cargando el modelo 3D...');
  });
  scene.addEventListener('arError', event => {
    status('Error de AR. Comprueba permisos de cámara, HTTPS y targets.mind.');
    console.error('[Yu-Gi-Oh AR] Error AR', event);
  });

  target.addEventListener('targetFound', () => {
    detected = true;
    document.body.classList.add('found');
    refreshButton();
    status(loaded ? '¡Mago Oscuro invocado!' : 'Carta detectada. Cargando el modelo 3D...');
  });
  target.addEventListener('targetLost', () => {
    detected = false;
    document.body.classList.remove('found');
    refreshButton();
    if (!attacking) status('Carta perdida. Vuelve a enfocarla.');
  });

  attackButton.addEventListener('click', () => {
    if (!detected || !loaded || attacking) return;
    attacking = true;
    refreshButton();
    status('¡Ataque del Mago Oscuro! ✦');

    // Ataque visual sobre el personaje, independiente de su animación idle.
    attackRig.removeAttribute('animation__attack');
    attackRig.setAttribute('position', '0 0 0');
    attackRig.setAttribute('animation__attack', {
      property: 'position', from: '0 0 0', to: '0 0.18 0',
      dur: 320, dir: 'alternate', loop: 2, easing: 'easeOutCubic'
    });
    effect.removeAttribute('animation__burst');
    effect.setAttribute('visible', true);
    effect.setAttribute('scale', '0.2 0.2 0.2');
    effect.setAttribute('animation__burst', {
      property: 'scale', from: '0.2 0.2 0.2', to: '2.2 2.2 2.2',
      dur: 690, easing: 'easeOutCubic'
    });

    if (attackTimeout) clearTimeout(attackTimeout);
    attackTimeout = setTimeout(() => {
      effect.setAttribute('visible', false);
      effect.removeAttribute('animation__burst');
      effect.setAttribute('scale', '1 1 1');
      attackRig.removeAttribute('animation__attack');
      attackRig.setAttribute('position', '0 0 0');
      attacking = false;
      refreshButton();
      status(detected ? 'Mago Oscuro listo para el próximo ataque.' : 'Vuelve a enfocar la carta.');
    }, 800);
  });
});
