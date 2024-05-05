import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/helper/fetcher";

import { IResponseTopArtists } from "@/types/artists";

export const useGetTopArtists = (limit: number) => {
  const getTopArtistsHandler = (pageIndex: number) => {
    pageIndex = pageIndex + 1;

    return `${process.env.NEXT_PUBLIC_LAST_FM_BASE_URL}2.0/?method=chart.gettopartists&page=${pageIndex}&limit=${limit}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`
  };

  const { data: topArtists, error: errrorTopArtists, isLoading: loadingTopArtists, size: sizeTopArtists, isValidating: isValidatingTopArtists, setSize: setTopArtistSize } = useSWRInfinite<IResponseTopArtists>(getTopArtistsHandler, fetcher);

  const flattenedArtists = topArtists?.flatMap(item => item?.artists?.artist);
  const totalItem = Number(topArtists?.flatMap(item => item?.artists?.["@attr"])?.[0]?.total);


  return {
    topArtists,
    totalItem,
    sizeTopArtists,
    flattenedArtists,
    errrorTopArtists,
    loadingTopArtists,
    isValidatingTopArtists,
    setTopArtistSize
  }
}