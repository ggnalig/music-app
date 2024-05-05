import Image from "next/image"
import { FaHeadphones, FaPlay } from "react-icons/fa";

import { convertNumber } from "@/helper/number-converter"

export type ListItemType = {
  data?: any
}

export const ListItem: React.FC<ListItemType> = ({ data }) => {
  return (
    <article className="flex items-start max-xl:space-x-6 p-6 max-md:space-x-4 p-4 max-sm: space-x-4 p-4">
      <Image src={data?.image[0]["#text"] || `https://placehold.co/60x60?text=Image%0AUnavailable`} alt={data?.name || ''} width={60} height={88} quality={90} className="flex-none rounded-md bg-slate-100" />
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">{data?.name}</h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div className="absolute top-0 right-0 flex items-center space-x-1">
            {data?.playcount && 
            <>
              <dt className="text-sky-500">
                <span className="sr-only">Star rating</span>
                <FaHeadphones />
              </dt>
              <dd>{convertNumber(Number(data?.playcount))}</dd>
            </>
            }
          </div>
          <div>
            <dt className="sr-only">
              Rating
            </dt>
            <dd className="flex justify-between items-center px-1.5 ring-1 ring-slate-200 rounded">
              <FaPlay className="mr-2" />
              <span>
                {convertNumber(Number(data?.listeners))}
              </span>
            </dd>
          </div>
          <div className="flex-none w-full mt-2 font-normal">
            <dt className="sr-only">Cast</dt>
            <dd className="text-slate-400 truncate">{data?.url}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}