import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Link from "next/link";
import infos from "../lib/infos";

const dstyle = "w-fit h-fit p-2 mb-3 text-center";
const sstyle = "font-bold text-cyan-500";

const Test2 = () => {
  const router = useRouter();
  const { cstate } = router.query;
  const helper = (tstart, tend) => {
    let start = new Date(tstart);
    let end = new Date(tend);
    let today = new Date();

    const calcDays = (date1, date2) => {
      let Difference_In_Time = date2.getTime() - date1.getTime();

      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return Math.round(Difference_In_Days);
    };

    let total = calcDays(start, end);
    let due = calcDays(today, end);

    const tRemain = (total, due) => {
      let res = Math.round((due / total) * 100);
      if (res < 0) {
        return ["0%", "100%"];
      }
      return [`${res}%`, `${100 - res}%`];
    };
    return tRemain(total, due);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-slate-500">
      {infos.map((item, index) => {
        if (index == cstate) {
          return (
            <div
              key={Math.random()}
              className="mx-5 flex flex-wrap flex-col justify-center items-center text-cyan-300 [font-size:12px] sm:text-base w-fit h-fit bg-slate-700 rounded-lg p-4 mt-4"
            >
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}>Project Name :</span>{" "}
                {item.project_name}
              </div>
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}> Category : </span>{" "}
                {item.category}
              </div>
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}> Affiliated Agency : </span>{" "}
                {item.affiliated_agency}
              </div>
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}> Description : </span>{" "}
                {item.description}
              </div>
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}> Project Starting Time : </span>{" "}
                {item.project_start_time}
              </div>
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}> Project Completion Time : </span>
                {item.project_completion_time}
              </div>
              <div className={`${dstyle}`}>
                <span className={`${sstyle}`}> Total Budget : </span>{" "}
                {item.total_budget}
              </div>
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className={`${sstyle}`}>Progress : </span>
                  <span className={`${sstyle}`}>
                    {item.completion_percentage}
                  </span>
                </div>
                <div className="w-60 bg-gray-300 rounded-full h-4 dark:bg-gray-700">
                  <div
                    className={`bg-blue-800 h-4 rounded-full`}
                    style={{ width: `${item.completion_percentage}` }}
                  ></div>
                </div>
              </div>
              {item.completion_percentage !== "100.00%" && (
                <div className="mt-3 mb-4">
                  <div className="flex justify-between mb-1">
                    <span className={`${sstyle}`}>Time Remaining : </span>
                    <span className={`${sstyle}`}>
                      {
                        helper(
                          item.project_start_time,
                          item.project_completion_time
                        )[0]
                      }
                    </span>
                  </div>
                  <div className="w-60 bg-gray-300 rounded-full h-4 dark:bg-gray-700">
                    <div
                      className={`bg-violet-600 h-4 rounded-full`}
                      style={{
                        width: `${
                          helper(
                            item.project_start_time,
                            item.project_completion_time
                          )[1]
                        }`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        }
      })}
      <button className="mt-5 h-10 bg-black text-white rounded-lg [font-size:12px] sm:text-base w-40 sm:w-60">
        <Link href="./concern">Post Any Issues Or Concern</Link>
      </button>
      <button className="mt-5 h-10 bg-black text-white w-28 rounded-lg [font-size:12px] sm:text-base sm:w-36 mb-4">
        <Link href="./">Back To Home</Link>
      </button>
    </div>
  );
};

export default Test2;
