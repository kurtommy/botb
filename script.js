const module = () => {
  const pointer = document.querySelector('.pointer');
  const img = document.querySelector('img');
  const imgWrapper = document.querySelector('.img-wrapper');
  const canvas = document.getElementById('canvas');
  const coords = document.getElementById('coords');
  const radius = document.getElementById('radius');
  let r = 20;
  let ratio = 4;

  initCanvas = () => {
    // console.info(img.naturalWidth / ratio);
    imgWrapper.style.width = `${img.naturalWidth / ratio}px`;
    imgWrapper.style.height = `${img.naturalHeight / ratio}px`;
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth / ratio;
    canvas.height = img.naturalHeight / ratio;
    ctx.drawImage(img, 0, 0, img.naturalWidth / ratio, img.naturalHeight / ratio );
  };

  const points = [];
  let debouncer;

  const addPoint = e => {
    const coords = {
      top: e.offsetY,
      left: e.offsetX
    };
    console.info(coords);
    return coords;
  };

  const drawLines = mouseCoord => {
    points.forEach(point => {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(point.left, point.top);
      ctx.lineTo(mouseCoord.offsetX, mouseCoord.offsetY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ff0000';
      ctx.stroke();
    });
    area = Math.ceil(Math.PI * Math.pow(r * ratio, 2));
    coords.innerHTML = `X:${mouseCoord.offsetX * ratio}, Y:${mouseCoord.offsetY * ratio}, ${area}`;
  };

  const mouseMoveListener = e => {
    let pointerSize = pointer.getBoundingClientRect();
    pointer.style.top = `${e.offsetY - pointerSize.width / 2}px`;
    pointer.style.left = `${e.offsetX - pointerSize.height / 2}px`;
    if (debouncer) {
      clearTimeout(debouncer);
    }
    requestAnimationFrame(() => {
      initCanvas();
      drawLines(e);
    });
  };
  const mouseClickListener = e => {
    points.push(addPoint(e));
  };

  const updatePointerRadius = rad => {
    pointer.style.width = `${rad}px`;
    pointer.style.height = `${rad}px`;
    pointer.style.borderRadius = `${rad / 2}px`;
    r = rad;
  };

  const keyDownListener = e => {
    console.info(e.key);

    switch (e.key) {
      case 'q':
        if (ratio > 1) {
          console.info(points);
          points.forEach(point => {
            point.top = point.top * ratio / (ratio - 1);
            point.left = point.left * ratio / (ratio - 1);
          });
          console.info(points);
          ratio--;
        }
        break;
      case 'w':
        points.forEach(point => {
          point.top = point.top * ratio / (ratio + 1);
          point.left = point.left * ratio / (ratio + 1);
        });
        ratio++;
        break;
      case 'a':
        updatePointerRadius(r + 10);
        break;
      case 's':
        updatePointerRadius(r - 10);
      default:
        break;
    }
    requestAnimationFrame(() => {
      initCanvas();
    });
  };

  initCanvas();

  canvas.addEventListener('mousemove', mouseMoveListener);
  canvas.addEventListener('click', mouseClickListener);
  document.addEventListener('keydown', keyDownListener, true);
};

window.onload = () => {
  module();
};
