import dynamic from "next/dynamic";
import { Fragment, useState } from "react";
import Router, { useRouter } from "next/router";
import infos from "../../lib/infos";
import propsC from "../../lib/category";
import propsY from "../../lib/year";
import Link from "next/link";

const MapWithNoSSR = dynamic(() => import("./map"), {
  ssr: false,
});

export default function Home(props) {
  const router = useRouter();
  let nvalues = [];
  const { filter } = router.query;
  props.data.map((item) => {
    if (item.category === filter || item.project_start_time.includes(filter)) {
      nvalues.push(item);
    }
  });
  const [values, setValues] = useState(nvalues);
  const onChangeHandler = (event) => {
    Router.push({
      pathname: "./third",
      query: { filter: event.target.value },
    });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-slate-500">
      <div className="flex justify-between items-center h-[40px] w-[90%] mb-3 bg-slate-700 rounded-lg px-4 text-cyan-300">
        <div>
          <select
            onChange={onChangeHandler}
            className="[font-size:12px] sm:text-base text-center font-bold bg-slate-700"
          >
            <option>Project Category</option>
            {props.category.map((option, index) => {
              return <option key={index}>{option.category}</option>;
            })}
          </select>
        </div>
        <div>
          <select
            onChange={onChangeHandler}
            className="[font-size:12px] sm:text-base text-center font-bold bg-slate-700"
          >
            <option>Project Starting Year</option>
            {props.year.map((option, index) => {
              return <option key={index}>{option.project_start_time}</option>;
            })}
          </select>
        </div>
      </div>
      <MapWithNoSSR vals={values}></MapWithNoSSR>
      <button className="mt-5 h-10 bg-black text-white w-28 rounded-lg [font-size:12px] sm:text-base sm:w-36">
        <Link href="./">Back To Home</Link>
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const res = infos;
  const res2 = propsC;
  const res3 = propsY;

  return {
    props: {
      data: res,
      category: res2,
      year: res3,
    },
    revalidate: 1,
  };
}
