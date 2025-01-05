import LayoutHome from "@/components/layouts/home/layoutHome";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { ReactNode, useState } from "react";

export default function Home() {
  const [showModalCreateTask, setShowModalCreateTask] = useState<boolean>(false);

  const headerCard = () => {
    return (
      <div className="w-full flex items-center p-4 justify-center md:justify-between">
        <h2>Tarefas</h2>
        <Button
          icon="pi pi-plus"
          onClick={() => setShowModalCreateTask(true)}
        />
      </div>
    );
  };

  return (<div className="w-full md:w-1/2">
    <Card header={headerCard}>

    </Card>
    <Dialog
      header="Create Room"
      visible={showModalCreateTask}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!showModalCreateTask) return;
        setShowModalCreateTask(false);
      }}
    >
    </Dialog>

  </div>);
}

Home.getLayout = function getLayout(page: ReactNode) {
  return <LayoutHome>{page}</LayoutHome>;
};

