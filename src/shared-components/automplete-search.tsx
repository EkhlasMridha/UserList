import { SearchIcon, XCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface AutoCompleteSearchProps {
  sourceData: any[];
  onSelect?: (value: any) => void;
}

export const AutoCompleteSearch = (props: AutoCompleteSearchProps) => {
  const [userInput, setUserInput] = useState<any>();
  const [suggestion, setSuggestion] = useState<any[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestion, setShowSuggestion] = useState<boolean>();

  const activeClass = "bg-violet-600 text-white";

  const onChange = (e: any) => {
    const inputData = e.currentTarget.value;
    setUserInput(inputData);
    console.log("Auto source: ", props.sourceData);
    console.log(inputData);
    if ((inputData ?? "") === "") {
      console.log("Access");
      onSelectSuggestion(null);
      setSuggestion(props.sourceData);
      setShowSuggestion(false);
    } else {
      const filteredData = (props?.sourceData ?? []).filter(
        (item) =>
          item.email.toLowerCase().indexOf(inputData.toLowerCase()) > -1 ||
          item.name.first.toLowerCase().indexOf(inputData.toLowerCase()) > -1 ||
          item.name.last.toLowerCase().indexOf(inputData.toLowerCase()) > -1 ||
          item.login.username.toLowerCase().indexOf(userInput.toLowerCase()) >
            -1
      );
      console.log("Searched: ", filteredData);

      setSuggestion(filteredData);
      setShowSuggestion(filteredData?.length > 0);
    }
  };

  const onSelectSuggestion = (value: any) => {
    let inputData =
      value === null ? "" : value.name.last + ", " + value.name.first;
    setUserInput(inputData);
    setShowSuggestion(false);
    props.onSelect && props.onSelect(value);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      let suggest = suggestion[activeSuggestion ?? 0];
      setActiveSuggestion(0);
      setUserInput(suggest?.name?.last + ", " + suggest?.name?.first);
      setShowSuggestion(false);
      props.onSelect && props.onSelect(suggest);
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion((activeSuggestion ?? 1) - 1);
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if ((activeSuggestion ?? 1) - 1 === suggestion.length) {
        return;
      }

      setActiveSuggestion((activeSuggestion ?? 1) + 1);
    }
  };

  let searchElement = document.getElementById("search-box");
  let bounding = searchElement?.getBoundingClientRect();
  console.log(bounding?.bottom);
  return (
    <>
      <div className="flex flex-col relative">
        <div className="mt-1 flex rounded-md shadow-sm ">
          {!showSuggestion && (
            <SearchIcon className="z-5 flex h-9 w-10 justify-center items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500" />
          )}
          {showSuggestion && (
            <XCircleIcon
              onClick={() => setShowSuggestion(false)}
              className="cursor-pointer z-5 h-9 w-10 shadow-sm rounded-l-md border border-r-0 text-red-600"
            />
          )}
          <input
            id="search-box"
            type="text"
            className=" focus:outline-none focus:border h-9 pl-2 pb-1 pr-1 w-60 border border-slate-300 focus:border-violet-300 flex-1 block w-full rounded-none rounded-r-md sm:text-sm"
            placeholder="search user"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
        </div>
      </div>

      {showSuggestion && (suggestion?.length ?? 0) > 0 && (
        <div
          style={{
            top: bounding?.bottom,
            maxHeight: "200px",
            maxWidth: "250px",
            overflowY: "auto",
          }}
          className="absolute max-h-56 flex flex-col drop-shadow-md text-sm rounded-md pt-2 pb-2 z-50 w-full bg-white"
        >
          {suggestion?.map((item, index) => (
            <div
              onClick={() => onSelectSuggestion(item)}
              className={
                "p-2 cursor-pointer flex flex-col hover:bg-violet-400 " +
                (activeSuggestion === index ? activeClass : null)
              }
            >
              <span className="text-sm">
                {item?.name?.last + ", " + item?.name?.first}
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-300">
                  {item?.login?.username}
                </span>
                <span className="text-xs text-slate-300">{item?.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
