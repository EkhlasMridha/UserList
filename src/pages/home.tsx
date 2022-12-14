import { ListTable } from "./list.table";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Switch } from "../shared-components/switch.toggle";
import { SearchIcon } from "@heroicons/react/outline";
import { Paginator } from "../shared-components/paginator";
import { AutoCompleteSearch } from "../shared-components/automplete-search";
import { ListTile } from "../shared-components/list.tile";

interface Filtered {
  source: any[];
  filtered: any[];
}

interface Pagination {
  page: number;
  totalCount: number;
  data: any[];
}

export const Home = (props: any) => {
  const [dataSource, setData] = useState<any[]>([]);
  const [gender, setGender] = useState<"all" | "male" | "female">();
  const [paginated, setPaginated] = useState<Partial<Pagination>>({
    page: 1,
  });
  const [filteredData, setFiltereData] = useState<any[]>([]);
  const [isTile, setTile] = useState<boolean>();

  const pageSize = 10;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get<any>("https://randomuser.me/api/?results=50")
      .then((res) => res?.data)
      .then((res) => {
        setData(res?.results);
        setFiltereData(res?.results);
        paginateUserData(res?.results, pageSize, 1);
      });
  };

  const paginateUserData = (
    data: any[],
    pageSize: number,
    page: number,
    gender: "all" | "male" | "female" = "all"
  ) => {
    let filteredData = filterByGender(gender, data);
    setFiltereData(filteredData);
    let totalCount = filteredData?.length;
    page = page <= 0 ? 1 : page;
    let startIndex = (page - 1) * pageSize;
    if (startIndex >= totalCount) {
      setPaginated({
        ...paginated,
      });
      return;
    }
    let endIndex =
      startIndex + pageSize > totalCount
        ? startIndex + pageSize - totalCount + startIndex
        : startIndex + pageSize;

    let paginatedData = filteredData.slice(startIndex, endIndex);
    setPaginated({
      data: paginatedData,
      totalCount: totalCount,
      page: page,
    });
  };

  const onChangePage = (pageNumber: number) => {
    paginateUserData(dataSource ?? [], pageSize, pageNumber, gender);
  };

  const onChangeGender = (gender: "all" | "male" | "female") => {
    paginateUserData(dataSource ?? [], pageSize, 1, gender);
    setGender(gender);
  };

  const filterByGender = (gender: any, data: any[]) => {
    let filtered = (data ?? []).filter(
      (item) => gender === "all" || item.gender === gender
    );
    return filtered ?? [];
  };

  const onSelectItem = (data: any) => {
    let filtered = filterByGender(gender ?? "all", dataSource ?? []);
    if ((data ?? "") === "") {
      setFiltereData(dataSource);
      paginateUserData(dataSource, pageSize, 1, gender);
      return;
    }
    let searchResult = filtered.filter(
      (item) => item.login.uuid === data.login.uuid
    );
    paginateUserData(
      searchResult.length === 0 ? filtered : searchResult,
      pageSize,
      1,
      gender
    );
    setFiltereData(filtered);
  };

  return (
    <div className="p-20 pt-10">
      <h1 className="p-8 pt-0 pl-0 text-slate-500 text-2xl">User List</h1>
      <div className="flex sm:flex-col md:flex-row lg:flex-row items-start">
        <div className="flex sm:flex-col md:flex-col lg:flex-row space-x-4 basis-2/4">
          <AutoCompleteSearch
            sourceData={filteredData ?? []}
            onSelect={onSelectItem}
          />
          <div className="flex flex-row space-x-3 items-center">
            <span className="text-sm text-slate-500">Filter by:</span>
            <div className="flex flex-row items-center space-x-1">
              <input
                type={"radio"}
                value="all"
                name="All"
                id="all"
                onChange={(event) => onChangeGender(event.target.value as any)}
              />
              <label>All</label>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <input
                type={"radio"}
                value="male"
                name="All"
                id="all"
                onChange={(event) => onChangeGender(event.target.value as any)}
              />
              <label>Male</label>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <input
                type={"radio"}
                value="female"
                name="All"
                id="all"
                onChange={(event) => onChangeGender(event.target.value as any)}
              />
              <label>Female</label>
            </div>
          </div>
        </div>
        <div className="basis-1/2 flex justify-end items-center flex-row space-x-4">
          <label className="font-medium text-sm text-slate-500">
            Tile View
          </label>
          <Switch onClick={setTile} />
        </div>
      </div>
      {!isTile && <ListTable data={paginated?.data} />}
      {isTile && <ListTile dataSource={paginated?.data} />}
      <div className="flex justify-end">
        {paginated?.data?.length !== 0 && (
          <Paginator
            totalCount={paginated?.totalCount}
            pageSize={pageSize}
            onChange={onChangePage}
            page={paginated?.page}
          />
        )}
      </div>
    </div>
  );
};
