import { ChipSelect } from "@/components/chipSelect";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <Navbar />
      <ChipSelect />
    </main>
  );
}
