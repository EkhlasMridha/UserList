import { CalendarIcon, UserIcon } from "@heroicons/react/solid";

interface TileDataProps {
  dataSource?: any[];
}

export const ListTile = (props: TileDataProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
      {props?.dataSource &&
        props.dataSource.map((item, index) => (
          <div
            key={index}
            className="max-w-sm rounded border border-slate-200 overflow-hidden shadow-md flex flex-col h-36 p-4"
          >
            <div className="flex flex-row">
              <img
                src={item?.picture?.thumbnail}
                className="flex-shrink-0 h-10 w-10 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <div className="font-medium text-slate-600">
                  {item?.name?.last},&nbsp;{item?.name?.first}
                </div>
                <div className="text-slate-400">{item?.email}</div>
                <div className="flex flex-row items-center">
                  <UserIcon className="h-4 w-4 " />
                  &nbsp;
                  {item?.login?.username}
                </div>
                <div className="flex flex-row items-center">
                  <CalendarIcon className="h-4 w-4" />
                  &nbsp;
                  {new Date(item?.registered?.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
