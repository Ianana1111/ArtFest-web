// app/page.tsx
'use client';

import React, {  useState, useEffect, useRef } from 'react';
// useRef,
import { useRouter } from 'next/navigation'; // 使用 next/navigation 路由器

// import Image from 'next/image';
import ImageLoader from '../../components/ImageLoader'; // Adjust the path as necessary
// import Draggable from 'react-draggable';
// import puzzleBg from '../../public/puzzle-bg-5.png'; // Adjust the path as necessary

// import { Stick } from "next/font/google"
// import { Potta_One } from "next/font/google"
import { Kaisei_Opti } from "next/font/google"
// import { Yuji_Syuku } from "next/font/google"
// import { Zen_Antique } from "next/font/google"
// import { Reggae_One } from "next/font/google"
// import { Zen_Antique_Soft } from "next/font/google"
// import { Yusei_Magic } from "next/font/google"
// import { Yusei_Magic } from "next/font/google"
// import { Dela_Gothic_One } from "next/font/google"

const bokorFont = Kaisei_Opti({
  subsets: ['latin'],
  weight: "700",
})

export default function Page() {
  const router = useRouter();
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [holePosition, setHolePosition] = useState({ x: 300, y: 200 });
  const [puzzlePosition, setPuzzlePosition] = useState({ x: 50, y: 100 });
  // const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);  // 新增：追踪拼圖是否完成
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  // const [borderStyle, setBorderStyle] = useState('none'); // 新增狀態來管理邊框樣式
  // const [borderStyle, setBorderStyle] = useState('2px solid white'); // 初始邊框樣式

  // 定義拼圖形狀
  // const PUZZLE_SHAPE_PIXELS = `polygon(
  //   20px 0px, 
  //   30px 0px, 
  //   30px 10px, 
  //   40px 10px,
  //   50px 10px, 
  //   60px 10px, 
  //   70px 0px, 
  //   80px 0px, 
  //   100px 0px, 
  //   100px 20px, 
  //   90px 30px,
  //   90px 40px, 
  //   90px 50px, 
  //   90px 60px,
  //   100px 70px, 
  //   100px 80px, 
  //   100px 100px, 
  //   80px 100px, 
  //   70px 90px, 
  //   60px 90px, 
  //   50px 90px, 
  //   40px 90px, 
  //   30px 100px, 
  //   20px 100px, 
  //   0px 100px, 
  //   0px 80px, 
  //   10px 70px, 
  //   10px 60px, 
  //   10px 50px, 
  //   10px 40px, 
  //   0px 30px, 
  //   0px 20px
  // )`;

  useEffect(() => {
    // 設置初始視窗大小
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // 監聽視窗大小變化
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 計算背景圖片的實際尺寸和位置
  useEffect(() => {
    const img = new window.Image();
    // img.src = puzzleBg.src; // Use the custom loader
    img.src = ImageLoader({ src: 'puzzle-bg-5.png' }); // Use the custom loader
    // img.src = '/puzzle-bg-5.png';
    // img.src = 'https://averybigwhale.github.io/entry/public/puzzle-bg-5.png';
    img.onload = () => {
      const imgRatio = img.width / img.height;
      const windowRatio = windowSize.width / windowSize.height;
      
      let bgWidth, bgHeight, bgX, bgY;
      
      if (windowRatio > imgRatio) {
        // 窗口比圖片寬，圖片會填滿寬度
        bgWidth = windowSize.width;
        bgHeight = windowSize.width / imgRatio;
        bgX = 0;
        bgY = (windowSize.height - bgHeight) / 2;
      } else {
        // 窗口比圖片窄，圖片會填滿高度
        bgHeight = windowSize.height;
        bgWidth = windowSize.height * imgRatio;
        bgX = (windowSize.width - bgWidth) / 2;
        bgY = 0;
      }

      setBackgroundSize({ width: bgWidth, height: bgHeight });
      setBackgroundPosition({ x: bgX, y: bgY });
      // console.log('背景位置:', { x: bgX, y: bgY });
      console.log('背景圖片最左上角座標：', bgX, bgY);
    };


    // console.log(f`'背景圖片尺寸: { width: ${backgroundSize.width}, height: ${backgroundSize.height} }');
    // console.log(f`背景圖片位置: { x: ${backgroundPosition.x}, y: ${backgroundPosition.y} }`);
  }, [windowSize]);

  // useEffect(() => {
  //   console.log('背景位置 (state):', backgroundPosition);
  // }, [backgroundPosition]);
  
  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.dataTransfer.setData('text', e.currentTarget.id);

  //   // Create a custom drag image
  //   const dragImage = document.createElement('div');
  //   dragImage.style.width = '100px';
  //   dragImage.style.height = '100px';
  //   // dragImage.style.backgroundColor  = '#fff'; // Change to desired color
  //   dragImage.style.backgroundImage = `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`;

  //   dragImage.style.backgroundSize = `${backgroundSize.width}px ${backgroundSize.height}px`;
  //   dragImage.style.backgroundPosition = `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`;
            
  //   dragImage.style.opacity = '1'; // Optional: make it slightly transparent
  //   dragImage.style.position = 'absolute';
  //   dragImage.style.pointerEvents = 'none'; // Prevent interaction with the drag image
  //   dragImage.style.clipPath = PUZZLE_SHAPE_PIXELS;
  //   // dragImage.style.WebkitClipPath = PUZZLE_SHAPE_PIXELS,
  //   // Append to body to make it visible
  //   document.body.appendChild(dragImage);

  //   // Set the custom drag image
  //   e.dataTransfer.setDragImage(dragImage, 50, 50); // Offset to center the image

    
  //   // Remove the custom drag image after a short delay
  //   setTimeout(() => {
  //     document.body.removeChild(dragImage);
  //   }, 0);
  //   setIsDragging(true);
  //   // setBorderStyle(BORDER_STYLE); // 拖曳時設置白色邊框
  // };

  // // 拖曳結束
  // const handleDragEnd = () => {
  //   setIsDragging(false);
  // };

  // 拖曳進入區域時顯示放置提示
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOverDropZone(true);
  };

  // 拖曳離開區域時，隱藏提示
  const handleDragLeave = () => {
    setIsOverDropZone(false);
  };

  // 修改放置處理函數
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOverDropZone(false);
    
    const data = e.dataTransfer.getData('text');
    if (data === 'puzzlePiece') {
        setIsCompleted(true);  // 設置完成狀態
        // 延遲跳轉
        setTimeout(() => {
            router.replace('./arg-home/uncover');  // 使用 replace 來確保不保留當前狀態
        }, 1200);  // 2秒後跳轉
    }
  };  

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setPointerOffset({
      x: touch.clientX - puzzlePosition.x,
      y: touch.clientY - puzzlePosition.y,
    });
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const newPos = {
      x: touch.clientX - pointerOffset.x,
      y: touch.clientY - pointerOffset.y,
    };
    setPuzzlePosition(newPos);
  
    // 評估拼圖塊是否進入放置區 (這裡以寬高 100px 為例)
    if (
      newPos.x + 40 > holePosition.x &&
      newPos.x < holePosition.x + 40 &&
      newPos.y + 40 > holePosition.y &&
      newPos.y < holePosition.y + 40
    ) {
      setIsOverDropZone(true);
    } else {
      setIsOverDropZone(false);
    }
  };
  
  // 假設拼圖和缺口寬高均為100px
  const isInDropZone = (): boolean => {
    return (
      puzzlePosition.x + 10 > holePosition.x &&
      puzzlePosition.x < holePosition.x + 10 &&
      puzzlePosition.y + 10 > holePosition.y &&
      puzzlePosition.y < holePosition.y + 10
    );
  };

  const handleTouchEnd = () => {
    // setIsDragging(false);
    if (isInDropZone()) {
      setIsCompleted(true); // 與 drop 一樣的完成邏輯
      setTimeout(() => {
        router.replace('./arg-home/uncover');
      }, 1200);
    }
  };

  // const handleTouchEnd = () => {
  //   setIsDragging(false);
  // };

  // 狀態與偏移同上
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  // Pointer down 時
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 把事件 target 綁定為 pointer capture，未來 pointer move 都會發送到這個元素
    e.currentTarget.setPointerCapture(e.pointerId);
    setPointerOffset({
      x: e.clientX - puzzlePosition.x,
      y: e.clientY - puzzlePosition.y,
    });
  };

  // Pointer move 時更新位置
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // 檢查是否已經 capture pointerId
    e.preventDefault(); // 防止預設行為，如頁面滾動
    if (e.pressure === 0) return;
    setPuzzlePosition({
      x: e.clientX - pointerOffset.x,
      y: e.clientY - pointerOffset.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    // setIsDragging(false);
    // 檢查是否在放置區域內
    if (isInDropZone()) {
      setIsCompleted(true);
      setTimeout(() => {
        router.replace('./arg-home/uncover');
      }, 1200);
    }
  };

  // Pointer up（拖曳結束）
  // const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
  //   e.currentTarget.releasePointerCapture(e.pointerId);
  //   setIsDragging(false);
  // };

  useEffect(() => {
    console.log('圖塊位置 (state):', backgroundPosition.x - holePosition.x, backgroundPosition.y - holePosition.y);
    console.log('背景位置 (state):', backgroundPosition.x, backgroundPosition.y);
    console.log('hole 位置 (state):', holePosition.x, holePosition.y);
  }, [backgroundPosition]);

  // useEffect(() => {
  //   const diff = windowSize.height - backgroundSize.height;
  //   console.log('window height 減 background height 的差值:', diff);
  // }, [windowSize, backgroundSize]);

  // 在你的 component 裡面直接計算 diff
  
  // useEffect(() => {
  //   const textEl = document.getElementById('safeText');
  //   if (textEl) {
  //     const rect = textEl.getBoundingClientRect();
  //     // 儲存 safeZone 範圍，這裡舉例：
  //     const safeZone = {
  //       top: rect.top,
  //       left: rect.left,
  //       bottom: rect.bottom,
  //       right: rect.right,
  //     };
  //     console.log('safeZone:', safeZone);
  
  //     // 之後你可以在判斷拼圖或缺口是否落在 safe zone 中，
  //     // 並作調整以避免重疊這個區域。
  //   }
  // }, [windowSize]);

  const safeTextRef = useRef<HTMLDivElement>(null);
  const [safeZone, setSafeZone] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  
  useEffect(() => {
    if (safeTextRef.current) {
      const rect = safeTextRef.current.getBoundingClientRect();
      setSafeZone({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
      console.log("safeText position:", rect);
    }
  }, []);


  // const isInSafeZone = React.useCallback((x: number, y: number, size: number): boolean => {
  //   return (
  //     (x + size > window.innerWidth * 0.18 &&
  //     x < window.innerWidth * 0.18 + window.innerWidth * 0.22 &&
  //     y + size > window.innerHeight * 0.35 &&
  //     y < window.innerHeight * 0.35 + window.innerHeight * 0.35)
  //     &&
  //     (x + size > safeZone?.left &&
  //     x < window.innerWidth * 0.18 + window.innerWidth * 0.22 &&
  //     y + size > window.innerHeight * 0.35 &&
  //     y < window.innerHeight * 0.35 + window.innerHeight * 0.35)
  //   );
  // }, []);
  const isInSafeZone = React.useCallback((x: number, y: number, size: number): boolean => {
    // 定義固定 safe zone
    const fixedSafeZone = {
      left: window.innerWidth * 0.18,
      top: window.innerHeight * 0.35,
      width: window.innerWidth * 0.22,
      height: window.innerHeight * 0.35,
    };
  
    // 定義一個通用的矩形碰撞函式
    const isCollision = (zone: { left: number; top: number; width: number; height: number }) => {
      return (
        x < zone.left + zone.width &&
        x + size > zone.left &&
        y < zone.top + zone.height &&
        y + size > zone.top
      );
    };
  
    const collisionFixed = isCollision(fixedSafeZone);
    // 若 safeZone 尚未設定，則只檢查固定 safe zone 部分
    const collisionDynamic = safeZone ? isCollision(safeZone) : false;
  
    // 若任一 safe zone 發生碰撞，就視為不允許
    return collisionFixed || collisionDynamic;
  }, [safeZone]);

  useEffect(() => {
    const PUZZLE_SIZE = 100;
    const SAFE_DISTANCE = 150; // 確保拼圖與缺口垂直方向也有足夠距離
    
    // 將畫面分成左右兩半
    const leftHalf = Math.floor(window.innerWidth / 2) - PUZZLE_SIZE;
    const rightHalf = Math.floor(window.innerWidth / 2);

    const isPuzzleOnLeft = Math.random() > 0.5;
    
    let puzzleX: number, puzzleY: number, holeX: number, holeY: number;
    
    // 生成拼圖塊的位置（避開 safeZone）
    do {
      puzzleX = isPuzzleOnLeft
        ? Math.floor(Math.random() * (leftHalf - PUZZLE_SIZE))
        : Math.floor(Math.random() * (window.innerWidth - rightHalf - PUZZLE_SIZE)) + rightHalf;
      puzzleY = Math.floor(Math.random() * (window.innerHeight - PUZZLE_SIZE));
    } while (isInSafeZone(puzzleX, puzzleY, PUZZLE_SIZE));

    // 生成缺口的位置（在另一半且避開 safeZone）
    do {
      holeX = !isPuzzleOnLeft
        ? Math.floor(Math.random() * (leftHalf - PUZZLE_SIZE))
        : Math.floor(Math.random() * (window.innerWidth - rightHalf - PUZZLE_SIZE)) + rightHalf;
      holeY = Math.floor(Math.random() * (window.innerHeight - PUZZLE_SIZE));
    } while (isInSafeZone(holeX, holeY, PUZZLE_SIZE));
    
    // 確保垂直方向也有足夠距離
    if (Math.abs(puzzleY - holeY) < SAFE_DISTANCE) {
      const offset = SAFE_DISTANCE - Math.abs(puzzleY - holeY);
      if (puzzleY < window.innerHeight / 2) {
        setPuzzlePosition({ x: puzzleX, y: puzzleY });
        setHolePosition({ x: holeX, y: holeY + offset });
      } else {
        setPuzzlePosition({ x: puzzleX, y: puzzleY });
        setHolePosition({ x: holeX, y: Math.max(0, holeY - offset) });
      }
    } else {
      setPuzzlePosition({ x: puzzleX, y: puzzleY });
      setHolePosition({ x: holeX, y: holeY });
    }
  }, [isInSafeZone]);
  
  return (
    

    <div onClick={(e) => console.log('Mouse click position:', e.clientX, e.clientY)}
    // className="md:w-[100vw] md:h-[100vh]"
  
      style={{ 
        // ...dimensions,
        width: '100vw',
        // height: '100vh',
        // width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
        position: 'relative',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        // backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
        // backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
      }}>
    

      {/* <div
        style={{
          position: 'absolute',
          left: `${window.innerWidth * 0.18}px`,
          top: `${window.innerHeight * 0.35}px`,
          width: `${window.innerWidth * 0.22}px`,
          height: `${window.innerHeight * 0.35}px`,
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          zIndex: 1000, // 確保在頂層可以看到
        }}
      /> */}

      {/* {safeZone && (
        <div
          style={{
            position: 'absolute',
            left: `${safeZone.left}px`,
            top: `${safeZone.top}px`,
            width: `${safeZone.width}px`,
            height: `${safeZone.height}px`,
            backgroundColor: 'rgba(151, 208, 44, 0.87)', // 與上色區塊相同的色彩
            zIndex: 1000, // 根據需求調整層級
          }}
        />
      )} */}
      
      {/* 底層背景 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(2, 12, 22, 0.99)',
          zIndex: 1,
        }}
      />

      {/* 拼圖背景 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      >

        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            // backgroundImage: "url('https://averybigwhale.github.io/entry/public/puzzle-bg-5.png')",
            // backgroundImage: "url('/puzzle-bg-5.png')",
            
            // backgroundColor: '#333',
            
            backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,

            // backgroundSize: 'cover',
            backgroundSize: `${backgroundSize.width}px ${backgroundSize.height }px`,
            // backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
            // top: `0px`,
            // backgroundPosition: 'center top',
            backgroundPosition: windowSize.width < 768 ? 'center top' : 'center',
            backgroundRepeat: 'no-repeat',
            
            // backgroundPosition: `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`,
          
            // backgroundPosition: `0px 0px`,
            // left: `0px`,
            // top: `${puzzlePosition.y}px`,
            // backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
            // // backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
            // backgroundPosition: `${backgroundPosition.x - holePosition.x}px ${backgroundPosition.y - holePosition.y}px`,
          }}
        />

        <div 
          className={` ${bokorFont.className}`}
          style={{
            
            position: 'relative',
            zIndex: 2, 
            // 
            textAlign: 'left',
            padding: '20%',
            // fontFamily: 'Carat, sans-serif',
          }}>
          <h2 
            style={{
              fontSize: '32px',
              marginBottom: '5px',
              fontWeight: 'bold',
              // color: 'white',
              color: 'rgba(255, 255, 255, 0.91)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              // 

            }}
          >
            <div className='justify-left'>
            最終我們
            <br/>
            都在
            <br/>
            潮間帶
            <br/>
            交會
            </div>
            <p 
            style={{
              fontSize: '24px',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            See you at the shore
          </p>
          </h2>
          <div style={{ width: '100%', textAlign: 'right' }}>
            <div 
              id="safeText" 
              ref={safeTextRef}
              className={`${bokorFont.className}`}
              style={{
                display: 'inline-block', // 保持寬度只依據內容
                position: 'relative',
                zIndex: 2,
                color: 'rgba(255, 255, 255, 0.91)',
                padding: '0%',
              }}
            >
              <p 
                style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                平倫在沙灘擱淺
                <br/>
                記憶紛亂散佚
              </p>
            </div>
          </div>
          
        </div>  
        
      </div>
      
      {/* 漸層遮罩層 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(to top,


            transparent 100%)`,
          zIndex: 6,
          pointerEvents: 'none', // 確保遮罩不會影響互動
        }}
      />
      

      {/* 可拖曳的拼圖塊 */}
      <div
        style={{
          // position: 'absolute',
          // left: `${puzzlePosition.x}px`,
          // top: `${puzzlePosition.y}px`,
          // width: '100px',
          // height: '100px',
          // boxShadow: '0 4px 8px rgba(0,0,0,0.5)',  // 包裹的陰影
          // filter: 'drop-shadow(0 4px 8px rgba(0,0,100,0.8))'
          //  drop-shadow(0 200px 400px rgba(0,0,0,0.1)) drop-shadow(0 0 2px rgba(0,0,0,0.1))',
        }}
      >
        <div
          id="puzzlePiece"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onTouchStart={handleTouchStart}   // 備援的 touch 事件
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: 'none', // 禁止預設觸控行為
            position: 'absolute',
            left: `${puzzlePosition.x}px`,
            top: `${puzzlePosition.y}px`,
            width: '100px',
            height: '100px',
            backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,
            // backgroundColor: '#333',
            backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
            // backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
            backgroundPosition: `${backgroundPosition.x - holePosition.x}px ${backgroundPosition.y - holePosition.y}px`,
            // backgroundPosition: `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`,
            cursor: 'grab',
            // opacity: isDragging ? '0.5' : '1',
            
            // clipPath: PUZZLE_SHAPE_PIXELS,
            // WebkitClipPath: PUZZLE_SHAPE_PIXELS,
          //   zIndex: 3,
            boxShadow: '0 40px 50px rgba(0,0,0,1), 0 40px 20px rgba(0,0,0,0.6)',
            zIndex: isCompleted ? 10 : 30,
            // transition: 'all 0.3s ease-in-out',
            // transition: 'border 0.3s ease', // 添加邊框過渡效果
            // border: borderStyle, // 使用邊框樣式狀態骯
            // outline: '4px solid white', // 使用 outline 來顯示邊框
            // outlineOffset: '-4px', // 調整邊框位置
            // transition: 'background-color 0.3s ease', 
          }}
        />
      
      </div>
     

      <div>
        {/* 被切下來的底圖 */}
        <div
          style={{
            position: 'absolute',
            left: `${holePosition.x}px`,
            top: `${holePosition.y}px`,
            width: '100px',
            height: '100px',
            // backgroundImage: "url('/bottom-img.png')",
            backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
            backgroundPosition: `-${holePosition.x}px -${holePosition.y}px`,
            // clipPath: PUZZLE_SHAPE_PIXELS,
            // WebkitClipPath: PUZZLE_SHAPE_PIXELS,
            backgroundColor: '#333', // 使用與底層背景相同的顏色
            zIndex: 5,
          }}
        />
      </div>

      {/* 放置區域 */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        style={{
          position: 'absolute',
          left: `${holePosition.x}px`,
          top: `${holePosition.y}px`,
          // left: `${holePosition.x}px`,
          // top: `${holePosition.y}px`,
          width: '100px',
          height: '100px',
          // backgroundImage: "url('https://averybigwhale.github.io/entry/public/puzzle-bg-5.png')",
          // backgroundImage: "url('/puzzle-bg-5.png')",
          backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,

          
          backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
          backgroundPosition: `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`,
          opacity: isOverDropZone && !isCompleted ? 0.5 : 0,
          // clipPath: PUZZLE_SHAPE_PIXELS,
          // WebkitClipPath: PUZZLE_SHAPE_PIXELS,
          zIndex: 8,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* 紅色的點 */}
      {/* <div
        style={{
          position: 'absolute',
          left: `${holePosition.x - 5}px`, // 點置中調整
          top: `${holePosition.y - 5}px`,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'red',
          zIndex: 1000,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: `${holePosition.x + 12}px`,
          top: `${holePosition.y}px`,
          color: 'red',
          zIndex: 1000,
          fontSize: '24px',
        }}
      >
        {`HolePosition\n(${holePosition.x}, ${holePosition.y})`}
      </div> */}


      {/* 左上角位置標註 */}
      {/* <div
        style={{
          position: 'absolute',
          left: `-5 px`, // 點置中調整
          top: `-5px`,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'green',
          zIndex: 1000,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `0px`,
          top: `0px`,
          color: 'light green',
          zIndex: 1000,
          fontSize: '36px',
        }}
      >
        {`0, 0`}
        
      </div> */}


      {/* 左上角位置標註 */}
      {/* <div
        style={{
          position: 'absolute',
          left: `-5 px`, // 點置中調整
          top: `-5px`,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'green',
          zIndex: 1000,
        }}
      /> */}
      {/* 座標標註 */}
      {/* <div
        style={{
          position: 'absolute',
          left: `50px`,
          top: `50px`,
          color: 'blue',
          zIndex: 1000,
          fontSize: '20px',
        }}
      >
        {`背景減去 hole ${backgroundPosition.x - holePosition.x}px ${backgroundPosition.y - holePosition.y}px\n`}
        {`BackgroundPosition ${backgroundPosition.x}px ${backgroundPosition.y}px\n`}
        {`HolePosition ${holePosition.x}px ${holePosition.y}px`}
      </div>


      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: `${diff / 2}px`,
          color: 'red',
          zIndex: 1000,
          fontSize: '20px',
        }}
      >
        {`Left: 0px, Top: ${diff / 2}px`}
      </div>

      <div
        style={{
          position: 'absolute',
          left: `-5 px`, // 點置中調整
          top: `${windowSize.height}px`,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'red',
          zIndex: 1000,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: `${windowSize.height}px`,
          color: 'red',
          zIndex: 1000,
          fontSize: '20px',
        }}
      >
        {`WindowSize Left: 0px, Top: ${windowSize.height}px`}
      </div>

      <div
        style={{
          position: 'absolute',
          left: `-5 px`, // 點置中調整
          top: `${backgroundSize.height}px`,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'blue',
          zIndex: 1000,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: `${windowSize.height}px`,
          color: 'blue',
          zIndex: 1000,
          fontSize: '20px',
        }}
      >
        {`BackgroundSize Left: 0px, Top: ${backgroundSize.height}px`}
      </div> */}
      {/* backgroundPosition: `${backgroundPosition.x - holePosition.x}px ${backgroundPosition.y - holePosition.y}px`, */}

      {/* 完成時的閃光效果 */}
      {isCompleted && (
        <div
          style={{
            position: 'absolute',
            left: `${holePosition.x - 50}px`,
            top: `${holePosition.y - 50}px`,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
            animation: 'completion-glow 2s ease-out',
            zIndex: 9,
            pointerEvents: 'none',
          }}
        />
      )}

      <style jsx>{`
        @keyframes completion-glow {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }
      `}</style>
    </div> 
  );
}