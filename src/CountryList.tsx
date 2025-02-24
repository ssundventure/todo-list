import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  wishCountry: string;
}

interface IWishCountries {
  text: string;
  id: number;
  category: "WISH_COUNTRY" | "WENT_COUNTRY" | "LOVE_COUNTRY";
}

const wishCountriesState = atom<IWishCountries[]>({
  key: "wishCountry",
  default: [],
});

function CountryList() {
  const [wishCountries, setWishCountries] = useRecoilState(wishCountriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ wishCountry }: IForm) => {
    setWishCountries((oldCountries) => [
      { text: wishCountry, id: Date.now(), category: "WISH_COUNTRY" },
      ...oldCountries,
    ]);
    setValue("wishCountry", "");
  };
  return (
    <div>
      <h1>내가 가고싶은 나라들</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("wishCountry", {
            required: "name is required",
          })}
          placeholder="이름"
        />
        <button>가자!</button>
      </form>
      <ul>
        {wishCountries.map((wishCountry) => (
          <li key={wishCountry.id}>{wishCountry.text}[chk] [del]</li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
