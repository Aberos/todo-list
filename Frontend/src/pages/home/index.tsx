import LayoutHome from "@/components/layouts/home/layoutHome";
import TaskList from "@/components/lists/task/taskList";
import { ReactNode } from "react";

export default function Home() {
  return (<div className="w-full">
    <TaskList />
  </div>);
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <LayoutHome>{page}</LayoutHome>;
};