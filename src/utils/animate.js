export function animate({targets, opacity, translateY, width, value, duration = 1000, delay = 0, easing = 'linear', round, update, complete}) {
  const el = targets instanceof Element
    ? targets
    : typeof targets === 'string'
    ? document.querySelectorAll(targets)
    : targets;
  const start = performance.now() + delay;
  const easings = {
    linear: t => t,
    easeOutQuad: t => 1 - (1 - t) * (1 - t),
    easeOutElastic: t => {
      const c4 = (2 * Math.PI) / 3;
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
  };
  const easingFn = easings[easing] || easings.linear;
  const from = {
    opacity: opacity ? opacity[0] : undefined,
    translateY: translateY ? translateY[0] : undefined,
    width: width ? width[0] : undefined,
    value: value ? value[0] : undefined,
  };
  const to = {
    opacity: opacity ? opacity[1] : undefined,
    translateY: translateY ? translateY[1] : undefined,
    width: width ? width[1] : undefined,
    value: value ? value[1] : undefined,
  };
  function frame(now) {
    if (now < start) {
      requestAnimationFrame(frame);
      return;
    }
    const progress = Math.min((now - start) / duration, 1);
    const eased = easingFn(progress);
    const elements = el instanceof NodeList || Array.isArray(el) ? Array.from(el) : [el];
    elements.forEach((element) => {
      if (element instanceof Element) {
        if (opacity) {
          const val = from.opacity + (to.opacity - from.opacity) * eased;
          element.style.opacity = val;
        }
        if (translateY) {
          const val = from.translateY + (to.translateY - from.translateY) * eased;
          element.style.transform = `translateY(${val}px)`;
        }
        if (width) {
          const val = from.width + (to.width - from.width) * eased;
          element.style.width = `${val}%`;
        }
      }
    });
    if (value) {
      const val = from.value + (to.value - from.value) * eased;
      const rounded = round ? Math.round(val) : val;
      if (update) update(rounded);
    }
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else if (complete) {
      complete();
    }
  }
  requestAnimationFrame(frame);
}
