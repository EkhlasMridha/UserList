import { ListTable } from "./list.table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "../shared-components/switch.toggle";
import { SearchIcon } from "@heroicons/react/outline";
import { Paginator } from "../shared-components/paginator";

interface DataState<T> {
  loading?: boolean;
  data?: T;
}

interface Pagination {
  page: number;
  totalCount: number;
  data: any[];
  hasNext: boolean;
  hasPrevious: boolean;
}

export const Home = (props: any) => {
  const [data, setData] = useState<DataState<any[]>>({ data: [] });
  const [paginated, setPaginated] = useState<Partial<Pagination>>({
    page: 1,
    hasPrevious: false,
  });

  const pageSize = 10;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setData({
      loading: true,
    });
    axios
      .get<any>("https://randomuser.me/api/?results=50")
      .then((res) => res?.data)
      .then((res) => {
        console.log(res);
        setData({
          loading: false,
          data: res?.results,
        });
        paginateUserData(res?.results, pageSize, 1);
      });
  };

  const paginateUserData = (data: any[], pageSize: number, page: number) => {
    let totalCount = data?.length;
    page = page <= 0 ? 1 : page;
    let startIndex = (page - 1) * pageSize;
    if (startIndex >= totalCount) {
      setPaginated({
        ...paginated,
        hasNext: false,
      });
      return;
    }
    let endIndex =
      startIndex + pageSize >= totalCount
        ? startIndex + pageSize - totalCount
        : startIndex + pageSize;
    let paginatedData = data.slice(startIndex, endIndex);
    console.log("Data confirm");
    setPaginated({
      data: paginatedData,
      hasNext: endIndex < totalCount,
      hasPrevious: startIndex !== 0,
    });
  };

  return (
    <div className="p-20 pt-10">
      <h1 className="p-8 pt-0 pl-0 text-slate-500 text-2xl">User List</h1>
      <div className="flex flex-row">
        <div className="flex flex-row space-x-4 basis-2/4">
          <div className="mt-1 flex rounded-md shadow-sm">
            <SearchIcon className="flex h-9 w-10 justify-center items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500" />
            <input
              type="text"
              className="focus:outline-none focus:border h-9 border border-slate-300 focus:border-violet-300 flex-1 block w-full rounded-none rounded-r-md sm:text-sm"
              placeholder="search user"
            />
          </div>
          <div className="flex flex-row space-x-3 items-center">
            <span className="font-medium">Filter by:</span>
            <div className="flex flex-row items-center space-x-1">
              <input type={"radio"} value="all" name="All" id="all" />
              <label>All</label>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <input type={"radio"} value="male" name="All" id="all" />
              <label>Male</label>
            </div>
            <div className="flex flex-row items-center space-x-1">
              <input type={"radio"} value="female" name="All" id="all" />
              <label>Female</label>
            </div>
          </div>
        </div>
        <div className="basis-1/2 flex justify-end items-center flex-row space-x-4">
          <label className="font-medium text-sm">Tile View</label>
          <Switch />
        </div>
      </div>
      <ListTable data={paginated?.data} />
      <div className="flex justify-end">
        <Paginator />
      </div>
    </div>
  );
};
