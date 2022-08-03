import { useEffect } from "react";

interface ListTableProps {
  data?: any[];
}

const DEFAULT_CONFIG: ListTableProps = {
  data: [],
};

export const ListTable = (props: ListTableProps) => {
  let config = { ...DEFAULT_CONFIG, ...props };

  return (
    // <div className="relative rounded-xl overflow-auto ">
    <div className="shadow-sm rounded-xl border border-slate-200 overflow-hidden my-8">
      <table className="border-collapse table-auto w-full text-sm border-gray-50 shadow-md">
        <thead>
          <tr className="bg-slate-50">
            <th className="border-b font-medium p-4 pl-8 pr-8  text-slate-400 text-left">
              Name
            </th>
            <th className="border-b text-center font-medium pl-4 pl-8 pr-8  text-slate-400 text-left">
              Registration Date
            </th>
            <th className="border-b font-medium pl-4 pl-8 pr-8  text-slate-400 text-left">
              Username
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {config?.data &&
            config?.data?.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-slate-100 p-4 pl-8 ">
                  <div className="flex flex-row">
                    <img
                      src={item?.picture?.thumbnail}
                      className="flex-shrink-0 h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-slate-600">
                        {item?.name?.last},&nbsp;{item?.name?.first}
                      </div>
                      <div className="text-slate-400">{item?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 p-4 text-slate-500 text-center">
                  {new Date(item?.registered?.date).toLocaleDateString()}
                </td>
                <td className="border-b border-slate-100 p-4 pr-8 text-slate-400 ">
                  {item?.login?.username}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    // </div>
  );
};
