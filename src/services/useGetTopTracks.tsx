import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/helper/fetcher";

import { IResponseTopTracks } from "@/types/tracks";

export const useGetTopTracks = (limit: number, ) => {
  const getTopTracksHandler = (pageIndex: number) => {
    pageIndex = pageIndex + 1;

    return `${process.env.NEXT_PUBLIC_LAST_FM_BASE_URL}2.0/?method=chart.gettoptracks&page=${pageIndex}&limit=${limit}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`
  };

  const { data: topTracks, error: errrorTopTracks, isLoading: loadingTopTracks, size: sizeTopTracks, isValidating: isValidatingTopTracks, setSize: setTopTracksize } = useSWRInfinite<IResponseTopTracks>(getTopTracksHandler, fetcher);

  const flattenedTracks = topTracks?.flatMap(item => item?.tracks?.track);
  const totalItem = Number(topTracks?.flatMap(item => item?.tracks?.["@attr"])?.[0]?.total);

  return {
    topTracks,
    totalItem,
    sizeTopTracks,
    flattenedTracks,
    errrorTopTracks,
    loadingTopTracks,
    isValidatingTopTracks,
    setTopTracksize
  }
}