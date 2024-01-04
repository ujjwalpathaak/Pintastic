import UserPins from "../../components/UserPins";
import { getUserPins } from "../../app/lib/api";

export default async function Home() {
  const listOfPins = await getUserPins();

  return (
    <div className="">
      <UserPins listOfPins={listOfPins} />
    </div>
  );
}
