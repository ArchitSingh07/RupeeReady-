import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export function VibrantProgressBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dataNodes: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      originalSpeedX: number;
      originalSpeedY: number;
    }> = [];

    // Create data flow particles - using exact brand colors
    const colors = ['#008080', '#009688', '#FF9933', '#ffb366'];
    
    for (let i = 0; i < 100; i++) {
      const speedX = (Math.random() - 0.5) * 0.8;
      const speedY = (Math.random() - 0.5) * 0.8;
      dataNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1.5,
        speedX,
        speedY,
        originalSpeedX: speedX,
        originalSpeedY: speedY,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth mouse position interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Clear with trailing effect for smoother motion
      ctx.fillStyle = 'rgba(249, 250, 251, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dataNodes.forEach((node, index) => {
        // React to mouse with stronger effect
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 2;
          const angle = Math.atan2(dy, dx);
          
          // Push particles away from mouse
          node.x -= Math.cos(angle) * force;
          node.y -= Math.sin(angle) * force;
          
          // Increase size when near mouse
          const sizeIncrease = (1 - distance / maxDistance) * 2;
          const currentSize = node.size + sizeIncrease;
          
          // Draw node with enhanced glow near mouse
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
          
          // Add glow effect
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, currentSize * 2
          );
          gradient.addColorStop(0, node.color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = node.opacity + (1 - distance / maxDistance) * 0.4;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          // Regular movement
          node.x += node.speedX;
          node.y += node.speedY;
          
          // Draw regular node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = node.opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Wrap around screen
        if (node.x < -20) node.x = canvas.width + 20;
        if (node.x > canvas.width + 20) node.x = -20;
        if (node.y < -20) node.y = canvas.height + 20;
        if (node.y > canvas.height + 20) node.y = -20;

        // Connect nearby nodes with enhanced visibility
        dataNodes.slice(index + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxLineDistance = 150;

          if (distance < maxLineDistance) {
            // Check if either node is near mouse
            const nodeToMouse = Math.sqrt(
              Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)
            );
            const otherNodeToMouse = Math.sqrt(
              Math.pow(mouseX - otherNode.x, 2) + Math.pow(mouseY - otherNode.y, 2)
            );
            
            const nearMouse = Math.min(nodeToMouse, otherNodeToMouse) < 200;
            
            ctx.beginPath();
            ctx.strokeStyle = node.color;
            
            // Enhance line opacity near mouse
            let lineOpacity = 0.15 * (1 - distance / maxLineDistance);
            if (nearMouse) {
              lineOpacity *= 2;
            }
            
            ctx.globalAlpha = lineOpacity;
            ctx.lineWidth = nearMouse ? 1.5 : 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'linear-gradient(to bottom right, #F5F8FA, #E0F2F1, #f0f9ff)' }}
      />
      
      {/* Interactive gradient overlays that follow mouse - subtle and responsive */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: `radial-gradient(ellipse 500px 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 128, 128, 0.08), transparent 70%)`,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 25,
        }}
      />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(0, 128, 128, 0.04), transparent 50%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 70%, rgba(255, 153, 51, 0.05), transparent 50%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Animated geometric pattern overlay - flowing diagonal lines that react to mouse */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,100 M-25,50 L75,150 M25,-50 L125,50' stroke='%23008080' stroke-width='0.5' fill='none'/%3E%3Cpath d='M100,0 L0,100 M125,50 L25,-50 M75,150 L-25,50' stroke='%23FF9933' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{
          backgroundPosition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
          x: {
            type: 'spring',
            stiffness: 50,
            damping: 30,
          },
          y: {
            type: 'spring',
            stiffness: 50,
            damping: 30,
          },
        }}
      />
      
      {/* Secondary animated wave pattern for depth */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 Q30,40 60,60 T120,60' stroke='%23009688' stroke-width='0.5' fill='none'/%3E%3Cpath d='M0,80 Q30,60 60,80 T120,80' stroke='%23008080' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '-120px 0px'],
          x: mousePosition.x * -0.008,
          y: mousePosition.y * 0.005,
        }}
        transition={{
          backgroundPosition: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
          x: {
            type: 'spring',
            stiffness: 40,
            damping: 35,
          },
          y: {
            type: 'spring',
            stiffness: 40,
            damping: 35,
          },
        }}
      />
      
      {/* Subtle grid pattern with mouse interaction */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,60 M0,0 L60,0' stroke='%23008080' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
        animate={{
          scale: [1, 1.02, 1],
          x: mousePosition.x * 0.005,
          y: mousePosition.y * 0.005,
        }}
        transition={{
          scale: {
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          x: {
            type: 'spring',
            stiffness: 60,
            damping: 40,
          },
          y: {
            type: 'spring',
            stiffness: 60,
            damping: 40,
          },
        }}
      />
    </>
  );
}