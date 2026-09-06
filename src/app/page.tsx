import { joseContact as contact } from "@/config/jose-noguera";
import { JoseCard } from "./jose-noguera/jose-card";

export default function Home() {
  return <JoseCard contact={contact} />;
}