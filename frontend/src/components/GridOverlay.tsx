import { motion } from 'motion/react';

interface GridOverlayProps {
  opacity?: number;
  color?: 'teal' | 'orange' | 'gray';
  animated?: boolean;
}

export function GridOverlay({ opacity = 0.1, color = 'teal', animated = false }: GridOverlayProps) {
  const getColor = () => {
    switch (color) {
      case 'teal':
        return 'rgba(0, 128, 128, ' + opacity + ')';
      case 'orange':
        return 'rgba(255, 153, 51, ' + opacity + ')';
      case 'gray':
        return 'rgba(0, 0, 0, ' + opacity + ')';
      default:
        return 'rgba(0, 128, 128, ' + opacity + ')';
    }
  };

  const gridStyle = {
    backgroundImage: `
      linear-gradient(90deg, ${getColor()} 1px, transparent 1px),
      linear-gradient(${getColor()} 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  };

  if (animated) {
    return (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={gridStyle}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  }

  return <div className="absolute inset-0 pointer-events-none" style={gridStyle} />;
}
