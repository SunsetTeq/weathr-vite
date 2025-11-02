interface SmallCardProps {
  title: string;
  value: string;
}

export const SmallCard = ({ title, value }: SmallCardProps) => {
  return (
    <div className="bg-base-200 flex flex-1 flex-col gap-4 rounded-[20px] p-4">
      <p className="text-paragraph-style">{title}</p>
      <p className="font-dmsans text-4xl font-light">{value}</p>
    </div>
  );
};
