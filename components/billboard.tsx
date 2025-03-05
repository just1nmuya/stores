import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => (
  <div className="">
    <div
      style={{ backgroundImage: `url(${data?.imageUrl})` }}
      className="relative aspect-[.6] md:aspect-[2.1/1] overflow-hidden bg-cover"
    >
      <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
        <div className="font-bold text-4xl sm:text-5xl lg:text-7xl sm:max-w-xl max-w-xs text-black">
          {data.label}
        </div>
      </div>
    </div>
  </div>
);

export default Billboard;
