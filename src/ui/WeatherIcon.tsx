interface IconProps {
  icon: string;
}

export const WeatherIcon = ({ icon }: IconProps) => {
  const path = `/icons/${icon}.svg`;

  return <img alt="" src={path} width={150} height={150} />;
};
