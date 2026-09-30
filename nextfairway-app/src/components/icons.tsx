import type { ColorValue } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = { color: ColorValue; size?: number };

/** Linien-Icons aus dem Mockup (24er-Raster, Strichstärke 2). */
function Line({ color, size = 24, children }: IconProps & { children: React.ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </Line>
  );
}

export function MediaIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Rect x={3} y={5} width={18} height={14} rx={2} />
      <Path d="M10 9l5 3-5 3z" />
    </Line>
  );
}

export function CommunityIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </Line>
  );
}

export function ProfileIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Circle cx={12} cy={8} r={4} />
      <Path d="M4 21a8 8 0 0 1 16 0" />
    </Line>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Circle cx={11} cy={11} r={7} />
      <Path d="M20 20l-3.5-3.5" />
    </Line>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <Path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Line>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Line {...props}>
      <Circle cx={12} cy={12} r={9} />
      <Path d="M12 8v5M12 16.5v.01" />
    </Line>
  );
}
