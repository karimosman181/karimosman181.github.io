var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });

  function callTimeout(isOpen, time) {
    setTimeout(function() {
      if (isOpen) {
          $('#loading-container-2').fadeOut(); 
          $('#dvd-container').fadeIn(); 
          // $('.navbar').fadeIn(); 
        time = (Math.floor(Math.random() * 120) + 20) * 200;
      } else {
          $('#loading-container-2').fadeIn(); 
          $('#dvd-container').fadeOut(); 
          // $('.navbar').fadeOut(); 
        time = Math.floor(Math.random() * 6) * 200;
      }
      isOpen = !isOpen;
      callTimeout(isOpen, time);
    }, time);
  }
  
  callTimeout(true, Math.floor(Math.random() * 6) * 100)

      (() => {
    let c = document.querySelector("#loading-glitch-1");
    let x = c.getContext("2d");
  
    let c2 = document.querySelector("#loading-glitch-2");
    let x2 = c2.getContext("2d");
  
    let s = getComputedStyle(c);
    let w = parseInt(s.width),
      h = parseInt(s.height),
      t = s.top,
      l = s.left,
      cx = parseInt(s.cx),
      cy = parseInt(s.cy);
    (cx =
      cx != null && !isNaN(cx)
        ? cx
        : t == "auto" || t.includes("%") ? 0 : parseInt(t)),
      (cy =
        cy != null && !isNaN(cy)
          ? cy
          : l == "auto" || l.includes("%") ? 0 : parseInt(l));
  
  
  
    let s2 = getComputedStyle(c2);
    let w2 = parseInt(s2.width),
      h2 = parseInt(s2.height),
      t2 = s2.top,
      l2 = s2.left,
      cx2 = parseInt(s2.cx),
      cy2 = parseInt(s2.cy);
    (cx2 =
      cx2 != null && !isNaN(cx2)
        ? cx2
        : t2 == "auto" || t2.includes("%") ? 0 : parseInt(t2)),
      (cy2 =
        cy2 != null && !isNaN(cy)
          ? cy2
          : l2 == "auto" || l2.includes("%") ? 0 : parseInt(l2));
  
  
    let col = ["white","black","gray","lightgray","darkgray"];
  
    let row = ["red", "green", "blue" ,"yellow"];
  
    var ri = len => Math.floor(Math.random() * len);
    let f = "";

  
  
  for (let j = cy2; j <= h2; j+=1.5) {
      for (let i = cx2; i <= w2; i++) {
        x2.fillStyle = row[ri(row.length)];
        x2.fillRect(j, i, 1, 8000);
      }
    }
  
    for (let i = cx; i <= w; i++) {
      for (let j = cy; j <= h; j+=1.5) {
        x.fillStyle = col[ri(col.length)];
        x.fillRect(i, j, 1, 1);
      }
    }
  
    setInterval(function() {
      let rand = () => Math.floor(Math.random() * 400);
      document.querySelectorAll(".one").forEach(el => {
        el.setAttribute(
          "style",
          `background:url('${c.toDataURL()}')  repeat; background-position:${rand()}px ${rand()}px;`
        );
      });
    }, 20);
  
    setInterval(function() {
      let rand = () => Math.floor(Math.random() * 400);
      document.querySelectorAll(".two").forEach(el => {
        el.setAttribute(
          "style",
          `background:url('${c2.toDataURL()}')  repeat; background-position:${rand()}px ${rand()}px;`
        );
      });
    }, 20);
  
    
  })();

      $(window).on('load', function() { 
    
     $('#loading-container-1').delay(1000).fadeOut(); 
   
     $('#dvd-container').delay(850).fadeIn(); 
   })

  const tvElm = document.querySelector('#tv');
  const logoElm = document.querySelector('#logo');
  
  let speed = 100; // px per second
  let monitorBG = 128; // color
  let isCtrl = false;
  
  let lastTime = +new Date();
  let deltaTime = 0;
  let movement = [1, 1]; // [x, y]
  let tvBounds = tvElm.getBoundingClientRect();
  let logoBounds = logoElm.getBoundingClientRect();
  let x = 0;
  let y = 0;
  let nextX = 0;
  let nextY = 0;
  
  const randomRange = (min, max) => min + crypto.getRandomValues(new Uint32Array(1))[0] % (max - min + 1);
  
  const collide = () => {
    const red = randomRange(0, 8) * 32;
    const green = randomRange(0, 8) * 32;
    const blue = randomRange(0, 8) * 32;
    const avg = red + blue + green / 3;
    // console.log(red, green, blue, avg)
    if (
    Math.abs(avg - red) < 80 &&
    Math.abs(avg - green) < 80 &&
    Math.abs(avg - blue) < 80)
    {
      return collide();
    }
  
    const bgCol = `rgb(${red}, ${green}, ${blue})`;
    logoElm.style.backgroundColor = bgCol;
    logoElm.style.color = red * 0.299 + green * 0.587 + blue * 0.114 <= 186 ?
    '#FFFFFF' :
    '#000000';
  
  };
  
  const loop = () => {
    deltaTime = new Date() - lastTime;
    // deltaTime = 1;
    lastTime = +new Date();
  
    tvBounds = tvElm.getBoundingClientRect();
    logoBounds = logoElm.getBoundingClientRect();
  
    x = logoBounds.left;
    y = logoBounds.top;
  
    if (logoBounds.left < tvBounds.left) {
      movement[0] = 1;
      x = tvBounds.left;
      collide();
    }
    if (logoBounds.right > tvBounds.right) {
      movement[0] = -1;
      x = tvBounds.right - logoBounds.width;
      collide();
    }
    if (logoBounds.top < tvBounds.top) {
      movement[1] = 1;
      y = tvBounds.top;
      collide();
    }
    if (logoBounds.bottom > tvBounds.bottom) {
      movement[1] = -1;
      y = tvBounds.bottom - logoBounds.height;
      collide();
    }
  
    nextX = x + speed * deltaTime / 1000 * movement[0] - tvBounds.left;
    nextY = y + speed * deltaTime / 1000 * movement[1] - tvBounds.top;
  
    logoElm.style.left = `${nextX}px`;
    logoElm.style.top = `${nextY}px`;
  
    requestAnimationFrame(loop);
    // setTimeout(loop, 1000)
  };
  
  loop();
  