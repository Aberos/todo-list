import LayoutHome from "@/layouts/home/layoutHome";
import TaskList from "@/components/lists/task/taskList";
import { ReactNode } from "react";

export default function Home() {
  return (<div className="w-full p-4">
    <TaskList />
  </div>);
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <LayoutHome>{page}</LayoutHome>;
};