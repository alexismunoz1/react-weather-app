interface IconProps {
  icon: string;
  width?: number;
  height?: number;
}

export const WeatherIcon = ({ icon, width = 150, height = 150 }: IconProps) => {
  const path = `/icons/${icon}.svg`;
  return <img alt="" src={path} width={width} height={height} />;
};
