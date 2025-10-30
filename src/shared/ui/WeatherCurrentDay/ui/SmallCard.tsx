interface SmallCardProps {
  title: string;
  value: string;
}

export const SmallCard = ({ title, value }: SmallCardProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[20px] bg-green-500 p-4">
      <p className="text-paragraph-style">{title}</p>
      <p className="font-dmsans text-4xl font-light">{value}</p>
    </div>
  );
};
