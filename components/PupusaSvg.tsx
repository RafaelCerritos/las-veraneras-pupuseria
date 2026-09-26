import React from 'react';
import { PupusaSpot } from '@/types/pupusa';

interface PupusaSvgProps {
  spots: PupusaSpot[];
  className?: string;
  isArroz?: boolean;
}

export function PupusaSvg({ spots, className = 'w-12 h-12', isArroz = false }: PupusaSvgProps) {
  // Arroz pupusas have a slightly lighter, milky toasted tone
  const baseFill = isArroz ? '#F7E7CE' : '#EABA68';
  const innerFill = isArroz ? '#FAF0E2' : '#F5D18A';

  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer pupusa body with comal browning */}
      <circle cx="28" cy="28" r="22" fill={baseFill} stroke="#4A2C0D" strokeWidth="2" />
      {/* Inner surface glow */}
      <ellipse cx="28" cy="27" rx="17" ry="15" fill={innerFill} />
      
      {/* Comal charred toast specks */}
      <circle cx="18" cy="22" r="1.5" fill="#B87519" opacity="0.4" />
      <circle cx="37" cy="34" r="1.2" fill="#57391A" opacity="0.35" />
      <circle cx="34" cy="18" r="1" fill="#B87519" opacity="0.4" />

      {/* Ingredient filling spots */}
      {spots.map((spot, idx) => (
        <circle
          key={idx}
          cx={spot.cx}
          cy={spot.cy}
          r={spot.r}
          fill={spot.color}
          opacity={spot.opacity ?? 1}
        />
      ))}
    </svg>
  );
}
