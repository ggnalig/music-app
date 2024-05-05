"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

import { Nav } from "@/components/nav";
import { List } from "@/components/list";
import { NavItem } from "@/components/nav-item";
import { SearchBar } from "@/components/search-bar";
import { ListItem } from "@/components/list-item/list-item";

import { ITrack } from "@/types/tracks";

import { fetchData } from "@/services/fetchData";
import { useGetTopTracks } from "@/services/useGetTopTracks";
import { convertNumber } from "@/helper/number-converter";

export type TActiveTab = 'artists' | 'tracks';

export default function TopTracks() {
  const pathname = usePathname()
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [searchQuery, setSearchQuery] = useState<any>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const { flattenedTracks, totalItem, loadingTopTracks, isValidatingTopTracks, sizeTopTracks, errrorTopTracks, setTopTracksize } = useGetTopTracks(limit)

  useEffect(() => {
    const searchData = async () => {
      let results = [];
      setLoading(true);
      if (debouncedSearchQuery) {
        const data = await fetchData('artist', debouncedSearchQuery);
        results = data;
      }

      setLoading(false);
      setSearchResult(results?.results?.trackmatches?.track);
    };

    searchData();
  }, [debouncedSearchQuery]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchQuery(formData.get("search"));
    e.target.reset();
    e.target.focus();
  }


  if (loadingTopTracks) {
    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>loading...</h1>
    </div>
    )
  }

  if (errrorTopTracks ) {
    return <h1>Error!! {JSON.stringify(errrorTopTracks.message)}</h1>
  }

  const renderList = () => {
    if (searchResult?.length > 0) {
      return (
        <>
          {loading ? (
            <h6>Searching...</h6>
          ):(
            <List> 
              {searchResult?.map((data: ITrack) => (
                <ListItem key={data?.mbid} data={data} />
              ))}
            </List>
          )}
        </>
      )
    } else {
      return(
        <>
          <List>
            {flattenedTracks?.map((data: ITrack) => (
              <ListItem key={data?.mbid} data={data} />
            ))}
          </List>
          <div className="flex flex-col">
            <h6 className="justify-self-end self-end">menampilkan {flattenedTracks?.length} dari {convertNumber(totalItem)} data </h6>
            {isValidatingTopTracks ? <h6>Loading...</h6> : <button className="justify-self-evenly" onClick={() => setTopTracksize(sizeTopTracks + 1)}>tampilkan lebih banyak</button>}
          </div>
        </>
      )
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="w-full md:w-3/4 xl:w-2/5">
        <div className="divide-y divide-slate-100">
          <Nav>
            <NavItem href="/" isActive={pathname === '/'}>Top Artists</NavItem>
            <NavItem href="/top-tracks" isActive={pathname === '/top-tracks'}>Top Tracks</NavItem>
            <li className="w-full">
              <SearchBar
                text={searchQuery}
                onChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={loading}
              />
            </li>
          </Nav>
        </div>
        <div className="w-full flex flex-col items-center">
          {renderList()}
        </div>
      </div>
    </main>
  );
}
